import type React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, BookOpenIcon, MapPinIcon, GraduationCapIcon } from "lucide-react"
import type { Prisma } from "@prisma/client"

interface EducationItem {
  institution?: string
  school?: string
  degree?: string
  qualification?: string
  startDate?: string
  endDate?: string
  location?: string
  description?: string
}

interface EducationCardProps {
  education: EducationItem[] | Prisma.JsonValue | null
}

export const EducationCard: React.FC<EducationCardProps> = ({ education }) => {
  // Safe function to convert JsonValue to EducationItem[]
  const parseEducation = (): EducationItem[] => {
    try {
      // If it's already an array, cast safely
      if (Array.isArray(education)) {
        return education as EducationItem[];
      }

      // If it's a string, try to parse as JSON
      if (typeof education === 'string') {
        const parsed = JSON.parse(education);
        return Array.isArray(parsed) ? parsed as EducationItem[] : [];
      }

      // For null or invalid formats
      return [];
    } catch (error) {
      console.error("Error parsing education data:", error);
      return [];
    }
  };

  const educationItems = parseEducation();

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center">
          <GraduationCapIcon className="h-5 w-5 mr-2 text-blue-600" />
          <CardTitle>Education</CardTitle>
        </div>
        <CardDescription>Academic background and qualifications</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4">
        {educationItems.length > 0 ? (
          <div className="space-y-4">
            {educationItems.map((edu, index) => (
              <div key={index} className="border-l-2 border-blue-600 pl-4 py-1">
                <h4 className="font-semibold">{edu.institution || edu.school || "Institution"}</h4>
                <p className="text-sm">{edu.degree || edu.qualification || "Degree"}</p>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <CalendarIcon className="h-3 w-3 mr-1" />
                  <span>
                    {edu.startDate || "Start"} - {edu.endDate || "Present"}
                  </span>
                  {edu.location && (
                    <>
                      <MapPinIcon className="h-3 w-3 ml-2 mr-1" />
                      <span>{edu.location}</span>
                    </>
                  )}
                </div>
                {edu.description && <p className="text-sm mt-2">{edu.description}</p>}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <BookOpenIcon className="h-10 w-10 text-muted-foreground/40" />
            <p className="mt-2 text-muted-foreground">No education information available</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
EducationCard.displayName = "EducationCard"
