import {useState} from "react"

function Login({ onLogin, onGoRegister, t }) {
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [error, setError] = useState("")

  function handleSubmit(event) {
    event.preventDefault()

    let result = onLogin(email, password)

    if(result) {
      setError(result)
    }
  }

  return(
    <div className="auth-screen">
      <div className="auth-card">
        <h1>🔐 To-Do Check</h1>
        <h2>{t("login")}</h2>

        <form onSubmit={handleSubmit}>
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

          {error && <p className="auth-error">{error}</p>}

          <button type="submit">
            {t("login")}
          </button>
        </form>

        <p>
          {t("noAccount")}
          <span onClick={onGoRegister}>
            {t("register")}
          </span>
        </p>
      </div>
    </div>
  )
}

export {Login}
