import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config();

const HUGGINGFACE_API_URL = 'https://api-inference.huggingface.co/models';
const MODEL_NAME = 'gpt2'; // You can change this to any other model you prefer

export const generateGeminiAPICall = async (req, res) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  //const { prompt } = req.body;
  //const { preferences } = req.body;

  const preferences = {
    "type": "dinner",
    "cuisine": "Italian",
    "diet": "vegetarian",
    "ingredients": ["pasta", "tomatoes", "basil", "mozzarella"]
  };
  //if (!preferences) {
  //    return res.status(400).json({ error: 'Preferences are required in the request body.' });
  //}

  const prompt = `
    Generate a detailed recipe for a meal based on these preferences:
    ${JSON.stringify(preferences)}.

    Include:
    - Recipe name
    - List of ingredients with quantities
    - Step-by-step method
    - Approximate total duration of meal preparation
    - Any other helpful notes

    If there is a type of food mentioned, make sure you make a suggestion based on that,
    otherwise you can pick anything.

    Return the recipe in JSON format.
  `;

/*   const image = {
    inlineData: {
      data: Buffer.from(fs.readFileSync("cookie.png")).toString("base64"),
      mimeType: "image/png",
    },
  }; */

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const decodedResponse = JSON.parse(response.text());
    console.log(decodedResponse);
    res.status(200).json({
      generatedText: decodedResponse,
    });
  } catch (error) {
    console.error('Error generating text:', error);
    res.status(500).json({ error: 'Failed to generate text with Gemini' });
  }
};

export const generateText = async (req, res) => {
  const { prompt } = req.body;

  try {
    debugger;
    const response = await axios.post(
      `${HUGGINGFACE_API_URL}/${MODEL_NAME}`,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
      }
    );

    res.status(200).json({
      generatedText: response.data[0].generated_text,
    });
  } catch (error) {
    console.error('Error generating text:', error);
    res.status(500).json({ error: 'Failed to generate text' });
  }
};
