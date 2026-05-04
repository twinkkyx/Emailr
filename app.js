const tasks = [
  {
    type: "Reader time",
    title: "Respect the receiver's finite time.",
    lesson: "Every email spends someone else's attention. A good email reduces work for the reader: they should know what happened, why it matters, and what reply you need.",
    scenario: "You are asking a busy program coordinator whether applications are still open.",
    options: [
      ["Are applications still open for the summer design program? The website says March 8, but the form still loads.", true, "This respects their time because it gives the exact program and the confusion to resolve."],
      ["I had a quick question about the summer design program application and wanted to check something before applying.", false, "This sounds polite, but it still hides the actual question. The reader has to reply just to discover the issue."],
      ["The summer design program deadline is confusing because the page says March 8. Can you clarify?", false, "This is close, but it leaves out the key detail that the form still loads. That detail helps them answer accurately."]
    ]
  },
  {
    type: "Subject lines",
    title: "Make the subject line do real work.",
    lesson: "The subject line should act like a label on a folder. Topic plus action beats mystery, hype, or panic.",
    scenario: "You are sending a revised poster to a club leader for approval.",
    options: [
      ["Revised poster for Friday event - approval needed", true, "Strong. It names the artifact, event, and action needed."],
      ["Friday event poster update", false, "This is decent, but it does not tell the reader that approval is the next action."],
      ["Poster draft for review", false, "This names the task, but it misses the specific event, which makes it harder to find later."]
    ]
  },
  {
    type: "High agency",
    title: "Be high agency: bring the next step.",
    lesson: "High-agency people do not just drop a problem on someone. They show what they tried and propose the next small move.",
    scenario: "A registration link is broken and you need access before tomorrow.",
    options: [
      ["The registration link gives a 404. I tried Chrome and Safari. Could you send the correct link, or should I use last year's form?", true, "This shows effort and offers two useful paths forward."],
      ["The registration link is not working for me. Could you send another one when you get a chance?", false, "This is polite, but it does not show what you tried or why the timing matters."],
      ["I cannot access registration before tomorrow. I think the link may be broken.", false, "This gives urgency, but it still makes the receiver diagnose the problem from scratch."]
    ]
  },
  {
    type: "One ask",
    title: "One email, one clear ask.",
    lesson: "A reader should not have to choose which of five requests to answer. Make the desired action unmistakable.",
    scenario: "You want feedback on a scholarship essay.",
    options: [
      ["Could you review my opening paragraph by Friday and tell me if the story is clear?", true, "Specific and limited. The reader knows exactly what good help looks like."],
      ["Could you look over my essay sometime this week and tell me what you think?", false, "Reasonable, but still broad. The reader has to decide what kind of feedback you want."],
      ["Could you review the essay and resume before Friday?", false, "This has a deadline, but it bundles two tasks. One focused ask is easier to answer."]
    ]
  },
  {
    type: "Context",
    title: "Add enough context to avoid follow-up confusion.",
    lesson: "Useful context is not a life story. It is the minimum background that lets the receiver answer accurately.",
    scenario: "You are asking a volunteer organizer whether your shift changed.",
    options: [
      ["For Saturday's food drive, am I still assigned to the 10-12 sorting shift, or did it move to check-in?", true, "Great. Date, event, old assignment, and possible change are all included."],
      ["I wanted to confirm my Saturday shift because I heard there may have been changes.", false, "This gives the general issue, but not the current assignment they need to verify."],
      ["For the food drive, can you remind me what I am doing?", false, "This gives the event, but it makes the organizer retrieve details you may already have."]
    ]
  },
  {
    type: "Tone",
    title: "Be warm, direct, and not needy.",
    lesson: "Good tone is confident without entitlement. You can be respectful without over-apologizing.",
    scenario: "You need a transcript sent to an internship program by Friday.",
    options: [
      ["Could you send my transcript to the internship program by Friday? The upload link is below. Thank you.", true, "Clear, polite, and useful. It includes the next action and supporting link."],
      ["When you have time, could you help with my transcript for an internship program?", false, "This is kind, but too soft on timing and missing the upload detail."],
      ["I need my transcript sent by Friday for an internship. Please let me know if that is possible.", false, "This is mostly good, but it creates an extra step because it does not include the upload link."]
    ]
  },
  {
    type: "Cold email",
    title: "Use the George Mack cold-email stack.",
    lesson: "A strong cold email is not begging for attention. It is a compact signal: I know why I am writing to you, I have done something real, and I am asking for a tiny next step.",
    scenario: "You read a founder's interview about getting their first customers manually. You are testing a snack pre-order form at school. Choose the best opening message.",
    options: [
      ["I saw your interview about getting a first customer manually. I am testing a snack pre-order form at school. Could I ask one question about how you chose your first users?", true, "This has the stack: personal reason, proof of work, timely relevance, and one easy question."],
      ["I am a student interested in startups and would love to learn from your experience getting customers.", false, "This is polite but generic. It does not prove you know their work or have tried anything."],
      ["I read your interview and wondered if you have advice for someone building a school project.", false, "This is warmer, but still vague. The strongest cold email includes a specific ask and proof of work."]
    ]
  },
  {
    type: "Proof of work",
    title: "Show effort before requesting effort.",
    lesson: "People are more likely to help when they can see you have already moved. Proof of work can be tiny: a draft, mockup, note, attempt, or observation.",
    scenario: "You want design feedback from someone whose work you admire.",
    options: [
      ["I made a one-page redesign of our club sign-up form. Could you tell me one thing that would make it easier to scan?", true, "Excellent. You did work first, then asked for focused feedback."],
      ["I am starting to learn design and would appreciate any advice you think beginners should know.", false, "This is sincere, but it gives the receiver a blank page instead of a concrete artifact."],
      ["I made a redesign of our sign-up form and would love your general thoughts when you have time.", false, "This has proof of work, but the ask is broad. One specific question lowers the effort."]
    ]
  },
  {
    type: "Low friction",
    title: "Make the reply easy.",
    lesson: "The easier your email is to answer, the more likely it gets answered. Ask for one choice, one sentence, or one small action.",
    scenario: "You are asking an alumnus about studying computer science.",
    options: [
      ["Could I ask one question: what class helped you most before your first CS semester?", true, "This can be answered quickly and still gives you useful information."],
      ["Would you be open to a 30-minute call about preparing for CS?", false, "This is reasonable later, but it is still a bigger commitment than a quick first reply."],
      ["What should I know before studying CS in college?", false, "This is relevant, but too wide. The receiver may not know where to start."]
    ]
  },
  {
    type: "Brevity",
    title: "Short emails are a kindness.",
    lesson: "Busy readers scan. Keep the first message lean: reason, context, ask, thanks.",
    scenario: "You wrote 430 words asking a community organizer for advice.",
    options: [
      ["Cut it to about 120 words: why them, what you tried, one question, thank you.", true, "That keeps the signal and removes the burden."],
      ["Keep the story, but move your question to the first sentence so they know where it is going.", false, "Better than hiding the ask, but it still leaves too much reading for a first message."],
      ["Cut it to a short introduction and ask if they are free to talk sometime.", false, "Shorter, yes, but the ask becomes vague. Brevity still needs specificity."]
    ]
  },
  {
    type: "Follow-up",
    title: "Follow up without emotional pressure.",
    lesson: "A follow-up should be calm and useful. Assume the person is busy, not rude.",
    scenario: "A podcast host has not replied after five days.",
    options: [
      ["Following up on my note about helping with episode research. Happy to send a sample outline if useful.", true, "Good follow-up: brief, respectful, and adds a helpful next step."],
      ["Just checking whether you saw my previous email about episode research.", false, "Polite, but it does not restate enough context or add a useful next step."],
      ["I know you are busy, but I wanted to follow up because I am still very interested.", false, "Warm, but centered on your interest rather than making the reply easier."]
    ]
  },
  {
    type: "Status updates",
    title: "Send updates before people have to ask.",
    lesson: "High-agency communication includes proactive status. If something changes, tell the person early with the new plan.",
    scenario: "You promised a draft today but need one more day.",
    options: [
      ["Quick update: I need one more day on the draft. I found two missing sources and will send it by 4 PM tomorrow.", true, "This owns the delay, explains why, and gives a new commitment."],
      ["I am still working on the draft and should have it soon.", false, "This updates them, but 'soon' does not reduce much uncertainty."],
      ["The draft is taking longer because I found missing sources. Sorry about that.", false, "This explains the delay, but it does not give a new delivery time."]
    ]
  },
  {
    type: "Audience",
    title: "Match formality to the relationship.",
    lesson: "A note to a friend, a recruiter, a professor, and a client should not sound identical.",
    scenario: "You are emailing a potential internship host for the first time.",
    options: [
      ["Hello Dr. Nguyen, I am a junior interested in your clinic's volunteer program.", true, "Professional without being stiff. Good first-contact tone."],
      ["Hi, I am reaching out because I am interested in volunteering at your clinic.", false, "This is acceptable, but if you know their title/name, using it creates a stronger first impression."],
      ["Dear Clinic Team, I am a high school junior interested in volunteering.", false, "This is professional, but less personal than addressing the actual host when you know who they are."]
    ]
  },
  {
    type: "Reply all",
    title: "Protect the group inbox.",
    lesson: "Reply all only when everyone truly needs the information. Otherwise, reply to the one person who needs it.",
    scenario: "A project lead emails 28 volunteers about a schedule.",
    options: [
      ["Reply only to the project lead with your personal schedule conflict.", true, "Correct. Your conflict does not need to interrupt everyone."],
      ["Reply all because your conflict might affect the schedule for everyone.", false, "Maybe if you are coordinating the whole group. For a personal conflict, start with the project lead."],
      ["Do not reply until the lead asks you directly.", false, "This avoids inbox noise, but it delays useful information the lead needs."]
    ]
  },
  {
    type: "Attachments",
    title: "Never make people guess what is attached.",
    lesson: "If you attach something, name it in the email and explain what the receiver should do with it.",
    scenario: "You are sending a signed volunteer form.",
    options: [
      ["Attached is my signed volunteer form for the Saturday event. Please let me know if any page is missing.", true, "Clear attachment, clear purpose, easy follow-up."],
      ["I attached my form. Let me know if you need anything else.", false, "This is polite, but it does not name which form or event."],
      ["Here is the volunteer form for Saturday.", false, "This names the file, but it does not say whether it is signed or what to check."]
    ]
  },
  {
    type: "Formatting",
    title: "Make emails scannable.",
    lesson: "Line breaks are not decoration. They make the structure visible: greeting, context, ask, close.",
    scenario: "Your email is one giant paragraph with five different ideas.",
    options: [
      ["Break it into short paragraphs: context, one ask, deadline, thanks.", true, "Good structure lowers the reading effort."],
      ["Keep the paragraph, but bold the main ask so it stands out.", false, "Bolding helps a little, but the reader still has to process a crowded block."],
      ["Split it into paragraphs for each topic, then ask three questions at the end.", false, "Better formatting, but the email still asks the reader to handle too much at once."]
    ]
  },
  {
    type: "Revision",
    title: "Cut filler and weak qualifiers.",
    lesson: "Words like just, really, basically, maybe, and possibly often make a simple request feel less confident.",
    scenario: "You wrote: I just really wanted to basically ask if maybe you could possibly look at my resume.",
    options: [
      ["Could you review my resume by Friday?", true, "Sharper, shorter, and more confident."],
      ["I wanted to ask if you could look at my resume when possible.", false, "This is cleaner, but still less specific about what action and timing you need."],
      ["Could you maybe review my resume if you have time?", false, "Polite, but 'maybe' and 'if you have time' weaken the ask and remove the deadline."]
    ]
  },
  {
    type: "Ownership",
    title: "Own mistakes cleanly.",
    lesson: "When something goes wrong, avoid excuses and drama. State what happened, what you are doing, and what help you need if any.",
    scenario: "You missed a deadline for submitting slides to your team.",
    options: [
      ["I missed the slide deadline. I am finishing slides 4-6 now and will send them by 7 PM. Sorry for the delay.", true, "This takes responsibility and gives a recovery plan."],
      ["Sorry, I am behind on the slides. I will try to send them tonight.", false, "This owns the issue, but 'try' is weaker than a clear recovery commitment."],
      ["The slides took longer than expected, but I should be able to finish soon.", false, "This explains the situation without clearly owning the missed deadline."]
    ]
  },
  {
    type: "Gratitude",
    title: "Close with appreciation, not pressure.",
    lesson: "A good close leaves the receiver free to say yes or no. Thanks should not become guilt.",
    scenario: "You asked someone for feedback on your project.",
    options: [
      ["Thanks for considering it. I appreciate your time either way.", true, "Warm and low pressure."],
      ["Thanks in advance for helping me with this.", false, "Common phrase, but it can imply they have already agreed."],
      ["I would be really grateful if you could do this for me.", false, "Kind, but slightly heavier than necessary. The best close gives them room."]
    ]
  },
  {
    type: "Final boss",
    title: "Choose the strongest complete cold email.",
    lesson: "Put it together: useful subject, specific reason, proof of work, one easy ask, and a respectful close.",
    scenario: "You are emailing a filmmaker who gave a short talk online.",
    options: [
      ["Subject: Quick question about your sound design advice\n\nHi Ms. Alvarez, I liked your point about using sound to make low-budget scenes feel bigger. I tried that in a 90-second project last week. Could I ask one question about how you plan sound before filming?\n\nThanks,\nMaya", true, "This is the full Emailr stack: specific, brief, proof-rich, and easy to answer."],
      ["Subject: Question after your talk\n\nHi Ms. Alvarez, I enjoyed your talk and am interested in filmmaking. Would you be open to sharing advice for a beginner?\n\nThanks,\nMaya", false, "This is polite, but less specific and has no proof of work. It feels easier to ignore."],
      ["Subject: Student film advice\n\nHi Ms. Alvarez, I am making a short film and would love to hear how you approach planning scenes, sound, editing, and distribution.\n\nThanks,\nMaya", false, "This has context, but the ask is too wide. One focused question would be easier to answer."]
    ]
  }
];

const defaultState = {
  loggedIn: false,
  name: "",
  grade: "9th grade",
  currentTask: 0,
  xp: 0,
  answered: {},
  finished: false
};

const teachingNotes = {
  "Reader time": [
    "Assume the receiver is busy and scanning quickly.",
    "Put the actual question in the first message, not behind a vague opener.",
    "Good communication saves time on both sides by preventing avoidable follow-up."
  ],
  "Subject lines": [
    "A useful subject line combines the topic with the action needed.",
    "Avoid emotional labels like urgent unless the urgency is real and explained.",
    "The receiver should be able to search for the message later."
  ],
  "High agency": [
    "High agency means you move the situation forward instead of waiting helplessly.",
    "Show what you tried, what happened, and the next reasonable option.",
    "The best messages make you look resourceful without pretending you know everything."
  ],
  "One ask": [
    "One clear ask is easier to answer than a bundle of half-formed requests.",
    "Limit the scope: a paragraph, one question, one choice, one deadline.",
    "This is generous because it tells the reader exactly what helpful means."
  ],
  Context: [
    "Context should be useful, not exhaustive.",
    "Name the event, date, project, document, or earlier decision when it matters.",
    "The goal is to let the receiver answer without hunting for missing details."
  ],
  Tone: [
    "Warm does not mean weak. Direct does not mean rude.",
    "Avoid commands, guilt, and long apology trails.",
    "A respectful tone gives the reader dignity and keeps the request easy to process."
  ],
  "Cold email": [
    "George Mack-style cold email depends on specificity: this person, this reason, this ask.",
    "A cold email should not feel mass-produced.",
    "A tiny, relevant question beats a huge request for mentorship or opportunity."
  ],
  "Proof of work": [
    "Proof of work shows that you already invested effort before asking for theirs.",
    "It can be small: a draft, prototype, outline, observation, spreadsheet, mockup, or test.",
    "People enjoy helping more when the starting point is concrete."
  ],
  "Low friction": [
    "Low friction means the receiver can reply quickly without scheduling their whole life around you.",
    "Ask for one sentence, one choice, one link, or one next step.",
    "Small asks create trust; trust can lead to bigger conversations later."
  ],
  Brevity: [
    "Short emails are not lazy; they are edited.",
    "Keep the signal: why them, relevant context, one ask, thanks.",
    "Remove anything the receiver does not need in order to respond."
  ],
  "Follow-up": [
    "A follow-up is a reminder, not an accusation.",
    "Assume the person is busy, traveling, distracted, or sorting priorities.",
    "Restate the ask briefly so they do not need to dig up the old thread."
  ],
  "Status updates": [
    "A strong status update removes uncertainty before someone has to chase you.",
    "Own the change, explain the new plan, and give a reliable next time.",
    "This is one of the clearest forms of high-agency communication."
  ],
  Audience: [
    "The same idea should sound different depending on the relationship.",
    "First-contact professional messages need more care than texts to friends.",
    "Good formality is calm and human, not stiff performance."
  ],
  "Reply all": [
    "Every reply-all message spends attention from the whole group.",
    "Use it only when everyone genuinely needs the information.",
    "Private logistics, thanks, jokes, and personal conflicts usually belong in a direct reply."
  ],
  Attachments: [
    "Attachments should never be mysterious.",
    "Name the file, explain why it is attached, and say what action is needed.",
    "This prevents the receiver from opening files just to understand the email."
  ],
  Formatting: [
    "Formatting is part of etiquette because it affects the reader's effort.",
    "Short paragraphs make the structure visible.",
    "A simple order works almost everywhere: greeting, context, ask, close."
  ],
  Revision: [
    "Filler words often make a request sound less confident.",
    "Cutting filler is not about sounding cold; it is about making the ask easier to understand.",
    "A clean sentence usually feels more respectful than a nervous paragraph."
  ],
  Ownership: [
    "When you miss something, the best email rebuilds trust.",
    "Avoid excuses as the main event. Lead with ownership and recovery.",
    "People can handle bad news better when there is a clear plan."
  ],
  Gratitude: [
    "Gratitude should make the receiver feel respected, not trapped.",
    "A low-pressure close gives them room to say yes, no, or not now.",
    "This matters because relationships last longer than any single request."
  ],
  "Final boss": [
    "A complete strong message combines reader empathy and high agency.",
    "It is specific enough to prove care, short enough to respect time, and small enough to answer.",
    "The best cold emails feel handcrafted, useful, and easy to reply to."
  ]
};

const activityLabels = {
  "Reader time": "Choose the clearest first question",
  "Subject lines": "Choose the best subject line",
  "High agency": "Choose the high-agency update",
  "One ask": "Choose the most answerable ask",
  Context: "Choose the reply with enough context",
  Tone: "Choose the best tone",
  "Cold email": "Choose the strongest cold opener",
  "Proof of work": "Choose the message that earns attention",
  "Low friction": "Choose the easiest ask to answer",
  Brevity: "Choose the best edit",
  "Follow-up": "Choose the best follow-up",
  "Status updates": "Choose the best status update",
  Audience: "Choose the right level of formality",
  "Reply all": "Choose the right reply behavior",
  Attachments: "Choose the clearest attachment note",
  Formatting: "Choose the best formatting move",
  Revision: "Choose the strongest rewrite",
  Ownership: "Choose the best ownership message",
  Gratitude: "Choose the best closing line",
  "Final boss": "Choose the complete message"
};

const answerPositionPattern = [1, 2, 0, 2, 1, 0, 2, 1, 0, 2, 1, 0, 2, 1, 0, 2, 1, 0, 2, 1];

let state = loadState();
state.currentTask = Math.min(state.currentTask, tasks.length - 1);

const loginScreen = document.querySelector("#loginScreen");
const questScreen = document.querySelector("#questScreen");
const loginForm = document.querySelector("#loginForm");
const nameInput = document.querySelector("#nameInput");
const gradeInput = document.querySelector("#gradeInput");
const taskStage = document.querySelector("#taskStage");
const taskCard = document.querySelector(".task-card");
const optionsBox = document.querySelector("#optionsBox");
const feedbackBox = document.querySelector("#feedbackBox");
const nextBtn = document.querySelector("#nextBtn");

function loadState() {
  const saved = localStorage.getItem("emailr-quest-state-v5");
  return saved ? { ...defaultState, ...JSON.parse(saved) } : { ...defaultState };
}

function saveState() {
  localStorage.setItem("emailr-quest-state-v5", JSON.stringify(state));
}

function showApp() {
  loginScreen.classList.add("is-hidden");
  questScreen.classList.remove("is-hidden");
  renderTask();
}

function showLogin() {
  loginScreen.classList.remove("is-hidden");
  questScreen.classList.add("is-hidden");
  nameInput.value = state.name || "";
  gradeInput.value = state.grade || "9th grade";
}

function renderTask() {
  if (state.finished) {
    renderCompletion();
    return;
  }

  const task = tasks[state.currentTask];
  const taskNumber = state.currentTask + 1;
  const progress = (taskNumber / tasks.length) * 100;
  const alreadyAnswered = state.answered[state.currentTask];

  document.querySelector("#studentLine").textContent = `${state.name || "Student"} • ${state.grade}`;
  document.querySelector("#xpValue").textContent = state.xp;
  document.querySelector("#taskCount").textContent = `${taskNumber}/${tasks.length}`;
  document.querySelector("#progressBar").style.width = `${progress}%`;
  document.querySelector("#taskNumber").textContent = `Task ${String(taskNumber).padStart(2, "0")}`;
  document.querySelector("#taskType").textContent = task.type;
  document.querySelector("#taskTitle").textContent = task.title;
  document.querySelector("#taskLesson").textContent = task.lesson;
  document.querySelector("#activityLabel").textContent = activityLabels[task.type] || "Practice";
  document.querySelector("#scenarioBox").innerHTML = `<strong>Practice:</strong>\n${task.scenario}`;
  renderPrinciples(task.type);

  feedbackBox.className = "feedback";
  feedbackBox.textContent = alreadyAnswered
    ? alreadyAnswered.feedback
    : "Choose the strongest answer to unlock the next task.";
  if (alreadyAnswered) feedbackBox.classList.add(alreadyAnswered.correct ? "good" : "bad");

  optionsBox.innerHTML = "";
  getDisplayOptions(task, state.currentTask).forEach(({ option, originalIndex }) => {
    const [text, correct, feedback] = option;
    const button = document.createElement("button");
    button.className = "option-button";
    button.textContent = text;
    button.type = "button";
    button.disabled = Boolean(alreadyAnswered);
    if (alreadyAnswered && alreadyAnswered.choice === originalIndex) {
      button.classList.add(correct ? "correct" : "wrong");
    }
    if (alreadyAnswered && correct) button.classList.add("correct");
    button.addEventListener("click", () => answerTask(originalIndex, correct, feedback));
    optionsBox.appendChild(button);
  });

  nextBtn.disabled = !alreadyAnswered;
  nextBtn.textContent = state.currentTask === tasks.length - 1 && alreadyAnswered ? "Finish quest" : "Next task";
}

function getDisplayOptions(task, taskIndex) {
  const correctIndex = task.options.findIndex(([, correct]) => correct);
  const desiredCorrectPosition = answerPositionPattern[taskIndex % answerPositionPattern.length];
  const entries = task.options.map((option, originalIndex) => ({ option, originalIndex }));
  const correctEntry = entries.splice(correctIndex, 1)[0];
  entries.splice(desiredCorrectPosition, 0, correctEntry);
  return entries;
}

function renderPrinciples(type) {
  const list = document.querySelector("#principleList");
  list.innerHTML = "";
  (teachingNotes[type] || []).forEach(note => {
    const item = document.createElement("li");
    item.textContent = note;
    list.appendChild(item);
  });
}

function answerTask(choice, correct, feedback) {
  const earned = correct ? 50 : 20;
  state.xp += earned;
  state.answered[state.currentTask] = {
    choice,
    correct,
    feedback: `${correct ? "Correct." : "Not quite."} ${feedback} +${earned} XP`
  };
  saveState();
  renderTask();
}

function goNext() {
  if (state.finished) {
    shareBadge();
    return;
  }

  if (!state.answered[state.currentTask]) return;

  taskCard.classList.add("is-leaving");
  window.setTimeout(() => {
    if (state.currentTask < tasks.length - 1) {
      state.currentTask += 1;
    } else {
      state.finished = true;
    }
    taskCard.classList.remove("is-leaving");
    saveState();
    renderTask();
  }, 250);
}

function renderCompletion() {
  const shareText = "I know emailing damn well";
  const shareUrl = window.location.href.split("#")[0];
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const mailUrl = `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(`${shareText}\n\nI completed Emailr: ${shareUrl}`)}`;

  document.querySelector("#studentLine").textContent = `${state.name || "Student"} • ${state.grade}`;
  document.querySelector("#xpValue").textContent = state.xp;
  document.querySelector("#taskCount").textContent = `${tasks.length}/${tasks.length}`;
  document.querySelector("#progressBar").style.width = "100%";
  document.querySelector("#taskNumber").textContent = "Quest complete";
  document.querySelector("#taskType").textContent = "Emailr graduate";
  document.querySelector("#taskTitle").textContent = "You finished the Emailr etiquette path.";
  document.querySelector("#taskLesson").textContent =
    "You practiced reader empathy, high-agency updates, clear asks, concise writing, follow-ups, attachments, formatting, and cold email craft.";
  renderPrinciples("Final boss");
  document.querySelector("#activityLabel").textContent = "Completed curriculum";
  document.querySelector("#scenarioBox").innerHTML = `
    <div class="share-badge" id="shareBadge">
      <div class="badge-chip">EMAILR CERTIFIED</div>
      <div class="badge-symbol" aria-hidden="true">
        <span class="node node-a"></span>
        <span class="node node-b"></span>
        <span class="node node-c"></span>
        <span class="circuit-line line-a"></span>
        <span class="circuit-line line-b"></span>
        <strong>@</strong>
      </div>
      <h2>${shareText}</h2>
      <p>${state.name || "Student"} completed Emailr with ${state.xp} XP.</p>
    </div>`;
  optionsBox.innerHTML = `
    <a class="share-action linkedin-action" href="${linkedInUrl}" target="_blank" rel="noreferrer">Share on LinkedIn</a>
    <a class="share-action email-action" href="${mailUrl}">Share by email</a>
  `;
  feedbackBox.className = "feedback good";
  feedbackBox.textContent = "Your badge is ready to share. Screenshot it, post it, or use the share links below.";
  nextBtn.disabled = false;
  nextBtn.textContent = "Share badge";
}

function restart() {
  state.currentTask = 0;
  state.xp = 0;
  state.answered = {};
  state.finished = false;
  saveState();
  renderTask();
}

function shareBadge() {
  const shareText = "I know emailing damn well";
  const shareUrl = window.location.href.split("#")[0];
  if (navigator.share) {
    navigator.share({
      title: shareText,
      text: `I completed Emailr with ${state.xp} XP.`,
      url: shareUrl
    });
    return;
  }
  navigator.clipboard?.writeText(`${shareText} - ${shareUrl}`);
  feedbackBox.textContent = "Share link copied. Your badge is ready for LinkedIn or email.";
}

loginForm.addEventListener("submit", event => {
  event.preventDefault();
  state.loggedIn = true;
  state.name = nameInput.value.trim() || "Student";
  state.grade = gradeInput.value;
  saveState();
  showApp();
});

nextBtn.addEventListener("click", goNext);
document.querySelector("#restartBtn").addEventListener("click", restart);
document.querySelector("#backToLoginBtn").addEventListener("click", () => {
  state.loggedIn = false;
  saveState();
  showLogin();
});

if (state.loggedIn) {
  showApp();
} else {
  showLogin();
}
