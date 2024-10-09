import { Hono } from 'hono';
import { cors } from 'hono/cors';
import Anthropic from '@anthropic-ai/sdk';

type Bindings = {
  CLAUDE_API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use('*', cors());

app.post('/api/get-clues', async (c) => {
  try {
    const { question } = await c.req.json();
    
    const anthropic = new Anthropic({
      apiKey: c.env.CLAUDE_API_KEY,
    });


    const prompt = `Give a visual clue to the student, so that they can work on solving the following problem. The clue should be visual, an SVG. There can be text as a part of the image. The clue should make the answer obvious, but please do not mention the answer.

    Provide three different clues. Make the clues progressively reveal more of the solution. For the last clue, also add the mathematical concept that can be used to solve the problem. Name the concept with an example formula and example use case.

Problem:
${question}

Please provide the three SVG clues as separate artifacts.

Rules:
- Output in JSON format with keys: "text_msg" (any textual hint/msg you want to give the student), “clues” (list of svg)`

    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 8192,
      messages: [{ role: "user", content: prompt }],
    });

    // Parse the response as JSON
    const responseContent = JSON.parse(msg.content[0].text);

    // Extract the array of SVG clues
    const clues = responseContent.clues;

    return c.json({ clues });
  } catch (error) {
    console.error('Error calling Claude API:', error);
    return c.json({ error: 'An error occurred while fetching clues' }, 500);
  }
});

export default app;