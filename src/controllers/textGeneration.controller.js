import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const HUGGINGFACE_API_URL = 'https://api-inference.huggingface.co/models';
const MODEL_NAME = 'gpt2'; // You can change this to any other model you prefer

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
