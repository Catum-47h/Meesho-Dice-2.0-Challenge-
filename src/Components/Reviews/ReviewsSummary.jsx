// // ReviewsSummary.jsx
// import React from "react";
// import { FaStar, FaCommentDots } from "react-icons/fa";
// import "./Reviews.css";

// export default function ReviewsSummary({ insights, onAsk, onSeeEvidence, onAspectClick }) {
//   if (!insights) return null;
//   const { overall, aspects, summary_text, representative_reviews } = insights;

//   return (
//     <div className="insights-card">
//       <div className="insights-left">
//         <div className="big-score">
//           <div className="score-num">{overall.avg_rating.toFixed(1)}</div>
//           <div className="score-star"><FaStar /></div>
//         </div>
//         <div className="sentiment">{overall.sentiment}</div>
//         <div className="summary-text">{summary_text}</div>
//       </div>

//       <div className="insights-right">
//         <div className="aspects-row">
//           {Object.entries(aspects).map(([key, val]) => (
//             <div key={key} className="aspect-badge" onClick={() => onAspectClick(key)}>
//               <div className="aspect-name">{key}</div>
//               <div className="aspect-score">{val.score.toFixed(1)} ★</div>
//               <div className="aspect-note">{val.note}</div>
//             </div>
//           ))}
//         </div>

//         <div className="insights-actions">
//           <button className="btn-primary" onClick={onAsk}><FaCommentDots /> Ask AI</button>
//           <button className="btn-ghost" onClick={() => onSeeEvidence(representative_reviews)}>See evidence ({representative_reviews.length})</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// ReviewsSummary.jsx
import React from "react";
import { FaStar } from "react-icons/fa";
import "./Reviews.css";

export default function ReviewsSummary({ insights, onAsk, onSeeEvidence, onAspectClick }) {
  if (!insights) return null;
  const { overall, aspects, summary_text, representative_reviews } = insights;

  return (
    <div className="insights-card">
      <div className="insights-left">
        <div className="big-score">
          <div className="score-num">{overall.avg_rating.toFixed(1)}</div>
          <div className="score-star"><FaStar /></div>
        </div>
        <div className="sentiment">{overall.sentiment}</div>
        <div className="summary-text">{summary_text}</div>
      </div>

      <div className="insights-right">
        <div className="aspects-row">
          {Object.entries(aspects).map(([key, val]) => (
            <div key={key} className="aspect-badge" onClick={() => onAspectClick(key)}>
              <div className="aspect-name">{key}</div>
              <div className="aspect-score">{val.score.toFixed(1)} ★</div>
              <div className="aspect-note">{val.note}</div>
            </div>
          ))}
        </div>

        {/* <div className="insights-actions">
  <button className="btn-askmee" onClick={onAsk}>
    Ask Mee
  </button>
  <button className="btn-evidence" onClick={() => onSeeEvidence(representative_reviews)}>
    See evidence ({representative_reviews.length})
  </button>
</div> */}

<div className="insights-actions">
  <div className="btn-askmee-container">
    <button className="btn-askmee" onClick={onAsk}>
      Ask Mee
    </button>
  </div>
  <button className="btn-evidence" onClick={() => onSeeEvidence(representative_reviews)}>
    See evidence ({representative_reviews.length})
  </button>
</div>

      </div>
    </div>
  );
}
