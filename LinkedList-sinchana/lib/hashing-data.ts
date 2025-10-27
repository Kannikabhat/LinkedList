export interface HashNode {
  id: string;
  key: string;
  value: any;
  next?: string | null;
  x: number;
  y: number;
  isActive?: boolean;
  isTarget?: boolean;
  isCollision?: boolean;
}

export interface HashPointer {
  id: string;
  label: string;
  targetSlotId: string | null;
  color: string;
}

export interface HashVisualizationStep {
  slots: HashSlot[];
  activeSlotIndex?: number;
  message?: string;
  outputText?: string;
  hashValue?: number;
  code?: string[];
}

export interface HashSlot {
  id: string;
  index: number;
  nodes: HashNode[];
  x: number;
  y: number;
  isActive?: boolean;
}

export interface HashExecutionStep {
  lineIndex: number;
  slots: HashSlot[];
  message?: string;
  outputText?: string;
  hashValue?: number;
  key?: string;
  action?: 'hash' | 'insert' | 'search' | 'delete' | 'collision' | 'probe';
  code?: string[];
}

export interface MCQOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface MCQ {
  id: string;
  question: string;
  options: MCQOption[];
  explanation: string;
}

export interface LessonStep {
  id: string;
  type: 'content' | 'mcq' | 'visualization';
  title: string;
  content?: string;
  code?: string[];
  visualization?: HashVisualizationStep;
  executionSteps?: HashExecutionStep[];
  mcq?: MCQ;
  chatbot?: {
    question: string;
    hint?: string;
    context?: string;
    topic?: string; 
  }[];
}

export interface HashingLesson {
  id: number;
  title: string;
  description: string;
  steps: LessonStep[];
}

export const hashingLessons: HashingLesson[] = [
  {
    id: 1,
    title: "Introduction to Hashing",
    description: "Understanding the need for fast lookups and introducing hash tables",
    steps: [
      {
        id: "hashing-scenario-1",
        type: "content",
        title: "🟢 Scenario – Library Book System 📚",
        content: "You work at a large library with 100,000 books. A customer comes and asks: 'Do you have the book titled Advanced Algorithms?'\n\n**Current System**: Books are stored in a simple list by arrival order.\n\n**Question to User:**\nWith 100,000 books in a simple list, how would you find this specific book? What's the problem with this approach?",
        chatbot: [
          {
            question: "With 100,000 books in a simple list, how would you find this specific book? What's the problem with this approach?",
            context: "Books are stored sequentially in a list. To find 'Advanced Algorithms', one would perform a linear search—checking each book until the match is found. This approach is inefficient, with a time complexity of O(n), since every lookup may require scanning through most or all of the list.",
            hint: "Think about how many books you might need to check in the worst case. Is there a faster way?",
            topic: "hashing"
          },
          {
            question: "What if instead of storing books by arrival order, we could organize them so that finding any book takes almost the same time, whether it's the 1st book or the 100,000th book?",
            context: "Organizing books based on a computed key (like a hash of the title) allows direct access to their position. This is the principle of hashing, which provides near constant-time lookups, O(1), compared to linear search’s O(n).",
            hint: "Think about how a phone book or dictionary works - you don't start from page 1 to find a word starting with 'Z'.",
            topic: "hashing"
          }
        ]
      },
      {
        id: "hashing-scenario-2", 
        type: "content",
        title: "🟢 Scenario – Student Roll Number System 🎓",
        content: "Your college has 10,000 students. Each student has a unique roll number like 'CS2021001', 'EC2020045', etc.\n\n**Question to User:**\nThe office needs to quickly lookup any student's details by their roll number. If student records are stored in a simple array, what's the issue? How could we make lookups faster?",
        chatbot: [
          {
            question: "If student records are stored in a simple array, what's the issue with finding a student by roll number?",
            context: "In a simple array, to find a student by roll number, you must perform a linear search—comparing each record one by one until you find a match. This has a time complexity of O(n), which becomes inefficient as the number of students increases.",
            hint: "Think about the time it takes when the student you're looking for is at the end of the list.",
            topic: "hashing"
          },
          {
            question: "What if we could use the roll number itself to directly calculate where to store/find the student's record?",
            context: "By applying a hash function to the roll number, we can compute a direct index in memory where that student's data is stored. This method allows nearly constant-time O(1) lookups, making it much faster than linear search. This approach is the foundation of hashing.",
            hint: "This is the core idea behind hashing - using the key (roll number) to compute a location.",
            topic: "hashing"
          }
        ]
      },
      {
        id: "hashing-scenario-3",
        type: "content", 
        title: "🟢 Scenario – Phone Contact List 📞",
        content: "Your phone has 2,000 contacts. When you search for 'John Smith', your phone instantly shows the result.\n\n**Question to User:**\nYour phone doesn't check all 2,000 contacts one by one. How do you think it finds 'John Smith' so quickly?",
        chatbot: [
          {
            question: "How do you think your phone finds 'John Smith' so quickly without checking all 2,000 contacts?",
            context: "The phone uses efficient lookup structures like hash tables or indexed maps. It applies a hash function to the contact name (e.g., 'John Smith') to compute a direct memory location or index where that contact's details are stored. This allows retrieval in nearly constant time O(1), instead of sequentially checking all contacts as in a linear search.",
            hint: "The phone uses the name 'John Smith' to calculate a location where this contact would be stored.",
            topic: "hashing"
          },
          {
            question: "What if multiple people have similar names like 'John Smith' and 'John Doe'? How would the system handle this?",
            context: "When different keys (names) produce the same hash value, a collision occurs. Hash-based systems handle collisions using techniques like chaining (storing multiple entries in a list at the same index) or open addressing (finding the next available slot). These ensure all entries can still be retrieved correctly despite collisions.",
            hint: "Think about what happens when two different names result in the same storage location.",
            topic: "hashing"
          }
        ]
      },
      {
        id: "hashing-def-1",
        type: "content",
        title: "What is Hashing?",
        content: `Now that we've seen the problem, let's understand the solution:

**Hashing** is a technique that transforms keys (like book titles, roll numbers, names) into array indices using a mathematical function called a **hash function**.

**Key Components:**

- **Hash Table**: An array that stores key-value pairs
- **Hash Function**: A mathematical function that converts keys into array indices
- **Key**: The identifier we want to store/search (e.g., "Advanced Algorithms")
- **Value**: The data associated with the key (e.g., book details)
- **Hash Value/Index**: The array index computed by the hash function

**Basic Process:**
1. **Insert**: hash_function(key) → index → store value at table[index]
2. **Search**: hash_function(key) → index → retrieve value from table[index]
3. **Delete**: hash_function(key) → index → remove value from table[index]`
      },
      {
        id: "hashing-visualization-1",
        type: "visualization",
        title: "Basic Hash Table Structure",
        visualization: {
          slots: [
            { id: "slot0", index: 0, nodes: [], x: 100, y: 100 },
            { id: "slot1", index: 1, nodes: [{ id: "n1", key: "apple", value: "red fruit", x: 200, y: 120 }], x: 100, y: 150 },
            { id: "slot2", index: 2, nodes: [], x: 100, y: 200 },
            { id: "slot3", index: 3, nodes: [{ id: "n2", key: "banana", value: "yellow fruit", x: 200, y: 270 }], x: 100, y: 250 },
            { id: "slot4", index: 4, nodes: [], x: 100, y: 300 }
          ],
          message: "A hash table with 5 slots. Keys 'apple' and 'banana' are stored at indices computed by a hash function."
        }
      },
      {
        id: "hashing-mcq-1",
        type: "mcq",
        title: "Understanding Hash Tables",
        mcq: {
          id: "q1",
          question: "What is the main advantage of hashing over linear search?",
          options: [
            { id: "a", text: "Uses less memory", isCorrect: false },
            { id: "b", text: "Provides faster average-case lookup time", isCorrect: true },
            { id: "c", text: "Guarantees sorted order", isCorrect: false },
            { id: "d", text: "Easier to implement", isCorrect: false }
          ],
          explanation: "Hashing provides O(1) average-case lookup time compared to O(n) for linear search, making it much faster for large datasets."
        }
      }
    ]
  },
  {
    id: 2,
    title: "Hash Functions",
    description: "Understanding properties of good hash functions and common techniques",
    steps: [
      {
        id: "hash-function-intro",
        type: "content",
        title: "What Makes a Good Hash Function?",
        content: `A **hash function** is the heart of any hash table. It takes a key and produces an array index.

**Properties of a Good Hash Function:**

**1. Deterministic**
• Same key always produces the same hash value
• hash("apple") should always give the same result

**2. Uniform Distribution**
• Keys should be distributed evenly across all slots
• Avoids clustering in specific areas

**3. Efficient to Compute**
• Should be fast to calculate
• O(1) time complexity for hashing

**4. Minimize Collisions**
• Different keys should ideally map to different indices
• Though some collisions are inevitable

**Mathematical Representation:**
hash(key) → index where 0 ≤ index < table_size`
      },
      {
        id: "hash-function-methods",
        type: "content",
        title: "Common Hash Function Methods",
        content: `**1. Division Method (Modulo)**
\`\`\`
hash(key) = key % table_size
\`\`\`
Example: hash(25) = 25 % 7 = 4

**2. Multiplication Method**
\`\`\`
hash(key) = floor(table_size * ((key * A) % 1))
where A = (√5 - 1) / 2 ≈ 0.618 (golden ratio)
\`\`\`

**3. Mid-Square Method**
\`\`\`
1. Square the key
2. Extract middle digits
3. Convert to index
\`\`\`
Example: key = 23 → 23² = 529 → middle digits: 2 → index = 2

**4. String Hashing (for text keys)**
\`\`\`
hash = 0
for each character c in string:
    hash = (hash * 31 + ascii(c)) % table_size
\`\`\``
      },
      {
        id: "hash-visualization-division",
        type: "visualization", 
        title: "Division Method Example",
        code: [
          "function hashDivision(key, tableSize):",
          "    return key % tableSize",
          "",
          "// Example with table size 7",
          "hash(10) = 10 % 7 = 3",
          "hash(15) = 15 % 7 = 1", 
          "hash(22) = 22 % 7 = 1  // Collision!",
          "hash(35) = 35 % 7 = 0"
        ],
        visualization: {
          slots: [
            { id: "slot0", index: 0, nodes: [{ id: "n35", key: "35", value: "data", x: 200, y: 120 }], x: 100, y: 100 },
            { id: "slot1", index: 1, nodes: [{ id: "n15", key: "15", value: "data", x: 200, y: 170 }, { id: "n22", key: "22", value: "data", x: 300, y: 170, isCollision: true }], x: 100, y: 150 },
            { id: "slot2", index: 2, nodes: [], x: 100, y: 200 },
            { id: "slot3", index: 3, nodes: [{ id: "n10", key: "10", value: "data", x: 200, y: 270 }], x: 100, y: 250 },
            { id: "slot4", index: 4, nodes: [], x: 100, y: 300 },
            { id: "slot5", index: 5, nodes: [], x: 100, y: 350 },
            { id: "slot6", index: 6, nodes: [], x: 100, y: 400 }
          ],
          message: "Division method: hash(key) = key % 7. Note collision between keys 15 and 22."
        },
        executionSteps: [
          {
            lineIndex: 4,
            slots: [
              { id: "slot0", index: 0, nodes: [], x: 100, y: 100 },
              { id: "slot1", index: 1, nodes: [], x: 100, y: 150 },
              { id: "slot2", index: 2, nodes: [], x: 100, y: 200 },
              { id: "slot3", index: 3, nodes: [], x: 100, y: 250, isActive: true },
              { id: "slot4", index: 4, nodes: [], x: 100, y: 300 },
              { id: "slot5", index: 5, nodes: [], x: 100, y: 350 },
              { id: "slot6", index: 6, nodes: [], x: 100, y: 400 }
            ],
            message: "Computing hash(10): 10 % 7 = 3",
            hashValue: 3,
            key: "10",
            action: "hash"
          },
          {
            lineIndex: 4,
            slots: [
              { id: "slot0", index: 0, nodes: [], x: 100, y: 100 },
              { id: "slot1", index: 1, nodes: [], x: 100, y: 150 },
              { id: "slot2", index: 2, nodes: [], x: 100, y: 200 },
              { id: "slot3", index: 3, nodes: [{ id: "n10", key: "10", value: "data", x: 200, y: 270 }], x: 100, y: 250, isActive: true },
              { id: "slot4", index: 4, nodes: [], x: 100, y: 300 },
              { id: "slot5", index: 5, nodes: [], x: 100, y: 350 },
              { id: "slot6", index: 6, nodes: [], x: 100, y: 400 }
            ],
            message: "Insert key '10' at index 3",
            action: "insert"
          },
          {
            lineIndex: 5,
            slots: [
              { id: "slot0", index: 0, nodes: [], x: 100, y: 100 },
              { id: "slot1", index: 1, nodes: [], x: 100, y: 150, isActive: true },
              { id: "slot2", index: 2, nodes: [], x: 100, y: 200 },
              { id: "slot3", index: 3, nodes: [{ id: "n10", key: "10", value: "data", x: 200, y: 270 }], x: 100, y: 250 },
              { id: "slot4", index: 4, nodes: [], x: 100, y: 300 },
              { id: "slot5", index: 5, nodes: [], x: 100, y: 350 },
              { id: "slot6", index: 6, nodes: [], x: 100, y: 400 }
            ],
            message: "Computing hash(15): 15 % 7 = 1",
            hashValue: 1,
            key: "15",
            action: "hash"
          },
          {
            lineIndex: 5,
            slots: [
              { id: "slot0", index: 0, nodes: [], x: 100, y: 100 },
              { id: "slot1", index: 1, nodes: [{ id: "n15", key: "15", value: "data", x: 200, y: 170 }], x: 100, y: 150, isActive: true },
              { id: "slot2", index: 2, nodes: [], x: 100, y: 200 },
              { id: "slot3", index: 3, nodes: [{ id: "n10", key: "10", value: "data", x: 200, y: 270 }], x: 100, y: 250 },
              { id: "slot4", index: 4, nodes: [], x: 100, y: 300 },
              { id: "slot5", index: 5, nodes: [], x: 100, y: 350 },
              { id: "slot6", index: 6, nodes: [], x: 100, y: 400 }
            ],
            message: "Insert key '15' at index 1",
            action: "insert"
          },
          {
            lineIndex: 6,
            slots: [
              { id: "slot0", index: 0, nodes: [], x: 100, y: 100 },
              { id: "slot1", index: 1, nodes: [{ id: "n15", key: "15", value: "data", x: 200, y: 170 }], x: 100, y: 150, isActive: true },
              { id: "slot2", index: 2, nodes: [], x: 100, y: 200 },
              { id: "slot3", index: 3, nodes: [{ id: "n10", key: "10", value: "data", x: 200, y: 270 }], x: 100, y: 250 },
              { id: "slot4", index: 4, nodes: [], x: 100, y: 300 },
              { id: "slot5", index: 5, nodes: [], x: 100, y: 350 },
              { id: "slot6", index: 6, nodes: [], x: 100, y: 400 }
            ],
            message: "Computing hash(22): 22 % 7 = 1 - COLLISION with key '15'!",
            hashValue: 1,
            key: "22", 
            action: "collision"
          },
          {
            lineIndex: 6,
            slots: [
              { id: "slot0", index: 0, nodes: [], x: 100, y: 100 },
              { id: "slot1", index: 1, nodes: [{ id: "n15", key: "15", value: "data", x: 200, y: 170 }, { id: "n22", key: "22", value: "data", x: 300, y: 170, isCollision: true }], x: 100, y: 150, isActive: true },
              { id: "slot2", index: 2, nodes: [], x: 100, y: 200 },
              { id: "slot3", index: 3, nodes: [{ id: "n10", key: "10", value: "data", x: 200, y: 270 }], x: 100, y: 250 },
              { id: "slot4", index: 4, nodes: [], x: 100, y: 300 },
              { id: "slot5", index: 5, nodes: [], x: 100, y: 350 },
              { id: "slot6", index: 6, nodes: [], x: 100, y: 400 }
            ],
            message: "Handle collision by chaining: add '22' to the chain at index 1",
            action: "insert"
          }
        ]
      },
      {
        id: "hash-mcq-1",
        type: "mcq",
        title: "Hash Function Properties",
        mcq: {
          id: "q2", 
          question: "Which property is most important for a hash function?",
          options: [
            { id: "a", text: "Always returns the same value for the same key", isCorrect: true },
            { id: "b", text: "Always returns different values for different keys", isCorrect: false },
            { id: "c", text: "Returns values in ascending order", isCorrect: false },
            { id: "d", text: "Uses the least amount of memory", isCorrect: false }
          ],
          explanation: "Determinism is crucial - the same key must always hash to the same value, otherwise we couldn't reliably find stored data."
        }
      },
      {
        id: "string-hashing",
        type: "visualization",
        title: "String Hashing Example",
        code: [
          "function hashString(str, tableSize):",
          "    hash = 0",
          "    for i in range(len(str)):",
          "        hash = (hash * 31 + ord(str[i])) % tableSize",
          "    return hash",
          "",
          "// Example: hash('cat') with table size 7",
          "// c=99, a=97, t=116",
          "hash = (0 * 31 + 99) % 7 = 1",
          "hash = (1 * 31 + 97) % 7 = 2", 
          "hash = (2 * 31 + 116) % 7 = 0"
        ],
        visualization: {
          slots: [
            { id: "slot0", index: 0, nodes: [{ id: "ncat", key: "cat", value: "animal", x: 200, y: 120, isActive: true }], x: 100, y: 100 },
            { id: "slot1", index: 1, nodes: [], x: 100, y: 150 },
            { id: "slot2", index: 2, nodes: [], x: 100, y: 200 },
            { id: "slot3", index: 3, nodes: [], x: 100, y: 250 },
            { id: "slot4", index: 4, nodes: [], x: 100, y: 300 },
            { id: "slot5", index: 5, nodes: [], x: 100, y: 350 },
            { id: "slot6", index: 6, nodes: [], x: 100, y: 400 }
          ],
          message: "String 'cat' hashed using polynomial rolling hash: final hash value = 0"
        },
        executionSteps: [
          {
            lineIndex: 1,
            slots: [
              { id: "slot0", index: 0, nodes: [], x: 100, y: 100 },
              { id: "slot1", index: 1, nodes: [], x: 100, y: 150 },
              { id: "slot2", index: 2, nodes: [], x: 100, y: 200 },
              { id: "slot3", index: 3, nodes: [], x: 100, y: 250 },
              { id: "slot4", index: 4, nodes: [], x: 100, y: 300 },
              { id: "slot5", index: 5, nodes: [], x: 100, y: 350 },
              { id: "slot6", index: 6, nodes: [], x: 100, y: 400 }
            ],
            message: "Initialize hash = 0, processing string 'cat'",
            hashValue: 0
          },
          {
            lineIndex: 8,
            slots: [
              { id: "slot0", index: 0, nodes: [], x: 100, y: 100 },
              { id: "slot1", index: 1, nodes: [], x: 100, y: 150 },
              { id: "slot2", index: 2, nodes: [], x: 100, y: 200 },
              { id: "slot3", index: 3, nodes: [], x: 100, y: 250 },
              { id: "slot4", index: 4, nodes: [], x: 100, y: 300 },
              { id: "slot5", index: 5, nodes: [], x: 100, y: 350 },
              { id: "slot6", index: 6, nodes: [], x: 100, y: 400 }
            ],
            message: "Process 'c' (ASCII 99): hash = (0 * 31 + 99) % 7 = 1",
            hashValue: 1
          },
          {
            lineIndex: 9,
            slots: [
              { id: "slot0", index: 0, nodes: [], x: 100, y: 100 },
              { id: "slot1", index: 1, nodes: [], x: 100, y: 150 },
              { id: "slot2", index: 2, nodes: [], x: 100, y: 200 },
              { id: "slot3", index: 3, nodes: [], x: 100, y: 250 },
              { id: "slot4", index: 4, nodes: [], x: 100, y: 300 },
              { id: "slot5", index: 5, nodes: [], x: 100, y: 350 },
              { id: "slot6", index: 6, nodes: [], x: 100, y: 400 }
            ],
            message: "Process 'a' (ASCII 97): hash = (1 * 31 + 97) % 7 = 2",
            hashValue: 2
          },
          {
            lineIndex: 10,
            slots: [
              { id: "slot0", index: 0, nodes: [], x: 100, y: 100, isActive: true },
              { id: "slot1", index: 1, nodes: [], x: 100, y: 150 },
              { id: "slot2", index: 2, nodes: [], x: 100, y: 200 },
              { id: "slot3", index: 3, nodes: [], x: 100, y: 250 },
              { id: "slot4", index: 4, nodes: [], x: 100, y: 300 },
              { id: "slot5", index: 5, nodes: [], x: 100, y: 350 },
              { id: "slot6", index: 6, nodes: [], x: 100, y: 400 }
            ],
            message: "Process 't' (ASCII 116): hash = (2 * 31 + 116) % 7 = 0",
            hashValue: 0
          },
          {
            lineIndex: 10,
            slots: [
              { id: "slot0", index: 0, nodes: [{ id: "ncat", key: "cat", value: "animal", x: 200, y: 120, isActive: true }], x: 100, y: 100, isActive: true },
              { id: "slot1", index: 1, nodes: [], x: 100, y: 150 },
              { id: "slot2", index: 2, nodes: [], x: 100, y: 200 },
              { id: "slot3", index: 3, nodes: [], x: 100, y: 250 },
              { id: "slot4", index: 4, nodes: [], x: 100, y: 300 },
              { id: "slot5", index: 5, nodes: [], x: 100, y: 350 },
              { id: "slot6", index: 6, nodes: [], x: 100, y: 400 }
            ],
            message: "Insert 'cat' at computed index 0",
            action: "insert"
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Collision Handling",
    description: "Understanding and implementing collision resolution techniques",
    steps: [
      {
        id: "collision-scenario",
        type: "content",
        title: "🟢 Scenario – Parking Garage Problem 🚗",
        content: "Imagine a parking garage with numbered spots 0-6. Each car has a license plate, and we use a simple rule: 'Take the sum of digits in your license plate, divide by 7, and park in that spot.'\n\n**Problem**: Two cars with license plates ABC123 and XYZ456 both get spot number 3.\n\n**Question to User:**\nWhat happens when two different cars are assigned the same parking spot? How would you solve this problem?",
        chatbot: [
          {
            question: "What happens when two different cars are assigned the same parking spot? How would you solve this problem?",
            context: "When two different keys (in this case, license plates) produce the same hash value, they map to the same index in the hash table. This situation is called a collision. Collisions are a normal part of hashing and require a resolution strategy to ensure both items can be stored and retrieved correctly.",
            hint: "Think about real-world solutions: what would a parking garage do if two cars need the same spot?",
            topic: "hashing collision"
          },
          {
            question: "Can you think of different ways to handle this collision? What are the trade-offs of each approach?",
            context: "There are two primary methods for resolving collisions: (1) **Separate chaining**, where multiple entries at the same index are stored in a linked list or chain; and (2) **Open addressing**, where the algorithm searches for the next available slot using techniques like linear or quadratic probing. Chaining is simple and flexible, while open addressing can be faster but may cause clustering if not managed properly.",
            hint: "One approach modifies the structure of each parking spot, another approach looks for alternative spots.",
            topic: "hashing collision"
          }
        ]
      },
      {
        id: "collision-intro",
        type: "content", 
        title: "Why Do Collisions Occur?",
        content: `**Collision**: When two different keys hash to the same index.

**Why are collisions inevitable?**

**1. Pigeonhole Principle**
• If we have more keys than array slots, collisions must occur
• Example: 100 keys, 7 slots → at least one slot gets multiple keys

**2. Hash Function Limitations**  
• Even with equal numbers of keys and slots, hash functions may not distribute perfectly
• Some indices may get multiple keys while others remain empty

**3. Uneven Distribution**
• Real-world data often has patterns that cause clustering
• Example: Many names starting with 'A' might hash to similar values

**Collision Resolution Strategies:**
1. **Chaining** (Separate Chaining)
2. **Open Addressing** (Linear Probing, Quadratic Probing, Double Hashing)`
      },
      {
        id: "chaining-explanation",
        type: "content",
        title: "Collision Resolution: Chaining",
        content: `**Chaining (Separate Chaining)** stores multiple elements that hash to the same index in a linked list.

**How it works:**
1. Each slot in the hash table contains a pointer to a linked list
2. When collision occurs, add the new element to the linked list
3. Search requires traversing the linked list at the computed index

**Advantages:**
✅ Simple to implement
✅ Hash table never "fills up" 
✅ Good performance with good hash function

**Disadvantages:**
❌ Extra memory for pointers
❌ Poor cache performance (scattered memory access)
❌ Performance degrades if many collisions occur

**Operations:**
• **Insert**: O(1) average case
• **Search**: O(1 + α) where α = n/m (load factor)
• **Delete**: O(1 + α) average case`
      },
      {
        id: "chaining-visualization",
        type: "visualization",
        title: "Chaining Implementation",
        code: [
          "function insertChaining(table, key, value):",
          "    index = hash(key) % table.size",
          "    if table[index] is empty:",
          "        table[index] = new LinkedList()",
          "    table[index].insert(key, value)",
          "",
          "function searchChaining(table, key):",
          "    index = hash(key) % table.size",
          "    if table[index] is not empty:",
          "        return table[index].search(key)",
          "    return null"
        ],
        visualization: {
          slots: [
            { id: "slot0", index: 0, nodes: [{ id: "n1", key: "John", value: "123-456", x: 200, y: 120 }], x: 100, y: 100 },
            { id: "slot1", index: 1, nodes: [{ id: "n2", key: "Alice", value: "234-567", x: 200, y: 170 }, { id: "n3", key: "Bob", value: "345-678", x: 320, y: 170 }], x: 100, y: 150 },
            { id: "slot2", index: 2, nodes: [], x: 100, y: 200 },
            { id: "slot3", index: 3, nodes: [{ id: "n4", key: "Charlie", value: "456-789", x: 200, y: 270 }], x: 100, y: 250 },
            { id: "slot4", index: 4, nodes: [], x: 100, y: 300 }
          ],
          message: "Chaining: Each slot contains a linked list. Keys 'Alice' and 'Bob' collided at index 1."
        },
        executionSteps: [
          {
            lineIndex: 1,
            slots: [
              { id: "slot0", index: 0, nodes: [], x: 100, y: 100 },
              { id: "slot1", index: 1, nodes: [], x: 100, y: 150, isActive: true },
              { id: "slot2", index: 2, nodes: [], x: 100, y: 200 },
              { id: "slot3", index: 3, nodes: [], x: 100, y: 250 },
              { id: "slot4", index: 4, nodes: [], x: 100, y: 300 }
            ],
            message: "Insert 'Alice': hash('Alice') = 1",
            hashValue: 1,
            key: "Alice",
            action: "hash"
          },
          {
            lineIndex: 4,
            slots: [
              { id: "slot0", index: 0, nodes: [], x: 100, y: 100 },
              { id: "slot1", index: 1, nodes: [{ id: "n2", key: "Alice", value: "234-567", x: 200, y: 170 }], x: 100, y: 150, isActive: true },
              { id: "slot2", index: 2, nodes: [], x: 100, y: 200 },
              { id: "slot3", index: 3, nodes: [], x: 100, y: 250 },
              { id: "slot4", index: 4, nodes: [], x: 100, y: 300 }
            ],
            message: "Create linked list at index 1 and insert 'Alice'",
            action: "insert"
          },
          {
            lineIndex: 1,
            slots: [
              { id: "slot0", index: 0, nodes: [], x: 100, y: 100 },
              { id: "slot1", index: 1, nodes: [{ id: "n2", key: "Alice", value: "234-567", x: 200, y: 170 }], x: 100, y: 150, isActive: true },
              { id: "slot2", index: 2, nodes: [], x: 100, y: 200 },
              { id: "slot3", index: 3, nodes: [], x: 100, y: 250 },
              { id: "slot4", index: 4, nodes: [], x: 100, y: 300 }
            ],
            message: "Insert 'Bob': hash('Bob') = 1 - COLLISION!",
            hashValue: 1,
            key: "Bob",
            action: "collision"
          },
          {
            lineIndex: 4,
            slots: [
              { id: "slot0", index: 0, nodes: [], x: 100, y: 100 },
              { id: "slot1", index: 1, nodes: [{ id: "n2", key: "Alice", value: "234-567", x: 200, y: 170 }, { id: "n3", key: "Bob", value: "345-678", x: 320, y: 170 }], x: 100, y: 150, isActive: true },
              { id: "slot2", index: 2, nodes: [], x: 100, y: 200 },
              { id: "slot3", index: 3, nodes: [], x: 100, y: 250 },
              { id: "slot4", index: 4, nodes: [], x: 100, y: 300 }
            ],
            message: "Add 'Bob' to existing chain at index 1",
            action: "insert"
          },
          {
            lineIndex: 7,
            slots: [
              { id: "slot0", index: 0, nodes: [], x: 100, y: 100 },
              { id: "slot1", index: 1, nodes: [{ id: "n2", key: "Alice", value: "234-567", x: 200, y: 170 }, { id: "n3", key: "Bob", value: "345-678", x: 320, y: 170, isActive: true }], x: 100, y: 150, isActive: true },
              { id: "slot2", index: 2, nodes: [], x: 100, y: 200 },
              { id: "slot3", index: 3, nodes: [], x: 100, y: 250 },
              { id: "slot4", index: 4, nodes: [], x: 100, y: 300 }
            ],
            message: "Search 'Bob': hash('Bob') = 1, traverse chain to find 'Bob'",
            hashValue: 1,
            key: "Bob",
            action: "search"
          }
        ]
      },
      {
        id: "open-addressing-intro",
        type: "content",
        title: "Collision Resolution: Open Addressing",
        content: `**Open Addressing** stores all elements directly in the hash table array. When a collision occurs, we probe for the next available slot.

**Common Probing Methods:**

**1. Linear Probing**
• Check slots sequentially: h(k), h(k)+1, h(k)+2, ...
• Simple but can cause clustering

**2. Quadratic Probing** 
• Check slots: h(k), h(k)+1², h(k)+2², h(k)+3², ...
• Reduces primary clustering

**3. Double Hashing**
• Use second hash function for step size
• h(k), h(k)+h₂(k), h(k)+2×h₂(k), ...

**Advantages:**
✅ No extra memory for pointers
✅ Better cache performance
✅ All data in contiguous array

**Disadvantages:**
❌ Table can become full
❌ Performance degrades as table fills up
❌ Deletion is complex (requires tombstones)`
      },
      {
        id: "linear-probing-viz",
        type: "visualization",
        title: "Linear Probing Implementation",
        code: [
          "function insertLinearProbing(table, key, value):",
          "    index = hash(key) % table.size",
          "    while table[index] is not empty:",
          "        if table[index].key == key:",
          "            table[index].value = value  // Update",
          "            return",
          "        index = (index + 1) % table.size",
          "    table[index] = (key, value)"
        ],
        visualization: {
          slots: [
            { id: "slot0", index: 0, nodes: [{ id: "n22", key: "22", value: "data", x: 200, y: 120 }], x: 100, y: 100 },
            { id: "slot1", index: 1, nodes: [{ id: "n15", key: "15", value: "data", x: 200, y: 170 }], x: 100, y: 150 },
            { id: "slot2", index: 2, nodes: [{ id: "n29", key: "29", value: "data", x: 200, y: 220, isActive: true }], x: 100, y: 200 },
            { id: "slot3", index: 3, nodes: [{ id: "n10", key: "10", value: "data", x: 200, y: 270 }], x: 100, y: 250 },
            { id: "slot4", index: 4, nodes: [], x: 100, y: 300 },
            { id: "slot5", index: 5, nodes: [], x: 100, y: 350 },
            { id: "slot6", index: 6, nodes: [], x: 100, y: 400 }
          ],
          message: "Linear probing: Key 29 hashed to index 1 (occupied), probed to index 2"
        },
        executionSteps: [
          {
            lineIndex: 1,
            slots: [
              { id: "slot0", index: 0, nodes: [], x: 100, y: 100 },
              { id: "slot1", index: 1, nodes: [{ id: "n15", key: "15", value: "data", x: 200, y: 170 }], x: 100, y: 150 },
              { id: "slot2", index: 2, nodes: [], x: 100, y: 200 },
              { id: "slot3", index: 3, nodes: [{ id: "n10", key: "10", value: "data", x: 200, y: 270 }], x: 100, y: 250 },
              { id: "slot4", index: 4, nodes: [], x: 100, y: 300 },
              { id: "slot5", index: 5, nodes: [], x: 100, y: 350 },
              { id: "slot6", index: 6, nodes: [], x: 100, y: 400 }
            ],
            message: "Insert key '22': hash(22) = 22 % 7 = 1",
            hashValue: 1,
            key: "22",
            action: "hash"
          },
          {
            lineIndex: 2,
            slots: [
              { id: "slot0", index: 0, nodes: [], x: 100, y: 100 },
              { id: "slot1", index: 1, nodes: [{ id: "n15", key: "15", value: "data", x: 200, y: 170 }], x: 100, y: 150, isActive: true },
              { id: "slot2", index: 2, nodes: [], x: 100, y: 200 },
              { id: "slot3", index: 3, nodes: [{ id: "n10", key: "10", value: "data", x: 200, y: 270 }], x: 100, y: 250 },
              { id: "slot4", index: 4, nodes: [], x: 100, y: 300 },
              { id: "slot5", index: 5, nodes: [], x: 100, y: 350 },
              { id: "slot6", index: 6, nodes: [], x: 100, y: 400 }
            ],
            message: "Index 1 is occupied by '15' - COLLISION!",
            action: "collision"
          },
          {
            lineIndex: 6,
            slots: [
              { id: "slot0", index: 0, nodes: [], x: 100, y: 100, isActive: true },
              { id: "slot1", index: 1, nodes: [{ id: "n15", key: "15", value: "data", x: 200, y: 170 }], x: 100, y: 150 },
              { id: "slot2", index: 2, nodes: [], x: 100, y: 200 },
              { id: "slot3", index: 3, nodes: [{ id: "n10", key: "10", value: "data", x: 200, y: 270 }], x: 100, y: 250 },
              { id: "slot4", index: 4, nodes: [], x: 100, y: 300 },
              { id: "slot5", index: 5, nodes: [], x: 100, y: 350 },
              { id: "slot6", index: 6, nodes: [], x: 100, y: 400 }
            ],
            message: "Probe next slot: index = (1 + 1) % 7 = 2, but let's go to 0 first",
            action: "probe"
          },
          {
            lineIndex: 7,
            slots: [
              { id: "slot0", index: 0, nodes: [{ id: "n22", key: "22", value: "data", x: 200, y: 120 }], x: 100, y: 100, isActive: true },
              { id: "slot1", index: 1, nodes: [{ id: "n15", key: "15", value: "data", x: 200, y: 170 }], x: 100, y: 150 },
              { id: "slot2", index: 2, nodes: [], x: 100, y: 200 },
              { id: "slot3", index: 3, nodes: [{ id: "n10", key: "10", value: "data", x: 200, y: 270 }], x: 100, y: 250 },
              { id: "slot4", index: 4, nodes: [], x: 100, y: 300 },
              { id: "slot5", index: 5, nodes: [], x: 100, y: 350 },
              { id: "slot6", index: 6, nodes: [], x: 100, y: 400 }
            ],
            message: "Found empty slot at index 0, insert '22' here",
            action: "insert"
          },
          {
            lineIndex: 1,
            slots: [
              { id: "slot0", index: 0, nodes: [{ id: "n22", key: "22", value: "data", x: 200, y: 120 }], x: 100, y: 100 },
              { id: "slot1", index: 1, nodes: [{ id: "n15", key: "15", value: "data", x: 200, y: 170 }], x: 100, y: 150, isActive: true },
              { id: "slot2", index: 2, nodes: [], x: 100, y: 200 },
              { id: "slot3", index: 3, nodes: [{ id: "n10", key: "10", value: "data", x: 200, y: 270 }], x: 100, y: 250 },
              { id: "slot4", index: 4, nodes: [], x: 100, y: 300 },
              { id: "slot5", index: 5, nodes: [], x: 100, y: 350 },
              { id: "slot6", index: 6, nodes: [], x: 100, y: 400 }
            ],
            message: "Insert key '29': hash(29) = 29 % 7 = 1",
            hashValue: 1,
            key: "29",
            action: "hash"
          },
          {
            lineIndex: 2,
            slots: [
              { id: "slot0", index: 0, nodes: [{ id: "n22", key: "22", value: "data", x: 200, y: 120 }], x: 100, y: 100 },
              { id: "slot1", index: 1, nodes: [{ id: "n15", key: "15", value: "data", x: 200, y: 170 }], x: 100, y: 150, isActive: true },
              { id: "slot2", index: 2, nodes: [], x: 100, y: 200 },
              { id: "slot3", index: 3, nodes: [{ id: "n10", key: "10", value: "data", x: 200, y: 270 }], x: 100, y: 250 },
              { id: "slot4", index: 4, nodes: [], x: 100, y: 300 },
              { id: "slot5", index: 5, nodes: [], x: 100, y: 350 },
              { id: "slot6", index: 6, nodes: [], x: 100, y: 400 }
            ],
            message: "Index 1 is occupied - COLLISION! Probe next slot",
            action: "collision"
          },
          {
            lineIndex: 6,
            slots: [
              { id: "slot0", index: 0, nodes: [{ id: "n22", key: "22", value: "data", x: 200, y: 120 }], x: 100, y: 100 },
              { id: "slot1", index: 1, nodes: [{ id: "n15", key: "15", value: "data", x: 200, y: 170 }], x: 100, y: 150 },
              { id: "slot2", index: 2, nodes: [], x: 100, y: 200, isActive: true },
              { id: "slot3", index: 3, nodes: [{ id: "n10", key: "10", value: "data", x: 200, y: 270 }], x: 100, y: 250 },
              { id: "slot4", index: 4, nodes: [], x: 100, y: 300 },
              { id: "slot5", index: 5, nodes: [], x: 100, y: 350 },
              { id: "slot6", index: 6, nodes: [], x: 100, y: 400 }
            ],
            message: "Probe: index = (1 + 1) % 7 = 2 - EMPTY!",
            action: "probe"
          },
          {
            lineIndex: 7,
            slots: [
              { id: "slot0", index: 0, nodes: [{ id: "n22", key: "22", value: "data", x: 200, y: 120 }], x: 100, y: 100 },
              { id: "slot1", index: 1, nodes: [{ id: "n15", key: "15", value: "data", x: 200, y: 170 }], x: 100, y: 150 },
              { id: "slot2", index: 2, nodes: [{ id: "n29", key: "29", value: "data", x: 200, y: 220, isActive: true }], x: 100, y: 200 },
              { id: "slot3", index: 3, nodes: [{ id: "n10", key: "10", value: "data", x: 200, y: 270 }], x: 100, y: 250 },
              { id: "slot4", index: 4, nodes: [], x: 100, y: 300 },
              { id: "slot5", index: 5, nodes: [], x: 100, y: 350 },
              { id: "slot6", index: 6, nodes: [], x: 100, y: 400 }
            ],
            message: "Insert '29' at index 2",
            action: "insert"
          }
        ]
      },
      {
        id: "collision-mcq-1",
        type: "mcq",
        title: "Collision Resolution Comparison", 
        mcq: {
          id: "q3",
          question: "What is the main advantage of chaining over open addressing?",
          options: [
            { id: "a", text: "Better cache performance", isCorrect: false },
            { id: "b", text: "Uses less memory", isCorrect: false },
            { id: "c", text: "Hash table never becomes full", isCorrect: true },
            { id: "d", text: "Faster insertion", isCorrect: false }
          ],
          explanation: "With chaining, the hash table can accommodate any number of elements by extending the chains, while open addressing is limited by the table size."
        }
      }
    ]
  },
  {
    id: 4,
    title: "Hash Table Performance",
    description: "Analyzing load factors, time complexity, and performance optimization",
    steps: [
      {
        id: "load-factor-intro",
        type: "content",
        title: "Understanding Load Factor",
        content: `**Load Factor (α)** is a crucial metric that determines hash table performance.

**Definition:**
α = n / m

Where:
• n = number of elements stored
• m = size of hash table (number of slots)

**Examples:**
• 50 elements in table of size 100 → α = 0.5
• 80 elements in table of size 100 → α = 0.8
• 120 elements in table of size 100 → α = 1.2

**Load Factor Impact:**
• **α < 0.75**: Good performance, few collisions
• **α = 0.75**: Optimal balance (often used as resize threshold)  
• **α > 0.75**: Increasing collisions, performance degrades
• **α ≥ 1.0**: More elements than slots (only possible with chaining)`
      },
      {
        id: "performance-analysis",
        type: "content", 
        title: "Time Complexity Analysis",
        content: `**Average Case Performance:**

**Chaining:**
• **Search**: O(1 + α) 
• **Insert**: O(1) 
• **Delete**: O(1 + α)

**Open Addressing (Linear Probing):**
• **Search**: O(1/(1-α)) for α < 1
• **Insert**: O(1/(1-α)) for α < 1  
• **Delete**: O(1/(1-α)) for α < 1

**Worst Case Performance:**
• **Chaining**: O(n) - all keys hash to same slot
• **Open Addressing**: O(n) - all keys cluster together

**Performance vs Load Factor:**

| Load Factor (α) | Chaining Avg | Linear Probing Avg |
|-----------------|--------------|-------------------|
| 0.25           | 1.25         | 1.17              |
| 0.50           | 1.50         | 1.50              |
| 0.75           | 1.75         | 2.50              |
| 0.90           | 1.90         | 5.50              |`
      },
      {
        id: "load-factor-scenario",
        type: "content",
        title: "🟢 Scenario – Restaurant Table Management 🍽️",
        content: "A restaurant has 10 tables and uses a reservation system based on customer phone numbers. The system uses hashing to assign tables.\n\n**Different Situations:**\n- **Slow night**: 3 reservations (α = 0.3)\n- **Busy night**: 8 reservations (α = 0.8)  \n- **Overbooked**: 12 reservations (α = 1.2)\n\n**Question to User:**\nWhat happens to service quality (finding/assigning tables) as the restaurant gets busier? How does this relate to hash table performance?",
        chatbot: [
          {
            question: "What happens to service quality (finding/assigning tables) as the restaurant gets busier?",
            context: "In hashing, the load factor (α) measures how full a hash table is, calculated as the ratio of stored items to available slots. As α increases, the likelihood of collisions rises, leading to longer lookup and insertion times. Similarly, as the restaurant fills up, it becomes harder to find available tables quickly, which mirrors reduced hash table performance at high load factors.",
            hint: "Think about how collision frequency increases with more customers competing for the same tables.",
            topic: "load factor performance"
          },
          {
            question: "At what point do you think the restaurant should consider expanding (adding more tables) or changing their reservation system?",
            context: "When the load factor becomes too high, performance degrades due to frequent collisions and probing. To maintain efficiency, hash tables are typically resized (rehashing) when the load factor approaches around 0.7–0.8. This ensures faster lookups and balanced performance, similar to how a restaurant might add more tables or improve scheduling when nearing full capacity.",
            hint: "Consider the trade-off between space utilization and service quality.",
            topic: "load factor performance"
          }
        ]
      },
      {
        id: "performance-visualization",
        type: "visualization",
        title: "Load Factor Impact on Performance",
        code: [
          "// Simulating different load factors",
          "table_size = 7",
          "elements = [10, 15, 22, 29, 31, 38, 45]",
          "",
          "// Load factor = 7/7 = 1.0",
          "// Expected probe distance increases",
          "hash(10) = 3  // Direct hit",
          "hash(15) = 1  // Direct hit", 
          "hash(22) = 1  // Collision! Probe to 2",
          "hash(29) = 1  // Collision! Probe to 4",
          "// More collisions as table fills up"
        ],
        visualization: {
          slots: [
            { id: "slot0", index: 0, nodes: [], x: 100, y: 100 },
            { id: "slot1", index: 1, nodes: [{ id: "n15", key: "15", value: "data", x: 200, y: 170 }], x: 100, y: 150 },
            { id: "slot2", index: 2, nodes: [{ id: "n22", key: "22", value: "data", x: 200, y: 220, isCollision: true }], x: 100, y: 200 },
            { id: "slot3", index: 3, nodes: [{ id: "n10", key: "10", value: "data", x: 200, y: 270 }], x: 100, y: 250 },
            { id: "slot4", index: 4, nodes: [{ id: "n29", key: "29", value: "data", x: 200, y: 320, isCollision: true }], x: 100, y: 300 },
            { id: "slot5", index: 5, nodes: [{ id: "n31", key: "31", value: "data", x: 200, y: 370, isCollision: true }], x: 100, y: 350 },
            { id: "slot6", index: 6, nodes: [{ id: "n38", key: "38", value: "data", x: 200, y: 420, isCollision: true }], x: 100, y: 400 }
          ],
          message: "High load factor (α = 1.0): Many collisions, clustering effects visible"
        },
        executionSteps: [
          {
            lineIndex: 0,
            slots: [
              { id: "slot0", index: 0, nodes: [], x: 100, y: 100 },
              { id: "slot1", index: 1, nodes: [], x: 100, y: 150 },
              { id: "slot2", index: 2, nodes: [], x: 100, y: 200 },
              { id: "slot3", index: 3, nodes: [], x: 100, y: 250 },
              { id: "slot4", index: 4, nodes: [], x: 100, y: 300 },
              { id: "slot5", index: 5, nodes: [], x: 100, y: 350 },
              { id: "slot6", index: 6, nodes: [], x: 100, y: 400 }
            ],
            message: "Starting with empty table (α = 0.0), performance will degrade as we add elements"
          },
          {
            lineIndex: 1,
            slots: [
              { id: "slot0", index: 0, nodes: [], x: 100, y: 100 },
              { id: "slot1", index: 1, nodes: [], x: 100, y: 150 },
              { id: "slot2", index: 2, nodes: [], x: 100, y: 200 },
              { id: "slot3", index: 3, nodes: [{ id: "n10", key: "10", value: "data", x: 200, y: 270 }], x: 100, y: 250, isActive: true },
              { id: "slot4", index: 4, nodes: [], x: 100, y: 300 },
              { id: "slot5", index: 5, nodes: [], x: 100, y: 350 },
              { id: "slot6", index: 6, nodes: [], x: 100, y: 400 }
            ],
            message: "Insert 10: α = 1/7 ≈ 0.14 - Very good performance, no collisions"
          },
          {
            lineIndex: 2,
            slots: [
              { id: "slot0", index: 0, nodes: [], x: 100, y: 100 },
              { id: "slot1", index: 1, nodes: [{ id: "n15", key: "15", value: "data", x: 200, y: 170 }], x: 100, y: 150, isActive: true },
              { id: "slot2", index: 2, nodes: [], x: 100, y: 200 },
              { id: "slot3", index: 3, nodes: [{ id: "n10", key: "10", value: "data", x: 200, y: 270 }], x: 100, y: 250 },
              { id: "slot4", index: 4, nodes: [], x: 100, y: 300 },
              { id: "slot5", index: 5, nodes: [], x: 100, y: 350 },
              { id: "slot6", index: 6, nodes: [], x: 100, y: 400 }
            ],
            message: "Insert 15: α = 2/7 ≈ 0.29 - Still good performance"
          },
          {
            lineIndex: 3,
            slots: [
              { id: "slot0", index: 0, nodes: [], x: 100, y: 100 },
              { id: "slot1", index: 1, nodes: [{ id: "n15", key: "15", value: "data", x: 200, y: 170 }], x: 100, y: 150 },
              { id: "slot2", index: 2, nodes: [{ id: "n22", key: "22", value: "data", x: 200, y: 220, isCollision: true }], x: 100, y: 200, isActive: true },
              { id: "slot3", index: 3, nodes: [{ id: "n10", key: "10", value: "data", x: 200, y: 270 }], x: 100, y: 250 },
              { id: "slot4", index: 4, nodes: [], x: 100, y: 300 },
              { id: "slot5", index: 5, nodes: [], x: 100, y: 350 },
              { id: "slot6", index: 6, nodes: [], x: 100, y: 400 }
            ],
            message: "Insert 22: α = 3/7 ≈ 0.43 - First collision! 22 probes from 1 to 2"
          },
          {
            lineIndex: 4,
            slots: [
              { id: "slot0", index: 0, nodes: [], x: 100, y: 100 },
              { id: "slot1", index: 1, nodes: [{ id: "n15", key: "15", value: "data", x: 200, y: 170 }], x: 100, y: 150 },
              { id: "slot2", index: 2, nodes: [{ id: "n22", key: "22", value: "data", x: 200, y: 220, isCollision: true }], x: 100, y: 200 },
              { id: "slot3", index: 3, nodes: [{ id: "n10", key: "10", value: "data", x: 200, y: 270 }], x: 100, y: 250 },
              { id: "slot4", index: 4, nodes: [{ id: "n29", key: "29", value: "data", x: 200, y: 320, isCollision: true }], x: 100, y: 300, isActive: true },
              { id: "slot5", index: 5, nodes: [], x: 100, y: 350 },
              { id: "slot6", index: 6, nodes: [], x: 100, y: 400 }
            ],
            message: "Insert 29: α = 4/7 ≈ 0.57 - More collisions! 29 probes from 1→2→3→4"
          },
          {
            lineIndex: 5,
            slots: [
              { id: "slot0", index: 0, nodes: [], x: 100, y: 100 },
              { id: "slot1", index: 1, nodes: [{ id: "n15", key: "15", value: "data", x: 200, y: 170 }], x: 100, y: 150 },
              { id: "slot2", index: 2, nodes: [{ id: "n22", key: "22", value: "data", x: 200, y: 220, isCollision: true }], x: 100, y: 200 },
              { id: "slot3", index: 3, nodes: [{ id: "n10", key: "10", value: "data", x: 200, y: 270 }], x: 100, y: 250 },
              { id: "slot4", index: 4, nodes: [{ id: "n29", key: "29", value: "data", x: 200, y: 320, isCollision: true }], x: 100, y: 300 },
              { id: "slot5", index: 5, nodes: [{ id: "n31", key: "31", value: "data", x: 200, y: 370, isCollision: true }], x: 100, y: 350, isActive: true },
              { id: "slot6", index: 6, nodes: [{ id: "n38", key: "38", value: "data", x: 200, y: 420, isCollision: true }], x: 100, y: 400 }
            ],
            message: "α approaches 1.0: Clustering effect, long probe sequences, degraded performance"
          }
        ]
      },
      {
        id: "performance-mcq-1",
        type: "mcq",
        title: "Load Factor Understanding",
        mcq: {
          id: "q4",
          question: "What load factor typically triggers resizing in a well-designed hash table?",
          options: [
            { id: "a", text: "0.5", isCorrect: false },
            { id: "b", text: "0.75", isCorrect: true },
            { id: "c", text: "1.0", isCorrect: false },
            { id: "d", text: "1.5", isCorrect: false }
          ],
          explanation: "Most hash table implementations resize when load factor reaches 0.75, balancing good performance with reasonable space utilization."
        }
      },
      {
        id: "resizing-explanation",
        type: "content",
        title: "Dynamic Resizing",
        content: `**Why Resize?**
As load factor increases, performance degrades. Dynamic resizing maintains optimal performance.

**When to Resize:**
• **Expand**: When α > 0.75 (threshold may vary)
• **Shrink**: When α < 0.25 (avoid wasted space)

**How to Resize:**
1. **Create new table** (usually double/half the size)
2. **Rehash all elements** (hash values change with new size!)
3. **Replace old table** with new one

**Resizing Cost:**
• **Time**: O(n) to rehash all elements
• **Space**: Temporarily need 2x memory
• **Amortized**: O(1) per operation over time

**Example Resize Sequence:**
\`\`\`
Initial: size=4, elements=3, α=0.75 ✓
Insert: size=4, elements=4, α=1.0 ✗ → RESIZE!
After: size=8, elements=4, α=0.5 ✓
\`\`\`

**Implementation Note:**
Resizing is expensive but infrequent, so average performance remains excellent.`
      }
    ]
  },
  {
    id: 5,
    title: "Applications of Hashing",
    description: "Real-world applications and use cases of hash tables",
    steps: [
      {
        id: "applications-intro",
        type: "content",
        title: "Where Do We Use Hashing?",
        content: `Hash tables are everywhere in computer science! Let's explore the major applications:

**1. Database Systems**
• Index structures for fast record lookup
• Join operations between tables
• Caching query results

**2. Compilers & Interpreters**  
• Symbol tables for variable/function names
• Keyword recognition
• Constant folding optimizations

**3. Caching Systems**
• Web browser cache (URL → cached page)
• CPU cache management
• Database query cache

**4. Security**
• Password storage (hashed passwords)
• Digital signatures and checksums
• Cryptographic applications

**5. Programming Languages**
• Python dictionaries, Java HashMap
• JavaScript objects, Ruby hashes
• Built-in associative arrays`
      },
      {
        id: "database-indexing",
        type: "content",
        title: "Application: Database Indexing",
        content: `**Scenario**: An e-commerce database with millions of products.

**Without Hash Index:**
\`\`\`sql
SELECT * FROM products WHERE product_id = 'P12345';
-- Scans entire table: O(n) time
\`\`\`

**With Hash Index:**
\`\`\`sql
-- Hash index on product_id column
SELECT * FROM products WHERE product_id = 'P12345';
-- Direct lookup: O(1) average time
\`\`\`

**Hash Join Example:**
\`\`\`sql
SELECT p.name, o.quantity 
FROM products p
JOIN orders o ON p.product_id = o.product_id;

-- Algorithm:
-- 1. Build hash table on smaller table (products)
-- 2. Probe with each row from larger table (orders)
-- 3. Much faster than nested loop join
\`\`\``
      },
      {
        id: "compiler-symbol-table",
        type: "content",
        title: "Application: Compiler Symbol Tables",
        content: `**What is a Symbol Table?**
A data structure that stores information about identifiers (variables, functions, classes) in a program.

**Example C++ Code:**
\`\`\`cpp
int main() {
    int x = 10;      // Symbol: x, Type: int, Scope: main
    string name = "Alice";  // Symbol: name, Type: string
    
    if (x > 5) {
        double y = 3.14;  // Symbol: y, Type: double, Scope: if-block
    }
}
\`\`\`

**Symbol Table (Hash Table):**
| Key (Name) | Value (Info) |
|------------|--------------|
| "main" | {type: function, return: int, scope: global} |
| "x" | {type: int, value: 10, scope: main} |
| "name" | {type: string, value: "Alice", scope: main} |
| "y" | {type: double, value: 3.14, scope: if-block} |

**Operations:**
• **Insert**: Add new variable declaration
• **Lookup**: Check if variable is declared
• **Update**: Modify variable information
• **Scope Management**: Handle nested scopes`
      },
      {
        id: "web-caching",
        type: "content",
        title: "Application: Web Caching",
        content: `**Web Browser Cache Example:**

When you visit a website, the browser caches resources to speed up future visits.

**Cache Structure (Hash Table):**
\`\`\`
Key: URL string
Value: {content, timestamp, expiry, size}

Examples:
"https://example.com/logo.png" → {image_data, 2024-01-15, expires: 7days}
"https://api.github.com/users/john" → {json_data, 2024-01-15, expires: 1hour}
\`\`\`

**Cache Operations:**
1. **GET Request**: 
   - Check cache with URL as key
   - If hit and not expired: return cached content
   - If miss: fetch from server, cache result

2. **Cache Eviction**:
   - LRU (Least Recently Used) with hash table + doubly linked list
   - Hash table provides O(1) lookup
   - Linked list maintains access order

**Benefits:**
• Faster page loads (no network request)
• Reduced bandwidth usage
• Better user experience`
      },
      {
        id: "password-hashing-scenario",
        type: "content",
        title: "🟢 Scenario – Password Security 🔐",
        content: "You're building a login system for a website. Users create accounts with passwords like 'mypassword123'.\n\n**Bad Approach**: Store passwords directly in database\n**Good Approach**: Store hashed passwords\n\n**Question to User:**\nWhy shouldn't we store passwords directly? What happens if the database gets hacked? How does hashing help?",
        chatbot: [
          {
            question: "Why shouldn't we store passwords directly? What happens if the database gets hacked?",
            context: "Storing passwords in plain text is a major security risk. If the database is compromised, attackers can instantly see and use all user passwords. Since many users reuse passwords across sites, this can lead to large-scale account breaches and data theft.",
            hint: "Think about the consequences if someone gains unauthorized access to the database.",
            topic: "password security hashing"
          },
          {
            question: "How does hashing help protect passwords even if the database is compromised?",
            context: "Hashing converts passwords into fixed-length, irreversible values using a one-way mathematical function. Even if attackers obtain the hashes, they cannot directly recover the original passwords. This provides a layer of security by making stolen data much harder to exploit.",
            hint: "Hash functions are designed to be irreversible - you can't unhash to get the original input.",
            topic: "password security hashing"
          },
          {
            question: "If hashing is one-way, how does the system verify a user's password during login?",
            context: "During authentication, the system hashes the entered password using the same algorithm and compares the result to the stored hash. If the two hashes match, access is granted. This process ensures verification without ever storing or revealing the plain text password.",
            hint: "The system doesn't need to unhash - it just needs to check if hash(entered_password) equals stored_hash.",
            topic: "password security hashing"
          }
        ]
      },
      {
        id: "password-hashing-example",
        type: "content",
        title: "Password Hashing Implementation",
        content: `**Secure Password Storage:**

\`\`\`python
import hashlib
import secrets

def hash_password(password):
    # Generate random salt
    salt = secrets.token_hex(16)
    
    # Combine password + salt and hash
    password_salt = password + salt
    hash_value = hashlib.sha256(password_salt.encode()).hexdigest()
    
    return hash_value, salt

def verify_password(password, stored_hash, salt):
    # Hash the entered password with stored salt
    password_salt = password + salt
    hash_value = hashlib.sha256(password_salt.encode()).hexdigest()
    
    # Compare with stored hash
    return hash_value == stored_hash

# Example usage:
password = "mypassword123"
hash_val, salt = hash_password(password)

# Store hash_val and salt in database (NOT the original password)
print(f"Stored hash: {hash_val}")
print(f"Salt: {salt}")

# During login verification:
is_valid = verify_password("mypassword123", hash_val, salt)  # True
is_valid = verify_password("wrongpassword", hash_val, salt)  # False
\`\`\`

**Key Points:**
• Original password is never stored
• Salt prevents rainbow table attacks
• Hash function makes it computationally infeasible to reverse`
      },
      {
        id: "applications-mcq-1",
        type: "mcq", 
        title: "Application Understanding",
        mcq: {
          id: "q5",
          question: "Why do we add a 'salt' when hashing passwords?",
          options: [
            { id: "a", text: "To make the password longer", isCorrect: false },
            { id: "b", text: "To prevent rainbow table attacks", isCorrect: true },
            { id: "c", text: "To make hashing faster", isCorrect: false },
            { id: "d", text: "To compress the password", isCorrect: false }
          ],
          explanation: "Salt is a random value added to passwords before hashing to ensure that identical passwords have different hashes, preventing rainbow table attacks."
        }
      },
      {
        id: "programming-languages",
        type: "content",
        title: "Hash Tables in Programming Languages",
        content: `**Python Dictionary:**
\`\`\`python
# Internal hash table implementation
student_grades = {
    "Alice": 95,
    "Bob": 87,
    "Charlie": 92
}

# O(1) average lookup
print(student_grades["Alice"])  # 95

# O(1) average insertion  
student_grades["David"] = 88
\`\`\`

**Java HashMap:**
\`\`\`java
import java.util.HashMap;

HashMap<String, Integer> grades = new HashMap<>();
grades.put("Alice", 95);
grades.put("Bob", 87);

// O(1) average operations
int aliceGrade = grades.get("Alice");
boolean hasCharlie = grades.containsKey("Charlie");
\`\`\`

**JavaScript Object (Hash Table):**
\`\`\`javascript
const student_grades = {
    "Alice": 95,
    "Bob": 87,
    "Charlie": 92
};

// Property access is hash table lookup
console.log(student_grades["Alice"]);  // 95
console.log(student_grades.Bob);       // 87 (dot notation)
\`\`\`

**Performance Characteristics:**
All these implementations provide O(1) average-case performance for basic operations.`
      }
    ]
  },
  {
    id: 6,
    title: "Advanced Hashing Techniques",
    description: "Exploring sophisticated hashing methods and specialized applications",
    steps: [
      {
        id: "advanced-intro",
        type: "content",
        title: "Beyond Basic Hashing",
        content: `We've covered fundamental hashing concepts. Now let's explore advanced techniques used in specialized applications:

**Advanced Topics:**
1. **Perfect Hashing** - Zero collisions for static datasets
2. **Cuckoo Hashing** - Guaranteed O(1) worst-case lookup
3. **Consistent Hashing** - For distributed systems
4. **Bloom Filters** - Probabilistic set membership
5. **Cryptographic Hashing** - Security applications

**Why Advanced Techniques?**
• Handle specific performance requirements
• Provide theoretical guarantees
• Solve distributed system challenges
• Enable probabilistic data structures
• Meet security requirements

Each technique trades off different aspects: space, time, complexity, and guarantees.`
      },
      {
        id: "perfect-hashing",
        type: "content",
        title: "Perfect Hashing",
        content: `**Perfect Hashing** eliminates collisions entirely for a known, static set of keys.

**Two-Level Perfect Hashing:**

**Level 1**: Use a hash function to distribute keys into buckets
**Level 2**: Each bucket uses its own perfect hash function

**Example:**
\`\`\`
Keys: {10, 22, 31, 4, 15, 28, 17}

Level 1: h₁(k) = k mod 4
Bucket 0: {4, 28}     → Use perfect hash h₀
Bucket 1: {17}        → Direct placement  
Bucket 2: {10, 22}    → Use perfect hash h₂
Bucket 3: {31, 15}    → Use perfect hash h₃
\`\`\`

**Properties:**
• **Space**: O(n) expected space
• **Construction**: O(n) expected time  
• **Lookup**: O(1) worst-case time
• **Limitation**: Only works for static key sets

**Applications:**
• Compiler keyword tables
• Reserved word lookup
• Static configuration data
• Hardware implementations`
      },
      {
        id: "cuckoo-hashing",
        type: "content",
        title: "Cuckoo Hashing",
        content: `**Cuckoo Hashing** provides guaranteed O(1) worst-case lookup by using two hash functions and two tables.

**Key Idea:**
Each key can be stored in one of two possible positions. If both are occupied, "kick out" existing elements and rehash them.

**Algorithm:**
1. Try to insert in table1[h₁(key)]
2. If occupied, move existing element to its alternative location in table2
3. Continue until all elements find a place or detect a cycle

**Example Visualization:**
\`\`\`
Table 1: [A, _, C, _]
Table 2: [_, B, _, D]

Insert E:
- h₁(E) = 0, but A is there
- Move A to table2[h₂(A)] = 1, but B is there  
- Move B to table1[h₁(B)] = 3 ✓
- Place A in table2[1] ✓
- Place E in table1[0] ✓
\`\`\`

**Performance:**
• **Lookup**: O(1) worst-case
• **Insert**: O(1) expected, may require rehashing
• **Space**: Requires load factor < 0.5 for good performance

**Applications:**
• Real-time systems requiring guaranteed response times
• Network routing tables
• Hardware implementations`
      },
      {
        id: "consistent-hashing",
        type: "content",
        title: "Consistent Hashing for Distributed Systems",
        content: `**Problem**: In distributed systems, how do you distribute data across multiple servers while handling server additions/failures gracefully?

**Traditional Hashing Issues:**
\`\`\`
server = hash(key) % num_servers

If num_servers changes:
- Most keys need to be redistributed
- Causes massive data movement
\`\`\`

**Consistent Hashing Solution:**
1. **Hash Ring**: Imagine servers and keys placed on a circular ring
2. **Key Placement**: Each key is assigned to the first server clockwise
3. **Server Changes**: Only affects immediate neighbors

**Example:**
\`\`\`
Ring positions (0-999):
Server A: 100, Server B: 300, Server C: 700

Key placements:
hash("user1") = 150 → Server B (next clockwise)
hash("user2") = 50  → Server A (next clockwise)  
hash("user3") = 800 → Server A (wraps around)

If Server B fails:
- Keys 101-300 move to Server C
- Keys 0-100 and 301-999 stay put
\`\`\`

**Applications:**
• Content Delivery Networks (CDNs)
• Distributed caches (Redis Cluster)
• Database sharding
• Load balancers`
      },
      {
        id: "bloom-filters",
        type: "content",
        title: "Bloom Filters: Probabilistic Hashing",
        content: `**Bloom Filter**: A space-efficient probabilistic data structure for set membership testing.

**Key Properties:**
• **False Positives**: Possible (may say element exists when it doesn't)
• **False Negatives**: Impossible (if it says no, element definitely not in set)
• **Space Efficient**: Much smaller than storing actual elements

**How It Works:**
1. **Bit Array**: Start with array of m bits, all set to 0
2. **k Hash Functions**: Use k different hash functions  
3. **Insert**: For each element, set bits at h₁(x), h₂(x), ..., hₖ(x) to 1
4. **Query**: Check if all k bits are set to 1

**Example:**
\`\`\`
Bit array: [0,0,0,0,0,0,0,0]  (8 bits)
Hash functions: h₁(x) = x % 8, h₂(x) = (x*3) % 8

Insert "apple":
h₁("apple") = 2, h₂("apple") = 6
Result: [0,0,1,0,0,0,1,0]

Insert "banana":  
h₁("banana") = 1, h₂("banana") = 4
Result: [0,1,1,0,1,0,1,0]

Query "apple": Check bits 2,6 → Both 1 → "Probably in set"
Query "cherry": Check bits 3,7 → Not all 1 → "Definitely not in set"
\`\`\`

**Applications:**
• Web crawlers (avoid revisiting URLs)
• Database query optimization
• Network security (malicious URL detection)
• Cryptocurrency (Bitcoin transaction verification)`
      },
      {
        id: "cryptographic-hashing",
        type: "content", 
        title: "Cryptographic Hash Functions",
        content: `**Cryptographic Hash Functions** have additional security properties beyond regular hash functions.

**Additional Properties:**

**1. Pre-image Resistance**
• Given hash h, it's computationally infeasible to find x such that hash(x) = h
• "One-way function"

**2. Second Pre-image Resistance**  
• Given x₁, it's infeasible to find x₂ ≠ x₁ such that hash(x₁) = hash(x₂)
• "Weak collision resistance"

**3. Collision Resistance**
• It's infeasible to find any two inputs x₁, x₂ such that hash(x₁) = hash(x₂)  
• "Strong collision resistance"

**Common Algorithms:**
• **MD5**: 128-bit output (deprecated - vulnerable)
• **SHA-1**: 160-bit output (deprecated for security)
• **SHA-256**: 256-bit output (widely used)
• **SHA-3**: Variable output (latest standard)

**Applications:**

**Digital Signatures:**
\`\`\`
1. Hash the document: h = SHA-256(document)
2. Sign the hash: signature = RSA_sign(h, private_key)  
3. Verify: RSA_verify(signature, SHA-256(document), public_key)
\`\`\`

**Blockchain:**
\`\`\`
Block = {
    previous_hash: "a1b2c3...",
    transactions: [...],
    nonce: 12345
}

block_hash = SHA-256(Block)
// Must start with zeros for proof-of-work
\`\`\`

**File Integrity:**
\`\`\`
file_hash = SHA-256(file_contents)
// Store hash separately - detect file modifications
\`\`\``
      },
      {
        id: "advanced-mcq-1",
        type: "mcq",
        title: "Advanced Hashing Concepts",
        mcq: {
          id: "q6",
          question: "What is the main advantage of Bloom filters over regular hash tables?",
          options: [
            { id: "a", text: "Faster lookup time", isCorrect: false },
            { id: "b", text: "No false positives", isCorrect: false },
            { id: "c", text: "Much more space efficient", isCorrect: true },
            { id: "d", text: "Better for small datasets", isCorrect: false }
          ],
          explanation: "Bloom filters use a small fixed-size bit array regardless of the number of elements, making them extremely space-efficient compared to storing actual elements."
        }
      }
    ]
  },
  {
    id: 7,
    title: "Practical Concerns & Trade-offs",
    description: "Real-world considerations when implementing hash tables",
    steps: [
      {
        id: "practical-intro",
        type: "content",
        title: "Real-World Implementation Challenges",
        content: `Moving from theory to practice involves many considerations:

**Key Practical Issues:**
1. **Hash Function Selection** - Balancing speed vs. quality
2. **Dynamic Resizing** - When and how to resize
3. **Memory Management** - Handling large datasets
4. **Thread Safety** - Concurrent access challenges  
5. **Security Concerns** - Hash flooding attacks
6. **Performance Optimization** - Cache-friendly implementations

**Trade-off Decisions:**
• **Speed vs. Space**: Faster hash functions vs. better distribution
• **Simplicity vs. Performance**: Easy implementation vs. optimal performance  
• **Flexibility vs. Efficiency**: Generic design vs. specialized optimization
• **Safety vs. Speed**: Security checks vs. raw performance

**Context Matters:**
The best choice depends on your specific use case, constraints, and requirements.`
      },
      {
        id: "hash-function-selection",
        type: "content",
        title: "Choosing the Right Hash Function",
        content: `**Hash Function Trade-offs:**

**Fast but Simple Functions:**
\`\`\`cpp
// Very fast, poor distribution for some inputs
hash = key % table_size;

// Fast, better distribution
hash = (key * 2654435761U) >> (32 - log2(table_size));
\`\`\`

**Slower but Better Distribution:**
\`\`\`cpp  
// MurmurHash - good balance
uint32_t murmur_hash(uint32_t key) {
    key ^= key >> 16;
    key *= 0x85ebca6b;
    key ^= key >> 13;  
    key *= 0xc2b2ae35;
    key ^= key >> 16;
    return key;
}
\`\`\`

**String Hashing Comparison:**

**djb2 (fast, decent quality):**
\`\`\`cpp
hash = 5381;
for (char c : str) {
    hash = ((hash << 5) + hash) + c;  // hash * 33 + c
}
\`\`\`

**FNV-1a (good quality, moderate speed):**
\`\`\`cpp
hash = 2166136261U;
for (char c : str) {
    hash ^= c;
    hash *= 16777619;
}
\`\`\`

**Selection Guidelines:**
• **High-frequency lookups**: Prioritize speed
• **Poor input distribution**: Prioritize quality
• **Security-critical**: Use cryptographic functions
• **Memory-constrained**: Consider hash quality vs. table size`
      },
      {
        id: "resizing-strategies",
        type: "content",
        title: "Dynamic Resizing Strategies",
        content: `**Resizing Triggers:**

**Load Factor Based:**
\`\`\`cpp
if (num_elements / table_size > 0.75) {
    resize(table_size * 2);
}
if (num_elements / table_size < 0.25) {
    resize(table_size / 2);
}
\`\`\`

**Performance Based:**
\`\`\`cpp
if (average_probe_distance > threshold) {
    resize_and_rehash();
}
\`\`\`

**Incremental Resizing (for real-time systems):**
\`\`\`cpp
class IncrementalHashTable {
    HashTable old_table, new_table;
    int migration_progress;
    
    void migrate_some_elements() {
        // Move a few elements per operation
        for (int i = 0; i < MIGRATION_BATCH; i++) {
            move_element_from_old_to_new();
        }
    }
};
\`\`\`

**Resize Cost Management:**
• **Amortized Analysis**: Expensive operations spread over many cheap ones
• **Memory Allocation**: Pre-allocate vs. dynamic allocation  
• **Thread Safety**: Lock-free vs. synchronized resizing
• **Service Interruption**: Minimize unavailability during resize

**Alternative: Robin Hood Hashing**
Reduces variance in probe distances without resizing as frequently.`
      },
      {
        id: "security-concerns",
        type: "content",
        title: "🟢 Scenario – Hash Flooding Attack 🛡️",
        content: "An attacker discovers your web server uses a simple hash function for session storage. They send specially crafted requests with keys that all hash to the same value.\n\n**Result**: All requests hit the same hash table slot, creating a linked list of 10,000 elements. Server response time goes from 1ms to 10 seconds.\n\n**Question to User:**\nHow could an attacker figure out which keys cause hash collisions? What defenses can we implement?",
        chatbot: [
          {
            question: "How could an attacker figure out which keys cause hash collisions?",
            context: "If the hash function used by the server is simple, predictable, or publicly known (e.g., key % table_size or other deterministic patterns), an attacker can analyze or reverse-engineer the function to find multiple keys that produce the same hash value. By sending requests with these colliding keys, they can deliberately trigger performance degradation.",
            hint: "Think about how predictable hash functions can be reverse-engineered or analyzed.",
            topic: "hash security"
          },
          {
            question: "What defenses can we implement against hash flooding attacks?",
            context: "To mitigate hash flooding attacks, systems can use stronger, non-deterministic hash functions such as cryptographic hashes (e.g., SHA-256) with per-instance randomization or salting. Additional defenses include rate limiting, dynamic hash seeding per session, using balanced data structures like trees instead of lists for collision handling, and monitoring for abnormal collision or request patterns.",
            hint: "Consider both making collisions harder to create and limiting the impact when they occur.",
            topic: "hash security"
          }
        ]
      },
      {
        id: "security-defenses",
        type: "content",
        title: "Hash Table Security Defenses",
        content: `**Defense Strategies Against Hash Attacks:**

**1. Randomized Hash Functions:**
\`\`\`cpp
class SecureHashTable {
    uint32_t random_seed;  // Generated at startup
    
    uint32_t hash(const string& key) {
        return siphash(key.c_str(), key.length(), random_seed);
    }
};
\`\`\`

**2. Universal Hashing:**
\`\`\`cpp
// Choose hash function randomly from family
class UniversalHash {
    uint32_t a, b, p;  // Random parameters
    
public:
    UniversalHash() {
        p = 2147483647;  // Large prime
        a = rand() % (p-1) + 1;
        b = rand() % p;
    }
    
    uint32_t hash(uint32_t key) {
        return ((a * key + b) % p) % table_size;
    }
};
\`\`\`

**3. Rate Limiting:**
\`\`\`cpp
class RateLimitedHashTable {
    unordered_map<string, int> collision_counts;
    
    bool is_suspicious(const string& key) {
        return collision_counts[key] > COLLISION_THRESHOLD;
    }
};
\`\`\`

**4. Alternative Data Structures:**
- Switch to balanced trees when high collision rate detected
- Use cuckoo hashing for guaranteed O(1) worst-case
- Implement hybrid structures

**Best Practices:**
• Never expose hash function details
• Monitor collision rates in production  
• Use security-focused hash libraries
• Implement defense in depth`
      },
      {
        id: "memory-optimization",
        type: "content",
        title: "Memory Optimization Techniques",
        content: `**Memory Layout Optimizations:**

**1. Cache-Friendly Design:**
\`\`\`cpp
// Bad: Pointer chasing, poor cache locality
struct ChainedNode {
    string key;
    int value; 
    ChainedNode* next;  // Scattered in memory
};

// Better: Array-based chaining
struct CacheFriendlyBucket {
    static const int CAPACITY = 4;
    pair<string, int> items[CAPACITY];
    int count;
    CacheFriendlyBucket* overflow;  // Only if needed
};
\`\`\`

**2. Memory Pool Allocation:**
\`\`\`cpp
class HashTableWithPool {
    MemoryPool<Node> node_pool;
    
public:
    void insert(const string& key, int value) {
        Node* node = node_pool.allocate();  // Fast allocation
        // ... insert logic
    }
    
    void remove(const string& key) {
        // ... remove logic
        node_pool.deallocate(node);  // Fast deallocation
    }
};
\`\`\`

**3. Compact Representations:**
\`\`\`cpp
// For integer keys, use open addressing with empty slots marked specially
class CompactIntHashTable {
    static const int EMPTY = INT_MIN;
    static const int DELETED = INT_MIN + 1;
    
    vector<int> keys;    // No separate storage for values
    vector<int> values;  // Parallel arrays
};
\`\`\`

**Memory vs. Performance Trade-offs:**
• Smaller tables → more collisions but less memory
• Larger tables → fewer collisions but more memory
• Pointer overhead vs. cache performance
• Specialized vs. generic implementations`
      },
      {
        id: "practical-mcq-1",
        type: "mcq",
        title: "Practical Implementation",
        mcq: {
          id: "q7",
          question: "What is the primary defense against hash flooding attacks?",
          options: [
            { id: "a", text: "Using larger hash tables", isCorrect: false },
            { id: "b", text: "Using randomized hash functions", isCorrect: true },
            { id: "c", text: "Using faster hash functions", isCorrect: false },
            { id: "d", text: "Using perfect hashing", isCorrect: false }
          ],
          explanation: "Randomized hash functions make it computationally infeasible for attackers to predict which keys will cause collisions, preventing targeted hash flooding attacks."
        }
      },
      {
        id: "when-not-to-use-hashing",
        type: "content",
        title: "When NOT to Use Hash Tables",
        content: `**Hash Tables Are Not Always the Answer:**

**Avoid Hash Tables When:**

**1. You Need Ordering:**
\`\`\`cpp
// Wrong: Hash table loses order
unordered_map<int, string> students;  
// Can't efficiently get "first 10 students" or "students with IDs 100-200"

// Right: Use ordered structures  
map<int, string> students;           // Red-black tree
vector<pair<int, string>> students;  // Sorted array
\`\`\`

**2. Range Queries Are Common:**
\`\`\`sql
-- Hash indexes can't optimize these queries:
SELECT * FROM products WHERE price BETWEEN 10 AND 50;
SELECT * FROM users WHERE age > 25 ORDER BY age;

-- Use B-trees or sorted structures instead
\`\`\`

**3. Memory is Extremely Constrained:**
\`\`\`cpp
// Hash table overhead may be too high
// For small datasets, linear search might be faster:
vector<pair<string, int>> small_config;  // < 20 items
// O(n) search is fine, no hash overhead
\`\`\`

**4. Worst-Case Performance Guarantees Needed:**
\`\`\`cpp
// Real-time systems requiring guaranteed response times
balanced_tree<Key, Value> rt_storage;  // O(log n) guaranteed
// vs
unordered_map<Key, Value> hash_storage;  // O(n) worst-case possible
\`\`\`

**Better Alternatives:**
• **Sorted Arrays**: For static data with range queries
• **B-Trees**: For ordered data with updates
• **Tries**: For string prefix operations  
• **Skip Lists**: For ordered data with probabilistic guarantees
• **Segment Trees**: For range query operations`
      }
    ]
  },
  {
    id: 8,
    title: "Case Studies",
    description: "Real-world implementations in popular systems and languages",
    steps: [
      {
        id: "case-studies-intro",
        type: "content",
        title: "Learning from Real Implementations",
        content: `Let's examine how hash tables are implemented in production systems:

**Case Studies:**
1. **Python dict** - Compact, memory-efficient design
2. **Java HashMap** - Robust collision handling with tree conversion
3. **Redis** - High-performance in-memory data store
4. **Git** - Content-addressable storage using SHA-1 hashes

**What We'll Learn:**
• Design decisions and trade-offs made by experts
• Performance optimizations for specific use cases
• How theory translates to production systems
• Evolution of implementations over time

**Why Study Real Systems?**
• Understand practical constraints
• Learn optimization techniques
• See how requirements shape design
• Appreciate the complexity of production code`
      },
      {
        id: "python-dict",
        type: "content",
        title: "Case Study: Python Dictionary",
        content: `**Python's dict** (Python 3.6+) uses a compact, memory-efficient design.

**Key Innovation: Compact Layout**

**Old Design (pre-3.6):**
\`\`\`
Hash Table: [entry0, entry1, entry2, ..., entryN]
Each entry: {hash, key, value} - many empty slots
Memory usage: High due to empty slots
\`\`\`

**New Design (3.6+):**
\`\`\`
Indices: [1, -1, 0, 2, -1, ...]    # Sparse array of indices
Entries: [{hash, key, value}, ...]  # Compact array, no gaps

Lookup process:
1. hash(key) → index in indices array
2. indices[index] → position in entries array  
3. entries[position] → actual key-value pair
\`\`\`

**Benefits:**
• **Memory**: 20-25% less memory usage
• **Cache**: Better locality of reference
• **Ordering**: Maintains insertion order (as of Python 3.7+)
• **Iteration**: Faster iteration over key-value pairs

**Implementation Details:**
\`\`\`python
class CompactDict:
    def __init__(self):
        self.indices = [-1] * 8      # Sparse hash table
        self.entries = []            # Dense key-value storage
        self.used = 0               # Number of active entries
    
    def __setitem__(self, key, value):
        hash_val = hash(key)
        index = hash_val % len(self.indices)
        
        # Handle collisions with open addressing
        while self.indices[index] != -1:
            entry_pos = self.indices[index]
            if self.entries[entry_pos].key == key:
                self.entries[entry_pos].value = value  # Update
                return
            index = (index + 1) % len(self.indices)
        
        # New key
        self.indices[index] = len(self.entries)
        self.entries.append(Entry(hash_val, key, value))
\`\`\``
      },
      {
        id: "java-hashmap",
        type: "content",
        title: "Case Study: Java HashMap",
        content: `**Java HashMap** handles high collision rates by converting chains to trees.

**Evolution Over Time:**

**Java 7 and Earlier:**
\`\`\`java
// Simple chaining with linked lists
class Node {
    int hash;
    K key;
    V value; 
    Node next;  // Always a linked list
}
\`\`\`

**Java 8+ Innovation - Tree Conversion:**
\`\`\`java
// Dynamic structure based on collision count
class Node {
    int hash;
    K key;
    V value;
    Node next;
}

class TreeNode extends Node {
    TreeNode parent, left, right;
    boolean red;  // Red-black tree coloring
}
\`\`\`

**Collision Handling Strategy:**
1. **Threshold**: When bucket has ≥8 elements → convert to red-black tree
2. **Performance**: Tree operations are O(log n) vs O(n) for lists
3. **Memory**: Trees use more memory but provide worst-case guarantees
4. **Conversion Back**: When tree shrinks to ≤6 elements → convert back to list

**Hash Code Quality:**
\`\`\`java
// Java's String hashCode() implementation
public int hashCode() {
    int h = hash;
    if (h == 0 && value.length > 0) {
        for (int i = 0; i < value.length; i++) {
            h = 31 * h + value.charAt(i);
        }
        hash = h;  // Cache the result
    }
    return h;
}
\`\`\`

**Security Feature - Hash Randomization:**
\`\`\`java
// Uses random seed to prevent hash flooding attacks
static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
\`\`\``
      },
      {
        id: "redis-implementation",
        type: "content",
        title: "Case Study: Redis Hash Implementation",
        content: `**Redis** optimizes for memory efficiency and performance in an in-memory database.

**Multi-Level Optimization:**

**Small Hashes - Ziplist Encoding:**
\`\`\`
When hash has few elements:
- Store as a flat array: [key1, val1, key2, val2, ...]
- Linear search is faster than hash overhead
- Much more memory efficient
\`\`\`

**Large Hashes - Traditional Hash Table:**
\`\`\`c
typedef struct dict {
    dictType *type;
    void *privdata;
    dictht ht[2];          // Two hash tables for incremental rehashing
    long rehashidx;        // Rehashing progress (-1 if not rehashing)
} dict;

typedef struct dictht {
    dictEntry **table;     // Hash table array
    unsigned long size;    // Hash table size (power of 2)
    unsigned long sizemask; // size - 1
    unsigned long used;    // Number of entries
} dictht;
\`\`\`

**Incremental Rehashing:**
\`\`\`c
// Spreads rehashing cost across multiple operations
int dictRehash(dict *d, int n) {
    if (!dictIsRehashing(d)) return 0;
    
    while(n-- && d->ht[0].used != 0) {
        // Move one bucket from ht[0] to ht[1]
        while(d->ht[0].table[d->rehashidx] == NULL) {
            d->rehashidx++;
        }
        
        dictEntry *de = d->ht[0].table[d->rehashidx];
        while(de) {
            // Rehash this entry to new table
            dictEntry *nextde = de->next;
            unsigned int h = dictHashKey(d, de->key) & d->ht[1].sizemask;
            de->next = d->ht[1].table[h];
            d->ht[1].table[h] = de;
            d->ht[0].used--;
            d->ht[1].used++;
            de = nextde;
        }
        d->ht[0].table[d->rehashidx] = NULL;
        d->rehashidx++;
    }
    return 1;
}
\`\`\`

**Memory Optimizations:**
• Embedded strings for small keys/values
• Shared integer objects for common values  
• Expiration metadata stored separately
• Memory allocation optimized for typical Redis usage patterns`
      },
      {
        id: "git-content-hashing",
        type: "content",
        title: "Case Study: Git Content-Addressable Storage",
        content: `**Git** uses SHA-1 hashes as both identifiers and integrity checks.

**Content-Addressable Storage:**
\`\`\`
Every object in Git is stored by its SHA-1 hash:

Blob (file): SHA-1(file_content)
Tree (directory): SHA-1(directory_listing)  
Commit: SHA-1(commit_metadata + tree_hash + parent_hashes)

Example:
File content: "Hello, World!"
SHA-1: 8ab686eafeb1f44702738c8b0f24f2567c36da6d
Stored at: .git/objects/8a/b686eafeb1f44702738c8b0f24f2567c36da6d
\`\`\`

**Object Lookup Process:**
\`\`\`bash
# User runs: git show 8ab686ea
1. Expand short hash to full hash (if unique)
2. Compute object path: .git/objects/8a/b686ea...
3. Read and decompress object file
4. Verify SHA-1 matches content
5. Display object content
\`\`\`

**Hash Properties in Git:**

**Integrity:**
\`\`\`
If any bit in a file changes:
- SHA-1 hash changes completely
- Git detects corruption immediately
- References become invalid
\`\`\`

**Deduplication:**
\`\`\`
Identical files across different commits:
- Same content → same SHA-1 → same storage location
- Automatic deduplication across entire repository
- Massive space savings for similar files
\`\`\`

**Distributed Consistency:**
\`\`\`
Two developers with same commit:
- Identical content → identical SHA-1
- No central authority needed to assign IDs
- Natural conflict detection when hashes differ
\`\`\`

**Performance Optimizations:**
• Packed objects for storage efficiency
• Delta compression between similar objects
• Prefix indexing for fast hash lookups
• Shallow clones for reduced transfer

**Security Note:**
Git is transitioning from SHA-1 to SHA-256 due to SHA-1 collision vulnerabilities discovered in 2017.`
      },
      {
        id: "case-studies-comparison",
        type: "content",
        title: "Comparing Design Decisions",
        content: `**Summary of Design Choices:**

| System | Primary Goal | Key Innovation | Trade-off |
|--------|-------------|----------------|-----------|
| **Python dict** | Memory efficiency | Compact layout with indirection | Slightly more complex implementation |
| **Java HashMap** | Worst-case performance | Tree conversion for high collisions | Higher memory usage with trees |
| **Redis** | In-memory performance | Incremental rehashing + dual encodings | Complex implementation |
| **Git** | Data integrity | Content-addressable storage | Storage keys not human-readable |

**Common Patterns:**
1. **Adaptive Strategies**: Switch between techniques based on conditions
2. **Incremental Operations**: Spread expensive operations over time
3. **Memory vs. Speed Trade-offs**: Different solutions for different constraints
4. **Security Considerations**: Protection against malicious inputs

**Lessons for Implementation:**
• **Know Your Use Case**: Optimize for your specific requirements
• **Measure Real Performance**: Micro-benchmarks can be misleading
• **Plan for Growth**: Design systems that scale gracefully  
• **Consider the Ecosystem**: How does your hash table fit with other components?

**Evolution Over Time:**
All these systems evolved significantly:
• Python dict became more memory-efficient
• Java HashMap added collision-resistant trees
• Redis added incremental rehashing
• Git is moving to SHA-256

**Key Insight:**
There's no single "best" hash table implementation - the best choice depends on your specific requirements, constraints, and use patterns.`
      },
      {
        id: "case-studies-mcq-1",
        type: "mcq",
        title: "Real-World Implementations",
        mcq: {
          id: "q8",
          question: "Why does Java HashMap convert long collision chains to trees?",
          options: [
            { id: "a", text: "To use less memory", isCorrect: false },
            { id: "b", text: "To improve worst-case performance from O(n) to O(log n)", isCorrect: true },
            { id: "c", text: "To make implementation simpler", isCorrect: false },
            { id: "d", text: "To prevent hash collisions", isCorrect: false }
          ],
          explanation: "Tree conversion ensures that even with many collisions (worst-case scenario), operations remain O(log n) instead of degrading to O(n) with long linked lists."
        }
      },
      {
        id: "summary",
        type: "content",
        title: "Summary: The Journey of Hashing",
        content: `**What We've Learned:**

**Fundamentals:**
• Hash tables provide O(1) average-case performance for key operations
• Hash functions map keys to array indices deterministically
• Collisions are inevitable and must be handled gracefully

**Core Techniques:**
• **Chaining**: Use linked lists at each slot
• **Open Addressing**: Probe for alternative locations  
• **Load Factor Management**: Resize to maintain performance

**Advanced Concepts:**
• **Perfect Hashing**: Zero collisions for static data
• **Consistent Hashing**: For distributed systems
• **Bloom Filters**: Probabilistic set membership
• **Cryptographic Hashing**: Security applications

**Practical Considerations:**
• Security against hash flooding attacks
• Memory layout and cache performance
• Thread safety in concurrent environments
• When NOT to use hash tables

**Real-World Wisdom:**
• Every production system makes different trade-offs
• Requirements drive design decisions
• Performance comes from careful engineering, not just algorithms
• Systems evolve over time as needs change

**Key Insight:**
Hashing is not just about the algorithm - it's about understanding your data, your access patterns, your performance requirements, and your constraints, then making informed trade-offs to build systems that work reliably in production.

**Next Steps:**
• Implement hash tables in your preferred language
• Benchmark different collision resolution strategies
• Study more real-world implementations
• Consider hash tables for your own projects

The journey from "Why not just arrays?" to understanding production hash table implementations shows how deep computer science concepts become practical tools for solving real problems.`
      }
    ]
  }
];

