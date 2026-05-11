'use client';

import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useCandidateStore } from '@/store/candidateStore';
import { useThemeStore } from '@/store/themeStore';
import { Candidate, ApplicationStatus } from '@/types';
import { STATUS_OPTIONS, cn } from '@/lib/utils';
import { UserPlus, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useState } from 'react';

type FormData = {
  name: string;
  email: string;
  phone: string;
  college: string;
  degree: string;
  graduationYear: number;
  skillsRaw: string;
  status: ApplicationStatus;
  experience: string;
  location: string;
  linkedIn: string;
  github: string;
  portfolio: string;
  gpa: string;
  notes: string;
};

interface AddCandidateFormProps {
  onSuccess: () => void;
  initialData?: Candidate;
}

export function AddCandidateForm({ onSuccess, initialData }: AddCandidateFormProps) {
  const { addCandidate, updateCandidate } = useCandidateStore();
  const { isDark } = useThemeStore();
  const [submitting, setSubmitting] = useState(false);
  const isEditing = !!initialData;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: initialData
      ? {
          ...initialData,
          skillsRaw: initialData.skills.join(', '),
        }
      : {
          status: 'Applied',
          graduationYear: new Date().getFullYear(),
        },
  });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));

    const skills = data.skillsRaw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const candidateData = {
      ...data,
      skills,
      graduationYear: Number(data.graduationYear),
    };

    if (isEditing && initialData) {
      updateCandidate(initialData.id, candidateData);
      toast.success('Candidate updated successfully!');
    } else {
      addCandidate(candidateData as Omit<Candidate, 'id'>);
      toast.success('Candidate added successfully!');
    }

    reset();
    setSubmitting(false);
    onSuccess();
  };

  const statusOptions = STATUS_OPTIONS.map((s) => ({ value: s, label: s }));

  const yearOptions = Array.from({ length: 8 }, (_, i) => {
    const y = new Date().getFullYear() - 2 + i;
    return { value: String(y), label: String(y) };
  });

  const inputProps = { darkMode: isDark };

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className={cn('text-xs font-semibold uppercase tracking-widest mb-3 mt-2', isDark ? 'text-slate-500' : 'text-slate-400')}>
      {children}
    </h3>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <SectionTitle>Personal Information</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          placeholder="e.g. Aarav Sharma"
          required
          {...inputProps}
          error={errors.name?.message}
          {...register('name', {
            required: 'Full name is required',
            minLength: { value: 2, message: 'Min 2 characters' },
          })}
        />
        <Input
          label="Email Address"
          placeholder="candidate@email.com"
          type="email"
          required
          {...inputProps}
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' },
          })}
        />
        <Input
          label="Phone Number"
          placeholder="+91 98765 43210"
          {...inputProps}
          error={errors.phone?.message}
          {...register('phone', {
            required: 'Phone is required',
            pattern: { value: /^[+\d\s()-]{7,}$/, message: 'Invalid phone number' },
          })}
        />
        <Input
          label="Location"
          placeholder="City, State"
          required
          {...inputProps}
          error={errors.location?.message}
          {...register('location', { required: 'Location is required' })}
        />
      </div>

      <SectionTitle>Academic Details</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="College / University"
          placeholder="IIT Bombay"
          required
          {...inputProps}
          error={errors.college?.message}
          {...register('college', { required: 'College is required' })}
        />
        <Input
          label="Degree & Branch"
          placeholder="B.Tech Computer Science"
          required
          {...inputProps}
          error={errors.degree?.message}
          {...register('degree', { required: 'Degree is required' })}
        />
        <Select
          label="Graduation Year"
          options={yearOptions}
          required
          {...inputProps}
          {...register('graduationYear')}
        />
        <Input
          label="GPA / CGPA"
          placeholder="9.0 / 10.0"
          {...inputProps}
          {...register('gpa')}
        />
      </div>

      <SectionTitle>Application Details</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Application Status"
          options={statusOptions}
          required
          {...inputProps}
          {...register('status')}
        />
        <Input
          label="Experience"
          placeholder="Fresher / 6 months / 1 year"
          required
          {...inputProps}
          error={errors.experience?.message}
          {...register('experience', { required: 'Experience is required' })}
        />
        <div className="sm:col-span-2">
          <Input
            label="Skills (comma-separated)"
            placeholder="React, TypeScript, Node.js, AWS"
            required
            {...inputProps}
            error={errors.skillsRaw?.message}
            {...register('skillsRaw', { required: 'At least one skill is required' })}
          />
        </div>
      </div>

      <SectionTitle>Links & Portfolio</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input label="LinkedIn URL" placeholder="https://linkedin.com/in/..." {...inputProps} {...register('linkedIn')} />
        <Input label="GitHub URL" placeholder="https://github.com/..." {...inputProps} {...register('github')} />
        <Input label="Portfolio URL" placeholder="https://yoursite.com" {...inputProps} {...register('portfolio')} />
      </div>

      <div>
        <label className={cn('mb-1.5 block text-sm font-medium', isDark ? 'text-slate-300' : 'text-slate-700')}>Notes</label>
        <textarea
          placeholder="Any additional notes about the candidate..."
          rows={3}
          className={cn(
            'w-full rounded-xl border px-4 py-2.5 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20 resize-none',
            isDark
              ? 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-violet-500/70'
              : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-violet-500'
          )}
          {...register('notes')}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2 border-t border-white/10">
        <Button
          type="submit"
          variant="primary"
          size="md"
          loading={submitting}
          icon={<UserPlus className="h-4 w-4" />}
          className="flex-1"
        >
          {isEditing ? 'Update Candidate' : 'Add Candidate'}
        </Button>
        <Button type="button" variant="ghost" size="md" icon={<X className="h-4 w-4" />} onClick={onSuccess}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
