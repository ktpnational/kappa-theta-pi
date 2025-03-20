import { z } from 'zod';

const PREFIX = '/assets/images/headshots/';
const POSTFIX = '-headshot';
const EXTENSION = '.webp';

const BoardMemberSchema = z.object({
  name: z.string(),
  role: z.string(),
  location: z.string(),
  email: z.string(),
  linkedin: z.string(),
  headshot: z.string(),
  lqip: z.string(),
});

const InauguralBoardMemberSchema = z.object({
  name: z.string(),
  role: z.string(),
  year: z.string(),
});

type BoardMemberProps = z.infer<typeof BoardMemberSchema>;
type InauguralBoardMemberProps = z.infer<typeof InauguralBoardMemberSchema>;

const boardMembers: BoardMemberProps[] = [
  {
    name: 'Zoey Lee',
    role: 'President',
    location: 'University of Miami',
    email: 'zjl24@miami.edu',
    linkedin: 'https://www.linkedin.com/in/zoeylee123/',
    headshot: `${PREFIX}zoey-lee${POSTFIX}${EXTENSION}`,
    lqip: `data:image/${EXTENSION};base64,UklGRmgBAABXRUJQVlA4IFwBAACwBgCdASoYAB4APm0wk0ckIqGhKAqogA2JZAC1GoR6WGZjlDPVQ7//a/WYvO+TuLzVT4mIot5tvacKW4xbkAD+/AaqKstAFMJbrHQZM7Q1WPEwJiCo692usqwYhu9j9W2OxOQSEOQtPkdZ/HdM9ngZqnvVJWpzzwi0k5HcbMM02wsbkZ72p2pgbBfI+fPwSdvQ7SElyBg1PfmjUeR1em+wDc8uNNFzpaN3jbHf5P1m0E5rPThNRMmBDZrhyr2C/0tMF/pCzpF6CaqgkFHTaXVROUx2Xh0zvLXZ/wTlMTk1Y9lNOlIxGn4RKt7rES46lF1bn+mZud/P2J95EX4HpIrFvhe/y/5w+LOoWMG6bm0/YRup6EWqPwAPed/0FKNkKFaZaKHJMDvGMqavp3NUtC9XuDYdV8Eok0A00f3eggBLeD8p/zCHiSOaYvr/+DfY13oQtd+m1hxW0/OkwAA="`,
  },
  {
    name: 'Nate Joseph',
    role: 'Vice President',
    location: 'University of Miami',
    email: 'natejoseph@miami.edu',
    linkedin: 'https://www.linkedin.com/in/nathanieljoseph',
    headshot: `${PREFIX}nate-joseph${POSTFIX}${EXTENSION}`,
    lqip: `data:image/${EXTENSION};base64,UklGRngBAABXRUJQVlA4IGwBAACQBwCdASoeABQAPm0skkWkIqGYBABABsSzAE6ZcWV8QA/UBy4rAO4Gid9B7PhVrRY5ezWEONkoR7cNegYKxpZgm+3YxAAA/rXbNcEbj4IYB4kAE9WYyPaNNK6yN9eEqu3CGcpMP7KG0MQOHdS8tbJ3VpbR/oEpubbY9S1pH4+x2Ypg9jIySz1+wUsOp5odOBjJ7tx+A/fyb7cq/ykXZt+l2cG3JRAMAzQjjZN/+qLNJghcbxgSIk66FYf82A7W+7ykHyzFtwwtvYgF5HgVBUl5HPWktZN7HJ9hraeYnRbc/S0HYw4LqFlJcs+AlR3+2ofBeG6/i6n0CObcHprqs56dUqB3vO/1L4oO54/MoLSAA4vRcoK7OF8bgdyzVvj/T//ZfHZ/6uVNtH77ePdffYODYzhAnRNxRHtr14rfRo5kD67LH+b6fBqx573kjY/smgugRmHBf4789YKbiiVEk3PwhW+aMidrZri8ZAAA`,
  },
  {
    name: 'Tommy Joppich',
    role: 'Director of Chapter Growth',
    location: 'University of Michigan',
    email: 'Tjoppich@umich.edu',
    linkedin: 'https://www.linkedin.com/in/thomas-joppich-a66845251/',
    headshot: `${PREFIX}tommy-joppich${POSTFIX}${EXTENSION}`,
    lqip: `data:image/${EXTENSION};base64,UklGRmYBAABXRUJQVlA4IFoBAAAwBwCdASoeABQAPm0sk0akIiGhMBgIAIANiUATplBj5LATKr/AFABQu/QMz8DsvB65iPDt/IEHrj0quD8aEC4bbiQA/ClJlfdIkeF8XmK3ZQQXFsoVwOq+Yh0dzVxeskZGdDlFOsx7QWHxx4HhUa4gkMtbezMKdU84hK/hOmPO5aFT6j+KQO1LLlYdVWb0tFzmSB+IE6S+mhD1eRakooTzdoZmDRkMnFXYgWtdwVHgg9xvY8Z+vt/r8/yuQb8n40e7CgIdg7yfzi8FlwnyGPTonIH6IFMUun1u8/vcy7C/XreyZhBZ568pMeZyne3EOspdCv+RpL5k0xo9rJqOSh3Uku+ZhRVa7YrGFSnX06lZtwiwjvDJMqFru1mcsaKTjAqdmqZBPTUIa3AAS3f5Xj4E+qn+MUBqZvN/LH6DvTe35HkmMvE+JQpVBosxR2iBNywXy+8tfng8MIAA`,
  },
  {
    name: 'Anjali Cherukuri',
    role: 'Director of Alumni Relations',
    location: 'University of Texas at Austin',
    email: 'anjalic@utexas.edu',
    linkedin: 'https://www.linkedin.com/in/anjali-cherukuri/',
    headshot: `${PREFIX}anjali-cherukuri${POSTFIX}${EXTENSION}`,
    lqip: `data:image/${EXTENSION};base64,UklGRrwBAABXRUJQVlA4ILABAAAQCQCdASobAB4APm0wk0ckIqGhKAqogA2JZACdMoR1ZwS7ZjIPVy6NSXA4eN0C7Z+TNdc1ZkoZ/YJxrr2aj8EzDfZ4iS/hTiFYVfL/TdEiN0AA/vsxzPf4qMe52tfdLdTQ5o3N0Nj45XEShoEuVphaxocv4U4D1iYfXOx63GNyn7J/ZPjrgXy+ge5Xzz+TFrOaaS8cyzbpKYBsRB5fxK3l1AV13ySvH0crnfIasJlRvf+JVERGpmuLn6gaOPusp/mZvS34G+Ol3b6XlQ0aXvRbUv2fe7WF91y7vC4EIJ020KkAI8tfpW4NZiHreD43d3k3tq6Z1Fxust6KzBEjCjoxQ77Mf8KxlKjvOnZs7UOGXOJCxW9rC6/NTB8MtZweJFTwkY7hwSRSQbcIdKKQE3L2zpiyVEdusfvXoi9ZTY+fceZnv9TQDh2qUW50w032Fd7q/KwYOoTxpMzaIeB5I4S94EoIkRqba20GoDBWLtQvCt0HicEsgdfkKQf7HGhOdRRTaz2UKfA6b2DBO950kMnVr3FBTUzTkqNmPeb+gp2s5hfHqPz1EPC2EHTtCNyuAAA=`,
  },
  {
    name: 'Kairavi Pandya',
    role: 'Director of Technology',
    location: 'University of Texas at Dallas',
    email: 'pandyakairavi@gmail.com',
    linkedin: 'https://www.linkedin.com/in/kairavi-pandya/',
    headshot: `${PREFIX}kairavi-pandya${POSTFIX}${EXTENSION}`,
    lqip: `data:image/${EXTENSION};base64,UklGRn4BAABXRUJQVlA4IHIBAAAQBwCdASoUAB4APm0skkWkIqGYBABABsSygF2Zkl311NYyO1BTLvGtqBjOzDJkQVs3yco60UoD1PQAKDIpRBHaAAD+76f5feJPGVIUGfQ69n8PjlvMHzIlMi1wexwGozRqnsBF+D32dJQEYzkx8cErYdTPjec2PgKEXRaBNJ0I7LXzwTvl8VoDNKH7PmVD1+hrmUbPUxYgozajsX95nSWgYbY74G8nab2CDZbvV2SYaGjzj6+AzeJD+fAZDQ4kdvD4ua9s6stsbfvLxqEnP/VQB5m8wJ8zeUgGrNx6eApjiUSaIEMw2A3BzLCbu5i24pVoxkp0GJSdwdLNfeZIAFlqDOIIj9uPXvzPxDQGb1226FAgEy9eZKSP5Lb1KHm8n+MbngBisknVOLYc9MPM0tDK1r2Fhco3+STYOp9AlFxBnTUtT8QQ+O2frprp/qQJv5i7TnZd3WAPeDS1DWgvgFxkNTjo47wHZJur9ZlhAPR0AAAA`,
  },
  {
    name: 'Beatriz Perez',
    role: 'Director of Finance',
    location: 'Boston University',
    email: 'beap@bu.edu',
    linkedin: 'https://www.linkedin.com/in/beatrizp%C3%A9rez602/?originalSubdomain=pr',
    headshot: `${PREFIX}beatriz-perez${POSTFIX}${EXTENSION}`,
    lqip: `data:image/${EXTENSION};base64,UklGRmIBAABXRUJQVlA4IFYBAACwBgCdASoeAB4APm0wk0YkIyGhMAgAgA2JZgCw+iAF9EqOT6qrXfGFd394t+Ksn5TzkwnkwLruKu8Aao/sAAD+/YK475QYcJDaeLGG4VHz9OBum3+Ua/S5KoObnP/G//cbhyc+itaHBH8a86Rdfn6GkylXZksHVylnN8ehKjbjhfROqFf/PyFhd/zwKnq+yTpfPVlDbgEOt8ykukVQ+IKMPqGeojxVqadLd+eGbDUKDhFGv0TAekPjXFqhuoQK1O3OiobU45IpFoJjYIh21N/qAbvo3aKWWPHRMD0Twzfk9MszxmyUBl+DDF1cPH2gDfvMHk3TNdU8S3gwg84o+G497/RZfuiMfUY43XosTHI8BIC+nXkLHN8v5RZHb/5oidawYU1orx7Wc/phvYO/lXyOZDpys8qP0pL5iLFGMb6lIfC2tVIdxvmSVADixnOtt9WAWy8AAAA=`,
  },
];

const inauguralBoardMember: InauguralBoardMemberProps = {
  name: 'Linda Tang',
  role: 'Director of Branding and Marketing',
  year: '2024',
};

export { boardMembers, inauguralBoardMember };
export type { BoardMemberProps, InauguralBoardMemberProps };
