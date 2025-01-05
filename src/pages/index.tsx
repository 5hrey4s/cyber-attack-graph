import dynamic from 'next/dynamic'

const GraphVisualization = dynamic(() => import('@/components/graph-visualization'), { ssr: false })

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Cyber Attack Graph Visualization</h1>
      <GraphVisualization />
    </main>
  )
}

