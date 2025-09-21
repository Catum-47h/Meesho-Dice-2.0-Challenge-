// // mockData.js
// // Prototype mock insights + reviews for a product
// const mockData = (productId = 101) => {
//   const insights = {
//     productId: Number(productId),
//     generatedAt: new Date().toISOString(),
//     overall: { avg_rating: 4.1, sentiment: "Mostly positive" },
//     aspects: {
//       fabric: { sentiment: "positive", score: 4.3, note: "Soft & durable", evidence_count: 112 },
//       fit: { sentiment: "mixed", score: 3.4, note: "Runs slightly small — consider size up", evidence_count: 80 },
//       color: { sentiment: "positive", score: 4.0, note: "Mostly matches product photos", evidence_count: 65 },
//       delivery: { sentiment: "neutral", score: 3.2, note: "Occasional delay issues", evidence_count: 20 }
//     },
//     top_pros: ["Good fabric", "Value for money", "Nice finish"],
//     top_cons: ["Sizing issues", "Occasional delivery delay"],
//     summary_text: "Most customers like the fabric and finish. Fit is mixed — many recommend one size up. Delivery complaints are infrequent.",
//     representative_reviews: [
//       { id: 431, rating: 5, text: "Fabric is soft and color looks same", image: "https://images.meesho.com/images/ratings_reviews/5974406115/6005940295/5974406115_6005940295_cd9437b25136c.avif?width=512" },
//       { id: 612, rating: 2, text: "Ordered S but it was too tight", image: "https://images.meesho.com/images/ratings_reviews/6100112847/6132255686/6100112847_6132255686_17d841faf1334.avif?width=512" }
//     ],
//     recommendations: { buy: true, advice: "If you prefer a looser fit, order one size up." }
//   };

//   const shortTexts = [
//     "Colour quality & size bahut hi Achcha hai 🥰🥰🥰",
//     "Superb. Very good cloth material. Fitting is also excellent.",
//     "Very nice 👍 very good product and very Good fabric",
//     "Nice fabric, stitching is good.",
//     "Good value for money.",
//     "Arrived late but product is good.",
//     "Ordered M but it was tight. Size up recommended.",
//     "Color slightly different than picture.",
//     "Fabric feels soft and comfortable.",
//     "Stitching came undone after 2 washes.",
//     "Perfect fit and finish.",
//     "Too thin for winter wear."
//   ];

//   // Array of multiple images for reviews
//   const reviewImages = [
//     "https://images.meesho.com/images/ratings_reviews/5974406115/6005940295/5974406115_6005940295_cd9437b25136c.avif?width=512",
//     "https://images.meesho.com/images/ratings_reviews/6081764771/6113823403/6081764771_6113823403_c58f77618d655.avif?width=512",
//     "https://images.meesho.com/images/ratings_reviews/5692192116/5722332972/5692192116_5722332972_d3a7ab0b445e2.avif?width=512",
//     "https://images.meesho.com/images/ratings_reviews/6098765432/6112345678/6098765432_6112345678_abcd1234.avif?width=512",
//     "https://images.meesho.com/images/ratings_reviews/6111111111/6112222222/6111111111_6112222222_efgh5678.avif?width=512",
//     "https://images.meesho.com/images/ratings_reviews/6123334444/6124445555/6123334444_6124445555_ijkl9012.avif?width=512"
//   ];

//   // Define pattern of images per review
//   const pattern = [3, 2, 4, 3, 2, 3, 2, 4, 3, 2, 3, 2]; // matches number of reviews

//   const reviews = Array.from({ length: 12 }).map((_, idx) => {
//     const id = 400 + idx;
//     const rating = [5,4,5,4,4,3,2,3,5,2,5,3][idx % 12];
    
//     // Pick number of images according to pattern
//     const imagesCount = pattern[idx % pattern.length];
//     const images = [];
//     for (let j = 0; j < imagesCount; j++) {
//       // Loop through reviewImages array if needed
//       images.push(reviewImages[(idx + j) % reviewImages.length]);
//     }

//     return {
//       id,
//       name: ["Payel Laskar","Punitha","Meesho User","Sonia","Amit","Ravi"][idx % 6],
//       rating,
//       date: ["24 Jul 2025","4 Aug 2025","8 May 2025","17 Jun 2025","2 Jul 2025"][idx % 5],
//       text: shortTexts[idx],
//       images,
//       helpful: Math.floor(Math.random() * 400) + 20,
//       productId: Number(productId)
//     };
//   });

//   return { insights, reviews };
// };

// export default mockData;

// mockData.js
// Prototype mock insights + reviews for a product

const mockData = (productId = 101) => {
  const insights = {
    productId: Number(productId),
    generatedAt: new Date().toISOString(),
    overall: { avg_rating: 4.1, sentiment: "Mostly positive" },
    aspects: {
      fabric: { sentiment: "positive", score: 4.3, note: "Soft & durable", evidence_count: 112 },
      fit: { sentiment: "mixed", score: 3.4, note: "Runs slightly small — consider size up", evidence_count: 80 },
      color: { sentiment: "positive", score: 4.0, note: "Mostly matches product photos", evidence_count: 65 },
      delivery: { sentiment: "neutral", score: 3.2, note: "Occasional delay issues", evidence_count: 20 }
    },
    top_pros: ["Good fabric", "Value for money", "Nice finish"],
    top_cons: ["Sizing issues", "Occasional delivery delay"],
    summary_text: "Most customers like the fabric and finish. Fit is mixed — many recommend one size up. Delivery complaints are infrequent.",
    representative_reviews: [
      { id: 431, rating: 5, text: "Fabric is soft and color looks same", image: "https://images.meesho.com/images/ratings_reviews/5974406115/6005940295/5974406115_6005940295_cd9437b25136c.avif?width=512" },
      { id: 612, rating: 2, text: "Ordered S but it was too tight", image: "https://images.meesho.com/images/ratings_reviews/6100112847/6132255686/6100112847_6132255686_17d841faf1334.avif?width=512" }
    ],
    recommendations: { buy: true, advice: "If you prefer a looser fit, order one size up." }
  };

  const shortTexts = [
    "Colour quality & size bahut hi Achcha hai 🥰🥰🥰",
    "Superb. Very good cloth material. Fitting is also excellent.",
    "Very nice 👍 very good product and very Good fabric",
    "Nice fabric, stitching is good.",
    "Good value for money.",
    "Arrived late but product is good.",
    "Ordered M but it was tight. Size up recommended.",
    "Color slightly different than picture.",
    "Fabric feels soft and comfortable.",
    "Stitching came undone after 2 washes.",
    "Perfect fit and finish.",
    "Too thin for winter wear."
  ];

  const reviewImages = [
    "https://images.meesho.com/images/ratings_reviews/5974406115/6005940295/5974406115_6005940295_df5919d601a2a.avif?width=512",
    "https://images.meesho.com/images/ratings_reviews/6081764771/6113823403/6081764771_6113823403_2693a325e36c9.avif?width=512",
    "https://images.meesho.com/images/ratings_reviews/6081764771/6113823403/6081764771_6113823403_c58f77618d655.avif?width=512",
    "https://images.meesho.com/images/ratings_reviews/1/1249854043/1_1249854043_eef7de7c8610d.avif?width=512",
    "https://images.meesho.com/images/ratings_reviews/5877596619/5908656366/5877596619_5908656366_bd0e1eef0eca4.avif?width=512",
    "https://images.meesho.com/images/ratings_reviews/6100112847/6132255686/6100112847_6132255686_230abf458febe.avif?width=512",
    "https://images-r.meesho.com/images/ratings_reviews/6113490757/6145701745/6113490757_6145701745_71d8b2f2eb91c_512.avif",
    "https://images-r.meesho.com/images/ratings_reviews/6113490757/6145701745/6113490757_6145701745_062a2871118aa_512.avif"
  ];

  const imagesPerReview = [3, 2, 4, 3, 2, 4, 3, 2, 4, 3, 2, 4];

  const reviews = Array.from({ length: 12 }).map((_, idx) => {
    const id = 400 + idx;
    const rating = [5,4,5,4,4,3,2,3,5,2,5,3][idx % 12];
    const imgCount = imagesPerReview[idx % imagesPerReview.length];
    // Randomize images
    const images = reviewImages.sort(() => 0.5 - Math.random()).slice(0, imgCount);

    return {
      id,
      name: ["Payel Laskar","Punitha","Meesho User","Sonia","Amit","Ravi"][idx % 6],
      rating,
      date: ["24 Jul 2025","4 Aug 2025","8 May 2025","17 Jun 2025","2 Jul 2025"][idx % 5],
      text: shortTexts[idx],
      images,
      helpful: Math.floor(Math.random() * 400) + 20,
      productId: Number(productId)
    };
  });

  return { insights, reviews };
};

export default mockData;
