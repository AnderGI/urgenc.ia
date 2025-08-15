import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Ollama } from "@langchain/ollama";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import * as z from "zod";

const llm = new Ollama({
  baseUrl: "http://localhost:11434",
  model: "qwen3:14b",
});

const classificationSchema = z.object({
  sentiment: z.enum(["positive", "neutral", "negative"]),
});

const parser = StructuredOutputParser.fromZodSchema(classificationSchema);

const prompt = ChatPromptTemplate.fromTemplate(`
Extract the desired information from the review below.

Review:
{input}

{format_instructions}
`);

const chain = prompt.pipe(llm).pipe(parser);

const res = await chain.invoke({
  input: "Es una genial introducción...",
  format_instructions: parser.getFormatInstructions(),
});

console.log(res);
