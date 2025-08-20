import type { JobApplication } from '../types/jobApplication';
import { JobApplicationStatus, getStatusDisplayText, getStatusFromInt } from '../types/jobApplication';

export class JobApplicationsController {
  private static mockData: JobApplication[] = [
    {
      id: "1",
      company: "Google",
      jobTitle: "Senior Software Engineer",
      platform: "LinkedIn",
      createDate: new Date("2024-01-15"),
      modifiedDate: new Date("2024-01-20"),
      status: JobApplicationStatus.UNDER_REVIEW
    },
    {
      id: "2",
      company: "Microsoft",
      jobTitle: "Frontend Developer",
      platform: "Indeed",
      createDate: new Date("2024-01-10"),
      modifiedDate: new Date("2024-01-25"),
      status: JobApplicationStatus.INTERVIEW_SCHEDULED
    },
    {
      id: "3",
      company: "Amazon",
      jobTitle: "Full Stack Developer",
      platform: "Company Website",
      createDate: new Date("2024-01-08"),
      modifiedDate: new Date("2024-01-22"),
      status: JobApplicationStatus.REJECTED
    },
    {
      id: "4",
      company: "Meta",
      jobTitle: "React Developer",
      platform: "Glassdoor",
      createDate: new Date("2024-01-12"),
      modifiedDate: new Date("2024-01-28"),
      status: JobApplicationStatus.OFFER_RECEIVED
    },
    {
      id: "5",
      company: "Netflix",
      jobTitle: "UI/UX Engineer",
      platform: "LinkedIn",
      createDate: new Date("2024-01-18"),
      modifiedDate: new Date("2024-01-18"),
      status: JobApplicationStatus.APPLIED
    },
    {
      id: "6",
      company: "Spotify",
      jobTitle: "Software Engineer",
      platform: "Company Website",
      createDate: new Date("2024-01-20"),
      modifiedDate: new Date("2024-02-01"),
      status: JobApplicationStatus.UNDER_REVIEW
    },
    {
      id: "7",
      company: "Airbnb",
      jobTitle: "Frontend Engineer",
      platform: "AngelList",
      createDate: new Date("2024-01-14"),
      modifiedDate: new Date("2024-01-30"),
      status: JobApplicationStatus.INTERVIEW_SCHEDULED
    },
    {
      id: "8",
      company: "Uber",
      jobTitle: "Senior React Developer",
      platform: "Indeed",
      createDate: new Date("2024-01-16"),
      modifiedDate: new Date("2024-01-16"),
      status: JobApplicationStatus.APPLIED
    },
    {
      id: "9",
      company: "Tesla",
      jobTitle: "Web Developer",
      platform: "Company Website",
      createDate: new Date("2024-01-22"),
      modifiedDate: new Date("2024-02-02"),
      status: JobApplicationStatus.WITHDRAWN
    },
    {
      id: "10",
      company: "Apple",
      jobTitle: "iOS Developer",
      platform: "LinkedIn",
      createDate: new Date("2024-01-11"),
      modifiedDate: new Date("2024-01-26"),
      status: JobApplicationStatus.REJECTED
    },
    {
      id: "11",
      company: "Shopify",
      jobTitle: "Full Stack Engineer",
      platform: "Glassdoor",
      createDate: new Date("2024-01-19"),
      modifiedDate: new Date("2024-02-03"),
      status: JobApplicationStatus.UNDER_REVIEW
    },
    {
      id: "12",
      company: "Slack",
      jobTitle: "JavaScript Developer",
      platform: "Stack Overflow Jobs",
      createDate: new Date("2024-01-13"),
      modifiedDate: new Date("2024-01-27"),
      status: JobApplicationStatus.INTERVIEW_SCHEDULED
    },
    {
      id: "13",
      company: "Stripe",
      jobTitle: "Payment Systems Engineer",
      platform: "Company Website",
      createDate: new Date("2024-01-17"),
      modifiedDate: new Date("2024-01-29"),
      status: JobApplicationStatus.APPLIED
    },
    {
      id: "14",
      company: "Zoom",
      jobTitle: "Frontend Software Engineer",
      platform: "LinkedIn",
      createDate: new Date("2024-01-21"),
      modifiedDate: new Date("2024-02-04"),
      status: JobApplicationStatus.UNDER_REVIEW
    },
    {
      id: "15",
      company: "Dropbox",
      jobTitle: "Senior Frontend Developer",
      platform: "Indeed",
      createDate: new Date("2024-01-09"),
      modifiedDate: new Date("2024-01-24"),
      status: JobApplicationStatus.OFFER_RECEIVED
    }
  ];

  public static getAllJobApplications(): JobApplication[] {
    return this.mockData;
  }
}