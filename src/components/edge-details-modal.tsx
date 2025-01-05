import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import type { EdgeData } from '@/types/graph'

interface EdgeDetailsModalProps {
  edge: EdgeData
  isOpen: boolean
  onClose: () => void
}

export default function EdgeDetailsModal({ edge, isOpen, onClose }: EdgeDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edge Details</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <p><strong>Source:</strong> {edge.source}</p>
          <p><strong>Target:</strong> {edge.target}</p>
          <p><strong>Label:</strong> {edge.label}</p>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

