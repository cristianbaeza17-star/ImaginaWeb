'use client';

import { associateUnrelatedConcepts } from '@/ai/flows/associate-unrelated-concepts';
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
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, BrainCircuit } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  concept1: z.string().min(2, 'Debe tener al menos 2 caracteres.'),
  concept2: z.string().min(2, 'Debe tener al menos 2 caracteres.'),
});

type FormValues = z.infer<typeof formSchema>;
type AssociationResult = {
  association: string;
  isTrite: boolean;
};

export function IdeaAssociator() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<AssociationResult | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      concept1: '',
      concept2: '',
    },
  });

  const onSubmit = (values: FormValues) => {
    setResult(null);
    startTransition(async () => {
      const response = await associateUnrelatedConcepts(values);
      if (response && 'association' in response) {
        setResult(response);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description:
            'No se pudo generar la asociación. Inténtalo de nuevo.',
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="concept1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Concepto 1</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Un Gato" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="concept2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Concepto 2</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: La Luna" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Asociando...
              </>
            ) : (
              <>
                <BrainCircuit className="mr-2 h-4 w-4" />
                Encontrar Conexión
              </>
            )}
          </Button>
        </form>
      </Form>
      {(isPending || result) && (
        <Card className="bg-primary/10">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-primary" />
              Conexión Creativa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isPending && !result && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Buscando puentes entre ideas...</span>
              </div>
            )}
            {result && (
              <div className="space-y-2">
                <Badge
                  variant={result.isTrite ? 'secondary' : 'default'}
                  className={!result.isTrite ? 'bg-green-600 hover:bg-green-700' : ''}
                >
                  {result.isTrite ? 'Común' : 'Creativa'}
                </Badge>
                <p className="text-lg font-medium">{result.association}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
