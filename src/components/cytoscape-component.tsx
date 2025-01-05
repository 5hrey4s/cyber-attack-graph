// 'use client'

// import { useEffect, useRef } from 'react'
// import cytoscape from 'cytoscape'
// import type { GraphData, NodeData, EdgeData } from '@/types/graph'

// interface CytoscapeComponentProps {
//   graphData: GraphData
//   onElementClick: (data: NodeData | EdgeData) => void
// }

// export default function CytoscapeComponent({ graphData, onElementClick }: CytoscapeComponentProps) {
//   const containerRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     if (!containerRef.current) return

//     const cy = cytoscape({
//       container: containerRef.current,
//       elements: [
//         ...graphData.nodes.map((node) => ({ data: { id: node.id, label: node.label } })),
//         ...graphData.edges.map((edge) => ({
//           data: { source: edge.source, target: edge.target, label: edge.label },
//         })),
//       ],
//       style: [
//         {
//           selector: 'node',
//           style: {
//             label: 'data(label)',
//             'text-halign': 'center',
//             'text-valign': 'center',
//             'background-color': 'hsl(var(--primary))',
//             color: 'hsl(var(--primary-foreground))',
//             'font-size': '12px',
//           },
//         },
//         {
//           selector: 'edge',
//           style: {
//             label: 'data(label)',
//             'curve-style': 'bezier',
//             'target-arrow-shape': 'triangle',
//             'line-color': 'hsl(var(--secondary))',
//             'target-arrow-color': 'hsl(var(--secondary))',
//             'font-size': '10px',
//           },
//         },
//       ],
//       layout: { name: 'grid' },
//     })

//     cy.on('tap', 'node', (event) => {
//       const nodeData = event.target.data()
//       onElementClick({ type: 'node', ...nodeData })
//     })

//     cy.on('tap', 'edge', (event) => {
//       const edgeData = event.target.data()
//       onElementClick({ type: 'edge', ...edgeData })
//     })

//     return () => {
//       cy.destroy()
//     }
//   }, [graphData, onElementClick])

//   return <div ref={containerRef} className="w-full h-[calc(100vh-100px)]" />
// }

