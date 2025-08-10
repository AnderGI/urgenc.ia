import z from "zod";




const configureProductReviewsConfigSchema = z.object({
      id: z.uuid(),
      negativeThreshold: z.number().nonnegative().lte(1).gte(0),
      timeWindowStart: z.iso.date()
    });


console.log(configureProductReviewsConfigSchema.safeParse({
   "negativeThreshold": 0.3,
   "timeWindowStart": '2025-05-24',
   "id": 'a47494eb-7baa-4895-a4e4-27ed96921f23'
}))



query: INSERT INTO "product_reviews_config"
("id", "totalReviews", "negativeReviews", "negativeReviewsThreshold", "negativeReviewsRoundedPercentage", "timeWindowStart") 
VALUES ($1, $2, $3, $4, $5, $6) -- PARAMETERS: ["a47494eb-7baa-4895-a4e4-27ed96921f23",0,0,0,0,"2025-08-07T16:57:50.063Z"]


UPDATE "product_reviews_config" SET "negativeReviewsThreshold" = $1, "timeWindowStart" = $2 WHERE (("id" = $3)) 
-- PARAMETERS: [0.3,"2025-05-23T22:00:00.000Z","a47494eb-7baa-4895-a4e4-27ed96921f23"]
