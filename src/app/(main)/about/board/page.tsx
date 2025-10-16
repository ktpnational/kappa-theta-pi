import React from "react";
import { FaLinkedin } from "react-icons/fa";

const boardMembers = [
  {
    name: "Shriya Srinivasan",
    role: "President",
    location: "Rutgers University",
    email: "shriya@srinivasans.com",
    linkedin: "https://www.linkedin.com/in/shriyasrinivasans/",
    headshot: "/assets/headshots/shriya-srinivasan-headshot.webp",
  },
  {
    name: "Dhruv Dighrasker",
    role: "Director of Chapter Growth",
    location: "University of Michigan",
    email: "dhruvdi@umich.edu",
    linkedin: "https://www.linkedin.com/in/dhruv-dighrasker/",
    headshot: "/assets/headshots/dhruv-dighrasker-headshot.webp",
  },
  {
    name: "Pranav Boopalam",
    role: "Director of Alumni Relations",
    location: "University of Michigan",
    email: "boopalam@umich.edu",
    linkedin: "https://www.linkedin.com/in/pranav-boopalam",
    headshot: "/assets/headshots/pranav-boopalam-headshot.webp",
  },
  {
    name: "Douglas Brito",
    role: "Director of Technology",
    location: "University of Texas at Austin",
    email: "douglascebrito@gmail.com",
    linkedin: "https://www.linkedin.com/in/douglascebrito/",
    headshot: "/assets/headshots/douglas-brito-headshot.webp",
  },
  {
    name: "Ivy Enyenihi",
    role: "Director of Standards",
    location: "University of Miami",
    email: "ime38@miami.edu",
    linkedin: "https://www.linkedin.com/in/ivy-enyenihi/",
    headshot: "/assets/headshots/ivy-enyenihi-headshot.webp",
  },
  {
    name: "Yana Pathak",
    role: "Director of Correspondence",
    location: "Boston University",
    email: "ypathak1@bu.edu",
    linkedin: "https://www.linkedin.com/in/yana-pathak/",
    headshot: "/assets/headshots/yana-pathak-headshot.webp",
  },
  {
    name: "Siddhartha Paruchuri",
    role: "Director of Outreach",
    location: "Ohio State University",
    email: "siddharthaparuchuri.osu@gmail.com",
    linkedin: "https://www.linkedin.com/in/siddhartha-paruchuri-34a353293/",
    headshot: "/assets/headshots/siddhartha-paruchuri-headshot.webp",
  },
];

const inauguralBoardMembers = [
  {
    name: "Zoey Lee",
    role: "President",
    year: "2024–2025",
    headshot: "/assets/headshots/zoey-lee-headshot.webp",
  },
  {
    name: "Nate Joseph",
    role: "Vice President",
    year: "2024–2025",
    headshot: "/assets/headshots/nate-joseph-headshot.webp",
  },
  {
    name: "Tommy Joppich",
    role: "Director of Chapter Growth",
    year: "2024–2025",
    headshot: "/assets/headshots/tommy-joppich-headshot.webp",
  },
  {
    name: "Anjali Cherukuri",
    role: "Director of Alumni Relations",
    year: "2024–2025",
    headshot: "/assets/headshots/anjali-cherukuri-headshot.webp",
  },
  {
    name: "Kairavi Pandya",
    role: "Director of Technology",
    year: "2024–2025",
    headshot: "/assets/headshots/kairavi-pandya-headshot.webp",
  },
  {
    name: "Beatriz Perez",
    role: "Director of Finance",
    year: "2024–2025",
    headshot: "/assets/headshots/beatriz-perez-headshot.webp",
  },
  {
    name: "Emily Jennett",
    role: "Director of Branding and Marketing",
    year: "2025",
    headshot: "/assets/headshots/emily-jennett-headshot.webp",
  },
  {
    name: "Makayla Tajalle",
    role: "Director of Correspondence",
    year: "2025",
    headshot: "/assets/headshots/makayla-tajalle-headshot.webp",
  },
  {
    name: "Linda Tang",
    role: "Director of Branding and Marketing",
    year: "2024",
  },
];

const AboutBoardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-navy-blue mb-10">
        Meet the E-Board
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {boardMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transform transition-transform hover:scale-105 text-center"
          >
            {member.headshot?.trim() && (
              <img
                src={member.headshot}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
            )}
            <h2 className="text-xl font-semibold text-navy-blue mb-1">
              {member.name}
            </h2>
            <p className="text-sm text-gray-500">{member.role}</p>
            <p className="text-sm text-gray-400">{member.location}</p>
            <a
              href={`mailto:${member.email}`}
              className="text-sm text-medium-blue underline hover:text-light-blue"
            >
              {member.email}
            </a>
            <div className="mt-4">
              {member.linkedin ? (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-medium-blue hover:text-light-blue"
                >
                  <FaLinkedin className="inline-block text-2xl" />
                </a>
              ) : (
                <span className="text-gray-400 text-sm">
                  LinkedIn not available
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Inaugural National Board Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center text-navy-blue mb-6">
          Inaugural National Board
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {inauguralBoardMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 text-center"
            >
              {member.headshot?.trim() && (
                <img
                  src={member.headshot}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
              )}
              <h3 className="text-xl font-semibold text-navy-blue mb-1">
                {member.name}
              </h3>
              <p className="text-sm text-gray-500">{member.role}</p>
              <p className="text-sm text-gray-400">{member.year}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

AboutBoardPage.displayName = "AboutBoardPage";
export default AboutBoardPage;
