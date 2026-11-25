import { useEffect, useState } from "react"

import { Header } from "./Components/Header"
import { TaskForm } from "./Components/TaskForm"
import { Filters } from "./Components/Filters"
import { TaskList } from "./Components/TaskList"
import { Toast } from "./Components/Toast"
import { Snowfall } from "./Components/Snowfall"
import { Login } from "./Components/Auth/Login"
import { Register } from "./Components/Auth/Register"
import { Quotes } from "./Components/Quotes"
import { PROJECTS } from "./data/project"
let EDITION_LABELS = {
  winter: "✨ CHRISTMAS EDITION",
  summer: "☀️ SUMMER EDITION",
  halloween: "🎃 HALLOWEEN EDITION"
}
import {Sidebar} from "./Components/Sidebar"
import "./App.css"

let translations = {
  ru: {
    subtitle: "Планируй свой день и достигай целей!",
    placeholder: "Что нужно сделать?",
    add: "+ Добавить",
    all: "Все",
    active: "Активные",
    done: "Выполненные",
    empty: "Здесь пока нет задач",
    today: "Сегодня",
    tomorrow: "Завтра",
    overdue: "Просрочено",
    total: "Всего",
    remaining: "Осталось",
    completed: "Выполнено",
    clear: "Очистить выполненные",
    added: "🎉 Отлично! Задача добавлена!",
    great: "✨ Отличная работа!",
    allDone: "🏆 Поздравляю! Все задачи выполнены!",
    progress: "Твой прогресс",
    delete: "Удалить задачу",
    light: "Светлая тема",
    dark: "Тёмная тема",
    duplicate: "⚠️ Такая задача уже существует!",
    season: "Сезон",
    winter: "Зима",
    summer: "Лето",
    halloween: "Хэллоуин",
    chooseIcon: "Иконка",
    login: "Войти",
    register: "Регистрация",
    name: "Имя пользователя",
    email: "Электронная почта",
    password: "Пароль",
    repeatPassword: "Повторите пароль",
    noAccount: "Нет аккаунта? ",
    hasAccount: "Уже есть аккаунт? ",
    passwordShort: "Пароль должен содержать минимум 6 символов",
    passwordMismatch: "Пароли не совпадают",
    emailExists: "Этот email уже зарегистрирован",
    invalidLogin: "Неверный email или пароль",
    low: "Низкий",
    medium: "Средний",
    high: "Высокий",
    priority: "Приоритет",
    search: "🔍 Поиск задач...",
    sortDefault: "Без сортировки",
    sortPriority: "По приоритету",
    sortDate: "По дате",
    subtaskPlaceholder: "Подзадача...",
    inbox: "Входящие",
    upcoming: "Предстоящее",
    filtersLabels: "Фильтры и метки",
    myProjects: "Мои проекты",
    addTaskLabel: "Добавить задачу",
    searchShort: "Поиск"
  },

  en: {
    subtitle: "Plan your day and achieve your goals!",
    placeholder: "What needs to be done?",
    add: "+ Add task",
    all: "All",
    active: "Active",
    done: "Completed",
    empty: "No tasks here yet",
    today: "Today",
    tomorrow: "Tomorrow",
    overdue: "Overdue",
    total: "Total",
    remaining: "Remaining",
    completed: "Completed",
    clear: "Clear completed",
    added: "🎉 Great! Task added!",
    great: "✨ Great job!",
    allDone: "🏆 Congratulations! All tasks completed!",
    progress: "Your progress",
    delete: "Delete task",
    light: "Light theme",
    dark: "Dark theme",
    duplicate: "⚠️ This task already exists!",
    season: "Season",
    winter: "Winter",
    summer: "Summer",
    halloween: "Halloween",
    chooseIcon: "Icon",
    login: "Login",
    register: "Register",
    name: "Username",
    email: "Email address",
    password: "Password",
    repeatPassword: "Repeat password",
    noAccount: "Don't have an account? ",
    hasAccount: "Already have an account? ",
    passwordShort: "Password must contain at least 6 characters",
    passwordMismatch: "Passwords do not match",
    emailExists: "This email is already registered",
    invalidLogin: "Incorrect email or password",
    low: "Low",
    medium: "Medium",
    high: "High",
    priority: "Priority",
    search: "🔍 Search tasks...",
    sortDefault: "No sorting",
    sortPriority: "By priority",
    sortDate: "By date",
    subtaskPlaceholder: "Subtask...",
    inbox: "Inbox",
    upcoming: "Upcoming",
    filtersLabels: "Filters & labels",
    myProjects: "My projects",
    addTaskLabel: "Add task",
    searchShort: "Search"
  }
}

function App() {
  let [users, setUsers] = useState(() => {
  return JSON.parse(localStorage.getItem("users")) || []
  })

  let [currentUser, setCurrentUser] = useState(() => {
  return JSON.parse(localStorage.getItem("currentUser")) || null
  })

  let [authPage, setAuthPage] = useState("register")
  let [tasks, setTasks] = useState(() => {
    let savedTasks = localStorage.getItem("myTasks")
    return savedTasks ? JSON.parse(savedTasks) : []
  })

  let [currentFilter, setCurrentFilter] = useState("all")
  let [message, setMessage] = useState("")

  let [search, setSearch] = useState("")
  let [sortBy, setSortBy] = useState("default")

  let [activeView, setActiveView] = useState("inbox")
  let [sidebarOpen, setSidebarOpen] = useState(false)

  let [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "ru"
  })

  let [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark"
  })
  
  let t = (key) => translations[language][key]

  let [season, setSeason] = useState(() => {
  return localStorage.getItem("season") || "winter"
  })

  let [icon, setIcon] = useState(() => {
  return localStorage.getItem("icon") || "❄️"
  })

  useEffect(() => {
  localStorage.setItem("season", season)
  }, [season])

  useEffect(() => {
  localStorage.setItem("icon", icon)
  }, [icon])
  
  useEffect(() => {
    localStorage.setItem("myTasks", JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  useEffect(() => {
    localStorage.setItem("theme", theme)
  }, [theme])

  useEffect(() => {
    if (!message) return

    let timer = setTimeout(() => {
      setMessage("")
    }, 3000)

    return () => clearTimeout(timer)
  }, [message])

  
function addTask(text, date, priority, project) {
  let cleanText = text.trim()
  let alreadyExists = tasks.some((task) =>
    task.text.trim().toLowerCase() === cleanText.toLowerCase()
  )

  if (alreadyExists) {
    setMessage(t("duplicate"))
    return
  }

  let newTask = {
    id: crypto.randomUUID(),
    text: cleanText,
    date: date,
    done: false,
    priority: priority || "medium",
    subtasks: []
  }

  setTasks((prevTasks) => [...prevTasks, newTask])
  setMessage(t("added"))
}


  function toggleTask(id) {
    let updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          done: !task.done
        }
      }

      return task
    })

    setTasks(updatedTasks)

    let completedCount = updatedTasks.filter(
      (task) => task.done
    ).length

    if (
      updatedTasks.length > 0 &&
      completedCount === updatedTasks.length
    ) {
      setMessage(t("allDone"))
    } else {
      setMessage(t("great"))
    }
  }

  function deleteTask(id) {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    )
  }
  
  function addSubtask(taskId, text) {
    let cleanText = text.trim()
    if (cleanText === "") return

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: [
                ...(task.subtasks || []),
                { id: crypto.randomUUID(), text: cleanText, done: false }
              ]
            }
          : task
      )
    )
  }

  function toggleSubtask(taskId, subtaskId) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map((sub) =>
                sub.id === subtaskId ? { ...sub, done: !sub.done } : sub
              )
            }
          : task
      )
    )
  }

  function deleteSubtask(taskId, subtaskId) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.filter((sub) => sub.id !== subtaskId)
            }
          : task
      )
    )
  }

  function clearCompleted() {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => !task.done)
    )
  }

  let priorityOrder = { high: 0, medium: 1, low: 2 }

  let todayStr = new Date().toLocaleDateString("en-CA")

  let counts = {
    inbox: tasks.filter((task) => !task.done && !task.project).length,
    today: tasks.filter((task) => !task.done && task.date === todayStr).length,
    upcoming: tasks.filter(
      (task) => !task.done && task.date && task.date > todayStr
    ).length,
    projects: Object.fromEntries(
      PROJECTS.map((p) => [
        p.id,
        tasks.filter((task) => !task.done && task.project === p.id).length
      ])
    )
  }

  function focusAddTask() {
    document.querySelector(".task-form input[type='text']")?.focus()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function focusSearch() {
    document.querySelector(".search-input")?.focus()
  }

  let filteredTasks = tasks
    .filter((task) => {
      if (activeView === "inbox") return !task.project
      if (activeView === "today") return task.date === todayStr
      if (activeView === "upcoming") return task.date && task.date > todayStr
      if (activeView.startsWith("project:")) {
        return task.project === activeView.split(":")[1]
      }
      return true
    })
    .filter((task) => {
      if (currentFilter === "active") return !task.done
      if (currentFilter === "done") return task.done
      return true
    })
    .filter((task) =>
      task.text.toLowerCase().includes(search.trim().toLowerCase())
    )

  if (sortBy === "priority") {
    filteredTasks = [...filteredTasks].sort(
      (a, b) =>
        priorityOrder[a.priority || "medium"] -
        priorityOrder[b.priority || "medium"]
    )
  }

  if (sortBy === "date") {
    filteredTasks = [...filteredTasks].sort((a, b) =>
      (a.date || "9999").localeCompare(b.date || "9999")
    )
  }

  let completedCount = tasks.filter(
    (task) => task.done
  ).length

  let activeCount = tasks.length - completedCount

  let progress = tasks.length === 0
    ? 0
    : Math.round((completedCount / tasks.length) * 100)

  function toggleLanguage() {
    setLanguage((prev) => prev === "ru" ? "en" : "ru")
  }

  function toggleTheme() {
    setTheme((prev) => prev === "dark" ? "light" : "dark")
  }


function registerUser(name, email, password) {
  let exists = users.some(
    (user) => user.email === email.toLowerCase().trim()
  )

  if (exists) {
    return t("emailExists")
  }

  let newUser = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password: password
  }

  let updatedUsers = [...users, newUser]

  setUsers(updatedUsers)
  localStorage.setItem("users", JSON.stringify(updatedUsers))

  setCurrentUser(newUser)
  localStorage.setItem("currentUser", JSON.stringify(newUser))
}

function loginUser(email, password) {
  let user = users.find(
    (item) =>
      item.email === email.toLowerCase().trim() &&
      item.password === password
  )

  if (!user) {
    return t("invalidLogin")
  }

  setCurrentUser(user)
  localStorage.setItem("currentUser", JSON.stringify(user))
}

function logoutUser() {
  setCurrentUser(null)
  localStorage.removeItem("currentUser")
  setAuthPage("login")
}



if (!currentUser) {
  if (authPage === "register") {
    return (
      <Register
        onRegister={registerUser}
        onGoLogin={() => setAuthPage("login")}
        t={t}
      />
    )
  }

  return (
    <Login
      onLogin={loginUser}
      onGoRegister={() => setAuthPage("register")}
      t={t}
    />
  )
}

return (
  <div className={`app ${season} ${theme}`}>
        <Snowfall season={season} />

    <div className="layout">

      <Sidebar
        t={t}
        language={language}
        activeView={activeView}
        onChangeView={setActiveView}
        onAddTask={focusAddTask}
        onSearch={focusSearch}
        counts={counts}
        userName={currentUser.name}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="container">

        <Quotes language={language} />

        <div className="top-bar">
          <button
            className="setting-button menu-toggle"
            onClick={() => setSidebarOpen(true)}
            aria-label="Menu"
          >
            ☰
          </button>
          <span className="season-label">
            {EDITION_LABELS[season] || EDITION_LABELS.winter}
          </span>

          <div className="settings">
            <button
              className="setting-button"
              onClick={toggleLanguage}
              title="Change language"
            >
              🌐 {language.toUpperCase()}
            </button>

            <button
              className="setting-button"
              onClick={toggleTheme}
              title={theme === "dark" ? t("light") : t("dark")}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            <button
            className="setting-button"
            onClick={logoutUser}
            >
            🚪 {language === "ru" ? "Выйти" : "Logout"}
</button>
          </div>

          <select
    className="setting-select"
    value={season}
    onChange={(event) => setSeason(event.target.value)}
    >
      <option value="winter">❄️ {t("winter")}</option>
      <option value="summer">☀️ {t("summer")}</option>
      <option value="halloween">🎃 {t("halloween")}</option>
      </select>
      
      <select
      className="setting-select"
      value={icon}
      onChange={(event) => setIcon(event.target.value)}
    >
      <option value="❄️">❄️ Снежинка</option>
      <option value="⛄">⛄ Снеговик</option>
      <option value="🎅">🎅 Дед Мороз</option>
      <option value="🎄">🎄 Ёлка</option>
      <option value="🎁">🎁 Подарок</option>
      <option value="🦌">🦌 Олень</option>
      </select>
        </div>

        <Header t={t} icon={icon} />

        <TaskForm
          onAddTask={addTask}
          t={t}
          language={language}
          defaultProject={activeView.startsWith("project:") ? activeView.split(":")[1] : ""}
        />

        <div className="progress-section">

          <div className="progress-info">
            <span>{t("progress")}</span>
            <b>{progress}%</b>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

        </div>

          <div className="tools-row">
          <input
            className="search-input"
            type="text"
            placeholder={t("search")}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            className="setting-select"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="default">{t("sortDefault")}</option>
            <option value="priority">{t("sortPriority")}</option>
            <option value="date">{t("sortDate")}</option>
          </select>
        </div>

        <Filters
          currentFilter={currentFilter}
          onChangeFilter={setCurrentFilter}
          t={t}
        />

        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onAddSubtask={addSubtask}
          onToggleSubtask={toggleSubtask}
          onDeleteSubtask={deleteSubtask}
          t={t}
          language={language}
        />

        <div className="footer">

          <p>
            {t("total")}: <b>{tasks.length}</b>
            {" | "}
            {t("remaining")}: <b>{activeCount}</b>
            {" | "}
            {t("completed")}: <b>{completedCount}</b>
          </p>

          <button
            className="clear-button"
            onClick={clearCompleted}
            disabled={completedCount === 0}
          >
            {t("clear")}
          </button>

        </div>

        </main>

    </div>

      <Toast message={message} />

    </div>
  )
}

export {App}