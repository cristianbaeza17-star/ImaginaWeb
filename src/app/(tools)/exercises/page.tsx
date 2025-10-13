import { PageHeader } from '@/components/common/PageHeader';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { exercises } from '@/lib/exercises';
import { Lightbulb } from 'lucide-react';

export default function ExercisesPage() {
  return (
    <div>
      <PageHeader
        title="Ejercicios Creativos"
        description="Una colección de técnicas y ejercicios probados para estirar tus músculos mentales, mejorar la resolución de problemas y generar ideas innovadoras."
      />
      <Accordion type="single" collapsible className="w-full">
        {exercises.map((exercise, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="text-left font-headline hover:no-underline text-lg">
              <div className="flex items-center gap-3">
                <Lightbulb className="w-5 h-5 text-primary" />
                {exercise.title}
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground pl-10">
              {exercise.description}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
