import { useState } from "react"
import { PROJECTS } from "../data/project"
import { LABELS } from "../data/labels"

const PRIORITIES = [
  { id: "high", color: "#d64545" },
  { id: "medium", color: "#d4a017" },
  { id: "low", color: "#2e9e5b" }
]

function NavItem({ icon, label, count, active, onClick, iconColor }) {
  return (
    <button
      className={`nav-item ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <span className="nav-icon" style={iconColor ? { color: iconColor } : undefined}>
        {icon}
      </span>
      <span className="nav-label">{label}</span>
      {count > 0 && <span className="nav-count">{count}</span>}
    </button>
  )
}

function Sidebar({
  t,
  language,
  activeView,
  onChangeView,
  onAddTask,
  onSearch,
  counts,
  userName,
  isOpen,
  onClose
}) {
  let [filtersOpen, setFiltersOpen] = useState(false)

  function go(view) {
    onChangeView(view)
    onClose()
  }

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "show" : ""}`}
        onClick={onClose}
      />

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>

        <div className="sidebar-user">
          <div className="avatar">
            {(userName || "U")[0].toUpperCase()}
          </div>
          <span className="user-name">{userName}</span>
        </div>

        <button
          className="add-task-btn"
          onClick={() => {
            onAddTask()
            onClose()
          }}
        >
          <span className="add-plus">+</span>
          {t("addTaskLabel")}
        </button>

        <nav className="nav-group">
          <NavItem
            icon="🔍"
            label={t("searchShort")}
            onClick={() => {
              onSearch()
              onClose()
            }}
          />
          <NavItem
            icon="📥"
            label={t("inbox")}
            count={counts.inbox}
            active={activeView === "inbox"}
            onClick={() => go("inbox")}
          />
          <NavItem
            icon="📅"
            label={t("today")}
            count={counts.today}
            active={activeView === "today"}
            onClick={() => go("today")}
          />
          <NavItem
            icon="🗓️"
            label={t("upcoming")}
            count={counts.upcoming}
            active={activeView === "upcoming"}
            onClick={() => go("upcoming")}
          />
          <NavItem
            icon="🏷️"
            label={t("filtersLabels")}
            active={filtersOpen}
            onClick={() => setFiltersOpen((prev) => !prev)}
          />
        </nav>

        {filtersOpen && (
          <nav className="nav-group">
            <div className="nav-section-title">{t("priority")}</div>
            {PRIORITIES.map((p) => (
              <NavItem
                key={p.id}
                icon="●"
                iconColor={p.color}
                label={t(p.id)}
                count={counts.priority[p.id]}
                active={activeView === `priority:${p.id}`}
                onClick={() => go(`priority:${p.id}`)}
              />
            ))}

            <div className="nav-section-title">{t("labelsTitle")}</div>
            {LABELS.map((l) => (
              <NavItem
                key={l.id}
                icon="🏷️"
                label={language === "ru" ? l.ru : l.en}
                count={counts.labels[l.id]}
                active={activeView === `label:${l.id}`}
                onClick={() => go(`label:${l.id}`)}
              />
            ))}
          </nav>
        )}

        <div className="nav-section-title">{t("myProjects")}</div>

        <nav className="nav-group">
          {PROJECTS.map((project) => (
            <NavItem
              key={project.id}
              icon="#"
              iconColor={project.color}
              label={language === "ru" ? project.ru : project.en}
              count={counts.projects[project.id]}
              active={activeView === `project:${project.id}`}
              onClick={() => go(`project:${project.id}`)}
            />
          ))}
        </nav>

      </aside>
    </>
  )
}

export { Sidebar }