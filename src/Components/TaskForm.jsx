import {useState} from "react"

function TaskForm({onAddTask, t}) {
  let [text, setText] = useState("")
  let [date, setDate] = useState("")

  function handleSubmit(event){
    event.preventDefault()

    if (text.trim() === ""){
      return
    }

    onAddTask(text, date)

    setText("")
    setDate("")
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder={t("placeholder")}
        value={text}
        onChange={(event) => setText(event.target.value)}
      />

      <input
        type="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />

      <button type="submit">
        {t("add")}
      </button>

    </form>
  )
}

export {TaskForm}
