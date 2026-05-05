const poets = [
  {
    id: "dickinson",
    name: "Emily Dickinson",
    shortName: "Dickinson",
    era: "Amherst compression engine",
    avatar: "ED",
    model: "theo.clone.dickinson.v3",
    voice: "compressed, slanted, electric",
    corpus: "1,789 poems, fascicle variants, letters, dash-pattern scans",
    strengths: ["compression", "voltage", "syntactic surprise", "metaphysical hinge"],
    prompt: "Give the draft more pressure. Cut the explaining tissue and let one impossible image carry the charge.",
    questions: [
      "Which word is doing only social work?",
      "Where can the poem turn on a dash instead of a full explanation?",
      "What private terror is hiding under the neatest line?"
    ]
  },
  {
    id: "rilke",
    name: "Rainer Maria Rilke",
    shortName: "Rilke",
    era: "Interior image oracle",
    avatar: "RR",
    model: "theo.clone.rilke.v2",
    voice: "patient, inward, luminous",
    corpus: "Duino/Elegies matrix, letters, object-poem annotations, German-English parallel set",
    strengths: ["object attention", "spiritual pressure", "patience", "image transformation"],
    prompt: "Let the object look back. Slow the poem until the image becomes an inner event rather than decoration.",
    questions: [
      "What object in the draft wants to become a soul?",
      "Where are you moving too quickly past wonder?",
      "What would change if the poem trusted silence for one more beat?"
    ]
  },
  {
    id: "neruda",
    name: "Pablo Neruda",
    shortName: "Neruda",
    era: "Ode and appetite model",
    avatar: "PN",
    model: "theo.clone.neruda.v4",
    voice: "sensual, civic, oceanic",
    corpus: "elemental odes, love poems, residencias, image-chain embeddings",
    strengths: ["sensory abundance", "public feeling", "eros", "surreal association"],
    prompt: "Give the poem a body. Let taste, salt, metal, fruit, weather, and history enter the room.",
    questions: [
      "Which abstract feeling needs a physical appetite?",
      "Where can the poem become more generous without becoming vague?",
      "What ordinary object deserves a ceremonial ode?"
    ]
  },
  {
    id: "oliver",
    name: "Mary Oliver",
    shortName: "Oliver",
    era: "Attention and wonder guide",
    avatar: "MO",
    model: "theo.clone.oliver.v2",
    voice: "clear, devotional, attentive",
    corpus: "nature poems, craft interviews, line-level clarity labels, attention maps",
    strengths: ["plain speech", "wonder", "moral clarity", "natural observation"],
    prompt: "Make the poem more available without flattening it. Let one witnessed detail open into a question of how to live.",
    questions: [
      "What did you actually notice, before interpretation arrived?",
      "Which line could become simpler and therefore more piercing?",
      "Where does the poem invite the reader to be alive?"
    ]
  },
  {
    id: "plath",
    name: "Sylvia Plath",
    shortName: "Plath",
    era: "Mythic intensity forge",
    avatar: "SP",
    model: "theo.clone.plath.v3",
    voice: "mythic, bright-edged, dangerous",
    corpus: "Ariel variants, journals, BBC recordings, color and sound intensity tags",
    strengths: ["psychic heat", "image violence", "sound", "mythic staging"],
    prompt: "Raise the stakes of the image. If the poem is angry, give the anger a costume, a color, and a blade.",
    questions: [
      "Which safe image wants to become feral?",
      "Where can sound make the emotion unavoidable?",
      "What myth is the speaker accidentally reenacting?"
    ]
  },
  {
    id: "basho",
    name: "Matsuo Basho",
    shortName: "Basho",
    era: "Haiku perception lens",
    avatar: "MB",
    model: "theo.clone.basho.v1",
    voice: "spare, seasonal, awake",
    corpus: "hokku, travel diaries, kigo tags, seasonal perception atlas",
    strengths: ["brevity", "cutting", "seasonal image", "quiet turn"],
    prompt: "Remove the explanation until only the encounter remains. Let the cut between two images think for you.",
    questions: [
      "What season is the poem secretly in?",
      "Which two images create more meaning when placed side by side?",
      "What can disappear while the poem becomes clearer?"
    ]
  }
];

const defaultState = {
  loggedIn: false,
  name: "",
  mode: "lyric fragments",
  activePoetId: "dickinson",
  selectedMix: ["dickinson", "rilke"],
  threads: {},
  profile: {
    samples: 0,
    words: 0,
    lines: 0,
    motifs: {},
    tendencies: {
      imageDensity: 0,
      abstraction: 0,
      compression: 0,
      confession: 0,
      sonicCharge: 0
    }
  },
  lastApiTrace: "idle"
};

let state = loadState();
state.threads = ensureThreads(state.threads);
state.selectedMix = state.selectedMix.filter(id => poets.some(poet => poet.id === id)).slice(0, 3);
if (!state.selectedMix.length) state.selectedMix = ["dickinson", "rilke"];
if (!poets.some(poet => poet.id === state.activePoetId)) state.activePoetId = poets[0].id;

const loginScreen = document.querySelector("#loginScreen");
const appScreen = document.querySelector("#appScreen");
const loginForm = document.querySelector("#loginForm");
const nameInput = document.querySelector("#nameInput");
const modeInput = document.querySelector("#modeInput");
const userLine = document.querySelector("#userLine");
const poetList = document.querySelector("#poetList");
const mixOptions = document.querySelector("#mixOptions");
const applyMixBtn = document.querySelector("#applyMixBtn");
const activeIdentityLine = document.querySelector("#activeIdentityLine");
const modelChip = document.querySelector("#modelChip");
const chatLog = document.querySelector("#chatLog");
const chatForm = document.querySelector("#chatForm");
const draftInput = document.querySelector("#draftInput");
const simulatedCall = document.querySelector("#simulatedCall");
const threadList = document.querySelector("#threadList");
const poetPersonalization = document.querySelector("#poetPersonalization");
const fingerprintBtn = document.querySelector("#fingerprintBtn");
const profileModal = document.querySelector("#profileModal");
const closeProfileBtn = document.querySelector("#closeProfileBtn");
const profileIntro = document.querySelector("#profileIntro");
const identityGrid = document.querySelector("#identityGrid");
const confidenceBar = document.querySelector("#confidenceBar");
const confidenceLabel = document.querySelector("#confidenceLabel");

function loadState() {
  const saved = localStorage.getItem("theo-demo-state-v1");
  if (!saved) return structuredClone(defaultState);

  try {
    return { ...structuredClone(defaultState), ...JSON.parse(saved) };
  } catch {
    return structuredClone(defaultState);
  }
}

function saveState() {
  localStorage.setItem("theo-demo-state-v1", JSON.stringify(state));
}

function ensureThreads(threads) {
  const nextThreads = { ...threads };
  poets.forEach(poet => {
    if (!Array.isArray(nextThreads[poet.id])) nextThreads[poet.id] = [];
  });
  return nextThreads;
}

function showLogin() {
  loginScreen.classList.remove("is-hidden");
  appScreen.classList.add("is-hidden");
  nameInput.value = state.name || "";
  modeInput.value = state.mode || "lyric fragments";
}

function showApp() {
  loginScreen.classList.add("is-hidden");
  appScreen.classList.remove("is-hidden");
  renderApp();
}

function renderApp() {
  userLine.textContent = `${state.name || "Poet"} | ${state.mode}`;
  renderPoetList();
  renderMixer();
  renderActiveIdentity();
  renderChat();
  renderThreads();
  renderPersonalization(state.activePoetId);
}

function getActivePoet() {
  return poets.find(poet => poet.id === state.activePoetId) || poets[0];
}

function renderPoetList() {
  poetList.innerHTML = "";
  poets.forEach(poet => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `poet-card${poet.id === state.activePoetId ? " active" : ""}`;
    button.innerHTML = `
      <span class="poet-avatar">${poet.avatar}</span>
      <span>
        <strong>${poet.name}</strong>
        <small>${poet.voice}</small>
      </span>
    `;
    button.addEventListener("click", () => {
      state.activePoetId = poet.id;
      saveState();
      renderApp();
    });
    poetList.appendChild(button);
  });
}

function renderMixer() {
  mixOptions.innerHTML = "";
  poets.forEach(poet => {
    const option = document.createElement("label");
    option.className = "mix-pill";
    option.innerHTML = `
      <input type="checkbox" value="${poet.id}" ${state.selectedMix.includes(poet.id) ? "checked" : ""} />
      <span>${poet.shortName}</span>
    `;
    mixOptions.appendChild(option);
  });
}

function renderActiveIdentity() {
  const poet = getActivePoet();
  const mixedNames = state.selectedMix.map(id => poets.find(poetItem => poetItem.id === id)?.shortName).filter(Boolean);
  activeIdentityLine.textContent = `${poet.name} is ready. Blend active: ${mixedNames.join(" + ")}.`;
  modelChip.textContent = poet.model;
  simulatedCall.textContent = `POST /v1/theo/guidance -> ${poet.model}`;
}

function renderChat() {
  const poet = getActivePoet();
  const messages = state.threads[poet.id];
  chatLog.innerHTML = "";

  if (!messages.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.innerHTML = `
      <strong>${poet.name} has no saved consultation yet.</strong>
      <p>${poet.prompt}</p>
    `;
    chatLog.appendChild(empty);
    return;
  }

  messages.forEach(message => {
    const bubble = document.createElement("article");
    bubble.className = `message ${message.role}`;
    bubble.innerHTML = `
      <span>${message.role === "user" ? state.name || "You" : message.poetName}</span>
      <p>${message.content}</p>
      ${message.trace ? `<code>${message.trace}</code>` : ""}
    `;
    chatLog.appendChild(bubble);
  });
  chatLog.scrollTop = chatLog.scrollHeight;
}

function renderThreads() {
  threadList.innerHTML = "";

  poets.forEach(poet => {
    const messages = state.threads[poet.id];
    const assistantCount = messages.filter(message => message.role === "assistant").length;
    const latest = [...messages].reverse().find(message => message.role === "assistant");
    const button = document.createElement("button");
    button.type = "button";
    button.className = `thread-heading${poet.id === state.activePoetId ? " active" : ""}`;
    button.innerHTML = `
      <span>
        <strong>${poet.name}</strong>
        <small>${assistantCount ? `${assistantCount} guidance exchange${assistantCount === 1 ? "" : "s"}` : "No chats yet"}</small>
      </span>
      <em>${latest ? latest.content.slice(0, 74) + "..." : "Open personalization"}</em>
    `;
    button.addEventListener("click", () => {
      state.activePoetId = poet.id;
      saveState();
      renderApp();
      renderPersonalization(poet.id);
    });
    threadList.appendChild(button);
  });
}

function renderPersonalization(poetId) {
  const poet = poets.find(poetItem => poetItem.id === poetId) || getActivePoet();
  const messages = state.threads[poet.id].filter(message => message.role === "user");
  const adaptation = getAdaptationLevel(messages.length);
  const profile = summarizeProfile();
  const weightedStrength = poet.strengths[messages.length % poet.strengths.length];

  poetPersonalization.innerHTML = `
    <p class="eyebrow">Poet personalization</p>
    <h3>${poet.name}</h3>
    <div class="personal-meter">
      <span style="width: ${adaptation.score}%"></span>
    </div>
    <strong>${adaptation.label}</strong>
    <p>
      Theo is weighting ${poet.shortName}'s ${weightedStrength} advice toward your ${profile.lineHabit}
      and ${profile.signatureImpulse.toLowerCase()}.
    </p>
    <ul>
      <li>Memory tokens from this poet: ${messages.length * 640 + 120}</li>
      <li>Most useful lens: ${poet.questions[messages.length % poet.questions.length]}</li>
      <li>Corpus route: ${poet.corpus}</li>
    </ul>
  `;
}

function getAdaptationLevel(count) {
  if (count >= 5) return { score: 94, label: "Deeply personalized" };
  if (count >= 3) return { score: 76, label: "Strongly personalized" };
  if (count >= 1) return { score: 52, label: "Learning your patterns" };
  return { score: 18, label: "Cold start profile" };
}

function submitDraft(event) {
  event.preventDefault();
  const draft = draftInput.value.trim();
  if (!draft) return;

  const poet = getActivePoet();
  const analysis = analyzeDraft(draft);
  const traceId = `trace_${poet.id}_${Date.now().toString(36)}`;

  state.threads[poet.id].push({
    role: "user",
    content: draft,
    at: new Date().toISOString()
  });
  updateProfile(analysis);

  state.threads[poet.id].push({
    role: "assistant",
    poetName: poet.name,
    content: buildGuidance(poet, draft, analysis),
    trace: `fake API ${traceId} | profile_vector=${buildVectorLabel()} | corpus=${analysis.datasetRoute}`,
    at: new Date().toISOString()
  });

  state.lastApiTrace = traceId;
  draftInput.value = "";
  saveState();
  renderApp();
}

function analyzeDraft(text) {
  const words = text.toLowerCase().match(/[a-z']+/g) || [];
  const lines = text.split(/\n+/).filter(line => line.trim());
  const imageryWords = ["moon", "river", "bone", "orange", "bird", "door", "rain", "salt", "garden", "window", "mouth", "light", "blood", "stone", "tree", "fire", "sea"];
  const abstractWords = ["love", "grief", "memory", "time", "hope", "fear", "absence", "desire", "dream", "truth", "loneliness"];
  const sonicLetters = text.match(/[szshcrklmn]/gi) || [];
  const firstPerson = words.filter(word => ["i", "me", "my", "mine"].includes(word)).length;
  const imageHits = countHits(words, imageryWords);
  const abstractHits = countHits(words, abstractWords);
  const motifs = imageryWords.filter(word => words.includes(word)).slice(0, 4);
  const compression = Math.max(20, Math.min(96, 100 - Math.round(words.length / Math.max(lines.length, 1))));
  const imageDensity = Math.min(100, Math.round((imageHits / Math.max(words.length, 1)) * 280));
  const abstraction = Math.min(100, Math.round((abstractHits / Math.max(words.length, 1)) * 340));
  const confession = Math.min(100, Math.round((firstPerson / Math.max(words.length, 1)) * 380));
  const sonicCharge = Math.min(100, Math.round((sonicLetters.length / Math.max(text.length, 1)) * 190));

  return {
    wordCount: words.length,
    lineCount: lines.length || 1,
    motifs: motifs.length ? motifs : inferMotifs(words),
    imageDensity,
    abstraction,
    compression,
    confession,
    sonicCharge,
    datasetRoute: pickDatasetRoute(words.length, imageDensity, abstraction)
  };
}

function countHits(words, vocabulary) {
  return words.filter(word => vocabulary.includes(word)).length;
}

function inferMotifs(words) {
  const stop = new Set(["the", "and", "but", "with", "that", "this", "from", "into", "your", "when", "then", "there"]);
  return [...new Set(words.filter(word => word.length > 4 && !stop.has(word)))].slice(0, 3);
}

function pickDatasetRoute(wordCount, imageDensity, abstraction) {
  if (wordCount < 35) return "micro-lyric + fragment retrieval";
  if (imageDensity > abstraction) return "image-chain expansion index";
  if (abstraction > 34) return "abstraction-to-object grounding set";
  return "contemporary workshop delta set";
}

function updateProfile(analysis) {
  state.profile.samples += 1;
  state.profile.words += analysis.wordCount;
  state.profile.lines += analysis.lineCount;
  Object.keys(state.profile.tendencies).forEach(key => {
    state.profile.tendencies[key] = rollingAverage(
      state.profile.tendencies[key],
      analysis[key],
      state.profile.samples
    );
  });
  analysis.motifs.forEach(motif => {
    state.profile.motifs[motif] = (state.profile.motifs[motif] || 0) + 1;
  });
}

function rollingAverage(previous, next, count) {
  return Math.round(((previous * (count - 1)) + next) / count);
}

function buildGuidance(poet, draft, analysis) {
  const mix = state.selectedMix.map(id => poets.find(poetItem => poetItem.id === id)).filter(Boolean);
  const profile = summarizeProfile();
  const motifText = analysis.motifs.length ? analysis.motifs.join(", ") : "your central image";
  const blendText = mix.length
    ? `\n\nBlend layer: ${mix.map(item => item.shortName).join(" + ")} adds ${mix.map(item => item.strengths[0]).join(", ")} so the response is not a generic workshop note.`
    : "";
  const quotedShard = draft.split(/\s+/).slice(0, 9).join(" ");

  return `${poet.shortName} lens: ${poet.prompt}

Personal read: your draft is showing ${profile.signatureImpulse.toLowerCase()} with ${analysis.imageDensity}% image density and ${analysis.abstraction}% abstraction. I would revise around ${motifText}, then ask whether "${quotedShard}${draft.split(/\s+/).length > 9 ? "..." : ""}" is opening the strongest door.

Three moves:
1. ${poet.questions[analysis.lineCount % poet.questions.length]}
2. Convert one abstract phrase into a physical action, smell, texture, or weather system.
3. Cut the most explanatory line and let the next image inherit its meaning.${blendText}`;
}

function summarizeProfile() {
  const tendencies = state.profile.tendencies;
  const topMotifs = Object.entries(state.profile.motifs)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([motif]) => motif);
  const avgLineLength = Math.round(state.profile.words / Math.max(state.profile.lines, 1));
  const strongest = Object.entries(tendencies).sort((a, b) => b[1] - a[1])[0] || ["imageDensity", 0];

  return {
    topMotifs: topMotifs.length ? topMotifs : ["thresholds", "weather", "voice"],
    lineHabit: avgLineLength > 12 ? "long-breath lines" : avgLineLength > 6 ? "medium lyric lines" : "fragmented short lines",
    signatureImpulse: labelTendency(strongest[0]),
    confidence: Math.min(96, 28 + state.profile.samples * 14)
  };
}

function labelTendency(key) {
  const labels = {
    imageDensity: "image-led thinking",
    abstraction: "philosophical pressure",
    compression: "compressed lyric instinct",
    confession: "first-person intimacy",
    sonicCharge: "sound-driven momentum"
  };
  return labels[key] || "image-led thinking";
}

function buildVectorLabel() {
  const tendencies = state.profile.tendencies;
  return [
    `img:${tendencies.imageDensity}`,
    `abs:${tendencies.abstraction}`,
    `cmp:${tendencies.compression}`,
    `sonic:${tendencies.sonicCharge}`
  ].join(".");
}

function renderProfileModal() {
  const profile = summarizeProfile();
  profileIntro.textContent = `${state.name || "Your"} profile is built from ${state.profile.samples} draft sample${state.profile.samples === 1 ? "" : "s"} and routes future poet clones toward your recurring habits.`;
  identityGrid.innerHTML = "";

  const features = [
    ["Signature impulse", profile.signatureImpulse],
    ["Line habit", profile.lineHabit],
    ["Recurring motifs", profile.topMotifs.join(", ")],
    ["Average line", `${Math.round(state.profile.words / Math.max(state.profile.lines, 1)) || 0} words`],
    ["Draft mode", state.mode],
    ["API vector", buildVectorLabel()]
  ];

  features.forEach(([label, value]) => {
    const item = document.createElement("article");
    item.className = "identity-feature";
    item.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
    identityGrid.appendChild(item);
  });

  confidenceBar.style.width = `${profile.confidence}%`;
  confidenceLabel.textContent = `${profile.confidence}%`;
  profileModal.classList.remove("is-hidden");
}

loginForm.addEventListener("submit", event => {
  event.preventDefault();
  state.loggedIn = true;
  state.name = nameInput.value.trim() || "Poet";
  state.mode = modeInput.value;
  saveState();
  showApp();
});

chatForm.addEventListener("submit", submitDraft);

applyMixBtn.addEventListener("click", () => {
  const checked = [...mixOptions.querySelectorAll("input:checked")].map(input => input.value);
  state.selectedMix = checked.slice(0, 3);
  if (!state.selectedMix.length) state.selectedMix = [state.activePoetId];
  saveState();
  renderApp();
});

fingerprintBtn.addEventListener("click", renderProfileModal);
closeProfileBtn.addEventListener("click", () => profileModal.classList.add("is-hidden"));
profileModal.addEventListener("click", event => {
  if (event.target === profileModal) profileModal.classList.add("is-hidden");
});

document.querySelector("#logoutBtn").addEventListener("click", () => {
  state.loggedIn = false;
  saveState();
  showLogin();
});

if (state.loggedIn) {
  showApp();
} else {
  showLogin();
}
