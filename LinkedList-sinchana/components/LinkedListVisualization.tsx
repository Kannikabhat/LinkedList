
"use client";

import { Node, Pointer, ExecutionStep } from '@/lib/lessons-data';
import { motion, AnimatePresence } from 'framer-motion';
import * as React from 'react';

interface LinkedListVisualizationProps {
  executionSteps: ExecutionStep[];
  currentStepIndex: number;
}

export default function LinkedListVisualization({ executionSteps, currentStepIndex }: LinkedListVisualizationProps) {
  const svgWidth = 800;
  const svgHeight = 500;
  const nodeRadius = 30;

  const nodeVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
  };

  const pointerVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
  };

  // Extract current step
  const currentStep = executionSteps[currentStepIndex] || { nodes: [], pointers: [] };
  const nodes = currentStep.nodes || [];
  const pointers = currentStep.pointers || [];

  // Find head node id
  const headId = React.useMemo(
    () =>
      pointers.find(p => (p.label || '').toUpperCase() === 'HEAD')?.targetNodeId
      ?? nodes[0]?.id
      ?? null,
    [pointers, nodes]
  );

  const buildQuadraticArc = (sx: number, sy: number, ex: number, ey: number, lift = 80) => {
    const mx = (sx + ex) / 2;
    const my = Math.min(sy, ey) - lift; // arc above the nodes
    return `M ${sx} ${sy} Q ${mx} ${my} ${ex} ${ey}`;
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto max-w-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#374151" />
          </marker>
          <marker id="arrowhead-active" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#dc2626" />
          </marker>
        </defs>

        {/* Node connections (arrows) */}
        <AnimatePresence>
          {nodes.map((node) => {
            const nextId = node.next ?? null;
            const targetNode = nextId ? nodes.find(n => n.id === nextId) : null;

            if (nextId === null) {
              const startX = node.x + nodeRadius;
              const startY = node.y;
              const endX = startX + 40;
              const endY = startY;
              return (
                <g key={`${node.id}-null`}>
                  <motion.line x1={startX} y1={startY} x2={endX} y2={endY} stroke="#6b7280" strokeWidth="2" strokeDasharray="4,4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
                  <text x={endX + 10} y={endY + 5} fill="#6b7280" fontSize="12" fontFamily="monospace">NULL</text>
                </g>
              );
            }

            if (!targetNode) return null;

            const startX = node.x + nodeRadius;
            const startY = node.y;
            const endX = targetNode.x - nodeRadius;
            const endY = targetNode.y;

            return (
              <motion.line key={`${node.id}-${targetNode.id}`} x1={startX} y1={startY} x2={endX} y2={endY} stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} exit={{ pathLength: 0 }} transition={{ duration: 0.5 }} />
            );
          })}
        </AnimatePresence>

        {/* Nodes */}
        <AnimatePresence>
          {nodes.map((node) => (
            <motion.g key={node.id} variants={nodeVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
              <circle cx={node.x} cy={node.y} r={nodeRadius} fill={node.isActive ? "#dbeafe" : node.isTarget ? "#dcfce7" : "white"} stroke={node.isActive ? "#3b82f6" : node.isTarget ? "#16a34a" : "#374151"} strokeWidth={node.isActive || node.isTarget ? "3" : "2"} />
              <text x={node.x} y={node.y + 5} textAnchor="middle" fill="#1f2937" fontSize="16" fontWeight="600" fontFamily="monospace">{node.data}</text>
            </motion.g>
          ))}
        </AnimatePresence>

        {/* Pointers */}
        <AnimatePresence>
          {pointers.map((pointer) => {
            const targetNode = pointer.targetNodeId != null ? nodes.find(n => n.id === pointer.targetNodeId) : null;
            if (!targetNode) return null;
            const x = targetNode.x;
            const y = targetNode.y - 60;
            return (
              <motion.g key={pointer.id} variants={pointerVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                <motion.line x1={x} y1={y + 20} x2={targetNode.x} y2={targetNode.y - nodeRadius} stroke={pointer.color} strokeWidth="2" markerEnd={pointer.color === "#dc2626" ? "url(#arrowhead-active)" : "url(#arrowhead)"} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.2 }} />
                <rect x={x - 25} y={y - 10} width="50" height="20" fill={pointer.color} rx="4" />
                <text x={x} y={y + 4} textAnchor="middle" fill="white" fontSize="10" fontWeight="600" fontFamily="monospace">{pointer.label}</text>
              </motion.g>
            );
          })}
        </AnimatePresence>
      </svg>
    </div>
  );
}



