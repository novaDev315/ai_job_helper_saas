import { gql } from '@apollo/client';

export const GET_USER_RESUMES = gql`
  query GetUserResumes($userId: String!) {
    getUserResumes(userId: $userId)
  }
`;

export const GET_RESUME = gql`
  query GetResume($id: String!) {
    getResumeById(id: $id)
  }
`;

export const GET_USER_APPLICATIONS = gql`
  query GetUserApplications($userId: String!) {
    getUserApplications(userId: $userId)
  }
`;

export const GET_APPLICATION = gql`
  query GetApplication($id: String!) {
    getApplication(id: $id)
  }
`;

export const GET_APPLICATION_STATS = gql`
  query GetApplicationStats($userId: String!) {
    getApplicationStats(userId: $userId)
  }
`;

export const GET_USER_COVER_LETTERS = gql`
  query GetUserCoverLetters($userId: String!) {
    getUserCoverLetters(userId: $userId)
  }
`;

export const GET_USER_INTERVIEW_PREPS = gql`
  query GetUserInterviewPreps($userId: String!) {
    getUserInterviewPreps(userId: $userId)
  }
`;
