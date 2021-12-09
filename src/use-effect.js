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

        <HookCounter value={value} />
        <ClassCounter value={value} />
        <Practice value={value} />
        <hr />
        <Notification />
        <hr />
        <PlanetInfo id={value} />
      </div>
    )
  } else {
    return <button onClick={() => setVisible(true)}>show</button>
  }
}

class ClassCounter extends Component {
  componentDidMount() {
    console.log("class mount")
  }
  componentDidUpdate() {
    console.log("class update")
  }
  componentWillUnmount() {
    console.log("class unmount")
  }

  render() {
    return <p>{this.props.value}</p>
  }
}

const HookCounter = ({ value }) => {
  //Явл. комбинацией componentDidMount и componentDidUpdate, если не передать значения на изменения которых нужно реагировать (в данном случае ередано value)
  useEffect(() => {
    console.log("useEffect")
    // Вместо componentWillUnmount нужно вернуть функцию,кот. будет вызвана когда необходимо провести очистку, который вызыв. только после демонтажа объекта, очистка в useEffect вызывается всегда после обновления данных и после демонтажа объекта
    return () => console.log("clear")
  }, [value])

  return <p>{value}</p>
}

const Practice = ({ value }) => {
  useEffect(() => console.log("ImitationDidMount"), []) //Если передать пустой массив, хук вызовется только при монтировании компонента

  useEffect(() => console.log("ImitationDidUpdate")) //Если не передать значения на изменения которых нужно реагировать, отличие от  DidUpdate, хук будет вызван и при монтировании компонента и при обновлении

  useEffect(() => () => console.log("ImitationWillUnmount"), []) //Из хука нужно вернуть функцию,кот. будет вызвана когда необходимо провести очистку и передать пустой массив, чтобы очистка не происходила при изменениях, только при демонтаже компонента

  return <p>{value}</p>
}

const Notification = () => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), 2000)
    return () => clearTimeout(timeout)
  }, [])

  return <div>{visible && <p>Hello</p>} </div>
}

const PlanetInfo = ({ id }) => {
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
