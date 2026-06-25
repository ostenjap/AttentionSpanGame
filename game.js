// The Goldfish Protocol - Game Engine

document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const startScreen = document.getElementById("start-screen");
  const quizScreen = document.getElementById("quiz-screen");
  const resultsScreen = document.getElementById("results-screen");
  
  const startBtn = document.getElementById("start-btn");
  const restartBtn = document.getElementById("restart-btn");
  const shareBtn = document.getElementById("share-btn");
  
  const progressText = document.getElementById("progress-text");
  const progressBarFill = document.getElementById("progress-bar-fill");
  
  const wallText = document.getElementById("wall-text");
  const questionPrompt = document.getElementById("question-prompt");
  const optionsList = document.getElementById("options-list");
  const timerBar = document.getElementById("timer-bar");
  
  const animalBadge = document.getElementById("animal-badge");
  const diagnosisLabel = document.getElementById("diagnosis-label");
  const roastStatus = document.getElementById("roast-status");
  const roastDescription = document.getElementById("roast-description");
  
  const shrimpLevelText = document.getElementById("shrimp-level-text");
  const shrimpIndicator = document.getElementById("shrimp-indicator");
  
  const statTriviaAccuracy = document.getElementById("stat-trivia-accuracy");
  const statReactionTime = document.getElementById("stat-reaction-time");
  const statDopamineSwipes = document.getElementById("stat-dopamine-swipes");
  const statAutopilotGlitches = document.getElementById("stat-autopilot-glitches");
  const statLapses = document.getElementById("stat-lapses");
  const statVigilance = document.getElementById("stat-vigilance");
  const statTextTraps = document.getElementById("stat-text-traps");
  const statEgoChecks = document.getElementById("stat-ego-checks");
  const statFinalScore = document.getElementById("stat-final-score");
  
  const toast = document.getElementById("toast");

  // Game Variables
  let deck = [];
  let currentQuestionIndex = 0;
  let startTime = 0;
  let timerId = null;        // setTimeout handle for the per-question countdown
  let answerLocked = false;  // guards against double-answer (click landing as timer fires)

  // Per-question time caps (seconds). Generous enough to READ, not to deliberate —
  // the timer removes the "stop and carefully out-think every trap" exploit without
  // turning this into a pure reading-speed test.
  const TIME_CAPS = {
    lullaby: 4,
    pattern_breaker: 5,
    phantom: 6,
    ego_check: 6,
    wall_of_text: 12
  };

  // Scoring / Metric Accumulators
  let pointsSum = 0.0;
  let triviaCorrect = 0;
  let dopamineSwipes = 0;
  let autopilotGlitches = 0;
  let lapses = 0;              // ran out of time = attention dropped
  let textTrapsEvaded = 0;
  let egoChecksCount = 0;
  let totalReactionTime = 0.0;
  let reactionTimes = [];      // only real (non-timeout) answers, for consistency metric
  let history = [];

  // Initialize Event Listeners
  startBtn.addEventListener("click", startQuiz);
  restartBtn.addEventListener("click", startQuiz);
  shareBtn.addEventListener("click", shareResults);

  // Setup options click handling
  const optionButtons = optionsList.querySelectorAll(".option-btn");
  optionButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      const selectedIndex = parseInt(e.currentTarget.getAttribute("data-index"), 10);
      handleAnswerClick(selectedIndex);
    });
  });

  // Starts the assessment
  function startQuiz() {
    // 0. Kill any countdown left running from a previous session
    clearGameTimer();

    // 1. Build and randomize the deck
    deck = buildGameDeck();
    
    // 2. Reset accumulators
    currentQuestionIndex = 0;
    pointsSum = 0.0;
    triviaCorrect = 0;
    dopamineSwipes = 0;
    autopilotGlitches = 0;
    lapses = 0;
    textTrapsEvaded = 0;
    egoChecksCount = 0;
    totalReactionTime = 0.0;
    reactionTimes = [];
    history = [];

    // 3. Toggle screen states
    startScreen.style.display = "none";
    resultsScreen.style.display = "none";
    quizScreen.style.display = "flex";

    // 4. Load the first question
    loadQuestion();
  }

  // Loads the current question and sets up the UI
  function loadQuestion() {
    const q = deck[currentQuestionIndex];
    
    // Update progress bar
    const questionNum = currentQuestionIndex + 1;
    progressText.textContent = `Question ${questionNum} of 30`;
    progressBarFill.style.width = `${((currentQuestionIndex) / 30) * 100}%`;

    // Dynamic Binding for Type 5: Ego Checks
    if (q.type === "ego_check") {
      // Find the target question from the deck
      const targetQ = deck[q.targetQuestionIndex];
      const correctAnswerText = targetQ.options[targetQ.correctIndex];
      
      // Extract incorrect options from target question to act as distractors
      const targetIncorrects = targetQ.options.filter((_, idx) => idx !== targetQ.correctIndex);
      const distractor1 = targetIncorrects[0] || "Option A";
      const distractor2 = targetIncorrects[1] || "Option B";
      
      // Set the dynamic question text
      q.text = `What was the answer to Question ${targetQ.id} ("${targetQ.text}")?`;
      
      // Shuffle the options to make it tricky
      const optionPool = [
        { text: correctAnswerText, isCorrect: true, isRemember: false },
        { text: distractor1, isCorrect: false, isRemember: false },
        { text: "I don't remember", isCorrect: false, isRemember: true },
        { text: distractor2, isCorrect: false, isRemember: false }
      ];
      
      // In place shuffle
      const shuffledOptions = shuffleArray(optionPool);
      q.options = shuffledOptions.map(o => o.text);
      q.correctIndex = shuffledOptions.findIndex(o => o.isCorrect);
      q.dontRememberIndex = shuffledOptions.findIndex(o => o.isRemember);
    }

    // Adjust question box display based on Type 3: Wall of Text and Stroop Effect
    if (q.textColor) {
      // Display Stroop styling
      wallText.style.display = "block";
      wallText.style.fontSize = "3.2rem";
      wallText.style.fontWeight = "800";
      wallText.style.textAlign = "center";
      wallText.style.color = q.textColor;
      wallText.style.borderLeft = "none";
      wallText.style.backgroundColor = "transparent";
      wallText.style.maxHeight = "none";
      wallText.style.padding = "1rem";
      wallText.textContent = q.text;
      
      questionPrompt.innerHTML = q.questionPrompt;
    } else {
      // Reset wallText style overrides
      wallText.style.fontSize = "";
      wallText.style.fontWeight = "";
      wallText.style.textAlign = "";
      wallText.style.color = "";
      wallText.style.borderLeft = "";
      wallText.style.backgroundColor = "";
      wallText.style.maxHeight = "";
      wallText.style.padding = "";
      
      if (q.type === "wall_of_text") {
        wallText.style.display = "block";
        wallText.textContent = q.text;
        questionPrompt.innerHTML = q.questionPrompt;
      } else {
        wallText.style.display = "none";
        questionPrompt.innerHTML = q.text;
      }
    }

    // Set event listener for injected decoy button
    const decoyBtn = questionPrompt.querySelector(".decoy-btn");
    if (decoyBtn) {
      decoyBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleAnswerClick(-1); // Decoy click index
      });
    }

    // Load choices into buttons
    optionButtons.forEach((btn, idx) => {
      btn.textContent = q.options[idx];
    });

    // Record question presentation time and arm the countdown
    answerLocked = false;
    startTime = Date.now();
    startTimer(deck[currentQuestionIndex]);
  }

  // Arms the per-question countdown bar and the timeout that auto-fails the question.
  function startTimer(q) {
    clearGameTimer();
    const cap = TIME_CAPS[q.type] || 4;

    // Reset the bar to full instantly (no transition), force a reflow, then animate to 0.
    timerBar.style.transition = "none";
    timerBar.style.width = "100%";
    timerBar.className = "timer-bar";
    void timerBar.offsetWidth; // reflow so the next change animates

    timerBar.style.transition = `width ${cap}s linear`;
    timerBar.style.width = "0%";

    // Color shifts as time runs low (visual pressure, no logic impact).
    const warnAt = Math.max(0, (cap - cap * 0.4)) * 1000; // last 40%
    const dangerAt = Math.max(0, (cap - cap * 0.15)) * 1000; // last 15%
    const warnId = setTimeout(() => timerBar.classList.add("warning"), warnAt);
    const dangerId = setTimeout(() => {
      timerBar.classList.remove("warning");
      timerBar.classList.add("danger");
    }, dangerAt);

    timerId = setTimeout(() => {
      clearTimeout(warnId);
      clearTimeout(dangerId);
      handleAnswerClick(-2); // -2 = timed out
    }, cap * 1000);
  }

  function clearGameTimer() {
    if (timerId !== null) {
      clearTimeout(timerId);
      timerId = null;
    }
  }

  // Handles the click on an answer button
  function handleAnswerClick(selectedIndex) {
    // Guard: ignore a click that lands in the same tick the timeout already fired.
    if (answerLocked) return;
    answerLocked = true;
    clearGameTimer();

    const elapsed = (Date.now() - startTime) / 1000; // in seconds
    const q = deck[currentQuestionIndex];
    let wasCorrect = false;
    let pointAwarded = 0.0;
    const timedOut = selectedIndex === -2;

    // 1. Scoring Logic
    if (timedOut) {
      // Ran out of time = attention lapse. Counts as a miss.
      pointAwarded = 0.0;
      wasCorrect = false;
      lapses++;
    } else if (selectedIndex === -1) {
      // Decoy clicked! Instant autopilot error
      pointAwarded = 0.0;
      wasCorrect = false;
    } else if (q.type === "ego_check") {
      if (selectedIndex === q.correctIndex) {
        pointAwarded = 1.0;
        egoChecksCount++;
        wasCorrect = true;
      } else if (selectedIndex === q.dontRememberIndex) {
        pointAwarded = 0.5; // Honest choice, partial credit, no penalty
        wasCorrect = true; // Prevents autopilot fail flag
      } else {
        pointAwarded = 0.0; // Incorrect memory, 0 credit
        wasCorrect = false;
      }
    } else {
      if (selectedIndex === q.correctIndex) {
        pointAwarded = 1.0;
        triviaCorrect++;
        wasCorrect = true;
        if (q.type === "wall_of_text") {
          textTrapsEvaded++;
        }
      } else {
        pointAwarded = 0.0;
        wasCorrect = false;
      }
    }

    pointsSum += pointAwarded;
    totalReactionTime += elapsed;
    // Only real answers feed reaction-time consistency; a timeout is a forced max, not a choice.
    if (!timedOut) {
      reactionTimes.push(elapsed);
    }

    // 2. Secret Algorithm Calculations

    // Speed thresholds
    let speedLimit = 0.0;
    if (q.type === "wall_of_text") {
      speedLimit = 1.5; // Wall of Text requires reading
    } else if (q.type !== "lullaby") {
      speedLimit = 1.0; // Medium speed limits (Pattern Breakers, Phantom, Ego)
    }

    // A. Check for Dopamine Swipe (answering speed-limited questions too fast)
    let isDopamineSwipe = false;
    if (!timedOut && speedLimit > 0 && elapsed < speedLimit) {
      dopamineSwipes++;
      isDopamineSwipe = true;
    }

    // B. Check for Autopilot Glitch (getting a speed-limited trick wrong AND click speed was fast)
    let isAutopilotGlitch = false;
    if (!timedOut && q.type !== "lullaby" && !wasCorrect && elapsed < speedLimit) {
      autopilotGlitches++;
      isAutopilotGlitch = true;
    }

    // Save answer context to history log
    history.push({
      id: q.id,
      type: q.type,
      selectedIndex,
      wasCorrect,
      reactionTime: elapsed,
      isDopamineSwipe,
      isAutopilotGlitch,
      timedOut
    });

    // 3. Advance state
    currentQuestionIndex++;
    if (currentQuestionIndex < 30) {
      loadQuestion();
    } else {
      showResults();
    }
  }

  // Displays the Results Dashboard and Roasts
  function showResults() {
    quizScreen.style.display = "none";
    resultsScreen.style.display = "flex";

    // 1. Calculate metrics
    //
    // Rebalanced so attention is *earned*, not handed out. The old model gave a free
    // 60% just for never clicking fast (slow + wrong still scored 60). Now the score is
    // built from three things that actually reflect sustained attention:
    //
    //   Accuracy (50%)    — did you get them right at all.
    //   Vigilance (35%)   — did you catch the TRAPS specifically (the attention-bearing
    //                       questions: pattern breakers, walls of text, phantoms, ego checks).
    //   Consistency (15%) — steady reaction times + no lapses/autopilot. The real signal
    //                       for attention span is consistency, not peak speed.

    const triviaAccuracy = (pointsSum / 30) * 100;

    // Vigilance: fraction of trap questions answered correctly.
    const traps = history.filter(h => h.type !== "lullaby");
    const trapsCorrect = traps.filter(h => h.wasCorrect).length;
    const vigilance = traps.length > 0 ? (trapsCorrect / traps.length) * 100 : 100;

    // Consistency: start at 100, penalize attention failures and erratic timing.
    // Reaction-time variability uses the coefficient of variation (std / mean).
    let rtCV = 0;
    if (reactionTimes.length > 1) {
      const mean = reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length;
      if (mean > 0) {
        const variance = reactionTimes.reduce((a, b) => a + (b - mean) ** 2, 0) / reactionTimes.length;
        rtCV = Math.sqrt(variance) / mean;
      }
    }
    let consistency = 100;
    consistency -= lapses * 12;             // timed out = attention dropped
    consistency -= autopilotGlitches * 10;
    consistency -= dopamineSwipes * 6;
    consistency -= Math.min(30, rtCV * 60); // erratic timing, capped at 30
    consistency = Math.max(0, Math.min(100, consistency));

    let finalScore = Math.round(
      (triviaAccuracy * 0.50) + (vigilance * 0.35) + (consistency * 0.15)
    );

    // AND-gate for the top tier: you can't be a "Zen Master" if you slept through the
    // traps. Weak vigilance caps the ceiling no matter how clean your timing was.
    if (vigilance < 70 && finalScore > 79) {
      finalScore = 79;
    }

    // Cooking percentage: how "cooked" the attention span is (inverse of final score).
    const cookingPercent = Math.max(0, 100 - finalScore);

    // 2. Classify Diagnostic Tier (5 levels)
    let badgeEmoji = "🐙";
    let label = "Zen Master";
    let roastClass = "status-un-cooked";
    let roastText = "";
    let shrimpLabel = "Raw 🦐";

    if (finalScore >= 80) {
      badgeEmoji = "🐙";
      label = "Zen Master (Octopus)";
      roastClass = "status-un-cooked";
      roastText = "Status: Un-Cooked. You actually read the prompts instead of blindly clicking for dopamine. Your brain survived the algorithm.";
    } else if (finalScore >= 60) {
      badgeEmoji = "🐦";
      label = "Focused Individual (Crow)";
      roastClass = "status-medium-rare";
      roastText = "Status: Medium-Rare. You caught most of the traps, but your thumb still moves faster than your eyes sometimes.";
    } else if (finalScore >= 40) {
      badgeEmoji = "🐱";
      label = "Casual Skimmer (Cat)";
      roastClass = "status-medium";
      roastText = "Status: Medium. You navigated some of the assessment, but you're still easily distracted by shiny things.";
    } else if (finalScore >= 20) {
      badgeEmoji = "🐹";
      label = "Scatterbrain (Hamster)";
      roastClass = "status-well-done";
      roastText = "Status: Well Done. You fell for the speed traps and went on autopilot. The algorithm owns you.";
    } else {
      badgeEmoji = "🐟";
      label = "Deep Fried (Goldfish)";
      roastClass = "status-deep-fried";
      roastText = "Status: Deep Fried. You have the object permanence of a moth near a porch light. You completely auto-piloted the entire test. Go read a physical book.";
    }

    // Determine shrimp cooking title based on cooking percent
    if (cookingPercent >= 80) {
      shrimpLabel = "Deep Fried 🔥";
    } else if (cookingPercent >= 60) {
      shrimpLabel = "Well Done 🥪";
    } else if (cookingPercent >= 40) {
      shrimpLabel = "Medium 🍳";
    } else if (cookingPercent >= 20) {
      shrimpLabel = "Medium-Rare 🍤";
    } else {
      shrimpLabel = "Raw 🦐";
    }

    // 3. Render results to DOM
    animalBadge.textContent = badgeEmoji;
    diagnosisLabel.textContent = label;
    
    // Clear and set roast level status class
    roastStatus.className = "roast-status " + roastClass;
    roastStatus.textContent = roastText.split(".")[0] + "."; // Display title status
    
    roastDescription.textContent = roastText;

    // Cooked Shrimp Meter transition
    shrimpLevelText.textContent = shrimpLabel;
    shrimpIndicator.style.left = `${cookingPercent}%`;

    // Stats Table bindings
    statTriviaAccuracy.textContent = `${triviaAccuracy.toFixed(1)}%`;
    
    const avgReactionTime = totalReactionTime / 30;
    statReactionTime.textContent = `${avgReactionTime.toFixed(2)}s`;
    
    statDopamineSwipes.textContent = dopamineSwipes;
    statAutopilotGlitches.textContent = autopilotGlitches;
    statLapses.textContent = lapses;
    statVigilance.textContent = `${vigilance.toFixed(0)}% (${trapsCorrect}/${traps.length})`;
    statTextTraps.textContent = `${textTrapsEvaded}/4 🍌`;
    statEgoChecks.textContent = `${egoChecksCount}/3`;
    statFinalScore.textContent = `${finalScore}%`;
  }

  // Generates and copies share assessment to clipboard
  function shareResults() {
    const emoji = animalBadge.textContent;
    const diag = diagnosisLabel.textContent;
    const finalPct = statFinalScore.textContent;
    const accuracy = statTriviaAccuracy.textContent;
    const rt = statReactionTime.textContent;
    const swipes = statDopamineSwipes.textContent;
    const glitches = statAutopilotGlitches.textContent;
    const lapsesText = statLapses.textContent;
    const vigilanceText = statVigilance.textContent;
    const cookingText = shrimpLevelText.textContent;

    const shareText = `🧠 THE GOLDFISH PROTOCOL DIAGNOSTIC 🧠
-----------------------------------------
Attention Animal: ${emoji} ${diag}
Dopamine Cooking Level: ${cookingText}
-----------------------------------------
Final Attention Score: ${finalPct}
Trivia Accuracy: ${accuracy}
Vigilance (Traps Caught): ${vigilanceText}
Average Reaction Time: ${rt}
Dopamine Swipes: ${swipes}
Autopilot Glitches: ${glitches}
Attention Lapses: ${lapsesText}
-----------------------------------------
Check your attention span: ${window.location.href}`;

    navigator.clipboard.writeText(shareText).then(() => {
      // Trigger toast
      toast.classList.add("show");
      setTimeout(() => {
        toast.classList.remove("show");
      }, 2500);
    }).catch(err => {
      console.error("Failed to copy results: ", err);
    });
  }
});
