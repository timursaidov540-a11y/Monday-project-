function Filters({currentFilter, onChangeFilter, t}) {
  let filters = [
    { value: "all", label: t("all") },
    { value: "active", label: t("active") },
    { value: "done", label: t("done") }
  ]

  return (
    <div className="filters">

      {filters.map((filter) => (
        <button
          key={filter.value}
          className={
            currentFilter === filter.value ? "active" : ""
          }
          onClick={() => onChangeFilter(filter.value)}
        >
          {filter.label}
        </button>
      ))}

    </div>
  )
}

export {Filters}
