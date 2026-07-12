import React, { useState } from 'react';
import { 
  Sparkles, Plus, Edit2, ShieldAlert, Trash2, Key, CheckSquare, 
  Settings, Users, ShieldCheck, Mail, Calendar, CreditCard, 
  Database, Activity, TrendingUp, DollarSign, School 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppState } from '../../context/AppStateContext';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { LineChart, BarChart } from '../../components/Charts';
import { AnimatedCounter } from '../../components/ui/AnimatedCounter';

export const SuperAdminPages: React.FC = () => {
  const { currentTab } = useAppState();

  switch (currentTab) {
    case 'overview':
      return <SuperAdminOverview />;
    case 'schools':
      return <SchoolsManagement />;
    case 'subscriptions':
      return <SubscriptionsManagement />;
    case 'audit-logs':
      return <SuperAdminAuditLogs />;
    case 'settings':
      return <SuperAdminSettings />;
    default:
      return <SuperAdminOverview />;
  }
};

// ==========================================
// 1. DASHBOARD OVERVIEW
// ==========================================
const SuperAdminOverview: React.FC = () => {
  const { schools, auditLogs } = useAppState();

  // Dynamic calculations based on state
  const totalSchools = schools.length;
  const activeSchools = schools.filter(s => s.status === 'Active').length;
  const totalMRR = schools.filter(s => s.status === 'Active').reduce((sum, s) => sum + s.mrr, 0);
  const totalStudents = schools.reduce((sum, s) => sum + s.studentCount, 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-black text-slate-800 dark:text-white">Super Admin Workspace</h1>
        <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Global SaaS orchestrator metrics.</p>
      </div>

      {/* KPI Cards Grid */}
      <motion.div 
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
          <Card variant="glass" className="p-5 flex items-center justify-between h-full hover-glow">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Onboarded Schools</span>
              <div className="text-2xl font-black text-slate-800 dark:text-white mt-1">
                <AnimatedCounter to={totalSchools} />
              </div>
              <div className="text-[9px] font-bold text-slate-400 mt-0.5">{activeSchools} Active • {totalSchools - activeSchools} Suspended/Trial</div>
            </div>
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <School className="w-5 h-5" />
            </div>
          </Card>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
          <Card variant="glass" className="p-5 flex items-center justify-between h-full hover-glow">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Platform MRR</span>
              <div className="text-2xl font-black text-slate-850 dark:text-white mt-1">
                $<AnimatedCounter to={totalMRR} />
              </div>
              <div className="text-[9px] font-bold text-success mt-0.5">↑ 12.4% vs last month</div>
            </div>
            <div className="p-3 rounded-xl bg-success/10 text-success">
              <DollarSign className="w-5 h-5" />
            </div>
          </Card>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
          <Card variant="glass" className="p-5 flex items-center justify-between h-full hover-glow">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Students Monitored</span>
              <div className="text-2xl font-black text-slate-800 dark:text-white mt-1">
                <AnimatedCounter to={totalStudents} />
              </div>
              <div className="text-[9px] font-bold text-slate-400 mt-0.5">Across all virtual tenant nodes</div>
            </div>
            <div className="p-3 rounded-xl bg-secondary/10 text-secondary">
              <Users className="w-5 h-5" />
            </div>
          </Card>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
          <Card variant="glass" className="p-5 flex items-center justify-between h-full hover-glow">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">SaaS System Load</span>
              <div className="text-2xl font-black text-slate-800 dark:text-white mt-1">14.2%</div>
              <div className="text-[9px] font-bold text-success mt-0.5">Uptime: 99.99% • Healthy</div>
            </div>
            <div className="p-3 rounded-xl bg-purpleAccent/10 text-purpleAccent">
              <Activity className="w-5 h-5" />
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="glass" className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-slate-800 dark:text-white">School Growth Trend</h3>
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">12 Months</span>
          </div>
          <LineChart 
            data={[45, 48, 52, 58, 65, 74, 82, 88, 92, 95, 98, 100]} 
            labels={['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
            color="#2563EB"
          />
        </Card>

        <Card variant="glass" className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-slate-850 dark:text-white">MRR Performance ($)</h3>
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">6 Months</span>
          </div>
          <BarChart 
            data={[12, 18, 22, 28, 32, 36]} 
            labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
            color="#06B6D4"
          />
        </Card>
      </div>

      {/* Recent Tenant logs */}
      <Card variant="glass" className="flex flex-col gap-4">
        <h3 className="text-sm font-black text-slate-800 dark:text-white">Recent Security & Activity Logs</h3>
        <div className="overflow-x-auto border border-slate-100 dark:border-slate-850 rounded-xl">
          <table className="w-full text-left text-xs font-semibold">
            <thead className="bg-slate-50 dark:bg-slate-950 text-slate-400 text-[9px] uppercase tracking-wider border-b border-slate-100 dark:border-slate-850">
              <tr>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Module</th>
                <th className="px-4 py-3">Action Details</th>
                <th className="px-4 py-3">Change</th>
                <th className="px-4 py-3 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
              {auditLogs.slice(0, 3).map(log => (
                <tr key={log.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-900/40">
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-bold">{log.user}</td>
                  <td className="px-4 py-3">
                    <Badge variant="primary">{log.role}</Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{log.action}</td>
                  <td className="px-4 py-3 font-mono text-[10px] text-slate-500">
                    <span className="text-danger">{log.oldValue}</span> → <span className="text-success">{log.newValue}</span>
                  </td>
                  <td className="px-4 py-3 text-right text-slate-400 text-[10px]">{log.date} {log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
};

// ==========================================
// 2. SCHOOLS MANAGEMENT (Full Interactive CRUD)
// ==========================================
const SchoolsManagement: React.FC = () => {
  const { schools, addSchool, updateSchool, deleteSchool, toggleSchoolStatus } = useAppState();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingSchool, setEditingSchool] = useState<any | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [principal, setPrincipal] = useState('');
  const [plan, setPlan] = useState<'Starter' | 'Professional' | 'Enterprise'>('Starter');
  const [status, setStatus] = useState<'Active' | 'Suspended' | 'Trial'>('Active');
  const [billingCycle, setBillingCycle] = useState<'Monthly' | 'Annual'>('Monthly');
  const [logo, setLogo] = useState('🎓');

  const openAddModal = () => {
    setEditingSchool(null);
    setName('');
    setPrincipal('');
    setPlan('Starter');
    setStatus('Active');
    setBillingCycle('Monthly');
    setLogo('🎓');
    setModalOpen(true);
  };

  const openEditModal = (school: any) => {
    setEditingSchool(school);
    setName(school.name);
    setPrincipal(school.principal);
    setPlan(school.plan);
    setStatus(school.status);
    setBillingCycle(school.billingCycle);
    setLogo(school.logo);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSchool) {
      // Edit
      updateSchool({
        ...editingSchool,
        name,
        principal,
        plan,
        status,
        billingCycle,
        logo,
        mrr: plan === 'Enterprise' ? 1200 : plan === 'Professional' ? 450 : 150
      });
    } else {
      // Add
      addSchool({
        name,
        principal,
        plan,
        status,
        billingCycle,
        logo
      });
    }
    setModalOpen(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-black text-slate-800 dark:text-white">Tenant Schools Registry</h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Orchestrate virtual school spaces on this SaaS node.</p>
        </div>
        <Button variant="primary" onClick={openAddModal} className="shrink-0 shadow-lg shadow-primary/20 select-none">
          <Plus className="w-4 h-4 mr-1.5" />
          Onboard School
        </Button>
      </div>

      {/* Schools Table Card */}
      <Card variant="glass" className="p-5 flex flex-col gap-4 bg-white/70 dark:bg-slate-900/70">
        <div className="overflow-x-auto border border-slate-100 dark:border-slate-850 rounded-xl">
          <table className="w-full text-left text-xs font-semibold">
            <thead className="bg-slate-50 dark:bg-slate-950 text-slate-400 text-[9px] uppercase tracking-wider border-b border-slate-100 dark:border-slate-850">
              <tr>
                <th className="px-4 py-3">School Space</th>
                <th className="px-4 py-3">Principal</th>
                <th className="px-4 py-3">Subscription</th>
                <th className="px-4 py-3">Scale</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
              {schools.map(school => (
                <tr key={school.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-900/40">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-lg p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 select-none shrink-0">{school.logo}</span>
                      <div className="min-w-0">
                        <div className="text-slate-800 dark:text-white font-bold truncate">{school.name}</div>
                        <div className="text-[9px] font-bold text-slate-400 dark:text-slate-555 mt-0.5">Joined {school.joinedDate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-650 dark:text-slate-350">{school.principal}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="text-slate-800 dark:text-white font-extrabold">{school.plan}</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">${school.mrr}/mo • {school.billingCycle}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col text-slate-500">
                      <span>{school.studentCount.toLocaleString()} Students</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">{school.teacherCount} Teachers</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={school.status === 'Active' ? 'success' : school.status === 'Suspended' ? 'danger' : 'warning'}>
                      {school.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button 
                        onClick={() => openEditModal(school)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-primary transition-colors"
                        title="Edit Details"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => toggleSchoolStatus(school.id)}
                        className={`p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                          school.status === 'Active' ? 'text-danger hover:text-danger' : 'text-success hover:text-success'
                        }`}
                        title={school.status === 'Active' ? 'Suspend School' : 'Activate School'}
                      >
                        <ShieldAlert className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteSchool(school.id)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-danger transition-colors"
                        title="Delete School"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Onboard / Edit School Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingSchool ? `Modify ${name}` : 'Onboard New School Tenant'}
      >
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <Input 
            label="School Name"
            required
            placeholder="e.g., Maplewood Prep Academy"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input 
            label="Principal / Director Name"
            required
            placeholder="e.g., Mrs. Julia Vance"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400">Subscription Tier</label>
              <select 
                value={plan}
                onChange={(e) => setPlan(e.target.value as any)}
                className="px-3 py-2.5 rounded-[12px] text-xs font-semibold bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
              >
                <option value="Starter">Starter ($150/mo)</option>
                <option value="Professional">Professional ($450/mo)</option>
                <option value="Enterprise">Enterprise ($1,200/mo)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400">Billing Cycle</label>
              <select 
                value={billingCycle}
                onChange={(e) => setBillingCycle(e.target.value as any)}
                className="px-3 py-2.5 rounded-[12px] text-xs font-semibold bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
              >
                <option value="Monthly">Monthly</option>
                <option value="Annual">Annual (Save 20%)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400">District status</label>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="px-3 py-2.5 rounded-[12px] text-xs font-semibold bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
              >
                <option value="Active">Active Space</option>
                <option value="Trial">Trial Space</option>
                <option value="Suspended">Suspended / Locked</option>
              </select>
            </div>

            <Input 
              label="Logo Representative Emoji"
              required
              placeholder="e.g. 🎒, 🏫, 🏛️"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingSchool ? 'Save Changes' : 'Onboard Space'}
            </Button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
};

// ==========================================
// 3. SUBSCRIPTIONS MANAGEMENT
// ==========================================
const SubscriptionsManagement: React.FC = () => {
  const { schools } = useAppState();

  const trialCount = schools.filter(s => s.status === 'Trial').length;
  const activeCount = schools.filter(s => s.status === 'Active').length;
  const suspendedCount = schools.filter(s => s.status === 'Suspended').length;

  const totalMRR = schools.filter(s => s.status === 'Active').reduce((sum, s) => sum + s.mrr, 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-black text-slate-800 dark:text-white">Subscription Portfolios</h1>
        <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Monitor monthly recurring revenue streams.</p>
      </div>

      {/* Portfolio Breakdown Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card variant="glass" className="p-5 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Annualized ARR</span>
          <div className="text-2xl font-black text-slate-800 dark:text-white mt-1">
            $<AnimatedCounter to={totalMRR * 12} />
          </div>
        </Card>
        <Card variant="glass" className="p-5 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Active Accounts</span>
          <div className="text-2xl font-black text-success mt-1">{activeCount} Schools</div>
        </Card>
        <Card variant="glass" className="p-5 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Trial Spaces</span>
          <div className="text-2xl font-black text-warning mt-1">{trialCount} Pending</div>
        </Card>
        <Card variant="glass" className="p-5 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Suspended Accounts</span>
          <div className="text-2xl font-black text-danger mt-1">{suspendedCount} Locked</div>
        </Card>
      </div>

      {/* Billing limit cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="glass" className="p-6 flex flex-col gap-4 border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-black text-slate-800 dark:text-white">Starter tier</h4>
              <p className="text-[10px] font-bold text-slate-400 mt-0.5">350 Students Limit</p>
            </div>
            <Badge variant="info">Basic API</Badge>
          </div>
          <hr className="border-slate-150 dark:border-slate-800" />
          <div className="text-xs font-semibold text-slate-500 flex flex-col gap-2">
            <div>Active Nodes: {schools.filter(s => s.plan === 'Starter' && s.status === 'Active').length}</div>
            <div>MRR Generated: ${schools.filter(s => s.plan === 'Starter' && s.status === 'Active').length * 150}/mo</div>
          </div>
        </Card>

        <Card variant="glass" className="p-6 flex flex-col gap-4 border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-black text-slate-800 dark:text-white">Professional Tier</h4>
              <p className="text-[10px] font-bold text-slate-400 mt-0.5">1,000 Students Limit</p>
            </div>
            <Badge variant="primary">Advanced SVGs</Badge>
          </div>
          <hr className="border-slate-155 dark:border-slate-800" />
          <div className="text-xs font-semibold text-slate-500 flex flex-col gap-2">
            <div>Active Nodes: {schools.filter(s => s.plan === 'Professional' && s.status === 'Active').length}</div>
            <div>MRR Generated: ${schools.filter(s => s.plan === 'Professional' && s.status === 'Active').length * 450}/mo</div>
          </div>
        </Card>

        <Card variant="glass" className="p-6 flex flex-col gap-4 border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-black text-slate-800 dark:text-white">Enterprise Tier</h4>
              <p className="text-[10px] font-bold text-slate-400 mt-0.5">Unlimited Limits</p>
            </div>
            <Badge variant="purple">AI Predictions</Badge>
          </div>
          <hr className="border-slate-155 dark:border-slate-800" />
          <div className="text-xs font-semibold text-slate-500 flex flex-col gap-2">
            <div>Active Nodes: {schools.filter(s => s.plan === 'Enterprise' && s.status === 'Active').length}</div>
            <div>MRR Generated: ${schools.filter(s => s.plan === 'Enterprise' && s.status === 'Active').length * 1200}/mo</div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

// ==========================================
// 4. AUDIT LOGS (TIMELINE VIEW)
// ==========================================
const SuperAdminAuditLogs: React.FC = () => {
  const { auditLogs } = useAppState();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-black text-slate-800 dark:text-white">Platform Audit Trails</h1>
        <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Timeline of all administrative mutations on this node.</p>
      </div>

      <Card variant="glass" className="p-6 bg-white/70 dark:bg-slate-900/70">
        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 pl-6 ml-3 flex flex-col gap-8">
          {auditLogs.map(log => (
            <div key={log.id} className="relative">
              {/* Timeline marker icon */}
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
    </motion.div>
  );
};

// ==========================================
// 5. PLATFORM SETTINGS (Security & Visual RBAC Matrix)
// ==========================================
const SuperAdminSettings: React.FC = () => {
  const { securitySettings, updateSecuritySettings } = useAppState();

  const [passwordLength, setPasswordLength] = useState(securitySettings.passwordLength);
  const [requireSpecialChar, setRequireSpecialChar] = useState(securitySettings.requireSpecialChar);
  const [sessionTimeout, setSessionTimeout] = useState(securitySettings.sessionTimeout);
  const [mfaEnabled, setMfaEnabled] = useState(securitySettings.mfaEnabled);

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    updateSecuritySettings({
      passwordLength,
      requireSpecialChar,
      sessionTimeout,
      mfaEnabled
    });
  };

  // RBAC Permission Grid Matrix Mock data
  const rbacMatrix = [
    { role: 'Super Admin', viewDashboard: true, manageSchools: true, manageAttendance: true, editSettings: true, viewLogs: true },
    { role: 'School Admin', viewDashboard: true, manageSchools: false, manageAttendance: true, editSettings: true, viewLogs: true },
    { role: 'Teacher', viewDashboard: true, manageSchools: false, manageAttendance: true, editSettings: false, viewLogs: false }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-black text-slate-800 dark:text-white">Security & RBAC Controls</h1>
        <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Global access policies and visual permission matrix.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Security Policy Configuration Form */}
        <Card variant="glass" className="lg:col-span-1 p-6 flex flex-col gap-4 bg-white/70 dark:bg-slate-900/70">
          <h3 className="text-sm font-black text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">Security Policies</h3>
          <form onSubmit={handleSaveSecurity} className="flex flex-col gap-4">
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400">Min. Password Length</label>
              <input 
                type="number"
                min="6"
                max="20"
                value={passwordLength}
                onChange={(e) => setPasswordLength(parseInt(e.target.value))}
                className="px-3 py-2 rounded-[10px] text-xs font-semibold bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none dark:text-white"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400">Session Idle Timeout (Minutes)</label>
              <input 
                type="number"
                min="5"
                max="120"
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(parseInt(e.target.value))}
                className="px-3 py-2 rounded-[10px] text-xs font-semibold bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none dark:text-white"
              />
            </div>

            <label className="flex items-center gap-3 cursor-pointer select-none text-xs font-semibold mt-1">
              <input 
                type="checkbox"
                checked={requireSpecialChar}
                onChange={(e) => setRequireSpecialChar(e.target.checked)}
                className="rounded text-primary focus:ring-primary/20 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
              />
              Require Special Characters
            </label>

            <label className="flex items-center gap-3 cursor-pointer select-none text-xs font-semibold">
              <input 
                type="checkbox"
                checked={mfaEnabled}
                onChange={(e) => setMfaEnabled(e.target.checked)}
                className="rounded text-primary focus:ring-primary/20 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
              />
              Enforce MFA for Administrators
            </label>

            <Button variant="primary" type="submit" className="w-full mt-4">
              Apply Policies
            </Button>
          </form>
        </Card>

        {/* Visual RBAC Matrix */}
        <Card variant="glass" className="lg:col-span-2 p-6 flex flex-col gap-4 bg-white/70 dark:bg-slate-900/70">
          <h3 className="text-sm font-black text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            Role-Based Access Control (RBAC) Permissions Matrix
          </h3>
          <div className="overflow-x-auto border border-slate-100 dark:border-slate-850 rounded-xl">
            <table className="w-full text-left text-xs font-semibold">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-400 text-[9px] uppercase tracking-wider border-b border-slate-100 dark:border-slate-850">
                <tr>
                  <th className="px-4 py-3">Access Role</th>
                  <th className="px-4 py-3 text-center">Dashboard</th>
                  <th className="px-4 py-3 text-center">Manage Districts</th>
                  <th className="px-4 py-3 text-center">Class Marking</th>
                  <th className="px-4 py-3 text-center">System Settings</th>
                  <th className="px-4 py-3 text-center">Platform Logs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                {rbacMatrix.map(row => (
                  <tr key={row.role} className="hover:bg-slate-50/40 dark:hover:bg-slate-900/40">
                    <td className="px-4 py-3 text-slate-800 dark:text-white font-bold">{row.role}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs ${row.viewDashboard ? 'text-success font-black' : 'text-slate-300 dark:text-slate-700'}`}>
                        {row.viewDashboard ? '● Enabled' : '○ Disabled'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs ${row.manageSchools ? 'text-success font-black' : 'text-slate-300 dark:text-slate-750'}`}>
                        {row.manageSchools ? '● Enabled' : '○ Disabled'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs ${row.manageAttendance ? 'text-success font-black' : 'text-slate-300 dark:text-slate-750'}`}>
                        {row.manageAttendance ? '● Enabled' : '○ Disabled'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs ${row.editSettings ? 'text-success font-black' : 'text-slate-300 dark:text-slate-750'}`}>
                        {row.editSettings ? '● Enabled' : '○ Disabled'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs ${row.viewLogs ? 'text-success font-black' : 'text-slate-300 dark:text-slate-750'}`}>
                        {row.viewLogs ? '● Enabled' : '○ Disabled'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

      </div>
    </motion.div>
  );
};
