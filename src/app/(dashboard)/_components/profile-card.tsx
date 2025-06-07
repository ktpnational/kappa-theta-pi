import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon } from "lucide-react"
import { ChapterBadge } from "./chapter-badge"
import type { Chapter, Profile, Member } from "@prisma/client"

interface ProfileCardProps {
  member: Member & {
    profile: Profile
    chapter: Chapter
  }
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ member }) => {
  const { id, profileId, createdAt, updatedAt, profile, chapter } = member

  return (
    <Card className="overflow-hidden border-none shadow-md">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
              <AvatarImage src={profile?.photoUrl || ""} alt={profile?.userId || "Member"} />
              <AvatarFallback className="bg-white text-blue-600 text-xl font-bold">
                {profile?.userId?.charAt(0) || "M"}
              </AvatarFallback>
            </Avatar>
            <div className="text-white">
              <h2 className="text-2xl font-bold">{profile?.role || "Member Name"}</h2>
              <p className="opacity-90">{profile?.userId || "Email not provided"}</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col md:items-end">
            <ChapterBadge chapter={chapter} />
            <div className="flex items-center mt-2 text-white text-sm opacity-90">
              <CalendarIcon className="h-4 w-4 mr-1" />
              <span>Joined {new Date(createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex flex-col">
            <span className="text-muted-foreground">Member ID</span>
            <span className="font-medium">{id}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Profile ID</span>
            <span className="font-medium">{profileId}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Last Updated</span>
            <span className="font-medium">{new Date(updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

ProfileCard.displayName = "ProfileCard"
export default ProfileCard