const CONFIG = {
  // Paste the deployed Google Apps Script /exec URL here when it is ready.
  backendUrl: "",
  assistantName: "The Birthday Penguin",
  maxHistory: 10
};

const screens = {
  delivery: document.getElementById("deliveryScreen"),
  verification: document.getElementById("verificationScreen"),
  world: document.getElementById("worldScreen"),
  final: document.getElementById("finalScreen")
};

const questions = [
  {
    question: "How often should you restart your laptop?",
    answers: ["Every day", "Every year", "I don’t know, whenever"],
    correct: 2,
    reaction: "Correct. Preventative maintenance is apparently for other people."
  },
  {
    question: "What should Omkar say when Saule says something serious?",
    answers: ["Noted", "Yes ma’am", "This requires escalation"],
    correct: 1,
    reaction: "Correct. A respectful and highly efficient response."
  },
  {
    question: "How do you give Omkar a heart attack?",
    answers: ["Stare at him", "Send him “hi” without context", "Both of the above"],
    correct: 2,
    reaction: "Identity confirmed. This is definitely Saule."
  }
];

const panels = {
  books: {
    kicker: "The reading department",
    title: "Books. Obviously.",
    html: `<p>The shelves have been instructed to keep expanding. Nobody knows how many books are enough, but the official estimate remains: <strong>more</strong>.</p>`
  },
  laptop: {
    kicker: "Technical support record",
    title: "Restart schedule: unclear",
    html: `<p>The laptop will be restarted at a sensible and carefully planned time.</p><p>That time is apparently: <strong>whenever</strong>.</p>`
  },
  calendar: {
    kicker: "The 29 July committee",
    title: "A complicated date in history",
    html: `<div class="committee-list">
      <div class="committee-item"><strong>Fernando Alonso</strong><br>Drives enough for Saule and several other people.</div>
      <div class="committee-item"><strong>Benito Mussolini</strong><br>Removed from the birthday group chat.</div>
      <div class="committee-item"><strong>Dag Hammarskjöld</strong><br>Providing respectable diplomatic representation.</div>
      <div class="committee-item"><strong>Saule Sulcaite</strong><br>Clearly the best result of the date.</div>
    </div>`
  },
  keys: {
    kicker: "Transport policy",
    title: "Car keys detected",
    html: `<p>Thank you, but no. A bicycle has already been arranged.</p>`
  },
  food: {
    kicker: "India, briefly",
    title: "One visit. Several foods.",
    html: `<p>Pani puri approval appears promising.</p><p>The heavily promoted gulab jamun, however, has been formally classified as <strong>mid</strong>.</p>`
  },
  bike: {
    kicker: "Preferred transport",
    title: "Two wheels, no problem",
    html: `<p>Books secured. Penguin balanced. Cat refusing to cooperate. The bicycle journey may now begin.</p>`
  }
};

const catLines = [
  "She sent ‘hi’ without context again, didn’t she?",
  "The laptop could be restarted. Theoretically.",
  "I have reviewed the birthday arrangements. Adequate.",
  "The penguin thinks it is in charge. Adorable.",
  "No car. I checked."
];

let questionIndex = 0;
let chatHistory = [];
let catLineIndex = 0;
let soundEnabled = false;
const sessionId = createSessionId();

function createSessionId() {
  if (window.crypto?.getRandomValues) {
    const bytes = new Uint8Array(12);
    window.crypto.getRandomValues(bytes);
    return Array.from(bytes, b => b.toString(16).padStart(2, "0")).join("");
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function showScreen(name) {
  Object.values(screens).forEach(screen => screen.classList.remove("active"));
  screens[name].classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderQuestion() {
  const questionArea = document.getElementById("questionArea");
  const item = questions[questionIndex];
  questionArea.innerHTML = `
    <p class="question-number">Question ${questionIndex + 1} of ${questions.length}</p>
    <p class="question-title">${item.question}</p>
    <div class="answer-grid">
      ${item.answers.map((answer, index) => `<button class="answer-button" data-answer="${index}">${String.fromCharCode(65 + index)}. ${answer}</button>`).join("")}
    </div>`;

  document.querySelectorAll(".progress-dot").forEach((dot, index) => {
    dot.classList.toggle("active", index <= questionIndex);
  });

  questionArea.querySelectorAll("[data-answer]").forEach(button => {
    button.addEventListener("click", () => checkAnswer(Number(button.dataset.answer), button));
  });
}

function checkAnswer(answerIndex, button) {
  const item = questions[questionIndex];
  const reaction = document.getElementById("verificationReaction");

  if (answerIndex !== item.correct) {
    button.classList.remove("wrong");
    void button.offsetWidth;
    button.classList.add("wrong");
    reaction.textContent = "The penguin looks unconvinced. Try again.";
    playTone(180, 0.08);
    return;
  }

  button.classList.add("correct");
  reaction.textContent = item.reaction;
  playTone(520, 0.08);

  setTimeout(() => {
    questionIndex += 1;
    if (questionIndex < questions.length) {
      renderQuestion();
      reaction.textContent = "";
    } else {
      showScreen("world");
    }
  }, 900);
}

function openInfoPanel(key) {
  const panel = panels[key];
  if (!panel) return;

  document.getElementById("modalKicker").textContent = panel.kicker;
  document.getElementById("modalTitle").textContent = panel.title;
  document.getElementById("modalContent").innerHTML = panel.html;
  setModalState("infoModal", true);
  playTone(360, 0.05);
}

function setModalState(id, open) {
  const modal = document.getElementById(id);
  modal.classList.toggle("open", open);
  modal.setAttribute("aria-hidden", String(!open));
  document.body.style.overflow = open ? "hidden" : "";
}

function showCatLine() {
  const bubble = document.getElementById("catBubble");
  bubble.textContent = catLines[catLineIndex % catLines.length];
  catLineIndex += 1;
  bubble.classList.add("show");
  playTone(250, 0.04);
  clearTimeout(showCatLine.timeout);
  showCatLine.timeout = setTimeout(() => bubble.classList.remove("show"), 3500);
}

function addChatMessage(role, text) {
  const log = document.getElementById("chatLog");
  const message = document.createElement("div");
  message.className = `chat-message ${role}`;
  message.textContent = text;
  log.appendChild(message);
  log.scrollTop = log.scrollHeight;
}

async function sendChatMessage(text) {
  const status = document.getElementById("chatStatus");
  const input = document.getElementById("chatInput");
  const submit = document.querySelector("#chatForm button");

  addChatMessage("user", text);
  chatHistory.push({ role: "user", content: text });
  chatHistory = chatHistory.slice(-CONFIG.maxHistory);
  input.disabled = true;
  submit.disabled = true;
  status.textContent = "The penguin is considering this very seriously…";

  let reply = "The backend has not been connected yet. Omkar still needs to add the Apps Script /exec URL, yes ma’am.";

  if (CONFIG.backendUrl) {
    try {
      const response = await fetch(CONFIG.backendUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ sessionId, messages: chatHistory })
      });

      if (!response.ok) throw new Error(`Backend returned ${response.status}`);
      const data = await response.json();
      if (!data.ok || !data.reply) throw new Error(data.error || "No reply received");
      reply = String(data.reply).trim();
    } catch (error) {
      console.error("Birthday penguin request failed:", error);
      reply = "The penguin has encountered a technical problem and is blaming the laptop restart schedule.";
    }
  }

  chatHistory.push({ role: "assistant", content: reply });
  chatHistory = chatHistory.slice(-CONFIG.maxHistory);
  addChatMessage("assistant", reply);
  status.textContent = "";
  input.disabled = false;
  submit.disabled = false;
  input.focus();
  playTone(440, 0.05);
}

function playTone(frequency, duration) {
  if (!soundEnabled) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const context = playTone.context || (playTone.context = new AudioContext());
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.frequency.value = frequency;
  oscillator.type = "sine";
  gain.gain.setValueAtTime(0.045, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + duration);
}

document.getElementById("acceptDelivery").addEventListener("click", () => {
  showScreen("verification");
  renderQuestion();
});

document.querySelectorAll("[data-panel]").forEach(button => {
  button.addEventListener("click", () => openInfoPanel(button.dataset.panel));
});

document.querySelectorAll("[data-close-modal]").forEach(button => {
  button.addEventListener("click", () => setModalState("infoModal", false));
});

document.getElementById("catButton").addEventListener("click", showCatLine);

document.getElementById("penguinButton").addEventListener("click", () => {
  setModalState("chatModal", true);
  document.getElementById("chatInput").focus();
});

document.querySelectorAll("[data-close-chat]").forEach(button => {
  button.addEventListener("click", () => setModalState("chatModal", false));
});

document.getElementById("chatForm").addEventListener("submit", event => {
  event.preventDefault();
  const input = document.getElementById("chatInput");
  const text = input.value.trim();
  if (!text) return;
  input.value = "";
  sendChatMessage(text);
});

document.getElementById("soundToggle").addEventListener("click", event => {
  soundEnabled = !soundEnabled;
  event.currentTarget.setAttribute("aria-pressed", String(soundEnabled));
  event.currentTarget.textContent = soundEnabled ? "Sound on" : "Sound off";
  playTone(620, 0.08);
});

document.getElementById("finalParcel").addEventListener("click", () => {
  playTone(660, 0.12);
  showScreen("final");
});

document.getElementById("replayButton").addEventListener("click", () => window.location.reload());

document.addEventListener("keydown", event => {
  if (event.key !== "Escape") return;
  setModalState("infoModal", false);
  setModalState("chatModal", false);
});
