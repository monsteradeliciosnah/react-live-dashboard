import React from 'react'
import { createRoot } from 'react-dom/client'

function App(){
  const [data, setData] = React.useState({ts:0,cpu:0,mem:0})
  React.useEffect(()=>{
    const ws = new WebSocket('ws://localhost:8787')
    ws.onmessage = (e)=> setData(JSON.parse(e.data))
    return ()=> ws.close()
  },[])
  return (
    <div style={{fontFamily:'system-ui',padding:20}}>
      <h1>Live Metrics</h1>
      <p>Timestamp: {data.ts ? new Date(data.ts).toLocaleTimeString() : '-'}</p>
      <p>CPU: {Math.round((data.cpu||0)*100)}%</p>
      <p>Mem: {Math.round((data.mem||0)*100)}%</p>
    </div>
  )
}
createRoot(document.getElementById('root')).render(<App/>)
