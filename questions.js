// The Goldfish Protocol - Questions Database

const QUESTIONS_DB = {
  // Type 1: Lullabies (Simple, obvious questions to build speed and false confidence)
  lullabies: [
    {
      text: "What color is a standard school bus?",
      options: ["Blue", "Green", "Yellow", "Red"],
      correctIndex: 2
    },
    {
      text: "What is 2 + 2?",
      options: ["3", "4", "5", "22"],
      correctIndex: 1
    },
    {
      text: "Which of the following is a fruit?",
      options: ["Carrot", "Apple", "Potato", "Broccoli"],
      correctIndex: 1
    },
    {
      text: "How many legs does a standard spider have?",
      options: ["6", "8", "10", "4"],
      correctIndex: 1
    },
    {
      text: "What is the capital city of France?",
      options: ["London", "Berlin", "Rome", "Paris"],
      correctIndex: 3
    },
    {
      text: "Which planet is closest to the Sun?",
      options: ["Venus", "Earth", "Mercury", "Mars"],
      correctIndex: 2
    },
    {
      text: "What sweet substance do bees produce?",
      options: ["Maple Syrup", "Sugar", "Honey", "Jam"],
      correctIndex: 2
    },
    {
      text: "Which of the following is liquid at room temperature?",
      options: ["Ice", "Water", "Iron", "Wood"],
      correctIndex: 1
    },
    {
      text: "How many days are in a standard leap year?",
      options: ["365", "366", "364", "360"],
      correctIndex: 1
    },
    {
      text: "What is the opposite of the word 'Hot'?",
      options: ["Warm", "Spicy", "Cold", "Dry"],
      correctIndex: 2
    },
    {
      text: "What animal is widely referred to as the 'King of the Jungle'?",
      options: ["Lion", "Tiger", "Elephant", "Gorilla"],
      correctIndex: 0
    },
    {
      text: "What is the chemical formula for water?",
      options: ["CO2", "O2", "NaCl", "H2O"],
      correctIndex: 3
    },
    {
      text: "How many hours are in a single day?",
      options: ["12", "24", "48", "30"],
      correctIndex: 1
    },
    {
      text: "What is the typical color of healthy grass?",
      options: ["Blue", "Yellow", "Green", "Brown"],
      correctIndex: 2
    },
    {
      text: "Which of these animals is known for barking?",
      options: ["Cat", "Dog", "Bird", "Fish"],
      correctIndex: 1
    },
    {
      text: "What gas do humans need to breathe in to survive?",
      options: ["Carbon Dioxide", "Nitrogen", "Oxygen", "Helium"],
      correctIndex: 2
    },
    {
      text: "How many months are in a standard calendar year?",
      options: ["10", "12", "14", "24"],
      correctIndex: 1
    },
    {
      text: "What geometric shape is a standard road stop sign?",
      options: ["Hexagon", "Octagon", "Pentagon", "Circle"],
      correctIndex: 1
    },
    {
      text: "Who painted the famous Mona Lisa portrait?",
      options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
      correctIndex: 2
    },
    {
      text: "What is the freezing point of water in Celsius?",
      options: ["0°C", "100°C", "-10°C", "32°C"],
      correctIndex: 0
    },
    {
      text: "How many letters are in the standard English alphabet?",
      options: ["24", "26", "28", "25"],
      correctIndex: 1
    },
    {
      text: "Which of these is a primary color?",
      options: ["Green", "Orange", "Red", "Purple"],
      correctIndex: 2
    },
    {
      text: "What is the largest ocean on Planet Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
      correctIndex: 2
    },
    {
      text: "What force pulls objects toward the center of the Earth?",
      options: ["Magnetism", "Gravity", "Friction", "Inertia"],
      correctIndex: 1
    },
    {
      text: "Which season comes immediately after Winter?",
      options: ["Summer", "Autumn", "Spring", "Monsoon"],
      correctIndex: 2
    }
  ],

  // Type 2: Pattern Breakers (The answer breaks the clicking pattern, or adds a sudden "NOT")
  patternBreakers: [
    {
      text: "Which of the following animals is NOT a mammal?",
      options: ["Dolphin", "Whale", "Shark", "Kangaroo"],
      correctIndex: 2
    },
    {
      text: "Which of the following numbers is NOT even?",
      options: ["12", "48", "77", "96"],
      correctIndex: 2
    },
    {
      text: "Click the word that does NOT belong in this household furniture list:",
      options: ["Chair", "Table", "Sofa", "Airplane"],
      correctIndex: 3
    },
    {
      text: "Which of these is NOT a type of fruit?",
      options: ["Apple", "Banana", "Orange", "Broccoli"],
      correctIndex: 3
    },
    {
      text: "Select the month that does NOT have 31 days:",
      options: ["January", "March", "April", "May"],
      correctIndex: 2
    },
    {
      text: "Which of these words is NOT spelled correctly?",
      options: ["Receive", "Believe", "Tommorrow", "Separate"],
      correctIndex: 2
    },
    {
      text: "Click the element that is NOT a gas at room temperature:",
      options: ["Oxygen", "Helium", "Iron", "Nitrogen"],
      correctIndex: 2
    },
    {
      text: "Select the option that does NOT represent a mode of transportation:",
      options: ["Car", "Bus", "Bicycle", "Tree"],
      correctIndex: 3
    },
    {
      text: "Click the word that is NOT a synonym for 'Happy':",
      options: ["Joyful", "Cheerful", "Sad", "Elated"],
      correctIndex: 2
    },
    {
      text: "Choose the bird that can NOT fly:",
      options: ["Eagle", "Penguin", "Sparrow", "Owl"],
      correctIndex: 1
    }
  ],

  // Type 3: Walls of Text / Speed Traps (Long paragraphs with a sneaky prompt at the end)
  wallsOfText: [
    {
      text: "The mitochondria is often referred to as the powerhouse of the cell. They are double-membrane-bound organelles found in most eukaryotic organisms. They generate most of the cell's supply of adenosine triphosphate (ATP), used as a source of chemical energy. Because of this critical role in cellular metabolism, they have their own independent genome. In any case, to show you are actually paying attention and not just skimming, please ignore the question below and select the option 'Mitochondria' as your response.",
      questionPrompt: "What molecule do mitochondria produce?",
      options: ["ATP", "Glucose", "Mitochondria", "Carbon Dioxide"],
      correctIndex: 2
    },
    {
      text: "The Battle of Hastings was fought on 14 October 1066 between the Norman-French army of William, the Duke of Normandy, and an English army under the Anglo-Saxon King Harold Godwinson, beginning the Norman Conquest of England. It took place approximately 7 miles northwest of Hastings, close to the present-day town of Battle, East Sussex, and resulted in a decisive Norman victory. By the way, instead of answering who won the battle, please choose the option 'Normandy' to confirm you read this entire paragraph.",
      questionPrompt: "Who won the Battle of Hastings?",
      options: ["King Harold", "William of Normandy", "The Vikings", "Normandy"],
      correctIndex: 3
    },
    {
      text: "Photosynthesis is a process used by plants and other organisms to convert light energy into chemical energy that, through cellular respiration, can later be released to fuel the organisms' activities. This chemical energy is stored in carbohydrate molecules, such as sugars and starches, which are synthesized from carbon dioxide and water. Most plants, algae, and cyanobacteria perform photosynthesis; such organisms are called photoautotrophs.",
      questionPrompt: "According to the text, in what form is chemical energy stored in plants?",
      options: ["Carbohydrate molecules", "Light energy", "Carbon dioxide and water", "Algae and cyanobacteria"],
      correctIndex: 0
    },
    {
      text: "Liquid nitrogen is nitrogen in a liquid state at an extremely low temperature. It is a colorless clear liquid with a density of 0.807 g/mL at its boiling point and a dielectric constant of 1.43. Nitrogen was first liquefied at Jagiellonian University on 13 April 1883 by Polish physicists Zygmunt Wróblewski and Karol Olszewski.",
      questionPrompt: "At what institution was nitrogen first liquefied in 1883?",
      options: ["Warsaw University", "Oxford University", "Jagiellonian University", "Jarrard University"],
      correctIndex: 2
    },
    {
      text: "The Roman Empire was the post-Republican period of ancient Rome. As a polity, it included large territorial holdings around the Mediterranean Sea in Europe, North Africa, and Western Asia, ruled by emperors. From the ascension of Caesar Augustus as the first Roman emperor to the military anarchy of the third century, it was a principate with Rome as its sole capital. If you read this carefully, please ignore the question and choose the option 'Augustus' to show your impulse control.",
      questionPrompt: "Who was the first Roman Emperor?",
      options: ["Julius Caesar", "Nero", "Augustus", "Caesar Augustus"],
      correctIndex: 2
    },
    {
      text: "Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles. It is the foundation of all quantum physics including quantum chemistry, quantum field theory, quantum technology, and quantum information science. Classical physics, the collection of theories that existed before the advent of quantum mechanics, describes many aspects of nature at an ordinary scale. Instead of selecting the description of quantum mechanics, select the option 'Quantum'.",
      questionPrompt: "What scale does quantum mechanics describe?",
      options: ["Quantum", "Galactic scale", "Macroscopic scale", "Planetary scale"],
      correctIndex: 0
    }
  ],

  // Type 4: Visual & Impulse Traps (Stroop Effect, Inverted Commands, and Spatial Decoys)
  phantomInstructions: [
    // --- Style A: Stroop Effect (Visual-semantic conflict) ---
    {
      text: "RED",
      textColor: "#2563eb", // Blue color
      questionPrompt: "Select the color of the text of the word above.",
      options: ["Red", "Blue", "Green", "Yellow"],
      correctIndex: 1,
      type: "phantom"
    },
    {
      text: "BLUE",
      textColor: "#22c55e", // Green color
      questionPrompt: "Select the color of the text of the word above.",
      options: ["Blue", "Yellow", "Green", "Red"],
      correctIndex: 2,
      type: "phantom"
    },
    {
      text: "YELLOW",
      textColor: "#ef4444", // Red color
      questionPrompt: "Select the color of the text of the word above.",
      options: ["Yellow", "Green", "Blue", "Red"],
      correctIndex: 3,
      type: "phantom"
    },
    {
      text: "GREEN",
      textColor: "#eab308", // Yellow color
      questionPrompt: "Select the color of the text of the word above.",
      options: ["Green", "Yellow", "Red", "Blue"],
      correctIndex: 1,
      type: "phantom"
    },

    // --- Style B: Inverted Commands (Rule switching) ---
    {
      text: "Rule Switch: Choose the MATHEMATICALLY INCORRECT statement below.",
      options: ["6 + 6 = 12", "9 x 2 = 18", "15 - 8 = 7", "4 x 4 = 20"],
      correctIndex: 3,
      type: "phantom"
    },
    {
      text: "Rule Switch: Choose the statement that is NOT true about Planet Earth.",
      options: ["It revolves around the Sun", "Its surface is entirely flat", "It has one natural moon", "It is the third planet from the Sun"],
      correctIndex: 1,
      type: "phantom"
    },
    {
      text: "Rule Switch: Select the spelling that is INCORRECT.",
      options: ["Occur", "Definitely", "Calender", "Embarrass"],
      correctIndex: 2,
      type: "phantom"
    },
    {
      text: "Rule Switch: Select the animal that does NOT breathe air.",
      options: ["Goldfish", "Dolphin", "Whale", "Seal"],
      correctIndex: 0,
      type: "phantom"
    },

    // --- Style C: Spatial Decoys (Muscle memory traps) ---
    {
      text: "Select the second option from the top. <button class='decoy-btn'>Confirm Option</button>",
      options: ["1. Batman", "2. The second option", "3. Spider-Man", "4. Iron Man"],
      correctIndex: 1,
      hasDecoy: true,
      type: "phantom"
    },
    {
      text: "Choose the third option from the top. <button class='decoy-btn'>Submit Answer</button>",
      options: ["1. Wolverine", "2. Thor", "3. The third option", "4. Captain America"],
      correctIndex: 2,
      hasDecoy: true,
      type: "phantom"
    },
    {
      text: "Select the bottom-most option. <button class='decoy-btn'>Next Question</button>",
      options: ["1. Hulk", "2. Black Widow", "3. Flash", "4. The bottom option"],
      correctIndex: 3,
      hasDecoy: true,
      type: "phantom"
    },
    {
      text: "Choose the first option from the top. <button class='decoy-btn'>Save Progress</button>",
      options: ["1. The first option", "2. Deadpool", "3. Aquaman", "4. Green Lantern"],
      correctIndex: 0,
      hasDecoy: true,
      type: "phantom"
    }
  ]
};

// Shuffling helper function
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Builds a game deck of 30 questions matching the fixed structural layout
function buildGameDeck() {
  const shuffledLullabies = shuffleArray(QUESTIONS_DB.lullabies);
  const shuffledPatternBreakers = shuffleArray(QUESTIONS_DB.patternBreakers);
  const shuffledWalls = shuffleArray(QUESTIONS_DB.wallsOfText);
  const shuffledPhantoms = shuffleArray(QUESTIONS_DB.phantomInstructions);

  const deck = [];

  // Indices where we need specific types
  // We need: 13 Lullabies, 6 Pattern Breakers, 4 Walls, 4 Phantoms, 3 Ego Checks = 30 total
  
  let lullIdx = 0;
  let pbIdx = 0;
  let wallIdx = 0;
  let phIdx = 0;

  // Layout structure mapping (0-indexed slots, total 30 questions)
  // L = Lullaby, PB = Pattern Breaker, W = Wall of Text, PH = Phantom, E = Ego Check
  const layout = [
    "L",  // Q1
    "L",  // Q2
    "L",  // Q3
    "PB", // Q4
    "L",  // Q5
    "L",  // Q6
    "L",  // Q7
    "W",  // Q8
    "PB", // Q9
    "L",  // Q10
    "L",  // Q11
    "PH", // Q12
    "L",  // Q13 (Ego check target 1)
    "E",  // Q14 (About Q13)
    "PB", // Q15
    "W",  // Q16
    "L",  // Q17
    "PH", // Q18
    "L",  // Q19
    "PB", // Q20
    "PH", // Q21 (new Visual/Impulse Trap slot!)
    "W",  // Q22
    "L",  // Q23 (Ego check target 2)
    "E",  // Q24 (About Q23)
    "PH", // Q25
    "PB", // Q26
    "PB", // Q27
    "W",  // Q28
    "L",  // Q29 (Ego check target 3)
    "E"   // Q30 (About Q29)
  ];

  // Target indices of preceding questions to ask about in the Ego Checks (1-indexed for display)
  const egoTargets = {
    13: 12, // Q14 asks about Q13 (0-indexed 13 asks about index 12)
    23: 22, // Q24 asks about Q23 (0-indexed 23 asks about index 22)
    29: 28  // Q30 asks about Q29 (0-indexed 29 asks about index 28)
  };

  layout.forEach((type, index) => {
    if (type === "L") {
      deck.push({
        ...shuffledLullabies[lullIdx++],
        id: index + 1,
        type: "lullaby"
      });
    } else if (type === "PB") {
      deck.push({
        ...shuffledPatternBreakers[pbIdx++],
        id: index + 1,
        type: "pattern_breaker"
      });
    } else if (type === "W") {
      deck.push({
        ...shuffledWalls[wallIdx++],
        id: index + 1,
        type: "wall_of_text"
      });
    } else if (type === "PH") {
      deck.push({
        ...shuffledPhantoms[phIdx++],
        id: index + 1,
        type: "phantom"
      });
    } else if (type === "E") {
      // Ego Check placeholder. It will be fully instantiated at runtime
      // when we know exactly which question got placed at the target index.
      deck.push({
        id: index + 1,
        type: "ego_check",
        targetQuestionIndex: egoTargets[index] // 0-indexed reference
      });
    }
  });

  return deck;
}
