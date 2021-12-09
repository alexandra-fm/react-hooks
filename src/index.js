import React, { useState } from "react"
import ReactDOM from "react-dom"

const App = () => {
  //Нельзя хуки ставить в условные выражения, циклы.
  //Вызываются на верхних уровнях в функциях хуков, функциональных компонентах (не классах)
  //С пом. хуков нельзя создать аналог жизненного цикла componentDidCatch
  //Последовательность одинаковая для каждого вызова
  const [name, setName] = useState("Jon")
  const [age, setAge] = useState(25)
  const [rate, setRate] = useState(25)

  return (
    <div>
      {name} is {age} years old his rate is ${rate} per hour
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)
