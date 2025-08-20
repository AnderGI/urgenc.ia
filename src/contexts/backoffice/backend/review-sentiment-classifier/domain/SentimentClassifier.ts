import ReviewSentiment from "./ReviewSentiment.js";
import ReviewSentimentClassifier from "./ReviewSentimentClassifier.js";

export default interface SentimentClassifier {
  classify(_:ReviewSentimentClassifier): Promise<ReviewSentiment>;
}