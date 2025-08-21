export enum JobApplicationStatus {
  APPLIED = 0,
  REJECTED = 1,
  INTERVIEW_SCHEDULED = 2,
  OFFER_RECEIVED = 3,
  WITHDRAWN = 4,
  UNDER_REVIEW = 5
}

export interface JobApplication {
  id: string;
  company: string;
  jobTitle: string;
  platform: string;
  createDate: Date;
  modifiedDate: Date;
  status: JobApplicationStatus;
  notes?: string;
}

export function getStatusDisplayText(status: JobApplicationStatus): string {
  switch (status) {
    case JobApplicationStatus.APPLIED:
      return "Applied";
    case JobApplicationStatus.REJECTED:
      return "Rejected";
    case JobApplicationStatus.INTERVIEW_SCHEDULED:
      return "Interview Scheduled";
    case JobApplicationStatus.OFFER_RECEIVED:
      return "Offer Received";
    case JobApplicationStatus.WITHDRAWN:
      return "Withdrawn";
    case JobApplicationStatus.UNDER_REVIEW:
      return "Under Review";
    default:
      return "Unknown";
  }
}

export function getStatusFromInt(value: number): JobApplicationStatus {
  if (Object.values(JobApplicationStatus).includes(value)) {
    return value as JobApplicationStatus;
  }
  throw new Error(`Invalid status value: ${value}`);
}