'use client'

import { useEffect, useState, useCallback } from 'react'
import CytoscapeComponent from 'react-cytoscapejs'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import NodeDetailsModal from './node-details-modal'
import EdgeDetailsModal from './edge-details-modal'
import { formatDataToGraph } from '@/lib/data-formatter'
import { setupWebSocket } from '@/lib/websocket-client'
import type { Cytoscape, NodeSingular, EdgeSingular } from 'cytoscape'
import type { GraphData, NodeData, EdgeData } from '@/types/graph'
import type { CyberAttackData } from '@/types/cyber-attack'

export default function GraphVisualization() {
  const [cy, setCy] = useState<Cytoscape | null>(null)
  const [graphData, setGraphData] = useState<GraphData | null>(null)
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null)
  const [selectedEdge, setSelectedEdge] = useState<EdgeData | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()

  const handleElementClick = useCallback((event: any) => {
    const element = event.target
    if (element.isNode()) {
      const nodeData = element.data()
      setSelectedNode({ type: 'node', ...nodeData })
      setSelectedEdge(null)
    } else if (element.isEdge()) {
      const edgeData = element.data()
      setSelectedEdge({ type: 'edge', ...edgeData })
      setSelectedNode(null)
    }
  }, [])

  const handleSearch = useCallback(() => {
    if (!cy) return

    cy.elements().unselect()
    const searchResults = cy.elements().filter((ele) => {
      const data = ele.data()
      return data.label.toLowerCase().includes(searchTerm.toLowerCase())
    })
    searchResults.select()
    if (searchResults.length > 0) {
      cy.animate({
        fit: {
          eles: searchResults,
          padding: 50
        },
        duration: 1000
      })
    } else {
      toast({
        title: 'No results found',
        description: `No elements match the search term "${searchTerm}"`,
        variant: 'destructive',
      })
    }
  }, [cy, searchTerm, toast])

  const highlightPath = useCallback(() => {
    if (!cy) return

    const selectedNodes = cy.nodes(':selected')
    if (selectedNodes.length !== 2) {
      toast({
        title: 'Invalid selection',
        description: 'Please select exactly two nodes to highlight the path',
        variant: 'destructive',
      })
      return
    }

    const path = cy.elements().dijkstra({
      root: selectedNodes[0],
      directed: true,
    }).pathTo(selectedNodes[1])

    cy.elements().removeClass('highlighted')
    path.addClass('highlighted')
  }, [cy, toast])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/cyber-attack')
        if (!response.ok) {
          throw new Error('Failed to fetch cyber attack data')
        }
        const data: CyberAttackData = await response.json()
        setGraphData(formatDataToGraph(data))
      } catch (error) {
        console.error('Error fetching graph data:', error)
        toast({
          title: 'Error',
          description: 'Failed to load graph data. Please try again later.',
          variant: 'destructive',
        })
      }
    }

    fetchData()

    const socket = setupWebSocket((data: CyberAttackData) => {
      setGraphData((prevData) => {
        if (!prevData) return formatDataToGraph(data)
        const newData = formatDataToGraph(data)
        return {
          nodes: [...prevData.nodes, ...newData.nodes],
          edges: [...prevData.edges, ...newData.edges],
        }
      })
    })

    return () => socket.close()
  }, [toast])

  const addNode = useCallback(() => {
    if (!cy) return

    const id = `node-${Date.now()}`
    cy.add({
      group: 'nodes',
      data: { id, label: 'New Node', type: 'custom' }
    })
  }, [cy])

  const addEdge = useCallback(() => {
    if (!cy) return

    const selectedNodes = cy.nodes(':selected')
    if (selectedNodes.length !== 2) {
      toast({
        title: 'Invalid selection',
        description: 'Please select exactly two nodes to create an edge',
        variant: 'destructive',
      })
      return
    }

    cy.add({
      group: 'edges',
      data: {
        id: `edge-${Date.now()}`,
        source: selectedNodes[0].id(),
        target: selectedNodes[1].id(),
        label: 'New Edge'
      }
    })
  }, [cy, toast])

  if (!graphData) {
    return <div>Loading...</div>
  }

  return (
    <div className="h-[calc(100vh-100px)]">
      <div className="mb-4 flex gap-2">
        <Input
          type="text"
          placeholder="Search nodes and edges"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
        <Button onClick={highlightPath}>Highlight Path</Button>
        <Button onClick={addNode}>Add Node</Button>
        <Button onClick={addEdge}>Add Edge</Button>
      </div>
      <CytoscapeComponent
        elements={[
          ...graphData.nodes.map((node) => ({ data: { ...node } })),
          ...graphData.edges.map((edge) => ({ data: { ...edge } })),
        ]}
        style={{ width: '100%', height: '100%' }}
        stylesheet={[
          {
            selector: 'node',
            style: {
              'background-color': '#666',
              'label': 'data(label)',
            }
          },
          {
            selector: 'edge',
            style: {
              'width': 3,
              'line-color': '#ccc',
              'target-arrow-color': '#ccc',
              'target-arrow-shape': 'triangle',
              'curve-style': 'bezier',
              'label': 'data(label)',
            }
          },
          {
            selector: '.highlighted',
            style: {
              'background-color': '#ff0',
              'line-color': '#ff0',
              'target-arrow-color': '#ff0',
              'transition-property': 'background-color, line-color, target-arrow-color',
              'transition-duration': '0.5s'
            }
          },
          {
            selector: 'node[type="query"]',
            style: {
              'background-color': '#6495ED',
              'shape': 'diamond'
            }
          },
          {
            selector: 'node[type="response"]',
            style: {
              'background-color': '#7FFF00',
              'shape': 'diamond'
            }
          },
          {
            selector: 'node[type="agent"]',
            style: {
              'background-color': '#FF69B4',
              'shape': 'ellipse'
            }
          },
          {
            selector: 'node[type="tool"]',
            style: {
              'background-color': '#FFA500',
              'shape': 'rectangle'
            }
          }
        ]}
        layout={{ name: 'cose' }}
        cy={(cy) => {
          setCy(cy)
          cy.on('tap', 'node, edge', handleElementClick)
          cy.on('mouseover', 'node, edge', (event) => event.target.addClass('hover'))
          cy.on('mouseout', 'node, edge', (event) => event.target.removeClass('hover'))
        }}
      />
      {selectedNode && (
        <NodeDetailsModal
          node={selectedNode}
          isOpen={!!selectedNode}
          onClose={() => setSelectedNode(null)}
        />
      )}
      {selectedEdge && (
        <EdgeDetailsModal
          edge={selectedEdge}
          isOpen={!!selectedEdge}
          onClose={() => setSelectedEdge(null)}
        />
      )}
    </div>
  )
}

