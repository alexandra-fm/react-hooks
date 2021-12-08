import React, { useState } from "react"
import ReactDOM from "react-dom"

const App = () => {
  return (
    <div>
      <HookSwitcher />
    </div>
  )
}

const HookSwitcher = () => {
  const [color, setColor] = useState("grey")
  const [fontSize, setFontSize] = useState(14)

  return (
    <div
      style={{ padding: "10px", background: color, fontSize: `${fontSize}px` }}
    >
      Hello World
      <button onClick={() => setColor("grey")}>Dark</button>
      <button onClick={() => setColor("white")}>Light</button>
      <button onClick={() => setFontSize(Currentsize => Currentsize - 2)}>
        Smaller
      </button>
      <button onClick={() => setFontSize(Currentsize => Currentsize + 2)}>
        Digger
      </button>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)
