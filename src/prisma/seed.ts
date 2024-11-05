import { CandidateStatus, PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  try {
    // Clean up existing data
    await prisma.$transaction([
      prisma.candidate.deleteMany(),
      prisma.company.deleteMany(),
      prisma.member.deleteMany(),
      prisma.resume.deleteMany(),
      prisma.chapter.deleteMany(),
      prisma.address.deleteMany(),
      prisma.profile.deleteMany(),
      prisma.twoFactorConfirmation.deleteMany(),
      prisma.twoFactorToken.deleteMany(),
      prisma.passwordResetToken.deleteMany(),
      prisma.verificationToken.deleteMany(),
      prisma.session.deleteMany(),
      prisma.account.deleteMany(),
      prisma.user.deleteMany(),
    ]);

    // Create users with different roles
    const users = await Promise.all([
      // Admin User
      prisma.user.create({
        data: {
          email: 'admin@example.com',
          name: 'Admin User',
          password: await hash('password123', 10),
          emailVerified: new Date(),
          image: 'https://avatars.githubusercontent.com/u/1234567',
          profile: {
            create: {
              role: Role.ADMIN,
              active: true,
              version: '1.0',
              address: {
                create: {
                  line1: '123 Admin St',
                  line2: 'Suite 100',
                  city: 'Admin City',
                  province: 'Admin Province',
                  country: 'USA',
                  zip: '12345',
                },
              },
            },
          },
        },
      }),

      // Company Users
      ...['Tech Corp', 'Innovate Inc', 'Future Systems'].map((companyName) =>
        prisma.user.create({
          data: {
            email: `company@${companyName.toLowerCase().replace(/\s+/g, '')}.com`,
            name: `${companyName} Manager`,
            password: await hash('password123', 10),
            emailVerified: new Date(),
            image: `https://logo.clearbit.com/${companyName.toLowerCase().replace(/\s+/g, '')}.com`,
            profile: {
              create: {
                role: Role.COMPANY,
                active: true,
                version: '1.0',
                company: {
                  create: {
                    companyName,
                    website: `https://${companyName.toLowerCase().replace(/\s+/g, '')}.com`,
                    industry: ['Technology', 'Software', 'Consulting'][
                      Math.floor(Math.random() * 3)
                    ],
                    address: {
                      create: {
                        line1: `${Math.floor(Math.random() * 999) + 1} Business Ave`,
                        city: ['San Francisco', 'New York', 'Austin'][
                          Math.floor(Math.random() * 3)
                        ],
                        province: ['CA', 'NY', 'TX'][Math.floor(Math.random() * 3)],
                        country: 'USA',
                        zip: String(10000 + Math.floor(Math.random() * 90000)),
                      },
                    },
                  },
                },
              },
            },
          },
        })
      ),

      // Regular Users
      ...Array(5).fill(null).map(async (_, index) =>
        prisma.user.create({
          data: {
            email: `user${index + 1}@example.com`,
            name: `Test User ${index + 1}`,
            password: await hash('password123', 10),
            emailVerified: new Date(),
            image: `https://avatars.dicebear.com/api/human/${index}.svg`,
            profile: {
              create: {
                role: Role.USER,
                active: true,
                version: '1.0',
              },
            },
          },
        })
      ),
    ]);

    // Create chapters with more detailed information
    const chapters = await Promise.all([
      {
        name: 'Alpha Chapter',
        greekName: 'Α',
        foundingDate: new Date('1925-01-01'),
        university: 'Massachusetts Institute of Technology',
        location: 'Cambridge, MA',
        status: 'Active',
        latitude: 42.3601,
        longitude: -71.0942,
        description: 'Founding chapter of Kappa Theta Pi at MIT',
        website: 'https://ktp.mit.edu',
        email: 'ktp-alpha@mit.edu',
        socialMedia: {
          facebook: 'https://facebook.com/ktpmit',
          instagram: '@ktpmit',
          linkedin: 'https://linkedin.com/company/ktp-mit',
        },
        memberCount: 120,
        activeMembers: 75,
        alumniMembers: 450,
      },
      {
        name: 'Beta Chapter',
        greekName: 'Β',
        foundingDate: new Date('1926-01-01'),
        university: 'Stanford University',
        location: 'Stanford, CA',
        status: 'Active',
        latitude: 37.4275,
        longitude: -122.1697,
        description: 'First West Coast chapter of Kappa Theta Pi',
        website: 'https://ktp.stanford.edu',
        email: 'ktp-beta@stanford.edu',
        socialMedia: {
          facebook: 'https://facebook.com/ktpstanford',
          instagram: '@ktpstanford',
          linkedin: 'https://linkedin.com/company/ktp-stanford',
        },
        memberCount: 85,
        activeMembers: 55,
        alumniMembers: 320,
      },
      {
        name: 'Gamma Chapter',
        greekName: 'Γ',
        foundingDate: new Date('1927-01-01'),
        university: 'Georgia Institute of Technology',
        location: 'Atlanta, GA',
        status: 'Active',
        latitude: 33.7756,
        longitude: -84.3963,
        description: 'First Southern chapter of Kappa Theta Pi',
        website: 'https://ktp.gatech.edu',
        email: 'ktp-gamma@gatech.edu',
        socialMedia: {
          facebook: 'https://facebook.com/ktpgatech',
          instagram: '@ktpgatech',
          linkedin: 'https://linkedin.com/company/ktp-gatech',
        },
        memberCount: 95,
        activeMembers: 60,
        alumniMembers: 380,
      },
      {
        name: 'Delta Chapter',
        greekName: 'Δ',
        foundingDate: new Date('1928-01-01'),
        university: 'University of Michigan',
        location: 'Ann Arbor, MI',
        status: 'Active',
        latitude: 42.2808,
        longitude: -83.7430,
        description: 'First Midwest chapter of Kappa Theta Pi',
        website: 'https://ktp.umich.edu',
        email: 'ktp-delta@umich.edu',
        socialMedia: {
          facebook: 'https://facebook.com/ktpumich',
          instagram: '@ktpumich',
          linkedin: 'https://linkedin.com/company/ktp-umich',
        },
        memberCount: 110,
        activeMembers: 70,
        alumniMembers: 420,
      },
      {
        name: 'Epsilon Chapter',
        greekName: 'Ε',
        foundingDate: new Date('1929-01-01'),
        university: 'University of California, Berkeley',
        location: 'Berkeley, CA',
        status: 'Active',
        latitude: 37.8719,
        longitude: -122.2585,
        description: 'Second West Coast chapter of Kappa Theta Pi',
        website: 'https://ktp.berkeley.edu',
        email: 'ktp-epsilon@berkeley.edu',
        socialMedia: {
          facebook: 'https://facebook.com/ktpberkeley',
          instagram: '@ktpberkeley',
          linkedin: 'https://linkedin.com/company/ktp-berkeley',
        },
        memberCount: 100,
        activeMembers: 65,
        alumniMembers: 390,
      },
    ].map(chapterData =>
      prisma.chapter.create({
        data: {
          ...chapterData,
          events: {
            create: [
              {
                name: 'Rush Week',
                description: 'Fall recruitment event',
                startDate: new Date(new Date().getFullYear(), 8, 1), // September 1st
                endDate: new Date(new Date().getFullYear(), 8, 7), // September 7th
                location: `${chapterData.university} Student Center`,
                type: 'RECRUITMENT',
                status: 'UPCOMING',
              },
              {
                name: 'Tech Talk',
                description: 'Industry speaker series',
                startDate: new Date(new Date().getFullYear(), 9, 15), // October 15th
                endDate: new Date(new Date().getFullYear(), 9, 15),
                location: `${chapterData.university} Engineering Building`,
                type: 'PROFESSIONAL',
                status: 'UPCOMING',
              },
              {
                name: 'Alumni Networking',
                description: 'Annual alumni networking event',
                startDate: new Date(new Date().getFullYear(), 10, 1), // November 1st
                endDate: new Date(new Date().getFullYear(), 10, 1),
                location: `${chapterData.university} Alumni Center`,
                type: 'NETWORKING',
                status: 'UPCOMING',
              },
            ],
          },
          officers: {
            create: [
              {
                position: 'President',
                email: `president@${chapterData.website.split('//')[1]}`,
                term: {
                  start: new Date(new Date().getFullYear(), 0, 1),
                  end: new Date(new Date().getFullYear(), 11, 31),
                },
              },
              {
                position: 'Vice President',
                email: `vp@${chapterData.website.split('//')[1]}`,
                term: {
                  start: new Date(new Date().getFullYear(), 0, 1),
                  end: new Date(new Date().getFullYear(), 11, 31),
                },
              },
              {
                position: 'Treasurer',
                email: `treasurer@${chapterData.website.split('//')[1]}`,
                term: {
                  start: new Date(new Date().getFullYear(), 0, 1),
                  end: new Date(new Date().getFullYear(), 11, 31),
                },
              },
            ],
          },
        },
      })
    ));

    // Create members with resumes
    const members = await Promise.all(
      users
        .filter((user) => user.profile?.role === Role.USER)
        .map(async (user, index) => {
          const chapter = chapters[index % chapters.length];

          return prisma.member.create({
            data: {
              profile: {
                connect: {
                  userId: user.id,
                },
              },
              chapterId: chapter.id,
              graduationYear: 2023 + index,
              major: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering'][
                index % 3
              ],
              status: ['ACTIVE', 'ALUMNI', 'PLEDGE'][index % 3],
              joinDate: new Date(new Date().setFullYear(new Date().getFullYear() - (index % 4))),
              // Add member-specific chapter roles
              chapterRoles: ['Rush Chair', 'Professional Chair', 'Social Chair'][index % 3],
              resume: {
                create: {
                  education: {
                    university: chapter.university,
                    degree: ['BS', 'MS', 'PhD'][index % 3],
                    graduationYear: 2023 + index,
                    major: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering'][
                      index % 3
                    ],
                    gpa: 3.5 + (index % 5) * 0.1,
                  },
                  experience: {
                    company: ['Google', 'Microsoft', 'Apple', 'Amazon', 'Meta'][index % 5],
                    position: ['Software Engineer', 'Data Scientist', 'Product Manager'][index % 3],
                    years: index + 1,
                    description: 'Worked on various projects and technologies.',
                  },
                  skills: {
                    technical: [
                      'JavaScript',
                      'Python',
                      'Java',
                      'C++',
                      'SQL',
                      'React',
                      'Node.js',
                    ],
                    soft: ['Leadership', 'Communication', 'Problem Solving', 'Teamwork'],
                  },
                  projects: [
                    {
                      name: 'Project Alpha',
                      description: 'A revolutionary project',
                      technologies: ['React', 'Node.js', 'PostgreSQL'],
                    },
                    {
                      name: 'Project Beta',
                      description: 'An innovative solution',
                      technologies: ['Python', 'TensorFlow', 'AWS'],
                    },
                  ],
                },
              },
            },
          });
        })
    );

    // Create candidates
    const companies = await prisma.company.findMany();
    await Promise.all(
      members.map(async (member, index) => {
        const company = companies[index % companies.length];
        return prisma.candidate.create({
          data: {
            companyId: company.id,
            memberId: member.id,
            status: [
              CandidateStatus.REVIEWING,
              CandidateStatus.ACCEPTED,
              CandidateStatus.REJECTED,
              CandidateStatus.WITHDRAWN,
            ][index % 4],
            notes: `Candidate ${index + 1} application notes`,
            appliedDate: new Date(),
            updatedDate: new Date(),
          },
        });
      })
    );

    // Create 2FA tokens for testing
    await Promise.all(
      users.slice(0, 3).map((user) =>
        prisma.twoFactorToken.create({
          data: {
            email: user.email!,
            token: '123456',
            expires: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
          },
        })
      )
    );

    // Create verification tokens
    await Promise.all(
      users.slice(0, 3).map((user) =>
        prisma.verificationToken.create({
          data: {
            email: user.email!,
            token: '123456',
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
          },
        })
      )
    );

    console.log('Seed data created successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
