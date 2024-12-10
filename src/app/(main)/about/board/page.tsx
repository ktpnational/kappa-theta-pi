import React from "react";
import { FaLinkedin } from "react-icons/fa";

const boardMembers = [
  {
    name: "Zoey Lee",
    role: "President",
    location: "Miami",
    email: "zjl24@miami.edu",
    linkedin: "#",
    headshot: "https://via.placeholder.com/150", // Replace with actual image URL
  },
  {
    name: "Nathaniel Joseph",
    role: "Vice President",
    location: "Miami",
    email: "natejoseph@miami.edu",
    linkedin: "#",
    headshot: "https://via.placeholder.com/150", // Replace with actual image URL
  },
  {
    name: "Tommy Joppich",
    role: "Director of Chapter Growth",
    location: "Michigan",
    email: "Tjoppich@umich.edu",
    linkedin: "#",
    headshot: "https://via.placeholder.com/150", // Replace with actual image URL
  },
  {
    name: "Linda Tang",
    role: "Director of Branding and Marketing",
    location: "Pittsburgh",
    email: "lit53@pitt.edu",
    linkedin: "#",
    headshot: "https://via.placeholder.com/150", // Replace with actual image URL
  },
  {
    name: "Anjali Cherukuri",
    role: "Director of Alumni Relations",
    location: "Texas (Austin)",
    email: "anjalic@utexas.edu",
    linkedin: "#",
    headshot: "https://via.placeholder.com/150", // Replace with actual image URL
  },
  {
    name: "Kairavi Pandya",
    role: "Director of Technology",
    location: "UT Dallas",
    email: "pandyakairavi@gmail.com",
    linkedin: "#",
    headshot: "https://via.placeholder.com/150", // Replace with actual image URL
  },
  {
    name: "Beatriz Perez",
    role: "Director of Finance",
    location: "Boston University",
    email: "beap@bu.edu",
    linkedin: "#",
    headshot: "https://via.placeholder.com/150", // Replace with actual image URL
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
            <img
              src={member.headshot}
              alt={member.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <h2 className="text-xl font-semibold text-navy-blue mb-2">
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
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-medium-blue hover:text-light-blue"
              >
                <FaLinkedin className="inline-block text-2xl" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

AboutBoardPage.displayName = "AboutBoardPage";
export default AboutBoardPage;
