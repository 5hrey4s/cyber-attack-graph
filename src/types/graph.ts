import type { Agent, Tool } from './cyber-attack'

export interface NodeData {
    id: string
    label: string
    type: 'query' | 'response' | 'agent' | 'tool' | 'custom'
    output?: string
    tools?: Tool[]
    input?: string
}

export interface EdgeData {
    id: string
    source: string
    target: string
    label: string
}

export interface GraphData {
    nodes: NodeData[]
    edges: EdgeData[]
}

