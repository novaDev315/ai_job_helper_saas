# AI Job Helper SaaS - Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v20+ LTS
- **PostgreSQL**: v15+
- **Redis**: v7+ (optional for MVP, required for production)
- **npm**: v10+

## Initial Setup

### 1. Clone and Install Dependencies

```bash
cd ai_job_helper_saas
npm install
cd frontend && npm install
cd ../backend && npm install
cd ..
```

### 2. Environment Configuration

#### Frontend (.env.local)

Create `/frontend/.env.local`:

```bash
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

#### Backend (.env)

Create `/backend/.env`:

```bash
# Application
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000

# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/ai_job_helper?schema=public"

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# OpenAI
OPENAI_API_KEY=sk-your-openai-api-key

# Anthropic (optional)
ANTHROPIC_API_KEY=sk-ant-your-anthropic-api-key

# Redis (optional for MVP)
REDIS_URL=redis://localhost:6379

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# SendGrid (optional for MVP)
SENDGRID_API_KEY=SG.your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@yourdomain.com

# AWS S3 (optional, use local storage for development)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=ai-job-helper-files
```

### 3. Database Setup

#### Create PostgreSQL Database

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE ai_job_helper;

# Exit psql
\q
```

#### Run Prisma Migrations

```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

#### (Optional) Seed Database

```bash
npx prisma db seed
```

### 4. Third-Party Services Setup

#### Clerk Authentication

1. Sign up at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy the API keys to your frontend `.env.local`
4. Configure sign-in/sign-up settings in Clerk dashboard

#### OpenAI API

1. Sign up at [platform.openai.com](https://platform.openai.com)
2. Generate an API key
3. Add to backend `.env`
4. Set up billing (pay-as-you-go)

#### Stripe (for payments)

1. Sign up at [stripe.com](https://stripe.com)
2. Get test API keys from dashboard
3. Add to backend `.env`
4. Create products and pricing in Stripe dashboard:
   - Free tier: $0/month
   - Pro tier: $29/month
   - Premium tier: $49/month

#### SendGrid (for emails) - Optional for MVP

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Verify sender email
3. Generate API key
4. Add to backend `.env`

## Running the Application

### Development Mode

#### Option 1: Run Everything Together

From the root directory:

```bash
npm run dev
```

This will start:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- GraphQL Playground: http://localhost:3001/graphql

#### Option 2: Run Separately

**Terminal 1 - Frontend:**
```bash
cd frontend
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd backend
npm run start:dev
```

### Production Build

```bash
# Build frontend
cd frontend
npm run build

# Build backend
cd backend
npm run build

# Start production servers
cd frontend && npm start
cd backend && npm run start:prod
```

## Database Management

### Prisma Studio (Database GUI)

```bash
cd backend
npx prisma studio
```

Access at: http://localhost:5555

### Create New Migration

```bash
cd backend
npx prisma migrate dev --name migration_name
```

### Reset Database

```bash
cd backend
npx prisma migrate reset
```

## Testing

### Frontend Tests

```bash
cd frontend
npm test
```

### Backend Tests

```bash
cd backend
npm test
```

### End-to-End Tests

```bash
npm run test:e2e
```

## Common Issues & Troubleshooting

### Issue: Database Connection Error

**Solution:**
- Ensure PostgreSQL is running
- Check DATABASE_URL in `.env`
- Verify database exists: `psql -U postgres -l`

### Issue: Frontend Can't Connect to Backend

**Solution:**
- Check NEXT_PUBLIC_API_URL in frontend `.env.local`
- Ensure backend is running on port 3001
- Check CORS settings in backend

### Issue: OpenAI API Errors

**Solution:**
- Verify API key is correct
- Check billing is set up on OpenAI account
- Ensure you have available credits

### Issue: Clerk Authentication Not Working

**Solution:**
- Verify all Clerk environment variables are set
- Check Clerk dashboard for application status
- Ensure URLs match in Clerk dashboard and `.env.local`

## Development Workflow

1. **Create a new feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes and test:**
   ```bash
   npm run dev
   npm run lint
   npm test
   ```

3. **Commit and push:**
   ```bash
   git add .
   git commit -m "Add: your feature description"
   git push origin feature/your-feature-name
   ```

4. **Create pull request**

## Deployment

### Vercel (Frontend)

1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Deploy

### AWS/Railway/Render (Backend)

1. Create new project
2. Connect GitHub repository
3. Set environment variables
4. Configure build command: `npm run build`
5. Configure start command: `npm run start:prod`
6. Deploy

### Database (AWS RDS or Supabase)

1. Create PostgreSQL instance
2. Update DATABASE_URL in production `.env`
3. Run migrations: `npx prisma migrate deploy`

## Next Steps

- [ ] Configure Stripe webhook endpoints
- [ ] Set up email templates in SendGrid
- [ ] Configure file upload to S3
- [ ] Set up monitoring (Sentry, Datadog)
- [ ] Configure CI/CD pipeline
- [ ] Set up staging environment
- [ ] Implement rate limiting
- [ ] Add logging system

## Support

For questions or issues:
- Check documentation in `/docs`
- Review GitHub issues
- Contact: support@aijobhelper.com
