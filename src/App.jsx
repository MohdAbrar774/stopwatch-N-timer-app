import { useEffect, useMemo, useState } from 'react'
import './App.css'

const formatStopwatch = (milliseconds) => {
  const totalCentis = Math.max(0, Math.floor(milliseconds / 10))
  const minutes = Math.floor(totalCentis / 6000)
  const seconds = Math.floor((totalCentis % 6000) / 100)
  const centiseconds = totalCentis % 100
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`
}

const formatTimer = (milliseconds) => {
  const totalSeconds = Math.max(0, Math.ceil(milliseconds / 1000))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function App() {
  const [activeView, setActiveView] = useState('stopwatch')
  const [theme, setTheme] = useState('light')

  const [stopwatchMs, setStopwatchMs] = useState(0)
  const [stopwatchRunning, setStopwatchRunning] = useState(false)
  const [laps, setLaps] = useState([])

  const [timerMinutes, setTimerMinutes] = useState('0')
  const [timerSeconds, setTimerSeconds] = useState('30')
  const [timerMs, setTimerMs] = useState(0)
  const [timerRunning, setTimerRunning] = useState(false)
  const [timerEnded, setTimerEnded] = useState(false)

  useEffect(() => {
    if (!stopwatchRunning) return undefined

    const intervalId = window.setInterval(() => {
      setStopwatchMs((current) => current + 100)
    }, 100)

    return () => window.clearInterval(intervalId)
  }, [stopwatchRunning])

  useEffect(() => {
    if (!timerRunning || timerMs <= 0) return undefined

    const intervalId = window.setInterval(() => {
      setTimerMs((current) => {
        if (current <= 100) {
          setTimerRunning(false)
          setTimerEnded(true)
          return 0
        }
        return current - 100
      })
    }, 100)

    return () => window.clearInterval(intervalId)
  }, [timerRunning, timerMs])

  const timerStatus = useMemo(() => {
    if (timerEnded && timerMs === 0) return 'Time is up!'
    if (timerRunning) return 'Running'
    if (timerMs > 0) return 'Paused'
    return 'Ready to start'
  }, [timerEnded, timerMs, timerRunning])

  const handleTimerStart = () => {
    const minutes = Number(timerMinutes)
    const seconds = Number(timerSeconds)
    const requestedSeconds = Math.max(0, Math.floor(minutes) * 60 + Math.floor(seconds))

    if (timerMs === 0) {
      if (requestedSeconds <= 0) return
      setTimerMs(requestedSeconds * 1000)
    }
    setTimerRunning(true)
    setTimerEnded(false)
  }

  const handleTimerPause = () => {
    setTimerRunning(false)
  }

  const handleTimerReset = () => {
    setTimerRunning(false)
    setTimerMs(0)
    setTimerEnded(false)
  }

  const handleMinutesChange = (event) => {
    const value = event.target.value.replace(/[^0-9]/g, '')
    setTimerMinutes(value === '' ? '0' : value)
  }

  const handleSecondsChange = (event) => {
    let value = event.target.value.replace(/[^0-9]/g, '')
    if (value === '') {
      setTimerSeconds('0')
      return
    }
    const numeric = Math.min(59, Number(value))
    setTimerSeconds(String(numeric))
  }

  const timerDisplay = timerMs > 0 ? formatTimer(timerMs) : '00:00:00'

  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'))
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <main className={`app-shell ${theme}`}>
      <header className="app-header">
        <div>
          <p className="eyebrow">React Stopwatch & Timer</p>
          <h1>Time control made simple</h1>
        </div>
        <div className="header-controls">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <div className="tab-row" role="tablist" aria-label="Timer tabs">
          {['stopwatch', 'timer'].map((view) => (
            <button
              key={view}
              type="button"
              className={view === activeView ? 'tab-button active' : 'tab-button'}
              onClick={() => setActiveView(view)}
              role="tab"
              aria-selected={view === activeView}
            >
              {view === 'stopwatch' ? 'Stopwatch' : 'Timer'}
            </button>
          ))}
          </div>
        </div>
      </header>

      <section className="panel-grid">
        <article className={`panel card ${activeView !== 'stopwatch' ? 'panel-hidden' : ''}`}>
          <div className="panel-title">
            <div>
              <p className="panel-label">Stopwatch</p>
              <h2>Track elapsed time</h2>
            </div>
            <span className="status-chip">
              {stopwatchRunning ? 'Running' : stopwatchMs === 0 ? 'Ready' : 'Paused'}
            </span>
          </div>

          <div className="display display-large">{formatStopwatch(stopwatchMs)}</div>
          <div className="controls-row">
            <button
              type="button"
              className="button primary"
              onClick={() => setStopwatchRunning((current) => !current)}
            >
              {stopwatchRunning ? 'Pause' : stopwatchMs === 0 ? 'Start' : 'Resume'}
            </button>
            <button
              type="button"
              className="button secondary"
              onClick={() => {
                if (stopwatchMs > 0) {
                  setLaps([...laps, stopwatchMs])
                }
              }}
              disabled={stopwatchMs === 0 || !stopwatchRunning}
            >
              Lap
            </button>
            <button type="button" className="button secondary" onClick={() => {
              setStopwatchRunning(false)
              setStopwatchMs(0)
              setLaps([])
            }}>
              Reset
            </button>
          </div>

          {laps.length > 0 && (
            <div className="laps-list">
              <h3>Laps</h3>
              <div className="laps">
                {laps.map((lap, index) => (
                  <div key={index} className="lap-item">
                    <span className="lap-number">Lap {index + 1}</span>
                    <span className="lap-time">{formatStopwatch(lap)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>

        <article className={`panel card ${activeView !== 'timer' ? 'panel-hidden' : ''}`}>
          <div className="panel-title">
            <div>
              <p className="panel-label">Timer</p>
              <h2>Countdown clock</h2>
            </div>
            <span className="status-chip status-timer">{timerStatus}</span>
          </div>

          <div className="display display-large">{timerDisplay}</div>

          <div className="timer-inputs">
            <label className="field-group">
              <span>Minutes</span>
              <input
                type="number"
                min="0"
                value={timerMinutes}
                onChange={handleMinutesChange}
                disabled={timerRunning}
              />
            </label>
            <label className="field-group">
              <span>Seconds</span>
              <input
                type="number"
                min="0"
                max="59"
                value={timerSeconds}
                onChange={handleSecondsChange}
                disabled={timerRunning}
              />
            </label>
          </div>

          <div className="controls-row">
            <button type="button" className="button primary" onClick={handleTimerStart}>
              {timerRunning ? 'Running' : timerMs > 0 ? 'Resume' : 'Start'}
            </button>
            <button type="button" className="button secondary" onClick={handleTimerPause}>
              Pause
            </button>
            <button type="button" className="button secondary" onClick={handleTimerReset}>
              Reset
            </button>
          </div>
        </article>
      </section>

      <section className="info-card card">
        <p>
          Use the stopwatch to keep track of elapsed time and the timer for a custom countdown.
          The controls update instantly and the layout is responsive for mobile and desktop.
        </p>
      </section>
    </main>
  )
}

export default App