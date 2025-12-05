import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Settings, LogOut, Download, Filter, 
  TrendingUp, AlertTriangle, Package, MapPin, Calendar, 
  Search, Plus, Trash2, Edit, Cpu, Menu, X, FileText, DollarSign, BarChart3, Network, ChevronRight, ArrowLeft, Building2, Activity, CheckCircle2, Clock, BadgeCheck, Phone, Mail
} from 'lucide-react';
import logoMain from '../assets/logo_final.png';
import AiCopilot from '../components/AiCopilot';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userInfo')) || { name: 'Super Admin' };
  const [activeTab, setActiveTab] = useState('analytics');
  const [requests, setRequests] = useState([]);
  const [operators, setOperators] = useState([]); // ✅ New State for Operators
  
  // URLs
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";
  const API_URL = `${BASE_URL}/api/requests`;
  const OP_URL = `${BASE_URL}/api/operators`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Requests
        const res = await fetch(API_URL);
        if(res.ok) setRequests(await res.json());

        // ✅ Fetch Operators (Dynamic)
        const opRes = await fetch(OP_URL);
        if(opRes.ok) setOperators(await opRes.json());

      } catch (err) { console.error("Error fetching data"); }
    };
    fetchData();
  }, []);

  // ... (Keep your existing analytics logic/chart code here if you want charts) ...

  const handleLogout = () => { localStorage.removeItem('userInfo'); navigate('/login'); };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800 relative">
      <aside className="fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white shadow-2xl md:flex md:flex-col">
        <div className="p-6 border-b border-slate-800"><img src={logoMain} className="h-10 w-auto bg-white rounded p-1" /></div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <button onClick={() => setActiveTab('analytics')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === 'analytics' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}><LayoutDashboard size={18} /> Global Analytics</button>
          <button onClick={() => setActiveTab('operators')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === 'operators' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}><Users size={18} /> Drone Operators</button>
        </nav>
        <div className="p-4 border-t border-slate-800"><button onClick={handleLogout} className="w-full flex items-center gap-2 text-red-400 hover:bg-slate-800 p-3 rounded-xl"><LogOut size={16} /> Logout</button></div>
      </aside>

      <main className="flex-1 md:ml-64 overflow-hidden flex flex-col relative w-full">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between shadow-sm z-10">
          <h1 className="text-2xl font-bold text-slate-800">{activeTab === 'operators' ? 'Operator Management' : 'Admin Command Center'}</h1>
          <div className="bg-purple-50 px-3 py-1 rounded-full text-xs font-semibold text-purple-700 flex items-center gap-2 border border-purple-100"><Cpu size={14} /> Admin AI</div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
            
            {/* ✅ OPERATORS TAB - DYNAMIC DISPLAY */}
            {activeTab === 'operators' && (
                <div className="max-w-7xl mx-auto">
                    {operators.length === 0 ? (
                        <div className="text-center p-10 text-slate-400">No operators registered yet. Add them from Hospital Dashboard.</div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {operators.map(op => (
                                <div key={op._id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
                                    <div className="w-full md:w-1/3 h-48 md:h-auto bg-slate-100 relative flex items-center justify-center">
                                        <Users size={64} className="text-slate-300"/>
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                            <h3 className="text-white font-bold text-lg">{op.name}</h3>
                                            <p className="text-white/80 text-xs">{op.role}</p>
                                        </div>
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col justify-between">
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-start">
                                                <div><p className="text-xs text-slate-500 uppercase font-bold">Assigned Zone</p><p className="font-bold text-blue-600 flex items-center gap-1"><MapPin size={14}/> {op.subDistrict}</p></div>
                                                <div className="text-right"><p className="text-xs text-slate-500 uppercase font-bold">Experience</p><p className="font-bold text-slate-800">{op.experience}</p></div>
                                            </div>
                                            <div className="space-y-2 text-sm text-slate-600">
                                                <div className="flex items-center gap-2"><Phone size={14} className="text-slate-400"/> {op.contact?.phone || op.phone}</div>
                                                <div className="flex items-center gap-2"><Mail size={14} className="text-slate-400"/> {op.contact?.email || op.email}</div>
                                            </div>
                                        </div>
                                        <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-3 gap-2">
                                                <div className="flex flex-col items-center p-2 bg-green-50 rounded-lg border border-green-100"><BadgeCheck size={16} className="text-green-600 mb-1"/><span className="text-[10px] font-bold text-green-700">Verified</span></div>
                                                <div className="flex flex-col items-center p-2 bg-green-50 rounded-lg border border-green-100"><Activity size={16} className="text-green-600 mb-1"/><span className="text-[10px] font-bold text-green-700">Medical Fit</span></div>
                                                <div className="flex flex-col items-center p-2 bg-blue-50 rounded-lg border border-blue-100"><span className="text-lg font-bold text-blue-600 leading-none">Active</span><span className="text-[10px] font-bold text-blue-700">Status</span></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* (Keep your Analytics Tab code here if needed) */}
            {activeTab === 'analytics' && (
                <div className="text-center text-slate-500 mt-20">Analytics Dashboard View...</div>
            )}
        </div>
      </main>
    </div>
  );
};
export default AdminDashboard;