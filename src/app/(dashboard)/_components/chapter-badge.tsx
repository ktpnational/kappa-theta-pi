import type React from "react"
import { Badge } from "@/components/ui/badge"
import type { Chapter } from "@prisma/client"

interface ChapterBadgeProps {
  chapter: Chapter
}

export const ChapterBadge: React.FC<ChapterBadgeProps> = ({ chapter }) => {
  return <Badge className="bg-white text-blue-600 hover:bg-blue-50">{chapter.name ?? "No Chapter"}</Badge>
}
ChapterBadge.displayName = "ChapterBadge"
