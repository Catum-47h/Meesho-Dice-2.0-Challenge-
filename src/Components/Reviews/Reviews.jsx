import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import mockData from "./mockData";
import ReviewsSummary from "./ReviewsSummary";
import ChatModal from "./ChatModal";
import EvidenceModal from "./EvidenceModal";
import { FaStar } from "react-icons/fa";
import "./Reviews.css";

export default function Reviews() {
  const { id } = useParams();
  const { insights, reviews = [] } = mockData(id || 101);

  const [filtered, setFiltered] = useState(reviews);
  const [filter, setFilter] = useState("all");
  const [chatOpen, setChatOpen] = useState(false);
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const [evidenceFor, setEvidenceFor] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    applyFilter(filter);
    // eslint-disable-next-line
  }, [filter, id]);

  function applyFilter(f) {
    setFilter(f);
    if (f === "all") setFiltered(reviews);
    else if (f === "mostHelpful") setFiltered([...reviews].sort((a,b) => b.helpful - a.helpful));
    else if (f === "recent") setFiltered([...reviews]);
    else if (f === "5star") setFiltered(reviews.filter(r => r.rating === 5));
    else if (f === "4star") setFiltered(reviews.filter(r => r.rating === 4));
    else if (f === "3star") setFiltered(reviews.filter(r => r.rating === 3));
    else if (f === "2star") setFiltered(reviews.filter(r => r.rating === 2));
    else if (f === "1star") setFiltered(reviews.filter(r => r.rating === 1));
    else setFiltered(reviews.filter(r => r.text.toLowerCase().includes(f)));
  }

  function onSeeEvidence(sample) {
    setEvidenceFor(sample || []);
    setEvidenceOpen(true);
  }

  function onAspectClick(aspect) {
    const map = { fabric: "fabric", fit: "fit", color: "color", delivery: "delivery" };
    applyFilter(map[aspect] || aspect);
    window.scrollTo({ top: 420, behavior: "smooth" });
  }

  return (
    <div className="reviews-shell">
      <div className="reviews-top">
        <Link to={`/product/${id}`} className="back-link">← Back to Product</Link>
        <h2>All Reviews {id ? `for Product ${id}` : ""}</h2>
      </div>

      <ReviewsSummary
        insights={insights}
        onAsk={() => setChatOpen(true)}
        onSeeEvidence={onSeeEvidence}
        onAspectClick={onAspectClick}
      />

      <div className="reviews-actions">
        <div className="filters">
          <button className={filter==="all"?"chip active":"chip"} onClick={()=>applyFilter("all")}>All</button>
          <button className={filter==="mostHelpful"?"chip active":"chip"} onClick={()=>applyFilter("mostHelpful")}>Most helpful</button>
          <button className={filter==="recent"?"chip active":"chip"} onClick={()=>applyFilter("recent")}>Most recent</button>
          <button className={filter==="5star"?"chip active":"chip"} onClick={()=>applyFilter("5star")}>5★</button>
          <button className={filter==="4star"?"chip active":"chip"} onClick={()=>applyFilter("4star")}>4★</button>
          <button className={filter==="3star"?"chip active":"chip"} onClick={()=>applyFilter("3star")}>3★</button>
          <button className={filter==="2star"?"chip active":"chip"} onClick={()=>applyFilter("2star")}>2★</button>
          <button className={filter==="1star"?"chip active":"chip"} onClick={()=>applyFilter("1star")}>1★</button>
          <button className="chip" onClick={()=>applyFilter("fit")}>Filter: Fit</button>
          <button className="chip" onClick={()=>applyFilter("fabric")}>Filter: Fabric</button>
        </div>
        <div className="search">
          <input placeholder="Search reviews (e.g., 'size', 'wash')" onChange={(e)=> {
            const q = e.target.value.toLowerCase();
            if(!q) applyFilter("all");
            else setFiltered(reviews.filter(r => r.text.toLowerCase().includes(q)));
          }} />
        </div>
      </div>

      <div className="representative">
        <h3>Representative reviews</h3>
        <div className="rep-row">
          {insights.representative_reviews?.map(r => (
            <div key={r.id} className="rep-card">
              <img src={r.image || "https://via.placeholder.com/90"} alt="rep" />
              <div className="rep-text">{r.text}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="reviews-list">
        {filtered?.map((r) => (
          <div key={r.id} className="review-card">
            <div className="review-header">
              <div className="left">
                <div className="avatar">{(r.name || "U")[0]}</div>
                <div>
                  <div className="name">{r.name}</div>
                  <div className="meta">Posted on {r.date}</div>
                </div>
              </div>
              <div className="rating">
                {[1,2,3,4,5].map((i) => (
                  <FaStar 
                    key={i} 
                    style={{ 
                      color: i <= r.rating ? "var(--accent)" : "#444", 
                      marginLeft: 4 
                    }} 
                  />
                ))}
              </div>
            </div>

            <div className="review-text">
              {expanded[r.id] ? r.text : (r.text.length > 120 ? r.text.slice(0,120) + "..." : r.text)}
              {r.text.length > 120 && (
                <button className="show-more" onClick={() => setExpanded(prev => ({...prev, [r.id]: !prev[r.id]}))}>
                  {expanded[r.id] ? "Show less" : "Show more"}
                </button>
              )}
            </div>

            {r.images?.length > 0 && (
              <div className="review-images">
                {r.images.map((img, idx) => (
                  <img key={idx} src={img} alt="rev-img" onClick={() => { setEvidenceFor([r]); setEvidenceOpen(true); }} />
                ))}
              </div>
            )}

            <div className="review-footer">
              <div>👍 Helpful ({r.helpful})</div>
              <div className="tags">
                {r.text.toLowerCase().includes("size") && <span className="tag">fit</span>}
                {r.text.toLowerCase().includes("fabric") && <span className="tag">fabric</span>}
                {r.text.toLowerCase().includes("color") && <span className="tag">color</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <ChatModal open={chatOpen} onClose={() => setChatOpen(false)} insights={insights} />
      <EvidenceModal open={evidenceOpen} onClose={() => setEvidenceOpen(false)} reviews={evidenceFor} />
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import mockData from "./mockData";
// import ReviewsSummary from "./ReviewsSummary";
// import ChatModal from "./ChatModal";
// import EvidenceModal from "./EvidenceModal";
// import { FaStar } from "react-icons/fa";
// import "./Reviews.css";

// export default function Reviews() {
//   const { id } = useParams();
//   const { insights, reviews = [] } = mockData(id || 101);

//   const [filtered, setFiltered] = useState(reviews);
//   const [filter, setFilter] = useState("all");
//   const [chatOpen, setChatOpen] = useState(false);
//   const [evidenceOpen, setEvidenceOpen] = useState(false);
//   const [evidenceFor, setEvidenceFor] = useState([]);
//   const [expanded, setExpanded] = useState({});

//   useEffect(() => {
//     applyFilter(filter);
//     // eslint-disable-next-line
//   }, [filter, id]);

//   function applyFilter(f) {
//     setFilter(f);
//     if (f === "all") setFiltered(reviews);
//     else if (f === "mostHelpful") setFiltered([...reviews].sort((a,b) => b.helpful - a.helpful));
//     else if (f === "recent") setFiltered([...reviews]);
//     else if (f === "5star") setFiltered(reviews.filter(r => r.rating === 5));
//     else if (f === "4star") setFiltered(reviews.filter(r => r.rating === 4));
//     else setFiltered(reviews.filter(r => r.text.toLowerCase().includes(f)));
//   }

//   function onSeeEvidence(sample) {
//     setEvidenceFor(sample || []);
//     setEvidenceOpen(true);
//   }

//   function onAspectClick(aspect) {
//     const map = { fabric: "fabric", fit: "fit", color: "color", delivery: "delivery" };
//     applyFilter(map[aspect] || aspect);
//     window.scrollTo({ top: 420, behavior: "smooth" });
//   }

//   return (
//     <div className="reviews-shell">
//       <div className="reviews-top">
//         <Link to={`/product/${id}`} className="back-link">← Back to Product</Link>
//         <h2>All Reviews {id ? `for Product ${id}` : ""}</h2>
//       </div>

//       <ReviewsSummary
//         insights={insights}
//         onAsk={() => setChatOpen(true)}
//         onSeeEvidence={onSeeEvidence}
//         onAspectClick={onAspectClick}
//       />

//       <div className="reviews-actions">
//         <div className="filters">
//           <button className={filter==="all"?"chip active":"chip"} onClick={()=>applyFilter("all")}>All</button>
//           <button className={filter==="mostHelpful"?"chip active":"chip"} onClick={()=>applyFilter("mostHelpful")}>Most helpful</button>
//           <button className={filter==="recent"?"chip active":"chip"} onClick={()=>applyFilter("recent")}>Most recent</button>
//           <button className={filter==="5star"?"chip active":"chip"} onClick={()=>applyFilter("5star")}>5★</button>
//           <button className="chip" onClick={()=>applyFilter("fit")}>Filter: Fit</button>
//           <button className="chip" onClick={()=>applyFilter("fabric")}>Filter: Fabric</button>
//         </div>
//         <div className="search">
//           <input placeholder="Search reviews (e.g., 'size', 'wash')" onChange={(e)=> {
//             const q = e.target.value.toLowerCase();
//             if(!q) applyFilter("all");
//             else setFiltered(reviews.filter(r => r.text.toLowerCase().includes(q)));
//           }} />
//         </div>
//       </div>

//       <div className="representative">
//         <h3>Representative reviews</h3>
//         <div className="rep-row">
//           {insights.representative_reviews?.map(r => (
//             <div key={r.id} className="rep-card">
//               <img src={r.image || "https://via.placeholder.com/90"} alt="rep" />
//               <div className="rep-text">{r.text}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="reviews-list">
//         {filtered?.map((r) => (
//           <div key={r.id} className="review-card">
//             <div className="review-header">
//               <div className="left">
//                 <div className="avatar">{(r.name || "U")[0]}</div>
//                 <div>
//                   <div className="name">{r.name}</div>
//                   <div className="meta">Posted on {r.date}</div>
//                 </div>
//               </div>
//               <div className="rating">
//                 {[...Array(5)].map((_, i) => (
//                   <FaStar key={i} style={{ color: i < r.rating ? "var(--accent)" : "#ddd", marginLeft: 4 }} />
//                 ))}
//               </div>
//             </div>

//             <div className="review-text">
//               {expanded[r.id] ? r.text : (r.text.length > 120 ? r.text.slice(0,120) + "..." : r.text)}
//               {r.text.length > 120 && (
//                 <button className="show-more" onClick={() => setExpanded(prev => ({...prev, [r.id]: !prev[r.id]}))}>
//                   {expanded[r.id] ? "Show less" : "Show more"}
//                 </button>
//               )}
//             </div>

//             {r.images?.length > 0 && (
//               <div className="review-images">
//                 {r.images.map((img, idx) => (
//                   <img key={idx} src={img} alt="rev-img" onClick={() => { setEvidenceFor([r]); setEvidenceOpen(true); }} />
//                 ))}
//               </div>
//             )}

//             <div className="review-footer">
//               <div>👍 Helpful ({r.helpful})</div>
//               <div className="tags">
//                 {r.text.toLowerCase().includes("size") && <span className="tag">fit</span>}
//                 {r.text.toLowerCase().includes("fabric") && <span className="tag">fabric</span>}
//                 {r.text.toLowerCase().includes("color") && <span className="tag">color</span>}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <ChatModal open={chatOpen} onClose={() => setChatOpen(false)} insights={insights} />
//       <EvidenceModal open={evidenceOpen} onClose={() => setEvidenceOpen(false)} reviews={evidenceFor} />
//     </div>
//   );
// }
