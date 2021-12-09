import React, { useState, Component, useEffect } from "react"
import ReactDOM from "react-dom"

const App = () => {
  const [value, setValue] = useState(1)
  const [visible, setVisible] = useState(true)

  if (visible) {
    return (
      <div>
        <button onClick={() => setValue(v => v + 1)}>+</button>

        <button onClick={() => setVisible(false)}>hide</button>

        <hr />
        <PlanetInfo id={value} />
      </div>
    )
  } else {
    return <button onClick={() => setVisible(true)}>show</button>
  }
}

//Собственный хуки должны начинаться с use
const usePlanetInfo = id => {
  const [name, setName] = useState(null)

  const getPlanet = (id, cancelled) => {
    fetch(`https://swapi.dev/api/planets/${id}`)
      .then(res => res.json())
      .then(data => !cancelled && setName(data.name))
  }

  useEffect(() => {
    let cancelled = false
    getPlanet(id, cancelled)
    return () => (cancelled = true)
  }, [id])

  return name
}

const PlanetInfo = ({ id }) => {
  const name = usePlanetInfo(id)
  return (
    <div>
      {`Planet number ${id}`} - {name}
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)
