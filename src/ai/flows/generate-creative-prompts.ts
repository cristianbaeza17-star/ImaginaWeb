'use server';

/**
 * @fileOverview A flow that generates creative prompts using AI.
 *
 * - generateCreativePrompt - A function that generates a creative prompt.
 * - GenerateCreativePromptInput - The input type for the generateCreativePrompt function.
 * - GenerateCreativePromptOutput - The return type for the generateCreativePrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCreativePromptInputSchema = z.object({
  topic: z.string().describe('The topic or theme for the creative prompt.'),
});

export type GenerateCreativePromptInput = z.infer<typeof GenerateCreativePromptInputSchema>;

const GenerateCreativePromptOutputSchema = z.object({
  prompt: z.string().describe('A creative prompt to spark new ideas.'),
});

export type GenerateCreativePromptOutput = z.infer<typeof GenerateCreativePromptOutputSchema>;

export async function generateCreativePrompt(input: GenerateCreativePromptInput): Promise<GenerateCreativePromptOutput> {
  return generateCreativePromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCreativePromptPrompt',
  input: {schema: GenerateCreativePromptInputSchema},
  output: {schema: GenerateCreativePromptOutputSchema},
  prompt: `You are a creative prompt generator. Your goal is to provide unique and inspiring prompts based on a given topic.

  Topic: {{{topic}}}

  Creative Prompt:`,
});

const generateCreativePromptFlow = ai.defineFlow(
  {
    name: 'generateCreativePromptFlow',
    inputSchema: GenerateCreativePromptInputSchema,
    outputSchema: GenerateCreativePromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
