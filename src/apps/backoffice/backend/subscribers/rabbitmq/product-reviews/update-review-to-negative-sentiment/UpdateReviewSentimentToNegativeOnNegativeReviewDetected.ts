import type ToNegativeUpdateReviewSentimentUpdater from "../../../../../../../contexts/backoffice/backend/product-reviews/application/update-to-negative-review/ToNegativeUpdateReviewSentimentUpdater.js";
import NegativeProductReviewDetectedDomainEvent from "../../../../../../../contexts/backoffice/backend/review-sentiment-classifier/domain/NegativeProductReviewDetectedDomainEvent.js";
import type DomainEventClass from "../../../../../../../shared/domain/event/DomainEventClass.js";
import type DomainEventSubscriber from "../../../../../../../shared/domain/event/DomainEventSubscriber.js";

export default class UpdateReviewSentimentToNegativeOnNegativeReviewDetected implements DomainEventSubscriber<NegativeProductReviewDetectedDomainEvent> {
  constructor (private readonly updater:ToNegativeUpdateReviewSentimentUpdater){}
  async on(domainEvent: NegativeProductReviewDetectedDomainEvent): Promise<void> {
    this.updater.run(domainEvent);
  }
  subscribedTo(): DomainEventClass[] {
    return [NegativeProductReviewDetectedDomainEvent];
  }
  name(): string {
    return "andergi.backoffice.backend.event.update_review_sentiment_to_negative_review_detected";
  }
}