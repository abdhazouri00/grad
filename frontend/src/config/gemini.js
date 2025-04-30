const apiKey = "sk-1147fbe34b194c92a4925980d1b32d5c";

// import {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   maxOutputTokens: 8192,
//   responseMimeType: "text/plain",
// };

// async function run(input) {
//   const chatSession = model.startChat({
//     generationConfig,
//     // safetySettings: Adjust safety settings
//     // See https://ai.google.dev/gemini-api/docs/safety-settings
//     history: [],
//   });

//   const result = await chatSession.sendMessage(input);
//   return result.response.text();
// }

import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: apiKey,
  dangerouslyAllowBrowser: true,
});

async function run(input) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: input }],
    model: "deepseek-chat",
    temperature: "1.5",
  });

  return completion.choices[0].message.content;
}

export default run;
