import {useState} from "react"

function getDateLabel(date, language, t) {
  if (!date) return ""

  let today = new Date()
  today.setHours(0, 0, 0, 0)

  let tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  let taskDate = new Date(date + "T00:00:00")

  if (taskDate.getTime() === today.getTime()) {
    return t("today")
  }

  if (taskDate.getTime() === tomorrow.getTime()) {
    return t("tomorrow")
  }

  if (taskDate < today) {
    return t("overdue")
  }

  return taskDate.toLocaleDateString(
    language === "ru" ? "ru-RU" : "en-US"
  )
}

function TaskItem({
  task,
  onToggle,
  onDelete,
  onAddSubtask,
  onToggleSubtask,
  onDeleteSubtask,
  t,
  language
}) {
  let [subtaskText, setSubtaskText] = useState("")

  let dateLabel = getDateLabel(task.date, language, t)

  // Старые задачи без приоритета получают "medium"
  let priority = task.priority || "medium"
  let subtasks = task.subtasks || []

  function handleAddSubtask(event) {
    event.preventDefault()
    onAddSubtask(task.id, subtaskText)
    setSubtaskText("")
  }

  return (
    <div className={`task-item ${task.done ? "completed" : ""}`}>

      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
      />

      <div className="task-info">

        <span className="task-text">
          {task.text}
        </span>

        <div className="task-meta">
          <span className={`priority-badge priority-${priority}`}>
            {t(priority)}
          </span>

          {dateLabel && (
            <small className="task-date">
              📅 {dateLabel}
            </small>
          )}
        </div>

        {subtasks.length > 0 && (
          <div className="subtask-list">
            {subtasks.map((sub) => (
              <div key={sub.id} className="subtask-item">
                <input
                  type="checkbox"
                  checked={sub.done}
                  onChange={() => onToggleSubtask(task.id, sub.id)}
                />
                <span className={sub.done ? "subtask-done" : ""}>
                  {sub.text}
                </span>
                <button
                  className="subtask-delete"
                  onClick={() => onDeleteSubtask(task.id, sub.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <form className="subtask-form" onSubmit={handleAddSubtask}>
          <input
            type="text"
            placeholder={t("subtaskPlaceholder")}
            value={subtaskText}
            onChange={(event) => setSubtaskText(event.target.value)}
          />
          <button type="submit">+</button>
        </form>

      </div>

      <button
        className="delete-button"
        onClick={() => onDelete(task.id)}
        aria-label={t("delete")}
        title={t("delete")}
      >
        ✕
      </button>

    </div>
  )
}

export {TaskItem}