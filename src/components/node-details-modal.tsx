import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import type { NodeData } from '@/types/graph'

interface NodeDetailsModalProps {
  node: NodeData
  isOpen: boolean
  onClose: () => void
}

export default function NodeDetailsModal({ node, isOpen, onClose }: NodeDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Node Details</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <p><strong>ID:</strong> {node.id}</p>
          <p><strong>Label:</strong> {node.label}</p>
          <p><strong>Type:</strong> {node.type}</p>
          {node.type === 'agent' && (
            <>
              <p><strong>Output:</strong> {node.output}</p>
              <h3 className="mt-4 mb-2 font-bold">Tools:</h3>
              <ul className="list-disc pl-5">
                {node.tools?.map((tool) => (
                  <li key={tool.idx}>
                    <strong>{tool.name}</strong>
                    <ul className="list-none pl-5">
                      <li>Input: {tool.input}</li>
                      <li>Output: {tool.output}</li>
                    </ul>
                  </li>
                ))}
              </ul>
            </>
          )}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

