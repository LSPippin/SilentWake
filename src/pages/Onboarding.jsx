import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Onboarding() {
  const navigate = useNavigate();

  const slides = [
    {
    title: "What is Silent Wake?",
    content: [
      "Silent Wake is a citizen science project devoted to tracking missing persons and unexplained events on cruise ships and at sea.",
      "Our goal is to bring visibility to these often-overlooked cases by collecting, organizing, and analyzing stories, data, and patterns that may otherwise go unnoticed.", 
      "By turning attention to what happens beyond the shoreline, we hope to support affected families and push for greater transparency and accountability in the maritime industry.",
    ],
    },
  {
    title: "Why Your Story Matters",
    content: [
      "Every voice counts.",
      "Whether you witnessed something strange, knew someone who went missing, or have questions about your own experience aboard a ship, your story could help connect the dots.",
      "Personal accounts, no matter how small, have the power to inform ongoing investigations, strengthen patterns in the data, and offer comfort to others who feel alone in their search for answers.",
      "You are not just sharing a memory—you are helping build a network of truth.",
    ],
    },
  {
    title: "What You Can Do",
    content: [
      "There are many ways to get involved:",
      "Submit a Report – Share details about an incident, experience, or person.",
      "Explore Ongoing Cases – Browse stories, timelines, and updates.",
      "Contribute Your Insight – Add observations, context, or corrections to reported events.",
      "Join the Forum – Ask questions, offer support, and collaborate with other users and researchers.",
      "Whether you participate once or often, your contribution matters.",
    ],
    },
  {
    title: "Your Privacy & Safety",
    content: [
      "We understand the sensitivity of what’s shared here.",
      "You can post using an alias or remain anonymous.",
      "We do not collect personal identifiers unless you choose to provide them.",
      "You control what you share and can update or delete your reports at any time.Data is stored securely and used solely for community-driven research and awareness.",
      "Your safety, both online and offline, is a priority—and we’re committed to protecting it.",
    ],
    },
];

  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      navigate('/ChooseAccess');
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="onboarding-screen fade-in">
      <h1>{slides[step].title}</h1>

      {slides[step].content.map((paragraph, i) => (
  <p key={i}>{paragraph}</p>
))}

      <div className="button-row">
        {step > 0 && (
          <button className="btn-secondary" onClick={handleBack}>
            Back
          </button>
        )}
        <button className="btn-primary" onClick={handleNext}>
          {step === slides.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}