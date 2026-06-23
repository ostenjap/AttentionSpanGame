# Prompt: "The Goldfish Protocol" - Attention Span Diagnostic Game

**Role:** You are an expert web developer and UI/UX designer with a background in behavioral psychology.

**Task:** Build a single-page web application (HTML/CSS/JS or React) for a rapid-fire, 30-question quiz game. The game presents itself as a simple trivia/knowledge test, but the hidden algorithm is actually measuring the player's attention span, impulse control, and reading comprehension.

## 1. Core Mechanics & The Secret Algorithm

The game must track two primary metrics behind the scenes:
- **Accuracy:** Did they get the question right?
- **Reaction Time:** How long did it take them to click an answer?

### The "Cooked" Algorithm:
- **Speed Penalty:** If a player answers a text-heavy question in under 1.5 seconds, flag it as a "Dopamine Swipe" (they didn't read it). Subtract points even if they guessed correctly.
- **Autopilot Penalty:** Track consecutive fast clicks. If they breeze through 4 easy questions and instantly fail a trick question, flag it as an "Autopilot Glitch."
- **Final Score Weighting:** The final grade should be 40% trivia accuracy and 60% impulse control/attention metrics.

## 2. Question Database Requirements

Generate a hardcoded array of 30 questions. The questions must be a carefully curated mix of the following types to manipulate the player's rhythm:
- **Type 1: The Lullabies (Filler):** Simple, obvious questions to build speed and false confidence (e.g., "What color is a school bus?", "What is 2 + 2?").
- **Type 2: Pattern Breakers:** Place these after 3-4 Lullabies. The answer breaks the physical clicking pattern, or adds a sudden "NOT" to the question.
- **Type 3: The Wall of Text (Speed Trap):** 1-2 paragraphs of boring text (e.g., about mitochondria or history). Hidden at the very end of the text is a specific instruction: "Actually, just click the answer 'Banana' to prove you read this."
- **Type 4: Phantom Instructions:** Test visual focus. Prompt: "Select the third option from the top." The answers are strings like "1. The first option", "2. The third option", "3. The correct option", "4. The second option".
- **Type 5: Ego Check:** Suddenly ask: "What was the answer to question 12?" with an option for "I don't remember" (which is the safest/most honest choice).

## 3. UI/UX Guidelines
- **Design:** Clean, minimalist, and clinical. It should look like a serious cognitive test (white/light gray backgrounds, clear typography, prominent buttons).
- **Pacing:** Instant transitions between questions. Do not show if they got it right or wrong during the quiz—this keeps the momentum high and prevents them from adjusting their behavior.
- **Progress:** Show a subtle progress bar (e.g., "Question 14 of 30").

## 4. The End Screen (The Roast)

Once all 30 questions are answered, clear the screen and reveal the true nature of the test. Display their "Attention Span Diagnosis" based on their algorithm score:
- **90-100% (Zen Master):** "Status: Un-Cooked. You actually read the prompts instead of blindly clicking for dopamine. Your brain survived the algorithm."
- **60-89% (Focused Individual):** "Status: Medium-Rare. You caught most of the traps, but your thumb still moves faster than your eyes sometimes."
- **30-59% (Scatterbrain):** "Status: Well Done. You fell for the speed traps and went on autopilot. The algorithm owns you."
- **0-29% (Deep Fried):** "Status: Deep Fried. You have the object permanence of a moth near a porch light. You completely auto-piloted the entire test. Go read a physical book."

Include a breakdown of their stats: Trivia Accuracy, Average Reaction Time, and "Impulse Errors" (traps triggered).
