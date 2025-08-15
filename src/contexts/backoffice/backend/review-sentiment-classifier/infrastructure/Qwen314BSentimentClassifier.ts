import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Ollama } from "@langchain/ollama";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import * as z from "zod";
import SentimentClassifier from "../domain/SentimentClassifier";
import ReviewSentiment from "../domain/ReviewSentiment";
import ReviewSentimentEnum from "../domain/ReviewSentimentEnum";
import ReviewSentimentClassifier from "../domain/ReviewSentimentClassifier";

export default class Qwen314BSentimentClassifier implements SentimentClassifier {
  private readonly llm = new Ollama({
    baseUrl: "http://localhost:11434",
    model: "qwen3:14b",
  });
  
  private readonly classificationSchema = z.object({
    sentiment: z.enum(["positive", "neutral", "negative"]).describe("The predominant sentiment of a product review"),
  });
  
  private readonly parser = StructuredOutputParser.fromZodSchema(this.classificationSchema);
  
  
  async classify(_:ReviewSentimentClassifier): Promise<ReviewSentiment> {
    console.log('Qwen314BSentimentClassifier#classify')
    const prompt = ChatPromptTemplate.fromTemplate(`
      Extract the desired primary sentiment from the review below.

      Review:
      {input}

      {format_instructions}
    `);

    const chain = prompt.pipe(this.llm).pipe(this.parser);

    const res = await chain.invoke({
        input: _.content.value,
        format_instructions: this.parser.getFormatInstructions(),
    });
    console.log(res)
    const reviewSentimentEnum = res.sentiment as ReviewSentimentEnum;
    const reviewSentiment = new ReviewSentiment(reviewSentimentEnum)
    return reviewSentiment;
  }
}