interface LifeExampleCardProps {
  title: string
  description: string
  example: string
  itNote: string
}

export function LifeExampleCard({ title, description, example, itNote }: LifeExampleCardProps) {
  return (
    <div className="bg-secondary/50 rounded-xl p-6 h-full flex flex-col">
      <h5 className="font-serif text-lg text-foreground mb-2">{title}</h5>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="flex-1">
        <p className="text-sm text-foreground leading-relaxed">{example}</p>
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <span className="text-xs font-medium text-accent uppercase tracking-wide">IT:</span>
        <p className="text-xs text-muted-foreground mt-1">{itNote}</p>
      </div>
    </div>
  )
}
