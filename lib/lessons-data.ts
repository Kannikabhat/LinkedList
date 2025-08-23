export interface Node {
  id: string;
  data: number;
  next?: string | null;
  prev?: string | null;
  x: number;
  y: number;
  isActive?: boolean;
  isTarget?: boolean;
}

export interface Pointer {
  id: string;
  label: string;
  targetNodeId: string | null;
  color: string;
}

export interface VisualizationStep {
  nodes: Node[];
  pointers: Pointer[];
  activeLineIndex?: number;
  message?: string;
  outputText?: string;
}

export interface ExecutionStep {
  lineIndex: number;
  nodes: Node[];
  pointers: Pointer[];
  message?: string;
  outputText?: string;
  condition?: boolean;
  action?: 'traverse' | 'insert' | 'delete' | 'assign' | 'print' | 'check';
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
  visualization?: VisualizationStep;
  executionSteps?: ExecutionStep[];
  mcq?: MCQ;
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  steps: LessonStep[];
}

export const lessons: Lesson[] = [
  {
    id: 1,
    title: "Introduction & Basics",
    description: "Understanding linked lists fundamentals and comparing with arrays",
    steps: [
      {
        id: "intro-1",
        type: "content",
        title: "Why Linked Lists?",
        content: `Arrays have several limitations that make them unsuitable for certain scenarios:
        
**Array Limitations:**
• Fixed size - once declared, size cannot be changed
• Memory waste - allocated memory might not be fully utilized
• Costly insertions/deletions - requires shifting elements
• Contiguous memory requirement - large blocks might not be available

**Linked List Advantages:**
• Dynamic size - grows and shrinks during runtime
• Efficient insertions/deletions - O(1) at known positions
• Memory efficient - allocates exactly what's needed
• Flexible memory allocation - nodes can be scattered in memory`
      },
      {
        id: "intro-2",
        type: "content",
        title: "What is a Linked List?",
        content: `A **Linked List** is a linear data structure where elements (called nodes) are stored in sequence, but not in contiguous memory locations.

**Key Components:**
• **Node**: Contains data and a reference (pointer) to the next node
• **Head**: Pointer to the first node in the list
• **Null**: Last node points to null, indicating end of list

Each node is connected to the next one through pointers, forming a "chain" of data elements.`
      },
      {
        id: "intro-3",
        type: "visualization",
        title: "Node Structure Visualization",
        visualization: {
          nodes: [
            { id: "node1", data: 10, next: "node2", x: 100, y: 150 },
            { id: "node2", data: 20, next: "node3", x: 300, y: 150 },
            { id: "node3", data: 30, next: null, x: 500, y: 150 }
          ],
          pointers: [
            { id: "head", label: "HEAD", targetNodeId: "node1", color: "#2563eb" }
          ],
          message: "A simple linked list with 3 nodes. Each node contains data and a pointer to the next node."
        }
      },
      {
        id: "intro-mcq-1",
        type: "mcq",
        title: "Quick Check",
        mcq: {
          id: "q1",
          question: "Which of the following is NOT a limitation of arrays?",
          options: [
            { id: "a", text: "Fixed size", isCorrect: false },
            { id: "b", text: "Insertion is costly", isCorrect: false },
            { id: "c", text: "Deletion is costly", isCorrect: false },
            { id: "d", text: "Cannot access element by index", isCorrect: true }
          ],
          explanation: "Arrays actually provide O(1) random access to elements by index, which is one of their main advantages over linked lists."
        }
      },
      {
        id: "intro-4",
        type: "content",
        title: "Array vs Linked List Comparison",
        content: `| Feature | Array | Linked List |
|---------|--------|-------------|
| **Memory** | Contiguous | Non-contiguous |
| **Size** | Fixed | Dynamic |
| **Access Time** | O(1) random access | O(n) sequential access |
| **Insertion/Deletion** | O(n) (shifting required) | O(1) at known position |
| **Memory Overhead** | None | Extra pointer storage |
| **Cache Performance** | Better (locality) | Poor (scattered nodes) |
| **Memory Allocation** | Compile time | Runtime |`
      },
      {
        id: "intro-5",
        type: "content",
        title: "Types of Linked Lists",
        content: `There are three main types of linked lists:

**1. Singly Linked List**
• Each node has one pointer to the next node
• Traversal is only possible in one direction (forward)
• Most basic and commonly used type

**2. Doubly Linked List** 
• Each node has two pointers: next and previous
• Traversal is possible in both directions
• Requires more memory but offers more flexibility

**3. Circular Linked List**
• Last node points back to the first node (or head)
• Can be singly or doubly linked
• Useful for round-robin scheduling and circular buffers`
      },
      {
        id: "intro-6",
        type: "visualization",
        title: "Types of Linked Lists - Visual",
        visualization: {
          nodes: [
            { id: "s1", data: 1, next: "s2", x: 80, y: 80 },
            { id: "s2", data: 2, next: "s3", x: 180, y: 80 },
            { id: "s3", data: 3, next: null, x: 280, y: 80 },
            
            { id: "d1", data: 1, next: "d2", prev: null, x: 80, y: 200 },
            { id: "d2", data: 2, next: "d3", prev: "d1", x: 180, y: 200 },
            { id: "d3", data: 3, next: null, prev: "d2", x: 280, y: 200 },
            
            { id: "c1", data: 1, next: "c2", x: 80, y: 320 },
            { id: "c2", data: 2, next: "c3", x: 180, y: 320 },
            { id: "c3", data: 3, next: "c1", x: 280, y: 320 }
          ],
          pointers: [],
          message: "Top: Singly Linked List | Middle: Doubly Linked List | Bottom: Circular Linked List"
        }
      }
    ]
  },
  {
    id: 2,
    title: "Singly Linked List",
    description: "Deep dive into singly linked lists with operations and implementations",
    steps: [
      {
        id: "singly-1",
        type: "content",
        title: "Node Structure",
        content: `A singly linked list node contains two parts:

**Data Field**: Stores the actual data (integer, string, object, etc.)
**Next Pointer**: Stores the address of the next node in the sequence

**Node Definition (Pseudocode):**
\`\`\`
class Node:
    data: integer
    next: Node pointer
    
    constructor(value):
        data = value
        next = null
\`\`\``
      },
      {
        id: "singly-2",
        type: "visualization",
        title: "Basic Traversal",
        code: [
          "function traverse(head):",
          "    current = head",
          "    while current != null:",
          "        print(current.data)",
          "        current = current.next"
        ],
        visualization: {
          nodes: [
            { id: "n1", data: 5, next: "n2", x: 100, y: 150, isActive: true },
            { id: "n2", data: 10, next: "n3", x: 250, y: 150 },
            { id: "n3", data: 15, next: null, x: 400, y: 150 }
          ],
          pointers: [
            { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
            { id: "current", label: "CURRENT", targetNodeId: "n1", color: "#dc2626" }
          ],
          activeLineIndex: 1,
          message: "Traversal starts with current pointer at head. We'll visit each node sequentially."
        },
        executionSteps: [
          {
            lineIndex: 0,
            nodes: [
              { id: "n1", data: 5, next: "n2", x: 100, y: 150 },
              { id: "n2", data: 10, next: "n3", x: 250, y: 150 },
              { id: "n3", data: 15, next: null, x: 400, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" }
            ],
            message: "Initialize: Set current pointer to head"
          },
          {
            lineIndex: 1,
            nodes: [
              { id: "n1", data: 5, next: "n2", x: 100, y: 150, isActive: true },
              { id: "n2", data: 10, next: "n3", x: 250, y: 150 },
              { id: "n3", data: 15, next: null, x: 400, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "current", label: "CURRENT", targetNodeId: "n1", color: "#dc2626" }
            ],
            message: "Assign current = head",
            action: "assign"
          },
          {
            lineIndex: 2,
            nodes: [
              { id: "n1", data: 5, next: "n2", x: 100, y: 150, isActive: true },
              { id: "n2", data: 10, next: "n3", x: 250, y: 150 },
              { id: "n3", data: 15, next: null, x: 400, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "current", label: "CURRENT", targetNodeId: "n1", color: "#dc2626" }
            ],
            message: "Check condition: current != null (true)",
            condition: true,
            action: "check"
          },
          {
            lineIndex: 3,
            nodes: [
              { id: "n1", data: 5, next: "n2", x: 100, y: 150, isActive: true },
              { id: "n2", data: 10, next: "n3", x: 250, y: 150 },
              { id: "n3", data: 15, next: null, x: 400, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "current", label: "CURRENT", targetNodeId: "n1", color: "#dc2626" }
            ],
            message: "Print current.data: 5",
            outputText: "5",
            action: "print"
          },
          {
            lineIndex: 4,
            nodes: [
              { id: "n1", data: 5, next: "n2", x: 100, y: 150 },
              { id: "n2", data: 10, next: "n3", x: 250, y: 150, isActive: true },
              { id: "n3", data: 15, next: null, x: 400, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "current", label: "CURRENT", targetNodeId: "n2", color: "#dc2626" }
            ],
            message: "Move current to next node",
            action: "traverse"
          },
          {
            lineIndex: 2,
            nodes: [
              { id: "n1", data: 5, next: "n2", x: 100, y: 150 },
              { id: "n2", data: 10, next: "n3", x: 250, y: 150, isActive: true },
              { id: "n3", data: 15, next: null, x: 400, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "current", label: "CURRENT", targetNodeId: "n2", color: "#dc2626" }
            ],
            message: "Check condition: current != null (true)",
            condition: true,
            action: "check"
          },
          {
            lineIndex: 3,
            nodes: [
              { id: "n1", data: 5, next: "n2", x: 100, y: 150 },
              { id: "n2", data: 10, next: "n3", x: 250, y: 150, isActive: true },
              { id: "n3", data: 15, next: null, x: 400, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "current", label: "CURRENT", targetNodeId: "n2", color: "#dc2626" }
            ],
            message: "Print current.data: 10",
            outputText: "5, 10",
            action: "print"
          },
          {
            lineIndex: 4,
            nodes: [
              { id: "n1", data: 5, next: "n2", x: 100, y: 150 },
              { id: "n2", data: 10, next: "n3", x: 250, y: 150 },
              { id: "n3", data: 15, next: null, x: 400, y: 150, isActive: true }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "current", label: "CURRENT", targetNodeId: "n3", color: "#dc2626" }
            ],
            message: "Move current to next node",
            action: "traverse"
          },
          {
            lineIndex: 2,
            nodes: [
              { id: "n1", data: 5, next: "n2", x: 100, y: 150 },
              { id: "n2", data: 10, next: "n3", x: 250, y: 150 },
              { id: "n3", data: 15, next: null, x: 400, y: 150, isActive: true }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "current", label: "CURRENT", targetNodeId: "n3", color: "#dc2626" }
            ],
            message: "Check condition: current != null (true)",
            condition: true,
            action: "check"
          },
          {
            lineIndex: 3,
            nodes: [
              { id: "n1", data: 5, next: "n2", x: 100, y: 150 },
              { id: "n2", data: 10, next: "n3", x: 250, y: 150 },
              { id: "n3", data: 15, next: null, x: 400, y: 150, isActive: true }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "current", label: "CURRENT", targetNodeId: "n3", color: "#dc2626" }
            ],
            message: "Print current.data: 15",
            outputText: "5, 10, 15",
            action: "print"
          },
          {
            lineIndex: 4,
            nodes: [
              { id: "n1", data: 5, next: "n2", x: 100, y: 150 },
              { id: "n2", data: 10, next: "n3", x: 250, y: 150 },
              { id: "n3", data: 15, next: null, x: 400, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "current", label: "CURRENT", targetNodeId: null, color: "#dc2626" }
            ],
            message: "Move current to next node (null)",
            action: "traverse"
          },
          {
            lineIndex: 2,
            nodes: [
              { id: "n1", data: 5, next: "n2", x: 100, y: 150 },
              { id: "n2", data: 10, next: "n3", x: 250, y: 150 },
              { id: "n3", data: 15, next: null, x: 400, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "current", label: "CURRENT", targetNodeId: null, color: "#dc2626" }
            ],
            message: "Check condition: current != null (false) - Exit loop",
            condition: false,
            action: "check"
          }
        ]
      },
      {
        id: "singly-mcq-1",
        type: "mcq",
        title: "Understanding Traversal",
        mcq: {
          id: "q2",
          question: "If a linked list has n nodes, how many nodes must we traverse in the worst case to search for an element?",
          options: [
            { id: "a", text: "log(n)", isCorrect: false },
            { id: "b", text: "n", isCorrect: true },
            { id: "c", text: "n/2", isCorrect: false },
            { id: "d", text: "Constant time", isCorrect: false }
          ],
          explanation: "In the worst case, the element we're searching for is at the end of the list or doesn't exist, so we need to traverse all n nodes."
        }
      },
      {
        id: "singly-3",
        type: "visualization",
        title: "Insertion at Beginning",
        code: [
          "function insertAtBeginning(head, value):",
          "    newNode = create new Node(value)",
          "    newNode.next = head",
          "    head = newNode",
          "    return head"
        ],
        visualization: {
          nodes: [
            { id: "new", data: 3, next: "n1", x: 50, y: 100, isTarget: true },
            { id: "n1", data: 5, next: "n2", x: 200, y: 150 },
            { id: "n2", data: 10, next: "n3", x: 350, y: 150 },
            { id: "n3", data: 15, next: null, x: 500, y: 150 }
          ],
          pointers: [
            { id: "head", label: "HEAD", targetNodeId: "new", color: "#2563eb" },
            { id: "newNode", label: "NEW", targetNodeId: "new", color: "#16a34a" }
          ],
          activeLineIndex: 2,
          message: "New node is created and linked to the current head. Head pointer is updated."
        }
      },
      {
        id: "singly-4",
        type: "visualization",
        title: "Insertion at End",
        code: [
          "function insertAtEnd(head, value):",
          "    newNode = create new Node(value)",
          "    if head == null:",
          "        return newNode",
          "    current = head",
          "    while current.next != null:",
          "        current = current.next",
          "    current.next = newNode",
          "    return head"
        ],
        visualization: {
          nodes: [
            { id: "n1", data: 5, next: "n2", x: 100, y: 150 },
            { id: "n2", data: 10, next: "n3", x: 250, y: 150 },
            { id: "n3", data: 15, next: "new", x: 400, y: 150, isActive: true },
            { id: "new", data: 25, next: null, x: 550, y: 150, isTarget: true }
          ],
          pointers: [
            { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
            { id: "current", label: "CURRENT", targetNodeId: "n3", color: "#dc2626" }
          ],
          activeLineIndex: 7,
          message: "Traversed to the last node and linking it to the new node."
        }
      },
      {
        id: "singly-5",
        type: "visualization",
        title: "Deletion by Value",
        code: [
          "function deleteByValue(head, value):",
          "    if head.data == value:",
          "        return head.next",
          "    current = head",
          "    while current.next != null:",
          "        if current.next.data == value:",
          "            current.next = current.next.next",
          "            return head",
          "        current = current.next",
          "    return head"
        ],
        visualization: {
          nodes: [
            { id: "n1", data: 5, next: "n2", x: 100, y: 150 },
            { id: "n2", data: 10, next: "n3", x: 250, y: 150, isTarget: true },
            { id: "n3", data: 15, next: null, x: 400, y: 150 }
          ],
          pointers: [
            { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
            { id: "current", label: "CURRENT", targetNodeId: "n1", color: "#dc2626" }
          ],
          activeLineIndex: 6,
          message: "Found the node to delete (10). Linking previous node directly to next node."
        }
      },
      {
        id: "singly-mcq-2",
        type: "mcq",
        title: "Deletion Operation",
        mcq: {
          id: "q3",
          question: "What happens to the deleted node's memory in most programming languages?",
          options: [
            { id: "a", text: "It's automatically freed", isCorrect: false },
            { id: "b", text: "It becomes a memory leak if not handled", isCorrect: true },
            { id: "c", text: "It's reused immediately", isCorrect: false },
            { id: "d", text: "Nothing, memory is unlimited", isCorrect: false }
          ],
          explanation: "In languages without garbage collection (like C/C++), you must manually free the deleted node's memory to prevent memory leaks."
        }
      },
      {
        id: "singly-6",
        type: "content",
        title: "Key Operations Summary",
        content: `**Time Complexities for Singly Linked List:**

| Operation | Time Complexity | Space Complexity |
|-----------|----------------|------------------|
| **Traversal** | O(n) | O(1) |
| **Search** | O(n) | O(1) |
| **Insert at Beginning** | O(1) | O(1) |
| **Insert at End** | O(n) | O(1) |
| **Insert at Position** | O(n) | O(1) |
| **Delete at Beginning** | O(1) | O(1) |
| **Delete by Value** | O(n) | O(1) |
| **Length Calculation** | O(n) | O(1) |

**Key Points:**
• Head insertion/deletion is very efficient - O(1)
• Tail operations require traversal - O(n) 
• No random access like arrays
• Memory efficient - only stores necessary data`
      }
    ]
  },
  {
    id: 3,
    title: "Doubly Linked List",
    description: "Exploring doubly linked lists with bidirectional traversal capabilities",
    steps: [
      {
        id: "doubly-1",
        type: "content",
        title: "Node Structure",
        content: `A doubly linked list node contains three parts:

**Data Field**: Stores the actual data
**Next Pointer**: Points to the next node in the sequence
**Previous Pointer**: Points to the previous node in the sequence

**Node Definition (Pseudocode):**
\`\`\`
class DoublyNode:
    data: integer
    next: DoublyNode pointer
    prev: DoublyNode pointer
    
    constructor(value):
        data = value
        next = null
        prev = null
\`\`\`

**Advantages:**
• Bidirectional traversal
• Efficient deletion when node reference is known
• Better for certain algorithms (like LRU cache)`
      },
      {
        id: "doubly-2",
        type: "visualization",
        title: "Doubly Linked List Structure",
        visualization: {
          nodes: [
            { id: "d1", data: 10, next: "d2", prev: null, x: 100, y: 150 },
            { id: "d2", data: 20, next: "d3", prev: "d1", x: 300, y: 150, isActive: true },
            { id: "d3", data: 30, next: null, prev: "d2", x: 500, y: 150 }
          ],
          pointers: [
            { id: "head", label: "HEAD", targetNodeId: "d1", color: "#2563eb" },
            { id: "tail", label: "TAIL", targetNodeId: "d3", color: "#16a34a" }
          ],
          message: "Each node has both next and prev pointers, allowing bidirectional traversal."
        }
      },
      {
        id: "doubly-mcq-1",
        type: "mcq",
        title: "Understanding Doubly Linked Lists",
        mcq: {
          id: "q4",
          question: "What is the main advantage of a doubly linked list over a singly linked list?",
          options: [
            { id: "a", text: "Requires less memory", isCorrect: false },
            { id: "b", text: "Faster traversal in both directions", isCorrect: true },
            { id: "c", text: "Easier implementation", isCorrect: false },
            { id: "d", text: "None of the above", isCorrect: false }
          ],
          explanation: "Doubly linked lists allow efficient traversal in both forward and backward directions, which is not possible in singly linked lists."
        }
      },
      {
        id: "doubly-3",
        type: "visualization",
        title: "Insertion at Beginning",
        code: [
          "function insertAtBeginning(head, value):",
          "    newNode = create new DoublyNode(value)",
          "    newNode.next = head",
          "    if head != null:",
          "        head.prev = newNode",
          "    head = newNode",
          "    return head"
        ],
        visualization: {
          nodes: [
            { id: "new", data: 5, next: "d1", prev: null, x: 50, y: 100, isTarget: true },
            { id: "d1", data: 10, next: "d2", prev: "new", x: 200, y: 150 },
            { id: "d2", data: 20, next: "d3", prev: "d1", x: 350, y: 150 },
            { id: "d3", data: 30, next: null, prev: "d2", x: 500, y: 150 }
          ],
          pointers: [
            { id: "head", label: "HEAD", targetNodeId: "new", color: "#2563eb" },
            { id: "newNode", label: "NEW", targetNodeId: "new", color: "#16a34a" }
          ],
          activeLineIndex: 4,
          message: "New node is linked to head, and head's prev pointer is updated to point back to new node."
        }
      },
      {
        id: "doubly-4",
        type: "visualization",
        title: "Deletion with Node Reference",
        code: [
          "function deleteNode(nodeToDelete):",
          "    if nodeToDelete.prev != null:",
          "        nodeToDelete.prev.next = nodeToDelete.next",
          "    if nodeToDelete.next != null:",
          "        nodeToDelete.next.prev = nodeToDelete.prev",
          "    // Update head if necessary",
          "    if nodeToDelete == head:",
          "        head = nodeToDelete.next"
        ],
        visualization: {
          nodes: [
            { id: "d1", data: 10, next: "d3", prev: null, x: 100, y: 150 },
            { id: "d2", data: 20, next: null, prev: null, x: 300, y: 100, isTarget: true },
            { id: "d3", data: 30, next: null, prev: "d1", x: 500, y: 150 }
          ],
          pointers: [
            { id: "head", label: "HEAD", targetNodeId: "d1", color: "#2563eb" },
            { id: "delete", label: "DELETE", targetNodeId: "d2", color: "#dc2626" }
          ],
          activeLineIndex: 2,
          message: "Node 20 is being deleted. Both prev and next pointers of adjacent nodes are updated."
        }
      },
      {
        id: "doubly-5",
        type: "visualization",
        title: "Backward Traversal",
        code: [
          "function traverseBackward(tail):",
          "    current = tail",
          "    while current != null:",
          "        print(current.data)",
          "        current = current.prev"
        ],
        visualization: {
          nodes: [
            { id: "d1", data: 10, next: "d2", prev: null, x: 100, y: 150 },
            { id: "d2", data: 20, next: "d3", prev: "d1", x: 300, y: 150 },
            { id: "d3", data: 30, next: null, prev: "d2", x: 500, y: 150, isActive: true }
          ],
          pointers: [
            { id: "tail", label: "TAIL", targetNodeId: "d3", color: "#16a34a" },
            { id: "current", label: "CURRENT", targetNodeId: "d3", color: "#dc2626" }
          ],
          activeLineIndex: 1,
          message: "Starting from tail, we can traverse backward using prev pointers."
        }
      },
      {
        id: "doubly-6",
        type: "content",
        title: "Comparison & Use Cases",
        content: `**Memory Overhead:**
• Singly Linked List: 1 pointer per node
• Doubly Linked List: 2 pointers per node (50% more memory)

**Performance Comparison:**

| Operation | Singly LL | Doubly LL |
|-----------|-----------|-----------|
| **Forward Traversal** | O(n) | O(n) |
| **Backward Traversal** | Not Possible | O(n) |
| **Delete with Node Ref** | O(n) | O(1) |
| **Insert Before Node** | O(n) | O(1) |

**Common Use Cases:**
• **Browser History**: Forward/back navigation
• **Music Playlists**: Previous/next song functionality  
• **LRU Cache**: Move items between head and tail
• **Undo/Redo Operations**: Navigate through command history`
      }
    ]
  },
  {
    id: 4,
    title: "Circular Linked List",
    description: "Understanding circular linked lists and their unique properties",
    steps: [
      {
        id: "circular-1",
        type: "content",
        title: "Circular Linked List Concept",
        content: `A **Circular Linked List** is a variation where the last node points back to the first node (head) instead of pointing to null.

**Key Characteristics:**
• No null pointers (except for empty list)
• Can traverse infinitely in a loop
• Can be singly or doubly circular
• Often maintains a "tail" pointer for efficiency

**Important Considerations:**
• Must be careful to avoid infinite loops during traversal
• Insertion and deletion logic differs from regular lists
• Useful for round-robin algorithms and circular buffers`
      },
      {
        id: "circular-2",
        type: "visualization",
        title: "Circular Structure",
        visualization: {
          nodes: [
            { id: "c1", data: 10, next: "c2", x: 200, y: 100 },
            { id: "c2", data: 20, next: "c3", x: 350, y: 150 },
            { id: "c3", data: 30, next: "c4", x: 350, y: 300 },
            { id: "c4", data: 40, next: "c1", x: 200, y: 350, isActive: true }
          ],
          pointers: [
            { id: "head", label: "HEAD", targetNodeId: "c1", color: "#2563eb" },
            { id: "tail", label: "TAIL", targetNodeId: "c4", color: "#16a34a" }
          ],
          message: "The last node (40) points back to the first node (10), forming a circle."
        }
      },
      {
        id: "circular-mcq-1",
        type: "mcq",
        title: "Circular List Properties",
        mcq: {
          id: "q5",
          question: "In a circular linked list with only one node, the node's next pointer points to:",
          options: [
            { id: "a", text: "NULL", isCorrect: false },
            { id: "b", text: "Itself (the same node)", isCorrect: true },
            { id: "c", text: "Previous node", isCorrect: false },
            { id: "d", text: "Head pointer", isCorrect: false }
          ],
          explanation: "In a circular linked list with only one node, that node's next pointer points to itself, maintaining the circular property."
        }
      },
      {
        id: "circular-3",
        type: "visualization",
        title: "Traversal with Termination",
        code: [
          "function traverse(head):",
          "    if head == null: return",
          "    current = head",
          "    do:",
          "        print(current.data)",
          "        current = current.next",
          "    while current != head"
        ],
        visualization: {
          nodes: [
            { id: "c1", data: 10, next: "c2", x: 300, y: 100, isActive: true },
            { id: "c2", data: 20, next: "c3", x: 450, y: 200 },
            { id: "c3", data: 30, next: "c4", x: 300, y: 300 },
            { id: "c4", data: 40, next: "c1", x: 150, y: 200 }
          ],
          pointers: [
            { id: "head", label: "HEAD", targetNodeId: "c1", color: "#2563eb" },
            { id: "current", label: "CURRENT", targetNodeId: "c1", color: "#dc2626" }
          ],
          activeLineIndex: 3,
          message: "Using do-while loop to ensure we visit each node exactly once, stopping when we return to head."
        }
      },
      {
        id: "circular-4",
        type: "visualization",
        title: "Insertion at End",
        code: [
          "function insertAtEnd(tail, value):",
          "    newNode = create new Node(value)",
          "    if tail == null:",
          "        newNode.next = newNode",
          "        return newNode",
          "    newNode.next = tail.next",
          "    tail.next = newNode",
          "    return newNode  // new tail"
        ],
        visualization: {
          nodes: [
            { id: "c1", data: 10, next: "c2", x: 300, y: 100 },
            { id: "c2", data: 20, next: "c3", x: 450, y: 200 },
            { id: "c3", data: 30, next: "new", x: 300, y: 300 },
            { id: "new", data: 40, next: "c1", x: 150, y: 200, isTarget: true }
          ],
          pointers: [
            { id: "tail", label: "TAIL", targetNodeId: "new", color: "#16a34a" },
            { id: "newNode", label: "NEW", targetNodeId: "new", color: "#dc2626" }
          ],
          activeLineIndex: 6,
          message: "New node is inserted after current tail, and becomes the new tail."
        }
      },
      {
        id: "circular-5",
        type: "content",
        title: "Applications & Use Cases",
        content: `**Real-world Applications:**

**1. Round-Robin CPU Scheduling**
• OS allocates CPU time to processes in circular fashion
• Each process gets equal time slice
• After last process, returns to first process

**2. Multiplayer Games**
• Turn-based games where players take turns
• After last player's turn, returns to first player
• Examples: Board games, card games

**3. Circular Buffers**
• Fixed-size buffers that wrap around
• Used in data streaming, audio/video processing
• When buffer is full, new data overwrites oldest

**4. Music/Video Playlists**
• Continuous playback that loops back to beginning
• "Repeat All" functionality in media players

**5. Memory Management**
• Circular buffer allocation in embedded systems
• Cache replacement algorithms`
      }
    ]
  },
  {
    id: 5,
    title: "Advanced Problems",
    description: "Solving complex linked list problems with step-by-step visualizations",
    steps: [
      {
        id: "advanced-1",
        type: "content",
        title: "Problem Set Overview",
        content: `We'll tackle five important linked list problems:

**1. Reversing a Linked List**
• Iterative and recursive approaches
• Time: O(n), Space: O(1) iterative / O(n) recursive

**2. Detecting a Loop (Floyd's Algorithm)**
• Two-pointer technique (tortoise and hare)
• Time: O(n), Space: O(1)

**3. Finding Middle Element**
• Two-pointer approach for optimal solution
• Time: O(n), Space: O(1)

**4. Merging Two Sorted Lists**
• Maintaining sorted order while merging
• Time: O(m+n), Space: O(1)

**5. Checking for Palindrome**
• Using reversal and two-pointer technique
• Time: O(n), Space: O(1)

Each problem demonstrates important algorithmic patterns used in interviews.`
      },
      {
        id: "advanced-2",
        type: "visualization",
        title: "Problem 1: Reversing a Linked List",
        code: [
          "function reverse(head):",
          "    prev = null",
          "    current = head", 
          "    while current != null:",
          "        next = current.next",
          "        current.next = prev",
          "        prev = current",
          "        current = next",
          "    return prev"
        ],
        visualization: {
          nodes: [
            { id: "n1", data: 1, next: null, x: 100, y: 150, isActive: true },
            { id: "n2", data: 2, next: "n1", x: 250, y: 150 },
            { id: "n3", data: 3, next: "n2", x: 400, y: 150 }
          ],
          pointers: [
            { id: "prev", label: "PREV", targetNodeId: "n1", color: "#16a34a" },
            { id: "current", label: "CURRENT", targetNodeId: "n2", color: "#dc2626" },
            { id: "next", label: "NEXT", targetNodeId: "n3", color: "#d97706" }
          ],
          activeLineIndex: 5,
          message: "Reversing pointers step by step. Current node now points to previous node."
        }
      },
      {
        id: "advanced-mcq-1",
        type: "mcq",
        title: "Reversal Algorithm",
        mcq: {
          id: "q6",
          question: "In iterative reversal of a linked list, which pointer is updated first inside the loop?",
          options: [
            { id: "a", text: "prev", isCorrect: false },
            { id: "b", text: "next", isCorrect: true },
            { id: "c", text: "current", isCorrect: false },
            { id: "d", text: "head", isCorrect: false }
          ],
          explanation: "We must store current.next in the 'next' pointer first, before we lose the reference by changing current.next to prev."
        }
      },
      {
        id: "advanced-3",
        type: "visualization",
        title: "Problem 2: Loop Detection (Floyd's Algorithm)",
        code: [
          "function hasCycle(head):",
          "    slow = head",
          "    fast = head",
          "    while fast != null and fast.next != null:",
          "        slow = slow.next",
          "        fast = fast.next.next",
          "        if slow == fast:",
          "            return true",
          "    return false"
        ],
        visualization: {
          nodes: [
            { id: "n1", data: 1, next: "n2", x: 150, y: 100 },
            { id: "n2", data: 2, next: "n3", x: 300, y: 100 },
            { id: "n3", data: 3, next: "n4", x: 450, y: 100 },
            { id: "n4", data: 4, next: "n5", x: 450, y: 250 },
            { id: "n5", data: 5, next: "n2", x: 300, y: 250, isActive: true }
          ],
          pointers: [
            { id: "slow", label: "SLOW", targetNodeId: "n3", color: "#16a34a" },
            { id: "fast", label: "FAST", targetNodeId: "n5", color: "#dc2626" }
          ],
          activeLineIndex: 6,
          message: "Slow pointer moves 1 step, fast pointer moves 2 steps. They will meet if there's a cycle."
        }
      },
      {
        id: "advanced-4",
        type: "visualization",
        title: "Problem 3: Finding Middle Element",
        code: [
          "function findMiddle(head):",
          "    slow = head",
          "    fast = head",
          "    while fast != null and fast.next != null:",
          "        slow = slow.next",
          "        fast = fast.next.next",
          "    return slow"
        ],
        visualization: {
          nodes: [
            { id: "n1", data: 1, next: "n2", x: 100, y: 150 },
            { id: "n2", data: 2, next: "n3", x: 200, y: 150 },
            { id: "n3", data: 3, next: "n4", x: 300, y: 150, isActive: true },
            { id: "n4", data: 4, next: "n5", x: 400, y: 150 },
            { id: "n5", data: 5, next: null, x: 500, y: 150 }
          ],
          pointers: [
            { id: "slow", label: "SLOW", targetNodeId: "n3", color: "#16a34a" },
            { id: "fast", label: "FAST", targetNodeId: "n5", color: "#dc2626" }
          ],
          activeLineIndex: 5,
          message: "When fast pointer reaches end, slow pointer is at the middle."
        }
      },
      {
        id: "advanced-mcq-2",
        type: "mcq",
        title: "Two-Pointer Technique",
        mcq: {
          id: "q7",
          question: "Why does the two-pointer technique work for finding the middle element?",
          options: [
            { id: "a", text: "Fast pointer is twice as fast as slow pointer", isCorrect: true },
            { id: "b", text: "Slow pointer counts the nodes", isCorrect: false },
            { id: "c", text: "Fast pointer finds the end first", isCorrect: false },
            { id: "d", text: "It's just a coincidence", isCorrect: false }
          ],
          explanation: "Since the fast pointer moves twice as fast, when it reaches the end (traveling distance n), the slow pointer has traveled distance n/2, which is the middle."
        }
      },
      {
        id: "advanced-5",
        type: "visualization",
        title: "Problem 4: Merging Two Sorted Lists",
        code: [
          "function merge(list1, list2):",
          "    dummy = new Node(0)",
          "    current = dummy",
          "    while list1 != null and list2 != null:",
          "        if list1.data <= list2.data:",
          "            current.next = list1",
          "            list1 = list1.next",
          "        else:",
          "            current.next = list2",
          "            list2 = list2.next",
          "        current = current.next",
          "    return dummy.next"
        ],
        visualization: {
          nodes: [
            { id: "l1n1", data: 1, next: "l1n2", x: 100, y: 80 },
            { id: "l1n2", data: 3, next: null, x: 200, y: 80 },
            
            { id: "l2n1", data: 2, next: "l2n2", x: 100, y: 180, isActive: true },
            { id: "l2n2", data: 4, next: null, x: 200, y: 180 },
            
            { id: "dummy", data: 0, next: "m1", x: 350, y: 130 },
            { id: "m1", data: 1, next: "m2", x: 450, y: 130 },
            { id: "m2", data: 2, next: null, x: 550, y: 130, isTarget: true }
          ],
          pointers: [
            { id: "list1", label: "L1", targetNodeId: "l1n2", color: "#2563eb" },
            { id: "list2", label: "L2", targetNodeId: "l2n1", color: "#16a34a" },
            { id: "current", label: "CURR", targetNodeId: "m2", color: "#dc2626" }
          ],
          activeLineIndex: 8,
          message: "Comparing 2 and 3. Since 2 ≤ 3, we add node 2 to the merged list."
        }
      },
      {
        id: "advanced-6",
        type: "content",
        title: "Problem 5: Palindrome Check Strategy",
        content: `**Approach to check if a linked list is a palindrome:**

**Step 1: Find the Middle**
• Use two-pointer technique (slow/fast pointers)
• Slow pointer will be at middle when fast reaches end

**Step 2: Reverse Second Half**  
• Reverse the second half of the linked list
• Keep reference to the start of reversed half

**Step 3: Compare Both Halves**
• Compare nodes from start and from reversed second half
• If all nodes match, it's a palindrome

**Step 4: Restore Original (Optional)**
• Reverse the second half back to original state
• This maintains the original list structure

**Time Complexity: O(n)**
**Space Complexity: O(1)**

This approach is more efficient than using extra space to store values for comparison.`
      }
    ]
  },
  {
    id: 6,
    title: "Complexity & Tradeoffs",
    description: "Analyzing performance characteristics and practical considerations",
    steps: [
      {
        id: "complexity-1",
        type: "content",
        title: "Time Complexity Comparison",
        content: `**Comprehensive Operation Analysis:**

| Operation | Array | Singly LL | Doubly LL | Circular LL |
|-----------|-------|-----------|-----------|-------------|
| **Access by Index** | O(1) | O(n) | O(n) | O(n) |
| **Search Element** | O(n) | O(n) | O(n) | O(n) |
| **Insert at Beginning** | O(n) | O(1) | O(1) | O(1) |
| **Insert at End** | O(1)* | O(n) | O(1)** | O(1)** |
| **Insert at Position** | O(n) | O(n) | O(n) | O(n) |
| **Delete at Beginning** | O(n) | O(1) | O(1) | O(1) |
| **Delete at End** | O(1) | O(n) | O(1)** | O(1)** |
| **Delete by Value** | O(n) | O(n) | O(n) | O(n) |

*Amortized for dynamic arrays  
**With tail pointer maintained`
      },
      {
        id: "complexity-2",
        type: "content",
        title: "Space Complexity Analysis",
        content: `**Memory Overhead Comparison:**

**Arrays:**
• Data storage only: n × size_of(data_type)
• No pointer overhead
• Contiguous memory allocation

**Singly Linked List:**
• Data + Next pointer: n × (size_of(data) + size_of(pointer))
• Typical overhead: 4-8 bytes per node (32/64-bit systems)
• Scattered memory allocation

**Doubly Linked List:**
• Data + Next + Prev pointers: n × (size_of(data) + 2×size_of(pointer))  
• Double the pointer overhead of singly linked list
• Most memory-intensive option

**Example (32-bit system, integer data):**
• Array: 1000 integers = 4KB
• Singly LL: 1000 nodes = 8KB (100% overhead)
• Doubly LL: 1000 nodes = 12KB (200% overhead)`
      },
      {
        id: "complexity-mcq-1",
        type: "mcq",
        title: "Performance Understanding",
        mcq: {
          id: "q8",
          question: "Which of the following operations is O(1) in both arrays and linked lists?",
          options: [
            { id: "a", text: "Insertion at the beginning", isCorrect: false },
            { id: "b", text: "Accessing k-th element", isCorrect: false },
            { id: "c", text: "Deletion at arbitrary position", isCorrect: false },
            { id: "d", text: "None of the above", isCorrect: true }
          ],
          explanation: "Arrays have O(n) insertion at beginning, linked lists have O(n) access by index. No operation is O(1) in both data structures for all cases."
        }
      },
      {
        id: "complexity-3",
        type: "content",
        title: "Cache Performance & Memory Locality",
        content: `**Cache Behavior Analysis:**

**Arrays (Better Cache Performance):**
✅ **Sequential Access Pattern**
• Elements stored contiguously in memory
• CPU prefetcher loads nearby elements automatically
• High cache hit ratio for linear traversals

✅ **Spatial Locality**
• Accessing arr[i] brings arr[i+1], arr[i+2] into cache
• Reduces memory access latency significantly

**Linked Lists (Poor Cache Performance):**
❌ **Random Memory Access Pattern**
• Nodes scattered throughout memory
• Each node access may result in cache miss
• CPU cannot effectively prefetch next elements

❌ **Poor Spatial Locality**  
• Following a pointer jumps to arbitrary memory location
• No guarantee that next node is in cache

**Impact on Real Performance:**
• Arrays can be 2-10x faster for traversal despite same O(n) complexity
• Modern CPUs heavily optimized for sequential access patterns`
      },
      {
        id: "complexity-4",
        type: "content",
        title: "When to Choose Each Data Structure",
        content: `**Choose Arrays When:**
✅ Random access to elements is frequent
✅ Cache performance is critical  
✅ Memory usage must be minimized
✅ Mathematical computations on datasets
✅ Fixed or predictable size requirements

**Example Use Cases:**
• Image/signal processing
• Mathematical algorithms
• Gaming (position arrays, physics)
• Financial calculations

**Choose Linked Lists When:**
✅ Frequent insertions/deletions at beginning
✅ Size varies significantly during runtime
✅ Memory allocation must be dynamic
✅ Implementing other data structures (stacks, queues)

**Example Use Cases:**
• Undo/redo functionality
• Music playlists with add/remove
• Browser history
• Dynamic memory allocation systems`
      },
      {
        id: "complexity-5",
        type: "content",
        title: "Hybrid Approaches & Optimizations",
        content: `**Advanced Optimization Techniques:**

**1. Deque (Double-ended Queue)**
• Combines benefits of arrays and linked lists
• Dynamic array with efficient insertion/deletion at both ends
• Examples: std::deque in C++, collections.deque in Python

**2. Chunked Linked Lists**
• Each node contains a small array of elements
• Reduces pointer overhead while maintaining flexibility
• Better cache performance than pure linked lists

**3. Skip Lists**
• Probabilistic data structure
• Multiple levels of linked lists for faster search
• O(log n) search time instead of O(n)

**4. Unrolled Linked Lists**
• Each node stores multiple elements in an array
• Balances cache performance with dynamic sizing
• Used in some database implementations

**Memory Pool Allocation:**
• Pre-allocate chunks of memory for nodes
• Reduces memory fragmentation
• Improves allocation/deallocation performance`
      },
      {
        id: "complexity-mcq-2",
        type: "mcq",
        title: "Practical Considerations",
        mcq: {
          id: "q9",
          question: "In which scenario would a linked list likely outperform an array in practice?",
          options: [
            { id: "a", text: "Frequent random access to elements", isCorrect: false },
            { id: "b", text: "Large dataset with sequential processing", isCorrect: false },
            { id: "c", text: "Frequent insertion/deletion at the beginning with unknown size", isCorrect: true },
            { id: "d", text: "Mathematical computations requiring indexing", isCorrect: false }
          ],
          explanation: "Linked lists excel when you need frequent insertions/deletions at the beginning and the size is unpredictable, as arrays require O(n) shifting operations."
        }
      },
      {
        id: "complexity-6",
        type: "content",
        title: "Summary & Best Practices",
        content: `**Key Takeaways:**

**Performance Hierarchy:**
1. **Arrays**: Best for random access, mathematical operations
2. **Dynamic Arrays**: Good middle ground for most applications  
3. **Doubly Linked Lists**: Best for bidirectional navigation
4. **Singly Linked Lists**: Best for memory-constrained environments

**Decision Framework:**
Ask yourself:
• How often do I need random access vs sequential access?
• Are insertions/deletions more frequent than reads?
• Is memory usage a critical constraint?
• Do I need bidirectional traversal?

**Modern Recommendations:**
• **Default choice**: Dynamic arrays (std::vector, ArrayList)
• **Specialized needs**: Choose linked lists for specific requirements
• **High performance**: Consider hybrid data structures
• **Embedded systems**: Carefully analyze memory overhead

**Interview Tip:**
Always discuss tradeoffs! Mention cache performance, memory overhead, and specific use cases when explaining your choice of data structure.`
      }
    ]
  }
];