import { OllamaEmbeddings } from "@langchain/ollama";
import type ProductReviewsEmbeddingGenerator from "../../../../domain/ProductReviewsEmbeddingGenerator.js";
import ProductReviewsContentEmbedding from "../../../../domain/ProductReviewsContentEmbedding.js";
import type ProductReviewsContent from "../../../../domain/ProductReviewsContent.js";

export default class NomicProductReviewsEmbeddingGenerator implements ProductReviewsEmbeddingGenerator {
  private readonly nomic: OllamaEmbeddings;
  private static readonly NOMIC_OLLAMA_MODEL = "nomic-embed-text:v1.5"; 

  constructor (){
    this.nomic = new OllamaEmbeddings({
        baseUrl: "http://ai:11434",
        model: NomicProductReviewsEmbeddingGenerator.NOMIC_OLLAMA_MODEL
    })
  }

  async generate(_: ProductReviewsContent): Promise<ProductReviewsContentEmbedding> {
    console.log("---------------------IMPORTANTEEEEEEEEEEEE----------------------")
    console.log("esta generandose el embeddig")
    const vector = await this.nomic.embedQuery(_.value)
    return new ProductReviewsContentEmbedding(vector)
  }
}