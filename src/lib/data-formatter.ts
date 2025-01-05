import type { CyberAttackData } from '@/types/cyber-attack'
import type { GraphData } from '@/types/graph'

export function formatDataToGraph(data: CyberAttackData): GraphData {
    const nodes = [
        { id: 'query', label: data.query, type: 'query' },
        { id: 'response', label: data.response, type: 'response' },
        ...data.agents.map(agent => ({
            id: agent.idx,
            label: agent.name,
            type: 'agent',
            output: agent.output,
            tools: agent.tools
        })),
        ...data.agents.flatMap(agent =>
            agent.tools.map(tool => ({
                id: tool.idx,
                label: tool.name,
                type: 'tool',
                input: tool.input,
                output: tool.output
            }))
        )
    ]

    const edges = [
        ...data.agents.map(agent => ({ id: `query-${agent.idx}`, source: 'query', target: agent.idx, label: 'executes' })),
        ...data.agents.map(agent => ({ id: `${agent.idx}-response`, source: agent.idx, target: 'response', label: 'contributes' })),
        ...data.agents.flatMap(agent =>
            agent.tools.map(tool => ({ id: `${agent.idx}-${tool.idx}`, source: agent.idx, target: tool.idx, label: 'uses' }))
        )
    ]

    return { nodes, edges }
}

