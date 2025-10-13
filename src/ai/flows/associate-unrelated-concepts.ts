'use server';

/**
 * @fileOverview A flow for associating unrelated concepts using an LLM.
 *
 * - associateUnrelatedConcepts - A function that handles the association of unrelated concepts.
 * - AssociateUnrelatedConceptsInput - The input type for the associateUnrelatedConcepts function.
 * - AssociateUnrelatedConceptsOutput - The return type for the associateUnrelatedConcepts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AssociateUnrelatedConceptsInputSchema = z.object({
  concept1: z.string().describe('The first concept.'),
  concept2: z.string().describe('The second concept.'),
});
export type AssociateUnrelatedConceptsInput = z.infer<
  typeof AssociateUnrelatedConceptsInputSchema
>;

const AssociateUnrelatedConceptsOutputSchema = z.object({
  association: z
    .string()
    .describe(
      'A creative and meaningful association between the two concepts, or an explanation of why a meaningful association is not possible.'
    ),
  isTrite: z.boolean().describe('Whether the association is trite or not.'),
});
export type AssociateUnrelatedConceptsOutput = z.infer<
  typeof AssociateUnrelatedConceptsOutputSchema
>;

export async function associateUnrelatedConcepts(
  input: AssociateUnrelatedConceptsInput
): Promise<AssociateUnrelatedConceptsOutput> {
  return associateUnrelatedConceptsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'associateUnrelatedConceptsPrompt',
  input: {schema: AssociateUnrelatedConceptsInputSchema},
  output: {schema: AssociateUnrelatedConceptsOutputSchema},
  prompt: `You are a creativity assistant helping a user to associate two unrelated concepts.

  The first concept is: {{{concept1}}}
  The second concept is: {{{concept2}}}

  Come up with a creative and meaningful association between the two concepts.
  If you cannot find a meaningful association, explain why not.

  Also determine if the association is trite or not, and set the isTrite field appropriately.
  isTrite should be true if the association is obvious, uninspired, or a cliché.
  isTrite should be false if the association is novel, insightful, and demonstrates creative thinking.

  Respond in a structured format as described in the output schema.`,
});

const associateUnrelatedConceptsFlow = ai.defineFlow(
  {
    name: 'associateUnrelatedConceptsFlow',
    inputSchema: AssociateUnrelatedConceptsInputSchema,
    outputSchema: AssociateUnrelatedConceptsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
