import { Task, User } from '../types';

export const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design Landing Page',
    description: 'Create a modern landing page for the new product launch',
    status: 'todo',
    deadline: '2025-01-25',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Implement Authentication',
    description: 'Set up user authentication system with JWT tokens',
    status: 'in-progress',
    deadline: '2025-01-22',
    createdAt: '2025-01-14T09:00:00Z',
    updatedAt: '2025-01-16T14:30:00Z',
    priority: 'high',
  },
  {
    id: '3',
    title: 'Write Unit Tests',
    description: 'Create comprehensive unit tests for the API endpoints',
    status: 'todo',
    deadline: '2025-01-28',
    createdAt: '2025-01-13T11:00:00Z',
    updatedAt: '2025-01-13T11:00:00Z',
    priority: 'medium',
  },
  {
    id: '4',
    title: 'Database Migration',
    description: 'Update database schema for new features',
    status: 'done',
    deadline: '2025-01-20',
    createdAt: '2025-01-10T08:00:00Z',
    updatedAt: '2025-01-18T16:45:00Z',
    priority: 'high',
  },
  {
    id: '5',
    title: 'Code Review',
    description: 'Review pull requests from team members',
    status: 'done',
    deadline: '2025-01-19',
    createdAt: '2025-01-12T13:00:00Z',
    updatedAt: '2025-01-19T10:15:00Z',
    priority: 'medium',
  },
  {
    id: '6',
    title: 'Deploy to Staging',
    description: 'Deploy latest changes to staging environment',
    status: 'in-progress',
    deadline: '2025-01-26',
    createdAt: '2025-01-16T15:00:00Z',
    updatedAt: '2025-01-16T15:00:00Z',
    priority: 'low',
  },
];