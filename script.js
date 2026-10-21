
const soils = [
  {
    name: "Alluvial Soil",
    emoji: "🌾",
    color: "#e8d2a4",
    region: "north east",
    regions: "Northern plains, river valleys and coastal deltas",
    crops: "Rice, wheat, sugarcane and jute",
    features: "Deposited by rivers; generally fertile and important for agriculture.",
    tag: "River Deposits"
  },
  {
    name: "Black Soil",
    emoji: "🌱",
    color: "#d0c3b6",
    region: "central south",
    regions: "Maharashtra, Madhya Pradesh, Gujarat and parts of the Deccan",
    crops: "Cotton, soybean and sorghum",
    features: "Clay-rich soil with high moisture retention; it often develops deep cracks when dry.",
    tag: "Cotton Soil"
  },
  {
    name: "Red and Yellow Soil",
    emoji: "🌿",
    color: "#edc2a0",
    region: "south east central",
    regions: "Tamil Nadu, Karnataka, Andhra Pradesh and parts of eastern India",
    crops: "Millets, pulses, groundnut and suitable irrigated crops",
    features: "Its red colour commonly comes from iron oxides. Fertility varies with local conditions.",
    tag: "Iron-Rich"
  },
  {
    name: "Laterite Soil",
    emoji: "🌴",
    color: "#d7a28a",
    region: "south east",
    regions: "Western Ghats, parts of Kerala, Karnataka, Odisha and the Northeast",
    crops: "Tea, coffee, cashew and rubber in suitable areas",
    features: "Forms under intense weathering and leaching in warm, wet climates; often needs soil improvement.",
    tag: "High Rainfall"
  },
  {
    name: "Arid and Desert Soil",
    emoji: "🌵",
    color: "#f0d5a3",
    region: "central",
    regions: "Western Rajasthan and parts of Gujarat",
    crops: "Millets, pulses and guar, depending on water availability",
    features: "Usually sandy, low in organic matter and often affected by water scarcity or salinity.",
    tag: "Dry Regions"
  },
  {
    name: "Forest and Mountain Soil",
    emoji: "🌲",
    color: "#c7d8b5",
    region: "mountain",
    regions: "Himalayas and other hilly regions",
    crops: "Tea, fruits, spices and other locally suitable crops",
    features: "Varies with altitude, slope and vegetation; some areas have shallow, erosion-prone soil.",
    tag: "Hill Regions"
  }
];

const grid = document.getElementById("soilGrid");
const searchInput = document.getElementById("searchInput");
const regionFilter = document.getElementById("regionFilter");
const noResults = document.getElementById("noResults");

function renderSoils() {
  const query = searchInput.value.toLowerCase().trim();
  const region = regionFilter.value;

  const filtered = soils.filter(soil => {
    const searchable = [
      soil.name, soil.regions, soil.crops,
      soil.features, soil.tag
    ].join(" ").toLowerCase();

    const matchesSearch = searchable.includes(query);
    const matchesRegion =
      region === "all" || soil.region.split(" ").includes(region);

    return matchesSearch && matchesRegion;
  });

  grid.innerHTML = filtered.map(soil => `
    <article class="soil-card">
      <div class="soil-visual" style="background:${soil.color}">
        <span role="img" aria-label="${soil.name} illustration">
          ${soil.emoji}
        </span>
      </div>
      <div class="soil-card-content">
        <span class="soil-tag">${soil.tag}</span>
        <h3>${soil.name}</h3>
        <p>${soil.features}</p>
        <p class="detail"><strong>Regions:</strong> ${soil.regions}</p>
        <p class="detail"><strong>Major crops:</strong> ${soil.crops}</p>
      </div>
    </article>
  `).join("");

  noResults.hidden = filtered.length !== 0;
}

searchInput.addEventListener("input", renderSoils);
regionFilter.addEventListener("change", renderSoils);
renderSoils();

// Dark mode toggle
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );
});

// Interactive quiz
const questions = [
  {
    question: "Which soil is especially associated with cotton cultivation?",
    options: ["Red soil", "Black soil", "Mountain soil", "Desert soil"],
    answer: "Black soil"
  },
  {
    question: "Which soil is deposited by rivers?",
    options: ["Alluvial soil", "Laterite soil", "Desert soil", "Black soil"],
    answer: "Alluvial soil"
  },
  {
    question: "Which soil commonly gets its red colour from iron oxides?",
    options: ["Alluvial soil", "Peaty soil", "Red soil", "Desert soil"],
    answer: "Red soil"
  },
  {
    question: "Which soil is associated with intense weathering and leaching?",
    options: ["Black soil", "Laterite soil", "Alluvial soil", "Desert soil"],
    answer: "Laterite soil"
  },
  {
    question: "Which soil is common in the dry western parts of India?",
    options: ["Mountain soil", "Alluvial soil", "Desert soil", "Laterite soil"],
    answer: "Desert soil"
  }
];

let questionIndex = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("quizOptions");
const feedbackEl = document.getElementById("quizFeedback");
const nextButton = document.getElementById("nextQuestion");
const scoreEl = document.getElementById("score");

function showQuestion() {
  const current = questions[questionIndex];
  answered = false;

  questionEl.textContent = current.question;
  feedbackEl.textContent = "";
  optionsEl.innerHTML = "";

  current.options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;

    button.addEventListener("click", () => {
      if (answered) return;
      answered = true;

      if (option === current.answer) {
        score++;
        feedbackEl.textContent = "Correct! Well done. 🌱";
      } else {
        feedbackEl.textContent =
          `Not quite. The correct answer is ${current.answer}.`;
      }

      [...optionsEl.querySelectorAll("button")].forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === current.answer) {
          btn.classList.add("selected");
        }
      });

      scoreEl.textContent =
        `Score: ${score} / ${questionIndex + 1}`;
    });

    optionsEl.appendChild(button);
  });

  nextButton.textContent =
    questionIndex === questions.length - 1
      ? "Play Again ↻"
      : "Next Question →";
}

nextButton.addEventListener("click", () => {
  if (questionIndex === questions.length - 1) {
    questionIndex = 0;
    score = 0;
    scoreEl.textContent = "";
  } else {
    if (!answered) {
      feedbackEl.textContent = "Choose an answer first!";
      return;
    }
    questionIndex++;
  }

  showQuestion();
});

showQuestion();
