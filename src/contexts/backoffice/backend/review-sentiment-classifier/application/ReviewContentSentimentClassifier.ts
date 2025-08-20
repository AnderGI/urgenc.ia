import type EventBus from "../../../../../shared/domain/event/EventBus.js";
import NegativeProductReviewDetectedDomainEvent from "../domain/NegativeProductReviewDetectedDomainEvent.js";
import ReviewSentimentClassifier from "../domain/ReviewSentimentClassifier.js";
import type SentimentClassifier from "../domain/SentimentClassifier.js";

export default class ReviewContentSentimentClassifier {

  constructor(private readonly classifier:SentimentClassifier, private readonly eventBus:EventBus){}

  async run(productId: string, reviewContent:string): Promise<void> {
    console.log('ReviewContentSentimentClassifier#run')
    const reviewSentimentClassifier = ReviewSentimentClassifier.fromPrimitives(productId, reviewContent)
    const reviewSentiment = await this.classifier.classify(reviewSentimentClassifier)
    console.log(reviewContent + " ||| " + reviewSentiment.value)
    if(reviewSentiment.isNegative()) {
      console.log('Negative REVIEW need to publis event')
      console.log(reviewSentiment.value)
      const negativeProductReviewDetected = new NegativeProductReviewDetectedDomainEvent(reviewSentimentClassifier.id.value)
      this.eventBus.publish(negativeProductReviewDetected)
    }
  }
}