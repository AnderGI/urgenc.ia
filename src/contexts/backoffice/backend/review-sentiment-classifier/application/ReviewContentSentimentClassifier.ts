import type EventBus from "../../../../../shared/domain/event/EventBus.js";
import NegativeProductReviewDetectedDomainEvent from "../domain/NegativeProductReviewDetectedDomainEvent.js";
import ReviewSentimentClassifier from "../domain/ReviewSentimentClassifier.js";
import type SentimentClassifier from "../domain/SentimentClassifier.js";

export default class ReviewContentSentimentClassifier {

  constructor(private readonly classifier:SentimentClassifier, private readonly eventBus:EventBus){}

  async run(productReviewId:string, productId: string, reviewContent:string): Promise<void> {
    const reviewSentimentClassifier = ReviewSentimentClassifier.fromPrimitives(productId, reviewContent)
    const reviewSentiment = await this.classifier.classify(reviewSentimentClassifier)
    if(reviewSentiment.isNegative()) {
      const negativeProductReviewDetected = new NegativeProductReviewDetectedDomainEvent(reviewSentimentClassifier.id.value, productReviewId)
      this.eventBus.publish(negativeProductReviewDetected)
    }
  }
}