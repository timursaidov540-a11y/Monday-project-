import {useEffect, useState} from "react"
import {PROJECTS} from "../data/project"
import {LABELS} from "../data/labels"

function TaskForm({onAddTask, t, language, defaultProject}) {
  let [text, setText] = useState("")
  let [date, setDate] = useState("")
  let [priority, setPriority] = useState("medium")
  let [project, setProject] = useState(defaultProject || "")
  let [label, setLabel] = useState("")

  useEffect(() => {
    setProject(defaultProject || "")
  }, [defaultProject])

  function handleSubmit(event) {
    event.preventDefault()

    if (text.trim() === "") {
      return
    }

    onAddTask(text, date, priority, project, label)

    setText("")
    setDate("")
    setPriority("medium")
    setProject(defaultProject || "")
    setLabel("")
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

      <select
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
      >
        <option value="low">🟢 {t("low")}</option>
        <option value="medium">🟡 {t("medium")}</option>
        <option value="high">🔴 {t("high")}</option>
      </select>

      <select
        value={project}
        onChange={(event) => setProject(event.target.value)}
      >
        <option value="">{t("inbox")}</option>
        {PROJECTS.map((p) => (
          <option key={p.id} value={p.id}>
            # {language === "ru" ? p.ru : p.en}
          </option>
        ))}
      </select>

      <select
        value={label}
        onChange={(event) => setLabel(event.target.value)}
      >
        <option value="">🏷️ {t("noLabel")}</option>
        {LABELS.map((l) => (
          <option key={l.id} value={l.id}>
            🏷️ {language === "ru" ? l.ru : l.en}
          </option>
        ))}
      </select>

      <button type="submit">
        {t("add")}
      </button>

    </form>
  )
}

export {TaskForm}