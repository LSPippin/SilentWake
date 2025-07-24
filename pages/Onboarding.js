import { useState } from 'react';
import { useRouter } from 'next/router';

const slides = [
  {
    title: 'What is Silent Wake?',
    content: 'Silent Wake is a citizen science app for reporting and investigating maritime incidents at sea.'
  },
  {
    title: 'Why Your Story Matters',
    content: 'Every report helps expose patterns and gives victims and families a voice in a system that often silences them.'
  },
  {
    title: 'What You Can Do',
    content: 'Submit reports, view ongoing cases, participate in forums, and contribute to public awareness.'
  },
  {
    title: 'Your Privacy & Safety',
    content: 'You can report anonymously. Your safety and control over your data are our top priorities.'
  }
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      router.push('/choose-access');
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.slide}>
        <h1>{slides[step].title}</h1>
        <p>{slides[step].content}</p>
      </div>
      <div style={styles.buttons}>
        {step > 0 && <button onClick={handleBack}>Back</button>}
        <button onClick={handleNext}>
          {step === slides.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    padding: '2rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa'
  },
  slide: {
    marginBottom: '2rem'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem'
  }
};
