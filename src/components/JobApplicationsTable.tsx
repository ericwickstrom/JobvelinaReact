import React, { useState } from 'react';
import type { JobApplication } from '../types/jobApplication';
import { JobApplicationStatus, getStatusDisplayText } from '../types/jobApplication';
import { JobApplicationsController } from '../services/jobApplicationsController';

interface JobApplicationsTableProps {
  jobApplications: JobApplication[];
  onUpdate: (updatedApplication: JobApplication) => void;
}

const JobApplicationsTable: React.FC<JobApplicationsTableProps> = ({ jobApplications, onUpdate }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<JobApplication>>({});
  const [showInfoModal, setShowInfoModal] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

  // Filter out deleted applications
  const visibleApplications = jobApplications.filter(app => !app.isDeleted);

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

  const platformOptions = [
    'LinkedIn',
    'Indeed',
    'Company Website',
    'Glassdoor',
    'AngelList',
    'Stack Overflow Jobs',
    'Monster',
    'ZipRecruiter',
    'Other'
  ];

  const handleEdit = (application: JobApplication) => {
    setEditingId(application.id);
    setEditData({
      company: application.company,
      jobTitle: application.jobTitle,
      platform: application.platform,
      status: application.status,
      notes: application.notes || ''
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleSaveEdit = () => {
    if (!editingId) return;
    
    const updatedApplication = JobApplicationsController.updateJobApplication(editingId, editData);
    if (updatedApplication) {
      onUpdate(updatedApplication);
      setEditingId(null);
      setEditData({});
    }
  };

  const handleDelete = (id: string) => {
    const success = JobApplicationsController.deleteJobApplication(id);
    if (success) {
      const deletedApplication = JobApplicationsController.getJobApplicationById(id);
      if (deletedApplication) {
        onUpdate(deletedApplication);
      }
    }
    setShowDeleteModal(null);
  };

  const getInfoModalData = () => {
    if (!showInfoModal) return null;
    return jobApplications.find(app => app.id === showInfoModal);
  };

  const getDeleteModalData = () => {
    if (!showDeleteModal) return null;
    return jobApplications.find(app => app.id === showDeleteModal);
  };

  if (visibleApplications.length === 0) {
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-left">
            {visibleApplications.map((application: JobApplication) => {
              const isEditing = editingId === application.id;
              
              return (
                <React.Fragment key={application.id}>
                  <tr className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.company || ''}
                          onChange={(e) => setEditData({ ...editData, company: e.target.value })}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <div className="text-sm font-medium text-gray-900">{application.company}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.jobTitle || ''}
                          onChange={(e) => setEditData({ ...editData, jobTitle: e.target.value })}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <div className="text-sm text-gray-900">{application.jobTitle}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <select
                          value={editData.platform || ''}
                          onChange={(e) => setEditData({ ...editData, platform: e.target.value })}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {platformOptions.map((platform) => (
                            <option key={platform} value={platform}>
                              {platform}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div className="text-sm text-gray-500">{application.platform}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{formatDate(application.createDate)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{formatDate(application.modifiedDate)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left">
                      {isEditing ? (
                        <select
                          value={editData.status?.toString() || ''}
                          onChange={(e) => setEditData({ ...editData, status: parseInt(e.target.value) as JobApplicationStatus })}
                          className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {Object.entries(JobApplicationStatus).map(([key, value]) => (
                            <option key={key} value={value}>
                              {getStatusDisplayText(value)}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                          {getStatusDisplayText(application.status)}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left">
                      {isEditing ? (
                        <div className="flex gap-2">
                          <button
                            onClick={handleSaveEdit}
                            className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-1">
                          <button
                            onClick={() => setShowInfoModal(application.id)}
                            title="View details"
                            className="inline-flex items-center p-1 text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleEdit(application)}
                            title="Edit"
                            className="inline-flex items-center p-1 text-yellow-600 hover:text-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => setShowDeleteModal(application.id)}
                            title="Delete"
                            className="inline-flex items-center p-1 text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                  {/* Notes Edit Row - Only show when editing this specific row */}
                  {isEditing && (
                    <tr className="bg-gray-50">
                      <td colSpan={7} className="px-6 py-4">
                        <div>
                          <label htmlFor={`notes-${application.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                            Notes
                          </label>
                          <textarea
                            id={`notes-${application.id}`}
                            value={editData.notes || ''}
                            onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Add any additional notes about this job application..."
                          />
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden">
        {visibleApplications.map((application: JobApplication) => (
          <div key={application.id} className="border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors duration-150">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{application.company}</h3>
                <p className="text-sm text-gray-600">{application.jobTitle}</p>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                {getStatusDisplayText(application.status)}
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
            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={() => setShowInfoModal(application.id)}
                className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Info
              </button>
              <button
                onClick={() => handleEdit(application)}
                className="inline-flex items-center px-2 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 rounded hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => setShowDeleteModal(application.id)}
                className="inline-flex items-center px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Info Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Job Application Details</h3>
                <button
                  onClick={() => setShowInfoModal(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {(() => {
                const info = getInfoModalData();
                if (!info) return null;
                return (
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Company:</span>
                      <span className="ml-2 text-gray-900">{info.company}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Job Title:</span>
                      <span className="ml-2 text-gray-900">{info.jobTitle}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Platform:</span>
                      <span className="ml-2 text-gray-900">{info.platform}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Applied Date:</span>
                      <span className="ml-2 text-gray-900">{formatDate(info.createDate)}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Last Updated:</span>
                      <span className="ml-2 text-gray-900">{formatDate(info.modifiedDate)}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Status:</span>
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(info.status)}`}>
                        {getStatusDisplayText(info.status)}
                      </span>
                    </div>
                    {info.notes && (
                      <div>
                        <span className="font-medium text-gray-700">Notes:</span>
                        <div className="ml-2 mt-1 p-2 bg-gray-50 rounded text-gray-900">
                          {info.notes}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mt-4">Delete Job Application</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this job application for{' '}
                  <span className="font-medium">{getDeleteModalData()?.company}</span>?
                  This action cannot be undone.
                </p>
              </div>
              <div className="flex gap-3 justify-center mt-4">
                <button
                  onClick={() => setShowDeleteModal(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => showDeleteModal && handleDelete(showDeleteModal)}
                  className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobApplicationsTable;