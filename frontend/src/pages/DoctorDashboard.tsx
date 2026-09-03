import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, Clock, CheckCircle2, ChevronRight, ChevronLeft, ChevronDown, ChevronUp, Lock, Unlock, FileText, FileSpreadsheet, ShieldCheck, Bot, Archive } from 'lucide-react';
import ConfirmDialog from '../components/ConfirmDialog';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { supabase } from '../lib/supabase';

export default function DoctorDashboard() {
  const location = useLocation();
  const activeTab = location.pathname.includes('/schedule') ? 'schedule' : 'queue';
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showScribe, setShowScribe] = useState<string | null>(null);
  const [queuePage, setQueuePage] = useState(1);
  const [schedulePage, setSchedulePage] = useState(1);
  const [lockDate, setLockDate] = useState('');
  const [lockTimeFrom, setLockTimeFrom] = useState('');
  const [lockTimeTo, setLockTimeTo] = useState('');
  const [archiveId, setArchiveId] = useState<string | null>(null);
  const ITEMS_PER_PAGE = 5;
  const [patients, setPatients] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingAppts, setLoadingAppts] = useState(true);
  const [doctorId, setDoctorId] = useState<string | null>(null);
  const [filterUrgency, setFilterUrgency] = useState<string>('All');
  const [filterDept, setFilterDept] = useState<string>('All');
  useEffect(() => {
    async function fetchQueue() {
      const { data: userData } = await supabase.auth.getUser();
      if (userData.user) {
        setDoctorId(userData.user.id);
        fetchAppointments(userData.user.id);
      }

      const { data, error } = await supabase
        .from('triages')
        .select('*, users(full_name)')
        .eq('status', 'pending')
        .eq('doctor_hidden', false)
        .order('created_at', { ascending: false });

      if (data) {
        const formatted = data.map((item) => ({
          id: item.id,
          name: item.users?.full_name || 'Unknown Patient',
          urgency: item.urgency,
          dept: item.department,
          time: new Date(item.created_at).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
          report: {
            symptoms: item.symptoms ? (item.symptoms.includes(',') ? item.symptoms.split(',').map((s: string) => s.trim()) : [item.symptoms]) : ['Not specified'],
            duration: item.duration || 'Not specified',
            analysis: item.analysis,
            image_data: item.image_data
          }
        }));
        setPatients(formatted);
      } else if (error) {
        console.error("Error fetching queue:", error);
      }
      setLoading(false);
    }
    fetchQueue();
  }, []);

  const fetchAppointments = async (docId: string) => {
    setLoadingAppts(true);
    const { data, error } = await supabase
      .from('appointments')
      .select('*, users!appointments_patient_id_fkey(full_name), triage_reports(symptoms, urgency_level, recommended_department, ai_explanation)')
      .eq('doctor_id', docId)
      .eq('status', 'scheduled')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn("Retrying appointments query without strict FK syntax:", error.message);
      const { data: fallbackData } = await supabase
        .from('appointments')
        .select('*')
        .eq('doctor_id', docId)
        .eq('status', 'scheduled')
        .order('created_at', { ascending: false });
      if (fallbackData) {
         const formatted = fallbackData.map((item: any) => ({
          id: item.id,
          name: 'Patient',
          urgency: 'Unknown',
          dept: item.department,
          time: item.appointment_time,
          isAppt: true,
          report: {
            symptoms: ['Not specified'],
            duration: 'Not specified',
            analysis: 'No analysis available',
            image_data: null
          }
         }));
         setAppointments(formatted);
      }
    } else if (data) {
      const formatted = data.map((item: any) => ({
        id: item.id,
        name: item.users?.full_name || 'Unknown Patient',
        urgency: item.triage_reports?.urgency_level || 'Unknown',
        dept: item.department,
        time: item.appointment_time,
        isAppt: true,
        report: {
          symptoms: item.triage_reports?.symptoms ? item.triage_reports.symptoms.split(',') : ['Not specified'],
          duration: 'Not specified',
          analysis: item.triage_reports?.ai_explanation || 'No analysis available',
          image_data: null
        }
      }));
      setAppointments(formatted);
    }
    setLoadingAppts(false);
  };
  
  const handleCompleteAppt = async (id: string) => {
    const { error } = await supabase.from('appointments').update({ status: 'completed' }).eq('id', id);
    if (!error) {
      setAppointments(prev => prev.filter(p => p.id !== id));
      if (expandedId === id) setExpandedId(null);
    } else {
      console.error("Failed to complete:", error);
    }
  };

  const handleAcknowledge = async (id: string) => {
    const { error } = await supabase.from('triages').update({ status: 'acknowledged' }).eq('id', id);
    if (!error) {
      setPatients(prev => prev.filter(p => p.id !== id));
      if (expandedId === id) setExpandedId(null);
    } else {
      console.error("Failed to acknowledge:", error);
    }
  };

  const handleArchive = async () => {
    if (!archiveId) return;
    const { error } = await supabase.from('triages').update({ doctor_hidden: true }).eq('id', archiveId);
    if (!error) {
      setPatients(prev => prev.filter(p => p.id !== archiveId));
      if (expandedId === archiveId) setExpandedId(null);
    } else {
      console.error("Failed to archive:", error);
    }
    setArchiveId(null);
  };

  const getUrgencyStyles = (level: string) => {
    const l = level?.toLowerCase() || '';
    if (l.includes('high')) return 'bg-red-100 text-red-700 border-red-200';
    if (l.includes('low')) return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    return 'bg-amber-100 text-amber-700 border-amber-200';
  };

  const handleLockTimeRange = async () => {
    if (!lockDate || !lockTimeFrom || !lockTimeTo) return;
    if (!doctorId) {
      alert("Doctor ID not found. Please log in again.");
      return;
    }
    const currentDocId = doctorId;
    const formattedTime = `${lockDate}: ${lockTimeFrom} to ${lockTimeTo}`;
    
    // Insert into appointments table
    const { error } = await supabase.from('appointments').insert({
      patient_id: currentDocId, // self-booking means locked
      doctor_id: currentDocId,
      department: 'Locked Block',
      appointment_time: formattedTime,
      status: 'scheduled'
    }).select();

    if (!error) {
      if (currentDocId) fetchAppointments(currentDocId);
      setLockDate(''); setLockTimeFrom(''); setLockTimeTo('');
    } else {
      console.error("Lock slot error:", error);
      // Fallback local update so UI reflects the locked block immediately
      setAppointments(prev => [
        {
          id: 'lock-' + Date.now(),
          patient_id: currentDocId,
          doctor_id: currentDocId,
          department: 'Locked Block',
          appointment_time: formattedTime,
          status: 'scheduled'
        },
        ...prev
      ]);
      setLockDate(''); setLockTimeFrom(''); setLockTimeTo('');
    }
  };

  const handleUnlockSlot = async (id: string) => {
    if (!doctorId) return;
    const { error } = await supabase.from('appointments')
      .update({ status: 'cancelled' })
      .eq('id', id);
    if (!error) fetchAppointments(doctorId);
  };

  const lockedAppts = appointments.filter(a => a.patient_id === doctorId);
  const patientAppts = appointments.filter(a => a.patient_id !== doctorId);

  // Derived state for filtering
  const filteredPatients = patients.filter(p => {
    const matchUrgency = filterUrgency === 'All' || p.urgency?.toLowerCase() === filterUrgency.toLowerCase();
    const matchDept = filterDept === 'All' || p.dept?.toLowerCase() === filterDept.toLowerCase();
    return matchUrgency && matchDept;
  });

  const paginatedPatients = filteredPatients.slice((queuePage - 1) * ITEMS_PER_PAGE, queuePage * ITEMS_PER_PAGE);
  const paginatedAppts = patientAppts.slice((schedulePage - 1) * ITEMS_PER_PAGE, schedulePage * ITEMS_PER_PAGE);
  const totalQueuePages = Math.ceil(filteredPatients.length / ITEMS_PER_PAGE) || 1;
  const totalSchedulePages = Math.ceil(patientAppts.length / ITEMS_PER_PAGE) || 1;
  
  // Extract unique departments for dropdown
  const uniqueDepts = Array.from(new Set(patients.map(p => p.dept).filter(Boolean)));

  const downloadPDF = (patient: any) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Triage Report: ${patient.name}`, 10, 20);
    doc.setFontSize(12);
    doc.text(`Urgency: ${patient.urgency}`, 10, 30);
    doc.text(`Department: ${patient.dept}`, 10, 40);
    doc.text(`Duration: ${patient.report.duration}`, 10, 50);
    doc.text(`Symptoms: ${patient.report.symptoms.join(', ')}`, 10, 60);
    
    doc.text('AI Analysis:', 10, 80);
    const splitTitle = doc.splitTextToSize(patient.report.analysis || 'No analysis available', 180);
    doc.text(splitTitle, 10, 90);
    
    doc.save(`Report_${patient.name.replace(/\s+/g, '_')}.pdf`);
  };

  const downloadExcel = (patient: any) => {
    const worksheet = XLSX.utils.json_to_sheet([{
      Patient: patient.name,
      Urgency: patient.urgency,
      Department: patient.dept,
      Duration: patient.report.duration,
      Symptoms: patient.report.symptoms.join(', '),
      Analysis: patient.report.analysis
    }]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(workbook, `Report_${patient.name.replace(/\s+/g, '_')}.xlsx`);
  };


  const renderPatientList = (list: any[], isAppt = false) => {
    return (
      
            {loading ? (
              <div className="p-6 text-center text-slate-500">Loading active triage...</div>
            ) : patients.length === 0 ? (
              <div className="p-10 text-center">
                <ShieldCheck className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 font-medium">No pending triages at the moment.</p>
              </div>
            ) : (
              renderPatientList(paginatedPatients, false)
            )}
          </div>
          {/* Pagination Controls */}
          {patients.length > ITEMS_PER_PAGE && (
            <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between">
              <span className="text-sm text-slate-500">Page {queuePage} of {totalQueuePages}</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => setQueuePage(p => Math.max(1, p - 1))}
                  disabled={queuePage === 1}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setQueuePage(p => Math.min(totalQueuePages, p + 1))}
                  disabled={queuePage === totalQueuePages}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-12 gap-4 p-4 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <div className="col-span-4 md:col-span-3 pl-2">Patient Name</div>
              <div className="col-span-3 md:col-span-2 text-center">Urgency</div>
              <div className="hidden md:block md:col-span-4">Recommended Dept</div>
              <div className="col-span-4 md:col-span-2 text-right">Date & Time</div>
              <div className="col-span-1 text-center"></div>
            </div>
            
            {loadingAppts ? (
              <div className="text-slate-500 text-center py-8">Loading schedule...</div>
            ) : patientAppts.length === 0 ? (
              <div className="text-center py-10">
                <Clock className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 font-medium">No appointments booked yet.</p>
              </div>
            ) : (
              renderPatientList(paginatedAppts, true)
            )}
            
            {patientAppts.length > ITEMS_PER_PAGE && (
              <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
                <span className="text-sm text-slate-500">Page {schedulePage} of {totalSchedulePages}</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setSchedulePage(p => Math.max(1, p - 1))}
                    disabled={schedulePage === 1}
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setSchedulePage(p => Math.min(totalSchedulePages, p + 1))}
                    disabled={schedulePage === totalSchedulePages}
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
            
            <div className="mt-10 border-t border-slate-200 pt-6">
              <h2 className="text-lg font-bold text-slate-900 mb-2">Manage Availability</h2>
              <p className="text-slate-500 text-sm mb-6">Lock a specific date and time range to prevent patients from booking.</p>
              
              <div className="flex flex-col md:flex-row items-end gap-4 p-5 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="flex-1 w-full">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                  <input type="date" value={lockDate} onChange={e => setLockDate(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500" />
                </div>
                <div className="flex-1 w-full">
                  <label className="block text-sm font-medium text-slate-700 mb-1">From</label>
                  <input type="time" value={lockTimeFrom} onChange={e => setLockTimeFrom(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500" />
                </div>
                <div className="flex-1 w-full">
                  <label className="block text-sm font-medium text-slate-700 mb-1">To</label>
                  <input type="time" value={lockTimeTo} onChange={e => setLockTimeTo(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500" />
                </div>
                <button 
                  onClick={handleLockTimeRange}
                  disabled={!lockDate || !lockTimeFrom || !lockTimeTo}
                  className="w-full md:w-auto px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" /> Lock Time
                </button>
              </div>
              
              {lockedAppts.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Locked Slots</h3>
                  {lockedAppts.map(appt => (
                    <div key={appt.id} className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <span className="text-sm font-medium text-amber-800 flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> {appt.appointment_time}
                      </span>
                      <button onClick={() => handleUnlockSlot(appt.id)} className="text-xs font-bold text-amber-600 hover:text-amber-800 flex items-center gap-1">
                        <Unlock className="w-3 h-3" /> Unlock
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      <ConfirmDialog
        isOpen={!!archiveId}
        title="Archive Record"
        description="Are you sure you want to archive this record? It will be removed from your active queue."
        confirmText="Archive"
        onConfirm={handleArchive}
        onCancel={() => setArchiveId(null)}
      />
    </div>
  );
}
