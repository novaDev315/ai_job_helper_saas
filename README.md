# AI Job Helper SaaS Platform

AI-powered job application assistant that helps job seekers optimize CVs, generate cover letters, track applications, and prepare for interviews.

## Features

- 🤖 AI-powered CV optimization with ATS scoring
- 📝 Job-specific CV tailoring
- ✍️ AI cover letter generation
- 📊 Application tracking dashboard
- 🎯 Interview preparation assistant
- 💳 Subscription-based pricing (Free, Pro, Premium, Enterprise)

## Tech Stack

### Frontend
- Next.js 14+ (App Router)
- TypeScript 5.0+
- Tailwind CSS 3.4+
- Shadcn/ui + Radix UI
- Zustand (State Management)
- React Hook Form + Zod

### Backend
- NestJS 10+
- TypeScript 5.0+
- GraphQL (Apollo Server)
- PostgreSQL 15+ with Prisma ORM
- Redis 7+
- BullMQ

### AI/ML
- OpenAI GPT-4 / Claude 3.5
- LangChain

### Third-party Services
- Clerk (Authentication)
- Stripe (Payments)
- SendGrid (Email)
- AWS S3 (File Storage)

## Getting Started

### Prerequisites

- Node.js 20+ LTS
- PostgreSQL 15+
- Redis 7+
- npm 10+

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai_job_helper_saas
```

2. Install dependencies:
```bash
npm install
cd frontend && npm install
cd ../backend && npm install
cd ..
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Set up the database:
```bash
cd backend
npx prisma generate
npx prisma migrate dev
cd ..
```

5. Start the development servers:
```bash
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- GraphQL Playground: http://localhost:3001/graphql

## Project Structure

```
ai_job_helper_saas/
├── frontend/          # Next.js application
├── backend/           # NestJS API
├── shared/            # Shared types and utilities
├── docs/              # Documentation
└── package.json       # Root package.json
```

## Development

### Running Tests
```bash
npm run test
```

### Linting
```bash
npm run lint
```

### Formatting
```bash
npm run format
```

### Building for Production
```bash
npm run build
```

## Deployment

- Frontend: Vercel
- Backend: AWS ECS Fargate
- Database: AWS RDS (PostgreSQL)
- Cache: AWS ElastiCache (Redis)

## License

Proprietary - All rights reserved

## Support

For issues and questions, please contact support@aijobhelper.com
