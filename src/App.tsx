import { CheckCircle2, MailCheck, Medal, RotateCcw, Sparkles, Star, Trophy } from "lucide-react";
import { useMemo, useState } from "react";

type Choice = {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
};

type Mission = {
  id: string;
  title: string;
  level: string;
  skill: string;
  prompt: string;
  email: string;
  choices: Choice[];
};

const missions: Mission[] = [
  {
    id: "subject",
    title: "Subject Line Sprint",
    level: "Rookie",
    skill: "Clear subject lines",
    prompt: "Pick the subject line that helps a teacher understand the email before opening it.",
    email:
      "You need to ask Ms. Alvarez if you can turn in your lab report one day late because your bus was delayed after the away game.",
    choices: [
      {
        id: "a",
        text: "question",
        isCorrect: false,
        feedback: "Too vague. A good subject line previews the request.",
      },
      {
        id: "b",
        text: "Request: one-day extension for biology lab report",
        isCorrect: true,
        feedback: "Nice! It names the action and the assignment clearly.",
      },
      {
        id: "c",
        text: "PLEASE READ ASAP!!!!",
        isCorrect: false,
        feedback: "All caps and urgency can feel pushy unless there is a real emergency.",
      },
    ],
  },
  {
    id: "tone",
    title: "Tone Trainer",
    level: "Apprentice",
    skill: "Respectful tone",
    prompt: "Choose the opening that sounds respectful and still gets to the point.",
    email:
      "You are emailing a counselor you have not met yet to ask about changing an elective next semester.",
    choices: [
      {
        id: "a",
        text: "Hey, I need you to switch my class.",
        isCorrect: false,
        feedback: "This is direct, but it sounds demanding and too casual for a first email.",
      },
      {
        id: "b",
        text: "Dear Mr. Chen, I hope you are doing well. I have a question about changing my elective for next semester.",
        isCorrect: true,
        feedback: "Great balance: greeting, polite tone, and a clear reason for writing.",
      },
      {
        id: "c",
        text: "To whom it may concern: My schedule is unacceptable.",
        isCorrect: false,
        feedback: "This sounds distant and negative. Start with the person's name when you know it.",
      },
    ],
  },
  {
    id: "brevity",
    title: "Brevity Boss",
    level: "Pro",
    skill: "Concise requests",
    prompt: "Which version is easiest for a busy adult to answer?",
    email:
      "You missed yesterday's history class and need to know what to complete before Friday.",
    choices: [
      {
        id: "a",
        text: "Hi Ms. Patel, I was absent yesterday. Could you please let me know what I should complete before Friday? Thank you, Jordan",
        isCorrect: true,
        feedback: "Exactly. It gives context, asks one clear question, and signs off.",
      },
      {
        id: "b",
        text: "I was gone. What did I miss?",
        isCorrect: false,
        feedback: "It is short, but it does not include a greeting, deadline, or courteous close.",
      },
      {
        id: "c",
        text: "Yesterday was complicated because my ride was late and then I could not find my binder and I think maybe there was a handout...",
        isCorrect: false,
        feedback: "Too much background can hide the actual request.",
      },
    ],
  },
  {
    id: "follow-up",
    title: "Follow-Up Finisher",
    level: "Captain",
    skill: "Patient follow-ups",
    prompt: "You sent an email yesterday. What follow-up is most appropriate?",
    email:
      "You asked a club advisor to sign a field trip form. The trip is next week, and you have not heard back after one school day.",
    choices: [
      {
        id: "a",
        text: "Send five reminder emails so it stays at the top of their inbox.",
        isCorrect: false,
        feedback: "Repeated messages can feel stressful. Give people reasonable time to respond.",
      },
      {
        id: "b",
        text: "Wait a little longer, then send one polite follow-up with the deadline and attachment included again.",
        isCorrect: true,
        feedback: "Right. A useful follow-up is patient, specific, and easy to act on.",
      },
      {
        id: "c",
        text: "Forward the email to the principal immediately.",
        isCorrect: false,
        feedback: "Escalating too soon can damage trust. Start with a courteous reminder.",
      },
    ],
  },
];

const powerUps = [
  "Use a specific subject line.",
  "Start with a respectful greeting.",
  "Give the needed context in one or two sentences.",
  "Ask for one clear action.",
  "Close with thanks and your name.",
];

function App() {
  const [currentMission, setCurrentMission] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Choice>>({});

  const mission = missions[currentMission];
  const selectedChoice = answers[mission.id];
  const correctCount = Object.values(answers).filter((answer) => answer.isCorrect).length;
  const completedCount = Object.keys(answers).length;
  const progress = Math.round((completedCount / missions.length) * 100);
  const score = correctCount * 250 + completedCount * 50;

  const badge = useMemo(() => {
    if (correctCount === missions.length) {
      return "Inbox Legend";
    }

    if (correctCount >= 3) {
      return "Etiquette Captain";
    }

    if (correctCount >= 2) {
      return "Reply Ready";
    }

    return "Draft Rookie";
  }, [correctCount]);

  const chooseAnswer = (choice: Choice) => {
    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [mission.id]: choice,
    }));
  };

  const goToNextMission = () => {
    setCurrentMission((previousMission) => Math.min(previousMission + 1, missions.length - 1));
  };

  const restart = () => {
    setAnswers({});
    setCurrentMission(0);
  };

  const isFinished = completedCount === missions.length;

  return (
    <main className="app-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <Sparkles size={18} aria-hidden="true" />
            Email etiquette quest
          </p>
          <h1>Level up from messy drafts to polished messages.</h1>
          <p>
            Emailr turns high school email etiquette into fast missions with instant feedback,
            power-up tips, badges, and a final inbox score.
          </p>
          <div className="hero-actions">
            <a className="primary-link" href="#mission">
              Start mission
            </a>
            <a className="secondary-link" href="#playbook">
              View playbook
            </a>
          </div>
        </div>

        <aside className="score-card" aria-label="Current progress">
          <div className="score-card__header">
            <Trophy aria-hidden="true" />
            <span>{badge}</span>
          </div>
          <strong>{score}</strong>
          <span>XP earned</span>
          <div className="progress-track" aria-label={`${progress}% complete`}>
            <div style={{ width: `${progress}%` }} />
          </div>
          <p>
            {completedCount}/{missions.length} missions complete
          </p>
        </aside>
      </section>

      <section className="dashboard" aria-label="Game dashboard">
        <article className="mission-panel" id="mission">
          <div className="mission-panel__topline">
            <span>{mission.level}</span>
            <span>{mission.skill}</span>
          </div>
          <h2>{mission.title}</h2>
          <p className="mission-prompt">{mission.prompt}</p>

          <div className="email-card">
            <div className="email-card__bar">
              <span />
              <span />
              <span />
            </div>
            <p>{mission.email}</p>
          </div>

          <div className="choices" aria-label="Answer choices">
            {mission.choices.map((choice) => {
              const isSelected = selectedChoice?.id === choice.id;
              return (
                <button
                  className={`choice ${isSelected ? "choice--selected" : ""} ${
                    isSelected && choice.isCorrect ? "choice--correct" : ""
                  } ${isSelected && !choice.isCorrect ? "choice--incorrect" : ""}`}
                  key={choice.id}
                  onClick={() => chooseAnswer(choice)}
                  type="button"
                >
                  <span>{choice.text}</span>
                  {isSelected ? <CheckCircle2 size={20} aria-hidden="true" /> : null}
                </button>
              );
            })}
          </div>

          {selectedChoice ? (
            <div className={`feedback ${selectedChoice.isCorrect ? "success" : "retry"}`}>
              <strong>{selectedChoice.isCorrect ? "Mission cleared!" : "Try the lesson again."}</strong>
              <p>{selectedChoice.feedback}</p>
            </div>
          ) : null}

          <div className="mission-controls">
            <button disabled={currentMission === 0} onClick={() => setCurrentMission(currentMission - 1)} type="button">
              Previous
            </button>
            <button disabled={!selectedChoice || currentMission === missions.length - 1} onClick={goToNextMission} type="button">
              Next mission
            </button>
          </div>
        </article>

        <aside className="side-panel">
          <section className="badge-card">
            <Medal aria-hidden="true" />
            <div>
              <span>Current badge</span>
              <strong>{badge}</strong>
            </div>
          </section>

          <section className="mission-list" aria-label="Mission list">
            <h3>Mission map</h3>
            {missions.map((item, index) => {
              const answer = answers[item.id];
              return (
                <button
                  className={index === currentMission ? "active" : ""}
                  key={item.id}
                  onClick={() => setCurrentMission(index)}
                  type="button"
                >
                  <span>{index + 1}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <small>
                      {answer ? (answer.isCorrect ? "Cleared" : "Needs polish") : "Locked in inbox"}
                    </small>
                  </div>
                </button>
              );
            })}
          </section>
        </aside>
      </section>

      <section className="playbook" id="playbook">
        <div>
          <p className="eyebrow">
            <MailCheck size={18} aria-hidden="true" />
            Etiquette playbook
          </p>
          <h2>Five habits every student can use today</h2>
        </div>
        <div className="power-grid">
          {powerUps.map((tip, index) => (
            <article key={tip}>
              <Star aria-hidden="true" />
              <span>Power-up {index + 1}</span>
              <p>{tip}</p>
            </article>
          ))}
        </div>
      </section>

      {isFinished ? (
        <section className="final-card" aria-live="polite">
          <div>
            <p className="eyebrow">Quest complete</p>
            <h2>{correctCount === missions.length ? "Perfect inbox run!" : "Great start. Keep practicing."}</h2>
            <p>
              You earned {score} XP and the {badge} badge. Review any “Needs polish” missions to
              sharpen your email instincts.
            </p>
          </div>
          <button onClick={restart} type="button">
            <RotateCcw size={18} aria-hidden="true" />
            Replay quest
          </button>
        </section>
      ) : null}
    </main>
  );
}

export default App;
