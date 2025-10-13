type PageHeaderProps = {
  title: string;
  description: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-8 space-y-2">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-foreground">
        {title}
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl">
        {description}
      </p>
    </div>
  );
}
