"use client";

import { Node, Pointer } from '@/lib/lessons-data';
import { motion, AnimatePresence } from 'framer-motion';

interface LinkedListVisualizationProps {
  nodes: Node[];
  pointers: Pointer[];
}

export default function LinkedListVisualization({ nodes, pointers }: LinkedListVisualizationProps) {
  const svgWidth = 800;
  const svgHeight = 500;
  const nodeRadius = 30;

  // Animation variants
  const nodeVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
  };

  const pointerVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
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
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="#374151"
            />
          </marker>
          <marker
            id="arrowhead-active"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="#dc2626"
            />
          </marker>
        </defs>

        {/* Node connections (arrows) */}
        <AnimatePresence>
          {nodes.map((node) => {
            const targetNode = node.next ? nodes.find(n => n.id === node.next) : null;
            if (!targetNode && node.next !== null) return null;

            // Handle circular references
            const isCircular = node.next === nodes[0]?.id && nodes.length > 1;
            
            if (targetNode || isCircular) {
              const startX = node.x + nodeRadius;
              const startY = node.y;
              
              let endX, endY;
              if (isCircular) {
                // Circular arrow back to first node
                endX = nodes[0].x - nodeRadius;
                endY = nodes[0].y;
                
                // Create a curved path for circular reference
                const midX = (startX + endX) / 2;
                const midY = Math.min(startY, endY) - 80;
                
                return (
                  <motion.path
                    key={`${node.id}-circular`}
                    d={`M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`}
                    stroke="#374151"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#arrowhead)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    exit={{ pathLength: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                );
              } else if (targetNode) {
                endX = targetNode.x - nodeRadius;
                endY = targetNode.y;

                return (
                  <motion.line
                    key={`${node.id}-${targetNode.id}`}
                    x1={startX}
                    y1={startY}
                    x2={endX}
                    y2={endY}
                    stroke="#374151"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    exit={{ pathLength: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                );
              }
            }

            // NULL pointer
            if (node.next === null) {
              const startX = node.x + nodeRadius;
              const startY = node.y;
              const endX = startX + 40;
              const endY = startY;

              return (
                <g key={`${node.id}-null`}>
                  <motion.line
                    x1={startX}
                    y1={startY}
                    x2={endX}
                    y2={endY}
                    stroke="#6b7280"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <text
                    x={endX + 10}
                    y={endY + 5}
                    fill="#6b7280"
                    fontSize="12"
                    fontFamily="monospace"
                  >
                    NULL
                  </text>
                </g>
              );
            }

            return null;
          })}

          {/* Doubly linked list backward arrows */}
          {nodes.map((node) => {
            if (!node.prev) return null;
            const prevNode = nodes.find(n => n.id === node.prev);
            if (!prevNode) return null;

            const startX = node.x - nodeRadius;
            const startY = node.y + 10;
            const endX = prevNode.x + nodeRadius;
            const endY = prevNode.y + 10;

            return (
              <motion.line
                key={`${node.id}-prev`}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke="#6b7280"
                strokeWidth="1.5"
                markerEnd="url(#arrowhead)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                exit={{ pathLength: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            );
          })}
        </AnimatePresence>

        {/* Nodes */}
        <AnimatePresence>
          {nodes.map((node) => (
            <motion.g
              key={node.id}
              variants={nodeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {/* Node background circle */}
              <circle
                cx={node.x}
                cy={node.y}
                r={nodeRadius}
                fill={node.isActive ? "#dbeafe" : node.isTarget ? "#dcfce7" : "white"}
                stroke={node.isActive ? "#3b82f6" : node.isTarget ? "#16a34a" : "#374151"}
                strokeWidth={node.isActive || node.isTarget ? "3" : "2"}
              />

              {/* Data compartment */}
              <text
                x={node.x}
                y={node.y + 5}
                textAnchor="middle"
                fill="#1f2937"
                fontSize="16"
                fontWeight="600"
                fontFamily="monospace"
              >
                {node.data}
              </text>

              {/* Next pointer compartment separator for singly linked lists */}
              {!node.prev && (
                <line
                  x1={node.x + 15}
                  y1={node.y - nodeRadius + 5}
                  x2={node.x + 15}
                  y2={node.y + nodeRadius - 5}
                  stroke="#9ca3af"
                  strokeWidth="1"
                />
              )}

              {/* Doubly linked list compartments */}
              {node.prev !== undefined && (
                <>
                  <line
                    x1={node.x - 10}
                    y1={node.y - nodeRadius + 5}
                    x2={node.x - 10}
                    y2={node.y + nodeRadius - 5}
                    stroke="#9ca3af"
                    strokeWidth="1"
                  />
                  <line
                    x1={node.x + 10}
                    y1={node.y - nodeRadius + 5}
                    x2={node.x + 10}
                    y2={node.y + nodeRadius - 5}
                    stroke="#9ca3af"
                    strokeWidth="1"
                  />
                </>
              )}
            </motion.g>
          ))}
        </AnimatePresence>

        {/* Pointers */}
        <AnimatePresence>
          {pointers.map((pointer) => {
            const targetNode = nodes.find(n => n.id === pointer.targetNodeId);
            if (!targetNode && pointer.targetNodeId !== null) return null;

            // Handle null pointers
            if (pointer.targetNodeId === null) {
              return (
                <motion.g
                  key={pointer.id}
                  variants={pointerVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  {/* Pointer label for null */}
                  <rect
                    x={50}
                    y={50}
                    width="60"
                    height="20"
                    fill={pointer.color}
                    rx="4"
                  />
                  <text
                    x={80}
                    y={64}
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                    fontWeight="600"
                    fontFamily="monospace"
                  >
                    {pointer.label} → NULL
                  </text>
                </motion.g>
              );
            }

            const x = targetNode.x;
            const y = targetNode.y - 60;

            return (
              <motion.g
                key={pointer.id}
                variants={pointerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                {/* Pointer arrow */}
                <motion.line
                  x1={x}
                  y1={y + 20}
                  x2={targetNode.x}
                  y2={targetNode.y - nodeRadius}
                  stroke={pointer.color}
                  strokeWidth="2"
                  markerEnd={pointer.color === "#dc2626" ? "url(#arrowhead-active)" : "url(#arrowhead)"}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />

                {/* Pointer label */}
                <rect
                  x={x - 25}
                  y={y - 10}
                  width="50"
                  height="20"
                  fill={pointer.color}
                  rx="4"
                />
                <text
                  x={x}
                  y={y + 4}
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="600"
                  fontFamily="monospace"
                >
                  {pointer.label}
                </text>
              </motion.g>
            );
          })}
        </AnimatePresence>
      </svg>
    </div>
  );
}