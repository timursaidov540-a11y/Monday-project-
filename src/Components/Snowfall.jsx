function Snowfall({season}) {
  let effects = {
    winter: ["❄", "❅", "❆"],
    summer: ["☀️", "✨", "🌴"],
    halloween: ["🎃", "🦇", "✨"]
  }

  let particles = Array.from({ length: 35 })

  return (
    <div className="snowfall">
      {particles.map((_, index) => {
        let symbols = effects[season] || effects.winter

        return (
          <span
            key={index}
            className={`snowflake ${season}-particle`}
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${5 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 10}s`,
              fontSize: `${12 + Math.random() * 15}px`
            }}
          >
            {symbols[index % symbols.length]}
          </span>
        )
      })}
    </div>
  )
}

export {Snowfall}
