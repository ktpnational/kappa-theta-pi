# Kappa Theta Pi - National Website

A professional technology fraternity website built with modern web technologies.

## 🚀 Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js
- **Styling:** Tailwind CSS
- **Components:** Radix UI
- **State Management:** Zustand
- **Testing:** Vitest, Playwright
- **API:** Elysia
- **Deployment:** Vercel
- **Other Tools:** Supabase, Biome, ContentLayer

## 🛠️ Prerequisites

- Node.js 20+
- Bun 1.1.28+
- PostgreSQL
- Supabase CLI

## 🏃‍♂️ Getting Started

1. Clone the repository:
```bash
git clone https://github.com/ktpnational/kappa-theta-pi.git
cd kappa-theta-pi
```

2. Install dependencies:
```bash
bun install
```

3. Set up your environment variables:
```bash
cp .env.example .env
```

Required environment variables:
- `NEXT_PUBLIC_DATABASE_URL`: Your PostgreSQL connection string
- `NEXT_PUBLIC_DIRECT_URL`: Direct URL to your database
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL

4. Set up the database:
```bash
bun run db:gen
```

5. Start the development server:
```bash
bun run dev
```

## 📝 Available Scripts

```typescript:package.json
startLine: 74
endLine: 111
```

## 🗄️ Database Schema

The application uses a multi-schema PostgreSQL database with Prisma:
- `next_auth`: Authentication-related tables
- `public`: Application data tables

See the complete schema:
```typescript:prisma/schema.prisma
startLine: 1
endLine: 105
```

## 🧪 Testing

- Unit/Integration Tests: `bun test`
- E2E Tests: `bun run e2e:ci`
- Type Checking: `bun run type`

## 📦 Docker

A Dockerfile is provided for containerized deployment. Build and run:

```bash
docker build -t ktp-national .
docker run -p 3000:3000 ktp-national
```

## 🔧 Development Tools

- **Code Quality:**
  - Biome for linting/formatting
  - TypeScript for type safety
  - Commitlint for commit message consistency

- **Performance:**
  - Million.js for React optimization
  - Next.js built-in optimizations
  - PWA support

## 📚 Documentation

For more detailed documentation about specific features:

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Run the linting and type checks:
```bash
bun run check
```
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
