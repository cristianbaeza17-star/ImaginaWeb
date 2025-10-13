'use client';

import { Button } from '@/components/ui/button';
import { scenarios } from '@/lib/scenarios';
import { Shuffle } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Scenario = {
  title: string;
  description: string;
};

export function RandomScenarios() {
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);

  const generateNewScenario = () => {
    const randomIndex = Math.floor(Math.random() * scenarios.length);
    setCurrentScenario(scenarios[randomIndex]);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 text-center">
      <Button size="lg" onClick={generateNewScenario}>
        <Shuffle className="mr-2 h-5 w-5" />
        Generar Nuevo Escenario
      </Button>

      {currentScenario && (
        <Card className="w-full max-w-2xl animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary">
              {currentScenario.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">{currentScenario.description}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
