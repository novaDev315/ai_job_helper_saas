# Deployment Guide

## Overview

This guide covers deploying the AI Job Helper SaaS application to production.

## Architecture

- **Frontend**: Vercel
- **Backend**: AWS ECS Fargate / Railway / Render
- **Database**: AWS RDS PostgreSQL / Supabase
- **Cache**: AWS ElastiCache Redis
- **File Storage**: AWS S3
- **CDN**: CloudFlare

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Database migrations tested
- [ ] Third-party API keys validated
- [ ] SSL/TLS certificates ready
- [ ] Domain name configured
- [ ] Monitoring tools set up
- [ ] Backup strategy in place

## Frontend Deployment (Vercel)

### 1. Connect Repository

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd frontend
vercel
```

### 2. Configure Environment Variables

In Vercel Dashboard > Settings > Environment Variables:

```
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxx
CLERK_SECRET_KEY=sk_live_xxx
```

### 3. Set Custom Domain

1. Go to Vercel Dashboard > Domains
2. Add your custom domain
3. Configure DNS records as instructed

### 4. Configure Build Settings

- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

## Backend Deployment (Railway/Render)

### Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up
```

### Environment Variables

```
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://...
JWT_SECRET=your-production-secret
OPENAI_API_KEY=sk-xxx
STRIPE_SECRET_KEY=sk_live_xxx
FRONTEND_URL=https://yourdomain.com
```

### AWS ECS Fargate (Advanced)

#### 1. Create Dockerfile

```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

EXPOSE 3001

CMD ["npm", "run", "start:prod"]
```

#### 2. Build and Push Image

```bash
# Build image
docker build -t ai-job-helper-backend .

# Tag image
docker tag ai-job-helper-backend:latest <account-id>.dkr.ecr.<region>.amazonaws.com/ai-job-helper:latest

# Push to ECR
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <account-id>.dkr.ecr.<region>.amazonaws.com
docker push <account-id>.dkr.ecr.<region>.amazonaws.com/ai-job-helper:latest
```

#### 3. Create ECS Task Definition

```json
{
  "family": "ai-job-helper",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "containerDefinitions": [
    {
      "name": "backend",
      "image": "<account-id>.dkr.ecr.<region>.amazonaws.com/ai-job-helper:latest",
      "portMappings": [
        {
          "containerPort": 3001,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {"name": "NODE_ENV", "value": "production"}
      ],
      "secrets": [
        {"name": "DATABASE_URL", "valueFrom": "arn:aws:secretsmanager:..."}
      ]
    }
  ]
}
```

## Database Deployment

### AWS RDS PostgreSQL

1. Create RDS instance:
```bash
aws rds create-db-instance \
  --db-instance-identifier ai-job-helper-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username postgres \
  --master-user-password <password> \
  --allocated-storage 20
```

2. Run migrations:
```bash
DATABASE_URL="postgresql://..." npx prisma migrate deploy
```

### Supabase (Alternative)

1. Create project at [supabase.com](https://supabase.com)
2. Copy connection string
3. Update DATABASE_URL in environment variables
4. Run migrations

## Redis Cache (Optional)

### AWS ElastiCache

```bash
aws elasticache create-cache-cluster \
  --cache-cluster-id ai-job-helper-cache \
  --cache-node-type cache.t3.micro \
  --engine redis \
  --num-cache-nodes 1
```

## CDN Setup (CloudFlare)

1. Add site to CloudFlare
2. Update nameservers
3. Configure SSL/TLS to "Full (strict)"
4. Enable:
   - Auto minify (JS, CSS, HTML)
   - Brotli compression
   - HTTP/3
   - 0-RTT Connection

## Monitoring & Logging

### Sentry (Error Tracking)

```bash
npm install @sentry/nextjs @sentry/node

# Frontend: sentry.client.config.ts
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
});

# Backend: main.ts
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### Datadog (APM)

1. Install Datadog agent
2. Configure APM
3. Add tracing to application

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Railway
        run: |
          npm install -g @railway/cli
          railway up
```

## Post-Deployment

### 1. Database Seeding

```bash
npx prisma db seed
```

### 2. Health Checks

```bash
# Backend health
curl https://api.yourdomain.com/health

# Frontend health
curl https://yourdomain.com
```

### 3. Performance Testing

```bash
# Load testing
npx artillery quick --count 100 --num 10 https://yourdomain.com
```

### 4. Security Scan

```bash
npm audit
npm audit fix
```

## Rollback Strategy

### Vercel

```bash
# List deployments
vercel ls

# Rollback to previous deployment
vercel rollback <deployment-url>
```

### Railway

```bash
railway rollback
```

## Scaling

### Auto-scaling Configuration

- Frontend: Handled by Vercel automatically
- Backend: Configure auto-scaling in AWS ECS or Railway
- Database: Configure read replicas for heavy read loads
- Cache: Increase Redis memory as needed

## Backup Strategy

### Database Backups

```bash
# Daily automated backups
aws rds create-db-snapshot \
  --db-instance-identifier ai-job-helper-db \
  --db-snapshot-identifier backup-$(date +%Y%m%d)
```

### File Storage Backups

Enable S3 versioning and lifecycle policies.

## Troubleshooting

### Issue: 502 Bad Gateway

- Check backend health endpoint
- Verify environment variables
- Check database connection

### Issue: High Latency

- Enable CDN caching
- Optimize database queries
- Add Redis caching layer
- Enable compression

### Issue: Out of Memory

- Increase container memory
- Optimize code for memory usage
- Add memory monitoring

## Cost Optimization

- Use CDN caching to reduce server load
- Implement database connection pooling
- Use reserved instances for predictable workloads
- Monitor and optimize OpenAI API usage
- Implement request caching

## Security Checklist

- [ ] HTTPS enabled everywhere
- [ ] Environment variables in secure storage
- [ ] Database encrypted at rest
- [ ] Regular security updates
- [ ] Rate limiting implemented
- [ ] Input validation on all endpoints
- [ ] CORS configured properly
- [ ] Secrets rotation enabled

## Support

For deployment issues:
- Check deployment logs
- Review error monitoring (Sentry)
- Contact: devops@aijobhelper.com
