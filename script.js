const imageStage = document.getElementById("imageStage");
const exerciseImage = document.getElementById("exerciseImage");
const instructionText = document.getElementById("instructionText");
const pageIndicator = document.getElementById("pageIndicator");
const progressText = document.getElementById("progressText");
const scoreValue = document.getElementById("scoreValue");
const scoreTotal = document.getElementById("scoreTotal");
const pageScore = document.getElementById("pageScore");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const validateBtn = document.getElementById("validateBtn");
const resetBtn = document.getElementById("resetBtn");

const arrowLine = document.getElementById("arrowLine");
const arrowHead1 = document.getElementById("arrowHead1");
const arrowHead2 = document.getElementById("arrowHead2");
const tailHandle = document.getElementById("tailHandle");
const headHandle = document.getElementById("headHandle");

const feedbackModal = document.getElementById("feedbackModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const feedbackOrigin = document.getElementById("feedbackOrigin");
const feedbackDirection = document.getElementById("feedbackDirection");
const feedbackSense = document.getElementById("feedbackSense");
const feedbackBravo = document.getElementById("feedbackBravo");

const starterArrow = document.getElementById("starterArrow");

const VIEW_W = 800;
const VIEW_H = 600;

let currentIndex = 0;
let dragTarget = null;

let state = {
  tail: { x: 120, y: 160 },
  head: { x: 220, y: 120 }
};

let pageResults = {};

scoreTotal.textContent = String(EXERCISES.filter(ex => ex.type === "exercise").length);

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function toLocalPoint(clientX, clientY) {
  const rect = imageStage.getBoundingClientRect();
  const x = ((clientX - rect.left) / rect.width) * VIEW_W;
  const y = ((clientY - rect.top) / rect.height) * VIEW_H;

  return {
    x: clamp(x, 0, VIEW_W),
    y: clamp(y, 0, VIEW_H)
  };
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function vector(a, b) {
  return {
    x: b.x - a.x,
    y: b.y - a.y
  };
}

function norm(v) {
  return Math.hypot(v.x, v.y);
}

function normalize(v) {
  const n = norm(v);
  if (n < 0.0001) return { x: 0, y: 0 };
  return { x: v.x / n, y: v.y / n };
}

function dot(a, b) {
  return a.x * b.x + a.y * b.y;
}

function angleBetweenDeg(a, b) {
  const na = normalize(a);
  const nb = normalize(b);
  const value = clamp(dot(na, nb), -1, 1);
  return Math.acos(value) * 180 / Math.PI;
}

function setArrow(tail, head) {
  state.tail = { ...tail };
  state.head = { ...head };
  renderArrow();
}

function renderArrow() {
  arrowLine.setAttribute("x1", state.tail.x);
  arrowLine.setAttribute("y1", state.tail.y);
  arrowLine.setAttribute("x2", state.head.x);
  arrowLine.setAttribute("y2", state.head.y);

  tailHandle.setAttribute("cx", state.tail.x);
  tailHandle.setAttribute("cy", state.tail.y);

  headHandle.setAttribute("cx", state.head.x);
  headHandle.setAttribute("cy", state.head.y);

  const v = vector(state.tail, state.head);
  const n = normalize(v);
  const arrowSize = 18;

  const left = {
    x: state.head.x - n.x * arrowSize - n.y * 10,
    y: state.head.y - n.y * arrowSize + n.x * 10
  };

  const right = {
    x: state.head.x - n.x * arrowSize + n.y * 10,
    y: state.head.y - n.y * arrowSize - n.x * 10
  };

  arrowHead1.setAttribute("x1", state.head.x);
  arrowHead1.setAttribute("y1", state.head.y);
  arrowHead1.setAttribute("x2", left.x);
  arrowHead1.setAttribute("y2", left.y);

  arrowHead2.setAttribute("x1", state.head.x);
  arrowHead2.setAttribute("y1", state.head.y);
  arrowHead2.setAttribute("x2", right.x);
  arrowHead2.setAttribute("y2", right.y);
}

function getExerciseScoreCount() {
  return Object.values(pageResults).filter(Boolean).length;
}

function updateScoreDisplay() {
  scoreValue.textContent = String(getExerciseScoreCount());

  const current = EXERCISES[currentIndex];
  if (current.type === "exercise") {
    pageScore.textContent = pageResults[current.id] ? "1" : "0";
  } else {
    pageScore.textContent = "0";
  }
}

function updateNavButtons() {
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === EXERCISES.length - 1;
}

function defaultArrowForExercise(exercise) {
  if (exercise.type === "training") {
    return {
      tail: { ...exercise.initialArrow.tail },
      head: { ...exercise.initialArrow.head }
    };
  }

  return {
    tail: { x: 130, y: 120 },
    head: { x: 220, y: 120 }
  };
}

function loadExercise(index) {
  currentIndex = index;
  const exercise = EXERCISES[currentIndex];

  pageIndicator.textContent = exercise.pageLabel;
  progressText.textContent = `Exercice ${exercise.pageLabel}`;
  instructionText.textContent = exercise.instruction;
  exerciseImage.src = exercise.image;

  const startArrow = defaultArrowForExercise(exercise);
  setArrow(startArrow.tail, startArrow.head);

  starterArrow.style.visibility = exercise.type === "training" ? "hidden" : "visible";
  updateNavButtons();
  updateScoreDisplay();
  hideModal();
}

function resetCurrentExercise() {
  const exercise = EXERCISES[currentIndex];
  const startArrow = defaultArrowForExercise(exercise);
  setArrow(startArrow.tail, startArrow.head);
  hideModal();
}

function evaluateCurrentExercise() {
  const exercise = EXERCISES[currentIndex];

  if (exercise.type === "training") {
    feedbackOrigin.textContent = "Page d'entraînement : manipule librement la flèche.";
    feedbackDirection.textContent = "Tu peux déplacer l'origine et l'extrémité.";
    feedbackSense.textContent = "Passe ensuite à la page suivante.";
    feedbackBravo.classList.add("hidden");
    showModal();
    return;
  }

  const expectedTail = exercise.expected.tail;
  const expectedVector = exercise.expected.vector;
  const userVector = vector(state.tail, state.head);

  const originOk = distance(state.tail, expectedTail) <= exercise.expected.originTolerance;

  let directionOk = false;
  let senseOk = false;

  if (norm(userVector) > 12) {
    const angle = angleBetweenDeg(userVector, expectedVector);
    directionOk = angle <= exercise.expected.angleToleranceDeg || Math.abs(angle - 180) <= exercise.expected.angleToleranceDeg;
    senseOk = angle <= exercise.expected.angleToleranceDeg;
  }

  feedbackOrigin.textContent = originOk
    ? "L'origine est correcte."
    : "L'origine n'est pas correcte.";

  feedbackDirection.textContent = directionOk
    ? "La direction est correcte."
    : "La direction n'est pas correcte.";

  feedbackSense.textContent = senseOk
    ? "Le sens est correct."
    : "Le sens n'est pas correct.";

  const allOk = originOk && directionOk && senseOk;

  if (allOk) {
    pageResults[exercise.id] = true;
    feedbackBravo.classList.remove("hidden");
  } else {
    pageResults[exercise.id] = false;
    feedbackBravo.classList.add("hidden");
  }

  updateScoreDisplay();
  showModal();
}

function showModal() {
  feedbackModal.classList.remove("hidden");
  feedbackModal.setAttribute("aria-hidden", "false");
}

function hideModal() {
  feedbackModal.classList.add("hidden");
  feedbackModal.setAttribute("aria-hidden", "true");
}

function startDrag(target, event) {
  event.preventDefault();
  dragTarget = target;
}

function moveDrag(event) {
  if (!dragTarget) return;

  const point = toLocalPoint(event.clientX, event.clientY);

  if (dragTarget === "tail") {
    state.tail = point;
  } else if (dragTarget === "head") {
    state.head = point;
  }

  renderArrow();
}

function stopDrag() {
  dragTarget = null;
}

tailHandle.addEventListener("pointerdown", (event) => startDrag("tail", event));
headHandle.addEventListener("pointerdown", (event) => startDrag("head", event));

window.addEventListener("pointermove", moveDrag);
window.addEventListener("pointerup", stopDrag);
window.addEventListener("pointercancel", stopDrag);

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) loadExercise(currentIndex - 1);
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < EXERCISES.length - 1) loadExercise(currentIndex + 1);
});

validateBtn.addEventListener("click", evaluateCurrentExercise);
resetBtn.addEventListener("click", resetCurrentExercise);
closeModalBtn.addEventListener("click", hideModal);

feedbackModal.addEventListener("click", (event) => {
  if (event.target === feedbackModal) hideModal();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") hideModal();
});

loadExercise(0);
