import type React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { LightbulbIcon } from "lucide-react"
import type { Prisma } from "@prisma/client"

interface SkillItem {
  name?: string
}

interface SkillsCardProps {
  skills: (SkillItem | string)[] | Prisma.JsonValue | null
}

export const SkillsCard: React.FC<SkillsCardProps> = ({ skills }) => {
  // Safe function to convert JsonValue to (SkillItem | string)[]
  const parseSkills = (): (SkillItem | string)[] => {
    try {
      // If it's already an array, cast safely
      if (Array.isArray(skills)) {
        return skills as (SkillItem | string)[];
      }

      // If it's a string, try to parse as JSON
      if (typeof skills === 'string') {
        const parsed = JSON.parse(skills);
        return Array.isArray(parsed) ? parsed as (SkillItem | string)[] : [];
      }

      // For null or invalid formats
      return [];
    } catch (error) {
      console.error("Error parsing skills data:", error);
      return [];
    }
  };

  const skillItems = parseSkills();

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center">
          <LightbulbIcon className="h-5 w-5 mr-2 text-blue-600" />
          <CardTitle>Skills</CardTitle>
        </div>
        <CardDescription>Technical and professional competencies</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4">
        {skillItems.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skillItems.map((skill, index) => (
              <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                {typeof skill === "string" ? skill : skill.name || "Skill"}
              </Badge>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <LightbulbIcon className="h-10 w-10 text-muted-foreground/40" />
            <p className="mt-2 text-muted-foreground">No skills information available</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

SkillsCard.displayName = "SkillsCard"
