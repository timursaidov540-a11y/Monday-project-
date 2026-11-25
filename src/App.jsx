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
    invalidLogin: "Неверный email или пароль"
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
    invalidLogin: "Incorrect email or password"
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

  
function addTask(text, date) {
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
    done: false
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

  function clearCompleted() {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => !task.done)
    )
  }

  let filteredTasks = tasks.filter((task) => {
    if (currentFilter === "active") {
      return !task.done
    }

    if (currentFilter === "done") {
      return task.done
    }

    return true
  })

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
    <Quotes language={language} />


      <Snowfall season={season} />

      <div className="container">

        <div className="top-bar">
          <span className="season-label">
            ✨ CHRISTMAS EDITION
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

        <Filters
          currentFilter={currentFilter}
          onChangeFilter={setCurrentFilter}
          t={t}
        />

        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
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

      </div>

      <Toast message={message} />

    </div>
  )
}

export { App }