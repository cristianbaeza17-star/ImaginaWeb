import { PageHeader } from '@/components/common/PageHeader';
import { IdeaAssociator } from './IdeaAssociator';
import { Card, CardContent } from '@/components/ui/card';

export default function AssociatePage() {
  return (
    <div>
      <PageHeader
        title="Asociación de Ideas"
        description="El motor de la innovación es la capacidad de conectar lo aparentemente inconexo. Introduce dos conceptos y deja que la IA te ayude a encontrar un puente creativo entre ellos."
      />
      <Card>
        <CardContent className="pt-6">
          <IdeaAssociator />
        </CardContent>
      </Card>
    </div>
  );
}
