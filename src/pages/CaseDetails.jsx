import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CaseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Example dummy data
  const caseData = {
    caseId: "0987",
    title: "Elena S.",
    date: "August 14, 2022",
    location: "Off the coast of Coronado, Panama",
    cruiseLine: "Horizon Blue - Serenity Voyager",
    incidentType: "Missing Person",
    coordinates: "25.0343° N, 77.3963° W",
    summary: `Elena S., 28, was last seen by her cabinmate around 11:45 p.m. after leaving a comedy show on Deck 7. Her belongings were untouched in her cabin, and she had not swiped her room key after midnight.

Security footage reportedly showed her walking toward the upper deck alone, but no official confirmation has been released. The cruise line conducted a limited search at sea before continuing to the next port.

Elena’s family is still seeking answers. This case remains open.`,
  };

  return (
    <div className="case-details-wrapper fade-in">
      <div className="case-details-card">
        <div className="case-id">Case #{caseData.caseId}</div>
        <h2 className="case-details-title">{caseData.title}</h2>

        <div className="case-detail"><strong>Date:</strong> {caseData.date}</div>
        <div className="case-detail"><strong>Location:</strong> {caseData.location}</div>
        <div className="case-detail"><strong>Cruise Line:</strong> {caseData.cruiseLine}</div>
        <div className="case-detail"><strong>Incident Type:</strong> {caseData.incidentType}</div>
        <div className="case-detail"><strong>Coordinates:</strong> {caseData.coordinates}</div>

        <div className="case-summary-section">
          <strong>Summary:</strong>
          <p>{caseData.summary}</p>
        </div>
      </div>
    </div>
  );
}
