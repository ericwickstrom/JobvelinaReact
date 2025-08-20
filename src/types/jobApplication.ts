export enum JobApplicationStatus {
  APPLIED = "Applied",
  REJECTED = "Rejected",
  INTERVIEW_SCHEDULED = "Interview Scheduled",
  OFFER_RECEIVED = "Offer Received",
  WITHDRAWN = "Withdrawn",
  UNDER_REVIEW = "Under Review"
}

export interface JobApplication {
  id: string;
  company: string;
  jobTitle: string;
  platform: string;
  createDate: Date;
  modifiedDate: Date;
  status: JobApplicationStatus;
}