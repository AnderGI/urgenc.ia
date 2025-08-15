import CommandHandler from "../../../../../shared/domain/command/CommandHandler";
import LabelSentimentFromReviewContentCommand from '../../../../../apps/backoffice/backend/subscribers/rabbitmq/review-sentiment-classifier/classify-review-content/LabelSentimentFromReviewContentCommand.js'
import Command from "../../../../../shared/domain/command/Command";
import ReviewContentSentimentClassifier from "./ReviewContentSentimentClassifier";

export default class LabelSentimentFromReviewContentCommandHandler implements CommandHandler<LabelSentimentFromReviewContentCommand>{
  constructor (private readonly classifier:ReviewContentSentimentClassifier){}
  subscribedTo(): Command {
    return LabelSentimentFromReviewContentCommand;
  }
  async handle(command: LabelSentimentFromReviewContentCommand): Promise<void> {
    this.classifier.run(command.productId, command.reviewContent)
  }
}