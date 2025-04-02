'use server';
import { db } from '@/lib/prisma';
import { CandidateStatus, type Chapter, Role, type User } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = db;

async function main() {
  try {
    // Clean up existing data
    await prisma.$transaction(async (tx) => {
      await Promise.all([
        tx.candidate
          .deleteMany()
          .catch((e: Error) => console.log('Skipping candidate deletion:', e.message)),
        tx.company
          .deleteMany()
          .catch((e: Error) => console.log('Skipping company deletion:', e.message)),
        tx.member
          .deleteMany()
          .catch((e: Error) => console.log('Skipping member deletion:', e.message)),
        tx.resume
          .deleteMany()
          .catch((e: Error) => console.log('Skipping resume deletion:', e.message)),
        tx.chapter
          .deleteMany()
          .catch((e: Error) => console.log('Skipping chapter deletion:', e.message)),
        tx.address
          .deleteMany()
          .catch((e: Error) => console.log('Skipping address deletion:', e.message)),
        tx.profile
          .deleteMany()
          .catch((e: Error) => console.log('Skipping profile deletion:', e.message)),
        // Skip twoFactorConfirmation if table doesn't exist
        tx.twoFactorConfirmation
          .deleteMany()
          .catch((e: Error) => console.log('Skipping twoFactorConfirmation deletion:', e.message)),
        tx.twoFactorToken
          .deleteMany()
          .catch((e: Error) => console.log('Skipping twoFactorToken deletion:', e.message)),
        tx.passwordResetToken
          .deleteMany()
          .catch((e: Error) => console.log('Skipping passwordResetToken deletion:', e.message)),
        tx.verificationToken
          .deleteMany()
          .catch((e: Error) => console.log('Skipping verificationToken deletion:', e.message)),
        tx.session
          .deleteMany()
          .catch((e: Error) => console.log('Skipping session deletion:', e.message)),
        tx.account
          .deleteMany()
          .catch((e: Error) => console.log('Skipping account deletion:', e.message)),
        tx.user.deleteMany().catch((e: Error) => console.log('Skipping user deletion:', e.message)),
      ]);
    });

    // Create users with different roles
    const users = await Promise.all([
      // Admin User
      prisma.user.create({
        data: {
          email: 'admin@example.com',
          name: 'Admin User',
          password: await bcrypt.hash('password123', 10),
          emailVerified: true,
          image: 'https://avatars.githubusercontent.com/u/1234567',
          role: Role.COMPANY,
          isTwoFactorEnabled: false,
          profile: {
            create: {
              role: Role.COMPANY,
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
      ...['Tech Corp', 'Innovate Inc', 'Future Systems'].map(async (companyName) =>
        prisma.user.create({
          data: {
            email: `company@${companyName.toLowerCase().replace(/\s+/g, '')}.com`,
            name: `${companyName} Manager`,
            password: await bcrypt.hash('password123', 10),
            emailVerified: true,
            role: Role.COMPANY,
            isTwoFactorEnabled: false,
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
                  },
                },
                address: {
                  create: {
                    line1: `${Math.floor(Math.random() * 999) + 1} Business Ave`,
                    city: ['San Francisco', 'New York', 'Austin'][Math.floor(Math.random() * 3)]!,
                    province: ['CA', 'NY', 'TX'][Math.floor(Math.random() * 3)]!,
                    country: 'USA',
                    zip: String(10000 + Math.floor(Math.random() * 90000)),
                  },
                },
              },
            },
          },
        }),
      ),

      // Regular Users
      ...Array(5)
        .fill(null)
        .map(async (_, index) =>
          prisma.user.create({
            data: {
              email: `user${index + 1}@example.com`,
              name: `Test User ${index + 1}`,
              password: await bcrypt.hash('password123', 10),
              emailVerified: true,
              role: Role.MEMBER,
              isTwoFactorEnabled: false,
              image: `https://avatars.dicebear.com/api/human/${index}.svg`,
              profile: {
                create: {
                  role: Role.MEMBER,
                  active: true,
                  version: '1.0',
                },
              },
            },
          }),
        ),
    ]);

    // Create chapters
    const chapters = await Promise.all(
      [
        {
          name: 'Alpha Chapter',
          greekName: 'Α',
          foundingDate: new Date('1925-01-01'),
          university: 'Massachusetts Institute of Technology',
          location: 'Cambridge, MA',
          status: 'Active',
          latitude: 42.3601,
          longitude: -71.0942,
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
        },
        {
          name: 'Delta Chapter',
          greekName: 'Δ',
          foundingDate: new Date('1928-01-01'),
          university: 'University of Michigan',
          location: 'Ann Arbor, MI',
          status: 'Active',
          latitude: 42.2808,
          longitude: -83.743,
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
        },
      ].map((chapterData) =>
        prisma.chapter.create({
          data: {
            ...chapterData,
          },
        }),
      ),
    );

    // Create members with resumes
    const members = await Promise.all(
      (
        await prisma.user.findMany({
          include: { profile: true },
        })
      ).map(async (user, index) => {
        const chapter = chapters[index % chapters.length] as Chapter;
        if (!user.id) {
          throw new Error('Missing required user id');
        }
        if (!chapter.id) {
          throw new Error('Missing required chapter id');
        }

        const resume = await prisma.resume.create({
          data: {
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
              technical: ['JavaScript', 'Python', 'Java', 'C++', 'SQL', 'React', 'Node.js'],
              soft: ['Leadership', 'Communication', 'Problem Solving', 'Teamwork'],
            },
          },
        });

        let profile = user.profile;
        if (!profile) {
          profile = await prisma.profile.create({
            data: {
              role: Role.MEMBER,
              active: true,
              version: '1.0',
              userId: user.id,
            },
          });
        }

        return prisma.member.create({
          data: {
            profileId: profile.id,
            chapterId: chapter.id,
            resumeId: resume.id,
          },
        });
      }),
    );

    // Create candidates
    const companies = await prisma.company.findMany();
    if (!companies.length) {
      throw new Error('No companies found');
    }

    await Promise.all(
      members.map(async (member, index) => {
        const company = companies[index % companies.length];
        if (!company?.id || !member.id) {
          throw new Error('Missing required company or member data');
        }

        return prisma.candidate.create({
          data: {
            companyId: company.id,
            memberId: member.id,
            status: [
              CandidateStatus.PENDING,
              CandidateStatus.REVIEWING,
              CandidateStatus.INTERVIEWED,
              CandidateStatus.REJECTED,
            ][index % 4],
            notes: `Candidate ${index + 1} application notes`,
          },
        });
      }),
    );

    // Create 2FA tokens for testing
    await Promise.all(
      users.slice(0, 3).map((user: User, index) => {
        if (!user.email) {
          throw new Error('User email is required');
        }

        return prisma.twoFactorToken.create({
          data: {
            email: user.email,
            token: `123456${index}`,
            expires: new Date(Date.now() + 5 * 60 * 1000),
          },
        });
      }),
    );

    // Create verification tokens
    await Promise.all(
      users.slice(0, 3).map((user: User, index) => {
        if (!user.email) {
          throw new Error('User email is required');
        }

        return prisma.verificationToken.create({
          data: {
            email: user.email,
            token: `123456${index}`,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
          },
        });
      }),
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
