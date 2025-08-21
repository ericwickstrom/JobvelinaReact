import React, { useState } from 'react';
import { JobApplicationStatus, getStatusDisplayText } from '../types/jobApplication';
import { JobApplicationsController } from '../services/jobApplicationsController';

interface FormData {
  company: string;
  jobTitle: string;
  platform: string;
  appliedDate: string;
  status: JobApplicationStatus;
  notes: string;
}

interface FormErrors {
  company?: string;
  jobTitle?: string;
  platform?: string;
}

interface JobApplicationFormProps {
  onApplicationAdded: () => void;
  onClose: () => void;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ onApplicationAdded, onClose }) => {
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState<FormData>({
    company: '',
    jobTitle: '',
    platform: '',
    appliedDate: getTodayDate(),
    status: JobApplicationStatus.APPLIED,
    notes: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = 'Job title is required';
    }

    if (!formData.platform) {
      newErrors.platform = 'Platform is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const applicationData = {
        company: formData.company.trim(),
        jobTitle: formData.jobTitle.trim(),
        platform: formData.platform,
        appliedDate: formData.appliedDate,
        status: formData.status,
        notes: formData.notes.trim() || undefined
      };

      JobApplicationsController.addJobApplication(applicationData);
      onApplicationAdded();
      
      // Reset form for next use
      setFormData({
        company: '',
        jobTitle: '',
        platform: '',
        appliedDate: getTodayDate(),
        status: JobApplicationStatus.APPLIED,
        notes: ''
      });
      setErrors({});
      
      // Close modal after successful submission with small delay
      setTimeout(() => {
        onClose();
      }, 100);
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | JobApplicationStatus) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    
    // Clear submit status when user makes changes
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border max-w-6xl shadow-lg rounded-md bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Add New Job Application</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Fields Row */}
        <div className="grid grid-cols-11 gap-2 w-full">
          {/* Company Field */}
          <div className="col-span-2">
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2 text-left">
              Company <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="company"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-[42px] ${
                errors.company ? 'border-red-500' : ''
              }`}
              placeholder="Company"
            />
            {errors.company && (
              <p className="mt-1 text-sm text-red-600">{errors.company}</p>
            )}
          </div>

          {/* Job Title Field */}
          <div className="col-span-2">
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-2 text-left">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="jobTitle"
              value={formData.jobTitle}
              onChange={(e) => handleInputChange('jobTitle', e.target.value)}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-[42px] ${
                errors.jobTitle ? 'border-red-500' : ''
              }`}
              placeholder="Job Title"
            />
            {errors.jobTitle && (
              <p className="mt-1 text-sm text-red-600">{errors.jobTitle}</p>
            )}
          </div>

          {/* Platform Dropdown */}
          <div className="col-span-2">
            <label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-2 text-left">
              Platform <span className="text-red-500">*</span>
            </label>
            <select
              id="platform"
              value={formData.platform}
              onChange={(e) => handleInputChange('platform', e.target.value)}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-[42px] ${
                errors.platform ? 'border-red-500' : ''
              }`}
            >
              <option value="">Select a platform</option>
              {platformOptions.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
            {errors.platform && (
              <p className="mt-1 text-sm text-red-600">{errors.platform}</p>
            )}
          </div>

          {/* Applied Date Field */}
          <div className="col-span-2">
            <label htmlFor="appliedDate" className="block text-sm font-medium text-gray-700 mb-2 text-left">
              Applied Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="appliedDate"
              value={formData.appliedDate}
              onChange={(e) => handleInputChange('appliedDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-[42px]"
            />
          </div>

          {/* Status Dropdown */}
          <div className="col-span-2">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2 text-left">
              Status
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => handleInputChange('status', parseInt(e.target.value) as JobApplicationStatus)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-[42px]"
            >
              {Object.entries(JobApplicationStatus).map(([key, value]) => (
                <option key={key} value={value}>
                  {getStatusDisplayText(value)}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="col-span-1 flex flex-col justify-end">
            <div className="block text-sm font-medium text-gray-700 mb-2 text-left opacity-0">Actions</div>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={onClose}
                title="Cancel"
                className="flex-1 inline-flex items-center justify-center px-2 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 h-[42px]"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                title="Add job application"
                className={`flex-1 inline-flex items-center justify-center px-2 py-2 text-lg font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 h-[42px] ${
                  isSubmitting
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? (
                  '...'
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Notes Textarea - Always Visible */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2 text-left">
            Notes
          </label>
          <textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Add any additional notes about this job application..."
          />
        </div>

        </form>
      </div>
    </div>
  );
};

export default JobApplicationForm;