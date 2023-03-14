import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.organization,
});
const openai = new OpenAIApi(configuration);

export default async function (req: any, res: any) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API密钥未配置",
      },
    });
    return;
  }

  const params = req.body.params || {};
  if (!params.prompt || params.prompt.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "请输入内容",
      },
    });
    return;
  }

  try {
    const completion = await openai.createCompletion(params);
    console.log("completion", completion);
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error: any) {
    console.log("error.message", error.message);
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.log("error.response", error.response);
      // console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({
        error: {
          message: "请求过程出错",
        },
      });
    }
  }
}

function generatePrompt(animal: string) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `Suggest three names for an animal that is a superhero.
Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${capitalizedAnimal}
Names:`;
}
