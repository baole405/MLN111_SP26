import { Code2 } from "lucide-react"
import type { ReactNode } from "react"

interface ItCornerBoxProps {
  children: ReactNode
}

export function ItCornerBox({ children }: ItCornerBoxProps) {
  return (
    <div className="bg-foreground/5 border border-accent/20 rounded-lg p-4 mt-6">
      <div className="flex items-center gap-2 mb-2">
        <Code2 className="w-4 h-4 text-accent" />
        <span className="font-sans text-xs font-medium text-accent uppercase tracking-wide">
          Góc nhìn Lập trình viên
        </span>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
    </div>
  )
}
