import Anthropic from "@anthropic-ai/sdk";
import type { DamageAssessment } from "@/types/assessment";
import { SYSTEM_PROMPT, buildUserMessage } from "./prompts";

const client = new Anthropic();

interface ProcessedImage {
  mediaType: "image/jpeg" | "image/png" | "image/gif" | "image/webp";
  base64Data: string;
}

function parseAssessmentJSON(text: string): DamageAssessment {
  let cleaned = text.trim();
  // Strip code fences if Claude wraps the response
  const fenceMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) {
    cleaned = fenceMatch[1].trim();
  }
  return JSON.parse(cleaned) as DamageAssessment;
}

export async function assessDamage(
  images: ProcessedImage[]
): Promise<DamageAssessment> {
  const response = await client.messages.create({
    model: "claude-sonnet-4-5-20241022",
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: buildUserMessage(images.length) },
          ...images.map((img) => ({
            type: "image" as const,
            source: {
              type: "base64" as const,
              media_type: img.mediaType,
              data: img.base64Data,
            },
          })),
        ],
      },
    ],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from Claude");
  }

  return parseAssessmentJSON(textBlock.text);
}
