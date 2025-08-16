import EventBus from "../../../../../shared/domain/event/EventBus";
import NegativeProductReviewDetectedDomainEvent from "../domain/NegativeProductReviewDetectedDomainEvent";
import ReviewSentimentClassifier from "../domain/ReviewSentimentClassifier";
import SentimentClassifier from "../domain/SentimentClassifier";

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