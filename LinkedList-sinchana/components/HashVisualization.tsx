// "use client";

// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";

// interface HashNode {
//   id: string;
//   key: string;
//   value?: any;
//   next?: string | null;
//   x: number;
//   y: number;
//   isActive?: boolean;
//   isTarget?: boolean;
//   isCollision?: boolean;
// }

// interface HashSlot {
//   id: string;
//   index: number;
//   nodes: HashNode[];
//   x: number;
//   y: number;
//   isActive?: boolean;
// }

// interface HashVisualizationProps {
//   visualization: {
//     slots: HashSlot[];
//     activeSlotIndex?: number;
//     message?: string;
//     outputText?: string;
//     hashValue?: number;
//   };
// }

// export default function HashVisualization({ visualization }: HashVisualizationProps) {
//   const { slots, activeSlotIndex, message, hashValue } = visualization;

//   const svgWidth = 800;
//   const svgHeight = 500;
//   const slotWidth = 120;
//   const slotHeight = 60;
//   const nodeWidth = 100;
//   const nodeHeight = 40;

//   const slotVariants = {
//     initial: { scale: 0.8, opacity: 0 },
//     animate: { scale: 1, opacity: 1 },
//     exit: { scale: 0.8, opacity: 0 },
//   };

//   const nodeVariants = {
//     initial: { x: -20, opacity: 0 },
//     animate: { x: 0, opacity: 1 },
//     exit: { x: 20, opacity: 0 },
//   };

//   return (
//     <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 overflow-hidden">
//       <svg
//         width={svgWidth}
//         height={svgHeight}
//         viewBox={`0 0 ${svgWidth} ${svgHeight}`}
//         className="w-full h-auto max-w-full"
//         preserveAspectRatio="xMidYMid meet"
//       >
//         <defs>
//           <marker
//             id="hash-arrowhead"
//             markerWidth="8"
//             markerHeight="6"
//             refX="7"
//             refY="3"
//             orient="auto"
//           >
//             <polygon points="0 0, 8 3, 0 6" fill="#374151" />
//           </marker>
//           <marker
//             id="hash-arrowhead-collision"
//             markerWidth="8"
//             markerHeight="6"
//             refX="7"
//             refY="3"
//             orient="auto"
//           >
//             <polygon points="0 0, 8 3, 0 6" fill="#dc2626" />
//           </marker>
//         </defs>

//         {/* Hash Table Slots */}
//         <AnimatePresence>
//           {slots.map((slot, slotIdx) => {
//             const isActive = slot.isActive || slot.index === activeSlotIndex;
//             const hasNodes = slot.nodes && slot.nodes.length > 0;

//             return (
//               <motion.g
//                 key={slot.id}
//                 variants={slotVariants}
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 transition={{ duration: 0.3, delay: slotIdx * 0.05 }}
//               >
//                 {/* Slot container/bucket */}
//                 <rect
//                   x={slot.x}
//                   y={slot.y}
//                   width={slotWidth}
//                   height={slotHeight}
//                   fill={isActive ? "#dbeafe" : "white"}
//                   stroke={isActive ? "#3b82f6" : "#9ca3af"}
//                   strokeWidth={isActive ? "3" : "2"}
//                   rx="4"
//                 />

//                 {/* Slot index label */}
//                 <text
//                   x={slot.x + 15}
//                   y={slot.y + 35}
//                   fill="#374151"
//                   fontSize="14"
//                   fontWeight="700"
//                   fontFamily="monospace"
//                 >
//                   [{slot.index}]
//                 </text>

//                 {/* Empty indicator */}
//                 {!hasNodes && (
//                   <text
//                     x={slot.x + slotWidth / 2 + 10}
//                     y={slot.y + 35}
//                     fill="#9ca3af"
//                     fontSize="12"
//                     fontFamily="monospace"
//                     textAnchor="middle"
//                   >
//                     empty
//                   </text>
//                 )}

//                 {/* Render nodes (chained items) within this slot */}
//                 <AnimatePresence>
//                   {slot.nodes.map((node, nodeIdx) => {
//                     const nodeX = slot.x + slotWidth + 20 + nodeIdx * (nodeWidth + 10);
//                     const nodeY = slot.y + (slotHeight - nodeHeight) / 2;

//                     return (
//                       <motion.g
//                         key={node.id}
//                         variants={nodeVariants}
//                         initial="initial"
//                         animate="animate"
//                         exit="exit"
//                         transition={{ duration: 0.3, delay: nodeIdx * 0.1 }}
//                       >
//                         {/* Arrow from slot to first node, or between chained nodes */}
//                         {nodeIdx === 0 ? (
//                           <motion.line
//                             x1={slot.x + slotWidth}
//                             y1={slot.y + slotHeight / 2}
//                             x2={nodeX}
//                             y2={nodeY + nodeHeight / 2}
//                             stroke={node.isCollision ? "#dc2626" : "#374151"}
//                             strokeWidth="2"
//                             markerEnd={
//                               node.isCollision
//                                 ? "url(#hash-arrowhead-collision)"
//                                 : "url(#hash-arrowhead)"
//                             }
//                             initial={{ pathLength: 0 }}
//                             animate={{ pathLength: 1 }}
//                             transition={{ duration: 0.5 }}
//                           />
//                         ) : (
//                           <motion.line
//                             x1={
//                               slot.x +
//                               slotWidth +
//                               20 +
//                               (nodeIdx - 1) * (nodeWidth + 10) +
//                               nodeWidth
//                             }
//                             y1={nodeY + nodeHeight / 2}
//                             x2={nodeX}
//                             y2={nodeY + nodeHeight / 2}
//                             stroke={node.isCollision ? "#dc2626" : "#374151"}
//                             strokeWidth="2"
//                             markerEnd={
//                               node.isCollision
//                                 ? "url(#hash-arrowhead-collision)"
//                                 : "url(#hash-arrowhead)"
//                             }
//                             initial={{ pathLength: 0 }}
//                             animate={{ pathLength: 1 }}
//                             transition={{ duration: 0.5 }}
//                           />
//                         )}

//                         {/* Node box */}
//                         <rect
//                           x={nodeX}
//                           y={nodeY}
//                           width={nodeWidth}
//                           height={nodeHeight}
//                           fill={
//                             node.isActive
//                               ? "#dbeafe"
//                               : node.isTarget
//                               ? "#dcfce7"
//                               : node.isCollision
//                               ? "#fee2e2"
//                               : "white"
//                           }
//                           stroke={
//                             node.isActive
//                               ? "#3b82f6"
//                               : node.isTarget
//                               ? "#16a34a"
//                               : node.isCollision
//                               ? "#dc2626"
//                               : "#374151"
//                           }
//                           strokeWidth={
//                             node.isActive || node.isTarget || node.isCollision
//                               ? "2.5"
//                               : "2"
//                           }
//                           rx="4"
//                         />

//                         {/* Node key */}
//                         <text
//                           x={nodeX + nodeWidth / 2}
//                           y={nodeY + nodeHeight / 2 - 5}
//                           textAnchor="middle"
//                           fill="#1f2937"
//                           fontSize="12"
//                           fontWeight="600"
//                           fontFamily="monospace"
//                         >
//                           {node.key}
//                         </text>

//                         {/* Node value (if present) */}
//                         {node.value !== undefined && (
//                           <text
//                             x={nodeX + nodeWidth / 2}
//                             y={nodeY + nodeHeight / 2 + 10}
//                             textAnchor="middle"
//                             fill="#6b7280"
//                             fontSize="10"
//                             fontFamily="monospace"
//                           >
//                             {String(node.value).substring(0, 12)}
//                           </text>
//                         )}
//                       </motion.g>
//                     );
//                   })}
//                 </AnimatePresence>
//               </motion.g>
//             );
//           })}
//         </AnimatePresence>

//         {/* Hash value indicator (if provided) */}
//         {hashValue !== undefined && (
//           <motion.g
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4 }}
//           >
//             <rect
//               x={svgWidth - 120}
//               y={20}
//               width={100}
//               height={30}
//               fill="#f59e0b"
//               rx="4"
//             />
//             <text
//               x={svgWidth - 70}
//               y={40}
//               textAnchor="middle"
//               fill="white"
//               fontSize="12"
//               fontWeight="600"
//               fontFamily="monospace"
//             >
//               hash = {hashValue}
//             </text>
//           </motion.g>
//         )}
//       </svg>

//       {/* Message display below visualization */}
//       {message && (
//         <motion.div
//           className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg"
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3 }}
//         >
//           <p className="text-sm text-blue-900 font-medium">{message}</p>
//         </motion.div>
//       )}
//     </div>
//   );
// }

"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface HashNode {
  id: string;
  key: string;
  value?: any;
  next?: string | null;
  x: number;
  y: number;
  isActive?: boolean;
  isTarget?: boolean;
  isCollision?: boolean;
}

export interface HashSlot {
  id: string;
  index: number;
  nodes: HashNode[];
  x: number;
  y: number;
  isActive?: boolean;
}

export interface HashVisualizationProps {
  visualization: {
    slots: HashSlot[];
    activeSlotIndex?: number;
    message?: string;
    outputText?: string;
    hashValue?: number;
  };
}

export default function HashVisualization({ visualization }: HashVisualizationProps) {
  const { slots, activeSlotIndex, message, hashValue } = visualization;

  const svgWidth = 800;
  const svgHeight = 500;
  const slotWidth = 120;
  const slotHeight = 60;
  const nodeWidth = 100;
  const nodeHeight = 40;

  const slotVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
  };

  const nodeVariants = {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 },
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 overflow-hidden">
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-auto max-w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <marker
            id="hash-arrowhead"
            markerWidth="8"
            markerHeight="6"
            refX="7"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill="#374151" />
          </marker>
          <marker
            id="hash-arrowhead-collision"
            markerWidth="8"
            markerHeight="6"
            refX="7"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill="#dc2626" />
          </marker>
        </defs>

        {/* Hash Table Slots */}
        <AnimatePresence>
          {slots.map((slot, slotIdx) => {
            const isActive = slot.isActive || slot.index === activeSlotIndex;
            const hasNodes = slot.nodes && slot.nodes.length > 0;

            return (
              <motion.g
                key={slot.id}
                variants={slotVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, delay: slotIdx * 0.05 }}
              >
                {/* Slot container/bucket */}
                <rect
                  x={slot.x}
                  y={slot.y}
                  width={slotWidth}
                  height={slotHeight}
                  fill={isActive ? "#dbeafe" : "white"}
                  stroke={isActive ? "#3b82f6" : "#9ca3af"}
                  strokeWidth={isActive ? "3" : "2"}
                  rx="4"
                />

                {/* Slot index label */}
                <text
                  x={slot.x + 15}
                  y={slot.y + 35}
                  fill="#374151"
                  fontSize="14"
                  fontWeight="700"
                  fontFamily="monospace"
                >
                  [{slot.index}]
                </text>

                {/* Empty indicator */}
                {!hasNodes && (
                  <text
                    x={slot.x + slotWidth / 2 + 10}
                    y={slot.y + 35}
                    fill="#9ca3af"
                    fontSize="12"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    empty
                  </text>
                )}

                {/* Render nodes (chained items) */}
                <AnimatePresence>
                  {slot.nodes.map((node, nodeIdx) => {
                    const nodeX = slot.x + slotWidth + 20 + nodeIdx * (nodeWidth + 10);
                    const nodeY = slot.y + (slotHeight - nodeHeight) / 2;

                    return (
                      <motion.g
                        key={node.id}
                        variants={nodeVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3, delay: nodeIdx * 0.1 }}
                      >
                        {/* Arrows */}
                        {nodeIdx === 0 ? (
                          <motion.line
                            x1={slot.x + slotWidth}
                            y1={slot.y + slotHeight / 2}
                            x2={nodeX}
                            y2={nodeY + nodeHeight / 2}
                            stroke={node.isCollision ? "#dc2626" : "#374151"}
                            strokeWidth="2"
                            markerEnd={
                              node.isCollision
                                ? "url(#hash-arrowhead-collision)"
                                : "url(#hash-arrowhead)"
                            }
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5 }}
                          />
                        ) : (
                          <motion.line
                            x1={
                              slot.x + slotWidth + 20 + (nodeIdx - 1) * (nodeWidth + 10) + nodeWidth
                            }
                            y1={nodeY + nodeHeight / 2}
                            x2={nodeX}
                            y2={nodeY + nodeHeight / 2}
                            stroke={node.isCollision ? "#dc2626" : "#374151"}
                            strokeWidth="2"
                            markerEnd={
                              node.isCollision
                                ? "url(#hash-arrowhead-collision)"
                                : "url(#hash-arrowhead)"
                            }
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5 }}
                          />
                        )}

                        {/* Node box */}
                        <rect
                          x={nodeX}
                          y={nodeY}
                          width={nodeWidth}
                          height={nodeHeight}
                          fill={
                            node.isActive
                              ? "#dbeafe"
                              : node.isTarget
                              ? "#dcfce7"
                              : node.isCollision
                              ? "#fee2e2"
                              : "white"
                          }
                          stroke={
                            node.isActive
                              ? "#3b82f6"
                              : node.isTarget
                              ? "#16a34a"
                              : node.isCollision
                              ? "#dc2626"
                              : "#374151"
                          }
                          strokeWidth={node.isActive || node.isTarget || node.isCollision ? 2.5 : 2}
                          rx="4"
                        />

                        {/* Node key */}
                        <text
                          x={nodeX + nodeWidth / 2}
                          y={nodeY + nodeHeight / 2 - 5}
                          textAnchor="middle"
                          fill="#1f2937"
                          fontSize="12"
                          fontWeight="600"
                          fontFamily="monospace"
                        >
                          {node.key}
                        </text>

                        {/* Node value */}
                        {node.value !== undefined && (
                          <text
                            x={nodeX + nodeWidth / 2}
                            y={nodeY + nodeHeight / 2 + 10}
                            textAnchor="middle"
                            fill="#6b7280"
                            fontSize="10"
                            fontFamily="monospace"
                          >
                            {String(node.value).substring(0, 12)}
                          </text>
                        )}
                      </motion.g>
                    );
                  })}
                </AnimatePresence>
              </motion.g>
            );
          })}
        </AnimatePresence>

        {/* Hash value */}
        {hashValue !== undefined && (
          <motion.g initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <rect x={svgWidth - 120} y={20} width={100} height={30} fill="#f59e0b" rx="4" />
            <text
              x={svgWidth - 70}
              y={40}
              textAnchor="middle"
              fill="white"
              fontSize="12"
              fontWeight="600"
              fontFamily="monospace"
            >
              hash = {hashValue}
            </text>
          </motion.g>
        )}
      </svg>

      {/* Message */}
      {message && (
        <motion.div
          className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm text-blue-900 font-medium">{message}</p>
        </motion.div>
      )}
    </div>
  );
}

