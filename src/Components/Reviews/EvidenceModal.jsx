// // EvidenceModal.jsx
// import React from "react";
// import "./Reviews.css";

// export default function EvidenceModal({ open, onClose, reviews }) {
//   if (!open) return null;
//   if (!reviews || reviews.length === 0) return null;

//   return (
//     <div className="evidence-overlay">
//       <div className="evidence-modal">
//         <div className="evidence-header">
//           <div>Evidence (sample reviews)</div>
//           <button className="close-btn" onClick={onClose}>✕</button>
//         </div>

//         <div className="evidence-list">
//           {reviews.map((r) => (
//             <div key={r.id} className="evidence-row">
//               <img src={r.image || (r.images && r.images[0]) || "https://via.placeholder.com/90"} alt="evidence" />
//               <div>
//                 <div className="evidence-name">{r.name || "User" } • {r.rating} ★</div>
//                 <div className="evidence-text">{r.text}</div>
//                 <div className="evidence-meta">Helpful ({r.helpful || 0}) • {r.date || ""}</div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="evidence-footer">
//           <button className="btn-primary" onClick={onClose}>Close</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// EvidenceModal.jsx
import React from "react";
import "./Reviews.css";

export default function EvidenceModal({ open, onClose, reviews }) {
  if (!open) return null;
  if (!reviews || reviews.length === 0) return null;

  return (
    <div className="evidence-overlay">
      <div className="evidence-modal">
        <div className="evidence-header">
          <div>Evidence (sample reviews)</div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="evidence-list">
          {reviews.map((r) => (
            <div key={r.id} className="evidence-row">
              <img src={r.image || (r.images && r.images[0]) || "https://via.placeholder.com/90"} alt="evidence" />
              <div>
                <div className="evidence-name">{r.name || "User" } • {r.rating} ★</div>
                <div className="evidence-text">{r.text}</div>
                <div className="evidence-meta">Helpful ({r.helpful || 0}) • {r.date || ""}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="evidence-footer">
          <button className="btn-primary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
