export const parseResumeData = <T>(data: T | string | null | undefined): T[] => {
  if (!data) return []

  try {
    if (typeof data === "string") {
      const parsed = JSON.parse(data) as unknown;
      return Array.isArray(parsed) ? parsed as T[] : [] as T[];
    }

    return Array.isArray(data) ? data as T[] : [] as T[];
  } catch (error) {
    console.error("Error parsing resume data:", error)
    return []
  }
}

