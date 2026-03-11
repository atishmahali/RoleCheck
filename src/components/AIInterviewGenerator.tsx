import React, { useState } from 'react';
import { ArrowLeft, PhoneCall, Phone, CheckSquare, MessageSquareText, Loader2, Plus, X, Copy, CheckCircle2 } from 'lucide-react';
import Markdown from 'react-markdown';

type AITool = 'oncall' | 'phone' | 'hygiene' | 'brand' | null;

export default function AIInterviewGenerator({ onBack }: { onBack: () => void }) {
  const [activeTool, setActiveTool] = useState<AITool>(null);

  return (
    <div className="max-w-6xl mx-auto w-full pb-12 animate-in fade-in duration-300">
      {!activeTool ? (
        <>
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={onBack}
              className="flex items-center text-base font-semibold text-slate-500 hover:text-slate-800 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Library
            </button>
          </div>

          <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-10 mb-12 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl font-extrabold mb-4 tracking-tight">AI Powered Interview Intelligence</h2>
              <p className="text-indigo-100 text-lg max-w-2xl leading-relaxed">
                Generate structured interview questions instantly, improve screening quality, create recruiter pitches, and evaluate candidates faster with our advanced AI tools.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ToolCard 
              icon={<PhoneCall className="w-8 h-8 text-blue-500" />}
              title="On Call Questions"
              description="Generate structured screening questions based on the job description, seniority, and engineering bar."
              onClick={() => setActiveTool('oncall')}
            />
            <ToolCard 
              icon={<Phone className="w-8 h-8 text-emerald-500" />}
              title="Phone Screening Questions"
              description="Improve existing phone screening questions to be more effective, clear, and comprehensive."
              onClick={() => setActiveTool('phone')}
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
        </>
      ) : (
        <div>
          <button 
            onClick={() => setActiveTool(null)}
            className="flex items-center text-base font-semibold text-slate-500 hover:text-slate-800 mb-8 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to AI Tools
          </button>
          
          {activeTool === 'oncall' && <OnCallGenerator />}
          {activeTool === 'phone' && <PhoneScreeningImprover />}
          {activeTool === 'hygiene' && <HygieneCheckGenerator />}
          {activeTool === 'brand' && <BrandPitchGenerator />}
        </div>
      )}
    </div>
  );
}

function ToolCard({ icon, title, description, onClick }: { icon: React.ReactNode, title: string, description: string, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="bg-white border border-slate-200 rounded-2xl p-8 hover:border-indigo-300 hover:shadow-lg transition-all cursor-pointer group flex flex-col h-full"
    >
      <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">{title}</h3>
      <p className="text-slate-600 leading-relaxed flex-1">{description}</p>
      <div className="mt-6 pt-6 border-t border-slate-100 flex items-center font-semibold text-indigo-600">
        Generate <ArrowLeft className="w-5 h-5 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}

// --- Sub-components for each tool ---

function OnCallGenerator() {
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

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
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
        }))
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
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <PhoneCall className="w-6 h-6 text-blue-500" /> On Call Questions
        </h3>
        
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Goal of the role</label>
            <input type="text" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              value={formData.goal} onChange={e => setFormData({...formData, goal: e.target.value})} placeholder="e.g. Build scalable microservices" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Position</label>
            <input type="text" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} placeholder="e.g. Senior Backend Engineer" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Profile</label>
              <select className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                value={formData.profile} onChange={e => setFormData({...formData, profile: e.target.value})}>
                <option>Frontend</option><option>Backend</option><option>Full Stack</option><option>DevOps</option><option>Data Science</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Difficulty</label>
              <select className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                value={formData.difficulty} onChange={e => setFormData({...formData, difficulty: e.target.value})}>
                <option>Easy</option><option>Medium</option><option>Hard</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Seniority</label>
              <select className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                value={formData.seniority} onChange={e => setFormData({...formData, seniority: e.target.value})}>
                <option>Entry Level (0-1 yrs)</option><option>Intermediate (1-3 yrs)</option><option>Mid Senior (3-5 yrs)</option>
                <option>Senior (5-8 yrs)</option><option>Senior+ (8-10 yrs)</option><option>Staff (10+ yrs)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Engineering Bar</label>
              <select className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                value={formData.engineeringBar} onChange={e => setFormData({...formData, engineeringBar: e.target.value})}>
                <option>FAANG</option><option>Hypergrowth/Product</option><option>IT Services</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-semibold text-slate-700">Skills & Rubrics</label>
              <button onClick={() => setSkills([...skills, { name: '', rubrics: [''] }])} className="text-sm text-blue-600 font-medium flex items-center">
                <Plus className="w-4 h-4 mr-1" /> Add Skill
              </button>
            </div>
            
            <div className="space-y-4">
              {skills.map((skill, sIdx) => (
                <div key={sIdx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl relative">
                  {skills.length > 1 && (
                    <button onClick={() => setSkills(skills.filter((_, i) => i !== sIdx))} className="absolute top-3 right-3 text-slate-400 hover:text-red-500">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <input type="text" className="w-full p-2 mb-3 border border-slate-300 rounded-md text-sm" placeholder="Skill Name (e.g. React)"
                    value={skill.name} onChange={e => {
                      const newSkills = [...skills];
                      newSkills[sIdx].name = e.target.value;
                      setSkills(newSkills);
                    }} />
                  
                  <div className="space-y-2 pl-4 border-l-2 border-slate-200">
                    {skill.rubrics.map((rubric, rIdx) => (
                      <div key={rIdx} className="flex gap-2">
                        <input type="text" className="flex-1 p-2 border border-slate-300 rounded-md text-sm" placeholder="Rubric description (optional)"
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
                          }} className="p-2 text-slate-400 hover:text-red-500"><X className="w-4 h-4" /></button>
                        )}
                      </div>
                    ))}
                    <button onClick={() => {
                      const newSkills = [...skills];
                      newSkills[sIdx].rubrics.push('');
                      setSkills(newSkills);
                    }} className="text-xs text-slate-500 hover:text-blue-600 font-medium mt-1">+ Add Rubric</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-colors flex justify-center items-center mt-6 disabled:opacity-70"
          >
            {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating...</> : 'Generate Questions'}
          </button>
          
          {error && <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm mt-4">{error}</div>}
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl p-8 shadow-xl text-slate-300 flex flex-col">
        <h3 className="text-xl font-bold text-white mb-6 flex justify-between items-center">
          Generated Output
          {result && <CopyButton text={result} />}
        </h3>
        <div className="flex-1 bg-slate-950 rounded-xl p-6 overflow-y-auto border border-slate-800">
          {loading ? (
            <div className="h-full flex items-center justify-center text-slate-500">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : result ? (
            <div className="prose prose-invert prose-emerald max-w-none">
              <Markdown>{result}</Markdown>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-600">
              Fill the form and click generate to see results here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PhoneScreeningImprover() {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleImprove = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/improve-phone-screening', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText })
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
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <Phone className="w-6 h-6 text-emerald-500" /> Improve Phone Screening
        </h3>
        <p className="text-slate-600 mb-4 text-sm">Paste the questions from the On Call Questions generator below to improve them.</p>
        
        <textarea 
          className="flex-1 w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm min-h-[300px]"
          placeholder="Paste your questions here..."
          value={inputText}
          onChange={e => setInputText(e.target.value)}
        />

        <button 
          onClick={handleImprove}
          disabled={loading || !inputText.trim()}
          className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-lg transition-colors flex justify-center items-center mt-6 disabled:opacity-70"
        >
          {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Improving...</> : 'Improve Questions'}
        </button>
        
        {error && <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm mt-4">{error}</div>}
      </div>

      <div className="bg-slate-900 rounded-2xl p-8 shadow-xl text-slate-300 flex flex-col">
        <h3 className="text-xl font-bold text-white mb-6 flex justify-between items-center">
          Improved Output
          {result && <CopyButton text={result} />}
        </h3>
        <div className="flex-1 bg-slate-950 rounded-xl p-6 overflow-y-auto border border-slate-800">
          {loading ? (
            <div className="h-full flex items-center justify-center text-slate-500">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : result ? (
            <div className="prose prose-invert prose-emerald max-w-none">
              <Markdown>{result}</Markdown>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-600">
              Improved results will appear here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function HygieneCheckGenerator() {
  const [formData, setFormData] = useState({
    role: '',
    experience_years: '',
    skills: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
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
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <CheckSquare className="w-6 h-6 text-amber-500" /> Hygiene Check Questions
        </h3>
        
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Role</label>
            <input type="text" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" 
              value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} placeholder="e.g. Product Manager" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Years of Experience</label>
            <input type="text" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" 
              value={formData.experience_years} onChange={e => setFormData({...formData, experience_years: e.target.value})} placeholder="e.g. 5" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Skills (comma separated)</label>
            <input type="text" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" 
              value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} placeholder="e.g. Agile, Jira, Stakeholder Management" />
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-lg transition-colors flex justify-center items-center mt-6 disabled:opacity-70"
          >
            {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating...</> : 'Generate Questions'}
          </button>
          
          {error && <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm mt-4">{error}</div>}
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl p-8 shadow-xl text-slate-300 flex flex-col">
        <h3 className="text-xl font-bold text-white mb-6 flex justify-between items-center">
          Generated Output
          {result && <CopyButton text={result} />}
        </h3>
        <div className="flex-1 bg-slate-950 rounded-xl p-6 overflow-y-auto border border-slate-800">
          {loading ? (
            <div className="h-full flex items-center justify-center text-slate-500">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : result ? (
            <div className="prose prose-invert prose-emerald max-w-none">
              <Markdown>{result}</Markdown>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-600">
              Fill the form and click generate to see results here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BrandPitchGenerator() {
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

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
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
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <MessageSquareText className="w-6 h-6 text-pink-500" /> Brand Pitching Generator
        </h3>
        
        <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Desired Duration</label>
            <select className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none bg-white text-sm"
              value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})}>
              <option>Short</option><option>Standard</option><option>Extended</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Desired Tone</label>
            <select className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none bg-white text-sm"
              value={formData.tone} onChange={e => setFormData({...formData, tone: e.target.value})}>
              <option>Formal</option><option>Semi Formal</option><option>Informal</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Company Name</label>
            <input type="text" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none" 
              value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} placeholder="e.g. Acme Corp" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Job Title</label>
            <input type="text" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none" 
              value={formData.jobTitle} onChange={e => setFormData({...formData, jobTitle: e.target.value})} placeholder="e.g. Lead Engineer" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Roles and Responsibilities</label>
            <textarea className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none min-h-[80px]" 
              value={formData.rolesAndResponsibilities} onChange={e => setFormData({...formData, rolesAndResponsibilities: e.target.value})} placeholder="Brief description..." />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tech Stack</label>
            <input type="text" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none" 
              value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})} placeholder="e.g. React, Node.js, AWS" />
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-4 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-bold text-lg transition-colors flex justify-center items-center mt-6 disabled:opacity-70"
          >
            {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating...</> : 'Generate Pitch'}
          </button>
          
          {error && <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm mt-4">{error}</div>}
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl p-8 shadow-xl text-slate-300 flex flex-col">
        <h3 className="text-xl font-bold text-white mb-6 flex justify-between items-center">
          Generated Output
          {result && <CopyButton text={result} />}
        </h3>
        <div className="flex-1 bg-slate-950 rounded-xl p-6 overflow-y-auto border border-slate-800">
          {loading ? (
            <div className="h-full flex items-center justify-center text-slate-500">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : result ? (
            <div className="prose prose-invert prose-emerald max-w-none">
              <Markdown>{result}</Markdown>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-600">
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
    >
      {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? 'Copied' : 'Copy Text'}
    </button>
  );
}
