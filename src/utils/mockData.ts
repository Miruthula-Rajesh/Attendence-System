export interface School {
  id: string;
  name: string;
  principal: string;
  plan: 'Starter' | 'Professional' | 'Enterprise';
  status: 'Active' | 'Suspended' | 'Trial';
  studentCount: number;
  teacherCount: number;
  billingCycle: 'Monthly' | 'Annual';
  logo: string;
  joinedDate: string;
  mrr: number;
}

export interface Student {
  id: string;
  rollNumber: string;
  name: string;
  className: string;
  section: string;
  attendanceRate: number;
  status: 'Active' | 'Suspended';
  photo: string;
  parentEmail: string;
  parentPhone: string;
}

export interface Teacher {
  id: string;
  teacherId: string;
  name: string;
  department: string;
  assignedClasses: { className: string; section: string }[];
  status: 'Active' | 'On Leave' | 'Suspended';
  email: string;
  photo: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  studentId: string;
  className: string;
  section: string;
  status: 'Present' | 'Absent' | 'Late' | 'Half Day';
  markedBy: string;
  markedAt: string;
}

export interface AuditLog {
  id: string;
  user: string;
  role: string;
  action: string;
  oldValue: string;
  newValue: string;
  date: string;
  time: string;
}

export interface NotificationLog {
  id: string;
  type: 'SMS' | 'Email' | 'System';
  recipient: string;
  subject: string;
  content: string;
  status: 'Delivered' | 'Sent' | 'Failed' | 'Pending';
  timestamp: string;
}

export interface AIInsight {
  id: string;
  type: 'danger' | 'warning' | 'success' | 'info';
  message: string;
  actionableText: string;
  category: string;
}

export const INITIAL_SCHOOLS: School[] = [
  {
    id: 'sch-1',
    name: 'Dominova Academy',
    principal: 'Dr. Arthur Pendelton',
    plan: 'Enterprise',
    status: 'Active',
    studentCount: 1240,
    teacherCount: 68,
    billingCycle: 'Annual',
    logo: '🎓',
    joinedDate: '2025-01-15',
    mrr: 1200
  },
  {
    id: 'sch-2',
    name: 'Oakwood Heights School',
    principal: 'Mrs. Linda Sterling',
    plan: 'Professional',
    status: 'Active',
    studentCount: 850,
    teacherCount: 42,
    billingCycle: 'Monthly',
    logo: '🌲',
    joinedDate: '2025-03-10',
    mrr: 450
  },
  {
    id: 'sch-3',
    name: 'CyberTech High School',
    principal: 'Mr. Vance Hopper',
    plan: 'Enterprise',
    status: 'Active',
    studentCount: 1560,
    teacherCount: 94,
    billingCycle: 'Annual',
    logo: '💻',
    joinedDate: '2025-02-01',
    mrr: 1500
  },
  {
    id: 'sch-4',
    name: 'St. Mary\'s Secondary',
    principal: 'Sister Beatrice',
    plan: 'Starter',
    status: 'Trial',
    studentCount: 320,
    teacherCount: 18,
    billingCycle: 'Monthly',
    logo: '⛪',
    joinedDate: '2026-05-18',
    mrr: 0
  },
  {
    id: 'sch-5',
    name: 'Ivy League Prep',
    principal: 'Dr. Gregory House',
    plan: 'Professional',
    status: 'Suspended',
    studentCount: 620,
    teacherCount: 35,
    billingCycle: 'Annual',
    logo: '🏛️',
    joinedDate: '2025-06-20',
    mrr: 450
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'std-1',
    rollNumber: '10-A-01',
    name: 'Alexander Wright',
    className: '10',
    section: 'A',
    attendanceRate: 98.4,
    status: 'Active',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
    parentEmail: 'parent.wright@example.com',
    parentPhone: '+1 (555) 019-2834'
  },
  {
    id: 'std-2',
    rollNumber: '10-A-02',
    name: 'Aria Vance',
    className: '10',
    section: 'A',
    attendanceRate: 72.5, // At risk!
    status: 'Active',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
    parentEmail: 'parent.vance@example.com',
    parentPhone: '+1 (555) 014-9988'
  },
  {
    id: 'std-3',
    rollNumber: '10-A-03',
    name: 'Benjamin Cole',
    className: '10',
    section: 'A',
    attendanceRate: 94.2,
    status: 'Active',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
    parentEmail: 'parent.cole@example.com',
    parentPhone: '+1 (555) 012-7722'
  },
  {
    id: 'std-4',
    rollNumber: '10-A-04',
    name: 'Chloe Jenkins',
    className: '10',
    section: 'A',
    attendanceRate: 91.8,
    status: 'Active',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
    parentEmail: 'parent.jenkins@example.com',
    parentPhone: '+1 (555) 011-3344'
  },
  {
    id: 'std-5',
    rollNumber: '10-A-05',
    name: 'Daniel Brooks',
    className: '10',
    section: 'A',
    attendanceRate: 88.6,
    status: 'Active',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
    parentEmail: 'parent.brooks@example.com',
    parentPhone: '+1 (555) 018-4499'
  },
  {
    id: 'std-6',
    rollNumber: '9-B-01',
    name: 'Emma Watson',
    className: '9',
    section: 'B',
    attendanceRate: 96.5,
    status: 'Active',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100',
    parentEmail: 'parent.watson@example.com',
    parentPhone: '+1 (555) 017-5511'
  },
  {
    id: 'std-7',
    rollNumber: '9-B-02',
    name: 'Landon Kade',
    className: '9',
    section: 'B',
    attendanceRate: 64.0, // Critical Risk!
    status: 'Active',
    photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=100',
    parentEmail: 'parent.kade@example.com',
    parentPhone: '+1 (555) 015-8822'
  },
  {
    id: 'std-8',
    rollNumber: '9-B-03',
    name: 'Olivia Martinez',
    className: '9',
    section: 'B',
    attendanceRate: 99.1,
    status: 'Active',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100',
    parentEmail: 'parent.martinez@example.com',
    parentPhone: '+1 (555) 013-6622'
  },
  {
    id: 'std-9',
    rollNumber: '9-B-04',
    name: 'Kian Bennett',
    className: '9',
    section: 'B',
    attendanceRate: 74.8, // At risk!
    status: 'Active',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100',
    parentEmail: 'parent.bennett@example.com',
    parentPhone: '+1 (555) 012-4433'
  },
  {
    id: 'std-10',
    rollNumber: '8-C-01',
    name: 'Sophia Loren',
    className: '8',
    section: 'C',
    attendanceRate: 95.0,
    status: 'Active',
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=100',
    parentEmail: 'parent.loren@example.com',
    parentPhone: '+1 (555) 016-1188'
  }
];

export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: 'tch-1',
    teacherId: 'TCH-2025-001',
    name: 'Mrs. Sarah Jenkins',
    department: 'Science & Biology',
    assignedClasses: [
      { className: '10', section: 'A' },
      { className: '9', section: 'B' }
    ],
    status: 'Active',
    email: 'sarah.j@dominova-academy.edu',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 'tch-2',
    teacherId: 'TCH-2025-002',
    name: 'Mr. David Miller',
    department: 'Mathematics',
    assignedClasses: [
      { className: '10', section: 'A' },
      { className: '8', section: 'C' }
    ],
    status: 'Active',
    email: 'd.miller@dominova-academy.edu',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 'tch-3',
    teacherId: 'TCH-2025-003',
    name: 'Dr. Elena Rostova',
    department: 'English & Literature',
    assignedClasses: [
      { className: '9', section: 'B' }
    ],
    status: 'On Leave',
    email: 'e.rostova@dominova-academy.edu',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 'tch-4',
    teacherId: 'TCH-2025-004',
    name: 'Mr. Marcus Brody',
    department: 'Social Studies & History',
    assignedClasses: [
      { className: '8', section: 'C' }
    ],
    status: 'Active',
    email: 'm.brody@dominova-academy.edu',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100'
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  // Generate historical data for Alexander Wright
  { id: 'att-1', date: '2026-06-22', studentId: 'std-1', className: '10', section: 'A', status: 'Present', markedBy: 'Mrs. Sarah Jenkins', markedAt: '08:15 AM' },
  { id: 'att-2', date: '2026-06-23', studentId: 'std-1', className: '10', section: 'A', status: 'Present', markedBy: 'Mrs. Sarah Jenkins', markedAt: '08:10 AM' },
  
  // Aria Vance (at risk, has some absents & lates)
  { id: 'att-3', date: '2026-06-22', studentId: 'std-2', className: '10', section: 'A', status: 'Absent', markedBy: 'Mrs. Sarah Jenkins', markedAt: '08:15 AM' },
  { id: 'att-4', date: '2026-06-23', studentId: 'std-2', className: '10', section: 'A', status: 'Late', markedBy: 'Mrs. Sarah Jenkins', markedAt: '08:35 AM' },

  // Benjamin Cole
  { id: 'att-5', date: '2026-06-22', studentId: 'std-3', className: '10', section: 'A', status: 'Present', markedBy: 'Mrs. Sarah Jenkins', markedAt: '08:15 AM' },
  { id: 'att-6', date: '2026-06-23', studentId: 'std-3', className: '10', section: 'A', status: 'Present', markedBy: 'Mrs. Sarah Jenkins', markedAt: '08:10 AM' },

  // Landon Kade (severe risk, absent multiple days)
  { id: 'att-7', date: '2026-06-22', studentId: 'std-7', className: '9', section: 'B', status: 'Absent', markedBy: 'Mrs. Sarah Jenkins', markedAt: '08:20 AM' },
  { id: 'att-8', date: '2026-06-23', studentId: 'std-7', className: '9', section: 'B', status: 'Absent', markedBy: 'Mrs. Sarah Jenkins', markedAt: '08:18 AM' },

  // Olivia Martinez (nearly perfect)
  { id: 'att-9', date: '2026-06-22', studentId: 'std-8', className: '9', section: 'B', status: 'Present', markedBy: 'Mrs. Sarah Jenkins', markedAt: '08:20 AM' },
  { id: 'att-10', date: '2026-06-23', studentId: 'std-8', className: '9', section: 'B', status: 'Present', markedBy: 'Mrs. Sarah Jenkins', markedAt: '08:18 AM' },
  
  // Sophia Loren
  { id: 'att-11', date: '2026-06-22', studentId: 'std-10', className: '8', section: 'C', status: 'Present', markedBy: 'Mr. Marcus Brody', markedAt: '08:05 AM' },
  { id: 'att-12', date: '2026-06-23', studentId: 'std-10', className: '8', section: 'C', status: 'Half Day', markedBy: 'Mr. Marcus Brody', markedAt: '11:30 AM' }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    user: 'Mrs. Sarah Jenkins',
    role: 'Teacher',
    action: 'Attendance Modification',
    oldValue: 'Absent (std-2)',
    newValue: 'Late (std-2)',
    date: '2026-06-23',
    time: '09:05 AM'
  },
  {
    id: 'log-2',
    user: 'Dr. Arthur Pendelton',
    role: 'School Admin',
    action: 'Student Re-activation',
    oldValue: 'Suspended (std-5)',
    newValue: 'Active (std-5)',
    date: '2026-06-22',
    time: '02:14 PM'
  },
  {
    id: 'log-3',
    user: 'System Bot',
    role: 'Platform',
    action: 'Automated Subscription Renewal',
    oldValue: 'Active (Vance Hopper)',
    newValue: 'Active (CyberTech High)',
    date: '2026-06-20',
    time: '00:01 AM'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationLog[] = [
  {
    id: 'ntf-1',
    type: 'SMS',
    recipient: '+1 (555) 014-9988',
    subject: 'Attendance Alert',
    content: 'Alert: Aria Vance was marked Late today (2026-06-23). Dominova Admin.',
    status: 'Delivered',
    timestamp: '2026-06-23 08:37 AM'
  },
  {
    id: 'ntf-2',
    type: 'SMS',
    recipient: '+1 (555) 015-8822',
    subject: 'Absence Alert',
    content: 'Alert: Landon Kade was marked Absent today (2026-06-23). Please contact school admin.',
    status: 'Delivered',
    timestamp: '2026-06-23 08:22 AM'
  },
  {
    id: 'ntf-3',
    type: 'Email',
    recipient: 'parent.kade@example.com',
    subject: 'Notice: Critical Low Attendance Alert - Landon Kade',
    content: 'Dear Parent, Landon Kade\'s attendance rate has dropped to 64.0%. A meeting with the principal is requested.',
    status: 'Sent',
    timestamp: '2026-06-23 10:00 AM'
  },
  {
    id: 'ntf-4',
    type: 'Email',
    recipient: 'parent.vance@example.com',
    subject: 'Notice: Low Attendance Alert - Aria Vance',
    content: 'Dear Parent, Aria Vance\'s attendance rate has dropped to 72.5%, which is below our 75% target threshold.',
    status: 'Failed',
    timestamp: '2026-06-23 10:05 AM'
  }
];

export const INITIAL_AI_INSIGHTS: AIInsight[] = [
  {
    id: 'ins-1',
    type: 'danger',
    message: 'Attendance dropping rapidly in Class 9B (down 6.8% this week).',
    actionableText: 'Review Class 9B detailed report',
    category: 'Class Performance'
  },
  {
    id: 'ins-2',
    type: 'warning',
    message: 'Landon Kade (Class 9B) is at high risk of course failure due to 5 consecutive absences.',
    actionableText: 'Automate SMS follow-up with parent',
    category: 'Student Risk'
  },
  {
    id: 'ins-3',
    type: 'success',
    message: 'Class 10A (Mrs. Jenkins) achieved a perfect 100% attendance rate for 2 consecutive days.',
    actionableText: 'Send appreciation note to teacher',
    category: 'Success Milestone'
  },
  {
    id: 'ins-4',
    type: 'info',
    message: 'Predictive analytics suggests a potential 4% attendance drop tomorrow due to the scheduled local rainstorm.',
    actionableText: 'Pre-schedule weather notification template',
    category: 'Predictive Alert'
  }
];

export const MOCK_HOLIDAYS = [
  { date: '2026-01-01', name: 'New Year\'s Day' },
  { date: '2026-05-25', name: 'Memorial Day' },
  { date: '2026-07-04', name: 'Independence Day' },
  { date: '2026-09-07', name: 'Labor Day' },
  { date: '2026-11-26', name: 'Thanksgiving Day' },
  { date: '2026-12-25', name: 'Christmas Day' },
];

export const MOCK_CLASSES = [
  { id: 'c1', name: '10', sections: ['A', 'B'] },
  { id: 'c2', name: '9', sections: ['A', 'B', 'C'] },
  { id: 'c3', name: '8', sections: ['A', 'B', 'C'] },
  { id: 'c4', name: '11', sections: ['A', 'B'] },
  { id: 'c5', name: '12', sections: ['A', 'B'] },
];

export const MOCK_SUBJECTS = ['Mathematics', 'Biology', 'Chemistry', 'Physics', 'English Literature', 'World History', 'Computer Science'];
