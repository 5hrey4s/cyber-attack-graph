import type { CyberAttackData } from '@/types/cyber-attack'

export function setupWebSocket(onMessage: (data: CyberAttackData) => void) {
    const socket = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'ws://localhost:8080')

    socket.onopen = () => {
        console.log('WebSocket connection established')
    }

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        onMessage(data)
    }

    socket.onerror = (error) => {
        console.error('WebSocket error:', error)
    }

    socket.onclose = () => {
        console.log('WebSocket connection closed')
    }

    return socket
}

