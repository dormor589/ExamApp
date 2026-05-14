import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './QuestionsPage.css'

const QUESTIONS = [
  {
    id: 1,
    text: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    answer: 2,
  },
  {
    id: 2,
    text: 'Which data structure uses LIFO ordering?',
    options: ['Queue', 'Stack', 'Linked List', 'Heap'],
    answer: 1,
  },
  {
    id: 3,
    text: 'What does HTTP stand for?',
    options: [
      'HyperText Transfer Protocol',
      'High Transfer Text Protocol',
      'Hyperlink Text Transfer Process',
      'HyperText Transmission Protocol',
    ],
    answer: 0,
  },
  {
    id: 4,
    text: 'Which planet is closest to the Sun?',
    options: ['Venus', 'Earth', 'Mercury', 'Mars'],
    answer: 2,
  },
  {
    id: 5,
    text: 'What is 12 × 12?',
    options: ['132', '144', '124', '148'],
    answer: 1,
  },
]

function QuestionsPage() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const answered = Object.keys(selected).length

  function handleSelect(qId, optIdx) {
    if (submitted) return
    setSelected((prev) => ({ ...prev, [qId]: optIdx }))
  }

  function handleSubmit() {
    if (answered < QUESTIONS.length) return
    setSubmitted(true)
  }

  function score() {
    return QUESTIONS.filter((q) => selected[q.id] === q.answer).length
  }

  return (
    <div className="qp-bg">
      <div className="qp-container">
        <header className="qp-header">
          <div className="qp-logo">🎓</div>
          <div className="qp-header-text">
            <h1 className="qp-title">General Knowledge Exam</h1>
            <p className="qp-subtitle">
              {submitted
                ? `Score: ${score()} / ${QUESTIONS.length}`
                : `${answered} of ${QUESTIONS.length} answered`}
            </p>
          </div>
          <button className="qp-logout" onClick={() => navigate('/')}>
            Log out
          </button>
        </header>

        <div className="qp-progress-bar">
          <div
            className="qp-progress-fill"
            style={{ width: `${(answered / QUESTIONS.length) * 100}%` }}
          />
        </div>

        {submitted && (
          <div className={`qp-result-banner ${score() >= 3 ? 'pass' : 'fail'}`}>
            {score() >= 3
              ? `Passed! You got ${score()} out of ${QUESTIONS.length} correct.`
              : `Not quite — ${score()} out of ${QUESTIONS.length} correct. Review and try again.`}
          </div>
        )}

        <ol className="qp-list">
          {QUESTIONS.map((q, qi) => (
            <li key={q.id} className="qp-card">
              <p className="qp-question-text">
                <span className="qp-q-num">{qi + 1}.</span> {q.text}
              </p>
              <ul className="qp-options">
                {q.options.map((opt, oi) => {
                  const isSelected = selected[q.id] === oi
                  let state = ''
                  if (submitted) {
                    if (oi === q.answer) state = 'correct'
                    else if (isSelected) state = 'wrong'
                  } else if (isSelected) {
                    state = 'chosen'
                  }
                  return (
                    <li key={oi}>
                      <button
                        className={`qp-option ${state}`}
                        onClick={() => handleSelect(q.id, oi)}
                        disabled={submitted}
                      >
                        <span className="qp-opt-letter">
                          {String.fromCharCode(65 + oi)}
                        </span>
                        {opt}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </li>
          ))}
        </ol>

        {!submitted && (
          <div className="qp-footer">
            <button
              className="qp-submit-btn"
              onClick={handleSubmit}
              disabled={answered < QUESTIONS.length}
            >
              Submit Exam
            </button>
            {answered < QUESTIONS.length && (
              <p className="qp-hint">
                Answer all {QUESTIONS.length} questions to submit.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default QuestionsPage
