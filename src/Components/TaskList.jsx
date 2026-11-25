import {TaskItem} from "./TaskItem"

function TaskList({
  tasks,
  onToggle,
  onDelete,
  onAddSubtask,
  onToggleSubtask,
  onDeleteSubtask,
  t,
  language
}) {
  if (tasks.length === 0) {
    return (
      <div className="empty">
        <span>📋</span>
        <p>{t("empty")}</p>
      </div>
    )
  }

  return (
    <div className="task-list">

      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onAddSubtask={onAddSubtask}
          onToggleSubtask={onToggleSubtask}
          onDeleteSubtask={onDeleteSubtask}
          t={t}
          language={language}
        />
      ))}

    </div>
  )
}

export {TaskList}