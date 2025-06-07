import type React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, BriefcaseIcon, MapPinIcon } from "lucide-react"
import type { Prisma } from "@prisma/client"

interface ExperienceItem {
  title?: string
  position?: string
  company?: string
  organization?: string
  startDate?: string
  endDate?: string
  location?: string
  description?: string
}

interface ExperienceCardProps {
  experience: ExperienceItem[] | Prisma.JsonValue | null
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  // Safe function to convert JsonValue to ExperienceItem[]
  const parseExperience = (): ExperienceItem[] => {
    try {
      // If it's already an array, cast safely
      if (Array.isArray(experience)) {
        return experience as ExperienceItem[];
      }

      // If it's a string, try to parse as JSON
      if (typeof experience === 'string') {
        const parsed = JSON.parse(experience);
        return Array.isArray(parsed) ? parsed as ExperienceItem[] : [];
      }

      // For null or invalid formats
      return [];
    } catch (error) {
      console.error("Error parsing experience data:", error);
      return [];
    }
  };

  const experienceItems = parseExperience();

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center">
          <BriefcaseIcon className="h-5 w-5 mr-2 text-blue-600" />
          <CardTitle>Experience</CardTitle>
        </div>
        <CardDescription>Professional work history</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4">
        {experienceItems.length > 0 ? (
          <div className="space-y-4">
            {experienceItems.map((exp, index) => (
              <div key={index} className="border-l-2 border-blue-600 pl-4 py-1">
                <h4 className="font-semibold">{exp.title || exp.position || "Position"}</h4>
                <p className="text-sm">{exp.company || exp.organization || "Company"}</p>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <CalendarIcon className="h-3 w-3 mr-1" />
                  <span>
                    {exp.startDate || "Start"} - {exp.endDate || "Present"}
                  </span>
                  {exp.location && (
                    <>
                      <MapPinIcon className="h-3 w-3 ml-2 mr-1" />
                      <span>{exp.location}</span>
                    </>
                  )}
                </div>
                {exp.description && <p className="text-sm mt-2">{exp.description}</p>}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <BriefcaseIcon className="h-10 w-10 text-muted-foreground/40" />
            <p className="mt-2 text-muted-foreground">No experience information available</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

ExperienceCard.displayName = "ExperienceCard"
