// // ChatModal.jsx
// import React, { useState } from "react";
// import "./Reviews.css";

// export default function ChatModal({ open, onClose, insights }) {
//   const [messages, setMessages] = useState([
//     { who: "bot", text: "Hi — I can summarize product reviews. Try: 'Does this run true to size?'" }
//   ]);
//   const [input, setInput] = useState("");

//   if (!open) return null;

//   function pushBot(text, evidence = null) {
//     setMessages((m) => [...m, { who: "bot", text, evidence }]);
//   }

//   function onSend() {
//     if (!input.trim()) return;
//     const q = input.trim().toLowerCase();
//     setMessages((m) => [...m, { who: "user", text: input }]);
//     setInput("");

//     // Rule-based demo responses (replace with real backend later)
//     if (q.includes("size") || q.includes("fit") || q.includes("fits")) {
//       const note = insights?.aspects?.fit?.note || "Not enough data on fit.";
//       pushBot(`${note} Example: "${insights?.representative_reviews?.find(r=>r.rating<3)?.text || 'Some users reported tight fit.'}"`);
//       return;
//     }
//     if (q.includes("fabric") || q.includes("material")) {
//       const note = insights?.aspects?.fabric?.note || "Not enough data on fabric.";
//       pushBot(`${note} Pros: ${insights?.top_pros?.slice(0,3).join(", ")}`);
//       return;
//     }
//     if (q.includes("color")) {
//       const note = insights?.aspects?.color?.note || "Not enough data on color.";
//       pushBot(note);
//       return;
//     }
//     if (q.includes("delivery")) {
//       const note = insights?.aspects?.delivery?.note || "No data on delivery speed.";
//       pushBot(note);
//       return;
//     }

//     // fallback
//     pushBot(`${insights?.summary_text || "Not enough data."} Top pros: ${insights?.top_pros?.slice(0,3).join(", ")}. Top cons: ${insights?.top_cons?.slice(0,3).join(", ")}.`);
//   }

//   return (
//     <div className="chat-overlay">
//       <div className="chat-modal">
//         <div className="chat-header">
//           <div>Ask AI about this product</div>
//           <button onClick={onClose} className="close-btn">✕</button>
//         </div>

//         <div className="chat-body">
//           {messages.map((m, i) => (
//             <div key={i} className={`chat-msg ${m.who}`}>
//               <div className="chat-text">{m.text}</div>
//               {m.evidence && <div className="chat-evidence">Evidence: {m.evidence}</div>}
//             </div>
//           ))}
//         </div>

//         <div className="chat-input">
//           <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Ask something like: 'Will this fit a chest 38?'" />
//           <button onClick={onSend} className="btn-send">Send</button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import "./Reviews.css";
import mockQA from "./mockQA"; // import the QA mock data

export default function ChatModal({ open, onClose, insights }) {
  const [messages, setMessages] = useState([
    { who: "bot", text: "Hi — I can summarize product reviews. Try: 'Does this run true to size?'" }
  ]);
  const [input, setInput] = useState("");

  if (!open) return null;

  function pushBot(text, evidence = null) {
    setMessages((m) => [...m, { who: "bot", text, evidence }]);
  }

  function onSend() {
    if (!input.trim()) return;
    const q = input.trim().toLowerCase();
    setMessages((m) => [...m, { who: "user", text: input }]);
    setInput("");

    let found = false;

    for (let item of mockQA) {
      if (item.q.some(keyword => q.includes(keyword))) {
        pushBot(item.a);
        found = true;
        break;
      }
    }

    if (!found) {
      pushBot(
        `${insights?.summary_text || "Not enough data."} Top pros: ${insights?.top_pros?.join(", ")}. Top cons: ${insights?.top_cons?.join(", ")}.`
      );
    }
  }

  return (
    <div className="chat-overlay">
      <div className="chat-modal">
        <div className="chat-header">
          <div>Ask AI about this product</div>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>

        <div className="chat-body">
          {messages.map((m, i) => (
            <div key={i} className={`chat-msg ${m.who}`}>
              <div className="chat-text">{m.text}</div>
              {m.evidence && <div className="chat-evidence">Evidence: {m.evidence}</div>}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Ask something like: 'Will this fit a chest 38?'" />
          <button onClick={onSend} className="btn-send">Send</button>
        </div>
      </div>
    </div>
  );
}
