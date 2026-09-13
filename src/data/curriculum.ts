import { Stage } from "../types";

export const CURRICULUM_STAGES: Stage[] = [
  {
    id: "ai-foundations",
    number: 1,
    title: "AI Foundations",
    subtitle: "From Deterministic Code to Learning Systems",
    description: "Understand the seismic shift from hardcoded if-else logic to systems that synthesize rules from observations.",
    iconName: "Cpu",
    skillsAcquired: ["Paradigm Modeling", "State Representation", "Inductive Bias"],
    quests: [
      {
        id: "quest-1",
        stageId: "ai-foundations",
        title: "The Paradigm Shift: Rules vs. Learning",
        slug: "rules-vs-learning",
        shortDescription: "Explore why classical software fails at perception and how statistical learning fundamentally differs from procedural algorithms.",
        xpReward: 120,
        estimatedMinutes: 6,
        skillTag: "Paradigm Modeling",
        badgeTitle: "First Spark",
        learn: {
          title: "Traditional Code vs. Machine Learning",
          summary: "In classical programming, humans write the Rules. In Machine Learning, computers discover the Rules by looking at real-world Examples!",
          qaCards: [
            {
              badgeEmoji: "💡",
              question: "Why can't we just write 'if/else' rules to recognize a cat in a photo?",
              answer: "Because cats come in infinite breeds, angles, lighting conditions, and poses! Writing every rule by hand would require millions of brittle if/else lines that break the moment a cat turns its head.",
              analogy: "Like trying to write an exact instruction manual for how to ride a bicycle—you learn by balancing and practicing, not by reading 10,000 rules!"
            },
            {
              badgeEmoji: "🔄",
              question: "How does Machine Learning flip traditional programming upside down?",
              answer: "In traditional coding, you feed Data + Rules into a computer to get Answers. In Machine Learning, you feed Data + Answers into the computer, and the computer crafts the Rules!",
              analogy: "Instead of giving a chef an exact recipe (Rules), you give them 500 delicious cakes (Data + Answers) and ask them to deduce the secret recipe (Model Rules)."
            },
            {
              badgeEmoji: "🎯",
              question: "What actually guides an AI when it's learning?",
              answer: "An 'Objective Function' (or Loss Function). It gives the AI a mathematical report card on every guess: 'You were 80% wrong!' The AI nudges its internal dials until the error shrinks to near zero.",
              analogy: "Playing the game 'Hot or Cold'—every time the AI takes a step, the loss function tells it 'Warmer!' or 'Colder!' until it finds the prize."
            }
          ],
          keyConcepts: [
            {
              term: "Deduction vs Induction",
              definition: "Classical code deduces answers from strict rules. Machine Learning induces general rules from examples."
            },
            {
              term: "Brittleness",
              definition: "Why hand-written rules shatter when faced with messy, noisy, real-world sensory data."
            },
            {
              term: "Objective / Loss Score",
              definition: "A mathematical score measuring error, telling the AI how to improve with each try."
            }
          ],
          proTip: "Remember: Never ask 'What hardcoded rule explains this?'. Instead ask: 'What examples and loss score will let the computer learn it?'"
        },
        conceptCheck: {
          contextPill: "Step 2: Rapid Concept Check",
          prompt: "What is the core difference between classical programming and Machine Learning?",
          options: [
            {
              id: "cc-1-a",
              text: "Classical programming requires data + answers to create rules, while ML only uses rules.",
              isCorrect: false,
              explanation: "That's the reverse! Classical programming requires humans to write the rules upfront."
            },
            {
              id: "cc-1-b",
              text: "In classical coding, humans supply rules + data to get answers; in ML, the computer analyzes data + answers to discover the rules.",
              isCorrect: true,
              explanation: "Boom! 🎯 Exactly right! ML inverts the workflow so computers learn the underlying patterns themselves."
            },
            {
              id: "cc-1-c",
              text: "Machine Learning models don't need any data at all to make decisions.",
              isCorrect: false,
              explanation: "ML is fundamentally data-driven—without training examples, the model has nothing to learn from!"
            },
            {
              id: "cc-1-d",
              text: "Classical programs are written in Python, while AI is always written in HTML.",
              isCorrect: false,
              explanation: "Both paradigms use modern programming languages—the difference is the algorithmic philosophy!"
            }
          ],
          encouragement: "Fantastic instinct! You've grasped the foundational shift of the AI revolution."
        },
        bossChallenge: {
          title: "Boss Challenge: The Postal Sorting Catastrophe",
          scenario: "You are the lead AI Engineer at SwiftPost. The company just spent $2 million on a legacy scanner with 50,000 hand-written if/else rules to sort handwritten zip codes. It fails on 42% of letters because people write the number '7' with slants, crosses, and scribbles.",
          question: "The CEO wants you to fix it by writing 10,000 more if/else rules. How do you respond and solve this challenge?",
          options: [
            {
              id: "boss-1-a",
              text: "Agree to write 10,000 more rules because handwritten digits have a predictable finite number of strokes.",
              isCorrect: false,
              explanation: "More if/else rules will only create a brittle mess! Variations in handwriting are virtually infinite."
            },
            {
              id: "boss-1-b",
              text: "Scrap the if/else logic. Collect 100,000 labeled digit images and train a neural network using an objective function to minimize classification error.",
              isCorrect: true,
              explanation: "VICTORY! 🏆 High-dimensional sensory data like handwriting is conquered by statistical pattern recognition, not manual rulebooks!"
            },
            {
              id: "boss-1-c",
              text: "Switch to sorting mail solely by envelope color rather than reading postal codes.",
              isCorrect: false,
              explanation: "That ignores the core mission of delivering mail to the right address!"
            }
          ],
          bossAvatar: "🤖",
          bossQuote: "'Just write more if/else statements!' — CEO of Legacy Code Corp",
          victoryMessage: "LEGACY BOSS DEFEATED! 🚀 You showed that real-world perception demands learning systems, not endless if/else spaghetti.",
          deepDiveExplanation: "Sensory reality (pixels, audio, medical scans) has infinite combinations. Machine learning solves this by mapping high-dimensional inputs to probabilities via continuous parameter optimization."
        },
        prove: {
          question: "Why does classical rule-based programming fail when processing unstructured sensory data like handwritten digits?",
          scenario: "You are designing an automated sorting system for handwritten zip codes on postal envelopes.",
          options: [
            {
              id: "opt-1",
              text: "Handwritten digits have infinite visual variations in stroke, slant, and ink density that cannot be completely cataloged with if/else rules.",
              isCorrect: true,
              explanation: "Exact match! Unstructured visual data lives in high-dimensional continuous space; combinatorial explosion makes explicit rule drafting impossible."
            },
            {
              id: "opt-2",
              text: "CPUs cannot process pixel data without converting it to text first.",
              isCorrect: false,
              explanation: "Incorrect. CPUs process binary buffers and matrix data natively."
            }
          ],
          deepDiveExplanation: "The breakthrough of statistical learning is that instead of human engineers enumerating all variations, the model learns a manifold mapping raw pixels to class probabilities."
        }
      }
    ]
  },
  {
    id: "machine-learning",
    number: 2,
    title: "Machine Learning",
    subtitle: "Loss Landscapes, Gradients & Generalization",
    description: "Master the mathematical heart of learning: parameter optimization, cost functions, and the delicate balance between memorization and generalization.",
    iconName: "TrendingUp",
    skillsAcquired: ["Gradient Intuition", "Loss Landscapes", "Regularization"],
    quests: [
      {
        id: "quest-2",
        stageId: "machine-learning",
        title: "The Generalization Dilemma: Overfitting vs Bias",
        slug: "overfitting-vs-bias",
        shortDescription: "Discover why a model that scores 100% on training tests often catastrophically fails in the real world.",
        xpReward: 140,
        estimatedMinutes: 6,
        skillTag: "Regularization",
        badgeTitle: "Boundary Breaker",
        learn: {
          title: "The Bias-Variance Tradeoff",
          summary: "True learning is not memorization! A great AI model discovers real underlying patterns while ignoring random flukes and noise.",
          qaCards: [
            {
              badgeEmoji: "🧠",
              question: "What is 'Overfitting' and why is it dangerous in AI?",
              answer: "Overfitting happens when an AI model memorizes every tiny detail, quirk, and noise in its training examples. It scores 100% on practice tests, but completely crashes when given a new, unseen question in the real world!",
              analogy: "Like a student who memorizes the exact answer 'B' to Question 4 on a practice test, but fails the actual exam because the teacher shuffled the multiple-choice order!"
            },
            {
              badgeEmoji: "⚖️",
              question: "What is 'Underfitting'?",
              answer: "Underfitting happens when your model is too simple to capture even the basic trend in the data. It's like trying to draw a straight line through a roller coaster curve.",
              analogy: "Like studying for a biology exam by reading only the back cover of the textbook—you didn't learn enough details to answer anything."
            },
            {
              badgeEmoji: "🛡️",
              question: "How do AI engineers prevent models from memorizing cheat sheets?",
              answer: "We use techniques like 'Validation Splits' (testing on unseen data), 'Dropout' (randomly turning off neurons so the model can't rely on shortcuts), and 'Regularization' (penalizing overly complex boundaries).",
              analogy: "Like a basketball coach making players practice with their non-dominant hand or on different courts so they master the actual game, not just one lucky spot on the floor."
            }
          ],
          keyConcepts: [
            {
              term: "Generalization",
              definition: "The ability of an AI to perform accurately on new, never-before-seen inputs."
            },
            {
              term: "Overfitting (High Variance)",
              definition: "Memorizing training noise, leading to near-zero training error but terrible real-world performance."
            },
            {
              term: "Validation Set",
              definition: "A hidden stash of test data kept secret from the AI during training to check its true intelligence."
            }
          ],
          proTip: "A 100% training score is almost always a warning sign, not a victory! Always check the validation curve."
        },
        conceptCheck: {
          contextPill: "Step 2: Rapid Concept Check",
          prompt: "An AI model gets 99.9% accuracy on training data, but only 55% accuracy on new user data. What is happening?",
          options: [
            {
              id: "cc-2-a",
              text: "The model is underfitting and needs to be made simpler.",
              isCorrect: false,
              explanation: "If it were underfitting, it wouldn't score 99.9% on training data."
            },
            {
              id: "cc-2-b",
              text: "The model has overfitted by memorizing training quirks instead of learning generalizable patterns.",
              isCorrect: true,
              explanation: "Nailed it! 🔥 High training score + terrible validation score is the classic signature of overfitting."
            },
            {
              id: "cc-2-c",
              text: "The computer needs to be restarted to clear RAM.",
              isCorrect: false,
              explanation: "Overfitting is a mathematical problem in model training, not a memory cache bug."
            }
          ],
          encouragement: "Spot on! You can now diagnose the single most common disease in machine learning."
        },
        bossChallenge: {
          title: "Boss Challenge: The Clinic Tumor Detector",
          scenario: "Dr. Alvarez trains a vision model to detect skin tumors. On her laboratory hospital photos, the model achieves 99.8% precision! But when deployed to rural clinics with different cameras and room lighting, its accuracy plunges to 61%. Upon inspection, you find that in the training lab, doctors always placed a bright yellow surgical ruler next to malignant tumors.",
          question: "What did the AI actually learn, and how do you fix it before patients are misdiagnosed?",
          options: [
            {
              id: "boss-2-a",
              text: "The model learned to detect the yellow ruler instead of the tumor! We must augment training data without rulers and add regularization to force genuine tissue analysis.",
              isCorrect: true,
              explanation: "GENIUS DIAGNOSIS! 🏆 The model found a lazy shortcut (the yellow ruler) in the training data. This is real-world high variance / spurious correlation!"
            },
            {
              id: "boss-2-b",
              text: "Tell all rural clinics to purchase identical expensive yellow rulers to keep the AI happy.",
              isCorrect: false,
              explanation: "That leaves the patient in extreme danger if someone has a tumor without a ruler nearby!"
            },
            {
              id: "boss-2-c",
              text: "Train the model for 100 more epochs on the same lab photos.",
              isCorrect: false,
              explanation: "Training longer on the flawed data will only make the ruler memorization worse!"
            }
          ],
          bossAvatar: "🩺",
          bossQuote: "'It scored 99.8% in the lab, so it must be ready for patients!' — Overconfident Lab Director",
          victoryMessage: "CLINICAL BOSS CRUSHED! 🌟 You saved patient lives by recognizing spurious correlations and demanding true generalization.",
          deepDiveExplanation: "Models exploit whatever feature minimizes training loss fastest. If an accidental artifact (like a ruler or watermark) correlates with labels, the model will latch onto it unless penalized."
        },
        prove: {
          question: "A deep learning model achieves 99.8% accuracy on training data, but only 64.2% accuracy on validation data. What is the fundamental cause and remedy?",
          scenario: "You deploy a computer vision model for MRI tumor detection and witness dramatic clinical error rates despite pristine internal test metrics.",
          options: [
            {
              id: "opt-1",
              text: "The model has severely overfitted to training artifacts; apply regularization, dropout, or collect more diverse validation data.",
              isCorrect: true,
              explanation: "Correct! The massive gap between training and validation is the textbook signature of overfitting."
            },
            {
              id: "opt-2",
              text: "The learning rate is too small, causing the weights to freeze in a local minimum.",
              isCorrect: false,
              explanation: "If weights were frozen, training accuracy would not be 99.8%."
            }
          ],
          deepDiveExplanation: "Adding regularization penalizes extreme weight magnitudes, forcing the network to favor smooth, robust representations."
        }
      }
    ]
  },
  {
    id: "neural-networks",
    number: 3,
    title: "Neural Networks",
    subtitle: "Perceptrons, Activations & Deep Representations",
    description: "Build artificial neural networks from the ground up: weighted linear summations, non-linear activation gates, and forward propagation.",
    iconName: "Network",
    skillsAcquired: ["Neuron Computation", "Activation Functions", "Forward Propagation"],
    quests: [
      {
        id: "quest-3",
        stageId: "neural-networks",
        title: "The Artificial Neuron: Weights, Bias & Activations",
        slug: "artificial-neuron-mechanics",
        shortDescription: "Dissect the atomic unit of modern deep learning: linear dot products passed through non-linear activation functions.",
        xpReward: 160,
        estimatedMinutes: 7,
        skillTag: "Neuron Computation",
        badgeTitle: "Synaptic Sculptor",
        learn: {
          title: "How an Artificial Neuron Thinks",
          summary: "A neuron takes multiple inputs, multiplies them by importance weights, adds a bias threshold, and runs the result through an activation function to decide: FIRE or STAY SILENT!",
          qaCards: [
            {
              badgeEmoji: "⚡",
              question: "What are 'Weights' and 'Bias' inside a neuron?",
              answer: "Weights ($w$) represent how much the neuron cares about each input signal (high weight = super important, negative weight = red flag!). The Bias ($b$) is the neuron's baseline threshold for firing before any input arrives.",
              analogy: "Deciding whether to go to an outdoor concert: Weight 1 is 'Is it raining?' (-10), Weight 2 is 'Is your favorite band playing?' (+8), and Bias is 'How much do you love music in general?' (+3)."
            },
            {
              badgeEmoji: "🔀",
              question: "What is an 'Activation Function' (like ReLU)?",
              answer: "It is a mathematical gate that introduces non-linearity. ReLU (Rectified Linear Unit) is super simple: if the sum is negative, output 0; if positive, pass the number straight through!",
              analogy: "Like a light switch with a safety spring: slight nudges below the trigger line do nothing (0), but once you push past the threshold, the light flips on!"
            },
            {
              badgeEmoji: "💥",
              question: "What happens if a 100-layer deep neural network has NO activation functions?",
              answer: "Without non-linear activations, all 100 layers mathematically collapse into a single boring linear equation! No matter how deep your network is, it could only draw flat straight lines.",
              analogy: "Like stacking 100 transparent flat sheets of glass: you still just have a flat window! But bend or curve the glass (non-linearity), and you can build telescopes, microscopes, and cameras."
            }
          ],
          keyConcepts: [
            {
              term: "Linear Combination (z = w · x + b)",
              definition: "Multiplying inputs by weights and adding the bias offset."
            },
            {
              term: "Non-Linearity",
              definition: "The mathematical magic that allows neural networks to learn curves, boundaries, and intricate patterns."
            },
            {
              term: "ReLU",
              definition: "max(0, z) — the lightning-fast activation function powering modern AI."
            }
          ],
          proTip: "Think of Weights as 'signal volume' and Bias as 'the barrier to entry' before the neuron speaks."
        },
        conceptCheck: {
          contextPill: "Step 2: Rapid Concept Check",
          prompt: "If an artificial neuron receives input x=4, weight w=3, and bias b=-5, using ReLU activation: what is the output?",
          options: [
            {
              id: "cc-3-a",
              text: "z = (4 × 3) + (-5) = 7. Since 7 > 0, ReLU outputs 7.",
              isCorrect: true,
              explanation: "Math Master! 🌟 (4 × 3 = 12), (12 - 5 = 7). Since 7 is positive, ReLU passes 7 right through!"
            },
            {
              id: "cc-3-b",
              text: "ReLU always converts everything into 0, so the output is 0.",
              isCorrect: false,
              explanation: "ReLU only turns negative numbers to 0. Positive numbers are preserved!"
            },
            {
              id: "cc-3-c",
              text: "Output is -5 because bias overrides everything.",
              isCorrect: false,
              explanation: "Bias is added into the weighted sum, not an override!"
            }
          ],
          encouragement: "You're thinking like a GPU core! High-speed matrix math is second nature to you."
        },
        bossChallenge: {
          title: "Boss Challenge: The Rogue Linear Architecture",
          scenario: "An arrogant junior architect at MegaAI removes all activation functions from a 50-layer deep image recognition network to 'save 15% compute time'. He claims: 'It has 50 layers, so it's obviously 50 times smarter than a single layer!'",
          question: "What actually happens to this 50-layer network, and why does it fail at classifying handwritten digits?",
          options: [
            {
              id: "boss-3-a",
              text: "The network burns out the GPU fans because linear algebra generates excessive friction.",
              isCorrect: false,
              explanation: "Linear algebra is pure software matrix multiplication; it doesn't cause mechanical friction!"
            },
            {
              id: "boss-3-b",
              text: "The entire 50-layer network collapses mathematically into a single linear equation, unable to carve out complex decision curves.",
              isCorrect: true,
              explanation: "BOOM! K.O.! 🥊 Linear functions composed together remain strictly linear. Without non-linear activations, 50 layers is equivalent to 1 flat layer!"
            },
            {
              id: "boss-3-c",
              text: "It becomes 50 times faster and achieves super-intelligence.",
              isCorrect: false,
              explanation: "It loses the ability to recognize non-linear shapes like circles, eyes, or curved strokes entirely!"
            }
          ],
          bossAvatar: "📐",
          bossQuote: "'Why bend reality with non-linearity when straight lines are so neat?' — The Linear purist",
          victoryMessage: "ARCHITECTURAL BOSS SHATTERED! ⚡ You defended the Universal Approximation Theorem and saved the deep network.",
          deepDiveExplanation: "The composition of linear functions is always strictly linear: W2(W1x + b1) + b2 = (W2·W1)x + (W2·b1 + b2). Non-linear activations warp coordinate space, allowing deep networks to isolate intricate features."
        },
        prove: {
          question: "What catastrophic mathematical problem occurs if a 50-layer deep neural network uses ONLY linear activation functions?",
          scenario: "An engineer builds a 50-layer neural network for image recognition but removes all non-linear activation functions.",
          options: [
            {
              id: "opt-1",
              text: "The entire 50-layer network mathematically collapses into an equivalent single-layer linear model.",
              isCorrect: true,
              explanation: "Exactly! The composition of linear functions is always strictly linear."
            },
            {
              id: "opt-2",
              text: "The weights will immediately explode to infinity during the first forward pass.",
              isCorrect: false,
              explanation: "Forward pass does not explode simply due to linearity."
            }
          ],
          deepDiveExplanation: "Non-linear activations bend the coordinate space at each layer, enabling deep networks to carve out complex boundaries."
        }
      }
    ]
  },
  {
    id: "generative-ai",
    number: 4,
    title: "Generative AI",
    subtitle: "Tokens, Embeddings & Transformer Attention",
    description: "Unravel modern Foundation Models: Byte-Pair Encoding, semantic vector embeddings, and self-attention mechanisms.",
    iconName: "Sparkles",
    skillsAcquired: ["Token Mechanics", "Vector Embeddings", "Prompt Calibration"],
    quests: [
      {
        id: "quest-4",
        stageId: "generative-ai",
        title: "The Token Matrix: Embeddings & Vector Space",
        slug: "tokens-and-vector-embeddings",
        shortDescription: "Learn how Large Language Models ingest human language as discrete token IDs and map them into dense geometric vector spaces.",
        xpReward: 180,
        estimatedMinutes: 7,
        skillTag: "Token Mechanics",
        badgeTitle: "Embedding Alchemist",
        learn: {
          title: "Language as High-Dimensional Geometry",
          summary: "Computers don't read words or letters! They chop language into 'Tokens' and convert each token into a list of numbers (a Vector) where semantic meaning turns into 3D/HD space coordinates.",
          qaCards: [
            {
              badgeEmoji: "🧩",
              question: "What is a 'Token' in an LLM like Gemini or ChatGPT?",
              answer: "A token is a common chunk of characters (usually 3 to 4 letters, or ~0.75 words). Common words like 'apple' are 1 token, while rare or complex words like 'unbelievable' are split into subwords: 'un', 'believ', 'able'.",
              analogy: "Like LEGO bricks! Rather than manufacturing a custom plastic mold for every single object in the universe, LEGO gives you standard brick shapes that click together into anything."
            },
            {
              badgeEmoji: "🗺️",
              question: "What is a 'Vector Embedding'?",
              answer: "An embedding maps every token into an invisible map with thousands of dimensions. Words with similar meanings (like 'king' and 'queen', or 'puppy' and 'dog') land close together on this conceptual map.",
              analogy: "Like a grocery store layout: apples, oranges, and bananas are in the produce aisle; milk and yogurt are in dairy. The closer two items sit on the shelves, the more related they are!"
            },
            {
              badgeEmoji: "📐",
              question: "How can computers do math on words: 'King - Man + Woman = Queen'?",
              answer: "Because semantic concepts have consistent geometric directions in vector space! The direction arrow from 'Man' to 'Woman' is virtually identical to the arrow from 'King' to 'Queen' (representing gender).",
              analogy: "If you take a flight from Paris to France, and then apply that exact same compass direction from Tokyo, you arrive in Japan!"
            }
          ],
          keyConcepts: [
            {
              term: "Subword Tokenization (BPE)",
              definition: "Breaking words into efficient subword chunks so the AI never runs out of vocabulary."
            },
            {
              term: "Embedding Vector",
              definition: "A coordinate list representing semantic meaning in multi-dimensional space."
            },
            {
              term: "Cosine Similarity",
              definition: "Measuring the angle between two concept arrows to tell how closely their meanings align."
            }
          ],
          proTip: "When you talk to an LLM, remember: it doesn't see English sentences. It calculates vector trajectories through a semantic universe."
        },
        conceptCheck: {
          contextPill: "Step 2: Rapid Concept Check",
          prompt: "Why do modern LLMs use subword tokenization instead of whole-word dictionaries?",
          options: [
            {
              id: "cc-4-a",
              text: "Because whole-word dictionaries would fail completely whenever someone invents a new word, writes code, or makes a typo.",
              isCorrect: true,
              explanation: "Spot on! 🎯 Subwords let the model spell and construct any word in the universe from smaller phonetic pieces."
            },
            {
              id: "cc-4-b",
              text: "Because computers can only store 26 letters at a time.",
              isCorrect: false,
              explanation: "Computers have terabytes of memory; the issue is handling new and rare words gracefully!"
            },
            {
              id: "cc-4-c",
              text: "Subword tokenization prevents the AI from consuming electricity.",
              isCorrect: false,
              explanation: "Tokenization is text preprocessing, not electrical engineering!"
            }
          ],
          encouragement: "Brilliant! You understand how AI turns human language into mathematical ingredients."
        },
        bossChallenge: {
          title: "Boss Challenge: The Hallucinating Search Engine",
          scenario: "Your startup builds an AI customer support bot. A customer types: 'My screen is displaying weird purple glitches.' The old keyword search system searched for the exact words 'screen', 'displaying', 'purple', and found 0 matching documents because the manual only uses the term 'Monitor Chromatic Aberration Artifacts'.",
          question: "How do vector embeddings fix this search problem instantly?",
          options: [
            {
              id: "boss-4-a",
              text: "Vector embeddings encode conceptual meaning, so 'screen glitches' and 'monitor artifacts' sit extremely close in embedding space, returning the correct document!",
              isCorrect: true,
              explanation: "BULLSEYE! 🚀 Semantic vector search understands concepts rather than matching exact spelling!"
            },
            {
              id: "boss-4-b",
              text: "Force the user to memorize the formal engineering manual before submitting a question.",
              isCorrect: false,
              explanation: "That would make customer support unbearable for real humans!"
            },
            {
              id: "boss-4-c",
              text: "Delete all documentation that doesn't mention the color purple.",
              isCorrect: false,
              explanation: "Deleting documentation will only break more customer queries!"
            }
          ],
          bossAvatar: "🔍",
          bossQuote: "'If the exact letters don't match, the answer does not exist!' — Keyword Grep Boss",
          victoryMessage: "GREP BOSS VANQUISHED! 🌌 Semantic vector embeddings bridge the gap between human language and technical documentation.",
          deepDiveExplanation: "Keyword search fails when vocabulary diverges. Dense vector embeddings project both queries and documents into a shared conceptual manifold, enabling semantic retrieval (RAG) that survives synonyms."
        },
        prove: {
          question: "Why do modern LLMs use subword tokenization rather than whole-word tokenization?",
          scenario: "You are designing the tokenizer for a multilingual AI model supporting 40 programming and human languages.",
          options: [
            {
              id: "opt-1",
              text: "Whole-word tokenization causes an infinite vocabulary problem with out-of-vocabulary (OOV) errors for compound words and typos.",
              isCorrect: true,
              explanation: "Spot on! Subwords handle any arbitrary string gracefully."
            },
            {
              id: "opt-2",
              text: "Subword tokenization guarantees that every token is exactly 3 letters long.",
              isCorrect: false,
              explanation: "Tokens vary in character length based on frequency statistics."
            }
          ],
          deepDiveExplanation: "BPE starts with individual bytes/characters and iteratively merges the most frequent adjacent pairs, balancing vocabulary size with expressiveness."
        }
      }
    ]
  },
  {
    id: "ai-agents",
    number: 5,
    title: "AI Agents",
    subtitle: "Reasoning Loops, Tool Calling & Autonomy",
    description: "Elevate language models from passive text responders to active autonomous agents capable of perceiving environments, invoking external APIs, and executing multi-step goals.",
    iconName: "Bot",
    skillsAcquired: ["Agent Loops", "Tool Calling", "Reflection & ReAct"],
    quests: [
      {
        id: "quest-5",
        stageId: "ai-agents",
        title: "The Agent Loop: Perception, Planning & Action",
        slug: "agent-loop-mechanics",
        shortDescription: "Construct the ReAct (Reason + Act) cycle that empowers an LLM to orchestrate tools, inspect outputs, and self-correct.",
        xpReward: 200,
        estimatedMinutes: 8,
        skillTag: "Agent Loops",
        badgeTitle: "Autonomous Architect",
        learn: {
          title: "From Chatbot to Autonomous Agent",
          summary: "A chatbot only talks. An AI Agent THINKS, ACTS by using real-world tools, OBSERVES the feedback, and self-corrects until the mission is accomplished!",
          qaCards: [
            {
              badgeEmoji: "🤖",
              question: "What makes an AI 'Agent' fundamentally different from a regular LLM chatbot?",
              answer: "A standard chatbot simply guesses the next token in a reply. An AI Agent has hands! It is embedded in an execution loop with Tools (Calculator, Web Browser, Database API), Memory, and a step-by-step Planning engine.",
              analogy: "A regular LLM is like an armchair philosopher who has read every book in history. An AI Agent is an engineer with a toolbox who can actually open the hood and fix your engine!"
            },
            {
              badgeEmoji: "🔄",
              question: "What is the 'ReAct' (Reason + Act) loop?",
              answer: "It's a 3-step cycle: 1) Thought ('What do I need next?'), 2) Action ('Call tool: checkFlightStatus()'), and 3) Observation ('Tool returned: Flight delayed by 2 hours'). The agent repeats this until the goal is solved!",
              analogy: "Like cooking a recipe: 1) Think ('Is the soup salty enough?'), 2) Act (Taste a spoonful), 3) Observe ('Needs more salt!'), 4) Act (Add a pinch of salt)."
            },
            {
              badgeEmoji: "🛡️",
              question: "What happens when an agent makes a mistake or an API call fails?",
              answer: "In a proper ReAct loop, the agent reads the error message in its Observation step, diagnoses what went wrong in its Thought step, and tries an alternative route instead of crashing!",
              analogy: "Like a GPS when you miss a highway exit: it doesn't give up and shut down; it says 'Recalculating...' and routes you along the next street."
            }
          ],
          keyConcepts: [
            {
              term: "ReAct Pattern",
              definition: "Interleaving internal reasoning (Thought) with external tool execution (Action & Observation)."
            },
            {
              term: "Tool Calling / Function Invocation",
              definition: "How an AI outputs structured JSON to invoke APIs, run calculators, or fetch live data."
            },
            {
              term: "Self-Reflection",
              definition: "The ability to inspect intermediate tool errors and adjust plans dynamically."
            }
          ],
          proTip: "The smartest agents aren't the ones that never encounter an error—they are the ones with resilient loops that self-correct."
        },
        conceptCheck: {
          contextPill: "Step 2: Rapid Concept Check",
          prompt: "In the ReAct agent framework, why is having an explicit 'Thought' step before taking an 'Action' so vital?",
          options: [
            {
              id: "cc-5-a",
              text: "It gives the model working memory tokens to reason through the problem and choose the correct tool and parameters.",
              isCorrect: true,
              explanation: "Bingo! 🎯 Thinking aloud into tokens allows attention heads to organize intermediate logic before firing irreversible actions."
            },
            {
              id: "cc-5-b",
              text: "It slows down the computer so humans can read along.",
              isCorrect: false,
              explanation: "Reasoning tokens are for computational planning, not artificial delay!"
            },
            {
              id: "cc-5-c",
              text: "It bypasses all security rules and passwords automatically.",
              isCorrect: false,
              explanation: "Agents operate strictly within the permissions granted to their tools."
            }
          ],
          encouragement: "You're thinking like an Autonomous Systems Architect!"
        },
        bossChallenge: {
          title: "Boss Challenge: The Blind Flight Booker",
          scenario: "TravelBot is tasked with booking a flight from San Francisco to Tokyo for under $800. Without a ReAct loop, a naive LLM hallucinated a confirmation number for a flight that doesn't exist on airline servers.",
          question: "How do you re-architect TravelBot into a reliable, autonomous agent?",
          options: [
            {
              id: "boss-5-a",
              text: "Equip the LLM with live flight API tools; enforce a ReAct loop: 1) Search flights, 2) Verify price < $800, 3) Execute booking API only after confirming real inventory.",
              isCorrect: true,
              explanation: "MISSION CRUSHED! 🚀 By grounding the agent in external tools with an observe-and-verify cycle, hallucinations are replaced with verified facts!"
            },
            {
              id: "boss-5-b",
              text: "Tell the user that hallucinated confirmation codes are valid tickets at airport gates.",
              isCorrect: false,
              explanation: "The customer will be turned away by airport security!"
            },
            {
              id: "boss-5-c",
              text: "Increase the temperature of the model to 2.0.",
              isCorrect: false,
              explanation: "Higher temperature makes hallucinations even more wild!"
            }
          ],
          bossAvatar: "✈️",
          bossQuote: "'Just guess the flight number, users won't notice!' — Hallucinating Bot",
          victoryMessage: "HALLUCINATION BOSS DESTROYED! 🛡️ Your agent loop enforces rigorous real-world tool verification.",
          deepDiveExplanation: "LLMs alone cannot interact with live environments or know real-time prices. Equipping them with deterministic tools in a ReAct loop grounds probabilistic generation in empirical reality."
        },
        prove: {
          question: "What is the primary architectural advantage of the ReAct prompting framework over naive zero-shot tool calling?",
          scenario: "You are building an AI agent that executes financial trades based on live market news.",
          options: [
            {
              id: "opt-1",
              text: "Explicit reasoning traces allow the model to plan multi-step strategies, diagnose why a tool failed, and adjust before executing actions.",
              isCorrect: true,
              explanation: "Exact! Externalizing reasoning into tokens provides working memory, drastically reducing errors."
            },
            {
              id: "opt-2",
              text: "ReAct guarantees that the LLM will run at double the inference speed.",
              isCorrect: false,
              explanation: "ReAct uses more tokens for reasoning; its benefit is reliability, not speed."
            }
          ],
          deepDiveExplanation: "Giving the model tokens to 'think aloud' lets its attention heads organize intermediate state before committing to tool execution."
        }
      }
    ]
  },
  {
    id: "ai-projects",
    number: 6,
    title: "AI Projects",
    subtitle: "Production Systems, Evaluation & Capstone",
    description: "Synthesize everything you've learned into production-grade AI systems: prompt engineering laboratories, evaluation harnesses, and deployed workflows.",
    iconName: "Rocket",
    skillsAcquired: ["System Architecture", "Prompt Calibration", "Evaluation Harnesses"],
    quests: [
      {
        id: "quest-6",
        stageId: "ai-projects",
        title: "Prompt Engineering Laboratory: Precision & Calibration",
        slug: "prompt-engineering-lab-quest",
        shortDescription: "Engineer, calibrate, and compare system prompts, temperature distributions, and output constraints to solve rigorous enterprise tasks.",
        xpReward: 250,
        estimatedMinutes: 8,
        skillTag: "Prompt Calibration",
        badgeTitle: "Prompt Alchemist",
        learn: {
          title: "The Science of Prompt Engineering",
          summary: "Prompting is not guesswork! It is the art of steering high-dimensional probability distributions toward reliable, deterministic results using structured personas, constraints, and temperature tuning.",
          qaCards: [
            {
              badgeEmoji: "🧪",
              question: "What does the 'Temperature' parameter actually do in an LLM?",
              answer: "Temperature controls randomness! Low temperature (~0.0 to 0.2) makes the model pick the most mathematically probable tokens (precise, predictable, consistent). High temperature (~0.8 to 1.2) flattens probabilities, creating wild, creative, and varied answers.",
              analogy: "Like heating up water molecules: cold water is solid ice (predictable, deterministic structure), while boiling water bubbles randomly in all directions (creative chaos)!"
            },
            {
              badgeEmoji: "🚫",
              question: "Why are 'Negative Constraints' so powerful in system prompts?",
              answer: "Telling an AI what it MUST NOT do (e.g., 'Never output conversational filler', 'Never include markdown code blocks') eliminates common bad habits before generation starts.",
              analogy: "Like giving directions to a driver: 'Turn left on Main Street, but DO NOT take the toll bridge'—negative constraints prevent expensive wrong turns!"
            },
            {
              badgeEmoji: "📋",
              question: "What is 'Few-Shot Prompting'?",
              answer: "Providing 2 or 3 completed examples of your desired input and output directly inside the prompt. It shows the AI the exact pattern instead of just explaining it with words.",
              analogy: "Like showing a tailor two sample jackets that fit you perfectly rather than trying to describe your body shape with paragraphs of adjectives."
            }
          ],
          keyConcepts: [
            {
              term: "Temperature & Top-P",
              definition: "Mathematical dials shaping the probability curve of sampled tokens."
            },
            {
              term: "Structured Output (JSON Schema)",
              definition: "Constraining model generation to strict data structures for automated databases."
            },
            {
              term: "Few-Shot Exemplars",
              definition: "Concrete demonstrations in the prompt guiding tone and formatting."
            }
          ],
          proTip: "If your AI output is flaky, don't write a novel—give it 2 crisp examples and set temperature to 0.0!"
        },
        conceptCheck: {
          contextPill: "Step 2: Rapid Concept Check",
          prompt: "You are building a backend service that extracts order numbers and totals into an SQL database. What temperature should you configure?",
          options: [
            {
              id: "cc-6-a",
              text: "Temperature 0.0 to 0.1 for maximum determinism, consistency, and zero creative hallucinations.",
              isCorrect: true,
              explanation: "Exactly! 🎯 In automated data pipelines, you want cold, rock-solid consistency, never random poetry!"
            },
            {
              id: "cc-6-b",
              text: "Temperature 1.5 to make the invoice numbers artistic.",
              isCorrect: false,
              explanation: "Artistic invoice numbers will corrupt your accounting database!"
            },
            {
              id: "cc-6-c",
              text: "Temperature doesn't affect numbers, only English words.",
              isCorrect: false,
              explanation: "All tokens (numbers, letters, punctuation) follow the temperature probability distribution."
            }
          ],
          encouragement: "Mastery achieved! You know how to engineer mission-critical AI systems."
        },
        bossChallenge: {
          title: "Boss Challenge: The Chatty JSON Generator",
          scenario: "EnterpriseCorp needs an automated parser to turn unstructured emails into pure JSON: `{'leadName': string, 'budget': number}`. But their prompt causes the AI to keep outputting: 'Sure thing, buddy! Here is the JSON you requested: ```json ... Hope this helps!' The JSON parser crashes on the greeting and breaks production!",
          question: "How do you calibrate the prompt to guarantee 100% clean, parseable JSON?",
          options: [
            {
              id: "boss-6-a",
              text: "Set temperature to 0.0, provide 2 few-shot exemplars, and enforce negative constraints: 'Respond ONLY with a valid JSON object. No conversational filler or markdown backticks.'",
              isCorrect: true,
              explanation: "PERFECT CALIBRATION! 🏆 Zero temperature + negative constraints + few-shot anchors eliminates conversational preamble completely!"
            },
            {
              id: "boss-6-b",
              text: "Ask the AI politely in all caps to stop talking so much.",
              isCorrect: false,
              explanation: "All-caps begging does not enforce strict grammar constraints or low temperature sampling!"
            },
            {
              id: "boss-6-c",
              text: "Switch to a model from 2012 that doesn't know how to speak English.",
              isCorrect: false,
              explanation: "Legacy models lack the instruction-following and structured parsing capabilities required!"
            }
          ],
          bossAvatar: "🤖💬",
          bossQuote: "'Sure, friend! Here is some conversational text to break your backend!' — Chatty Bot",
          victoryMessage: "ENTERPRISE BOSS TAMED! 💎 You engineered bulletproof prompt calibration that powers real production systems.",
          deepDiveExplanation: "Production LLM integration requires deterministic formatting. System directives, few-shot framing, and zero-temperature decoding prevent conversational preamble from poisoning automated pipelines."
        },
        prove: {
          question: "When deploying an LLM into an automated ETL pipeline that parses invoices into SQL databases, which parameter setting is most critical?",
          scenario: "You are deploying an automated system parsing thousands of hospital vendor invoices into a financial ledger.",
          options: [
            {
              id: "opt-1",
              text: "Set temperature near 0.0 and enforce a strict JSON schema to ensure deterministic field mapping.",
              isCorrect: true,
              explanation: "Correct! In automated data pipelines, determinism and strict schema adherence are paramount."
            },
            {
              id: "opt-2",
              text: "Set temperature to 1.5 to ensure maximum creative interpretations of invoices.",
              isCorrect: false,
              explanation: "High temperature causes bizarre tokens and hallucinated line items."
            }
          ],
          deepDiveExplanation: "Low temperature collapses the probability distribution onto the highest-probability tokens, guaranteeing reliable ingestion."
        }
      }
    ]
  }
];

export const STAGES_CURRICULUM = CURRICULUM_STAGES;
