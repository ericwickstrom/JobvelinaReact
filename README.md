# 🐗 Jobvelina 🐗

A job tracking application to help users manage and organize their job applications across multiple platforms.

## Overview

Jobvelina assists job seekers by providing a centralized place to track job applications, interview progress, and application status. The application will eventually incorporate AI features to automatically scrape emails and extract relevant job application information.

## Tech Stack

- **API**: .NET Core 8 - [JobvelinaAPI](https://github.com/ericwickstrom/JobvelinaAPI)
- **Web**: React - [JobvelinaReact](https://github.com/ericwickstrom/JobvelinaReact)
- **Mobile**: Coming later
- **Project Management**: Jira (Jobvelina project)
- **Development Environment**: Windows

## Features

### Current Features
- ✅ Job applications table with responsive design
- ✅ Add new job application form
- ✅ View, edit, and delete job applications
- ✅ Soft delete functionality (isDeleted flag)
- ✅ Toggle form visibility
- ✅ Application title with icon
- ✅ Column sorting

### Planned Features
- 🔄 API integration with .NET Core backend
- 🔄 AI-powered email scraping for automatic job application detection
- 🔄 Mobile application
- 🔄 Advanced filtering and search
- 🔄 Application status tracking and reminders
- 🔄 Interview scheduling integration

## Getting Started

### Prerequisites
- Node.js
- .NET Core 8 SDK (for API development)

### Installation

1. Clone the repositories:
```bash
git clone https://github.com/ericwickstrom/JobvelinaReact.git
git clone https://github.com/ericwickstrom/JobvelinaAPI.git
```

2. Install React dependencies:
```bash
cd JobvelinaReact
npm install
```

3. Start the React development server:
```bash
npm start
```

4. For API development:
```bash
cd JobvelinaAPI
dotnet restore
dotnet run
```

## Job Application Data Structure

Each job application includes:
- Company name
- Job title/position
- Platform (LinkedIn, Indeed, Company Website, etc.)
- Application date
- Last updated date
- Status (Applied, Under Review, Interview Scheduled, etc.)
- Notes/description
- Soft delete flag (isDeleted)

## Development Workflow

1. Create feature branches using Jira ticket format: `jvX/feature-name`
2. Follow existing code patterns and styling
3. Test responsive design on both desktop and mobile
4. Update Jira tickets as work progresses

## Contributing

This is a personal project. Development follows a one-step-at-a-time approach with clear, concise requirements.

## License

Private project - All rights reserved.