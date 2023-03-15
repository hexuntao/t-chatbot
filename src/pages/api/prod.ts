// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextRequest } from "next/server";
import { OpenAIStream, OpenAIStreamEvent } from "@/lib/openAIStream";

if (!process.env.OPENAI_API_KEY) throw new Error("未找到 OPENAI_API_KEY");

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const { prompt, ...rest } = (await req.json()) as { prompt: string };

  const response = await fetch("https://tchat.hexuntao.com/api/gpt3", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.5,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 200,
      stream: true,
      n: 1,
      ...rest,
    }),
  });

  if (!response.ok) {
    throw new Error("访问出错了!");
  }

  // const data = response.body;
  return response;
}
