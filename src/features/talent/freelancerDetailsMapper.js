export function getInitials(fullName = "") {
  const parts = String(fullName).trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function toTitleCase(value = "") {
  return String(value)
    .split(/[_\s-]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function mapSkills(skills = []) {
  return skills.map((skill) => {
    if (typeof skill === "string") {
      return { name: skill, level: "" };
    }
    return {
      name: skill.skillName || skill.name || "Skill",
      level: skill.proficiencyLevel || skill.level || "",
    };
  });
}

export function mapFreelancerDetails(freelancer = {}) {
  const locationParts = [
    freelancer.city,
    freelancer.stateProvince,
    freelancer.country,
  ].filter(Boolean);

  return {
    id: freelancer.id,
    fullName: freelancer.fullName || "Unknown Freelancer",
    initials: getInitials(freelancer.fullName),
    title: freelancer.title || "Freelancer",
    bio: freelancer.bio || "",
    avatarUrl: freelancer.profilePicturePath || "",
    isVerified: Boolean(freelancer.isVerified),
    isSaved: Boolean(freelancer.isSaved),
    trustScore: Number(freelancer.trustScore ?? 0),
    averageRating: Number(freelancer.averageRating ?? 0),
    totalReviews: Number(freelancer.totalReviews ?? 0),
    hourlyRate:
      freelancer.hourlyRate === null || freelancer.hourlyRate === undefined
        ? null
        : Number(freelancer.hourlyRate),
    availability: freelancer.availability || "Not specified",
    yearsOfExperience:
      freelancer.yearsOfExperience === null ||
      freelancer.yearsOfExperience === undefined
        ? null
        : Number(freelancer.yearsOfExperience),
    role: freelancer.role || "",
    email: freelancer.email || "",
    phoneNumber: freelancer.phoneNumber || "",
    address: freelancer.address || "",
    zipCode: freelancer.zipCode || "",
    timeZone: freelancer.timeZone || "",
    locationLabel: locationParts.join(", "),
    portfolioUrl: freelancer.portfolioUrl || "",
    skills: mapSkills(freelancer.skills || []),
    languages: Array.isArray(freelancer.languages) ? freelancer.languages : [],
    education: Array.isArray(freelancer.education) ? freelancer.education : [],
    experienceDetails: Array.isArray(freelancer.experienceDetails)
      ? freelancer.experienceDetails
      : [],
    employmentHistory: Array.isArray(freelancer.employmentHistory)
      ? freelancer.employmentHistory
      : [],
    createdAt: freelancer.createdAt || "",
    updatedAt: freelancer.updatedAt || "",
    formatLanguage(language) {
      if (typeof language === "string") return language;
      const name = language.name || language.languageName || "Language";
      const level = language.level || language.proficiency || "";
      return level ? `${name}: ${toTitleCase(level)}` : name;
    },
    formatEducation(education) {
      if (typeof education === "string") return education;
      const degree = education.degree || education.title || "Education";
      const school = education.school || education.institution || "";
      const year = education.year || education.graduationYear || "";
      const suffix = [school, year].filter(Boolean).join(", ");
      return suffix ? `${degree} - ${suffix}` : degree;
    },
    formatExperience(experience) {
      if (typeof experience === "string") return experience;
      const title = experience.title || experience.position || "Experience";
      const company = experience.company || experience.organization || "";
      const from = experience.startDate || experience.from || "";
      const to = experience.endDate || experience.to || "Present";
      const period = from ? `${from} - ${to}` : "";
      const suffix = [company, period].filter(Boolean).join(" | ");
      return suffix ? `${title} - ${suffix}` : title;
    },
  };
}
