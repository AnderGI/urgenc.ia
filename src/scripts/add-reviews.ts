import { v4 } from "uuid"

const requestDataObjets = [
  {
    "idProduct": "2e7c531d-90c5-46a9-8b98-b08c147753d7",
    "createdAt": "2025-06-17",
    "reviewContent": "Very stiff and gave me blisters on both feet."
  },
  {
    "idProduct": "2e7c531d-90c5-46a9-8b98-b08c147753d7",
    "createdAt": "2025-06-18",
    "reviewContent": "Cheap material, definitely not worth the price."
  },
  {
    "idProduct": "2e7c531d-90c5-46a9-8b98-b08c147753d7",
    "createdAt": "2025-06-21",
    "reviewContent": "Stylish and lightweight, perfect for everyday use."
  }
]

Promise.all(requestDataObjets.map(obj => {
  const data = Buffer.from(JSON.stringify(obj))
  return fetch(`http://localhost:5000/app/productReviews/${v4()}`, {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: data
  })
}))
