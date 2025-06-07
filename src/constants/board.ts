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
    headshot: `${PREFIX}zoey-lee${POSTFIX}${EXTENSION}`.toLowerCase(),
    lqip: `data:image/${EXTENSION};base64,UklGRmgBAABXRUJQVlA4IFwBAACwBgCdASoYAB4APm0wk0ckIqGhKAqogA2JZAC1GoR6WGZjlDPVQ7//a/WYvO+TuLzVT4mIot5tvacKW4xbkAD+/AaqKstAFMJbrHQZM7Q1WPEwJiCo692usqwYhu9j9W2OxOQSEOQtPkdZ/HdM9ngZqnvVJWpzzwi0k5HcbMM02wsbkZ72p2pgbBfI+fPwSdvQ7SElyBg1PfmjUeR1em+wDc8uNNFzpaN3jbHf5P1m0E5rPThNRMmBDZrhyr2C/0tMF/pCzpF6CaqgkFHTaXVROUx2Xh0zvLXZ/wTlMTk1Y9lNOlIxGn4RKt7rES46lF1bn+mZud/P2J95EX4HpIrFvhe/y/5w+LOoWMG6bm0/YRup6EWqPwAPed/0FKNkKFaZaKHJMDvGMqavp3NUtC9XuDYdV8Eok0A00f3eggBLeD8p/zCHiSOaYvr/+DfY13oQtd+m1hxW0/OkwAA="`,
  },
  {
    name: 'Nate Joseph',
    role: 'Vice President',
    location: 'University of Miami',
    email: 'natejoseph@miami.edu',
    linkedin: 'https://www.linkedin.com/in/nathanieljoseph',
    headshot: `${PREFIX}nate-joseph${POSTFIX}${EXTENSION}`.toLowerCase(),
    lqip: `data:image/${EXTENSION};base64,UklGRngBAABXRUJQVlA4IGwBAACQBwCdASoeABQAPm0skkWkIqGYBABABsSzAE6ZcWV8QA/UBy4rAO4Gid9B7PhVrRY5ezWEONkoR7cNegYKxpZgm+3YxAAA/rXbNcEbj4IYB4kAE9WYyPaNNK6yN9eEqu3CGcpMP7KG0MQOHdS8tbJ3VpbR/oEpubbY9S1pH4+x2Ypg9jIySz1+wUsOp5odOBjJ7tx+A/fyb7cq/ykXZt+l2cG3JRAMAzQjjZN/+qLNJghcbxgSIk66FYf82A7W+7ykHyzFtwwtvYgF5HgVBUl5HPWktZN7HJ9hraeYnRbc/S0HYw4LqFlJcs+AlR3+2ofBeG6/i6n0CObcHprqs56dUqB3vO/1L4oO54/MoLSAA4vRcoK7OF8bgdyzVvj/T//ZfHZ/6uVNtH77ePdffYODYzhAnRNxRHtr14rfRo5kD67LH+b6fBqx573kjY/smgugRmHBf4789YKbiiVEk3PwhW+aMidrZri8ZAAA`,
  },
  {
    name: 'Tommy Joppich',
    role: 'Director of Chapter Growth',
    location: 'University of Michigan',
    email: 'Tjoppich@umich.edu',
    linkedin: 'https://www.linkedin.com/in/thomas-joppich-a66845251/',
    headshot: `${PREFIX}tommy-joppich${POSTFIX}${EXTENSION}`.toLowerCase(),
    lqip: `data:image/${EXTENSION};base64,UklGRmYBAABXRUJQVlA4IFoBAAAwBwCdASoeABQAPm0sk0akIiGhMBgIAIANiUATplBj5LATKr/AFABQu/QMz8DsvB65iPDt/IEHrj0quD8aEC4bbiQA/ClJlfdIkeF8XmK3ZQQXFsoVwOq+Yh0dzVxeskZGdDlFOsx7QWHxx4HhUa4gkMtbezMKdU84hK/hOmPO5aFT6j+KQO1LLlYdVWb0tFzmSB+IE6S+mhD1eRakooTzdoZmDRkMnFXYgWtdwVHgg9xvY8Z+vt/r8/yuQb8n40e7CgIdg7yfzi8FlwnyGPTonIH6IFMUun1u8/vcy7C/XreyZhBZ568pMeZyne3EOspdCv+RpL5k0xo9rJqOSh3Uku+ZhRVa7YrGFSnX06lZtwiwjvDJMqFru1mcsaKTjAqdmqZBPTUIa3AAS3f5Xj4E+qn+MUBqZvN/LH6DvTe35HkmMvE+JQpVBosxR2iBNywXy+8tfng8MIAA`,
  },
  {
    name: 'Anjali Cherukuri',
    role: 'Director of Alumni Relations',
    location: 'University of Texas at Austin',
    email: 'anjalic@utexas.edu',
    linkedin: 'https://www.linkedin.com/in/anjali-cherukuri/',
    headshot: `${PREFIX}anjali-cherukuri${POSTFIX}${EXTENSION}`.toLowerCase(),
    lqip: `data:image/${EXTENSION};base64,UklGRrwBAABXRUJQVlA4ILABAAAQCQCdASobAB4APm0wk0ckIqGhKAqogA2JZACdMoR1ZwS7ZjIPVy6NSXA4eN0C7Z+TNdc1ZkoZ/YJxrr2aj8EzDfZ4iS/hTiFYVfL/TdEiN0AA/vsxzPf4qMe52tfdLdTQ5o3N0Nj45XEShoEuVphaxocv4U4D1iYfXOx63GNyn7J/ZPjrgXy+ge5Xzz+TFrOaaS8cyzbpKYBsRB5fxK3l1AV13ySvH0crnfIasJlRvf+JVERGpmuLn6gaOPusp/mZvS34G+Ol3b6XlQ0aXvRbUv2fe7WF91y7vC4EIJ020KkAI8tfpW4NZiHreD43d3k3tq6Z1Fxust6KzBEjCjoxQ77Mf8KxlKjvOnZs7UOGXOJCxW9rC6/NTB8MtZweJFTwkY7hwSRSQbcIdKKQE3L2zpiyVEdusfvXoi9ZTY+fceZnv9TQDh2qUW50w032Fd7q/KwYOoTxpMzaIeB5I4S94EoIkRqba20GoDBWLtQvCt0HicEsgdfkKQf7HGhOdRRTaz2UKfA6b2DBO950kMnVr3FBTUzTkqNmPeb+gp2s5hfHqPz1EPC2EHTtCNyuAAA=`,
  },
  {
    name: 'Kairavi Pandya',
    role: 'Director of Technology',
    location: 'University of Texas at Dallas',
    email: 'pandyakairavi@gmail.com',
    linkedin: 'https://www.linkedin.com/in/kairavi-pandya/',
    headshot: `${PREFIX}kairavi-pandya${POSTFIX}${EXTENSION}`.toLowerCase(),
    lqip: `data:image/${EXTENSION};base64,UklGRn4BAABXRUJQVlA4IHIBAAAQBwCdASoUAB4APm0skkWkIqGYBABABsSygF2Zkl311NYyO1BTLvGtqBjOzDJkQVs3yco60UoD1PQAKDIpRBHaAAD+76f5feJPGVIUGfQ69n8PjlvMHzIlMi1wexwGozRqnsBF+D32dJQEYzkx8cErYdTPjec2PgKEXRaBNJ0I7LXzwTvl8VoDNKH7PmVD1+hrmUbPUxYgozajsX95nSWgYbY74G8nab2CDZbvV2SYaGjzj6+AzeJD+fAZDQ4kdvD4ua9s6stsbfvLxqEnP/VQB5m8wJ8zeUgGrNx6eApjiUSaIEMw2A3BzLCbu5i24pVoxkp0GJSdwdLNfeZIAFlqDOIIj9uPXvzPxDQGb1226FAgEy9eZKSP5Lb1KHm8n+MbngBisknVOLYc9MPM0tDK1r2Fhco3+STYOp9AlFxBnTUtT8QQ+O2frprp/qQJv5i7TnZd3WAPeDS1DWgvgFxkNTjo47wHZJur9ZlhAPR0AAAA`,
  },
  {
    name: 'Beatriz Perez',
    role: 'Director of Finance',
    location: 'Boston University',
    email: 'beap@bu.edu',
    linkedin: 'https://www.linkedin.com/in/beatrizp%C3%A9rez602/?originalSubdomain=pr',
    headshot: `${PREFIX}beatriz-perez${POSTFIX}${EXTENSION}`.toLowerCase(),
    lqip: `data:image/${EXTENSION};base64,UklGRmIBAABXRUJQVlA4IFYBAACwBgCdASoeAB4APm0wk0YkIyGhMAgAgA2JZgCw+iAF9EqOT6qrXfGFd394t+Ksn5TzkwnkwLruKu8Aao/sAAD+/YK475QYcJDaeLGG4VHz9OBum3+Ua/S5KoObnP/G//cbhyc+itaHBH8a86Rdfn6GkylXZksHVylnN8ehKjbjhfROqFf/PyFhd/zwKnq+yTpfPVlDbgEOt8ykukVQ+IKMPqGeojxVqadLd+eGbDUKDhFGv0TAekPjXFqhuoQK1O3OiobU45IpFoJjYIh21N/qAbvo3aKWWPHRMD0Twzfk9MszxmyUBl+DDF1cPH2gDfvMHk3TNdU8S3gwg84o+G497/RZfuiMfUY43XosTHI8BIC+nXkLHN8v5RZHb/5oidawYU1orx7Wc/phvYO/lXyOZDpys8qP0pL5iLFGMb6lIfC2tVIdxvmSVADixnOtt9WAWy8AAAA=`,
  },
  {
    name: 'Emily Jennett',
    role: 'Director of Branding and Marketing',
    location: 'University of Michigan',
    email: 'ejennett@umich.edu',
    linkedin:
      'https://www.linkedin.com/in/ejennett?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    headshot: `${PREFIX}emily-jennett${POSTFIX}${EXTENSION}`.toLowerCase(),
    lqip: `data:image/${EXTENSION};base64,UklGRsYBAABXRUJQVlA4ILoBAADwBwCdASoeAB4APm0okUWkIqGb+qwAQAbEsgBOmXG+QLgfUveD4YlgQQByGYCvSHTPd5Qe5Mrj4jW5BoZjRLwAWMp0+rYtNgAA/v1xqlZk7aJTI1YVTxWNIVPZTmWb7JD+vsav5jmSRSHqnHFoL/r2pYBRuPUs1cHSBv6Hp/NILopZAjh8Slri1Y3+quK5QQNlZuQq3Qe3+iw7eMDwGXCUrz1nvhgQQXaxksaooz/v7xGuIBDfliG4LiMvU54rP5k3VPyP7Ssjeu/rDlDAmNy9YNKEhpxBDsvcWOwoKLWGIobQ/zX8J1r9cFsjwVdBHP+fdsO1APNl45Wec7JEdOlQQzAcTLP06ETtdRTWqtZvxVZHDLYXNymCyJ7JybfopmPxYW/NFxyQ8Sa5hA8sHbNhjLolfELjjhI9Kz3Gms/M7jR5OReNYfRiOg+rpQ5BkATfUEyOdIJLBW3ozsCuqaZ+aEhf9sX2J0Qe5S2q4+gXofC4lp6Vqiksw5igeAPqltCxapOQhz6E+9pNv+XRKMuZtCD2Z1G0J+VWjejJwoaLentvoqYlqpzpYzGIkQk4OWFm/iHuczgSAAAA`,
  },
  {
    name: 'Makayla Tajalle',
    role: 'Director of Correspondence',
    location: 'Boston University',
    email: 'mtajalle@bu.edu',
    linkedin: 'https://www.linkedin.com/in/makayla-tajalle/',
    headshot: `${PREFIX}makayla-tajalle${POSTFIX}${EXTENSION}`.toLowerCase(),
    lqip: `data:image/${EXTENSION};base64,UklGRgYBAABXRUJQVlA4IPoAAADQBQCdASoUAB4APm0wlEckIqIhKAqogA2JYwDE2YvWd9Ts9ZzMoh5qamf8AoFI8UDfnrhBiogAAP75pzJDKhXYgck3ClF+Y4SBbBMsFv7pLWS6C+1Imz0mL0xxqs6hTmMOcw2YGk7oUj5xj4rAd4a7ru7Jt+ny8NduGqPNy/1Z10bCy/7WD6KRpUu09GUYNWvO3gCTAOAr1SQyfMMqKup9siZgjN9XBagllCf5+YNME3LaAPjQQ02KFnpnAzvsZqjuxHeeXcmYcxllqjZ0bIn7NCvpB2YiN9CgeLQC8Z9kJUMA+8kl6pEx7clXQvee7Irrianzw8/f+wAA`,
  },
  {
    name: 'Pranav Boopalam',
    role: 'Director of Outreach',
    location: 'University of Michigan',
    email: 'boopalam@umich.edu',
    linkedin: 'https://www.linkedin.com/in/pranav-boopalam',
    headshot: `${PREFIX}pranav-boopalam${POSTFIX}${EXTENSION}`.toLowerCase(),
    lqip: `data:image/${EXTENSION};base64,UklGRnQBAABXRUJQVlA4IGgBAACwBgCdASoeABwAPm0qk0WkIqGYDAYAQAbEsQBOgteuMDSXtGnr/9rAPaN5zKCp8HZFLm245NILMes/tS8rgAD+8KxcfqHdynlnkD+vIFXfxhWmpO6/MIfPTA9qyNPaLT9g/Rt/1aAdVfzwAQpgs/+mq59IHyCtO9awfT3+Hm+Z3U0VvjTHzxevizIlf9IaATxwsscxdL8a3oLWThB/XxiAuf1Z7w7fvGRkE3ncCE0OkUyveejibJVrN8TAq6pH//G4ifyBn80/YoSaO3czuWWgN1qAcjzybnftHq73Vs40Uk102kS2FWeGfNNl8bbsRcF/X/98R8n/GLNq17/m6/PauFfk+tCmTipzQ/3JdxFv3//vX/wq76v+Bh1CW0Q0esVuiy3e86pbI+ed6uRvqFnIllFlevzdlSUSd9Cq7Og8C0dkUHP9PwRjhwdnbbJ4O1zvYbl0J4KFkwLTNAUQ18A5JS6KrynsAAA=`,
  },
];

const inauguralBoardMember: InauguralBoardMemberProps = {
  name: 'Linda Tang',
  role: 'Director of Branding and Marketing',
  year: '2024',
};

export { boardMembers, inauguralBoardMember };
export type { BoardMemberProps, InauguralBoardMemberProps };
