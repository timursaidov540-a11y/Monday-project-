function Header({t, icon}) {
  return (
    <header className="header">
      <div className="logo">{icon}</div>

      <div>
        <h1>To-Do Check</h1>
        <p>{t("subtitle")}</p>
      </div>
    </header>
  )
}

export {Header}
