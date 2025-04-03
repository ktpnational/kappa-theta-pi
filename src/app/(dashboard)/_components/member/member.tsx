"use client"

import type { Chapter, Member, Profile, Resume } from "@prisma/client"
import React from "react"
import { EducationCard, ExperienceCard, ProfileCard, SkillsCard } from ".."
import { parseResumeData } from "../../_utils"


interface MemberProps extends Member {
  profile: Profile
  chapter: Chapter
  resume: Resume
}

const DashboardMember: React.FC<MemberProps> = React.memo(
  ({ id, profileId, chapterId, resumeId, createdAt, updatedAt, profile, chapter, resume }) => {
    const education = parseResumeData(resume?.education)
    const experience = parseResumeData(resume?.experience)
    const skills = parseResumeData(resume?.skills)

    return (
      <div className="space-y-6">
        <ProfileCard
          member={{ id, profileId, resumeId, chapterId, createdAt, updatedAt, profile, chapter }}
        />

        {resume && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EducationCard education={education} />
            <ExperienceCard experience={experience} />
          </div>
        )}

        {resume && <SkillsCard skills={skills} />}
      </div>
    )
  },
)

DashboardMember.displayName = "DashboardMember"
export default DashboardMember

