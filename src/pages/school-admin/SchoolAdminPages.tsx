import React, { useState } from 'react';
import { 
  Plus, Search, Edit2, Trash2, ShieldAlert, GraduationCap, 
  Users, CheckCircle2, AlertCircle, FileSpreadsheet, Calendar, 
  PieChart, ChevronRight, UserPlus, FileDown, FileUp, Sparkles, Database 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppState } from '../../context/AppStateContext';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { AnimatedCounter } from '../../components/ui/AnimatedCounter';
import { LineChart, BarChart, AttendanceHeatmap } from '../../components/Charts';

export const SchoolAdminPages: React.FC = () => {
  const { currentTab } = useAppState();

  switch (currentTab) {
    case 'overview':
      return <SchoolAdminOverview />;
    case 'students':
      return <StudentManagement />;
    case 'teachers':
      return <TeacherManagement />;
    case 'academic-setup':
      return <AcademicSetup />;
    case 'analytics':
      return <SchoolAnalytics />;
    case 'reports':
      return <SchoolReports />;
    case 'audit-logs':
      return <SchoolAuditLogs />;
    default:
      return <SchoolAdminOverview />;
  }
};

// ==========================================
// 1. SCHOOL OVERVIEW DASHBOARD
// ==========================================
const SchoolAdminOverview: React.FC = () => {
  const { students, teachers, attendanceRecords, setCurrentTab } = useAppState();

  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const activeTeachers = teachers.filter(t => t.status === 'Active').length;

  // Calculate today's attendance metrics dynamically
  const today = '2026-06-23'; // Locked to our mock timeline date
  const todayRecords = attendanceRecords.filter(r => r.date === today);
  const presentToday = todayRecords.filter(r => r.status === 'Present').length;
  const absentToday = todayRecords.filter(r => r.status === 'Absent').length;
  const lateToday = todayRecords.filter(r => r.status === 'Late').length;
  const halfDayToday = todayRecords.filter(r => r.status === 'Half Day').length;

  const markedCount = todayRecords.length;
  const attendancePercentage = markedCount > 0 
    ? parseFloat((((presentToday + lateToday + halfDayToday * 0.5) / markedCount) * 100).toFixed(1)) 
    : 94.8; // default fallback

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col gap-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-black text-slate-800 dark:text-white">Dominova Academy Console</h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Academic Year: **2025-2026** • Core Operations Center</p>
        </div>
        <div className="flex items-center gap-3 shrink-0 select-none">
          <Button variant="outline" size="sm" onClick={() => setCurrentTab('students')}>
            <UserPlus className="w-4 h-4 mr-1.5" />
            Add Student
          </Button>
          <Button variant="primary" size="sm" onClick={() => setCurrentTab('reports')}>
            <FileSpreadsheet className="w-4 h-4 mr-1.5" />
            Compile Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <motion.div 
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
          <Card variant="glass" className="p-4 flex items-center justify-between h-full hover-glow">
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase">Total Students</span>
              <div className="text-2xl font-black text-slate-800 dark:text-white mt-1">
                <AnimatedCounter to={totalStudents} />
              </div>
            </div>
            <div className="p-2 rounded-lg bg-primary/10 text-primary"><GraduationCap className="w-4 h-4" /></div>
          </Card>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
          <Card variant="glass" className="p-4 flex items-center justify-between h-full hover-glow">
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase">Teaching Staff</span>
              <div className="text-2xl font-black text-slate-800 dark:text-white mt-1">
                <AnimatedCounter to={totalTeachers} />
              </div>
              <span className="text-[8px] font-bold text-success">{activeTeachers} active today</span>
            </div>
            <div className="p-2 rounded-lg bg-success/10 text-success"><Users className="w-4 h-4" /></div>
          </Card>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
          <Card variant="glass" className="p-4 flex items-center justify-between h-full hover-glow">
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase">Present Today</span>
              <div className="text-xl font-black text-success mt-0.5">{presentToday || 8} students</div>
              <span className="text-[8px] font-bold text-slate-400">{lateToday} late entries</span>
            </div>
            <div className="p-2 rounded-lg bg-success/10 text-success"><CheckCircle2 className="w-4 h-4" /></div>
          </Card>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
          <Card variant="glass" className="p-4 flex items-center justify-between h-full hover-glow">
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase">Absents Today</span>
              <div className="text-xl font-black text-danger mt-0.5">{absentToday || 2} students</div>
              <span className="text-[8px] font-bold text-danger">Alerts auto-dispatched</span>
            </div>
            <div className="p-2 rounded-lg bg-danger/10 text-danger"><AlertCircle className="w-4 h-4" /></div>
          </Card>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
          <Card variant="glass" className="p-4 flex items-center justify-between h-full hover-glow">
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase">Today Attendance</span>
              <div className="text-xl font-black text-primary dark:text-primary-light mt-0.5">{attendancePercentage}%</div>
            </div>
            <div className="p-2 rounded-lg bg-primary/10 text-primary"><PieChart className="w-4 h-4" /></div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card variant="glass" className="lg:col-span-2 flex flex-col gap-4">
          <h3 className="text-sm font-black text-slate-800 dark:text-white">Daily Attendance Percentage Trend</h3>
          <LineChart 
            data={[94.2, 95.8, 93.4, 96.1, 95.0, attendancePercentage]} 
            labels={['Jun 18', 'Jun 19', 'Jun 20', 'Jun 21', 'Jun 22', 'Jun 23']} 
            color="#2563EB"
          />
        </Card>

        <Card variant="glass" className="lg:col-span-1 flex flex-col gap-4">
          <h3 className="text-sm font-black text-slate-800 dark:text-white">Class Comparison (June Avg)</h3>
          <BarChart 
            data={[98, 92, 94, 91]} 
            labels={['10A', '9B', '8C', '11A']} 
            color="#06B6D4"
          />
        </Card>
      </div>

      {/* Bottom section: AI insights snippet & Activity feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Insights */}
        <Card variant="glass" className="flex flex-col gap-4">
          <h3 className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-primary fill-current" /> AI Predictive Insights
          </h3>
          <div className="flex flex-col gap-3">
            <div className="p-3 rounded-[12px] bg-danger/5 border border-danger/15 flex gap-3">
              <span className="text-base select-none">⚠️</span>
              <div>
                <div className="text-[11px] font-black text-slate-800 dark:text-white">Landon Kade (9B) - High Absence Risk</div>
                <p className="text-[10px] text-slate-500 mt-0.5">Absences have dropped his attendance rate to 64.0%. Parent alerted via SMS.</p>
              </div>
            </div>
            <div className="p-3 rounded-[12px] bg-warning/5 border border-warning/15 flex gap-3">
              <span className="text-base select-none">⛈️</span>
              <div>
                <div className="text-[11px] font-black text-slate-800 dark:text-white">Weather Forecast Alert</div>
                <p className="text-[10px] text-slate-500 mt-0.5">Heavy rains predicted tomorrow may result in a 3-5% drop in attendance. Pre-schedule templates.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Activity feed */}
        <Card variant="glass" className="flex flex-col gap-4">
          <h3 className="text-sm font-black text-slate-800 dark:text-white">Live Operations Feed</h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3 text-xs">
              <div className="p-1.5 rounded-lg bg-success/10 text-success mt-0.5 select-none">✓</div>
              <div className="min-w-0">
                <div className="font-bold text-slate-700 dark:text-slate-300">Class 10A Roll call submitted</div>
                <div className="text-[9px] text-slate-400 mt-0.5">By Mrs. Sarah Jenkins at 08:15 AM • Parents notified</div>
              </div>
            </div>
            <div className="flex items-start gap-3 text-xs">
              <div className="p-1.5 rounded-lg bg-warning/10 text-warning mt-0.5 select-none">!</div>
              <div className="min-w-0">
                <div className="font-bold text-slate-700 dark:text-slate-300">Late entry logged: Aria Vance</div>
                <div className="text-[9px] text-slate-400 mt-0.5">Class 10A • Arrived at 08:35 AM • SMS alert sent</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

    </motion.div>
  );
};

// ==========================================
// 2. STUDENT MANAGEMENT (Complete Interactive CRUD)
// ==========================================
const StudentManagement: React.FC = () => {
  const { students, addStudent, updateStudent, deleteStudent } = useAppState();

  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [sectionFilter, setSectionFilter] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any | null>(null);

  // Form fields
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [className, setClassName] = useState('10');
  const [section, setSection] = useState('A');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [photo, setPhoto] = useState('');

  // Filtering logic
  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.rollNumber.includes(search);
    const matchesClass = classFilter ? s.className === classFilter : true;
    const matchesSection = sectionFilter ? s.section === sectionFilter : true;
    return matchesSearch && matchesClass && matchesSection;
  });

  const openAddModal = () => {
    setEditingStudent(null);
    setName('');
    setRollNumber('');
    setClassName('10');
    setSection('A');
    setParentEmail('');
    setParentPhone('');
    setPhoto('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100');
    setModalOpen(true);
  };

  const openEditModal = (student: any) => {
    setEditingStudent(student);
    setName(student.name);
    setRollNumber(student.rollNumber);
    setClassName(student.className);
    setSection(student.section);
    setParentEmail(student.parentEmail);
    setParentPhone(student.parentPhone);
    setPhoto(student.photo);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStudent) {
      updateStudent({
        ...editingStudent,
        name,
        rollNumber,
        className,
        section,
        parentEmail,
        parentPhone,
        photo
      });
    } else {
      addStudent({
        name,
        rollNumber,
        className,
        section,
        parentEmail,
        parentPhone,
        photo
      });
    }
    setModalOpen(false);
  };

  const handleExportCSV = () => {
    // Mock CSV trigger
    const csvContent = "data:text/csv;charset=utf-8,Roll,Name,Class,Section,Attendance Rate\n" +
      filteredStudents.map(s => `"${s.rollNumber}","${s.name}","${s.className}","${s.section}","${s.attendanceRate}%"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "dominova_student_directory.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col gap-6"
    >
      
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-black text-slate-800 dark:text-white">Student Administration</h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Manage enrollments, contact details, and rates.</p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0 select-none">
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            <FileDown className="w-4 h-4 mr-1.5" />
            Export Directory
          </Button>
          <Button variant="primary" size="sm" onClick={openAddModal}>
            <Plus className="w-4 h-4 mr-1.5" />
            Register Student
          </Button>
        </div>
      </div>

      {/* Filters bar */}
      <Card variant="glass" className="p-4 flex flex-col sm:flex-row gap-3 items-center bg-white/70 dark:bg-slate-900/70">
        <div className="relative w-full flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input 
            type="text" 
            placeholder="Search by student name, roll number..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs font-semibold bg-slate-50 dark:bg-slate-950 border border-slate-250/20 dark:border-slate-800 rounded-[12px] outline-none dark:text-white"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto shrink-0">
          <select 
            value={classFilter} 
            onChange={(e) => setClassFilter(e.target.value)}
            className="px-3 py-2 rounded-[12px] text-xs font-bold bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 outline-none dark:text-white"
          >
            <option value="">All Classes</option>
            <option value="10">Class 10</option>
            <option value="9">Class 9</option>
            <option value="8">Class 8</option>
          </select>
          <select 
            value={sectionFilter} 
            onChange={(e) => setSectionFilter(e.target.value)}
            className="px-3 py-2 rounded-[12px] text-xs font-bold bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 outline-none dark:text-white"
          >
            <option value="">All Sections</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
          </select>
        </div>
      </Card>

      {/* Student list card */}
      <Card variant="glass" className="p-5 flex flex-col gap-4 bg-white/70 dark:bg-slate-900/70">
        <div className="overflow-x-auto border border-slate-100 dark:border-slate-850 rounded-xl">
          <table className="w-full text-left text-xs font-semibold">
            <thead className="bg-slate-50 dark:bg-slate-950 text-slate-400 text-[9px] uppercase tracking-wider border-b border-slate-100 dark:border-slate-850">
              <tr>
                <th className="px-4 py-3">Student Profile</th>
                <th className="px-4 py-3">Roll ID</th>
                <th className="px-4 py-3">Class Assigned</th>
                <th className="px-4 py-3">Parent Details</th>
                <th className="px-4 py-3">Attendance Rate</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
              {filteredStudents.map(student => {
                // Color rate threshold
                const isRisk = student.attendanceRate < 75;
                const isWarning = student.attendanceRate >= 75 && student.attendanceRate < 90;
                
                return (
                  <tr key={student.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-900/40">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img className="w-8 h-8 rounded-full border border-slate-200 object-cover shrink-0 select-none" src={student.photo} alt="" />
                        <div className="text-slate-850 dark:text-white font-bold truncate">{student.name}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-[10px] text-slate-500">{student.rollNumber}</td>
                    <td className="px-4 py-3">
                      <Badge variant="primary">Class {student.className}-{student.section}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col text-slate-450 text-[10px]">
                        <span>{student.parentEmail}</span>
                        <span>{student.parentPhone}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className={`font-black text-sm ${
                          isRisk ? 'text-danger' : isWarning ? 'text-warning' : 'text-success'
                        }`}>
                          {student.attendanceRate}%
                        </span>
                        {isRisk && <Badge variant="danger">Critical Risk</Badge>}
                        {isWarning && <Badge variant="warning">At Risk</Badge>}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button 
                          onClick={() => openEditModal(student)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-primary transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => deleteStudent(student.id)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-danger transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add / Edit Student Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingStudent ? `Modify Profile: ${name}` : 'Register Student Profile'}
      >
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <Input 
            label="Student Full Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Roll Number"
              required
              placeholder="e.g. 10-A-14"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
            />
            <Input 
              label="Avatar photo URL"
              required
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400">Class Name</label>
              <select 
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="px-3 py-2.5 rounded-[12px] text-xs font-semibold bg-slate-50 dark:bg-slate-900 border border-slate-205 dark:border-slate-800 outline-none dark:text-white"
              >
                <option value="10">Class 10</option>
                <option value="9">Class 9</option>
                <option value="8">Class 8</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400">Section</label>
              <select 
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="px-3 py-2.5 rounded-[12px] text-xs font-semibold bg-slate-50 dark:bg-slate-900 border border-slate-205 dark:border-slate-800 outline-none dark:text-white"
              >
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Parent Email Address"
              type="email"
              required
              value={parentEmail}
              onChange={(e) => setParentEmail(e.target.value)}
            />
            <Input 
              label="Parent Mobile Phone"
              required
              value={parentPhone}
              onChange={(e) => setParentPhone(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Student Space
            </Button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
};

// ==========================================
// 3. TEACHER MANAGEMENT
// ==========================================
const TeacherManagement: React.FC = () => {
  const { teachers, addTeacher, toggleTeacherStatus, addToast } = useAppState();

  const [modalOpen, setModalOpen] = useState(false);
  
  // Form fields
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    addTeacher({
      name,
      department,
      email,
      photo,
      assignedClasses: [{ className: '10', section: 'A' }] // defaults
    });
    setModalOpen(false);
  };

  const handleResetPassword = (nameStr: string) => {
    addToast('success', `Password reset token dispatced to ${nameStr}'s inbox.`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col gap-6"
    >
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-black text-slate-800 dark:text-white">Teaching Faculty</h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Teacher registry, HR profiles, class duties.</p>
        </div>
        <Button variant="primary" onClick={() => setModalOpen(true)}>
          <Plus className="w-4 h-4 mr-1.5" />
          Register Teacher
        </Button>
      </div>

      {/* Teachers list Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teachers.map(teacher => (
          <Card key={teacher.id} variant="glass" className="p-6 flex flex-col justify-between hover-glow">
            <div className="flex items-start gap-4">
              <img className="w-12 h-12 rounded-xl object-cover border border-slate-200 select-none shrink-0" src={teacher.photo} alt="" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-slate-800 dark:text-white text-sm truncate">{teacher.name}</h4>
                  <Badge variant={teacher.status === 'Active' ? 'success' : 'warning'}>{teacher.status}</Badge>
                </div>
                <div className="text-[10px] font-bold text-slate-450 mt-0.5">{teacher.department} • {teacher.teacherId}</div>
                
                {/* Assigned classes */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {teacher.assignedClasses.map((cls, index) => (
                    <span key={index} className="px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-extrabold text-primary dark:text-primary-light">
                      Class {cls.className}-{cls.section}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-850 pt-4 mt-6">
              <span className="text-[9px] font-mono text-slate-400 truncate">{teacher.email}</span>
              <div className="flex gap-2 shrink-0">
                <Button variant="outline" size="sm" onClick={() => handleResetPassword(teacher.name)}>
                  Reset Pass
                </Button>
                <Button 
                  variant={teacher.status === 'Active' ? 'danger' : 'success'} 
                  size="sm" 
                  onClick={() => toggleTeacherStatus(teacher.id)}
                >
                  {teacher.status === 'Active' ? 'Deactivate' : 'Activate'}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Teacher Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Register Educator Faculty">
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <Input label="Educator Full Name" required value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Department Directory" required placeholder="e.g. Science / Mathematics" value={department} onChange={(e) => setDepartment(e.target.value)} />
          <Input label="Professional Email" type="email" required placeholder="e.g. jenkins@academy.edu" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Avatar Image URL" required value={photo} onChange={(e) => setPhoto(e.target.value)} />
          
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" type="button" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Complete Registry</Button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
};

// ==========================================
// 4. ACADEMIC SETUP MODULE (Notion-Google Calendar Inspired)
// ==========================================
const AcademicSetup: React.FC = () => {
  const { holidays, addHoliday, classesList, addClassConfig } = useAppState();

  const [holidayModal, setHolidayModal] = useState(false);
  const [classModal, setClassModal] = useState(false);

  // Form States
  const [hName, setHName] = useState('');
  const [hDate, setHDate] = useState('');

  const [cName, setCName] = useState('');
  const [cSections, setCSections] = useState('A, B, C');

  const handleAddHoliday = (e: React.FormEvent) => {
    e.preventDefault();
    addHoliday({ date: hDate, name: hName });
    setHolidayModal(false);
  };

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    const sectionsArr = cSections.split(',').map(s => s.trim().toUpperCase());
    addClassConfig(cName, sectionsArr);
    setClassModal(false);
  };

  return (
    <div className="flex flex-col gap-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-black text-slate-800 dark:text-white">Academic Setup & Calendar</h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Configure grade boundaries, class sections, and holiday grids.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0 select-none">
          <Button variant="outline" size="sm" onClick={() => setClassModal(true)}>
            <Plus className="w-4 h-4 mr-1.5" />
            Add Class
          </Button>
          <Button variant="primary" size="sm" onClick={() => setHolidayModal(true)}>
            <Calendar className="w-4 h-4 mr-1.5" />
            Log Holiday
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Classes configurations */}
        <Card variant="glass" className="p-6 flex flex-col gap-4 bg-white/70 dark:bg-slate-900/70">
          <h3 className="text-sm font-black text-slate-850 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            Active Grades & Sections
          </h3>
          <div className="flex flex-col gap-3.5">
            {classesList.map(cls => (
              <div key={cls.id} className="flex items-center justify-between p-3.5 rounded-[12px] bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-900">
                <div>
                  <h4 className="text-sm font-extrabold text-slate-800 dark:text-white">Grade {cls.name}</h4>
                  <p className="text-[10px] text-slate-400 font-bold mt-0.5">District config ID: {cls.id}</p>
                </div>
                <div className="flex gap-1.5">
                  {cls.sections.map(sec => (
                    <span key={sec} className="px-2 py-1 rounded-md bg-white dark:bg-slate-850 border border-slate-150 text-[9px] font-black text-slate-700 dark:text-slate-200 uppercase">
                      Sec {sec}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Holiday Timeline Notion-inspired calendar */}
        <Card variant="glass" className="p-6 flex flex-col gap-4 bg-white/70 dark:bg-slate-900/70">
          <h3 className="text-sm font-black text-slate-850 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            Holidays Schedule (2026)
          </h3>
          <div className="flex flex-col gap-3">
            {holidays.map((h, index) => (
              <div key={index} className="flex items-start gap-4 p-3 rounded-[12px] bg-slate-50 dark:bg-slate-955 border border-slate-100 dark:border-slate-900">
                <div className="p-2 rounded-lg bg-warning/10 text-warning select-none shrink-0 mt-0.5">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-black text-slate-800 dark:text-white">{h.name}</div>
                  <div className="text-[9px] font-bold text-slate-400 mt-0.5">Date scheduled: {h.date} (No Attendance Logs)</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Add Holiday Modal */}
      <Modal isOpen={holidayModal} onClose={() => setHolidayModal(false)} title="Schedule Holiday Event">
        <form onSubmit={handleAddHoliday} className="flex flex-col gap-4">
          <Input label="Holiday Event Name" required placeholder="e.g. Summer Solstice" value={hName} onChange={(e) => setHName(e.target.value)} />
          <Input label="Holiday Date" required type="date" value={hDate} onChange={(e) => setHDate(e.target.value)} />
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" type="button" onClick={() => setHolidayModal(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Schedule Event</Button>
          </div>
        </form>
      </Modal>

      {/* Add Class Modal */}
      <Modal isOpen={classModal} onClose={() => setClassModal(false)} title="Establish Academic Grade boundary">
        <form onSubmit={handleAddClass} className="flex flex-col gap-4">
          <Input label="Grade/Class Label" required placeholder="e.g. Grade 10" value={cName} onChange={(e) => setCName(e.target.value)} />
          <Input label="Available Sections (Comma separated)" required placeholder="e.g. A, B, C" value={cSections} onChange={(e) => setCSections(e.target.value)} />
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" type="button" onClick={() => setClassModal(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Create Grade Boundary</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

// ==========================================
// 5. ATTENDANCE ANALYTICS (Deep Visual Dashboards)
// ==========================================
const SchoolAnalytics: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-black text-slate-800 dark:text-white">Attendance Analytics</h1>
        <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Granular distribution grids and term statistics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Heatmap Grid */}
        <Card variant="glass" className="lg:col-span-2 flex flex-col gap-4 p-6 bg-white/70 dark:bg-slate-900/70">
          <h3 className="text-sm font-black text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            Academic Term Attendance Heatmap (June)
          </h3>
          <AttendanceHeatmap />
        </Card>

        {/* Breakdown circular representation */}
        <Card variant="glass" className="lg:col-span-1 flex flex-col gap-4 p-6 bg-white/70 dark:bg-slate-900/70">
          <h3 className="text-sm font-black text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            Ratio Distribution
          </h3>
          <div className="flex flex-col gap-3.5">
            <div>
              <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                <span>Present Rates</span>
                <span>94.2%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-success h-full w-11/12" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                <span>Late Outliers</span>
                <span>3.8%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-warning h-full w-1/12" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                <span>Absence Rate</span>
                <span>2.0%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-danger h-full w-[2%]" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// ==========================================
// 6. REPORTS MODULE
// ==========================================
const SchoolReports: React.FC = () => {
  const { students, addToast } = useAppState();
  const [reportType, setReportType] = useState('defaulters');
  const [classFilter, setClassFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Compile report list
  const defaultersList = students.filter(s => s.attendanceRate < 75);

  const handleDownload = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      addToast('success', 'Report generated and compiled successfully! Downloading PDF.');
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-black text-slate-800 dark:text-white">Reports center</h1>
        <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Generate structured sheets, summaries, and alerts.</p>
      </div>

      {/* Control filters panel */}
      <Card variant="glass" className="p-4 flex flex-wrap gap-4 items-center bg-white/70 dark:bg-slate-900/70">
        <div className="flex-1 min-w-[200px] flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase">Select Report Category</label>
          <select 
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full px-3 py-2 rounded-[12px] text-xs font-bold bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 outline-none dark:text-white"
          >
            <option value="defaulters">Critical Defaulters Report (&lt;75% Attendance)</option>
            <option value="summary">Monthly Attendance summary</option>
            <option value="alert">Low Attendance alerts (75% - 90% Warning)</option>
          </select>
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto mt-auto select-none">
          <Button variant="primary" isLoading={isLoading} onClick={handleDownload}>
            <FileDown className="w-4 h-4 mr-1.5" />
            Compile & Export PDF
          </Button>
        </div>
      </Card>

      {/* Sheet details representing compiled data */}
      <Card variant="glass" className="p-5 flex flex-col gap-4 bg-white/70 dark:bg-slate-900/70">
        <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-850">
          <span className="text-xs font-extrabold text-slate-805 dark:text-white">
            {reportType === 'defaulters' ? 'Critical Defaulters List' : reportType === 'alert' ? 'Low Attendance Warnings' : 'Monthly Summary'}
          </span>
          <span className="text-[9px] font-bold text-slate-400 uppercase">Generated on: June 23, 2026</span>
        </div>

        {reportType === 'defaulters' ? (
          <div className="overflow-x-auto border border-slate-100 dark:border-slate-850 rounded-xl">
            <table className="w-full text-left text-xs font-semibold">
              <thead className="bg-slate-50 dark:bg-slate-955 text-slate-450 text-[9px] uppercase tracking-wider border-b border-slate-100 dark:border-slate-850">
                <tr>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Roll ID</th>
                  <th className="px-4 py-3">Class</th>
                  <th className="px-4 py-3">Attendance Rate</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                {defaultersList.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-900/40">
                    <td className="px-4 py-3 text-slate-800 dark:text-white font-bold">{s.name}</td>
                    <td className="px-4 py-3 font-mono text-[10px] text-slate-400">{s.rollNumber}</td>
                    <td className="px-4 py-3">Class {s.className}-{s.section}</td>
                    <td className="px-4 py-3 text-danger font-black">{s.attendanceRate}%</td>
                    <td className="px-4 py-3">
                      <Badge variant="danger">Critical Alert</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center text-xs font-semibold text-slate-400 dark:text-slate-600">
            Preview compiling... Please click "Compile & Export PDF" to download complete spreadsheet.
          </div>
        )}
      </Card>
    </div>
  );
};

// ==========================================
// 7. SCHOOL AUDIT LOGS
// ==========================================
const SchoolAuditLogs: React.FC = () => {
  const { auditLogs } = useAppState();
  const schoolLogs = auditLogs.filter(log => log.role !== 'Super Admin');

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-black text-slate-800 dark:text-white">School Audit Trails</h1>
        <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Timeline of local administrative actions within this campus.</p>
      </div>

      <Card variant="glass" className="p-6 bg-white/70 dark:bg-slate-900/70">
        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 pl-6 ml-3 flex flex-col gap-8">
          {schoolLogs.map(log => (
            <div key={log.id} className="relative">
              <div className="absolute -left-[35px] top-0.5 p-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-primary">
                <Database className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-extrabold text-slate-800 dark:text-white">{log.user}</span>
                  <Badge variant="primary">{log.role}</Badge>
                  <span className="text-slate-400 dark:text-slate-500 font-bold ml-auto">{log.date} at {log.time}</span>
                </div>
                <p className="text-xs font-semibold text-slate-650 dark:text-slate-350 mt-1">
                  Triggered Action: **{log.action}**
                </p>
                <div className="bg-slate-50 dark:bg-slate-950/50 rounded-lg p-2.5 border border-slate-100 dark:border-slate-900 font-mono text-[10px] text-slate-500 flex items-center gap-2 mt-1.5 w-fit">
                  <span className="text-danger select-none">OLD:</span>
                  <span className="font-bold">{log.oldValue}</span>
                  <span className="text-slate-400 font-bold mx-1">→</span>
                  <span className="text-success select-none">NEW:</span>
                  <span className="font-bold">{log.newValue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
