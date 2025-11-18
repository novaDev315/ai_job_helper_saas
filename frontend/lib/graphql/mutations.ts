import { gql } from '@apollo/client';

export const CREATE_RESUME = gql`
  mutation CreateResume($userId: String!, $title: String!, $content: String!) {
    createResume(userId: $userId, title: $title, content: $content)
  }
`;

export const OPTIMIZE_RESUME = gql`
  mutation OptimizeResume($resumeId: String!, $jobDescription: String) {
    optimizeResume(resumeId: $resumeId, jobDescription: $jobDescription)
  }
`;

export const CREATE_APPLICATION = gql`
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
`;

export const UPDATE_APPLICATION_STATUS = gql`
  mutation UpdateApplicationStatus($id: String!, $status: ApplicationStatus!) {
    updateApplicationStatus(id: $id, status: $status)
  }
`;

export const DELETE_APPLICATION = gql`
  mutation DeleteApplication($id: String!) {
    deleteApplication(id: $id)
  }
`;

export const GENERATE_COVER_LETTER = gql`
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
`;

export const GENERATE_INTERVIEW_PREP = gql`
  mutation GenerateInterviewPrep($userId: String!, $jobApplicationId: String!) {
    generateInterviewPrep(userId: $userId, jobApplicationId: $jobApplicationId)
  }
`;

export const LOGIN = gql`
  mutation Login($clerkId: String!, $email: String!, $name: String) {
    login(clerkId: $clerkId, email: $email, name: $name)
  }
`;
