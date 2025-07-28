import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Onboarding() {
  const navigate = useNavigate();

  const slides = [
    {
      title: "What is Silent Wake?",
      content: "Silent Wake is a citizen science platform for tracking disappearances and incidents at sea, especially on cruise ships.",
    },
    {
      title: "Why Your Story Matters",
      content: "Your experiences and observations can help others, bring justice, and build a transparent database of maritime events.",
    },
    {
      title: "What You Can Do",
      content: "You can report incidents, explore past cases, contribute to discussions, or simply stay informed.",
    },
    {
      title: "Your Privacy & Safety",
      content: "We never share personal data without permission. You can contribute anonymously or create an account for more features.",
    },
  ];

  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      router.push('/choose-access'); // Final screen redirects
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div style={styles.container}>
      <h1>{slides[step].title}</h1>
      <p>{slides[step].content}</p>

      <div style={styles.buttonRow}>
        {step > 0 && (
          <button style={styles.button} onClick={handleBack}>
            Back
          </button>
        )}
        <button style={styles.button} onClick={handleNext}>
          {step === slides.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
    maxWidth: '600px',
    margin: 'auto',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonRow: {
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  },
  button: {
    padding: '0.8rem 2rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #444',
    backgroundColor: '#eee',
    cursor: 'pointer',
  },
};
