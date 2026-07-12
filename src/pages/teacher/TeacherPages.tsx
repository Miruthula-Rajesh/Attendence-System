import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Search, CheckCircle2, AlertCircle, 
  HelpCircle, Sparkles, CheckSquare, Keyboard, Eye 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useAppState } from '../../context/AppStateContext';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';

export const TeacherPages: React.FC = () => {
  const { currentTab, activeTeacherClass } = useAppState();

  // If a class is active, force attendance marking view
  if (activeTeacherClass && currentTab === 'attendance-marking') {
    return <AttendanceMarkingPage />;
  }

  switch (currentTab) {
    case 'overview':
      return <TeacherClassGrid />;
    case 'attendance-marking':
      return <AttendanceMarkingPage />;
    case 'reports':
      return <TeacherReports />;
    default:
      return <TeacherClassGrid />;
  }
};

// ==========================================
// 1. CLASS GRID OVERVIEW
// ==========================================
const TeacherClassGrid: React.FC = () => {
  const { students, attendanceRecords, setActiveTeacherClass, setCurrentTab } = useAppState();

  const today = '2026-06-23'; // locked date

  // Assigned classes mock
  const assigned = [
    { className: '10', section: 'A', subject: 'Science & Biology', count: 5 },
    { className: '9', section: 'B', subject: 'Life Science', count: 4 },
    { className: '8', section: 'C', subject: 'Basic Physics', count: 1 }
  ];

  const handleTakeAttendance = (className: string, section: string) => {
    setActiveTeacherClass({ className, section });
    setCurrentTab('attendance-marking');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-black text-slate-800 dark:text-white">Welcome back, Mrs. Sarah Jenkins</h1>
        <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Today is **Tuesday, June 23, 2026** • Log your morning roll calls.</p>
      </div>

      <motion.div 
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {assigned.map((cls, idx) => {
          // Check if today's roll is already completed
          const isCompleted = attendanceRecords.some(r => r.date === today && r.className === cls.className && r.section === cls.section);
          
          return (
            <motion.div 
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
            >
              <Card 
                variant={isCompleted ? 'glass' : 'glow'} 
                className={`p-6 flex flex-col justify-between hover-glow relative h-full ${
                  !isCompleted ? 'border-primary/20 bg-primary/5' : ''
                }`}
              >
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-black text-slate-850 dark:text-white">
                    Class {cls.className}-{cls.section}
                  </h3>
                  <Badge variant={isCompleted ? 'success' : 'danger'}>
                    {isCompleted ? 'Completed' : 'Pending Roll'}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-1">{cls.subject}</p>
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-6 select-none">
                  Students Registered: {cls.count}
                </div>
              </div>

              <div className="mt-8 border-t border-slate-100 dark:border-slate-850 pt-4">
                <Button 
                  variant={isCompleted ? 'outline' : 'primary'} 
                  className="w-full"
                  onClick={() => handleTakeAttendance(cls.className, cls.section)}
                >
                  {isCompleted ? 'Review Roll' : 'Take Attendance'}
                </Button>
              </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

// ==========================================
// 2. HIGH SPEED ATTENDANCE MARKING (Under 30s Goal)
// ==========================================
const AttendanceMarkingPage: React.FC = () => {
  const { 
    activeTeacherClass, 
    setActiveTeacherClass, 
    setCurrentTab, 
    students, 
    attendanceRecords,
    submitAttendance,
    addToast
  } = useAppState();

  const today = '2026-06-23';

  if (!activeTeacherClass) {
    return (
      <div className="p-12 text-center text-xs font-semibold text-slate-400 select-none">
        No class active. Please select a class from your Dashboard grid.
      </div>
    );
  }

  const { className, section } = activeTeacherClass;

  // Fetch students enrolled in this class
  const classStudents = students.filter(s => s.className === className && s.section === section);

  // Fetch existing attendance records for today to prefill if reviewed
  const todayRecords = attendanceRecords.filter(r => r.date === today && r.className === className && r.section === section);

  // Local state for marked rolls (studentId -> status)
  const [markedRoll, setMarkedRoll] = useState<Record<string, 'Present' | 'Absent' | 'Late' | 'Half Day'>>(() => {
    const initial: Record<string, 'Present' | 'Absent' | 'Late' | 'Half Day'> = {};
    classStudents.forEach(s => {
      const existing = todayRecords.find(r => r.studentId === s.id);
      initial[s.id] = existing ? existing.status : 'Present'; // default to Present
    });
    return initial;
  });

  const [search, setSearch] = useState('');
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [activeRowIdx, setActiveRowIdx] = useState<number>(0);

  // Filter students by search
  const filteredStudents = classStudents.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  // Count totals
  const totalCount = classStudents.length;
  const markedList = Object.keys(markedRoll);
  const presentCount = markedList.filter(id => markedRoll[id] === 'Present').length;
  const absentCount = markedList.filter(id => markedRoll[id] === 'Absent').length;
  const lateCount = markedList.filter(id => markedRoll[id] === 'Late').length;
  const halfDayCount = markedList.filter(id => markedRoll[id] === 'Half Day').length;

  const markStudent = (studentId: string, status: 'Present' | 'Absent' | 'Late' | 'Half Day') => {
    setMarkedRoll(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  // Bulk mark present
  const handleBulkMarkPresent = () => {
    const bulk: Record<string, 'Present' | 'Absent' | 'Late' | 'Half Day'> = {};
    classStudents.forEach(s => {
      bulk[s.id] = 'Present';
    });
    setMarkedRoll(bulk);
  };

  // Submission handler
  const handleSubmit = () => {
    const recordsPayload = classStudents.map(s => ({
      date: today,
      studentId: s.id,
      className,
      section,
      status: markedRoll[s.id],
      markedBy: 'Mrs. Sarah Jenkins'
    }));

    submitAttendance(recordsPayload);
    setReviewModalOpen(false);
    
    // Trigger premium canvas confetti animation!
    const end = Date.now() + 2 * 1000;
    const colors = ['#2563EB', '#06B6D4', '#22C55E', '#F59E0B', '#7C3AED', '#EF4444'];
    
    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
        zIndex: 9999
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
        zIndex: 9999
      });
      
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    // Return to overview dashboard after success
    setTimeout(() => {
      setActiveTeacherClass(null);
      setCurrentTab('overview');
    }, 1000);
  };

  // Keyboard Navigation & Hotkeys listener
  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (filteredStudents.length === 0) return;
      
      const currentStudent = filteredStudents[activeRowIdx];
      if (!currentStudent) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveRowIdx(prev => (prev + 1) % filteredStudents.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveRowIdx(prev => (prev - 1 + filteredStudents.length) % filteredStudents.length);
      } else if (e.key.toLowerCase() === 'p') {
        e.preventDefault();
        markStudent(currentStudent.id, 'Present');
        // Auto-advance to next student for rapid data-entry!
        setActiveRowIdx(prev => (prev + 1) % filteredStudents.length);
      } else if (e.key.toLowerCase() === 'a') {
        e.preventDefault();
        markStudent(currentStudent.id, 'Absent');
        setActiveRowIdx(prev => (prev + 1) % filteredStudents.length);
      } else if (e.key.toLowerCase() === 'l') {
        e.preventDefault();
        markStudent(currentStudent.id, 'Late');
        setActiveRowIdx(prev => (prev + 1) % filteredStudents.length);
      } else if (e.key.toLowerCase() === 'h') {
        e.preventDefault();
        markStudent(currentStudent.id, 'Half Day');
        setActiveRowIdx(prev => (prev + 1) % filteredStudents.length);
      }
    };

    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [activeRowIdx, filteredStudents, markedRoll]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col gap-6 relative"
    >
      
      {/* Top Bar Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTeacherClass(null)}
            className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white hover:scale-105 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-800 dark:text-white">
              Roll Call: Class {className}-{section}
            </h1>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold mt-0.5">
              Tuesday, June 23, 2026 • {totalCount} Students Registered
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 select-none">
          <Badge variant="primary" className="flex items-center gap-1">
            <Keyboard className="w-3.5 h-3.5" /> Hotkeys Active: P/A/L/H
          </Badge>
          <Button variant="outline" size="sm" onClick={handleBulkMarkPresent}>
            Bulk Mark Present
          </Button>
        </div>
      </div>

      {/* Realtime summary counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card variant="glass" className="p-3.5 text-center border-l-4 border-success">
          <span className="text-[9px] font-bold text-slate-400 uppercase">Present count</span>
          <div className="text-xl font-black text-success mt-0.5">{presentCount}</div>
        </Card>
        <Card variant="glass" className="p-3.5 text-center border-l-4 border-danger">
          <span className="text-[9px] font-bold text-slate-400 uppercase">Absent Count</span>
          <div className="text-xl font-black text-danger mt-0.5">{absentCount}</div>
        </Card>
        <Card variant="glass" className="p-3.5 text-center border-l-4 border-warning">
          <span className="text-[9px] font-bold text-slate-400 uppercase">Late Count</span>
          <div className="text-xl font-black text-warning mt-0.5">{lateCount}</div>
        </Card>
        <Card variant="glass" className="p-3.5 text-center border-l-4 border-primary">
          <span className="text-[9px] font-bold text-slate-400 uppercase">Half Day Count</span>
          <div className="text-xl font-black text-primary mt-0.5">{halfDayCount}</div>
        </Card>
      </div>

      {/* Quick Search */}
      <Card variant="glass" className="p-3 flex items-center gap-3 bg-white/70 dark:bg-slate-900/70">
        <Search className="w-4 h-4 text-slate-400 absolute left-6 top-6 shrink-0" />
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input 
            type="text" 
            placeholder="Quick search student name..." 
            value={search}
            onChange={(e) => { setSearch(e.target.value); setActiveRowIdx(0); }}
            className="w-full pl-10 pr-4 py-2.5 text-xs font-semibold bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[12px] outline-none dark:text-white"
          />
        </div>
      </Card>

      {/* Student Rows Sheet */}
      <Card variant="glass" className="p-5 flex flex-col gap-4 bg-white/70 dark:bg-slate-900/70 mb-16">
        <div className="overflow-x-auto border border-slate-100 dark:border-slate-850 rounded-xl">
          <table className="w-full text-left text-xs font-semibold">
            <thead className="bg-slate-50 dark:bg-slate-955 text-slate-400 text-[9px] uppercase tracking-wider border-b border-slate-100 dark:border-slate-850">
              <tr>
                <th className="px-4 py-3">Student Name</th>
                <th className="px-4 py-3">Roll ID</th>
                <th className="px-4 py-3 text-center">Mark Attendance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
              {filteredStudents.map((student, idx) => {
                const isActive = activeRowIdx === idx;
                const status = markedRoll[student.id] || 'Present';

                return (
                  <tr 
                    key={student.id} 
                    className={`transition-colors hover:bg-slate-50/40 dark:hover:bg-slate-900/40 ${
                      isActive ? 'bg-primary/5 dark:bg-primary/10 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'
                    }`}
                    onClick={() => setActiveRowIdx(idx)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img className="w-8 h-8 rounded-full border border-slate-200 object-cover shrink-0 select-none" src={student.photo} alt="" />
                        <div>
                          <div className="text-slate-850 dark:text-white font-extrabold truncate">{student.name}</div>
                          {isActive && <span className="text-[8px] font-bold text-primary dark:text-primary-light uppercase tracking-wider animate-pulse">[ Selected row ]</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-[10px] text-slate-400">{student.rollNumber}</td>
                    <td className="px-4 py-3">
                      {/* Interactive marking toggle group */}
                      <div className="flex items-center justify-center gap-1.5 max-w-[280px] mx-auto select-none">
                        {[
                          { key: 'Present', label: 'P', color: 'bg-success text-white border-success/30 shadow-md shadow-success/15' },
                          { key: 'Absent', label: 'A', color: 'bg-danger text-white border-danger/30 shadow-md shadow-danger/15' },
                          { key: 'Late', label: 'L', color: 'bg-warning text-white border-warning/30 shadow-md shadow-warning/15' },
                          { key: 'Half Day', label: 'HD', color: 'bg-primary text-white border-primary/30 shadow-md shadow-primary/15' }
                        ].map(btn => {
                          const isSelected = status === btn.key;
                          return (
                            <button
                              key={btn.key}
                              type="button"
                              onClick={(e) => { e.stopPropagation(); markStudent(student.id, btn.key as any); }}
                              className={`w-10 h-10 rounded-[10px] text-xs font-black border transition-all duration-200 active:scale-90 focus:outline-none ${
                                isSelected 
                                  ? btn.color 
                                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-450 dark:text-slate-650 hover:bg-slate-100 dark:hover:bg-slate-800'
                              }`}
                            >
                              {btn.label}
                            </button>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Sticky Bottom Action bar */}
      <div className="fixed bottom-0 left-0 lg:left-64 right-0 h-16 glass-panel border-t border-white/20 dark:border-slate-850 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md flex items-center justify-between px-6 z-20 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-16 bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden shrink-0">
            <div className="bg-primary h-full w-full animate-pulse" />
          </div>
          <span className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 select-none">
            Roll Completion Tracker: {markedList.length} of {totalCount} Students
          </span>
        </div>
        <div className="flex gap-2.5">
          <Button variant="outline" size="sm" onClick={() => addToast('info', 'Roll saved as local draft.')}>
            Save Draft
          </Button>
          <Button variant="primary" size="sm" onClick={() => setReviewModalOpen(true)}>
            Submit Attendance
          </Button>
        </div>
      </div>

      {/* Review Modal */}
      <Modal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        title="Confirm Roll Submission"
      >
        <div className="flex flex-col gap-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
            Please review the attendance totals before submitting. Submitting will immediately alert parents of absent students via automated SMS and write an official platform entry.
          </p>

          <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-950 p-4 border border-slate-100 dark:border-slate-900 rounded-xl">
            <div className="text-xs font-bold text-slate-500">Presents: <span className="font-extrabold text-success">{presentCount}</span></div>
            <div className="text-xs font-bold text-slate-500">Absents: <span className="font-extrabold text-danger">{absentCount}</span></div>
            <div className="text-xs font-bold text-slate-500">Lates: <span className="font-extrabold text-warning">{lateCount}</span></div>
            <div className="text-xs font-bold text-slate-500">Half Days: <span className="font-extrabold text-primary">{halfDayCount}</span></div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" type="button" onClick={() => setReviewModalOpen(false)}>
              Back to Edit
            </Button>
            <Button variant="success" type="button" onClick={handleSubmit} className="shadow-lg shadow-success/20">
              Confirm & Dispatch
            </Button>
          </div>
        </div>
      </Modal>

    </motion.div>
  );
};

// ==========================================
// 3. SIMPLE REPORTS
// ==========================================
const TeacherReports: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-black text-slate-800 dark:text-white">Classroom Summaries</h1>
        <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Verify monthly stats and student attendance rates.</p>
      </div>

      <Card variant="glass" className="p-5 text-center text-xs font-semibold text-slate-400 dark:text-slate-655 select-none py-12">
        Classroom summaries are automatically compiled on the School Admin console. Contact school admin Mrs. Julia Vance for administrative printouts.
      </Card>
    </div>
  );
};
