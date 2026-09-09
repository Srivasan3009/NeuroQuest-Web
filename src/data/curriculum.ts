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
        estimatedMinutes: 8,
        skillTag: "Paradigm Modeling",
        badgeTitle: "First Spark",
        learn: {
          title: "Traditional Programming vs Machine Learning",
          summary: "In classical programming, humans provide Rules + Data to get Answers. In Machine Learning, we provide Data + Answers to synthesize the Rules.",
          keyConcepts: [
            {
              term: "Deduction vs Induction",
              definition: "Classical code deduces outputs from predefined logical axioms. ML induces general probabilistic rules from vast empirical observations."
            },
            {
              term: "The Brittleness of Rules",
              definition: "Try writing an if-else statement to recognize a cat in pixels: lighting, angle, and occlusion create infinite combinatorial edge cases."
            },
            {
              term: "Objective Function",
              definition: "A mathematical score quantifying how far current predictions are from target reality, guiding the learning mechanism."
            }
          ],
          contentMarkdown: `### The Classical Wall
For 60 years, computer science was dominated by procedural rule-crafting:
\`\`\`ts
function classifySpam(email: Email): boolean {
  if (email.text.includes("WIN MONEY") && email.links.length > 3) {
    return true; // Brittle: Spammers will just change phrasing!
  }
  return false;
}
\`\`\`

When humans encounter continuous sensory reality—speech waves, camera pixels, medical scans—the boundary between classes is non-linear and high-dimensional. Machine learning replaces hand-engineered conditionals with **parameterized mathematical functions** that iteratively adjust until errors diminish.`,
          mentalModelDiagram: {
            type: "comparison",
            labels: [
              "Classical: Data + Rules ➔ Answers",
              "Machine Learning: Data + Answers ➔ Synthesized Rules"
            ],
            description: "The inversion of the computational pipeline."
          },
          proTip: "Never ask 'what rule explains this?'. Instead ask 'what loss metric enables the machine to discover the rule?'."
        },
        interact: {
          title: "Perceptron Boundary Explorer",
          instruction: "Manipulate the Decision Threshold and Weights to see how a continuous linear model separates two distinct classes without hardcoded conditionals.",
          widgetType: "decision-boundary",
          initialState: {
            slope: 1.2,
            intercept: 0,
            noiseLevel: 0.1
          },
          guidanceNotes: [
            "Notice how moving the slope rotates the separating hyperplane in 2D space.",
            "Watch the live accuracy gauge update as you isolate the positive class from the negative class."
          ]
        },
        solve: {
          title: "Mission: Attain 95%+ Linear Separation",
          missionBrief: "A high-dimensional sensor feed has been projected down to 2 axes. Adjust the boundary slope and threshold until the classification accuracy exceeds 95%.",
          targetObjective: "Reach ≥ 95% separation accuracy on the noisy dataset.",
          validationType: "accuracy-threshold",
          criteria: { targetAccuracy: 95 },
          firstHint: "Observe the blue cluster centered in the top-left quadrant and the orange cluster in the bottom-right.",
          secondHint: "Try a negative slope (around -0.9 to -1.3) with an intercept near 0.2 to draw a clean diagonal dividing the two clusters."
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
            },
            {
              id: "opt-3",
              text: "Traditional programs can only execute 1,000 instructions per second.",
              isCorrect: false,
              explanation: "Modern CPUs execute billions of instructions per second; processing speed is not the structural bottleneck."
            }
          ],
          deepDiveExplanation: "The breakthrough of statistical learning is that instead of human engineers enumerating all variations of 'what a 7 looks like', the model learns a manifold mapping raw pixel arrays to class probabilities via gradient optimization."
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
        estimatedMinutes: 10,
        skillTag: "Regularization",
        badgeTitle: "Boundary Breaker",
        learn: {
          title: "The Bias-Variance Tradeoff",
          summary: "Learning is not memorization. An ideal model captures true underlying physical signal while ignoring idiosyncratic dataset noise.",
          keyConcepts: [
            {
              term: "Underfitting (High Bias)",
              definition: "The hypothesis space is too simplistic to capture the fundamental trend (e.g., fitting a straight line to sinusoidal data)."
            },
            {
              term: "Overfitting (High Variance)",
              definition: "The model memorizes noise and quirks in training samples, yielding zero training loss but horrific test validation error."
            },
            {
              term: "Generalization Gap",
              definition: "The mathematical disparity between training loss and test/validation loss on unseen distributions."
            }
          ],
          contentMarkdown: `### The Student Who Memorizes the Exam
Imagine a student preparing for a physics exam:
* **Student A** memorizes the exact numbers of practice question #4 (Overfitting).
* **Student B** understands Newton's 2nd law: $F = m \\cdot a$ (Generalization).

When a new test arrives with slightly altered numerical parameters, Student A fails, while Student B solves it effortlessly.

In Machine Learning, we enforce generalization through techniques like **Weight Decay (L2 Regularization)**, **Dropout**, and **Validation Early Stopping**.`,
          proTip: "A low training error is never a victory by itself. The validation curve is the only true barometer of intelligence."
        },
        interact: {
          title: "Decision Boundary & Model Capacity Lab",
          instruction: "Adjust the model complexity and regularization parameter. Notice how high complexity bends the boundary around single outlier points, creating fragile islands.",
          widgetType: "decision-boundary",
          initialState: {
            slope: 0.8,
            intercept: -0.2,
            noiseLevel: 0.3
          },
          guidanceNotes: [
            "Smooth boundaries generalize better to future unknown samples.",
            "Watch how hyper-twisting the line introduces extreme variance."
          ]
        },
        solve: {
          title: "Mission: Generalize Across Train and Test Splits",
          missionBrief: "Tune the decision boundary to maintain balanced classification (>92%) while ensuring the decision margin stays wide enough to resist noisy jitter.",
          targetObjective: "Find a boundary line that achieves ≥ 92% accuracy across both training clusters.",
          validationType: "accuracy-threshold",
          criteria: { targetAccuracy: 92 },
          firstHint: "Don't try to wrap around every isolated outlier. Focus on the core density center of both clusters.",
          secondHint: "Set the slope between -1.0 and -1.2 and intercept around 0.1 to cleanly bisect the feature space."
        },
        prove: {
          question: "A deep learning model achieves 99.8% accuracy on training data, but only 64.2% accuracy on validation data. What is the fundamental cause and remedy?",
          scenario: "You deploy a computer vision model for MRI tumor detection and witness dramatic clinical error rates despite pristine internal test metrics.",
          options: [
            {
              id: "opt-1",
              text: "The model has severely overfitted to training artifacts; apply regularization, dropout, or collect more diverse validation data.",
              isCorrect: true,
              explanation: "Correct! The massive gap between training (99.8%) and validation (64.2%) is the quintessential textbook signature of overfitting."
            },
            {
              id: "opt-2",
              text: "The learning rate is too small, causing the weights to freeze in a local minimum.",
              isCorrect: false,
              explanation: "If the learning rate were frozen, it would not have achieved 99.8% training accuracy."
            },
            {
              id: "opt-3",
              text: "The model has too few layers and lacks capacity to express the function.",
              isCorrect: false,
              explanation: "If it lacked capacity (underfitting), training accuracy would be low, not 99.8%."
            }
          ],
          deepDiveExplanation: "High variance occurs when model capacity exceeds what the dataset's true signal can constrain. Adding L2 regularization penalizes extreme weight magnitudes, forcing the network to favor smooth, robust representations."
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
        estimatedMinutes: 12,
        skillTag: "Neuron Computation",
        badgeTitle: "Synaptic Sculptor",
        learn: {
          title: "How an Artificial Neuron Thinks",
          summary: "A neuron performs a dot product between its input vector and weight vector, adds a scalar bias, and passes the scalar through an activation function.",
          keyConcepts: [
            {
              term: "Dot Product (z = w · x + b)",
              definition: "Multiplies each incoming feature by its corresponding synaptic weight and adds a threshold bias to shift the activation point."
            },
            {
              term: "Non-Linear Activation",
              definition: "Without non-linear activations (like ReLU, Sigmoid, or GELU), stacking 100 neural layers mathematically collapses into a single boring linear regression!"
            },
            {
              term: "ReLU (Rectified Linear Unit)",
              definition: "f(z) = max(0, z). The workhorse of modern deep learning: computationally inexpensive and avoids vanishing gradients for positive inputs."
            }
          ],
          contentMarkdown: `### The Neuron Formula
Every single node in a 400-billion parameter model executes this fundamental arithmetic:

$$\\hat{y} = \\sigma\\left( \\sum_{i=1}^n w_i x_i + b \\right)$$

* $x_i$: The incoming signals (pixel intensity, word embedding dimension, audio frequency).
* $w_i$: The trainable weights, determining feature sensitivity.
* $b$: The bias term, dictating how easily this neuron activates regardless of input.
* $\\sigma$: The non-linear activation function.

If $\\sigma(z)$ were linear ($f(z) = c \\cdot z$), no matter how many millions of layers you stacked, the entire network could only draw flat planes! Non-linearity allows neural networks to approximate **any arbitrary continuous function** (Universal Approximation Theorem).`,
          proTip: "Think of the weight as 'importance of this signal' and the bias as 'baseline skepticism' before the neuron decides to fire."
        },
        interact: {
          title: "Interactive Artificial Neuron Workbench",
          instruction: "Slide weights $w_1$, $w_2$, and bias $b$. Toggle between ReLU, Sigmoid, and Step activations. Observe the pre-activation sum $z$ and final activated output.",
          widgetType: "neuron-weights",
          initialState: {
            w1: 1.5,
            w2: -0.8,
            bias: 0.2,
            activation: "relu",
            x1: 0.8,
            x2: 0.5
          },
          guidanceNotes: [
            "Notice how increasing bias shifts the firing threshold.",
            "Compare how Sigmoid squashes output between [0, 1] while ReLU truncates negative sums to zero."
          ]
        },
        solve: {
          title: "Mission: Engineer a Logical AND Gate Neuron",
          missionBrief: "Configure weights $w_1$, $w_2$, and bias $b$ so that the neuron outputs > 0.8 ONLY when both inputs ($x_1=1$, $x_2=1$) are active, and outputs < 0.2 for all other truth table pairs (0,0), (0,1), (1,0).",
          targetObjective: "Configure weights and bias to solve the binary logical AND problem.",
          validationType: "neuron-threshold",
          criteria: { gateType: "AND" },
          firstHint: "Both inputs must contribute positively to push the sum past the firing threshold.",
          secondHint: "Set $w_1 \\approx 1.5$, $w_2 \\approx 1.5$, and a negative bias $b \\approx -2.0$. If only one input is 1, $1.5 - 2.0 = -0.5$ (inactive). If both are 1, $1.5 + 1.5 - 2.0 = +1.0$ (fires!)."
        },
        prove: {
          question: "What catastrophic mathematical problem occurs if a 50-layer deep neural network uses ONLY linear activation functions $f(z) = z$?",
          scenario: "An engineer builds a 50-layer neural network for image recognition but removes all non-linear activation functions to speed up training.",
          options: [
            {
              id: "opt-1",
              text: "The entire 50-layer network mathematically collapses into an equivalent single-layer linear model, unable to learn complex non-linear patterns.",
              isCorrect: true,
              explanation: "Exactly! The composition of linear functions is always strictly linear: $W_2(W_1 x + b_1) + b_2 = (W_2 W_1)x + (W_2 b_1 + b_2)$."
            },
            {
              id: "opt-2",
              text: "The weights will immediately explode to infinity during the first forward pass.",
              isCorrect: false,
              explanation: "Forward pass does not explode simply due to linearity unless initialization weights are enormous."
            },
            {
              id: "opt-3",
              text: "The network will overfit immediately to every sample.",
              isCorrect: false,
              explanation: "A linear model has very low capacity; it underfits severely rather than overfitting."
            }
          ],
          deepDiveExplanation: "Non-linear activations (ReLU, GELU, Swish) bend the coordinate space at each layer. This geometric warping allows deep networks to carve out complex decision boundaries capable of recognizing intricate visual textures and syntactic structures."
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
        estimatedMinutes: 12,
        skillTag: "Token Mechanics",
        badgeTitle: "Embedding Alchemist",
        learn: {
          title: "Language as High-Dimensional Geometry",
          summary: "Computers cannot read characters directly. Text is sliced into tokens (subwords) and converted into floating-point vectors where spatial proximity encodes semantic meaning.",
          keyConcepts: [
            {
              term: "Subword Tokenization (BPE)",
              definition: "Balances dictionary size with vocabulary coverage. Rare words are split into chunks (e.g., 'unbelievable' ➔ 'un' + 'believ' + 'able')."
            },
            {
              term: "Embedding Vector",
              definition: "A continuous array of numbers (e.g. 1536 dimensions in OpenAI text-embedding-3 or 768 in Gemini) capturing syntactic and conceptual relationships."
            },
            {
              term: "Cosine Similarity",
              definition: "Measures the cosine of the angle between two semantic vectors. Proximity of 1.0 means identical semantic orientation."
            }
          ],
          contentMarkdown: `### The Vector Geometry of Meaning
When text is passed into an embedding model:
1. **Tokenize:** "King", "Queen", "Man", "Woman" become integer IDs.
2. **Lookup:** Each token ID maps to a row in a learned embedding matrix.
3. **Vector Arithmetic:**
$$\\vec{v}_{\\text{King}} - \\vec{v}_{\\text{Man}} + \\vec{v}_{\\text{Woman}} \\approx \\vec{v}_{\\text{Queen}}$$

In this multi-thousand-dimensional coordinate system, semantic relationships become geometric directions:
* The vector from "Paris" to "France" is parallel to the vector from "Tokyo" to "Japan" (the 'capital-of' vector offset!).`,
          proTip: "When writing prompts or building RAG pipelines, remember that LLMs don't see words; they see token sequences and distances in vector manifolds."
        },
        interact: {
          title: "Semantic Vector Space & Tokenizer",
          instruction: "Type custom phrases to inspect how subword tokenization splits text into tokens, and visualize cosine distances in projected 2D semantic space.",
          widgetType: "token-embeddings",
          initialState: {
            sampleText: "Artificial intelligence transforms learning forever.",
            comparisonWords: ["robot", "neural", "computer", "banana", "galaxy"]
          },
          guidanceNotes: [
            "Observe how related technological terms cluster together in vector proximity.",
            "Inspect how punctuation and whitespace often become prefixes of tokens."
          ]
        },
        solve: {
          title: "Mission: Maximize Semantic Cosine Alignment",
          missionBrief: "Craft a query vector that achieves > 0.85 cosine similarity with target concept 'Autonomous Neural Agent' while staying divergent (< 0.40) from 'Culinary Recipe'.",
          targetObjective: "Generate a concept representation that aligns with autonomous intelligence.",
          validationType: "token-alignment",
          criteria: { targetKeyword: "Autonomous Neural Agent" },
          firstHint: "Use semantically rich keywords related to self-directed machine decision making and deep architecture.",
          secondHint: "Try combining terms like 'Reinforcement learning neural agent planning autonomously'."
        },
        prove: {
          question: "Why do modern LLMs use subword tokenization (like Byte-Pair Encoding) rather than whole-word tokenization?",
          scenario: "You are designing the tokenizer for a multilingual AI model supporting 40 programming and human languages.",
          options: [
            {
              id: "opt-1",
              text: "Whole-word tokenization causes an infinite vocabulary problem with out-of-vocabulary (OOV) errors for compound words, typos, and code identifiers.",
              isCorrect: true,
              explanation: "Spot on! Whole-word dictionaries balloon into millions of entries and still fail on new terms. Subwords handle any arbitrary string gracefully."
            },
            {
              id: "opt-2",
              text: "Subword tokenization guarantees that every token is exactly 3 letters long.",
              isCorrect: false,
              explanation: "Tokens vary in character length based on frequency statistics (from 1 character to full words)."
            },
            {
              id: "opt-3",
              text: "Subword tokenization prevents the model from generating repetitive sentences.",
              isCorrect: false,
              explanation: "Repetition is governed by sampling temperature, frequency penalties, and attention mechanisms, not the tokenizer."
            }
          ],
          deepDiveExplanation: "BPE starts with individual bytes/characters and iteratively merges the most frequent adjacent pairs. This enables the model to represent common words like 'the' as a single token while seamlessly constructing rare scientific terms from known phonetic sub-units."
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
        estimatedMinutes: 15,
        skillTag: "Agent Loops",
        badgeTitle: "Autonomous Architect",
        learn: {
          title: "From Chatbot to Autonomous Agent",
          summary: "An AI Agent is an LLM embedded inside an execution loop equipped with Tools, Memory, and a Planning mechanism.",
          keyConcepts: [
            {
              term: "ReAct Pattern (Reason + Act)",
              definition: "The agent interleaves internal verbal reasoning ('Thought:') with concrete environment interactions ('Action:' ➔ 'Observation:')."
            },
            {
              term: "Tool Calling / Function Invocation",
              definition: "The LLM outputs structured JSON specifying which tool to invoke and the precise parameters, pausing execution until the system returns tool results."
            },
            {
              term: "Self-Reflection & Error Recovery",
              definition: "When a tool returns an error or unexpected result, the agent observes the failure and dynamically devises an alternate route."
            }
          ],
          contentMarkdown: `### The Anatomy of an Autonomous Cycle
A raw LLM is frozen at its training cutoff date. An AI Agent breaks this limitation:

\`\`\`
          ┌───────────────────────────┐
          │      USER OBJECTIVE       │
          └─────────────┬─────────────┘
                        ▼
         ┌──────────────────────────────┐
  ┌─────▶│  THOUGHT: What is my next    │
  │      │  optimal milestone?          │
  │      └──────────────┬───────────────┘
  │                     ▼
  │      ┌──────────────────────────────┐
  │      │  ACTION: Invoke Tool         │
  │      │  (e.g., queryDB, fetchAPI)   │
  │      └──────────────┬───────────────┘
  │                     ▼
  │      ┌──────────────────────────────┐
  │      │  OBSERVATION: Tool returns   │
  │      │  raw runtime response        │
  │      └──────────────┬───────────────┘
  │                     │
  └──────── Next Step? ─┘ (Repeat until final answer)
\`\`\`

The agent is the reasoning engine directing deterministic tools.`,
          proTip: "The most capable agents are not the ones that never fail; they are the ones whose system prompts enable robust self-correction upon tool errors."
        },
        interact: {
          title: "Live ReAct Agent Execution Loop",
          instruction: "Inspect and trigger tool actions: Calculator, Database Query, Weather API, and Web Search. Watch the agent synthesize Thought, Action, and Observation cycles in real time.",
          widgetType: "agent-loop",
          initialState: {
            objective: "Analyze customer churn risk for account #4092 and generate action plan",
            currentStep: 0
          },
          guidanceNotes: [
            "Click 'Step Forward' to see the agent generate its internal reasoning thought before firing a tool.",
            "Observe how tool observation feedback updates the agent's context window."
          ]
        },
        solve: {
          title: "Mission: Complete Multi-Tool Investigation",
          missionBrief: "Guide the agent through a 3-step tool dispatch: 1) Query user telemetry, 2) Calculate error rate with calculator, 3) Dispatch escalation alert to Slack.",
          targetObjective: "Successfully trigger all 3 requisite tool actions to resolve the autonomous mission.",
          validationType: "agent-task-solved",
          criteria: { requiredTools: ["queryDB", "calculator", "notifySlack"] },
          firstHint: "Look at the pending objective and select the appropriate tool for retrieving user records first.",
          secondHint: "First run queryDB(4092), then use calculator(errors / total), then dispatch notifySlack."
        },
        prove: {
          question: "What is the primary architectural advantage of the ReAct (Reason + Act) prompting framework over naive zero-shot tool calling?",
          scenario: "You are building an AI agent that executes financial trades based on live market news and balance sheets.",
          options: [
            {
              id: "opt-1",
              text: "Explicit reasoning traces allow the model to plan multi-step strategies, diagnose why a tool failed, and adjust its plan before executing irreversible actions.",
              isCorrect: true,
              explanation: "Exact! Externalizing reasoning into tokens provides working memory, drastically reducing hallucinatory and premature tool invocations."
            },
            {
              id: "opt-2",
              text: "ReAct guarantees that the LLM will run at double the inference speed.",
              isCorrect: false,
              explanation: "ReAct actually takes more tokens and steps; its benefit is superior reliability and reasoning, not raw latency reduction."
            },
            {
              id: "opt-3",
              text: "ReAct removes the need to supply tool parameter schemas.",
              isCorrect: false,
              explanation: "Tool schemas remain essential for type-safe execution."
            }
          ],
          deepDiveExplanation: "Without an explicit Thought phase, an LLM must predict both the decision to act and the exact tool arguments in a single forward pass. Giving the model tokens to 'think aloud' lets its attention heads organize intermediate state before committing to execution."
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
        estimatedMinutes: 15,
        skillTag: "Prompt Calibration",
        badgeTitle: "Prompt Alchemist",
        learn: {
          title: "The Science of Prompt Engineering",
          summary: "Prompt engineering is not guesswork; it is the discipline of constraining high-dimensional probability distributions toward deterministic, structured compliance.",
          keyConcepts: [
            {
              term: "System Persona & Negative Constraints",
              definition: "Explicitly stating what the model MUST NOT do is as vital as specifying what it should do."
            },
            {
              term: "Few-Shot Demonstration",
              definition: "Providing 2-3 input-output exemplars anchors the model's in-context attention to the exact desired format and tone."
            },
            {
              term: "Temperature & Top-P Calibration",
              definition: "Temperature scales the logits before softmax: near 0.0 creates greedy, repeatable choices; near 1.0 increases stochastic variety."
            }
          ],
          contentMarkdown: `### The Anatomy of an Enterprise Prompt
Production prompts follow strict architectural components:
1. **Role & Identity:** "You are an expert static analysis engine..."
2. **Context & Input:** The raw code or documents under inspection.
3. **Task Directive:** Unambiguous verb-driven instructions.
4. **Negative Constraints:** "Never include markdown preamble or conversational greetings."
5. **Output Schema:** "Respond ONLY with a valid JSON object conforming to this TypeScript interface."
6. **Few-Shot Examples:** High-quality input/output pairs demonstrating edge cases.`,
          proTip: "If an LLM produces inconsistent outputs, 9 times out of 10 the solution is adding an explicit schema and 2 few-shot exemplars rather than switching to a larger model."
        },
        interact: {
          title: "Side-by-Side Prompt Calibration Bench",
          instruction: "Compare two variations of prompts with live parameter tweaking (Temperature, Top-P, System Directives). Observe how subtle constraint additions eliminate conversational fluff.",
          widgetType: "prompt-tuning",
          initialState: {
            temperature: 0.2,
            topP: 0.9,
            systemDirective: "You are a strict data extraction parser. Return valid JSON only.",
            userPrompt: "Extract the founder and year from: 'NeuroQuest was founded in 2026 by AI researchers to revolutionize education.'"
          },
          guidanceNotes: [
            "Notice how reducing temperature to 0.0 makes the output consistent across successive runs.",
            "Compare the token usage and response latency."
          ]
        },
        solve: {
          title: "Mission: Engineer Zero-Fluff JSON Output",
          missionBrief: "Configure the prompt and temperature to extract data in pure JSON without conversational greetings, markdown backticks, or trailing commentary.",
          targetObjective: "Produce a clean, validated JSON output with temperature ≤ 0.3.",
          validationType: "prompt-pass",
          criteria: { maxTemp: 0.3, requireJson: true },
          firstHint: "Set the temperature to 0.1 or 0.2 to prioritize determinism.",
          secondHint: "Explicitly state in the system instructions: 'Output raw JSON only. Do not include markdown codeblocks or conversational text.'"
        },
        prove: {
          question: "When deploying an LLM into an automated ETL pipeline that parses invoices into SQL databases, which parameter setting is most critical?",
          scenario: "You are deploying an automated system parsing thousands of hospital vendor invoices into a financial ledger.",
          options: [
            {
              id: "opt-1",
              text: "Set temperature near 0.0 and enforce a strict JSON schema to ensure deterministic field mapping and eliminate random hallucinations.",
              isCorrect: true,
              explanation: "Correct! In automated data pipelines, determinism and strict schema adherence are paramount; high temperatures create unpredictable syntax variations."
            },
            {
              id: "opt-2",
              text: "Set temperature to 1.5 to ensure maximum creative interpretations of invoices.",
              isCorrect: false,
              explanation: "High temperature causes bizarre tokens and hallucinated line items, catastrophic for accounting."
            },
            {
              id: "opt-3",
              text: "Disable system instructions to give the model full autonomy.",
              isCorrect: false,
              explanation: "System instructions are required to anchor the parsing role and schema rules."
            }
          ],
          deepDiveExplanation: "Low temperature collapses the probability distribution onto the highest-probability (argmax) tokens. Combined with structured output schemas (like `responseMimeType: 'application/json'`), this guarantees reliable automated ingestion."
        }
      }
    ]
  }
];

export const STAGES_CURRICULUM = CURRICULUM_STAGES;
