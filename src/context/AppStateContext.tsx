import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  School, Student, Teacher, AttendanceRecord, AuditLog, NotificationLog, AIInsight,
  INITIAL_SCHOOLS, INITIAL_STUDENTS, INITIAL_TEACHERS, INITIAL_ATTENDANCE, 
  INITIAL_AUDIT_LOGS, INITIAL_NOTIFICATIONS, INITIAL_AI_INSIGHTS, MOCK_HOLIDAYS, MOCK_CLASSES, MOCK_SUBJECTS
} from '../utils/mockData';

export type UserRole = 'marketing' | 'teacher' | 'school-admin' | 'super-admin';

interface AppStateContextProps {
  // Theme & Routing
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  currentPage: 'marketing' | 'auth' | 'dashboard';
  setCurrentPage: (page: 'marketing' | 'auth' | 'dashboard') => void;
  authSubPage: 'login' | 'forgot' | 'reset';
  setAuthSubPage: (sub: 'login' | 'forgot' | 'reset') => void;
  
  // Data State
  schools: School[];
  students: Student[];
  teachers: Teacher[];
  attendanceRecords: AttendanceRecord[];
  auditLogs: AuditLog[];
  notifications: NotificationLog[];
  aiInsights: AIInsight[];
  holidays: { date: string; name: string }[];
  classesList: { id: string; name: string; sections: string[] }[];
  subjectsList: string[];
  
  // Mutations & Actions
  addSchool: (school: Omit<School, 'id' | 'joinedDate' | 'studentCount' | 'teacherCount' | 'mrr'>) => void;
  updateSchool: (school: School) => void;
  deleteSchool: (id: string) => void;
  toggleSchoolStatus: (id: string) => void;
  
  addStudent: (student: Omit<Student, 'id' | 'attendanceRate' | 'status'>) => void;
  updateStudent: (student: Student) => void;
  deleteStudent: (id: string) => void;
  
  addTeacher: (teacher: Omit<Teacher, 'id' | 'status' | 'teacherId'>) => void;
  updateTeacher: (teacher: Teacher) => void;
  toggleTeacherStatus: (id: string) => void;
  
  submitAttendance: (records: Omit<AttendanceRecord, 'id' | 'markedAt'>[]) => void;
  
  addAuditLog: (action: string, oldValue: string, newValue: string) => void;
  sendNotification: (type: 'SMS' | 'Email', recipient: string, subject: string, content: string) => void;
  dismissInsight: (id: string) => void;
  
  addHoliday: (holiday: { date: string; name: string }) => void;
  addClassConfig: (name: string, sections: string[]) => void;

  // UI Helper States
  activeTeacherClass: { className: string; section: string } | null;
  setActiveTeacherClass: (val: { className: string; section: string } | null) => void;
  toasts: { id: string; type: 'success' | 'error' | 'info' | 'warning'; message: string }[];
  addToast: (type: 'success' | 'error' | 'info' | 'warning', message: string) => void;
  removeToast: (id: string) => void;
  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (val: boolean) => void;

  // Security Policy Mock
  securitySettings: {
    passwordLength: number;
    requireSpecialChar: boolean;
    sessionTimeout: number;
    mfaEnabled: boolean;
  };
  updateSecuritySettings: (settings: { passwordLength: number; requireSpecialChar: boolean; sessionTimeout: number; mfaEnabled: boolean }) => void;
}

const AppStateContext = createContext<AppStateContextProps | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme & Routing States
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('dom_dark_mode');
    return saved ? JSON.parse(saved) : false;
  });
  const [currentRole, setCurrentRole] = useState<UserRole>('marketing');
  const [currentPage, setCurrentPage] = useState<'marketing' | 'auth' | 'dashboard'>('marketing');
  const [authSubPage, setAuthSubPage] = useState<'login' | 'forgot' | 'reset'>('login');
  const [currentTab, setCurrentTab] = useState<string>('overview');
  const [activeTeacherClass, setActiveTeacherClass] = useState<{ className: string; section: string } | null>(null);

  // Entities loaded from LocalStorage or Fallback
  const [schools, setSchools] = useState<School[]>(() => {
    const saved = localStorage.getItem('dom_schools');
    return saved ? JSON.parse(saved) : INITIAL_SCHOOLS;
  });
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('dom_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });
  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    const saved = localStorage.getItem('dom_teachers');
    return saved ? JSON.parse(saved) : INITIAL_TEACHERS;
  });
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem('dom_attendance');
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
  });
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('dom_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });
  const [notifications, setNotifications] = useState<NotificationLog[]>(() => {
    const saved = localStorage.getItem('dom_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });
  const [aiInsights, setAiInsights] = useState<AIInsight[]>(() => {
    const saved = localStorage.getItem('dom_ai_insights');
    return saved ? JSON.parse(saved) : INITIAL_AI_INSIGHTS;
  });
  const [holidays, setHolidays] = useState<{ date: string; name: string }[]>(() => {
    const saved = localStorage.getItem('dom_holidays');
    return saved ? JSON.parse(saved) : MOCK_HOLIDAYS;
  });
  const [classesList, setClassesList] = useState<{ id: string; name: string; sections: string[] }[]>(() => {
    const saved = localStorage.getItem('dom_classes_list');
    return saved ? JSON.parse(saved) : MOCK_CLASSES;
  });
  const [subjectsList] = useState<string[]>(MOCK_SUBJECTS);

  // Global Toasts state
  const [toasts, setToasts] = useState<{ id: string; type: 'success' | 'error' | 'info' | 'warning'; message: string }[]>([]);
  
  // Command Palette
  const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Security policy State
  const [securitySettings, setSecuritySettings] = useState(() => {
    const saved = localStorage.getItem('dom_security_settings');
    return saved ? JSON.parse(saved) : {
      passwordLength: 8,
      requireSpecialChar: true,
      sessionTimeout: 30,
      mfaEnabled: false
    };
  });

  // Theme Sync
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('dom_dark_mode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Persist State Updates
  useEffect(() => { localStorage.setItem('dom_schools', JSON.stringify(schools)); }, [schools]);
  useEffect(() => { localStorage.setItem('dom_students', JSON.stringify(students)); }, [students]);
  useEffect(() => { localStorage.setItem('dom_teachers', JSON.stringify(teachers)); }, [teachers]);
  useEffect(() => { localStorage.setItem('dom_attendance', JSON.stringify(attendanceRecords)); }, [attendanceRecords]);
  useEffect(() => { localStorage.setItem('dom_audit_logs', JSON.stringify(auditLogs)); }, [auditLogs]);
  useEffect(() => { localStorage.setItem('dom_notifications', JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => { localStorage.setItem('dom_ai_insights', JSON.stringify(aiInsights)); }, [aiInsights]);
  useEffect(() => { localStorage.setItem('dom_holidays', JSON.stringify(holidays)); }, [holidays]);
  useEffect(() => { localStorage.setItem('dom_classes_list', JSON.stringify(classesList)); }, [classesList]);
  useEffect(() => { localStorage.setItem('dom_security_settings', JSON.stringify(securitySettings)); }, [securitySettings]);

  // Toast Helpers
  const addToast = (type: 'success' | 'error' | 'info' | 'warning', message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Audit Logger
  const addAuditLog = (action: string, oldValue: string, newValue: string) => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const formattedTime = today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newLog: AuditLog = {
      id: `log-${Math.random().toString(36).substring(2, 9)}`,
      user: currentRole === 'teacher' ? 'Mrs. Sarah Jenkins' : currentRole === 'school-admin' ? 'Dr. Arthur Pendelton' : 'Dominova Admin',
      role: currentRole === 'teacher' ? 'Teacher' : currentRole === 'school-admin' ? 'School Admin' : 'Super Admin',
      action,
      oldValue,
      newValue,
      date: formattedDate,
      time: formattedTime
    };
    
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // --- ACTIONS & MUTATIONS ---

  // Schools
  const addSchool = (schoolData: Omit<School, 'id' | 'joinedDate' | 'studentCount' | 'teacherCount' | 'mrr'>) => {
    const newSchool: School = {
      ...schoolData,
      id: `sch-${Math.random().toString(36).substring(2, 9)}`,
      joinedDate: new Date().toISOString().split('T')[0],
      studentCount: 0,
      teacherCount: 0,
      mrr: schoolData.plan === 'Enterprise' ? 1200 : schoolData.plan === 'Professional' ? 450 : 150
    };
    setSchools(prev => [...prev, newSchool]);
    addAuditLog('Onboard School', 'None', `${newSchool.name} (${newSchool.plan})`);
    addToast('success', `${newSchool.name} has been successfully onboarded!`);
  };

  const updateSchool = (updated: School) => {
    setSchools(prev => prev.map(s => s.id === updated.id ? updated : s));
    addAuditLog('Modify School', 'Details Changed', updated.name);
    addToast('success', `${updated.name} settings updated.`);
  };

  const deleteSchool = (id: string) => {
    const school = schools.find(s => s.id === id);
    if (school) {
      setSchools(prev => prev.filter(s => s.id !== id));
      addAuditLog('Offboard School', school.name, 'Deleted');
      addToast('warning', `${school.name} removed from the platform.`);
    }
  };

  const toggleSchoolStatus = (id: string) => {
    setSchools(prev => prev.map(s => {
      if (s.id === id) {
        const nextStatus = s.status === 'Active' ? 'Suspended' : 'Active';
        addAuditLog('Change School Status', s.status, nextStatus);
        addToast(nextStatus === 'Active' ? 'success' : 'error', `School status set to ${nextStatus}`);
        return { ...s, status: nextStatus as any };
      }
      return s;
    }));
  };

  // Students
  const addStudent = (studentData: Omit<Student, 'id' | 'attendanceRate' | 'status'>) => {
    const newStudent: Student = {
      ...studentData,
      id: `std-${Math.random().toString(36).substring(2, 9)}`,
      attendanceRate: 100.0,
      status: 'Active'
    };
    setStudents(prev => [newStudent, ...prev]);
    addAuditLog('Add Student', 'None', `${newStudent.name} (Class ${newStudent.className}-${newStudent.section})`);
    addToast('success', `Student ${newStudent.name} registered.`);
  };

  const updateStudent = (updated: Student) => {
    setStudents(prev => prev.map(s => s.id === updated.id ? updated : s));
    addAuditLog('Modify Student', 'Details Changed', updated.name);
    addToast('success', `Student profile for ${updated.name} updated.`);
  };

  const deleteStudent = (id: string) => {
    const std = students.find(s => s.id === id);
    if (std) {
      setStudents(prev => prev.filter(s => s.id !== id));
      addAuditLog('Remove Student', std.name, 'Deleted');
      addToast('warning', `Student record for ${std.name} deleted.`);
    }
  };

  // Teachers
  const addTeacher = (teacherData: Omit<Teacher, 'id' | 'status' | 'teacherId'>) => {
    const newTeacher: Teacher = {
      ...teacherData,
      id: `tch-${Math.random().toString(36).substring(2, 9)}`,
      teacherId: `TCH-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      status: 'Active'
    };
    setTeachers(prev => [newTeacher, ...prev]);
    addAuditLog('Register Teacher', 'None', newTeacher.name);
    addToast('success', `Teacher ${newTeacher.name} registered successfully.`);
  };

  const updateTeacher = (updated: Teacher) => {
    setTeachers(prev => prev.map(t => t.id === updated.id ? updated : t));
    addAuditLog('Modify Teacher Profile', 'Details Changed', updated.name);
    addToast('success', `Teacher profile for ${updated.name} updated.`);
  };

  const toggleTeacherStatus = (id: string) => {
    setTeachers(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'Active' ? 'Suspended' : 'Active';
        addAuditLog('Change Teacher Status', t.status, nextStatus);
        addToast(nextStatus === 'Active' ? 'success' : 'error', `Teacher status set to ${nextStatus}`);
        return { ...t, status: nextStatus as any };
      }
      return t;
    }));
  };

  // Attendance Submission (Configured for High Speed UX)
  const submitAttendance = (records: Omit<AttendanceRecord, 'id' | 'markedAt'>[]) => {
    const markedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newRecords: AttendanceRecord[] = records.map(r => ({
      ...r,
      id: `att-${Math.random().toString(36).substring(2, 9)}`,
      markedAt
    }));

    setAttendanceRecords(prev => {
      // Filter out existing records for this date, class, section to prevent duplicates
      const targetDate = records[0]?.date;
      const targetClass = records[0]?.className;
      const targetSection = records[0]?.section;

      const cleaned = prev.filter(r => !(r.date === targetDate && r.className === targetClass && r.section === targetSection));
      return [...cleaned, ...newRecords];
    });

    // Automatically recalculate student attendance rates to make metrics shift dynamically in the UI!
    setStudents(prevStudents => {
      return prevStudents.map(student => {
        // Find all records for this student in the state + new records
        const targetDate = records[0]?.date;
        const currentStudentNewRecord = newRecords.find(r => r.studentId === student.id);
        
        const pastStudentRecords = attendanceRecords.filter(r => r.studentId === student.id && r.date !== targetDate);
        const allStudentRecords = currentStudentNewRecord 
          ? [...pastStudentRecords, currentStudentNewRecord] 
          : pastStudentRecords;

        if (allStudentRecords.length === 0) return student;

        // Calculate attendance rate (Present = 1, Late = 1, Half Day = 0.5, Absent = 0)
        const totalWeight = allStudentRecords.reduce((acc, r) => {
          if (r.status === 'Present') return acc + 1;
          if (r.status === 'Late') return acc + 1;
          if (r.status === 'Half Day') return acc + 0.5;
          return acc; // Absent is 0
        }, 0);

        const newRate = parseFloat(((totalWeight / allStudentRecords.length) * 100).toFixed(1));
        return {
          ...student,
          attendanceRate: newRate
        };
      });
    });

    // Create Audit Logs
    const classLabel = `${records[0]?.className}-${records[0]?.section}`;
    const presents = records.filter(r => r.status === 'Present').length;
    const absents = records.filter(r => r.status === 'Absent').length;
    addAuditLog('Submit Attendance', 'Pending', `Class ${classLabel} (P:${presents}, A:${absents})`);
    
    // Automatically trigger notifications for absent students to showcase notification pipeline
    const absentsList = records.filter(r => r.status === 'Absent');
    absentsList.forEach(abs => {
      const studentInfo = students.find(s => s.id === abs.studentId);
      if (studentInfo) {
        sendNotification(
          'SMS',
          studentInfo.parentPhone,
          'Absence Notification',
          `Alert: ${studentInfo.name} was marked Absent today. Please reply or contact the school office.`
        );
      }
    });

    addToast('success', `Attendance for Class ${classLabel} submitted successfully!`);
  };

  // Notifications Dispatcher
  const sendNotification = (type: 'SMS' | 'Email', recipient: string, subject: string, content: string) => {
    const newLog: NotificationLog = {
      id: `ntf-${Math.random().toString(36).substring(2, 9)}`,
      type,
      recipient,
      subject,
      content,
      status: 'Delivered', // Immediate delivery simulation
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    setNotifications(prev => [newLog, ...prev]);
  };

  // AI Insights
  const dismissInsight = (id: string) => {
    setAiInsights(prev => prev.filter(ins => ins.id !== id));
    addToast('info', 'Insight dismissed.');
  };

  // Academic Configuration
  const addHoliday = (holiday: { date: string; name: string }) => {
    setHolidays(prev => [...prev, holiday]);
    addAuditLog('Create Holiday Event', 'None', `${holiday.name} on ${holiday.date}`);
    addToast('success', `${holiday.name} added to school calendar.`);
  };

  const addClassConfig = (name: string, sections: string[]) => {
    const newClass = {
      id: `c-${Math.random().toString(36).substring(2, 9)}`,
      name,
      sections
    };
    setClassesList(prev => [...prev, newClass]);
    addAuditLog('Add Class Configuration', 'None', `Class ${name} (${sections.join(', ')})`);
    addToast('success', `Class ${name} setup completed.`);
  };

  const updateSecuritySettings = (settings: any) => {
    setSecuritySettings(settings);
    addAuditLog('Update Security Policies', 'Configuration Modified', 'New Password Strength & Timeout Settings');
    addToast('success', 'Platform security policies updated successfully.');
  };

  return (
    <AppStateContext.Provider value={{
      darkMode, setDarkMode,
      currentRole, setCurrentRole,
      currentTab, setCurrentTab,
      currentPage, setCurrentPage,
      authSubPage, setAuthSubPage,
      
      schools, students, teachers, attendanceRecords, auditLogs, notifications, aiInsights, holidays, classesList, subjectsList,
      
      addSchool, updateSchool, deleteSchool, toggleSchoolStatus,
      addStudent, updateStudent, deleteStudent,
      addTeacher, updateTeacher, toggleTeacherStatus,
      submitAttendance,
      addAuditLog, sendNotification, dismissInsight,
      addHoliday, addClassConfig,

      activeTeacherClass, setActiveTeacherClass,
      toasts, addToast, removeToast,
      isCommandPaletteOpen, setCommandPaletteOpen,
      
      securitySettings, updateSecuritySettings
    }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
