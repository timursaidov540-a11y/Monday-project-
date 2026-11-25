import {useState} from "react"

function Register({ onRegister, onGoLogin, t }) {
  let [name, setName] = useState("")
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [repeatPassword, setRepeatPassword] = useState("")
  let [error, setError] = useState("")

  function handleSubmit(event) {
    event.preventDefault()

    if(password.length < 6) {
      setError(t("passwordShort"))
      return
    }

    if(password !== repeatPassword) {
      setError(t("passwordMismatch"))
      return
    }

    let result = onRegister(name, email, password)

    if(result) {
      setError(result)
    }
  }

  return(
    <div className="auth-screen">
      <div className="auth-card">
        <h1>🎄 To-Do Check</h1>
        <h2>{t("register")}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={t("name")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder={t("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder={t("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder={t("repeatPassword")}
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
          />

          {error && <p className="auth-error">{error}</p>}

          <button type="submit">
            {t("register")}
          </button>
        </form>

        <p>
          {t("hasAccount")}
          <span onClick={onGoLogin}>
            {t("login")}
          </span>
        </p>
      </div>
    </div>
  )
}

export {Register}
