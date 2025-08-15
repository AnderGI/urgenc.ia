import ReviewSentiment from "./ReviewSentiment";
import ReviewSentimentClassifier from "./ReviewSentimentClassifier";

export default interface SentimentClassifier {
  classify(_:ReviewSentimentClassifier): Promise<ReviewSentiment>;
}