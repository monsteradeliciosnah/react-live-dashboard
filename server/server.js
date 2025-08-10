import { WebSocketServer } from 'ws';
const wss = new WebSocketServer({ port: 8787 });
console.log("WS broadcaster on ws://localhost:8787");
setInterval(() => {
  const payload = JSON.stringify({ ts: Date.now(), cpu: Math.random(), mem: Math.random() });
  wss.clients.forEach(c => c.readyState === 1 && c.send(payload));
}, 1000);
