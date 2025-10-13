'use client';

import { generateCreativePrompt } from '@/ai/flows/generate-creative-prompts';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Sparkles } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  topic: z
    .string()
    .min(2, 'El tema debe tener al menos 2 caracteres.')
    .max(50, 'El tema no puede tener más de 50 caracteres.'),
});

type FormValues = z.infer<typeof formSchema>;

export function PromptGenerator() {
  const [isPending, startTransition] = useTransition();
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
    },
  });

  const onSubmit = (values: FormValues) => {
    setGeneratedPrompt(null);
    startTransition(async () => {
      const result = await generateCreativePrompt(values);
      if (result && 'prompt' in result) {
        setGeneratedPrompt(result.prompt);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description:
            'No se pudo generar el prompt. Por favor, inténtalo de nuevo.',
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tema o Idea Central</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: un bosque futurista" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generando...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generar Prompt
              </>
            )}
          </Button>
        </form>
      </Form>
      {(isPending || generatedPrompt) && (
        <Card className="bg-primary/10">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Tu Prompt Creativo
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isPending && !generatedPrompt && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>La inspiración está en camino...</span>
              </div>
            )}
            {generatedPrompt && (
              <p className="text-lg font-medium">{generatedPrompt}</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
