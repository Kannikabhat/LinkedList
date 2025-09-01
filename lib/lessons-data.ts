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
  chatbot?: {
    question: string;
    hint?: string;
    context?: string;
  }[];
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

- Fixed size – once declared, size cannot be changed
- Memory waste – allocated memory might not be fully utilized
- Costly insertions/deletions – requires shifting elements
- Contiguous memory requirement – large blocks might not be available

**Linked List Advantages:**

- Dynamic size – grows and shrinks during runtime
- Efficient insertions/deletions – O(1) at known positions
- Memory-efficient – allocates exactly what's needed
- Flexible memory allocation – nodes can be scattered in memory`
      },
      {
        id: "intro-2",
        type: "content",
        title: "What is a Linked List?",
        content: `A **Linked List** is a linear data structure where elements (called nodes) are stored in sequence, but not in contiguous memory locations.

**Key Components:**

- **Node**: Contains data and a reference (pointer) to the next node  
- **Head**: Pointer to the first node in the list  
- **Null**: Last node points to null, indicating end of list


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
|---------|-------|-------------|
| **Memory** | Contiguous | Non-contiguous |
| **Size** | Fixed | Dynamic |
| **Access Time** | O(1) random access | O(n) sequential access |
| **Insertion/Deletion** | O(n) (shifting required) | O(1) at known position |
| **Memory Overhead** | None | Extra pointer storage |
| **Cache Performance** | Better (locality) | Poor (scattered nodes) |
| **Memory Allocation** | Compile time | Runtime |`,
      },

      {
        id: "intro-5",
        type: "content",
        title: "Types of Linked Lists",
        content: `**1. Singly Linked List**

- Each node has one pointer to the next node
- Traversal is only possible in one direction (forward)
- Most basic and commonly used type

**2. Doubly Linked List**

- Each node has two pointers: next and previous
- Traversal is possible in both directions
- Requires more memory but offers more flexibility

**3. Circular Linked List**

- Last node points back to the first node (or head)
- Can be singly or doubly linked
- Useful for round-robin scheduling and circular buffers`,

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
        },
        executionSteps: [
          {
            lineIndex: 0,
            nodes: [
              { id: "n1", data: 5, next: "n2", x: 200, y: 150 },
              { id: "n2", data: 10, next: "n3", x: 350, y: 150 },
              { id: "n3", data: 15, next: null, x: 500, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" }
            ],
            message: "Starting with existing list. Need to insert value 3 at beginning."
          },
          {
            lineIndex: 1,
            nodes: [
              { id: "new", data: 3, next: null, x: 50, y: 100, isTarget: true },
              { id: "n1", data: 5, next: "n2", x: 200, y: 150 },
              { id: "n2", data: 10, next: "n3", x: 350, y: 150 },
              { id: "n3", data: 15, next: null, x: 500, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "newNode", label: "NEW", targetNodeId: "new", color: "#16a34a" }
            ],
            message: "Create new node with value 3",
            action: "insert"
          },
          {
            lineIndex: 2,
            nodes: [
              { id: "new", data: 3, next: "n1", x: 50, y: 100, isTarget: true },
              { id: "n1", data: 5, next: "n2", x: 200, y: 150 },
              { id: "n2", data: 10, next: "n3", x: 350, y: 150 },
              { id: "n3", data: 15, next: null, x: 500, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "newNode", label: "NEW", targetNodeId: "new", color: "#16a34a" }
            ],
            message: "Set newNode.next = head (linking new node to current first node)",
            action: "assign"
          },
          {
            lineIndex: 3,
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
            message: "Update head = newNode (new node becomes the first node)",
            action: "assign"
          },
          {
            lineIndex: 4,
            nodes: [
              { id: "new", data: 3, next: "n1", x: 50, y: 100 },
              { id: "n1", data: 5, next: "n2", x: 200, y: 150 },
              { id: "n2", data: 10, next: "n3", x: 350, y: 150 },
              { id: "n3", data: 15, next: null, x: 500, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "new", color: "#2563eb" }
            ],
            message: "Return new head. Insertion at beginning complete!"
          }
        ]

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
            message: "Starting with existing list. Need to insert value 25 at end."
          },
          {
            lineIndex: 1,
            nodes: [
              { id: "n1", data: 5, next: "n2", x: 100, y: 150 },
              { id: "n2", data: 10, next: "n3", x: 250, y: 150 },
              { id: "n3", data: 15, next: null, x: 400, y: 150 },
              { id: "new", data: 25, next: null, x: 550, y: 150, isTarget: true }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "newNode", label: "NEW", targetNodeId: "new", color: "#16a34a" }
            ],
            message: "Create new node with value 25",
            action: "insert"
          },
          {
            lineIndex: 2,
            nodes: [
              { id: "n1", data: 5, next: "n2", x: 100, y: 150 },
              { id: "n2", data: 10, next: "n3", x: 250, y: 150 },
              { id: "n3", data: 15, next: null, x: 400, y: 150 },
              { id: "new", data: 25, next: null, x: 550, y: 150, isTarget: true }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "newNode", label: "NEW", targetNodeId: "new", color: "#16a34a" }
            ],
            message: "Check if head == null (false, list is not empty)",
            condition: false,
            action: "check"
          },
          {
            lineIndex: 4,
            nodes: [
              { id: "n1", data: 5, next: "n2", x: 100, y: 150, isActive: true },
              { id: "n2", data: 10, next: "n3", x: 250, y: 150 },
              { id: "n3", data: 15, next: null, x: 400, y: 150 },
              { id: "new", data: 25, next: null, x: 550, y: 150, isTarget: true }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "current", label: "CURRENT", targetNodeId: "n1", color: "#dc2626" },
              { id: "newNode", label: "NEW", targetNodeId: "new", color: "#16a34a" }
            ],
            message: "Set current = head to start traversal",
            action: "assign"
          },
          {
            lineIndex: 5,
            nodes: [
              { id: "n1", data: 5, next: "n2", x: 100, y: 150, isActive: true },
              { id: "n2", data: 10, next: "n3", x: 250, y: 150 },
              { id: "n3", data: 15, next: null, x: 400, y: 150 },
              { id: "new", data: 25, next: null, x: 550, y: 150, isTarget: true }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "current", label: "CURRENT", targetNodeId: "n1", color: "#dc2626" },
              { id: "newNode", label: "NEW", targetNodeId: "new", color: "#16a34a" }
            ],
            message: "Check current.next != null (true, n1.next = n2)",
            condition: true,
            action: "check"
          },
          {
            lineIndex: 6,
            nodes: [
              { id: "n1", data: 5, next: "n2", x: 100, y: 150 },
              { id: "n2", data: 10, next: "n3", x: 250, y: 150, isActive: true },
              { id: "n3", data: 15, next: null, x: 400, y: 150 },
              { id: "new", data: 25, next: null, x: 550, y: 150, isTarget: true }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "current", label: "CURRENT", targetNodeId: "n2", color: "#dc2626" },
              { id: "newNode", label: "NEW", targetNodeId: "new", color: "#16a34a" }
            ],
            message: "Move current to next node",
            action: "traverse"
          },
          {
            lineIndex: 5,
            nodes: [
              { id: "n1", data: 5, next: "n2", x: 100, y: 150 },
              { id: "n2", data: 10, next: "n3", x: 250, y: 150, isActive: true },
              { id: "n3", data: 15, next: null, x: 400, y: 150 },
              { id: "new", data: 25, next: null, x: 550, y: 150, isTarget: true }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "current", label: "CURRENT", targetNodeId: "n2", color: "#dc2626" },
              { id: "newNode", label: "NEW", targetNodeId: "new", color: "#16a34a" }
            ],
            message: "Check current.next != null (true, n2.next = n3)",
            condition: true,
            action: "check"
          },
          {
            lineIndex: 6,
            nodes: [
              { id: "n1", data: 5, next: "n2", x: 100, y: 150 },
              { id: "n2", data: 10, next: "n3", x: 250, y: 150 },
              { id: "n3", data: 15, next: null, x: 400, y: 150, isActive: true },
              { id: "new", data: 25, next: null, x: 550, y: 150, isTarget: true }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "current", label: "CURRENT", targetNodeId: "n3", color: "#dc2626" },
              { id: "newNode", label: "NEW", targetNodeId: "new", color: "#16a34a" }
            ],
            message: "Move current to next node",
            action: "traverse"
          },
          {
            lineIndex: 5,
            nodes: [
              { id: "n1", data: 5, next: "n2", x: 100, y: 150 },
              { id: "n2", data: 10, next: "n3", x: 250, y: 150 },
              { id: "n3", data: 15, next: null, x: 400, y: 150, isActive: true },
              { id: "new", data: 25, next: null, x: 550, y: 150, isTarget: true }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "current", label: "CURRENT", targetNodeId: "n3", color: "#dc2626" },
              { id: "newNode", label: "NEW", targetNodeId: "new", color: "#16a34a" }
            ],
            message: "Check current.next != null (false, n3.next = null)",
            condition: false,
            action: "check"
          },
          {
            lineIndex: 7,
            nodes: [
              { id: "n1", data: 5, next: "n2", x: 100, y: 150 },
              { id: "n2", data: 10, next: "n3", x: 250, y: 150 },
              { id: "n3", data: 15, next: "new", x: 400, y: 150, isActive: true },
              { id: "new", data: 25, next: null, x: 550, y: 150, isTarget: true }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "current", label: "CURRENT", targetNodeId: "n3", color: "#dc2626" },
              { id: "newNode", label: "NEW", targetNodeId: "new", color: "#16a34a" }
            ],
            message: "Set current.next = newNode (link last node to new node)",
            action: "assign"
          },
          {
            lineIndex: 8,
            nodes: [
              { id: "n1", data: 5, next: "n2", x: 100, y: 150 },
              { id: "n2", data: 10, next: "n3", x: 250, y: 150 },
              { id: "n3", data: 15, next: "new", x: 400, y: 150 },
              { id: "new", data: 25, next: null, x: 550, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" }
            ],
            message: "Return head. Insertion at end complete!"
          }
        ]
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
            message: "Starting deletion of value 10 from the list"
          },
          {
            lineIndex: 1,
            nodes: [
              { id: "n1", data: 5, next: "n2", x: 100, y: 150 },
              { id: "n2", data: 10, next: "n3", x: 250, y: 150 },
              { id: "n3", data: 15, next: null, x: 400, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" }
            ],
            message: "Check if head.data == value (5 == 10? false)",
            condition: false,
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
            message: "Set current = head to start traversal",
            action: "assign"
          },
          {
            lineIndex: 4,
            nodes: [
              { id: "n1", data: 5, next: "n2", x: 100, y: 150, isActive: true },
              { id: "n2", data: 10, next: "n3", x: 250, y: 150 },
              { id: "n3", data: 15, next: null, x: 400, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "current", label: "CURRENT", targetNodeId: "n1", color: "#dc2626" }
            ],
            message: "Check current.next != null (true, n1.next = n2)",
            condition: true,
            action: "check"
          },
          {
            lineIndex: 5,
            nodes: [
              { id: "n1", data: 5, next: "n2", x: 100, y: 150, isActive: true },
              { id: "n2", data: 10, next: "n3", x: 250, y: 150, isTarget: true },
              { id: "n3", data: 15, next: null, x: 400, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "current", label: "CURRENT", targetNodeId: "n1", color: "#dc2626" }
            ],
            message: "Check current.next.data == value (10 == 10? true)",
            condition: true,
            action: "check"
          },
          {
            lineIndex: 6,
            nodes: [
              { id: "n1", data: 5, next: "n3", x: 100, y: 150, isActive: true },
              { id: "n2", data: 10, next: "n3", x: 250, y: 100, isTarget: true },
              { id: "n3", data: 15, next: null, x: 400, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "current", label: "CURRENT", targetNodeId: "n1", color: "#dc2626" }
            ],
            message: "Set current.next = current.next.next (bypass node to delete)",
            action: "delete"
          },
          {
            lineIndex: 7,
            nodes: [
              { id: "n1", data: 5, next: "n3", x: 100, y: 150 },
              { id: "n3", data: 15, next: null, x: 400, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" }
            ],
            message: "Return head. Node with value 10 successfully deleted!"
          }
        ]
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
        id: "doubly-scenario-1",
        type: "content",
        title: "🟢 Scenario 1 – Photo Viewer App 🖼️",
        content: `You are building a photo viewer application where the user can press Next to see the next photo or Previous to go back to the earlier photo.

**Question to User:**
How would you design this system so that the user can move efficiently in both directions?

**Think about:**
- How would you connect photos in a data structure?
- What happens when you need to move in both directions?
- What type of linked list allows bidirectional movement?`,
        chatbot: [
          {
            question: "How would you design this system so that the user can move efficiently in both directions?",
            context: "You are building a photo viewer application where the user can press Next to see the next photo or Previous to go back to the earlier photo. Think about connecting photos like in a linked list. In a normal linked list, you can only go one way (forward). But here, you need to move in both directions. What linked list allows that?",
            hint: "Think about connecting photos like in a linked list. In a normal linked list, you can only go one way (forward). But here, you need to move in both directions. What linked list allows that?"
          }
        ]
      },
      {
        id: "doubly-scenario-2",
        type: "content",
        title: "🟢 Scenario 2 – Web Browser Navigation 🌐",
        content: `A web browser lets you go Back to the previous page and then Forward again to the next page.

**Question to User:**
If you were designing the browsing history, how would you store the pages so that Back and Forward are efficient?

**Think about:**
- How would you connect pages in a data structure?
- With a singly linked list, you could only move forward
- Here you need both Back and Forward movement`,
        chatbot: [
          {
            question: "If you were designing the browsing history, how would you store the pages so that Back and Forward are efficient?",
            context: "A web browser lets you go Back to the previous page and then Forward again to the next page. Think about pages being connected like nodes. With a singly linked list, you could only move forward. Here you need both Back and Forward movement.",
            hint: "Think about pages being connected like nodes. With a singly linked list, you could only move forward. Here you need both Back and Forward movement."
          }
        ]
      },
      {
        id: "doubly-scenario-3",
        type: "content",
        title: "🟢 Scenario 3 – Text Editor Cursor ✏️",
        content: `In a text editor, the cursor can move both left and right across the text.

**Question to User:**
How would you design the text storage so that the cursor can move efficiently in both directions?

**Think about:**
- Imagine each character stored in a linked structure
- A singly linked list lets you move only right (forward)
- What structure lets the cursor move both left and right?`,
        chatbot: [
          {
            question: "How would you design the text storage so that the cursor can move efficiently in both directions?",
            context: "In a text editor, the cursor can move both left and right across the text. Imagine each character stored in a linked structure. A singly linked list lets you move only right (forward). What structure lets the cursor move both left and right?",
            hint: "Imagine each character stored in a linked structure. A singly linked list lets you move only right (forward). What structure lets the cursor move both left and right?"
          }
        ]
      },
      {
        id: "doubly-scenario-4",
        type: "content",
        title: "🟢 Scenario 4 – Undo & Redo 🔄",
        content: `In a drawing app, the user can Undo the last action and then also Redo it if needed.

**Question to User:**
How would you design the action history so that Undo and Redo are both possible?

**Think about:**
- Think of actions stored like a sequence of nodes
- Undo means going one step back, Redo means going one step forward
- What linked list allows both directions easily?`,
        chatbot: [
          {
            question: "How would you design the action history so that Undo and Redo are both possible?",
            context: "In a drawing app, the user can Undo the last action and then also Redo it if needed. Think of actions stored like a sequence of nodes. Undo means going one step back, Redo means going one step forward. What linked list allows both directions easily?",
            hint: "Think of actions stored like a sequence of nodes. Undo means going one step back, Redo means going one step forward. What linked list allows both directions easily?"
          }
        ]
      },
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
        },
        executionSteps: [
          {
            lineIndex: 0,
            nodes: [
              { id: "d1", data: 10, next: "d2", prev: null, x: 200, y: 150 },
              { id: "d2", data: 20, next: "d3", prev: "d1", x: 350, y: 150 },
              { id: "d3", data: 30, next: null, prev: "d2", x: 500, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "d1", color: "#2563eb" }
            ],
            message: "Starting with existing doubly linked list. Insert value 5 at beginning."
          },
          {
            lineIndex: 1,
            nodes: [
              { id: "new", data: 5, next: null, prev: null, x: 50, y: 100, isTarget: true },
              { id: "d1", data: 10, next: "d2", prev: null, x: 200, y: 150 },
              { id: "d2", data: 20, next: "d3", prev: "d1", x: 350, y: 150 },
              { id: "d3", data: 30, next: null, prev: "d2", x: 500, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "d1", color: "#2563eb" },
              { id: "newNode", label: "NEW", targetNodeId: "new", color: "#16a34a" }
            ],
            message: "Create new doubly linked node with value 5",
            action: "insert"
          },
          {
            lineIndex: 2,
            nodes: [
              { id: "new", data: 5, next: "d1", prev: null, x: 50, y: 100, isTarget: true },
              { id: "d1", data: 10, next: "d2", prev: null, x: 200, y: 150 },
              { id: "d2", data: 20, next: "d3", prev: "d1", x: 350, y: 150 },
              { id: "d3", data: 30, next: null, prev: "d2", x: 500, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "d1", color: "#2563eb" },
              { id: "newNode", label: "NEW", targetNodeId: "new", color: "#16a34a" }
            ],
            message: "Set newNode.next = head (link new node forward)",
            action: "assign"
          },
          {
            lineIndex: 3,
            nodes: [
              { id: "new", data: 5, next: "d1", prev: null, x: 50, y: 100, isTarget: true },
              { id: "d1", data: 10, next: "d2", prev: null, x: 200, y: 150 },
              { id: "d2", data: 20, next: "d3", prev: "d1", x: 350, y: 150 },
              { id: "d3", data: 30, next: null, prev: "d2", x: 500, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "d1", color: "#2563eb" },
              { id: "newNode", label: "NEW", targetNodeId: "new", color: "#16a34a" }
            ],
            message: "Check if head != null (true, list is not empty)",
            condition: true,
            action: "check"
          },
          {
            lineIndex: 4,
            nodes: [
              { id: "new", data: 5, next: "d1", prev: null, x: 50, y: 100, isTarget: true },
              { id: "d1", data: 10, next: "d2", prev: "new", x: 200, y: 150 },
              { id: "d2", data: 20, next: "d3", prev: "d1", x: 350, y: 150 },
              { id: "d3", data: 30, next: null, prev: "d2", x: 500, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "d1", color: "#2563eb" },
              { id: "newNode", label: "NEW", targetNodeId: "new", color: "#16a34a" }
            ],
            message: "Set head.prev = newNode (link current head backward to new node)",
            action: "assign"
          },
          {
            lineIndex: 5,
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
            message: "Update head = newNode (new node becomes the first node)",
            action: "assign"
          },
          {
            lineIndex: 6,
            nodes: [
              { id: "new", data: 5, next: "d1", prev: null, x: 50, y: 100 },
              { id: "d1", data: 10, next: "d2", prev: "new", x: 200, y: 150 },
              { id: "d2", data: 20, next: "d3", prev: "d1", x: 350, y: 150 },
              { id: "d3", data: 30, next: null, prev: "d2", x: 500, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "new", color: "#2563eb" }
            ],
            message: "Return new head. Doubly linked list insertion at beginning complete!"
          }
        ]
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
        },
        executionSteps: [
          {
            lineIndex: 0,
            nodes: [
              { id: "d1", data: 10, next: "d2", prev: null, x: 100, y: 150 },
              { id: "d2", data: 20, next: "d3", prev: "d1", x: 300, y: 150, isTarget: true },
              { id: "d3", data: 30, next: null, prev: "d2", x: 500, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "d1", color: "#2563eb" },
              { id: "nodeToDelete", label: "DELETE", targetNodeId: "d2", color: "#dc2626" }
            ],
            message: "Starting deletion of node with value 20 (middle node)"
          },
          {
            lineIndex: 1,
            nodes: [
              { id: "d1", data: 10, next: "d2", prev: null, x: 100, y: 150 },
              { id: "d2", data: 20, next: "d3", prev: "d1", x: 300, y: 150, isTarget: true },
              { id: "d3", data: 30, next: null, prev: "d2", x: 500, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "d1", color: "#2563eb" },
              { id: "nodeToDelete", label: "DELETE", targetNodeId: "d2", color: "#dc2626" }
            ],
            message: "Check if nodeToDelete.prev != null (true, has previous node)",
            condition: true,
            action: "check"
          },
          {
            lineIndex: 2,
            nodes: [
              { id: "d1", data: 10, next: "d3", prev: null, x: 100, y: 150 },
              { id: "d2", data: 20, next: "d3", prev: "d1", x: 300, y: 100, isTarget: true },
              { id: "d3", data: 30, next: null, prev: "d2", x: 500, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "d1", color: "#2563eb" },
              { id: "nodeToDelete", label: "DELETE", targetNodeId: "d2", color: "#dc2626" }
            ],
            message: "Set nodeToDelete.prev.next = nodeToDelete.next (link previous to next)",
            action: "assign"
          },
          {
            lineIndex: 3,
            nodes: [
              { id: "d1", data: 10, next: "d3", prev: null, x: 100, y: 150 },
              { id: "d2", data: 20, next: "d3", prev: "d1", x: 300, y: 100, isTarget: true },
              { id: "d3", data: 30, next: null, prev: "d2", x: 500, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "d1", color: "#2563eb" },
              { id: "nodeToDelete", label: "DELETE", targetNodeId: "d2", color: "#dc2626" }
            ],
            message: "Check if nodeToDelete.next != null (true, has next node)",
            condition: true,
            action: "check"
          },
          {
            lineIndex: 4,
            nodes: [
              { id: "d1", data: 10, next: "d3", prev: null, x: 100, y: 150 },
              { id: "d2", data: 20, next: null, prev: null, x: 300, y: 100, isTarget: true },
              { id: "d3", data: 30, next: null, prev: "d1", x: 500, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "d1", color: "#2563eb" },
              { id: "nodeToDelete", label: "DELETE", targetNodeId: "d2", color: "#dc2626" }
            ],
            message: "Set nodeToDelete.next.prev = nodeToDelete.prev (link next to previous)",
            action: "assign"
          },
          {
            lineIndex: 6,
            nodes: [
              { id: "d1", data: 10, next: "d3", prev: null, x: 100, y: 150 },
              { id: "d2", data: 20, next: null, prev: null, x: 300, y: 100, isTarget: true },
              { id: "d3", data: 30, next: null, prev: "d1", x: 500, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "d1", color: "#2563eb" },
              { id: "nodeToDelete", label: "DELETE", targetNodeId: "d2", color: "#dc2626" }
            ],
            message: "Check if nodeToDelete == head (false, not deleting head)",
            condition: false,
            action: "check"
          },
          {
            lineIndex: 7,
            nodes: [
              { id: "d1", data: 10, next: "d3", prev: null, x: 100, y: 150 },
              { id: "d3", data: 30, next: null, prev: "d1", x: 500, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "d1", color: "#2563eb" }
            ],
            message: "Node deletion complete! Node 20 removed from doubly linked list.",
            action: "delete"
          }
        ]
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
        },
        executionSteps: [
          {
            lineIndex: 0,
            nodes: [
              { id: "d1", data: 10, next: "d2", prev: null, x: 100, y: 150 },
              { id: "d2", data: 20, next: "d3", prev: "d1", x: 300, y: 150 },
              { id: "d3", data: 30, next: null, prev: "d2", x: 500, y: 150 }
            ],
            pointers: [
              { id: "tail", label: "TAIL", targetNodeId: "d3", color: "#16a34a" }
            ],
            message: "Starting backward traversal from tail"
          },
          {
            lineIndex: 1,
            nodes: [
              { id: "d1", data: 10, next: "d2", prev: null, x: 100, y: 150 },
              { id: "d2", data: 20, next: "d3", prev: "d1", x: 300, y: 150 },
              { id: "d3", data: 30, next: null, prev: "d2", x: 500, y: 150, isActive: true }
            ],
            pointers: [
              { id: "tail", label: "TAIL", targetNodeId: "d3", color: "#16a34a" },
              { id: "current", label: "CURRENT", targetNodeId: "d3", color: "#dc2626" }
            ],
            message: "Set current = tail",
            action: "assign"
          },
          {
            lineIndex: 2,
            nodes: [
              { id: "d1", data: 10, next: "d2", prev: null, x: 100, y: 150 },
              { id: "d2", data: 20, next: "d3", prev: "d1", x: 300, y: 150 },
              { id: "d3", data: 30, next: null, prev: "d2", x: 500, y: 150, isActive: true }
            ],
            pointers: [
              { id: "tail", label: "TAIL", targetNodeId: "d3", color: "#16a34a" },
              { id: "current", label: "CURRENT", targetNodeId: "d3", color: "#dc2626" }
            ],
            message: "Check current != null (true)",
            condition: true,
            action: "check"
          },
          {
            lineIndex: 3,
            nodes: [
              { id: "d1", data: 10, next: "d2", prev: null, x: 100, y: 150 },
              { id: "d2", data: 20, next: "d3", prev: "d1", x: 300, y: 150 },
              { id: "d3", data: 30, next: null, prev: "d2", x: 500, y: 150, isActive: true }
            ],
            pointers: [
              { id: "tail", label: "TAIL", targetNodeId: "d3", color: "#16a34a" },
              { id: "current", label: "CURRENT", targetNodeId: "d3", color: "#dc2626" }
            ],
            message: "Print current.data: 30",
            outputText: "30",
            action: "print"
          },
          {
            lineIndex: 4,
            nodes: [
              { id: "d1", data: 10, next: "d2", prev: null, x: 100, y: 150 },
              { id: "d2", data: 20, next: "d3", prev: "d1", x: 300, y: 150, isActive: true },
              { id: "d3", data: 30, next: null, prev: "d2", x: 500, y: 150 }
            ],
            pointers: [
              { id: "tail", label: "TAIL", targetNodeId: "d3", color: "#16a34a" },
              { id: "current", label: "CURRENT", targetNodeId: "d2", color: "#dc2626" }
            ],
            message: "Move current to previous node",
            action: "traverse"
          },
          {
            lineIndex: 2,
            nodes: [
              { id: "d1", data: 10, next: "d2", prev: null, x: 100, y: 150 },
              { id: "d2", data: 20, next: "d3", prev: "d1", x: 300, y: 150, isActive: true },
              { id: "d3", data: 30, next: null, prev: "d2", x: 500, y: 150 }
            ],
            pointers: [
              { id: "tail", label: "TAIL", targetNodeId: "d3", color: "#16a34a" },
              { id: "current", label: "CURRENT", targetNodeId: "d2", color: "#dc2626" }
            ],
            message: "Check current != null (true)",
            condition: true,
            action: "check"
          },
          {
            lineIndex: 3,
            nodes: [
              { id: "d1", data: 10, next: "d2", prev: null, x: 100, y: 150 },
              { id: "d2", data: 20, next: "d3", prev: "d1", x: 300, y: 150, isActive: true },
              { id: "d3", data: 30, next: null, prev: "d2", x: 500, y: 150 }
            ],
            pointers: [
              { id: "tail", label: "TAIL", targetNodeId: "d3", color: "#16a34a" },
              { id: "current", label: "CURRENT", targetNodeId: "d2", color: "#dc2626" }
            ],
            message: "Print current.data: 20",
            outputText: "30, 20",
            action: "print"
          },
          {
            lineIndex: 4,
            nodes: [
              { id: "d1", data: 10, next: "d2", prev: null, x: 100, y: 150, isActive: true },
              { id: "d2", data: 20, next: "d3", prev: "d1", x: 300, y: 150 },
              { id: "d3", data: 30, next: null, prev: "d2", x: 500, y: 150 }
            ],
            pointers: [
              { id: "tail", label: "TAIL", targetNodeId: "d3", color: "#16a34a" },
              { id: "current", label: "CURRENT", targetNodeId: "d1", color: "#dc2626" }
            ],
            message: "Move current to previous node",
            action: "traverse"
          },
          {
            lineIndex: 2,
            nodes: [
              { id: "d1", data: 10, next: "d2", prev: null, x: 100, y: 150, isActive: true },
              { id: "d2", data: 20, next: "d3", prev: "d1", x: 300, y: 150 },
              { id: "d3", data: 30, next: null, prev: "d2", x: 500, y: 150 }
            ],
            pointers: [
              { id: "tail", label: "TAIL", targetNodeId: "d3", color: "#16a34a" },
              { id: "current", label: "CURRENT", targetNodeId: "d1", color: "#dc2626" }
            ],
            message: "Check current != null (true)",
            condition: true,
            action: "check"
          },
          {
            lineIndex: 3,
            nodes: [
              { id: "d1", data: 10, next: "d2", prev: null, x: 100, y: 150, isActive: true },
              { id: "d2", data: 20, next: "d3", prev: "d1", x: 300, y: 150 },
              { id: "d3", data: 30, next: null, prev: "d2", x: 500, y: 150 }
            ],
            pointers: [
              { id: "tail", label: "TAIL", targetNodeId: "d3", color: "#16a34a" },
              { id: "current", label: "CURRENT", targetNodeId: "d1", color: "#dc2626" }
            ],
            message: "Print current.data: 10",
            outputText: "30, 20, 10",
            action: "print"
          },
          {
            lineIndex: 4,
            nodes: [
              { id: "d1", data: 10, next: "d2", prev: null, x: 100, y: 150 },
              { id: "d2", data: 20, next: "d3", prev: "d1", x: 300, y: 150 },
              { id: "d3", data: 30, next: null, prev: "d2", x: 500, y: 150 }
            ],
            pointers: [
              { id: "tail", label: "TAIL", targetNodeId: "d3", color: "#16a34a" },
              { id: "current", label: "CURRENT", targetNodeId: null, color: "#dc2626" }
            ],
            message: "Move current to previous node (null)",
            action: "traverse"
          },
          {
            lineIndex: 2,
            nodes: [
              { id: "d1", data: 10, next: "d2", prev: null, x: 100, y: 150 },
              { id: "d2", data: 20, next: "d3", prev: "d1", x: 300, y: 150 },
              { id: "d3", data: 30, next: null, prev: "d2", x: 500, y: 150 }
            ],
            pointers: [
              { id: "tail", label: "TAIL", targetNodeId: "d3", color: "#16a34a" },
              { id: "current", label: "CURRENT", targetNodeId: null, color: "#dc2626" }
            ],
            message: "Check current != null (false) - Exit loop. Backward traversal complete!",
            condition: false,
            action: "check"
          }
        ]
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
  title: "Why Do We Need Circular Linked Lists?",
  content: `
Let's assume you are developing a board game like Ludo and you're using a single linked list as your data structure to record each player's turn. 

In a **normal linked list**, the last node points to NULL. Once you reach the end, you must restart from the head if you want to traverse again. This is inefficient in cases where continuous looping is required. 

In a **circular linked list**, however, the last node connects back to the first node. This makes it ideal for applications where you need continuous traversal, like cycling through players' turns in a game.
`,
  chatbot: [
    {
      question: "After the last player's turn, how does the first player get their turn again?",
      context: "We are modeling player turns in Ludo using a linked list. In a normal linked list, traversal ends at NULL. In a circular linked list, traversal loops back to the head, so after the last node (last player), the next node is the first player again.",
      hint: "Think about what happens when the last node points back to the head node."
    }
  ]
}

,
      {
  id: "circular-1",
  type: "content",
  title: "Circular Linked List Concept",
  content: `
What if the last node points to the first node instead? Wouldn't this be much more efficient?

---

A **Circular Linked List** is a variation of a linked list where the last node points back to the first node (head) instead of pointing to null. This creates a continuous loop structure.

---

**Key Characteristics:**

- No null pointers (except in the case of an empty list)  
- Can be traversed infinitely in a loop  
- Can be either singly circular or doubly circular  
- Often maintains a "tail" pointer for efficiency  

---

**Important Considerations:**

- Must be careful to avoid infinite loops during traversal  
- Insertion and deletion logic differs from regular linked lists  
- Very useful for round-robin algorithms and circular buffers  

**Other scenarios where a circular linked list is helpful:**

- **Music Playlist (Loop Mode)** 🎵 → After the last song, the next should be the first again.  
- **CPU Round-Robin Scheduling** ⚙️ → Processes are given time in a circular fashion.

`
},
      {
  "id": "circular-2",
  "type": "visualization",
  "title": "Circular Structure",
  "visualization": {
    "nodes": [
      { "id": "c1", "data": 10, "next": "c2", "x": 150, "y": 200 },
      { "id": "c2", "data": 20, "next": "c3", "x": 300, "y": 200 },
      { "id": "c3", "data": 30, "next": "c4", "x": 450, "y": 200 },
      { "id": "c4", "data": 40, "next": "c1", "x": 600, "y": 200, "isActive": true }
    ],
    "pointers": [
      { "id": "head", "label": "HEAD", "targetNodeId": "c1", "color": "#2563eb" },
      { "id": "tail", "label": "TAIL", "targetNodeId": "c4", "color": "#16a34a" },

    ],
    "message": "The last node (40) points back to the first node (10), forming a circle."
  }
}

,
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
  id: "circular-6",
  type: "content",
  title: "Operations in Circular Linked Lists",
  content: `
**Traversal**  
- Move node by node until you come back to the head  

---

**Insertion**  
- **At the beginning:** Insert before the head and adjust the last node's pointer  
- **At the end:** Insert after the last node and link it back to the head  
- **At the middle:** Insert between two nodes like in normal lists, but with extra pointer adjustments  

---

**Deletion**  
- **At the beginning:** Update the head and fix the last node’s pointer  
- **At the end:** Update the last node and fix the head’s pointer  
- **At the middle:** Adjust the neighboring nodes' pointers to bypass the deleted node  
`
},
            {
  "id": "circular-3b",
  "type": "visualization",
  "title": "Circular Linked List Traversal (Straight Line View)",
  "code": [
    "function traverse(head):",
    "    if head == null: return",
    "    current = head",
    "    do:",
    "        print(current.data)",
    "        current = current.next",
    "    while current != head"
  ],
  "visualization": {
    "nodes": [
      { "id": "c1", "data": 10, "next": "c2", "x": 120, "y": 200, "isActive": true },
      { "id": "c2", "data": 20, "next": "c3", "x": 280, "y": 200 },
      { "id": "c3", "data": 30, "next": "c4", "x": 440, "y": 200 },
      { "id": "c4", "data": 40, "next": "c1", "x": 600, "y": 200 }
    ],
    "pointers": [
      { "id": "head", "label": "HEAD", "targetNodeId": "c1", "color": "#2563eb" },
      { "id": "current", "label": "CURRENT", "targetNodeId": "c1", "color": "#dc2626" }
    ],
    "activeLineIndex": 3,
    "message": "Start traversal from head. Since it's circular, we stop when current returns to head."
  },
  "executionSteps": [
    {
      "lineIndex": 0,
      "nodes": [
        { "id": "c1", "data": 10, "next": "c2", "x": 120, "y": 200 },
        { "id": "c2", "data": 20, "next": "c3", "x": 280, "y": 200 },
        { "id": "c3", "data": 30, "next": "c4", "x": 440, "y": 200 },
        { "id": "c4", "data": 40, "next": "c1", "x": 600, "y": 200 }
      ],
      "pointers": [
        { "id": "head", "label": "HEAD", "targetNodeId": "c1", "color": "#2563eb" }
      ],
      "message": "Initialize: head points to first node in the circular list"
    },
    {
      "lineIndex": 2,
      "nodes": [
        { "id": "c1", "data": 10, "next": "c2", "x": 120, "y": 200, "isActive": true },
        { "id": "c2", "data": 20, "next": "c3", "x": 280, "y": 200 },
        { "id": "c3", "data": 30, "next": "c4", "x": 440, "y": 200 },
        { "id": "c4", "data": 40, "next": "c1", "x": 600, "y": 200 }
      ],
      "pointers": [
        { "id": "head", "label": "HEAD", "targetNodeId": "c1", "color": "#2563eb" },
        { "id": "current", "label": "CURRENT", "targetNodeId": "c1", "color": "#dc2626" }
      ],
      "message": "Assign current = head",
      "action": "assign"
    },
    {
      "lineIndex": 4,
      "nodes": [
        { "id": "c1", "data": 10, "next": "c2", "x": 120, "y": 200, "isActive": true },
        { "id": "c2", "data": 20, "next": "c3", "x": 280, "y": 200 },
        { "id": "c3", "data": 30, "next": "c4", "x": 440, "y": 200 },
        { "id": "c4", "data": 40, "next": "c1", "x": 600, "y": 200 }
      ],
      "pointers": [
        { "id": "head", "label": "HEAD", "targetNodeId": "c1", "color": "#2563eb" },
        { "id": "current", "label": "CURRENT", "targetNodeId": "c1", "color": "#dc2626" }
      ],
      "message": "Print current.data: 10",
      "outputText": "10",
      "action": "print"
    },
    {
      "lineIndex": 5,
      "nodes": [
        { "id": "c1", "data": 10, "next": "c2", "x": 120, "y": 200 },
        { "id": "c2", "data": 20, "next": "c3", "x": 280, "y": 200, "isActive": true },
        { "id": "c3", "data": 30, "next": "c4", "x": 440, "y": 200 },
        { "id": "c4", "data": 40, "next": "c1", "x": 600, "y": 200 }
      ],
      "pointers": [
        { "id": "head", "label": "HEAD", "targetNodeId": "c1", "color": "#2563eb" },
        { "id": "current", "label": "CURRENT", "targetNodeId": "c2", "color": "#dc2626" }
      ],
      "message": "Move current to next node",
      "action": "traverse"
    },
    {
      "lineIndex": 4,
      "nodes": [
        { "id": "c1", "data": 10, "next": "c2", "x": 120, "y": 200 },
        { "id": "c2", "data": 20, "next": "c3", "x": 280, "y": 200, "isActive": true },
        { "id": "c3", "data": 30, "next": "c4", "x": 440, "y": 200 },
        { "id": "c4", "data": 40, "next": "c1", "x": 600, "y": 200 }
      ],
      "pointers": [
        { "id": "head", "label": "HEAD", "targetNodeId": "c1", "color": "#2563eb" },
        { "id": "current", "label": "CURRENT", "targetNodeId": "c2", "color": "#dc2626" }
      ],
      "message": "Print current.data: 20",
      "outputText": "10, 20",
      "action": "print"
    },
    {
      "lineIndex": 5,
      "nodes": [
        { "id": "c1", "data": 10, "next": "c2", "x": 120, "y": 200 },
        { "id": "c2", "data": 20, "next": "c3", "x": 280, "y": 200 },
        { "id": "c3", "data": 30, "next": "c4", "x": 440, "y": 200, "isActive": true },
        { "id": "c4", "data": 40, "next": "c1", "x": 600, "y": 200 }
      ],
      "pointers": [
        { "id": "head", "label": "HEAD", "targetNodeId": "c1", "color": "#2563eb" },
        { "id": "current", "label": "CURRENT", "targetNodeId": "c3", "color": "#dc2626" }
      ],
      "message": "Move current to next node",
      "action": "traverse"
    },
    {
      "lineIndex": 4,
      "nodes": [
        { "id": "c1", "data": 10, "next": "c2", "x": 120, "y": 200 },
        { "id": "c2", "data": 20, "next": "c3", "x": 280, "y": 200 },
        { "id": "c3", "data": 30, "next": "c4", "x": 440, "y": 200, "isActive": true },
        { "id": "c4", "data": 40, "next": "c1", "x": 600, "y": 200 }
      ],
      "pointers": [
        { "id": "head", "label": "HEAD", "targetNodeId": "c1", "color": "#2563eb" },
        { "id": "current", "label": "CURRENT", "targetNodeId": "c3", "color": "#dc2626" }
      ],
      "message": "Print current.data: 30",
      "outputText": "10, 20, 30",
      "action": "print"
    },
    {
      "lineIndex": 5,
      "nodes": [
        { "id": "c1", "data": 10, "next": "c2", "x": 120, "y": 200 },
        { "id": "c2", "data": 20, "next": "c3", "x": 280, "y": 200 },
        { "id": "c3", "data": 30, "next": "c4", "x": 440, "y": 200 },
        { "id": "c4", "data": 40, "next": "c1", "x": 600, "y": 200, "isActive": true }
      ],
      "pointers": [
        { "id": "head", "label": "HEAD", "targetNodeId": "c1", "color": "#2563eb" },
        { "id": "current", "label": "CURRENT", "targetNodeId": "c4", "color": "#dc2626" }
      ],
      "message": "Move current to next node",
      "action": "traverse"
    },
    {
      "lineIndex": 4,
      "nodes": [
        { "id": "c1", "data": 10, "next": "c2", "x": 120, "y": 200 },
        { "id": "c2", "data": 20, "next": "c3", "x": 280, "y": 200 },
        { "id": "c3", "data": 30, "next": "c4", "x": 440, "y": 200 },
        { "id": "c4", "data": 40, "next": "c1", "x": 600, "y": 200, "isActive": true }
      ],
      "pointers": [
        { "id": "head", "label": "HEAD", "targetNodeId": "c1", "color": "#2563eb" },
        { "id": "current", "label": "CURRENT", "targetNodeId": "c4", "color": "#dc2626" }
      ],
      "message": "Print current.data: 40",
      "outputText": "10, 20, 30, 40",
      "action": "print"
    },
    {
      "lineIndex": 6,
      "nodes": [
        { "id": "c1", "data": 10, "next": "c2", "x": 120, "y": 200, "isActive": true },
        { "id": "c2", "data": 20, "next": "c3", "x": 280, "y": 200 },
        { "id": "c3", "data": 30, "next": "c4", "x": 440, "y": 200 },
        { "id": "c4", "data": 40, "next": "c1", "x": 600, "y": 200 }
      ],
      "pointers": [
        { "id": "head", "label": "HEAD", "targetNodeId": "c1", "color": "#2563eb" },
        { "id": "current", "label": "CURRENT", "targetNodeId": "c1", "color": "#dc2626" }
      ],
      "message": "current == head, stop traversal",
      "condition": false,
      "action": "check"
    }
  ]
}

,
      {
  "id": "circular-4-straight",
  "type": "visualization",
  "title": "Insertion at End in Circular Singly Linked List",
  "code": [
    "function insertEnd(head, data):",
    "    newNode = Node(data)",
    "    if head == null:",
    "        head = newNode",
    "        newNode.next = head",
    "        return head",
    "    current = head",
    "    while current.next != head:",
    "        current = current.next",
    "    current.next = newNode",
    "    newNode.next = head",
    "    return head"
  ],
  "visualization": {
    "nodes": [
      { "id": "c1", "data": 10, "next": "c2", "x": 100, "y": 200 },
      { "id": "c2", "data": 20, "next": "c3", "x": 250, "y": 200 },
      { "id": "c3", "data": 30, "next": "c4", "x": 400, "y": 200 },
      { "id": "c4", "data": 40, "next": "c1", "x": 550, "y": 200 }
    ],
    "pointers": [
      { "id": "head", "label": "HEAD", "targetNodeId": "c1", "color": "#2563eb" },
      { "id": "current", "label": "CURRENT", "targetNodeId": null, "color": "#dc2626" }
    ],
    "activeLineIndex": 1,
    "message": "We want to insert user input (50) at the end of the circular list."
  },
  "executionSteps": [
    {
      "lineIndex": 1,
      "nodes": [
        { "id": "c1", "data": 10, "next": "c2", "x": 100, "y": 200 },
        { "id": "c2", "data": 20, "next": "c3", "x": 250, "y": 200 },
        { "id": "c3", "data": 30, "next": "c4", "x": 400, "y": 200 },
        { "id": "c4", "data": 40, "next": "c1", "x": 550, "y": 200 }
      ],
      "pointers": [
        { "id": "head", "label": "HEAD", "targetNodeId": "c1", "color": "#2563eb" }
      ],
      "message": "Create newNode with user input data = 50"
    },
    {
      "lineIndex": 6,
      "nodes": [
        { "id": "c1", "data": 10, "next": "c2", "x": 100, "y": 200 },
        { "id": "c2", "data": 20, "next": "c3", "x": 250, "y": 200 },
        { "id": "c3", "data": 30, "next": "c4", "x": 400, "y": 200 },
        { "id": "c4", "data": 40, "next": "c1", "x": 550, "y": 200 }
      ],
      "pointers": [
        { "id": "head", "label": "HEAD", "targetNodeId": "c1", "color": "#2563eb" },
        { "id": "current", "label": "CURRENT", "targetNodeId": "c1", "color": "#dc2626" }
      ],
      "message": "Set current = head"
    },
    {
      "lineIndex": 7,
      "nodes": [
        { "id": "c1", "data": 10, "next": "c2", "x": 100, "y": 200 },
        { "id": "c2", "data": 20, "next": "c3", "x": 250, "y": 200, "isActive": true },
        { "id": "c3", "data": 30, "next": "c4", "x": 400, "y": 200 },
        { "id": "c4", "data": 40, "next": "c1", "x": 550, "y": 200 }
      ],
      "pointers": [
        { "id": "head", "label": "HEAD", "targetNodeId": "c1", "color": "#2563eb" },
        { "id": "current", "label": "CURRENT", "targetNodeId": "c2", "color": "#dc2626" }
      ],
      "message": "Move current to next (20)"
    },
    {
      "lineIndex": 7,
      "nodes": [
        { "id": "c1", "data": 10, "next": "c2", "x": 100, "y": 200 },
        { "id": "c2", "data": 20, "next": "c3", "x": 250, "y": 200 },
        { "id": "c3", "data": 30, "next": "c4", "x": 400, "y": 200, "isActive": true },
        { "id": "c4", "data": 40, "next": "c1", "x": 550, "y": 200 }
      ],
      "pointers": [
        { "id": "head", "label": "HEAD", "targetNodeId": "c1", "color": "#2563eb" },
        { "id": "current", "label": "CURRENT", "targetNodeId": "c3", "color": "#dc2626" }
      ],
      "message": "Move current to next (30)"
    },
    {
      "lineIndex": 7,
      "nodes": [
        { "id": "c1", "data": 10, "next": "c2", "x": 100, "y": 200 },
        { "id": "c2", "data": 20, "next": "c3", "x": 250, "y": 200 },
        { "id": "c3", "data": 30, "next": "c4", "x": 400, "y": 200 },
        { "id": "c4", "data": 40, "next": "c1", "x": 550, "y": 200, "isActive": true }
      ],
      "pointers": [
        { "id": "head", "label": "HEAD", "targetNodeId": "c1", "color": "#2563eb" },
        { "id": "current", "label": "CURRENT", "targetNodeId": "c4", "color": "#dc2626" }
      ],
      "message": "Move current to next (40)"
    },
    {
      "lineIndex": 9,
      "nodes": [
        { "id": "c1", "data": 10, "next": "c2", "x": 100, "y": 200 },
        { "id": "c2", "data": 20, "next": "c3", "x": 250, "y": 200 },
        { "id": "c3", "data": 30, "next": "c4", "x": 400, "y": 200 },
        { "id": "c4", "data": 40, "next": "c5", "x": 550, "y": 200 },
        { "id": "c5", "data": 50, "next": "c1", "x": 700, "y": 200, "isActive": true }
      ],
      "pointers": [
        { "id": "head", "label": "HEAD", "targetNodeId": "c1", "color": "#2563eb" },
        { "id": "current", "label": "CURRENT", "targetNodeId": "c4", "color": "#dc2626" }
      ],
      "message": "Insert newNode (50) after current (40) and link newNode.next = head"
    }
  ]
},

{
  "id": "circular-del-end",
  "type": "visualization",
  "title": "Deletion at End in Circular Singly Linked List",
  "code": [
    "function deleteEnd(head):",
    "    if head == null:",
    "        return null",
    "    if head.next == head:", 
    "        return null   # only one node",
    "    current = head",
    "    while current.next.next != head:",
    "        current = current.next",
    "    current.next = head",
    "    return head"
  ],
  "visualization": {
    "nodes": [
      { "id": "c1", "data": 10, "next": "c2", "x": 180, "y": 200 },
      { "id": "c2", "data": 20, "next": "c3", "x": 340, "y": 200 },
      { "id": "c3", "data": 30, "next": "c4", "x": 500, "y": 200 },
      { "id": "c4", "data": 40, "next": "c1", "x": 660, "y": 200 }
    ],
    "pointers": [
      { "id": "head", "label": "HEAD", "targetNodeId": "c1", "color": "#2563eb" },
      { "id": "current", "label": "CURRENT", "targetNodeId": null, "color": "#dc2626" }
    ],
    "activeLineIndex": 1,
    "message": "We want to delete the last node (40) from the circular list."
  },
  "executionSteps": [
    {
      "lineIndex": 6,
      "nodes": [
        { "id": "c1", "data": 10, "next": "c2", "x": 180, "y": 200 },
        { "id": "c2", "data": 20, "next": "c3", "x": 340, "y": 200 },
        { "id": "c3", "data": 30, "next": "c4", "x": 500, "y": 200 },
        { "id": "c4", "data": 40, "next": "c1", "x": 660, "y": 200 }
      ],
      "pointers": [
        { "id": "head", "label": "HEAD", "targetNodeId": "c1", "color": "#2563eb" },
        { "id": "current", "label": "CURRENT", "targetNodeId": "c1", "color": "#dc2626" }
      ],
      "message": "Start with current = head (10)."
    },
    {
      "lineIndex": 7,
      "nodes": [
        { "id": "c1", "data": 10, "next": "c2", "x": 180, "y": 200 },
        { "id": "c2", "data": 20, "next": "c3", "x": 340, "y": 200, "isActive": true },
        { "id": "c3", "data": 30, "next": "c4", "x": 500, "y": 200 },
        { "id": "c4", "data": 40, "next": "c1", "x": 660, "y": 200 }
      ],
      "pointers": [
        { "id": "head", "label": "HEAD", "targetNodeId": "c1", "color": "#2563eb" },
        { "id": "current", "label": "CURRENT", "targetNodeId": "c2", "color": "#dc2626" }
      ],
      "message": "Move current to next (20)."
    },
    {
      "lineIndex": 7,
      "nodes": [
        { "id": "c1", "data": 10, "next": "c2", "x": 180, "y": 200 },
        { "id": "c2", "data": 20, "next": "c3", "x": 340, "y": 200 },
        { "id": "c3", "data": 30, "next": "c4", "x": 500, "y": 200, "isActive": true },
        { "id": "c4", "data": 40, "next": "c1", "x": 660, "y": 200 }
      ],
      "pointers": [
        { "id": "head", "label": "HEAD", "targetNodeId": "c1", "color": "#2563eb" },
        { "id": "current", "label": "CURRENT", "targetNodeId": "c3", "color": "#dc2626" }
      ],
      "message": "Move current to next (30). Now current.next.next = head, so stop."
    },
    {
      "lineIndex": 9,
      "nodes": [
        { "id": "c1", "data": 10, "next": "c2", "x": 180, "y": 200 },
        { "id": "c2", "data": 20, "next": "c3", "x": 340, "y": 200 },
        { "id": "c3", "data": 30, "next": "c1", "x": 500, "y": 200, "isActive": true }
      ],
      "pointers": [
        { "id": "head", "label": "HEAD", "targetNodeId": "c1", "color": "#2563eb" },
        { "id": "current", "label": "CURRENT", "targetNodeId": "c3", "color": "#dc2626" }
      ],
      "message": "Set current.next = head. Node (40) is removed from the list."
    }
  ]
},
{
  id: "circular-5",
  type: "content",
  title: "Why Do We Need Circular Doubly Linked Lists?",
  content: `
Consider you are using a circular linked list as the data structure for your music playlist. After the playlist finishes, it starts again from the beginning.  

Now, imagine you want to go to the **previous song**. In a regular circular singly linked list, you would have to traverse the entire list from the head to reach the last node. This is inefficient.  

`,
chatbot: [
    {
      question: "Can you think of a solution to the above problem?",
      context: "i am trying to explain why do we need circular doubly linked lists using this scenario: Consider you are using a circular linked list as the data structure for your music playlist. After the playlist finishes, it starts again from the beginning.  Now, imagine you want to go to the previous song. In a regular circular singly linked list, you would have to traverse the entire list from the head to reach the last node. This is inefficient. "
    }
  ]
}


,
{
  id: "circular-7",
  type: "content",
  title: "Structure of Circular Doubly Linked List",
  content: ` 
This is where **Circular Doubly Linked Lists** become useful. They allow traversal in both directions, making it easy to move to the previous song without starting from the head.

In a **Circular Doubly Linked List (CDLL)**, each node contains the following:

- **Data**  
- A pointer to the **next** node  
- A pointer to the **previous** node  

---

**Special Properties:**

- The head node's **prev** pointer connects to the last node  
- The last node's **next** pointer connects back to the head  
- Traversal can continue endlessly in **both directions**  
`
}
,
{
  id: "circular-8",
  type: "content",
  title: "Traversal in CDLL",
  content: `
**Scenario:** Imagine browsing songs in a media player 🎶.  

- Going to the **next** song → follow the **next** pointer  
- Going to the **previous** song → follow the **prev** pointer  
- After the **last** song → **next** brings you back to the first  
- Before the **first** song → **prev** takes you to the last  

---

**Important Note:**  
Traversal in a Circular Doubly Linked List must stop once you reach the starting node again, otherwise you will end up in an infinite loop.  
`
},

{
  id: "circular-12",
  type: "content",
  title: "Advantages and Disadvantages of CDLL",
  content: `
**Advantages**

**Circular Singly Linked List (CSLL):**  
- Efficient for continuous traversal (no need to restart from head)  
- Naturally supports round-robin algorithms  
- Can represent circular data structures like buffers, playlists, or game turns  

**Circular Doubly Linked List (CDLL):**  
- Easy traversal in both directions  
- Efficient insertion and deletion at any position  
- Naturally supports continuous looping  

---

**Disadvantages**

**Circular Singly Linked List (CSLL):**  
- More complex insertion and deletion logic compared to normal lists  
- Risk of infinite loops if termination conditions are wrong  
- Does not support backward traversal  

**Circular Doubly Linked List (CDLL):**  
- More complex than a singly circular linked list  
- Requires extra memory for the **prev** pointer  
- Care is needed to avoid infinite loops during traversal  
`
},

{
  id: "circular-5",
  type: "content",
  title: "Applications & Use Cases",
  content: `
**Real-World Applications**

**1. Round-Robin CPU Scheduling**  
- The operating system allocates CPU time to processes in a circular fashion  
- Each process gets an equal time slice  
- After the last process, control returns to the first process  

**2. Multiplayer Games**  
- Turn-based games where players take turns in sequence  
- After the last player's turn, it goes back to the first player  
- Examples: Board games, card games  

**3. Circular Buffers**  
- Fixed-size buffers that wrap around when full  
- Commonly used in data streaming, audio/video processing  
- When the buffer is full, new data overwrites the oldest data  

**4. Music/Video Playlists**  
- Supports continuous playback that loops back to the beginning  
- Used in "Repeat All" functionality in media players  

**5. Memory Management**  
- Circular buffer allocation in embedded systems  
- Cache replacement algorithms for efficient memory usage  
`
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
        },
        executionSteps: [
          {
            lineIndex: 0,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 100, y: 150 },
              { id: "n2", data: 2, next: "n3", x: 250, y: 150 },
              { id: "n3", data: 3, next: null, x: 400, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" }
            ],
            message: "Starting reversal of linked list: 1 -> 2 -> 3 -> null"
          },
          {
            lineIndex: 1,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 100, y: 150 },
              { id: "n2", data: 2, next: "n3", x: 250, y: 150 },
              { id: "n3", data: 3, next: null, x: 400, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "prev", label: "PREV", targetNodeId: null, color: "#16a34a" }
            ],
            message: "Initialize prev = null",
            action: "assign"
          },
          {
            lineIndex: 2,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 100, y: 150, isActive: true },
              { id: "n2", data: 2, next: "n3", x: 250, y: 150 },
              { id: "n3", data: 3, next: null, x: 400, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "prev", label: "PREV", targetNodeId: null, color: "#16a34a" },
              { id: "current", label: "CURRENT", targetNodeId: "n1", color: "#dc2626" }
            ],
            message: "Initialize current = head",
            action: "assign"
          },
          {
            lineIndex: 3,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 100, y: 150, isActive: true },
              { id: "n2", data: 2, next: "n3", x: 250, y: 150 },
              { id: "n3", data: 3, next: null, x: 400, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "prev", label: "PREV", targetNodeId: null, color: "#16a34a" },
              { id: "current", label: "CURRENT", targetNodeId: "n1", color: "#dc2626" }
            ],
            message: "Check current != null (true)",
            condition: true,
            action: "check"
          },
          {
            lineIndex: 4,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 100, y: 150, isActive: true },
              { id: "n2", data: 2, next: "n3", x: 250, y: 150 },
              { id: "n3", data: 3, next: null, x: 400, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "prev", label: "PREV", targetNodeId: null, color: "#16a34a" },
              { id: "current", label: "CURRENT", targetNodeId: "n1", color: "#dc2626" },
              { id: "next", label: "NEXT", targetNodeId: "n2", color: "#d97706" }
            ],
            message: "Store next = current.next (save reference before changing)",
            action: "assign"
          },
          {
            lineIndex: 5,
            nodes: [
              { id: "n1", data: 1, next: null, x: 100, y: 150, isActive: true },
              { id: "n2", data: 2, next: "n3", x: 250, y: 150 },
              { id: "n3", data: 3, next: null, x: 400, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "prev", label: "PREV", targetNodeId: null, color: "#16a34a" },
              { id: "current", label: "CURRENT", targetNodeId: "n1", color: "#dc2626" },
              { id: "next", label: "NEXT", targetNodeId: "n2", color: "#d97706" }
            ],
            message: "Reverse: current.next = prev (point backward)",
            action: "assign"
          },
          {
            lineIndex: 6,
            nodes: [
              { id: "n1", data: 1, next: null, x: 100, y: 150, isActive: true },
              { id: "n2", data: 2, next: "n3", x: 250, y: 150 },
              { id: "n3", data: 3, next: null, x: 400, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "prev", label: "PREV", targetNodeId: "n1", color: "#16a34a" },
              { id: "current", label: "CURRENT", targetNodeId: "n1", color: "#dc2626" },
              { id: "next", label: "NEXT", targetNodeId: "n2", color: "#d97706" }
            ],
            message: "Move prev = current",
            action: "assign"
          },
          {
            lineIndex: 7,
            nodes: [
              { id: "n1", data: 1, next: null, x: 100, y: 150 },
              { id: "n2", data: 2, next: "n3", x: 250, y: 150, isActive: true },
              { id: "n3", data: 3, next: null, x: 400, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "prev", label: "PREV", targetNodeId: "n1", color: "#16a34a" },
              { id: "current", label: "CURRENT", targetNodeId: "n2", color: "#dc2626" },
              { id: "next", label: "NEXT", targetNodeId: "n2", color: "#d97706" }
            ],
            message: "Move current = next",
            action: "traverse"
          },
          {
            lineIndex: 3,
            nodes: [
              { id: "n1", data: 1, next: null, x: 100, y: 150 },
              { id: "n2", data: 2, next: "n3", x: 250, y: 150, isActive: true },
              { id: "n3", data: 3, next: null, x: 400, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "prev", label: "PREV", targetNodeId: "n1", color: "#16a34a" },
              { id: "current", label: "CURRENT", targetNodeId: "n2", color: "#dc2626" },
              { id: "next", label: "NEXT", targetNodeId: "n2", color: "#d97706" }
            ],
            message: "Check current != null (true)",
            condition: true,
            action: "check"
          },
          {
            lineIndex: 4,
            nodes: [
              { id: "n1", data: 1, next: null, x: 100, y: 150 },
              { id: "n2", data: 2, next: "n3", x: 250, y: 150, isActive: true },
              { id: "n3", data: 3, next: null, x: 400, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "prev", label: "PREV", targetNodeId: "n1", color: "#16a34a" },
              { id: "current", label: "CURRENT", targetNodeId: "n2", color: "#dc2626" },
              { id: "next", label: "NEXT", targetNodeId: "n3", color: "#d97706" }
            ],
            message: "Store next = current.next",
            action: "assign"
          },
          {
            lineIndex: 5,
            nodes: [
              { id: "n1", data: 1, next: null, x: 100, y: 150 },
              { id: "n2", data: 2, next: "n1", x: 250, y: 150, isActive: true },
              { id: "n3", data: 3, next: null, x: 400, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "prev", label: "PREV", targetNodeId: "n1", color: "#16a34a" },
              { id: "current", label: "CURRENT", targetNodeId: "n2", color: "#dc2626" },
              { id: "next", label: "NEXT", targetNodeId: "n3", color: "#d97706" }
            ],
            message: "Reverse: current.next = prev",
            action: "assign"
          },
          {
            lineIndex: 6,
            nodes: [
              { id: "n1", data: 1, next: null, x: 100, y: 150 },
              { id: "n2", data: 2, next: "n1", x: 250, y: 150, isActive: true },
              { id: "n3", data: 3, next: null, x: 400, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "prev", label: "PREV", targetNodeId: "n2", color: "#16a34a" },
              { id: "current", label: "CURRENT", targetNodeId: "n2", color: "#dc2626" },
              { id: "next", label: "NEXT", targetNodeId: "n3", color: "#d97706" }
            ],
            message: "Move prev = current",
            action: "assign"
          },
          {
            lineIndex: 7,
            nodes: [
              { id: "n1", data: 1, next: null, x: 100, y: 150 },
              { id: "n2", data: 2, next: "n1", x: 250, y: 150 },
              { id: "n3", data: 3, next: null, x: 400, y: 150, isActive: true }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "prev", label: "PREV", targetNodeId: "n2", color: "#16a34a" },
              { id: "current", label: "CURRENT", targetNodeId: "n3", color: "#dc2626" },
              { id: "next", label: "NEXT", targetNodeId: "n3", color: "#d97706" }
            ],
            message: "Move current = next",
            action: "traverse"
          },
          {
            lineIndex: 3,
            nodes: [
              { id: "n1", data: 1, next: null, x: 100, y: 150 },
              { id: "n2", data: 2, next: "n1", x: 250, y: 150 },
              { id: "n3", data: 3, next: null, x: 400, y: 150, isActive: true }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "prev", label: "PREV", targetNodeId: "n2", color: "#16a34a" },
              { id: "current", label: "CURRENT", targetNodeId: "n3", color: "#dc2626" },
              { id: "next", label: "NEXT", targetNodeId: "n3", color: "#d97706" }
            ],
            message: "Check current != null (true)",
            condition: true,
            action: "check"
          },
          {
            lineIndex: 4,
            nodes: [
              { id: "n1", data: 1, next: null, x: 100, y: 150 },
              { id: "n2", data: 2, next: "n1", x: 250, y: 150 },
              { id: "n3", data: 3, next: null, x: 400, y: 150, isActive: true }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "prev", label: "PREV", targetNodeId: "n2", color: "#16a34a" },
              { id: "current", label: "CURRENT", targetNodeId: "n3", color: "#dc2626" },
              { id: "next", label: "NEXT", targetNodeId: null, color: "#d97706" }
            ],
            message: "Store next = current.next (null)",
            action: "assign"
          },
          {
            lineIndex: 5,
            nodes: [
              { id: "n1", data: 1, next: null, x: 100, y: 150 },
              { id: "n2", data: 2, next: "n1", x: 250, y: 150 },
              { id: "n3", data: 3, next: "n2", x: 400, y: 150, isActive: true }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "prev", label: "PREV", targetNodeId: "n2", color: "#16a34a" },
              { id: "current", label: "CURRENT", targetNodeId: "n3", color: "#dc2626" },
              { id: "next", label: "NEXT", targetNodeId: null, color: "#d97706" }
            ],
            message: "Reverse: current.next = prev",
            action: "assign"
          },
          {
            lineIndex: 6,
            nodes: [
              { id: "n1", data: 1, next: null, x: 100, y: 150 },
              { id: "n2", data: 2, next: "n1", x: 250, y: 150 },
              { id: "n3", data: 3, next: "n2", x: 400, y: 150, isActive: true }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "prev", label: "PREV", targetNodeId: "n3", color: "#16a34a" },
              { id: "current", label: "CURRENT", targetNodeId: "n3", color: "#dc2626" },
              { id: "next", label: "NEXT", targetNodeId: null, color: "#d97706" }
            ],
            message: "Move prev = current",
            action: "assign"
          },
          {
            lineIndex: 7,
            nodes: [
              { id: "n1", data: 1, next: null, x: 100, y: 150 },
              { id: "n2", data: 2, next: "n1", x: 250, y: 150 },
              { id: "n3", data: 3, next: "n2", x: 400, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "prev", label: "PREV", targetNodeId: "n3", color: "#16a34a" },
              { id: "current", label: "CURRENT", targetNodeId: null, color: "#dc2626" },
              { id: "next", label: "NEXT", targetNodeId: null, color: "#d97706" }
            ],
            message: "Move current = next (null)",
            action: "traverse"
          },
          {
            lineIndex: 3,
            nodes: [
              { id: "n1", data: 1, next: null, x: 100, y: 150 },
              { id: "n2", data: 2, next: "n1", x: 250, y: 150 },
              { id: "n3", data: 3, next: "n2", x: 400, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "prev", label: "PREV", targetNodeId: "n3", color: "#16a34a" },
              { id: "current", label: "CURRENT", targetNodeId: null, color: "#dc2626" },
              { id: "next", label: "NEXT", targetNodeId: null, color: "#d97706" }
            ],
            message: "Check current != null (false) - Exit loop",
            condition: false,
            action: "check"
          },
          {
            lineIndex: 8,
            nodes: [
              { id: "n1", data: 1, next: null, x: 100, y: 150 },
              { id: "n2", data: 2, next: "n1", x: 250, y: 150 },
              { id: "n3", data: 3, next: "n2", x: 400, y: 150 }
            ],
            pointers: [
              { id: "newHead", label: "NEW HEAD", targetNodeId: "n3", color: "#2563eb" }
            ],
            message: "Return prev as new head. List reversed: 3 -> 2 -> 1 -> null"
          }
        ]
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
        },
        executionSteps: [
          {
            lineIndex: 0,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 150, y: 100 },
              { id: "n2", data: 2, next: "n3", x: 300, y: 100 },
              { id: "n3", data: 3, next: "n4", x: 450, y: 100 },
              { id: "n4", data: 4, next: "n5", x: 450, y: 250 },
              { id: "n5", data: 5, next: "n2", x: 300, y: 250 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" }
            ],
            message: "Starting cycle detection using Floyd's algorithm (tortoise and hare)"
          },
          {
            lineIndex: 1,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 150, y: 100, isActive: true },
              { id: "n2", data: 2, next: "n3", x: 300, y: 100 },
              { id: "n3", data: 3, next: "n4", x: 450, y: 100 },
              { id: "n4", data: 4, next: "n5", x: 450, y: 250 },
              { id: "n5", data: 5, next: "n2", x: 300, y: 250 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "slow", label: "SLOW", targetNodeId: "n1", color: "#16a34a" }
            ],
            message: "Initialize slow = head",
            action: "assign"
          },
          {
            lineIndex: 2,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 150, y: 100, isActive: true },
              { id: "n2", data: 2, next: "n3", x: 300, y: 100 },
              { id: "n3", data: 3, next: "n4", x: 450, y: 100 },
              { id: "n4", data: 4, next: "n5", x: 450, y: 250 },
              { id: "n5", data: 5, next: "n2", x: 300, y: 250 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "slow", label: "SLOW", targetNodeId: "n1", color: "#16a34a" },
              { id: "fast", label: "FAST", targetNodeId: "n1", color: "#dc2626" }
            ],
            message: "Initialize fast = head",
            action: "assign"
          },
          {
            lineIndex: 3,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 150, y: 100, isActive: true },
              { id: "n2", data: 2, next: "n3", x: 300, y: 100 },
              { id: "n3", data: 3, next: "n4", x: 450, y: 100 },
              { id: "n4", data: 4, next: "n5", x: 450, y: 250 },
              { id: "n5", data: 5, next: "n2", x: 300, y: 250 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "slow", label: "SLOW", targetNodeId: "n1", color: "#16a34a" },
              { id: "fast", label: "FAST", targetNodeId: "n1", color: "#dc2626" }
            ],
            message: "Check fast != null and fast.next != null (true)",
            condition: true,
            action: "check"
          },
          {
            lineIndex: 4,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 150, y: 100 },
              { id: "n2", data: 2, next: "n3", x: 300, y: 100, isActive: true },
              { id: "n3", data: 3, next: "n4", x: 450, y: 100 },
              { id: "n4", data: 4, next: "n5", x: 450, y: 250 },
              { id: "n5", data: 5, next: "n2", x: 300, y: 250 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "slow", label: "SLOW", targetNodeId: "n2", color: "#16a34a" },
              { id: "fast", label: "FAST", targetNodeId: "n1", color: "#dc2626" }
            ],
            message: "Move slow = slow.next (1 step)",
            action: "traverse"
          },
          {
            lineIndex: 5,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 150, y: 100 },
              { id: "n2", data: 2, next: "n3", x: 300, y: 100 },
              { id: "n3", data: 3, next: "n4", x: 450, y: 100, isActive: true },
              { id: "n4", data: 4, next: "n5", x: 450, y: 250 },
              { id: "n5", data: 5, next: "n2", x: 300, y: 250 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "slow", label: "SLOW", targetNodeId: "n2", color: "#16a34a" },
              { id: "fast", label: "FAST", targetNodeId: "n3", color: "#dc2626" }
            ],
            message: "Move fast = fast.next.next (2 steps)",
            action: "traverse"
          },
          {
            lineIndex: 6,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 150, y: 100 },
              { id: "n2", data: 2, next: "n3", x: 300, y: 100 },
              { id: "n3", data: 3, next: "n4", x: 450, y: 100, isActive: true },
              { id: "n4", data: 4, next: "n5", x: 450, y: 250 },
              { id: "n5", data: 5, next: "n2", x: 300, y: 250 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "slow", label: "SLOW", targetNodeId: "n2", color: "#16a34a" },
              { id: "fast", label: "FAST", targetNodeId: "n3", color: "#dc2626" }
            ],
            message: "Check if slow == fast (false, continue)",
            condition: false,
            action: "check"
          },
          {
            lineIndex: 3,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 150, y: 100 },
              { id: "n2", data: 2, next: "n3", x: 300, y: 100 },
              { id: "n3", data: 3, next: "n4", x: 450, y: 100, isActive: true },
              { id: "n4", data: 4, next: "n5", x: 450, y: 250 },
              { id: "n5", data: 5, next: "n2", x: 300, y: 250 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "slow", label: "SLOW", targetNodeId: "n2", color: "#16a34a" },
              { id: "fast", label: "FAST", targetNodeId: "n3", color: "#dc2626" }
            ],
            message: "Check fast != null and fast.next != null (true)",
            condition: true,
            action: "check"
          },
          {
            lineIndex: 4,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 150, y: 100 },
              { id: "n2", data: 2, next: "n3", x: 300, y: 100 },
              { id: "n3", data: 3, next: "n4", x: 450, y: 100, isActive: true },
              { id: "n4", data: 4, next: "n5", x: 450, y: 250 },
              { id: "n5", data: 5, next: "n2", x: 300, y: 250 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "slow", label: "SLOW", targetNodeId: "n3", color: "#16a34a" },
              { id: "fast", label: "FAST", targetNodeId: "n3", color: "#dc2626" }
            ],
            message: "Move slow = slow.next (1 step)",
            action: "traverse"
          },
          {
            lineIndex: 5,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 150, y: 100 },
              { id: "n2", data: 2, next: "n3", x: 300, y: 100 },
              { id: "n3", data: 3, next: "n4", x: 450, y: 100 },
              { id: "n4", data: 4, next: "n5", x: 450, y: 250 },
              { id: "n5", data: 5, next: "n2", x: 300, y: 250, isActive: true }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "slow", label: "SLOW", targetNodeId: "n3", color: "#16a34a" },
              { id: "fast", label: "FAST", targetNodeId: "n5", color: "#dc2626" }
            ],
            message: "Move fast = fast.next.next (2 steps)",
            action: "traverse"
          },
          {
            lineIndex: 6,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 150, y: 100 },
              { id: "n2", data: 2, next: "n3", x: 300, y: 100 },
              { id: "n3", data: 3, next: "n4", x: 450, y: 100 },
              { id: "n4", data: 4, next: "n5", x: 450, y: 250 },
              { id: "n5", data: 5, next: "n2", x: 300, y: 250, isActive: true }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "slow", label: "SLOW", targetNodeId: "n3", color: "#16a34a" },
              { id: "fast", label: "FAST", targetNodeId: "n5", color: "#dc2626" }
            ],
            message: "Check if slow == fast (false, continue)",
            condition: false,
            action: "check"
          },
          {
            lineIndex: 3,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 150, y: 100 },
              { id: "n2", data: 2, next: "n3", x: 300, y: 100 },
              { id: "n3", data: 3, next: "n4", x: 450, y: 100 },
              { id: "n4", data: 4, next: "n5", x: 450, y: 250 },
              { id: "n5", data: 5, next: "n2", x: 300, y: 250, isActive: true }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "slow", label: "SLOW", targetNodeId: "n3", color: "#16a34a" },
              { id: "fast", label: "FAST", targetNodeId: "n5", color: "#dc2626" }
            ],
            message: "Check fast != null and fast.next != null (true)",
            condition: true,
            action: "check"
          },
          {
            lineIndex: 4,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 150, y: 100 },
              { id: "n2", data: 2, next: "n3", x: 300, y: 100 },
              { id: "n3", data: 3, next: "n4", x: 450, y: 100 },
              { id: "n4", data: 4, next: "n5", x: 450, y: 250, isActive: true },
              { id: "n5", data: 5, next: "n2", x: 300, y: 250 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "slow", label: "SLOW", targetNodeId: "n4", color: "#16a34a" },
              { id: "fast", label: "FAST", targetNodeId: "n5", color: "#dc2626" }
            ],
            message: "Move slow = slow.next (1 step)",
            action: "traverse"
          },
          {
            lineIndex: 5,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 150, y: 100 },
              { id: "n2", data: 2, next: "n3", x: 300, y: 100, isActive: true },
              { id: "n3", data: 3, next: "n4", x: 450, y: 100 },
              { id: "n4", data: 4, next: "n5", x: 450, y: 250 },
              { id: "n5", data: 5, next: "n2", x: 300, y: 250 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "slow", label: "SLOW", targetNodeId: "n4", color: "#16a34a" },
              { id: "fast", label: "FAST", targetNodeId: "n2", color: "#dc2626" }
            ],
            message: "Move fast = fast.next.next (2 steps, wraps around cycle)",
            action: "traverse"
          },
          {
            lineIndex: 6,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 150, y: 100 },
              { id: "n2", data: 2, next: "n3", x: 300, y: 100, isActive: true },
              { id: "n3", data: 3, next: "n4", x: 450, y: 100 },
              { id: "n4", data: 4, next: "n5", x: 450, y: 250 },
              { id: "n5", data: 5, next: "n2", x: 300, y: 250 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "slow", label: "SLOW", targetNodeId: "n4", color: "#16a34a" },
              { id: "fast", label: "FAST", targetNodeId: "n2", color: "#dc2626" }
            ],
            message: "Check if slow == fast (false, continue)",
            condition: false,
            action: "check"
          },
          {
            lineIndex: 3,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 150, y: 100 },
              { id: "n2", data: 2, next: "n3", x: 300, y: 100, isActive: true },
              { id: "n3", data: 3, next: "n4", x: 450, y: 100 },
              { id: "n4", data: 4, next: "n5", x: 450, y: 250 },
              { id: "n5", data: 5, next: "n2", x: 300, y: 250 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "slow", label: "SLOW", targetNodeId: "n4", color: "#16a34a" },
              { id: "fast", label: "FAST", targetNodeId: "n2", color: "#dc2626" }
            ],
            message: "Check fast != null and fast.next != null (true)",
            condition: true,
            action: "check"
          },
          {
            lineIndex: 4,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 150, y: 100 },
              { id: "n2", data: 2, next: "n3", x: 300, y: 100, isActive: true },
              { id: "n3", data: 3, next: "n4", x: 450, y: 100 },
              { id: "n4", data: 4, next: "n5", x: 450, y: 250 },
              { id: "n5", data: 5, next: "n2", x: 300, y: 250 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "slow", label: "SLOW", targetNodeId: "n5", color: "#16a34a" },
              { id: "fast", label: "FAST", targetNodeId: "n2", color: "#dc2626" }
            ],
            message: "Move slow = slow.next (1 step)",
            action: "traverse"
          },
          {
            lineIndex: 5,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 150, y: 100 },
              { id: "n2", data: 2, next: "n3", x: 300, y: 100 },
              { id: "n3", data: 3, next: "n4", x: 450, y: 100 },
              { id: "n4", data: 4, next: "n5", x: 450, y: 250, isActive: true },
              { id: "n5", data: 5, next: "n2", x: 300, y: 250 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "slow", label: "SLOW", targetNodeId: "n5", color: "#16a34a" },
              { id: "fast", label: "FAST", targetNodeId: "n4", color: "#dc2626" }
            ],
            message: "Move fast = fast.next.next (2 steps)",
            action: "traverse"
          },
          {
            lineIndex: 6,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 150, y: 100 },
              { id: "n2", data: 2, next: "n3", x: 300, y: 100 },
              { id: "n3", data: 3, next: "n4", x: 450, y: 100 },
              { id: "n4", data: 4, next: "n5", x: 450, y: 250, isActive: true },
              { id: "n5", data: 5, next: "n2", x: 300, y: 250 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "slow", label: "SLOW", targetNodeId: "n5", color: "#16a34a" },
              { id: "fast", label: "FAST", targetNodeId: "n4", color: "#dc2626" }
            ],
            message: "Check if slow == fast (false, continue)",
            condition: false,
            action: "check"
          },
          {
            lineIndex: 3,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 150, y: 100 },
              { id: "n2", data: 2, next: "n3", x: 300, y: 100, isActive: true },
              { id: "n3", data: 3, next: "n4", x: 450, y: 100 },
              { id: "n4", data: 4, next: "n5", x: 450, y: 250 },
              { id: "n5", data: 5, next: "n2", x: 300, y: 250 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "slow", label: "SLOW", targetNodeId: "n2", color: "#16a34a" },
              { id: "fast", label: "FAST", targetNodeId: "n2", color: "#dc2626" }
            ],
            message: "Move pointers: slow to n2, fast to n2",
            action: "traverse"
          },
          {
            lineIndex: 6,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 150, y: 100 },
              { id: "n2", data: 2, next: "n3", x: 300, y: 100, isActive: true },
              { id: "n3", data: 3, next: "n4", x: 450, y: 100 },
              { id: "n4", data: 4, next: "n5", x: 450, y: 250 },
              { id: "n5", data: 5, next: "n2", x: 300, y: 250 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "slow", label: "SLOW", targetNodeId: "n2", color: "#16a34a" },
              { id: "fast", label: "FAST", targetNodeId: "n2", color: "#dc2626" }
            ],
            message: "Check if slow == fast (TRUE! Cycle detected)",
            condition: true,
            action: "check"
          },
          {
            lineIndex: 7,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 150, y: 100 },
              { id: "n2", data: 2, next: "n3", x: 300, y: 100, isActive: true },
              { id: "n3", data: 3, next: "n4", x: 450, y: 100 },
              { id: "n4", data: 4, next: "n5", x: 450, y: 250 },
              { id: "n5", data: 5, next: "n2", x: 300, y: 250 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "slow", label: "SLOW", targetNodeId: "n2", color: "#16a34a" },
              { id: "fast", label: "FAST", targetNodeId: "n2", color: "#dc2626" }
            ],
            message: "Return true - Cycle found! Floyd's algorithm successfully detected the loop."
          }
        ]
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
        },executionSteps: [
          {
            lineIndex: 0,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 100, y: 150 },
              { id: "n2", data: 2, next: "n3", x: 200, y: 150 },
              { id: "n3", data: 3, next: "n4", x: 300, y: 150 },
              { id: "n4", data: 4, next: "n5", x: 400, y: 150 },
              { id: "n5", data: 5, next: null, x: 500, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" }
            ],
            message: "Finding middle element using two-pointer technique"
          },
          {
            lineIndex: 1,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 100, y: 150, isActive: true },
              { id: "n2", data: 2, next: "n3", x: 200, y: 150 },
              { id: "n3", data: 3, next: "n4", x: 300, y: 150 },
              { id: "n4", data: 4, next: "n5", x: 400, y: 150 },
              { id: "n5", data: 5, next: null, x: 500, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "slow", label: "SLOW", targetNodeId: "n1", color: "#16a34a" }
            ],
            message: "Initialize slow = head",
            action: "assign"
          },
          {
            lineIndex: 2,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 100, y: 150, isActive: true },
              { id: "n2", data: 2, next: "n3", x: 200, y: 150 },
              { id: "n3", data: 3, next: "n4", x: 300, y: 150 },
              { id: "n4", data: 4, next: "n5", x: 400, y: 150 },
              { id: "n5", data: 5, next: null, x: 500, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "slow", label: "SLOW", targetNodeId: "n1", color: "#16a34a" },
              { id: "fast", label: "FAST", targetNodeId: "n1", color: "#dc2626" }
            ],
            message: "Initialize fast = head",
            action: "assign"
          },
          {
            lineIndex: 3,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 100, y: 150, isActive: true },
              { id: "n2", data: 2, next: "n3", x: 200, y: 150 },
              { id: "n3", data: 3, next: "n4", x: 300, y: 150 },
              { id: "n4", data: 4, next: "n5", x: 400, y: 150 },
              { id: "n5", data: 5, next: null, x: 500, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "slow", label: "SLOW", targetNodeId: "n1", color: "#16a34a" },
              { id: "fast", label: "FAST", targetNodeId: "n1", color: "#dc2626" }
            ],
            message: "Check fast != null and fast.next != null (true)",
            condition: true,
            action: "check"
          },
          {
            lineIndex: 4,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 100, y: 150 },
              { id: "n2", data: 2, next: "n3", x: 200, y: 150, isActive: true },
              { id: "n3", data: 3, next: "n4", x: 300, y: 150 },
              { id: "n4", data: 4, next: "n5", x: 400, y: 150 },
              { id: "n5", data: 5, next: null, x: 500, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "slow", label: "SLOW", targetNodeId: "n2", color: "#16a34a" },
              { id: "fast", label: "FAST", targetNodeId: "n1", color: "#dc2626" }
            ],
            message: "Move slow = slow.next (1 step)",
            action: "traverse"
          },
          {
            lineIndex: 5,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 100, y: 150 },
              { id: "n2", data: 2, next: "n3", x: 200, y: 150 },
              { id: "n3", data: 3, next: "n4", x: 300, y: 150, isActive: true },
              { id: "n4", data: 4, next: "n5", x: 400, y: 150 },
              { id: "n5", data: 5, next: null, x: 500, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "slow", label: "SLOW", targetNodeId: "n2", color: "#16a34a" },
              { id: "fast", label: "FAST", targetNodeId: "n3", color: "#dc2626" }
            ],
            message: "Move fast = fast.next.next (2 steps)",
            action: "traverse"
          },
          {
            lineIndex: 3,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 100, y: 150 },
              { id: "n2", data: 2, next: "n3", x: 200, y: 150 },
              { id: "n3", data: 3, next: "n4", x: 300, y: 150, isActive: true },
              { id: "n4", data: 4, next: "n5", x: 400, y: 150 },
              { id: "n5", data: 5, next: null, x: 500, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "slow", label: "SLOW", targetNodeId: "n2", color: "#16a34a" },
              { id: "fast", label: "FAST", targetNodeId: "n3", color: "#dc2626" }
            ],
            message: "Check fast != null and fast.next != null (true)",
            condition: true,
            action: "check"
          },
          {
            lineIndex: 4,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 100, y: 150 },
              { id: "n2", data: 2, next: "n3", x: 200, y: 150 },
              { id: "n3", data: 3, next: "n4", x: 300, y: 150, isActive: true },
              { id: "n4", data: 4, next: "n5", x: 400, y: 150 },
              { id: "n5", data: 5, next: null, x: 500, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "slow", label: "SLOW", targetNodeId: "n3", color: "#16a34a" },
              { id: "fast", label: "FAST", targetNodeId: "n3", color: "#dc2626" }
            ],
            message: "Move slow = slow.next (1 step)",
            action: "traverse"
          },
          {
            lineIndex: 5,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 100, y: 150 },
              { id: "n2", data: 2, next: "n3", x: 200, y: 150 },
              { id: "n3", data: 3, next: "n4", x: 300, y: 150, isActive: true },
              { id: "n4", data: 4, next: "n5", x: 400, y: 150 },
              { id: "n5", data: 5, next: null, x: 500, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "slow", label: "SLOW", targetNodeId: "n3", color: "#16a34a" },
              { id: "fast", label: "FAST", targetNodeId: "n5", color: "#dc2626" }
            ],
            message: "Move fast = fast.next.next (2 steps)",
            action: "traverse"
          },
          {
            lineIndex: 3,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 100, y: 150 },
              { id: "n2", data: 2, next: "n3", x: 200, y: 150 },
              { id: "n3", data: 3, next: "n4", x: 300, y: 150, isActive: true },
              { id: "n4", data: 4, next: "n5", x: 400, y: 150 },
              { id: "n5", data: 5, next: null, x: 500, y: 150 }
            ],
            pointers: [
              { id: "head", label: "HEAD", targetNodeId: "n1", color: "#2563eb" },
              { id: "slow", label: "SLOW", targetNodeId: "n3", color: "#16a34a" },
              { id: "fast", label: "FAST", targetNodeId: "n5", color: "#dc2626" }
            ],
            message: "Check fast != null and fast.next != null (false, fast.next is null)",
            condition: false,
            action: "check"
          },
          {
            lineIndex: 6,
            nodes: [
              { id: "n1", data: 1, next: "n2", x: 100, y: 150 },
              { id: "n2", data: 2, next: "n3", x: 200, y: 150 },
              { id: "n3", data: 3, next: "n4", x: 300, y: 150, isActive: true },
              { id: "n4", data: 4, next: "n5", x: 400, y: 150 },
              { id: "n5", data: 5, next: null, x: 500, y: 150 }
            ],
            pointers: [
              { id: "middle", label: "MIDDLE", targetNodeId: "n3", color: "#16a34a" }
            ],
            message: "Return slow (middle element found: node 3)"
          }
        ],
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
          "function Merging(list1, list2):",
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
          message: "Comparing 2 and 3. Since 2 ≤ 3, we add node 2 to the Mergingd list."
        },
        executionSteps: [
          {
            lineIndex: 0,
            nodes: [
              { id: "l1n1", data: 1, next: "l1n2", x: 100, y: 80 },
              { id: "l1n2", data: 3, next: null, x: 200, y: 80 },
              
              { id: "l2n1", data: 2, next: "l2n2", x: 100, y: 180 },
              { id: "l2n2", data: 4, next: null, x: 200, y: 180 }
            ],
            pointers: [
              { id: "list1", label: "L1", targetNodeId: "l1n1", color: "#2563eb" },
              { id: "list2", label: "L2", targetNodeId: "l2n1", color: "#16a34a" }
            ],
            message: "Starting merge of two sorted lists: [1,3] and [2,4]"
          },
          {
            lineIndex: 1,
            nodes: [
              { id: "l1n1", data: 1, next: "l1n2", x: 100, y: 80 },
              { id: "l1n2", data: 3, next: null, x: 200, y: 80 },
              
              { id: "l2n1", data: 2, next: "l2n2", x: 100, y: 180 },
              { id: "l2n2", data: 4, next: null, x: 200, y: 180 },
              
              { id: "dummy", data: 0, next: null, x: 350, y: 130, isTarget: true }
            ],
            pointers: [
              { id: "list1", label: "L1", targetNodeId: "l1n1", color: "#2563eb" },
              { id: "list2", label: "L2", targetNodeId: "l2n1", color: "#16a34a" },
              { id: "dummy", label: "DUMMY", targetNodeId: "dummy", color: "#d97706" }
            ],
            message: "Create dummy node to simplify merging logic",
            action: "insert"
          },
          {
            lineIndex: 2,
            nodes: [
              { id: "l1n1", data: 1, next: "l1n2", x: 100, y: 80 },
              { id: "l1n2", data: 3, next: null, x: 200, y: 80 },
              
              { id: "l2n1", data: 2, next: "l2n2", x: 100, y: 180 },
              { id: "l2n2", data: 4, next: null, x: 200, y: 180 },
              
              { id: "dummy", data: 0, next: null, x: 350, y: 130, isTarget: true }
            ],
            pointers: [
              { id: "list1", label: "L1", targetNodeId: "l1n1", color: "#2563eb" },
              { id: "list2", label: "L2", targetNodeId: "l2n1", color: "#16a34a" },
              { id: "dummy", label: "DUMMY", targetNodeId: "dummy", color: "#d97706" },
              { id: "current", label: "CURR", targetNodeId: "dummy", color: "#dc2626" }
            ],
            message: "Set current = dummy",
            action: "assign"
          },
          {
            lineIndex: 3,
            nodes: [
              { id: "l1n1", data: 1, next: "l1n2", x: 100, y: 80, isActive: true },
              { id: "l1n2", data: 3, next: null, x: 200, y: 80 },
              
              { id: "l2n1", data: 2, next: "l2n2", x: 100, y: 180, isActive: true },
              { id: "l2n2", data: 4, next: null, x: 200, y: 180 },
              
              { id: "dummy", data: 0, next: null, x: 350, y: 130, isTarget: true }
            ],
            pointers: [
              { id: "list1", label: "L1", targetNodeId: "l1n1", color: "#2563eb" },
              { id: "list2", label: "L2", targetNodeId: "l2n1", color: "#16a34a" },
              { id: "dummy", label: "DUMMY", targetNodeId: "dummy", color: "#d97706" },
              { id: "current", label: "CURR", targetNodeId: "dummy", color: "#dc2626" }
            ],
            message: "Check while list1 != null and list2 != null (true)",
            condition: true,
            action: "check"
          },
          {
            lineIndex: 4,
            nodes: [
              { id: "l1n1", data: 1, next: "l1n2", x: 100, y: 80, isActive: true },
              { id: "l1n2", data: 3, next: null, x: 200, y: 80 },
              
              { id: "l2n1", data: 2, next: "l2n2", x: 100, y: 180, isActive: true },
              { id: "l2n2", data: 4, next: null, x: 200, y: 180 },
              
              { id: "dummy", data: 0, next: null, x: 350, y: 130, isTarget: true }
            ],
            pointers: [
              { id: "list1", label: "L1", targetNodeId: "l1n1", color: "#2563eb" },
              { id: "list2", label: "L2", targetNodeId: "l2n1", color: "#16a34a" },
              { id: "dummy", label: "DUMMY", targetNodeId: "dummy", color: "#d97706" },
              { id: "current", label: "CURR", targetNodeId: "dummy", color: "#dc2626" }
            ],
            message: "Compare list1.data <= list2.data (1 <= 2? true)",
            condition: true,
            action: "check"
          },
          {
            lineIndex: 5,
            nodes: [
              { id: "l1n1", data: 1, next: "l1n2", x: 100, y: 80, isActive: true },
              { id: "l1n2", data: 3, next: null, x: 200, y: 80 },
              
              { id: "l2n1", data: 2, next: "l2n2", x: 100, y: 180 },
              { id: "l2n2", data: 4, next: null, x: 200, y: 180 },
              
              { id: "dummy", data: 0, next: "l1n1", x: 350, y: 130, isTarget: true }
            ],
            pointers: [
              { id: "list1", label: "L1", targetNodeId: "l1n1", color: "#2563eb" },
              { id: "list2", label: "L2", targetNodeId: "l2n1", color: "#16a34a" },
              { id: "dummy", label: "DUMMY", targetNodeId: "dummy", color: "#d97706" },
              { id: "current", label: "CURR", targetNodeId: "dummy", color: "#dc2626" }
            ],
            message: "Set current.next = list1 (add node 1 to merged list)",
            action: "assign"
          },
          {
            lineIndex: 6,
            nodes: [
              { id: "l1n1", data: 1, next: "l1n2", x: 100, y: 80 },
              { id: "l1n2", data: 3, next: null, x: 200, y: 80, isActive: true },
              
              { id: "l2n1", data: 2, next: "l2n2", x: 100, y: 180 },
              { id: "l2n2", data: 4, next: null, x: 200, y: 180 },
              
              { id: "dummy", data: 0, next: "l1n1", x: 350, y: 130 }
            ],
            pointers: [
              { id: "list1", label: "L1", targetNodeId: "l1n2", color: "#2563eb" },
              { id: "list2", label: "L2", targetNodeId: "l2n1", color: "#16a34a" },
              { id: "dummy", label: "DUMMY", targetNodeId: "dummy", color: "#d97706" },
              { id: "current", label: "CURR", targetNodeId: "dummy", color: "#dc2626" }
            ],
            message: "Move list1 = list1.next",
            action: "traverse"
          },
          {
            lineIndex: 9,
            nodes: [
              { id: "l1n1", data: 1, next: "l1n2", x: 100, y: 80, isActive: true },
              { id: "l1n2", data: 3, next: null, x: 200, y: 80 },
              
              { id: "l2n1", data: 2, next: "l2n2", x: 100, y: 180 },
              { id: "l2n2", data: 4, next: null, x: 200, y: 180 },
              
              { id: "dummy", data: 0, next: "l1n1", x: 350, y: 130 }
            ],
            pointers: [
              { id: "list1", label: "L1", targetNodeId: "l1n2", color: "#2563eb" },
              { id: "list2", label: "L2", targetNodeId: "l2n1", color: "#16a34a" },
              { id: "dummy", label: "DUMMY", targetNodeId: "dummy", color: "#d97706" },
              { id: "current", label: "CURR", targetNodeId: "l1n1", color: "#dc2626" }
            ],
            message: "Move current = current.next",
            action: "traverse"
          },
          {
            lineIndex: 3,
            nodes: [
              { id: "l1n1", data: 1, next: "l1n2", x: 100, y: 80 },
              { id: "l1n2", data: 3, next: null, x: 200, y: 80, isActive: true },
              
              { id: "l2n1", data: 2, next: "l2n2", x: 100, y: 180, isActive: true },
              { id: "l2n2", data: 4, next: null, x: 200, y: 180 },
              
              { id: "dummy", data: 0, next: "l1n1", x: 350, y: 130 }
            ],
            pointers: [
              { id: "list1", label: "L1", targetNodeId: "l1n2", color: "#2563eb" },
              { id: "list2", label: "L2", targetNodeId: "l2n1", color: "#16a34a" },
              { id: "dummy", label: "DUMMY", targetNodeId: "dummy", color: "#d97706" },
              { id: "current", label: "CURR", targetNodeId: "l1n1", color: "#dc2626" }
            ],
            message: "Check while list1 != null and list2 != null (true)",
            condition: true,
            action: "check"
          },
          {
            lineIndex: 4,
            nodes: [
              { id: "l1n1", data: 1, next: "l1n2", x: 100, y: 80 },
              { id: "l1n2", data: 3, next: null, x: 200, y: 80, isActive: true },
              
              { id: "l2n1", data: 2, next: "l2n2", x: 100, y: 180, isActive: true },
              { id: "l2n2", data: 4, next: null, x: 200, y: 180 },
              
              { id: "dummy", data: 0, next: "l1n1", x: 350, y: 130 }
            ],
            pointers: [
              { id: "list1", label: "L1", targetNodeId: "l1n2", color: "#2563eb" },
              { id: "list2", label: "L2", targetNodeId: "l2n1", color: "#16a34a" },
              { id: "dummy", label: "DUMMY", targetNodeId: "dummy", color: "#d97706" },
              { id: "current", label: "CURR", targetNodeId: "l1n1", color: "#dc2626" }
            ],
            message: "Compare list1.data <= list2.data (3 <= 2? false)",
            condition: false,
            action: "check"
          },
          {
            lineIndex: 7,
            nodes: [
              { id: "l1n1", data: 1, next: "l2n1", x: 100, y: 80 },
              { id: "l1n2", data: 3, next: null, x: 200, y: 80 },
              
              { id: "l2n1", data: 2, next: "l2n2", x: 100, y: 180, isActive: true },
              { id: "l2n2", data: 4, next: null, x: 200, y: 180 },
              
              { id: "dummy", data: 0, next: "l1n1", x: 350, y: 130 }
            ],
            pointers: [
              { id: "list1", label: "L1", targetNodeId: "l1n2", color: "#2563eb" },
              { id: "list2", label: "L2", targetNodeId: "l2n1", color: "#16a34a" },
              { id: "dummy", label: "DUMMY", targetNodeId: "dummy", color: "#d97706" },
              { id: "current", label: "CURR", targetNodeId: "l1n1", color: "#dc2626" }
            ],
            message: "Set current.next = list2 (add node 2 to merged list)",
            action: "assign"
          },
          {
            lineIndex: 8,
            nodes: [
              { id: "l1n1", data: 1, next: "l2n1", x: 100, y: 80 },
              { id: "l1n2", data: 3, next: null, x: 200, y: 80 },
              
              { id: "l2n1", data: 2, next: "l2n2", x: 100, y: 180 },
              { id: "l2n2", data: 4, next: null, x: 200, y: 180, isActive: true },
              
              { id: "dummy", data: 0, next: "l1n1", x: 350, y: 130 }
            ],
            pointers: [
              { id: "list1", label: "L1", targetNodeId: "l1n2", color: "#2563eb" },
              { id: "list2", label: "L2", targetNodeId: "l2n2", color: "#16a34a" },
              { id: "dummy", label: "DUMMY", targetNodeId: "dummy", color: "#d97706" },
              { id: "current", label: "CURR", targetNodeId: "l1n1", color: "#dc2626" }
            ],
            message: "Move list2 = list2.next",
            action: "traverse"
          },
          {
            lineIndex: 9,
            nodes: [
              { id: "l1n1", data: 1, next: "l2n1", x: 100, y: 80 },
              { id: "l1n2", data: 3, next: null, x: 200, y: 80 },
              
              { id: "l2n1", data: 2, next: "l2n2", x: 100, y: 180, isActive: true },
              { id: "l2n2", data: 4, next: null, x: 200, y: 180 },
              
              { id: "dummy", data: 0, next: "l1n1", x: 350, y: 130 }
            ],
            pointers: [
              { id: "list1", label: "L1", targetNodeId: "l1n2", color: "#2563eb" },
              { id: "list2", label: "L2", targetNodeId: "l2n2", color: "#16a34a" },
              { id: "dummy", label: "DUMMY", targetNodeId: "dummy", color: "#d97706" },
              { id: "current", label: "CURR", targetNodeId: "l2n1", color: "#dc2626" }
            ],
            message: "Move current = current.next",
            action: "traverse"
          },
          {
            lineIndex: 3,
            nodes: [
              { id: "l1n1", data: 1, next: "l2n1", x: 100, y: 80 },
              { id: "l1n2", data: 3, next: null, x: 200, y: 80, isActive: true },
              
              { id: "l2n1", data: 2, next: "l2n2", x: 100, y: 180 },
              { id: "l2n2", data: 4, next: null, x: 200, y: 180, isActive: true },
              
              { id: "dummy", data: 0, next: "l1n1", x: 350, y: 130 }
            ],
            pointers: [
              { id: "list1", label: "L1", targetNodeId: "l1n2", color: "#2563eb" },
              { id: "list2", label: "L2", targetNodeId: "l2n2", color: "#16a34a" },
              { id: "dummy", label: "DUMMY", targetNodeId: "dummy", color: "#d97706" },
              { id: "current", label: "CURR", targetNodeId: "l2n1", color: "#dc2626" }
            ],
            message: "Check while list1 != null and list2 != null (true)",
            condition: true,
            action: "check"
          },
          {
            lineIndex: 4,
            nodes: [
              { id: "l1n1", data: 1, next: "l2n1", x: 100, y: 80 },
              { id: "l1n2", data: 3, next: null, x: 200, y: 80, isActive: true },
              
              { id: "l2n1", data: 2, next: "l2n2", x: 100, y: 180 },
              { id: "l2n2", data: 4, next: null, x: 200, y: 180, isActive: true },
              
              { id: "dummy", data: 0, next: "l1n1", x: 350, y: 130 }
            ],
            pointers: [
              { id: "list1", label: "L1", targetNodeId: "l1n2", color: "#2563eb" },
              { id: "list2", label: "L2", targetNodeId: "l2n2", color: "#16a34a" },
              { id: "dummy", label: "DUMMY", targetNodeId: "dummy", color: "#d97706" },
              { id: "current", label: "CURR", targetNodeId: "l2n1", color: "#dc2626" }
            ],
            message: "Compare list1.data <= list2.data (3 <= 4? true)",
            condition: true,
            action: "check"
          },
          {
            lineIndex: 5,
            nodes: [
              { id: "l1n1", data: 1, next: "l2n1", x: 100, y: 80 },
              { id: "l1n2", data: 3, next: null, x: 200, y: 80, isActive: true },
              
              { id: "l2n1", data: 2, next: "l1n2", x: 100, y: 180 },
              { id: "l2n2", data: 4, next: null, x: 200, y: 180 },
              
              { id: "dummy", data: 0, next: "l1n1", x: 350, y: 130 }
            ],
            pointers: [
              { id: "list1", label: "L1", targetNodeId: "l1n2", color: "#2563eb" },
              { id: "list2", label: "L2", targetNodeId: "l2n2", color: "#16a34a" },
              { id: "dummy", label: "DUMMY", targetNodeId: "dummy", color: "#d97706" },
              { id: "current", label: "CURR", targetNodeId: "l2n1", color: "#dc2626" }
            ],
            message: "Set current.next = list1 (add node 3 to merged list)",
            action: "assign"
          },
          {
            lineIndex: 6,
            nodes: [
              { id: "l1n1", data: 1, next: "l2n1", x: 100, y: 80 },
              { id: "l1n2", data: 3, next: null, x: 200, y: 80 },
              
              { id: "l2n1", data: 2, next: "l1n2", x: 100, y: 180 },
              { id: "l2n2", data: 4, next: null, x: 200, y: 180, isActive: true },
              
              { id: "dummy", data: 0, next: "l1n1", x: 350, y: 130 }
            ],
            pointers: [
              { id: "list1", label: "L1", targetNodeId: null, color: "#2563eb" },
              { id: "list2", label: "L2", targetNodeId: "l2n2", color: "#16a34a" },
              { id: "dummy", label: "DUMMY", targetNodeId: "dummy", color: "#d97706" },
              { id: "current", label: "CURR", targetNodeId: "l2n1", color: "#dc2626" }
            ],
            message: "Move list1 = list1.next (null)",
            action: "traverse"
          },
          {
            lineIndex: 9,
            nodes: [
              { id: "l1n1", data: 1, next: "l2n1", x: 100, y: 80 },
              { id: "l1n2", data: 3, next: null, x: 200, y: 80, isActive: true },
              
              { id: "l2n1", data: 2, next: "l1n2", x: 100, y: 180 },
              { id: "l2n2", data: 4, next: null, x: 200, y: 180 },
              
              { id: "dummy", data: 0, next: "l1n1", x: 350, y: 130 }
            ],
            pointers: [
              { id: "list1", label: "L1", targetNodeId: null, color: "#2563eb" },
              { id: "list2", label: "L2", targetNodeId: "l2n2", color: "#16a34a" },
              { id: "dummy", label: "DUMMY", targetNodeId: "dummy", color: "#d97706" },
              { id: "current", label: "CURR", targetNodeId: "l1n2", color: "#dc2626" }
            ],
            message: "Move current = current.next",
            action: "traverse"
          },
          {
            lineIndex: 3,
            nodes: [
              { id: "l1n1", data: 1, next: "l2n1", x: 100, y: 80 },
              { id: "l1n2", data: 3, next: null, x: 200, y: 80 },
              
              { id: "l2n1", data: 2, next: "l1n2", x: 100, y: 180 },
              { id: "l2n2", data: 4, next: null, x: 200, y: 180, isActive: true },
              
              { id: "dummy", data: 0, next: "l1n1", x: 350, y: 130 }
            ],
            pointers: [
              { id: "list1", label: "L1", targetNodeId: null, color: "#2563eb" },
              { id: "list2", label: "L2", targetNodeId: "l2n2", color: "#16a34a" },
              { id: "dummy", label: "DUMMY", targetNodeId: "dummy", color: "#d97706" },
              { id: "current", label: "CURR", targetNodeId: "l1n2", color: "#dc2626" }
            ],
            message: "Check while list1 != null and list2 != null (false, list1 is null)",
            condition: false,
            action: "check"
          },
          {
            lineIndex: 10,
            nodes: [
              { id: "l1n1", data: 1, next: "l2n1", x: 100, y: 80 },
              { id: "l1n2", data: 3, next: "l2n2", x: 200, y: 80 },
              
              { id: "l2n1", data: 2, next: "l1n2", x: 100, y: 180 },
              { id: "l2n2", data: 4, next: null, x: 200, y: 180 },
              
              { id: "dummy", data: 0, next: "l1n1", x: 350, y: 130 }
            ],
            pointers: [
              { id: "merged", label: "MERGED", targetNodeId: "l1n1", color: "#16a34a" }
            ],
            message: "Append remaining nodes and return dummy.next. Merged list: 1->2->3->4"
          }
        ]
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