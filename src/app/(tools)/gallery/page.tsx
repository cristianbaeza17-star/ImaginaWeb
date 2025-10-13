import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

export default function GalleryPage() {
  return (
    <div>
      <PageHeader
        title="Galería Comunitaria"
        description="Explora las creaciones de otros miembros de la comunidad. Inspírate en sus ideas y comparte las tuyas."
      />

      <div className="columns-1 gap-4 sm:columns-2 xl:columns-3">
        {PlaceHolderImages.map((item) => (
          <Card key={item.id} className="mb-4 break-inside-avoid overflow-hidden group transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg">
            <CardHeader>
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.description}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={item.imageHint}
                />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="font-headline text-lg">{item.title}</CardTitle>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">Por: {item.author}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
