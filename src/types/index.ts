export type ApplicationStatus =
  | 'Applied'
  | 'Screening'
  | 'Interview'
  | 'Offer'
  | 'Rejected';

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  degree: string;
  graduationYear: number;
  skills: string[];
  status: ApplicationStatus;
  appliedDate: string;
  experience: string;
  linkedIn?: string;
  github?: string;
  portfolio?: string;
  avatar?: string;
  location: string;
  gpa?: string;
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Recruiter' | 'Viewer';
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export interface FilterState {
  search: string;
  status: ApplicationStatus | 'All';
  skills: string[];
  college: string;
  sortBy: 'name' | 'appliedDate' | 'status';
  sortOrder: 'asc' | 'desc';
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

export interface APIUser {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
  address: {
    city: string;
    street: string;
  };
  company: {
    name: string;
  };
}
