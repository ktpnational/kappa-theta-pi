import React from 'react';
import { FaLinkedin } from 'react-icons/fa';

const boardMembers = [
  {
    name: 'Zoey Lee',
    role: 'President',
    location: 'University of Miami',
    email: 'zjl24@miami.edu',
    linkedin: 'https://www.linkedin.com/in/zoeylee123/',
    headshot: '/assets/headshots/Zoey-Lee-Headshot.webp',
  },
  {
    name: 'Nate Joseph',
    role: 'Vice President',
    location: 'University of Miami',
    email: 'natejoseph@miami.edu',
    linkedin: 'https://www.linkedin.com/in/nathanieljoseph',
    headshot: '/assets/headshots/Nate-Joseph-Headshot.webp',
  },
  {
    name: 'Tommy Joppich',
    role: 'Director of Chapter Growth',
    location: 'University of Michigan',
    email: 'Tjoppich@umich.edu',
    linkedin: 'https://www.linkedin.com/in/thomas-joppich-a66845251/',
    headshot: '/assets/headshots/Tommy-J-Headshot.webp',
  },
  {
    name: 'Anjali Cherukuri',
    role: 'Director of Alumni Relations',
    location: 'University of Texas at Austin',
    email: 'anjalic@utexas.edu',
    linkedin: 'https://www.linkedin.com/in/anjali-cherukuri/',
    headshot: '/assets/headshots/Anjali-Cherukuri-Headshot.webp',
  },
  {
    name: 'Kairavi Pandya',
    role: 'Director of Technology',
    location: 'University of Texas at Dallas',
    email: 'pandyakairavi@gmail.com',
    linkedin: 'https://www.linkedin.com/in/kairavi-pandya/',
    headshot: '/assets/headshots/Kairavi-Pandya-Headshot.webp',
  },
  {
    name: 'Beatriz Perez',
    role: 'Director of Finance',
    location: 'Boston University',
    email: 'beap@bu.edu',
    linkedin: 'https://www.linkedin.com/in/beatrizp%C3%A9rez602/?originalSubdomain=pr',
    headshot: '/assets/headshots/Beatriz-Perez-Headshot.webp',
  },
];

const inauguralBoardMember = {
  name: 'Linda Tang',
  role: 'Director of Branding and Marketing',
  year: '2024',
};

const AboutBoardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-navy-blue mb-10">Meet the E-Board</h1>
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
            <h2 className="text-xl font-semibold text-navy-blue mb-2">{member.name}</h2>
            <p className="text-sm text-gray-500">{member.role}</p>
            <p className="text-sm text-gray-400">{member.location}</p>
            <a
              href={`mailto:${member.email}`}
              className="text-sm text-medium-blue underline hover:text-light-blue"
            >
              {member.email}
            </a>
            <div className="mt-4">
              {member.linkedin !== '#' ? (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-medium-blue hover:text-light-blue"
                >
                  <FaLinkedin className="inline-block text-2xl" />
                </a>
              ) : (
                <span className="text-gray-400 text-sm">LinkedIn not available</span>
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
        <div className="bg-white shadow-md rounded-lg p-6 text-center max-w-lg mx-auto">
          <h3 className="text-xl font-semibold text-navy-blue mb-2">{inauguralBoardMember.name}</h3>
          <p className="text-sm text-gray-500">{inauguralBoardMember.role}</p>
          <p className="text-sm text-gray-400">{inauguralBoardMember.year}</p>
        </div>
      </div>
    </div>
  );
};

AboutBoardPage.displayName = 'AboutBoardPage';
export default AboutBoardPage;
