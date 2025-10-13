import { PageHeader } from '@/components/common/PageHeader';
import { PromptGenerator } from './PromptGenerator';
import { Card, CardContent } from '@/components/ui/card';

export default function PromptsPage() {
  return (
    <div>
      <PageHeader
        title="Generador de Prompts"
        description="¿Necesitas una chispa? Introduce un tema y deja que la IA te dé un punto de partida creativo. Ideal para historias, arte, o cualquier proyecto que necesite un empujón."
      />
      <Card>
        <CardContent className="pt-6">
          <PromptGenerator />
        </CardContent>
      </Card>
    </div>
  );
}
