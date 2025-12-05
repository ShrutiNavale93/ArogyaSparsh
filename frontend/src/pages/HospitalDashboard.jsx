import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, Users, Package, LogOut, 
  MapPin, CheckCircle2, Clock, AlertOctagon, 
  Plane, Plus, Minus, Map as MapIcon, X, Menu,
  ClipboardList, Filter, MessageCircle, Send, AlertTriangle, 
  TrendingUp, Terminal, UserPlus, Briefcase, Phone, Mail, 
  Trash2, Globe, FileText
} from 'lucide-react';

// --- ERROR BOUNDARY (Prevents White Screen) ---
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong.</h1>
          <p className="bg-red-50 p-4 rounded border border-red-200 text-red-800 font-mono text-sm inline-block">
            {this.state.error && this.state.error.toString()}
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="block mx-auto mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Reload Application
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- SUB-COMPONENTS ---

const AiCopilot = ({ contextData, isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { role: 'system', text: 'Hello. I am your AeroMed Copilot. I can assist with inventory forecasting and flight status.' }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'system', 
        text: `Analysis complete for "${newMsg.text}". Flight parameters for active drones are within safety limits.` 
      }]);
    }, 1000);
  };

  if (!isOpen) return null; 

  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden animate-in slide-in-from-bottom-5">
      <div className="bg-slate-900 p-3 text-white flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MessageCircle size={18} />
          <span className="font-semibold">AeroCopilot</span>
        </div>
        <button onClick={onClose} className="hover:bg-slate-700 p-1 rounded">
          <X size={16} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
        {messages.map((msg, idx) => (
          <div key={idx} className={`p-2 rounded-lg max-w-[85%] text-xs ${msg.role === 'user' ? 'bg-blue-100 self-end text-blue-900' : 'bg-white border border-gray-200 self-start text-gray-800 shadow-sm'}`}>
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="p-3 bg-white border-t flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type query..."
          className="flex-1 border rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button onClick={handleSend} className="bg-slate-900 text-white px-3 py-1 rounded text-xs hover:bg-slate-800">Send</button>
      </div>
    </div>
  );
};

const RealisticFlightTracker = ({ origin, destination, onDeliveryComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onDeliveryComplete) onDeliveryComplete();
    }, 10000);
    return () => clearTimeout(timer);
  }, [onDeliveryComplete]);

  return (
    <div className="w-full h-80 bg-slate-900 rounded-xl overflow-hidden relative shadow-inner border border-slate-700">
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
           {[...Array(48)].map((_, i) => (
             <div key={i} className="border border-slate-700/50" />
           ))}
        </div>
      </div>
      <div className="absolute top-4 left-4 text-[10px] font-mono text-green-400 bg-slate-900/90 p-2 rounded border border-green-500/30 shadow-lg">
        <div className="flex items-center gap-2 mb-1"><Activity size={10} className="animate-pulse"/> TELEMETRY ACTIVE</div>
        <div>ALTITUDE: 450m | SPEED: 85km/h</div>
        <div>LAT: {origin.lat?.toFixed(3)} | LNG: {origin.lng?.toFixed(3)}</div>
        <div className="text-blue-300 mt-1">EST. ARRIVAL: &lt; 2 MINS</div>
      </div>
      
      {/* Flight Path Animation */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <path d="M 100 250 Q 400 50 700 250" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="8,8">
          <animate attributeName="stroke-dashoffset" from="100" to="0" dur="3s" repeatCount="indefinite" />
        </path>
        {/* Origin Point */}
        <circle cx="100" cy="250" r="4" fill="#ef4444" />
        <text x="80" y="270" fill="white" fontSize="10" fontFamily="monospace">HOSPITAL</text>
        {/* Dest Point */}
        <circle cx="700" cy="250" r="4" fill="#22c55e" />
        <text x="680" y="270" fill="white" fontSize="10" fontFamily="monospace">PHC ZONE</text>
      </svg>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <Plane className="text-blue-400 w-10 h-10 animate-pulse rotate-45" />
          <div className="absolute -inset-4 border border-blue-500/30 rounded-full animate-ping"></div>
        </div>
      </div>
    </div>
  );
};

// --- CONSTANTS ---
const PLACEHOLDER_MED = "https://placehold.co/100x100?text=Rx";
const LOGO_URL = "https://placehold.co/150x50?text=AeroMed+Logo";

const PHC_COORDINATES = {
  "PHC Chamorshi": { lat: 19.9280, lng: 79.9050 },
  "PHC Gadhchiroli": { lat: 20.1849, lng: 79.9948 },
};
const HOSPITAL_LOC = { lat: 19.9260, lng: 79.9033 }; 

const LOCAL_MEDICINE_DB = [
  { id: 6, name: 'Inj. Atropine', img: PLACEHOLDER_MED },
  { id: 7, name: 'Inj. Adrenaline', img: PLACEHOLDER_MED },
  { id: 8, name: 'Inj. Hydrocortisone', img: PLACEHOLDER_MED },
  { id: 10, name: 'Inj. Dexamethasone', img: PLACEHOLDER_MED },
  { id: 11, name: 'Inj. KCl (Potassium)', img: PLACEHOLDER_MED },
  { id: 25, name: 'IV Paracetamol', img: PLACEHOLDER_MED },
];

// --- MAIN COMPONENT ---

function HospitalDashboard() {
  // State
  const [activeTab, setActiveTab] = useState('alerts');
  const [requests, setRequests] = useState([]); 
  const [inventory, setInventory] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [activeMissions, setActiveMissions] = useState([]);
  const [aiLogs, setAiLogs] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [chatMessage, setChatMessage] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', stock: '', expiry: '' });
  
  // Operator Form State
  const [operatorForm, setOperatorForm] = useState({
      name: '', role: 'Pilot', subDistrict: 'Chamorshi', phone: '', email: ''
  });

  // Derived State helpers
  const activeChatRequest = requests.find(r => r._id === activeChatId);

  // --- MOCK DATA INITIALIZATION ---
  useEffect(() => {
    // Simulate Fetching Requests
    const mockRequests = [
      { 
        _id: '101', 
        phc: 'PHC Chamorshi', 
        urgency: 'Critical', 
        status: 'Pending', 
        item: 'Inj. Atropine', 
        qty: 10, 
        createdAt: new Date().toISOString(),
        distance: '12km',
        chat: []
      },
      { 
        _id: '102', 
        phc: 'PHC Gadhchiroli', 
        urgency: 'High', 
        status: 'Pending', 
        item: 'IV Paracetamol', 
        qty: 50, 
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        distance: '8km',
        chat: [{sender: 'PHC', message: 'Urgent requirement due to accident case.', timestamp: new Date().toISOString()}]
      }
    ];
    setRequests(mockRequests);

    // Simulate Fetching Inventory
    const mockInventory = LOCAL_MEDICINE_DB.map(item => ({
      ...item,
      stock: Math.floor(Math.random() * 50) + 10,
      expiry: '2024-12-31'
    }));
    setInventory(mockInventory);

    // Initial Log
    addLog("System initialized. Connected to Satellite Link.", "text-blue-400");
  }, []);

  // --- ACTIONS ---

  const addLog = (msg, color = "text-green-400") => {
    setAiLogs(prev => [{ time: new Date().toLocaleTimeString(), msg, color }, ...prev].slice(0, 20));
  };

  const handleApprove = (id) => {
    setRequests(prev => prev.map(r => r._id === id ? { ...r, status: 'Approved' } : r));
    addLog(`Request ${id} Approved by Admin. Awaiting Dispatch.`, "text-yellow-400");
  };

  const handleReject = (id) => {
    setRequests(prev => prev.map(r => r._id === id ? { ...r, status: 'Rejected' } : r));
  };

  const handleDispatch = (req) => {
    if(!window.confirm(`Confirm launch sequence for ${req.phc}?`)) return;
    
    // Update status
    setRequests(prev => prev.map(r => r._id === req._id ? { ...r, status: 'Dispatched' } : r));
    
    // Create Mission
    const dest = PHC_COORDINATES[req.phc] || PHC_COORDINATES["PHC Chamorshi"];
    const mission = { id: req._id, phc: req.phc, destination: dest };
    setActiveMissions([mission]); // Demo: only 1 active mission at a time
    
    // Switch tab
    setActiveTab('map');
    addLog(`LAUNCH CONFIRMED. Drone en route to ${req.phc}`, "text-red-400 font-bold");
  };

  const handleDeliveryComplete = () => {
    if(activeMissions.length === 0) return;
    const mission = activeMissions[0];
    
    setRequests(prev => prev.map(r => r._id === mission.id ? { ...r, status: 'Delivered' } : r));
    setActiveMissions([]);
    addLog(`PACKAGE DELIVERED successfully to ${mission.phc}`, "text-green-400 font-bold");
    
    setTimeout(() => {
      alert(`✅ Mission Success: Package delivered to ${mission.phc}`);
      setActiveTab('alerts');
    }, 1000);
  };

  const handleSendMessage = () => {
    if(!chatMessage.trim() || !activeChatId) return;
    setRequests(prev => prev.map(r => {
      if(r._id === activeChatId) {
        return {
          ...r,
          chat: [...(r.chat || []), { sender: 'Hospital', message: chatMessage, timestamp: new Date().toISOString() }]
        };
      }
      return r;
    }));
    setChatMessage("");
  };

  const handleOperatorSubmit = (e) => {
    e.preventDefault();
    alert(`✅ Operator "${operatorForm.name}" registered successfully! (Mock Action)`);
    setOperatorForm({ name: '', role: 'Pilot', subDistrict: 'Chamorshi', phone: '', email: '' });
  };

  const updateStock = (id, amount) => {
    setInventory(prev => prev.map(item => item.id === id ? { ...item, stock: Math.max(0, item.stock + amount) } : item));
  };

  const handleLogout = () => {
    if(confirm("Are you sure you want to logout?")) {
      window.location.reload(); // Simple reload to simulate logout in this environment
    }
  };

  // --- RENDER ---

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800 relative overflow-hidden">
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 z-30 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:flex md:flex-col`}>
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <Activity className="text-blue-500" /> AeroMed
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-slate-400">
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'alerts', icon: AlertOctagon, label: 'Command Center' },
            { id: 'analytics', icon: TrendingUp, label: 'AI Analytics' },
            { id: 'map', icon: MapIcon, label: 'Live Tracking' },
            { id: 'inventory', icon: Package, label: 'Inventory' },
            { id: 'operators', icon: Users, label: 'Operators' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
              <item.icon size={18} /> {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="w-full flex items-center gap-2 text-red-400 hover:bg-slate-800 p-3 rounded-xl transition-colors">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm z-10 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-slate-600">
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-slate-800 uppercase tracking-wide">
              {activeTab === 'alerts' ? 'Autonomous Dispatch' : activeTab.replace('-', ' ')}
            </h1>
          </div>
          <div className="flex items-center gap-3">
             <div className="hidden md:flex bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-100 items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                SYSTEM ONLINE
             </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50/50">
          
          {/* TAB: ALERTS (COMMAND CENTER) */}
          {activeTab === 'alerts' && (
            <div className="max-w-5xl mx-auto space-y-4">
              {requests.map(req => (
                <div key={req._id} className={`bg-white rounded-xl p-5 border shadow-sm transition-all ${req.status === 'Rejected' ? 'opacity-50 grayscale' : 'hover:shadow-md'}`}>
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-full shrink-0 ${req.urgency === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                        {req.urgency === 'Critical' ? <AlertOctagon size={24} /> : <ClipboardList size={24} />}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                          {req.phc}
                          <span className={`text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-bold ${
                            req.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                            req.status === 'Dispatched' ? 'bg-purple-100 text-purple-700' :
                            req.status === 'Approved' ? 'bg-blue-100 text-blue-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {req.status}
                          </span>
                        </h3>
                        <p className="text-sm text-slate-500 mt-1 font-medium">{req.qty}x {req.item}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                           <span className="flex items-center gap-1"><Clock size={12}/> {new Date(req.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                           <span className="flex items-center gap-1"><MapPin size={12}/> {req.distance} away</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 self-end md:self-center">
                       <button onClick={() => setActiveChatId(req._id)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full">
                         <MessageCircle size={20} />
                       </button>
                       
                       {req.status === 'Pending' && (
                         <>
                           <button onClick={() => handleReject(req._id)} className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium border border-transparent hover:border-red-100">Reject</button>
                           <button onClick={() => handleApprove(req._id)} className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 shadow-lg shadow-slate-900/20">Approve Request</button>
                         </>
                       )}
                       
                       {req.status === 'Approved' && (
                         <button onClick={() => handleDispatch(req)} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700 animate-pulse shadow-lg shadow-green-600/30 flex items-center gap-2">
                           <Plane size={16}/> DISPATCH DRONE
                         </button>
                       )}

                        {(req.status === 'Dispatched' || req.status === 'Delivered') && (
                          <div className="text-xs font-bold text-slate-400 flex flex-col items-end">
                             <span>MISSION ID: #MSN-{req._id}</span>
                             <span className="text-green-600">{req.status === 'Delivered' ? 'SUCCESSFUL' : 'IN PROGRESS'}</span>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              ))}
              {requests.length === 0 && <div className="text-center py-10 text-slate-400">No active requests</div>}
            </div>
          )}

          {/* TAB: ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Fake AI Predictions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 {[
                   { label: 'Predicted Demand', val: '+12%', color: 'text-green-600', icon: TrendingUp },
                   { label: 'Risk Assessment', val: 'Low', color: 'text-blue-600', icon: AlertTriangle },
                   { label: 'Drone Efficiency', val: '98.5%', color: 'text-purple-600', icon: Activity },
                 ].map((stat, i) => (
                   <div key={i} className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4">
                     <div className="p-3 bg-slate-50 rounded-full text-slate-600"><stat.icon size={24}/></div>
                     <div>
                       <p className="text-xs font-bold text-slate-400 uppercase">{stat.label}</p>
                       <p className={`text-2xl font-bold ${stat.color}`}>{stat.val}</p>
                     </div>
                   </div>
                 ))}
              </div>

              {/* System Console */}
              <div className="bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col h-96">
                <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
                  <Terminal size={14} className="text-slate-400" />
                  <span className="text-xs font-mono text-slate-300">AeroMed_Sys_Log.txt</span>
                </div>
                <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-1">
                  {aiLogs.map((log, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-slate-500 shrink-0">[{log.time}]</span>
                      <span className={log.color}>{log.msg}</span>
                    </div>
                  ))}
                  {aiLogs.length === 0 && <span className="text-slate-600">Waiting for system events...</span>}
                </div>
              </div>
            </div>
          )}

          {/* TAB: MAP */}
          {activeTab === 'map' && (
            <div className="max-w-5xl mx-auto h-full flex flex-col">
              <div className="bg-white p-4 rounded-xl border shadow-sm mb-4 flex justify-between items-center">
                 <div>
                    <h2 className="font-bold text-slate-800 flex items-center gap-2">
                       <div className={`w-3 h-3 rounded-full ${activeMissions.length > 0 ? 'bg-red-500 animate-pulse' : 'bg-slate-300'}`}></div>
                       Live Mission Status
                    </h2>
                    <p className="text-xs text-slate-500">
                      {activeMissions.length > 0 ? `Tracking Mission #${activeMissions[0].id}` : 'No active drones in airspace.'}
                    </p>
                 </div>
                 {activeMissions.length > 0 && (
                   <button onClick={() => setActiveTab('alerts')} className="text-sm text-blue-600 font-medium hover:underline">
                     View Request Details
                   </button>
                 )}
              </div>
              
              {activeMissions.length > 0 ? (
                <RealisticFlightTracker 
                  origin={HOSPITAL_LOC} 
                  destination={activeMissions[0].destination} 
                  onDeliveryComplete={handleDeliveryComplete} 
                />
              ) : (
                <div className="flex-1 bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400">
                  <Globe size={64} className="mb-4 opacity-50" />
                  <p className="font-medium">Waiting for dispatch orders...</p>
                </div>
              )}
            </div>
          )}

          {/* TAB: INVENTORY */}
          {activeTab === 'inventory' && (
             <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Central Inventory</h2>
                    <button 
                      onClick={() => setShowAddModal(true)} 
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 flex gap-2 items-center shadow-lg shadow-blue-600/20"
                    >
                      <Plus size={16}/> Add Stock
                    </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {inventory.map(item => (
                    <div key={item.id} className="bg-white p-4 rounded-xl border shadow-sm flex flex-col items-center text-center relative group hover:shadow-md transition-all">
                       <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3 text-slate-300">
                          <Package size={32} />
                       </div>
                       <h3 className="font-bold text-slate-800 text-sm mb-1">{item.name}</h3>
                       <p className="text-xs text-slate-500 mb-3">Exp: {item.expiry}</p>
                       <div className="flex items-center gap-3 bg-slate-50 rounded-lg px-2 py-1">
                          <button onClick={() => updateStock(item.id, -1)} className="hover:text-red-500"><Minus size={14}/></button>
                          <span className={`text-sm font-bold ${item.stock < 15 ? 'text-red-500' : 'text-slate-700'}`}>{item.stock}</span>
                          <button onClick={() => updateStock(item.id, 1)} className="hover:text-green-500"><Plus size={14}/></button>
                       </div>
                    </div>
                  ))}
                </div>
             </div>
          )}

          {/* TAB: OPERATORS */}
          {activeTab === 'operators' && (
            <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl border shadow-lg">
                <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                      <UserPlus size={24}/>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Operator Registration</h2>
                        <p className="text-sm text-slate-500">Onboard new pilots and technicians</p>
                    </div>
                </div>
                <form onSubmit={handleOperatorSubmit} className="space-y-5">
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Full Name</label>
                        <input className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors" required placeholder="e.g. Pilot Name" value={operatorForm.name} onChange={e=>setOperatorForm({...operatorForm, name: e.target.value})}/>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Role</label>
                            <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg" value={operatorForm.role} onChange={e=>setOperatorForm({...operatorForm, role: e.target.value})}>
                                <option>Pilot</option>
                                <option>Technician</option>
                                <option>Logistics</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Zone</label>
                            <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg" value={operatorForm.subDistrict} onChange={e=>setOperatorForm({...operatorForm, subDistrict: e.target.value})}>
                                <option>Chamorshi</option>
                                <option>Gadhchiroli</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Contact Email</label>
                        <input type="email" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors" required placeholder="pilot@aeromed.com" value={operatorForm.email} onChange={e=>setOperatorForm({...operatorForm, email: e.target.value})}/>
                    </div>
                    <button type="submit" className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2">
                        <Send size={18}/> Submit Registration
                    </button>
                </form>
            </div>
          )}

        </div>
        
        {/* Floating Copilot Trigger */}
        <button 
           onClick={() => setIsCopilotOpen(!isCopilotOpen)}
           className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white p-4 rounded-full shadow-2xl hover:bg-slate-800 transition-transform hover:scale-110 flex items-center justify-center"
        >
           {isCopilotOpen ? <X size={24}/> : <MessageCircle size={24}/>}
        </button>
        <AiCopilot isOpen={isCopilotOpen} onClose={() => setIsCopilotOpen(false)} />
        
        {/* Chat Modal */}
        {activeChatId && activeChatRequest && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
             <div className="bg-white w-full max-w-md h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
                <div className="bg-blue-600 p-4 text-white flex justify-between items-center shrink-0">
                   <h3 className="font-bold flex items-center gap-2"><MessageCircle size={18}/> {activeChatRequest.phc}</h3>
                   <button onClick={() => setActiveChatId(null)}><X size={20}/></button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-3">
                   {activeChatRequest.chat?.length === 0 && <p className="text-center text-slate-400 text-sm mt-10">No messages yet.</p>}
                   {activeChatRequest.chat?.map((c, i) => (
                     <div key={i} className={`flex ${c.sender === 'Hospital' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-xl text-sm ${c.sender === 'Hospital' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border text-slate-700 rounded-bl-none'}`}>
                           <p>{c.message}</p>
                           <p className="text-[10px] opacity-70 mt-1 text-right">{new Date(c.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</p>
                        </div>
                     </div>
                   ))}
                </div>
                <div className="p-3 bg-white border-t flex gap-2 shrink-0">
                   <input className="flex-1 bg-slate-100 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 ring-blue-500" placeholder="Type message..." value={chatMessage} onChange={e => setChatMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} />
                   <button onClick={handleSendMessage} className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"><Send size={18}/></button>
                </div>
             </div>
          </div>
        )}

        {/* Add Item Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
             <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl">
                <h3 className="font-bold text-lg mb-4">Add Inventory</h3>
                <div className="space-y-3">
                   <input className="w-full p-2 border rounded" placeholder="Item Name" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} />
                   <input className="w-full p-2 border rounded" type="number" placeholder="Stock Qty" value={newItem.stock} onChange={e => setNewItem({...newItem, stock: e.target.value})} />
                   <button onClick={() => {
                      if(!newItem.name) return;
                      setInventory(prev => [...prev, { id: Date.now(), name: newItem.name, stock: parseInt(newItem.stock) || 0, expiry: '2025-01-01' }]);
                      setShowAddModal(false);
                      setNewItem({ name: '', stock: '' });
                   }} className="w-full bg-blue-600 text-white py-2 rounded font-bold">Add Item</button>
                   <button onClick={() => setShowAddModal(false)} className="w-full text-slate-500 py-2">Cancel</button>
                </div>
             </div>
          </div>
        )}

      </main>
    </div>
  );
}

// Export Default
export default function App() {
  return (
    <ErrorBoundary>
      <HospitalDashboard />
    </ErrorBoundary>
  );
}