// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextRequest } from "next/server";
import { OpenAIStream, OpenAIStreamEvent } from "@/lib/openAIStream";

if (!process.env.OPENAI_API_KEY) throw new Error("未找到 OPENAI_API_KEY");

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const { prompt, ...rest } = (await req.json()) as { prompt: string };
  const payload: OpenAIStreamEvent = {
    model: "text-davinci-003",
    prompt,
    temperature: 0.5,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 200,
    stream: true,
    n: 1,
    ...rest,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
}
