import React from 'react';
import type { JobApplication } from '../types/jobApplication';
import { JobApplicationStatus, getStatusDisplayText } from '../types/jobApplication';
import { JobApplicationsController } from '../services/jobApplicationsController';

interface JobApplicationsTableProps {
  jobApplications: JobApplication[];
}

const JobApplicationsTable: React.FC<JobApplicationsTableProps> = ({ jobApplications }) => {

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getStatusColor = (status: JobApplicationStatus): string => {
    switch (status) {
      case JobApplicationStatus.APPLIED:
        return 'bg-blue-100 text-blue-800';
      case JobApplicationStatus.UNDER_REVIEW:
        return 'bg-yellow-100 text-yellow-800';
      case JobApplicationStatus.INTERVIEW_SCHEDULED:
        return 'bg-purple-100 text-purple-800';
      case JobApplicationStatus.OFFER_RECEIVED:
        return 'bg-green-100 text-green-800';
      case JobApplicationStatus.REJECTED:
        return 'bg-red-100 text-red-800';
      case JobApplicationStatus.WITHDRAWN:
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (jobApplications.length === 0) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="text-gray-500 text-lg mb-2">No job applications found</div>
        <div className="text-gray-400 text-sm">
          You haven't submitted any job applications yet. Start your job search journey!
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Job Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Platform
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applied Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-left">
            {jobApplications.map((application: JobApplication) => (
              <tr key={application.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{application.company}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{application.jobTitle}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{application.platform}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{formatDate(application.createDate)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{formatDate(application.modifiedDate)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-left">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                    {getStatusDisplayText(application.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden">
        {jobApplications.map((application: JobApplication) => (
          <div key={application.id} className="border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors duration-150">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{application.company}</h3>
                <p className="text-sm text-gray-600">{application.jobTitle}</p>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                {application.status}
              </span>
            </div>
            <div className="space-y-1 text-sm text-gray-500">
              <div className="flex justify-between">
                <span className="font-medium">Platform:</span>
                <span>{application.platform}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Applied:</span>
                <span>{formatDate(application.createDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Updated:</span>
                <span>{formatDate(application.modifiedDate)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobApplicationsTable;