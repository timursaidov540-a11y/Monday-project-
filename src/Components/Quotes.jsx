
let quotes = {
  ru: [
    { text: "Большие дела начинаются с маленьких шагов.", author: "Неизвестный автор" },
    { text: "Не обязательно быть великим, чтобы начать. Но нужно начать, чтобы стать великим.", author: "Зиг Зиглар" },
    { text: "Будущее зависит от того, что ты делаешь сегодня.", author: "Махатма Ганди" },
    { text: "Каждый день — это новый шанс стать лучше.", author: "Неизвестный автор" },
    { text: "Успех — это сумма небольших усилий, повторяемых изо дня в день.", author: "Роберт Коллиер" },
    { text: "Не бойся медленно идти, бойся стоять на месте.", author: "Китайская пословица" },
    { text: "Трудности делают тебя сильнее.", author: "Неизвестный автор" },
  ],
  en: [
    { text: "Great things start with small steps.", author: "Unknown" },
    { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
    { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
    { text: "Every day is a new chance to become better.", author: "Unknown" },
    { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
    { text: "Don't be afraid of going slowly, be afraid of standing still.", author: "Chinese proverb" },
    { text: "Difficulties make you stronger.", author: "Unknown" },
  ],
}

export function Quotes({ language }) {
  let today = new Date().toDateString()

  let startDate = new Date("2026-01-01")
  let currentDate = new Date(today)

  let daysPassed = Math.floor(
    (currentDate - startDate) / (1000 * 60 * 60 * 24)
  )

  let dailyQuotes = quotes[language] || quotes.ru
  let quoteIndex = daysPassed % dailyQuotes.length
  let quote = dailyQuotes[quoteIndex]

  return (
    <div className="quote-card">
      <span className="quote-icon">✦</span>
      <p className="quote-label">
        {language === "en" ? "QUOTE OF THE DAY" : "ЦИТАТА ДНЯ"}
      </p>

      <h3>"{quote.text}"</h3>
      <p className="quote-author">— {quote.author}</p>
    </div>
  )
}
