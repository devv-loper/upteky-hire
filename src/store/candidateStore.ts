import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Candidate, ApplicationStatus, FilterState } from '@/types';

const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: '1', name: 'Aarav Sharma', email: 'aarav.sharma@email.com', phone: '+91 98765 43210',
    college: 'IIT Bombay', degree: 'B.Tech Computer Science', graduationYear: 2024,
    skills: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'AWS'],
    status: 'Interview', appliedDate: '2024-01-15', experience: 'Fresher',
    linkedIn: 'https://linkedin.com', github: 'https://github.com',
    location: 'Mumbai, India', gpa: '9.2', notes: 'Strong problem solver.',
  },
  {
    id: '2', name: 'Priya Patel', email: 'priya.patel@email.com', phone: '+91 87654 32109',
    college: 'BITS Pilani', degree: 'B.E. Computer Science', graduationYear: 2024,
    skills: ['Python', 'Django', 'React', 'PostgreSQL', 'Docker'],
    status: 'Screening', appliedDate: '2024-01-18', experience: '1 year',
    linkedIn: 'https://linkedin.com', github: 'https://github.com',
    location: 'Pune, India', gpa: '8.9',
  },
  {
    id: '3', name: 'Rohan Mehta', email: 'rohan.mehta@email.com', phone: '+91 76543 21098',
    college: 'NIT Trichy', degree: 'B.Tech IT', graduationYear: 2025,
    skills: ['Java', 'Spring Boot', 'Angular', 'MySQL', 'Jenkins'],
    status: 'Applied', appliedDate: '2024-01-20', experience: 'Fresher',
    location: 'Chennai, India', gpa: '8.5',
  },
  {
    id: '4', name: 'Ananya Singh', email: 'ananya.singh@email.com', phone: '+91 65432 10987',
    college: 'Delhi University', degree: 'B.Sc Computer Science', graduationYear: 2024,
    skills: ['Vue.js', 'JavaScript', 'PHP', 'Laravel', 'Redis'],
    status: 'Offer', appliedDate: '2024-01-10', experience: '2 years',
    linkedIn: 'https://linkedin.com', portfolio: 'https://ananya.dev',
    location: 'Delhi, India', gpa: '8.7',
  },
  {
    id: '5', name: 'Vikram Nair', email: 'vikram.nair@email.com', phone: '+91 54321 09876',
    college: 'VIT Vellore', degree: 'B.Tech CSE', graduationYear: 2023,
    skills: ['React Native', 'Redux', 'GraphQL', 'Firebase', 'Swift'],
    status: 'Rejected', appliedDate: '2024-01-05', experience: '6 months',
    github: 'https://github.com', location: 'Bangalore, India', gpa: '7.8',
  },
  {
    id: '6', name: 'Kavya Reddy', email: 'kavya.reddy@email.com', phone: '+91 43210 98765',
    college: 'IIIT Hyderabad', degree: 'B.Tech CSE', graduationYear: 2024,
    skills: ['Next.js', 'Tailwind CSS', 'Prisma', 'tRPC', 'Vercel'],
    status: 'Interview', appliedDate: '2024-01-22', experience: 'Fresher',
    linkedIn: 'https://linkedin.com', github: 'https://github.com', portfolio: 'https://kavya.io',
    location: 'Hyderabad, India', gpa: '9.5',
  },
  {
    id: '7', name: 'Arjun Kumar', email: 'arjun.kumar@email.com', phone: '+91 32109 87654',
    college: 'IIT Delhi', degree: 'B.Tech Electrical & CS', graduationYear: 2024,
    skills: ['Machine Learning', 'Python', 'TensorFlow', 'Flask', 'OpenCV'],
    status: 'Screening', appliedDate: '2024-01-25', experience: 'Fresher',
    github: 'https://github.com', location: 'Delhi, India', gpa: '9.0',
  },
  {
    id: '8', name: 'Ishita Joshi', email: 'ishita.joshi@email.com', phone: '+91 21098 76543',
    college: 'Manipal Institute of Technology', degree: 'B.Tech IS', graduationYear: 2023,
    skills: ['Angular', 'Node.js', 'Express', 'MongoDB', 'Jest'],
    status: 'Applied', appliedDate: '2024-01-28', experience: '1 year',
    portfolio: 'https://ishita.dev', location: 'Manipal, India', gpa: '8.3',
  },
];

interface CandidateStore {
  candidates: Candidate[];
  selectedCandidate: Candidate | null;
  filters: FilterState;
  currentPage: number;
  pageSize: number;
  addCandidate: (candidate: Omit<Candidate, 'id'>) => void;
  updateCandidate: (id: string, updates: Partial<Candidate>) => void;
  deleteCandidate: (id: string) => void;
  setSelectedCandidate: (candidate: Candidate | null) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  resetFilters: () => void;
}

const DEFAULT_FILTERS: FilterState = {
  search: '',
  status: 'All',
  skills: [],
  college: '',
  sortBy: 'appliedDate',
  sortOrder: 'desc',
};

export const useCandidateStore = create<CandidateStore>()(
  persist(
    (set, get) => ({
      candidates: INITIAL_CANDIDATES,
      selectedCandidate: null,
      filters: DEFAULT_FILTERS,
      currentPage: 1,
      pageSize: 6,
      addCandidate: (candidate) => {
        const newCandidate: Candidate = {
          ...candidate,
          id: Date.now().toString(),
        };
        set((state) => ({ candidates: [newCandidate, ...state.candidates] }));
      },
      updateCandidate: (id, updates) => {
        set((state) => ({
          candidates: state.candidates.map((c) => (c.id === id ? { ...c, ...updates } : c)),
          selectedCandidate:
            state.selectedCandidate?.id === id
              ? { ...state.selectedCandidate, ...updates }
              : state.selectedCandidate,
        }));
      },
      deleteCandidate: (id) => {
        set((state) => ({
          candidates: state.candidates.filter((c) => c.id !== id),
          selectedCandidate: state.selectedCandidate?.id === id ? null : state.selectedCandidate,
        }));
      },
      setSelectedCandidate: (candidate) => set({ selectedCandidate: candidate }),
      setFilters: (filters) =>
        set((state) => ({ filters: { ...state.filters, ...filters }, currentPage: 1 })),
      setPage: (page) => set({ currentPage: page }),
      setPageSize: (size) => set({ pageSize: size, currentPage: 1 }),
      resetFilters: () => set({ filters: DEFAULT_FILTERS, currentPage: 1 }),
    }),
    { name: 'upteky-candidates' }
  )
);

export function useFilteredCandidates() {
  const { candidates, filters, currentPage, pageSize } = useCandidateStore();

  let filtered = [...candidates];

  if (filters.search) {
    const s = filters.search.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.name.toLowerCase().includes(s) ||
        c.email.toLowerCase().includes(s) ||
        c.college.toLowerCase().includes(s) ||
        c.skills.some((sk) => sk.toLowerCase().includes(s))
    );
  }

  if (filters.status !== 'All') {
    filtered = filtered.filter((c) => c.status === filters.status);
  }

  if (filters.skills.length > 0) {
    filtered = filtered.filter((c) =>
      filters.skills.every((sk) =>
        c.skills.some((cs) => cs.toLowerCase().includes(sk.toLowerCase()))
      )
    );
  }

  if (filters.college) {
    filtered = filtered.filter((c) =>
      c.college.toLowerCase().includes(filters.college.toLowerCase())
    );
  }

  filtered.sort((a, b) => {
    let cmp = 0;
    if (filters.sortBy === 'name') cmp = a.name.localeCompare(b.name);
    else if (filters.sortBy === 'appliedDate')
      cmp = new Date(a.appliedDate).getTime() - new Date(b.appliedDate).getTime();
    else if (filters.sortBy === 'status') cmp = a.status.localeCompare(b.status);
    return filters.sortOrder === 'asc' ? cmp : -cmp;
  });

  const total = filtered.length;
  const startIndex = (currentPage - 1) * pageSize;
  const paginated = filtered.slice(startIndex, startIndex + pageSize);

  return { candidates: paginated, total, totalPages: Math.ceil(total / pageSize) };
}
