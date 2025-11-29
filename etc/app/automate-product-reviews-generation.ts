import { randomUUID } from "crypto";
import { v4 } from "uuid";

interface PutProductReviewsRequestType {
  id: string;
  idProduct: string;
  createdAt: string;
  reviewContent: string;
}

const requestBodies: PutProductReviewsRequestType[] = [
  // 🟥 Negativas
  {
    id: v4(),
    idProduct: "2e7c531d-90c5-46a9-8b98-b08c147753d7",
    createdAt: "2025-06-12",
    reviewContent: "The shoes started falling apart after just a week of use. Really poor quality."
  },
  {
    id: v4(),
    idProduct: "2e7c531d-90c5-46a9-8b98-b08c147753d7",
    createdAt: "2025-06-13",
    reviewContent: "Very uncomfortable, the sole is too hard and caused blisters on my feet."
  },
  // {
  //   id: "2e7c531d-90c5-46a9-8b98-b08c147753d7",
  //   idProduct: "2e7c531d-90c5-46a9-8b98-b08c147753d7",
  //   createdAt: "2025-06-14",
  //   reviewContent: "Completely different color than advertised, looks cheap and badly made."
  // },
  // {
  //   id: "2e7c531d-90c5-46a9-8b98-b08c147753d7",
  //   idProduct: "2e7c531d-90c5-46a9-8b98-b08c147753d7",
  //   createdAt: "2025-06-15",
  //   reviewContent: "After two weeks, the stitching came undone. Waste of money."
  // },
  // {
  //   id: "2e7c531d-90c5-46a9-8b98-b08c147753d7",
  //   idProduct: "2e7c531d-90c5-46a9-8b98-b08c147753d7",
  //   createdAt: "2025-06-16",
  //   reviewContent: "Customer service didn’t help at all when I reported the issue. Very disappointed."
  // },
  // {
  //   id: "2e7c531d-90c5-46a9-8b98-b08c147753d7",
  //   idProduct: "2e7c531d-90c5-46a9-8b98-b08c147753d7",
  //   createdAt: "2025-06-17",
  //   reviewContent: "They look nice but the size is completely off and they hurt to walk in."
  // },

  // 🟩 Positivas / Neutrales
  {
    id: v4(),
    idProduct: "2e7c531d-90c5-46a9-8b98-b08c147753d7",
    createdAt: "2025-06-18",
    reviewContent: "Pretty decent shoes for the price. Not the best, but comfortable enough for daily wear."
  },
  // {
  //   id: "2e7c531d-90c5-46a9-8b98-b08c147753d7",
  //   idProduct: "2e7c531d-90c5-46a9-8b98-b08c147753d7",
  //   createdAt: "2025-06-19",
  //   reviewContent: "Fit as expected and arrived on time. No issues so far."
  // },
  {
    id: v4(),
    idProduct: "2e7c531d-90c5-46a9-8b98-b08c147753d7",
    createdAt: "2025-06-20",
    reviewContent: "Love the design and color. They’re light and feel great when walking."
  },
  {
    id: v4(),
    idProduct: "2e7c531d-90c5-46a9-8b98-b08c147753d7",
    createdAt: "2025-06-21",
    reviewContent: "Good value for money, although the packaging could have been better."
  }
];

Promise.all(requestBodies.map(async requestBodie => {
  const url = `http://localhost:5000/app/productReviews/${requestBodie.id}`
  console.log(url)
  return fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idProduct: requestBodie.idProduct,
      createdAt: requestBodie.createdAt,
      reviewContent: requestBodie.reviewContent
    })
  })
}))
