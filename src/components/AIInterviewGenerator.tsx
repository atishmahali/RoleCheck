import React, { useState, useEffect, useRef } from 'react';
import { renderToString } from 'react-dom/server';
import { ArrowLeft, PhoneCall, Phone, CheckSquare, MessageSquareText, Loader2, Plus, X, Copy, CheckCircle2, Download, Bookmark, BookmarkCheck, Trash2, Clock, ChevronDown, FileText, FileCode, FileDown } from 'lucide-react';
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';

type AITool = 'oncall' | 'hygiene' | 'brand' | null;

interface SavedTemplate {
  id: string;
  type: AITool;
  title: string;
  content: string;
  date: string;
}

function useSavedTemplates() {
  const [templates, setTemplates] = useState<SavedTemplate[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('talentscreen-ai-templates');
    if (saved) {
      try {
        setTemplates(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse templates', e);
      }
    }
  }, []);

  const saveTemplate = (template: Omit<SavedTemplate, 'id' | 'date'>) => {
    const newTemplate: SavedTemplate = {
      ...template,
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString(),
    };
    const updated = [newTemplate, ...templates];
    setTemplates(updated);
    localStorage.setItem('talentscreen-ai-templates', JSON.stringify(updated));
    return newTemplate.id;
  };

  const deleteTemplate = (id: string) => {
    const updated = templates.filter(t => t.id !== id);
    setTemplates(updated);
    localStorage.setItem('talentscreen-ai-templates', JSON.stringify(updated));
  };

  return { templates, saveTemplate, deleteTemplate };
}

export default function AIInterviewGenerator({ onBack }: { onBack: () => void }) {
  const [activeTool, setActiveTool] = useState<AITool>(null);
  const { templates, saveTemplate, deleteTemplate } = useSavedTemplates();
  const [viewingTemplate, setViewingTemplate] = useState<SavedTemplate | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto w-full pb-12"
    >
      {!activeTool && !viewingTemplate ? (
        <>
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={onBack}
              className="flex items-center text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group bg-white/50 dark:bg-white/5 px-4 py-2 rounded-full border border-slate-200/50 dark:border-white/10 shadow-sm w-fit backdrop-blur-md"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Library
            </button>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-10 mb-12 text-white shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl font-extrabold mb-4 tracking-tight">AI Powered Interview Intelligence</h2>
              <p className="text-indigo-100 text-lg max-w-2xl leading-relaxed">
                Generate structured interview questions instantly, improve screening quality, create recruiter pitches, and evaluate candidates faster with our advanced AI tools.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <ToolCard 
              icon={<PhoneCall className="w-8 h-8 text-blue-500" />}
              title="Comprehensive Phone Screening"
              description="Generate highly effective screening questions, complete with highlighted expected keywords based on the job description, seniority, and engineering bar."
              onClick={() => setActiveTool('oncall')}
            />
            <ToolCard 
              icon={<CheckSquare className="w-8 h-8 text-amber-500" />}
              title="Hygiene Check Questions"
              description="Generate fitment and soft skill questions tailored to the role and years of experience."
              onClick={() => setActiveTool('hygiene')}
            />
            <ToolCard 
              icon={<MessageSquareText className="w-8 h-8 text-pink-500" />}
              title="Brand Pitching Generator"
              description="Create compelling recruiter pitch scripts customized by duration and tone."
              onClick={() => setActiveTool('brand')}
            />
          </div>

          {templates.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <Bookmark className="w-6 h-6 text-emerald-500" /> Saved Templates
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map(t => (
                  <div key={t.id} className="bg-white/80 dark:bg-[#111] border border-slate-200/80 dark:border-white/10 rounded-2xl p-6 flex flex-col backdrop-blur-md shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2">
                        {t.type === 'oncall' && <PhoneCall className="w-4 h-4 text-blue-500" />}
                        {t.type === 'hygiene' && <CheckSquare className="w-4 h-4 text-amber-500" />}
                        {t.type === 'brand' && <MessageSquareText className="w-4 h-4 text-pink-500" />}
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          {t.type === 'oncall' ? 'Phone Screen' : t.type === 'hygiene' ? 'Hygiene Check' : 'Brand Pitch'}
                        </span>
                      </div>
                      <button onClick={() => deleteTemplate(t.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">{t.title}</h4>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-auto pt-4 border-t border-slate-100 dark:border-white/5">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(t.date).toLocaleDateString()}
                    </div>
                    <button 
                      onClick={() => setViewingTemplate(t)}
                      className="mt-4 w-full py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white rounded-xl text-sm font-bold transition-colors"
                    >
                      View Template
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : viewingTemplate ? (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <button 
            onClick={() => setViewingTemplate(null)}
            className="flex items-center text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors group bg-white/50 dark:bg-white/5 px-4 py-2 rounded-full border border-slate-200/50 dark:border-white/10 shadow-sm w-fit backdrop-blur-md"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to AI Tools
          </button>

          <div className="bg-white/80 dark:bg-[#111] rounded-3xl p-6 md:p-8 shadow-xl text-slate-300 flex flex-col border border-slate-200/80 dark:border-white/10 backdrop-blur-xl">
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6 flex justify-between items-center">
              {viewingTemplate.title}
              <div className="flex items-center gap-2">
                <DownloadButton text={viewingTemplate.content} filename={viewingTemplate.title.replace(/\s+/g, '-').toLowerCase()} />
                <CopyButton text={viewingTemplate.content} />
              </div>
            </h3>
            <div className="flex-1 bg-slate-50/50 dark:bg-black/50 rounded-2xl p-6 md:p-8 overflow-y-auto border border-slate-200/50 dark:border-white/5 shadow-inner">
              <div className="prose prose-slate dark:prose-invert prose-blue max-w-none">
                <Markdown>{viewingTemplate.content}</Markdown>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <button 
            onClick={() => setActiveTool(null)}
            className="flex items-center text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors group bg-white/50 dark:bg-white/5 px-4 py-2 rounded-full border border-slate-200/50 dark:border-white/10 shadow-sm w-fit backdrop-blur-md"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to AI Tools
          </button>
          
          {activeTool === 'oncall' && <OnCallGenerator onSave={(title, content) => saveTemplate({ type: 'oncall', title, content })} />}
          {activeTool === 'hygiene' && <HygieneCheckGenerator onSave={(title, content) => saveTemplate({ type: 'hygiene', title, content })} />}
          {activeTool === 'brand' && <BrandPitchGenerator onSave={(title, content) => saveTemplate({ type: 'brand', title, content })} />}
        </motion.div>
      )}
    </motion.div>
  );
}

function ToolCard({ icon, title, description, onClick }: { icon: React.ReactNode, title: string, description: string, onClick: () => void }) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="bg-white/80 dark:bg-[#111] border border-slate-200/80 dark:border-white/10 rounded-3xl p-8 hover:border-violet-300 dark:hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/5 dark:hover:shadow-violet-500/10 transition-all cursor-pointer group flex flex-col h-full relative overflow-hidden backdrop-blur-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-purple-500/0 group-hover:from-violet-500/5 group-hover:to-purple-500/5 transition-colors duration-500" />
      <div className="w-16 h-16 rounded-2xl bg-slate-50/50 dark:bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10 border border-slate-200/50 dark:border-white/5 backdrop-blur-sm">
        {icon}
      </div>
      <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-3 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors relative z-10">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed flex-1 relative z-10">{description}</p>
      <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center font-bold text-indigo-600 dark:text-indigo-400 relative z-10">
        Generate <ArrowLeft className="w-5 h-5 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  );
}

// --- Sub-components for each tool ---

function OnCallGenerator({ onSave }: { onSave: (title: string, content: string) => void }) {
  const [formData, setFormData] = useState({
    goal: '',
    position: '',
    profile: 'Full Stack',
    difficulty: 'Medium',
    seniority: 'Mid Senior (3-5 yrs)',
    engineeringBar: 'Hypergrowth/Product',
  });
  const [skills, setSkills] = useState<{name: string, rubrics: string[]}[]>([
    { name: '', rubrics: [''] }
  ]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleGenerate = async (type: 'keywords' | 'answers') => {
    setLoading(true);
    setError('');
    setIsSaved(false);
    try {
      const payload = {
        "Goal of the role": formData.goal,
        "Position": formData.position,
        "Profile": formData.profile,
        "Difficulty": formData.difficulty,
        "Seniority": formData.seniority,
        "Engineering Bar": formData.engineeringBar,
        "Skills": skills.filter(s => s.name.trim() !== '').map(s => ({
          "Skill Name": s.name,
          "Rubrics": s.rubrics.filter(r => r.trim() !== '')
        })),
        type
      };

      const res = await fetch('/api/generate-oncall-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setResult(data.text);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white/80 dark:bg-[#111] rounded-3xl p-6 md:p-8 border border-slate-200/80 dark:border-white/10 shadow-xl shadow-slate-200/20 dark:shadow-none backdrop-blur-xl">
        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
          <PhoneCall className="w-6 h-6 text-blue-500" /> Comprehensive Phone Screening
        </h3>
        
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Goal of the role</label>
            <input type="text" className="w-full p-3 bg-white/80 dark:bg-[#111] border border-slate-200/80 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white backdrop-blur-md" 
              value={formData.goal} onChange={e => setFormData({...formData, goal: e.target.value})} placeholder="e.g. Build scalable microservices" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Position</label>
            <input type="text" className="w-full p-3 bg-white/80 dark:bg-[#111] border border-slate-200/80 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white backdrop-blur-md" 
              value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} placeholder="e.g. Senior Backend Engineer" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Profile</label>
              <input type="text" className="w-full p-3 bg-white/80 dark:bg-[#111] border border-slate-200/80 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white backdrop-blur-md" 
                value={formData.profile} onChange={e => setFormData({...formData, profile: e.target.value})} placeholder="e.g. Full Stack" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Difficulty</label>
              <select className="w-full p-3 bg-white/80 dark:bg-[#111] border border-slate-200/80 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white backdrop-blur-md"
                value={formData.difficulty} onChange={e => setFormData({...formData, difficulty: e.target.value})}>
                <option>Easy</option><option>Medium</option><option>Hard</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Seniority</label>
              <select className="w-full p-3 bg-white/80 dark:bg-[#111] border border-slate-200/80 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white backdrop-blur-md"
                value={formData.seniority} onChange={e => setFormData({...formData, seniority: e.target.value})}>
                <option>Entry Level (0-1 yrs)</option><option>Intermediate (1-3 yrs)</option><option>Mid Senior (3-5 yrs)</option>
                <option>Senior (5-8 yrs)</option><option>Senior+ (8-10 yrs)</option><option>Staff (10+ yrs)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Engineering Bar</label>
              <select className="w-full p-3 bg-white/80 dark:bg-[#111] border border-slate-200/80 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white backdrop-blur-md"
                value={formData.engineeringBar} onChange={e => setFormData({...formData, engineeringBar: e.target.value})}>
                <option>FAANG</option><option>Hypergrowth/Product</option><option>IT Services</option>
              </select>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-200/50 dark:border-white/10">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Skills & Rubrics</label>
              <button onClick={() => setSkills([...skills, { name: '', rubrics: [''] }])} className="text-sm text-blue-600 dark:text-blue-400 font-bold flex items-center hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                <Plus className="w-4 h-4 mr-1" /> Add Skill
              </button>
            </div>
            
            <div className="space-y-4">
              {skills.map((skill, sIdx) => (
                <div key={sIdx} className="p-5 bg-slate-50/50 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 rounded-2xl relative">
                  {skills.length > 1 && (
                    <button onClick={() => setSkills(skills.filter((_, i) => i !== sIdx))} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <input type="text" className="w-full p-2.5 mb-4 bg-white/80 dark:bg-[#111] border border-slate-200/80 dark:border-white/10 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white backdrop-blur-md" placeholder="Skill Name (e.g. React)"
                    value={skill.name} onChange={e => {
                      const newSkills = [...skills];
                      newSkills[sIdx].name = e.target.value;
                      setSkills(newSkills);
                    }} />
                  
                  <div className="space-y-2.5 pl-4 border-l-2 border-slate-200/50 dark:border-white/10">
                    {skill.rubrics.map((rubric, rIdx) => (
                      <div key={rIdx} className="flex gap-2">
                        <input type="text" className="flex-1 p-2.5 bg-white/80 dark:bg-[#111] border border-slate-200/80 dark:border-white/10 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white backdrop-blur-md" placeholder="Rubric description (optional)"
                          value={rubric} onChange={e => {
                            const newSkills = [...skills];
                            newSkills[sIdx].rubrics[rIdx] = e.target.value;
                            setSkills(newSkills);
                          }} />
                        {skill.rubrics.length > 1 && (
                          <button onClick={() => {
                            const newSkills = [...skills];
                            newSkills[sIdx].rubrics = newSkills[sIdx].rubrics.filter((_, i) => i !== rIdx);
                            setSkills(newSkills);
                          }} className="p-2.5 text-slate-400 hover:text-red-500 transition-colors"><X className="w-4 h-4" /></button>
                        )}
                      </div>
                    ))}
                    <button onClick={() => {
                      const newSkills = [...skills];
                      newSkills[sIdx].rubrics.push('');
                      setSkills(newSkills);
                    }} className="text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-bold mt-2 transition-colors">+ Add Rubric</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button 
              onClick={() => handleGenerate('keywords')}
              disabled={loading}
              className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-sm transition-colors flex justify-center items-center disabled:opacity-70 shadow-sm"
            >
              {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating...</> : 'Generate Questions with Expected Keywords'}
            </button>
            <button 
              onClick={() => handleGenerate('answers')}
              disabled={loading}
              className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-colors flex justify-center items-center disabled:opacity-70 shadow-lg shadow-blue-500/20"
            >
              {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating...</> : 'Generate Questions with Expected Answers & Keywords'}
            </button>
          </div>
          
          {error && <div className="p-4 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20 rounded-xl text-sm mt-4 font-medium">{error}</div>}
        </div>
      </div>

      <div className="bg-white/80 dark:bg-[#111] rounded-3xl p-6 md:p-8 shadow-xl text-slate-300 flex flex-col border border-slate-200/80 dark:border-white/10 backdrop-blur-xl">
        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6 flex justify-between items-center">
          Generated Output
          {result && <CopyButton text={result} />}
        </h3>
        <div className="flex-1 bg-slate-50/50 dark:bg-black/50 rounded-2xl p-6 md:p-8 overflow-y-auto border border-slate-200/50 dark:border-white/5 shadow-inner">
          {loading ? (
            <div className="h-full flex items-center justify-center text-slate-500">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : result ? (
            <div className="prose prose-slate dark:prose-invert prose-blue max-w-none">
              <Markdown>{result}</Markdown>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-600 font-medium">
              Fill the form and click generate to see results here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function HygieneCheckGenerator({ onSave }: { onSave: (title: string, content: string) => void }) {
  const [formData, setFormData] = useState({
    role: '',
    experience_years: '',
    skills: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setIsSaved(false);
    try {
      const payload = {
        role: formData.role,
        experience_years: formData.experience_years,
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s)
      };

      const res = await fetch('/api/generate-hygiene-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setResult(data.text);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white/80 dark:bg-[#111] rounded-3xl p-6 md:p-8 border border-slate-200/80 dark:border-white/10 shadow-xl shadow-slate-200/20 dark:shadow-none backdrop-blur-xl">
        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
          <CheckSquare className="w-6 h-6 text-amber-500" /> Hygiene Check Questions
        </h3>
        
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Role</label>
            <input type="text" className="w-full p-3 bg-white/80 dark:bg-[#111] border border-slate-200/80 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-slate-900 dark:text-white backdrop-blur-md" 
              value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} placeholder="e.g. Product Manager" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Years of Experience</label>
            <input type="text" className="w-full p-3 bg-white/80 dark:bg-[#111] border border-slate-200/80 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-slate-900 dark:text-white backdrop-blur-md" 
              value={formData.experience_years} onChange={e => setFormData({...formData, experience_years: e.target.value})} placeholder="e.g. 5" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Skills (comma separated)</label>
            <input type="text" className="w-full p-3 bg-white/80 dark:bg-[#111] border border-slate-200/80 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-slate-900 dark:text-white backdrop-blur-md" 
              value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} placeholder="e.g. Agile, Jira, Stakeholder Management" />
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-lg transition-colors flex justify-center items-center mt-8 disabled:opacity-70 shadow-lg shadow-amber-500/20"
          >
            {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating...</> : 'Generate Questions'}
          </button>
          
          {error && <div className="p-4 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20 rounded-xl text-sm mt-4 font-medium">{error}</div>}
        </div>
      </div>

      <div className="bg-white/80 dark:bg-[#111] rounded-3xl p-6 md:p-8 shadow-xl text-slate-300 flex flex-col border border-slate-200/80 dark:border-white/10 backdrop-blur-xl">
        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6 flex justify-between items-center">
          Generated Output
          {result && (
            <div className="flex items-center gap-2">
              <SaveButton isSaved={isSaved} onSave={() => { onSave(`Hygiene Check: ${formData.role || 'Untitled Role'}`, result); setIsSaved(true); }} />
              <DownloadButton text={result} filename={`hygiene-check-${formData.role.replace(/\s+/g, '-').toLowerCase() || 'role'}`} />
              <CopyButton text={result} />
            </div>
          )}
        </h3>
        <div className="flex-1 bg-slate-50/50 dark:bg-black/50 rounded-2xl p-6 md:p-8 overflow-y-auto border border-slate-200/50 dark:border-white/5 shadow-inner">
          {loading ? (
            <div className="h-full flex items-center justify-center text-slate-500">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : result ? (
            <div className="prose prose-slate dark:prose-invert prose-blue max-w-none">
              <Markdown>{result}</Markdown>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-600 font-medium">
              Fill the form and click generate to see results here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BrandPitchGenerator({ onSave }: { onSave: (title: string, content: string) => void }) {
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    rolesAndResponsibilities: '',
    techStack: '',
    duration: 'Standard',
    tone: 'Semi Formal'
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setIsSaved(false);
    try {
      const res = await fetch('/api/generate-brand-pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setResult(data.text);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white/80 dark:bg-[#111] rounded-3xl p-6 md:p-8 border border-slate-200/80 dark:border-white/10 shadow-xl shadow-slate-200/20 dark:shadow-none backdrop-blur-xl">
        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
          <MessageSquareText className="w-6 h-6 text-pink-500" /> Brand Pitching Generator
        </h3>
        
        <div className="grid grid-cols-2 gap-4 mb-6 p-5 bg-slate-50/50 dark:bg-white/5 rounded-2xl border border-slate-200/50 dark:border-white/5">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Desired Duration</label>
            <select className="w-full p-2.5 bg-white/80 dark:bg-[#111] border border-slate-200/80 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none text-sm text-slate-900 dark:text-white backdrop-blur-md"
              value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})}>
              <option>Short</option><option>Standard</option><option>Extended</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Desired Tone</label>
            <select className="w-full p-2.5 bg-white/80 dark:bg-[#111] border border-slate-200/80 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none text-sm text-slate-900 dark:text-white backdrop-blur-md"
              value={formData.tone} onChange={e => setFormData({...formData, tone: e.target.value})}>
              <option>Formal</option><option>Semi Formal</option><option>Informal</option>
            </select>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Company Name</label>
            <input type="text" className="w-full p-3 bg-white/80 dark:bg-[#111] border border-slate-200/80 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none text-slate-900 dark:text-white backdrop-blur-md" 
              value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} placeholder="e.g. Acme Corp" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Job Title</label>
            <input type="text" className="w-full p-3 bg-white/80 dark:bg-[#111] border border-slate-200/80 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none text-slate-900 dark:text-white backdrop-blur-md" 
              value={formData.jobTitle} onChange={e => setFormData({...formData, jobTitle: e.target.value})} placeholder="e.g. Lead Engineer" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Roles and Responsibilities</label>
            <textarea className="w-full p-3 bg-white/80 dark:bg-[#111] border border-slate-200/80 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none min-h-[100px] text-slate-900 dark:text-white resize-none backdrop-blur-md" 
              value={formData.rolesAndResponsibilities} onChange={e => setFormData({...formData, rolesAndResponsibilities: e.target.value})} placeholder="Brief description..." />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Tech Stack</label>
            <input type="text" className="w-full p-3 bg-white/80 dark:bg-[#111] border border-slate-200/80 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none text-slate-900 dark:text-white backdrop-blur-md" 
              value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})} placeholder="e.g. React, Node.js, AWS" />
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-4 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-bold text-lg transition-colors flex justify-center items-center mt-8 disabled:opacity-70 shadow-lg shadow-pink-500/20"
          >
            {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating...</> : 'Generate Pitch'}
          </button>
          
          {error && <div className="p-4 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20 rounded-xl text-sm mt-4 font-medium">{error}</div>}
        </div>
      </div>

      <div className="bg-white/80 dark:bg-[#111] rounded-3xl p-6 md:p-8 shadow-xl text-slate-300 flex flex-col border border-slate-200/80 dark:border-white/10 backdrop-blur-xl">
        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6 flex justify-between items-center">
          Generated Output
          {result && (
            <div className="flex items-center gap-2">
              <SaveButton isSaved={isSaved} onSave={() => { onSave(`Brand Pitch: ${formData.jobTitle || 'Untitled Role'} at ${formData.companyName || 'Company'}`, result); setIsSaved(true); }} />
              <DownloadButton text={result} filename={`brand-pitch-${formData.jobTitle.replace(/\s+/g, '-').toLowerCase() || 'role'}`} />
              <CopyButton text={result} />
            </div>
          )}
        </h3>
        <div className="flex-1 bg-slate-50/50 dark:bg-black/50 rounded-2xl p-6 md:p-8 overflow-y-auto border border-slate-200/50 dark:border-white/5 shadow-inner">
          {loading ? (
            <div className="h-full flex items-center justify-center text-slate-500">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : result ? (
            <div className="prose prose-slate dark:prose-invert prose-blue max-w-none">
              <Markdown>{result}</Markdown>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-600 font-medium">
              Fill the form and click generate to see results here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <button 
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors text-xs font-medium"
      title="Copy to clipboard"
    >
      {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

function DownloadButton({ text, filename }: { text: string, filename: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDownload = (format: 'md' | 'doc' | 'pdf') => {
    setIsOpen(false);
    
    if (format === 'md') {
      const blob = new Blob([text], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else if (format === 'doc') {
      const htmlContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset='utf-8'><title>${filename}</title></head>
        <body>
          ${renderToString(<Markdown>{text}</Markdown>)}
        </body>
        </html>
      `;
      const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.doc`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else if (format === 'pdf') {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>${filename}</title>
              <style>
                body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; padding: 40px; color: #333; max-width: 800px; margin: 0 auto; }
                h1, h2, h3, h4 { color: #111; margin-top: 1.5em; margin-bottom: 0.5em; }
                p { margin-bottom: 1em; }
                ul, ol { margin-bottom: 1em; padding-left: 2em; }
                li { margin-bottom: 0.5em; }
                code { background: #f4f4f5; padding: 0.2em 0.4em; border-radius: 3px; font-family: monospace; font-size: 0.9em; }
                pre { background: #f4f4f5; padding: 1em; border-radius: 5px; overflow-x: auto; }
                pre code { background: transparent; padding: 0; }
                blockquote { border-left: 4px solid #e4e4e7; padding-left: 1em; margin-left: 0; color: #52525b; }
              </style>
            </head>
            <body>
              ${renderToString(<Markdown>{text}</Markdown>)}
              <script>
                window.onload = () => {
                  window.print();
                  setTimeout(() => window.close(), 500);
                };
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors text-xs font-medium"
        title="Download Options"
      >
        <Download className="w-3.5 h-3.5" />
        Export
        <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50"
          >
            <div className="p-1 flex flex-col">
              <button onClick={() => handleDownload('pdf')} className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-lg transition-colors text-left w-full">
                <FileText className="w-4 h-4 text-red-500" /> PDF Document
              </button>
              <button onClick={() => handleDownload('doc')} className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-lg transition-colors text-left w-full">
                <FileDown className="w-4 h-4 text-blue-500" /> Word (.doc)
              </button>
              <button onClick={() => handleDownload('md')} className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-lg transition-colors text-left w-full">
                <FileCode className="w-4 h-4 text-slate-500 dark:text-slate-400" /> Markdown
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SaveButton({ onSave, isSaved }: { onSave: () => void, isSaved: boolean }) {
  return (
    <button 
      onClick={onSave}
      disabled={isSaved}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors text-xs font-medium ${isSaved ? 'bg-emerald-500/20 text-emerald-500 cursor-default' : 'bg-slate-800 hover:bg-slate-700 text-white'}`}
      title={isSaved ? "Saved to history" : "Save to history"}
    >
      {isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
      {isSaved ? 'Saved' : 'Save'}
    </button>
  );
}
