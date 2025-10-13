import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BrainCircuit, Lightbulb, Sparkles, Shuffle, Users } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "Generador de Prompts",
    description: "Despierta tu imaginación con prompts creativos generados por IA para superar el bloqueo del escritor.",
    href: "/prompts",
    icon: Sparkles,
  },
  {
    title: "Escenarios Aleatorios",
    description: "Enfréntate a situaciones inesperadas que desafían tu pensamiento y te obligan a encontrar soluciones únicas.",
    href: "/scenarios",
    icon: Shuffle,
  },
  {
    title: "Asociación de Ideas",
    description: "Conecta conceptos aparentemente inconexos y descubre innovadoras relaciones entre ellos.",
    href: "/associate",
    icon: BrainCircuit,
  },
  {
    title: "Ejercicios Creativos",
    description: "Mejora tus habilidades de resolución de problemas con una selección de ejercicios estructurados.",
    href: "/exercises",
    icon: Lightbulb,
  },
  {
    title: "Galería Comunitaria",
    description: "Inspírate y comparte tus creaciones con una comunidad de mentes creativas.",
    href: "/gallery",
    icon: Users,
  },
];

export default function HomePage() {
  return (
    <div className="container mx-auto">
      <section className="py-12 text-center md:py-20 lg:py-24">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline text-primary">
          Bienvenido a ImaginaWeb
        </h1>
        <p className="max-w-3xl mx-auto mt-4 text-lg text-muted-foreground md:text-xl">
          Tu gimnasio para la mente. Fomenta tu creatividad, expande tu pensamiento lateral y desata tu potencial innovador.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center gap-4">
              <feature.icon className="w-10 h-10 text-primary" />
              <div>
                <CardTitle className="font-headline">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
            <div className="p-6 pt-0">
               <Button asChild variant="link" className="p-0 text-primary">
                <Link href={feature.href}>
                  Empezar a crear <ArrowRight className="ml-2"/>
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
}
