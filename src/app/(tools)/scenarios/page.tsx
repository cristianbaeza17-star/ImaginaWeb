import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { RandomScenarios } from './RandomScenarios';

export default function ScenariosPage() {
  return (
    <div>
      <PageHeader
        title="Escenarios Aleatorios"
        description="Prepárate para lo inesperado. Genera un escenario al azar y desafía tu capacidad para pensar sobre la marcha, adaptarte y encontrar soluciones creativas a problemas absurdos."
      />
      <Card>
        <CardContent className="pt-6">
          <RandomScenarios />
        </CardContent>
      </Card>
    </div>
  );
}
