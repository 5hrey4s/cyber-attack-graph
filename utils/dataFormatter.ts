interface Node {
    id: string;
    label: string;
}

interface Edge {
    source: string;
    target: string;
    label?: string;
}

export function formatDataToGraph(data: any) {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    data.agents.forEach((agent: any) => {
        nodes.push({ id: agent.idx, label: agent.name });

        agent.tools.forEach((tool: any) => {
            nodes.push({ id: tool.idx, label: tool.name });
            edges.push({ source: agent.idx, target: tool.idx, label: "uses" });
        });
    });

    return { nodes, edges };
}
