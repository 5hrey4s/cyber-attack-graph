const WS_URL = "ws://localhost:3000"; // Replace with your backend WebSocket URL

export const setupWebSocket = (onMessage: (data: any) => void) => {
    const socket = new WebSocket(WS_URL);

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        onMessage(data);
    };

    return socket;
};
