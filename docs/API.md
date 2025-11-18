# API Documentation

## GraphQL API

Base URL: `http://localhost:3001/graphql`

### Authentication

All authenticated requests require a Bearer token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Queries

### Authentication

#### Login/Register User

```graphql
mutation Login($clerkId: String!, $email: String!, $name: String) {
  login(clerkId: $clerkId, email: $email, name: $name)
}
```

**Variables:**
```json
{
  "clerkId": "user_xxxxxxxxxxxxx",
  "email": "user@example.com",
  "name": "John Doe"
}
```

**Response:**
```json
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Resume/CV Operations

#### Get User Resumes

```graphql
query GetUserResumes($userId: String!) {
  getUserResumes(userId: $userId)
}
```

#### Get Single Resume

```graphql
query GetResume($id: String!) {
  getResumeById(id: $id)
}
```

#### Create Resume

```graphql
mutation CreateResume($userId: String!, $title: String!, $content: String!) {
  createResume(userId: $userId, title: $title, content: $content)
}
```

#### Optimize Resume

```graphql
mutation OptimizeResume($resumeId: String!, $jobDescription: String) {
  optimizeResume(resumeId: $resumeId, jobDescription: $jobDescription)
}
```

**Example:**
```json
{
  "resumeId": "uuid-here",
  "jobDescription": "We are looking for a senior software engineer..."
}
```

### Job Applications

#### Get User Applications

```graphql
query GetApplications($userId: String!) {
  getUserApplications(userId: $userId)
}
```

#### Get Application Stats

```graphql
query GetStats($userId: String!) {
  getApplicationStats(userId: $userId)
}
```

#### Create Application

```graphql
mutation CreateApplication(
  $userId: String!
  $company: String!
  $position: String!
  $jobDescription: String
  $jobUrl: String
  $location: String
  $salary: String
  $resumeId: String
) {
  createApplication(
    userId: $userId
    company: $company
    position: $position
    jobDescription: $jobDescription
    jobUrl: $jobUrl
    location: $location
    salary: $salary
    resumeId: $resumeId
  )
}
```

#### Update Application Status

```graphql
mutation UpdateStatus($id: String!, $status: ApplicationStatus!) {
  updateApplicationStatus(id: $id, status: $status)
}
```

**Status Enum:** `APPLIED` | `INTERVIEW` | `OFFER` | `REJECTED` | `WITHDRAWN`

#### Delete Application

```graphql
mutation DeleteApplication($id: String!) {
  deleteApplication(id: $id)
}
```

### Cover Letters

#### Get User Cover Letters

```graphql
query GetCoverLetters($userId: String!) {
  getUserCoverLetters(userId: $userId)
}
```

#### Generate Cover Letter

```graphql
mutation GenerateCoverLetter(
  $userId: String!
  $resumeId: String!
  $jobDescription: String!
  $jobApplicationId: String
  $tone: String
) {
  generateCoverLetter(
    userId: $userId
    resumeId: $resumeId
    jobDescription: $jobDescription
    jobApplicationId: $jobApplicationId
    tone: $tone
  )
}
```

**Tone Options:** `professional` | `creative` | `casual`

### Interview Preparation

#### Get User Interview Preps

```graphql
query GetInterviewPreps($userId: String!) {
  getUserInterviewPreps(userId: $userId)
}
```

#### Generate Interview Prep

```graphql
mutation GenerateInterview($userId: String!, $jobApplicationId: String!) {
  generateInterviewPrep(userId: $userId, jobApplicationId: $jobApplicationId)
}
```

## REST API Endpoints (if needed)

### File Upload

```
POST /api/upload/resume
Content-Type: multipart/form-data

{
  "file": <file-data>
}
```

**Response:**
```json
{
  "url": "https://s3.amazonaws.com/...",
  "filename": "resume.pdf"
}
```

## Rate Limits

- Free Tier: 100 requests/hour
- Pro Tier: 1000 requests/hour
- Premium Tier: Unlimited

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Missing or invalid token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |

## Example Error Response

```json
{
  "errors": [
    {
      "message": "Resume not found",
      "extensions": {
        "code": "NOT_FOUND"
      }
    }
  ]
}
```

## Webhooks

### Stripe Webhook

```
POST /api/webhooks/stripe
Content-Type: application/json

{
  "type": "invoice.payment_succeeded",
  "data": { ... }
}
```

## SDK Examples

### JavaScript/TypeScript

```typescript
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${token}`,
  },
});

// Create resume
const CREATE_RESUME = gql`
  mutation CreateResume($userId: String!, $title: String!, $content: String!) {
    createResume(userId: $userId, title: $title, content: $content)
  }
`;

const { data } = await client.mutate({
  mutation: CREATE_RESUME,
  variables: {
    userId: 'user-id',
    title: 'My Resume',
    content: 'Resume content here...',
  },
});
```

### cURL Examples

```bash
# Login
curl -X POST http://localhost:3001/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { login(clerkId: \"user_123\", email: \"user@example.com\") }"
  }'

# Get resumes
curl -X POST http://localhost:3001/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "query": "query { getUserResumes(userId: \"user-id\") }"
  }'
```
