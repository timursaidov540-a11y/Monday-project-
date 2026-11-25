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

function TaskItem({task, onToggle, onDelete, t, language}) {
  let dateLabel = getDateLabel(task.date, language, t)

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

        {dateLabel && (
          <small className="task-date">
            📅 {dateLabel}
          </small>
        )}

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
