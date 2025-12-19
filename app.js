const STUDY_TIME = 25 * 60;
let timeLeft = STUDY_TIME;
let timer = null;
let sessionsCompleted = 0;

const timerDisplay = document.getElementById("timer");
const statsDisplay = document.getElementById("stats");

const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");

function formatTime(seconds) {
  const min = String(Math.floor(seconds / 60)).padStart(2, "0");
  const sec = String(seconds % 60).padStart(2, "0");
  return `${min}:${sec}`;
}

function updateDisplay() {
  timerDisplay.textContent = formatTime(timeLeft);
  statsDisplay.textContent = `Sessões concluídas: ${sessionsCompleted}`;
}

function startTimer() {
  if (timer) return;

  timer = setInterval(() => {
    timeLeft--;

    if (timeLeft <= 0) {
      clearInterval(timer);
      timer = null;
      sessionsCompleted++;
      saveProgress();
      timeLeft = STUDY_TIME;
      alert("Sessão concluída! 💪");
    }

    updateDisplay();
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  timer = null;
}

function resetTimer() {
  pauseTimer();
  timeLeft = STUDY_TIME;
  updateDisplay();
}

function saveProgress() {
  localStorage.setItem("sessions", sessionsCompleted);
}

function loadProgress() {
  const saved = localStorage.getItem("sessions");
  if (saved) sessionsCompleted = Number(saved);
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

loadProgress();
updateDisplay();
