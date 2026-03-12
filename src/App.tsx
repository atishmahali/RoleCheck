import React, { useState, useMemo, useEffect } from 'react';
import { Search, Copy, CheckCircle2, Bookmark, BookmarkCheck, LayoutGrid, ChevronRight, Briefcase, ArrowLeft, ArrowDownAZ, ArrowUpZA, Sparkles, Moon, Sun, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { roles, categories as roleCategories, Category as RoleCategory, Role } from './data/roles';
import { skills, skillCategories, SkillCategory, Skill } from './data/skills';
import AIInterviewGenerator from './components/AIInterviewGenerator';

type Tab = 'roles' | 'skills' | 'ai';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('ai');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoleCategory, setSelectedRoleCategory] = useState<RoleCategory | 'All'>('All');
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<SkillCategory | 'All'>('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const [generatingAnswers, setGeneratingAnswers] = useState(false);
  const [generatedAnswers, setGeneratedAnswers] = useState<string | null>(null);
  const [answersError, setAnswersError] = useState('');

  // Handle theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('rolecheck-theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('rolecheck-theme', next);
      if (next === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  // Load favorites from local storage
  useEffect(() => {
    const saved = localStorage.getItem('rolecheck-favorites-v2');
    if (saved) {
      try {
        setFavorites(new Set(JSON.parse(saved)));
      } catch (e) {
        console.error('Failed to parse favorites', e);
      }
    }
  }, []);

  // Save favorites to local storage
  useEffect(() => {
    localStorage.setItem('rolecheck-favorites-v2', JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  const toggleFavorite = (id: string, type: Tab) => {
    const key = `${type}:${id}`;
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const isFavorite = (id: string, type: Tab) => favorites.has(`${type}:${id}`);

  // Global Search Results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return { roles: [], skills: [] };
    const query = searchQuery.toLowerCase();
    
    const matchingRoles = roles.filter(r => 
      r.title.toLowerCase().includes(query) || 
      r.description.toLowerCase().includes(query) ||
      r.skills.some(s => s.toLowerCase().includes(query))
    );
    
    const matchingSkills = skills.filter(s => 
      s.name.toLowerCase().includes(query) || 
      s.description.toLowerCase().includes(query)
    );
    
    return { roles: matchingRoles, skills: matchingSkills };
  }, [searchQuery]);

  // Tab Specific Data
  const displayRoles = useMemo(() => {
    let result = roles;
    if (selectedRoleCategory !== 'All') {
      result = result.filter(r => r.category === selectedRoleCategory);
    }
    result = [...result].sort((a, b) => {
      return sortOrder === 'asc' 
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    });
    return result;
  }, [selectedRoleCategory, sortOrder]);

  const displaySkills = useMemo(() => {
    let result = skills;
    if (selectedSkillCategory !== 'All') {
      result = result.filter(s => s.category === selectedSkillCategory);
    }
    result = [...result].sort((a, b) => {
      return sortOrder === 'asc' 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
    return result;
  }, [selectedSkillCategory, sortOrder]);

  const handleCopy = (item: Role | Skill) => {
    const title = 'title' in item ? item.title : item.name;
    const textToCopy = `${title} - Screening Questions\n\n` + 
      item.questions.map((q, i) => `${i + 1}. ${q}`).join('\n\n');
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const renderGridCard = (item: Role | Skill, type: Tab) => {
    const isRole = type === 'roles';
    const title = isRole ? (item as Role).title : (item as Skill).name;
    const id = item.id;
    const category = item.category;
    const description = item.description;

    return (
      <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        key={id}
        onClick={() => {
          if (isRole) setSelectedRole(item as Role);
          else setSelectedSkill(item as Skill);
          setSearchQuery('');
          setActiveTab(type);
          setGeneratedAnswers(null);
          setAnswersError('');
        }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-pink-300 dark:hover:border-pink-500/50 hover:shadow-xl hover:shadow-pink-500/5 dark:hover:shadow-pink-500/10 transition-all cursor-pointer group flex flex-col h-full relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-purple-500/0 group-hover:from-pink-500/5 group-hover:to-purple-500/5 transition-colors duration-500" />
        <div className="flex justify-between items-start mb-4 relative z-10">
          <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-lg border border-slate-200/50 dark:border-slate-700/50">
            {category}
          </span>
          <button 
            onClick={(e) => { e.stopPropagation(); toggleFavorite(id, type); }}
            className="text-slate-300 dark:text-slate-600 hover:text-pink-500 dark:hover:text-pink-400 transition-colors p-1"
          >
            {isFavorite(id, type) ? <BookmarkCheck className="w-5 h-5 text-pink-500 dark:text-pink-400" /> : <Bookmark className="w-5 h-5" />}
          </button>
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors relative z-10">{title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 flex-1 leading-relaxed relative z-10">{description}</p>
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center text-sm font-semibold text-pink-600 dark:text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity relative z-10">
          View Questions <ChevronRight className="w-4 h-4 ml-1" />
        </div>
      </motion.div>
    );
  };

  const renderDetails = (item: Role | Skill, type: Tab) => {
    const isRole = type === 'roles';
    const title = isRole ? (item as Role).title : (item as Skill).name;

    const handleGenerateAnswers = async () => {
      setGeneratingAnswers(true);
      setAnswersError('');
      try {
        const res = await fetch('/api/generate-answers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, questions: item.questions })
        });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setGeneratedAnswers(data.text);
      } catch (err: any) {
        setAnswersError(err.message || 'Failed to generate answers');
      } finally {
        setGeneratingAnswers(false);
      }
    };

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-4xl mx-auto w-full pb-12"
      >
        <button 
          onClick={() => isRole ? setSelectedRole(null) : setSelectedSkill(null)}
          className="flex items-center text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 mb-8 transition-colors group bg-white dark:bg-slate-900 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm w-fit"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to {isRole ? 'Roles' : 'Skills'}
        </button>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-200/20 dark:shadow-none mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-500/5 to-purple-500/5 dark:from-pink-500/10 dark:to-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider rounded-lg border border-slate-200/50 dark:border-slate-700/50">
                  {item.category}
                </span>
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">{title}</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-2xl">
                {item.description}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => toggleFavorite(item.id, type)}
                className="p-3 text-slate-400 dark:text-slate-500 hover:text-pink-500 dark:hover:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-500/10 rounded-xl transition-colors border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
                title={isFavorite(item.id, type) ? "Remove from favorites" : "Add to favorites"}
              >
                {isFavorite(item.id, type) ? (
                  <BookmarkCheck className="w-5 h-5 text-pink-500 dark:text-pink-400" />
                ) : (
                  <Bookmark className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => handleCopy(item)}
                className="flex items-center gap-2 px-5 py-3 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-xl transition-colors text-sm font-bold shadow-sm"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Questions'}
              </button>
            </div>
          </div>

          {isRole && (item as Role).skills && (
            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 relative z-10">
              <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Key Skills</h3>
              <div className="flex flex-wrap gap-2">
                {(item as Role).skills.map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-100 dark:border-purple-500/20 rounded-lg text-sm font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-8 px-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Screening Questions</h3>
            <span className="text-sm text-slate-600 dark:text-slate-400 font-bold bg-slate-200/50 dark:bg-slate-800 px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">{item.questions.length} Questions</span>
          </div>
          <div className="space-y-4 mb-12">
            {item.questions.map((question, index) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                key={index} 
                className="p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-pink-300 dark:hover:border-pink-500/50 hover:shadow-xl hover:shadow-pink-500/5 dark:hover:shadow-pink-500/10 transition-all group"
              >
                <div className="flex gap-5 md:gap-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-500/20 dark:to-purple-500/20 text-pink-600 dark:text-pink-400 flex items-center justify-center font-bold text-base border border-pink-200 dark:border-pink-500/30 shadow-sm">
                    {index + 1}
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 text-lg leading-relaxed pt-1 font-medium">
                    {question}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-slate-900 dark:bg-slate-950 rounded-3xl p-8 shadow-xl text-slate-300 border border-slate-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h3 className="text-2xl font-extrabold text-white flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-indigo-400" /> Expected Answers & Keywords
              </h3>
              {!generatedAnswers && (
                <button
                  onClick={handleGenerateAnswers}
                  disabled={generatingAnswers}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors flex items-center justify-center disabled:opacity-70 shadow-lg shadow-indigo-500/20"
                >
                  {generatingAnswers ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</> : 'Generate with AI'}
                </button>
              )}
            </div>

            {answersError && (
              <div className="p-4 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl text-sm mb-6 font-medium">
                {answersError}
              </div>
            )}

            {generatedAnswers && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-950 dark:bg-black rounded-2xl p-6 md:p-8 overflow-y-auto border border-slate-800 shadow-inner"
              >
                <div className="prose prose-invert prose-indigo max-w-none">
                  <Markdown>{generatedAnswers}</Markdown>
                </div>
              </motion.div>
            )}
            
            {!generatedAnswers && !generatingAnswers && !answersError && (
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 text-center">
                <p className="text-slate-400 font-medium">Click the button above to generate expected answers and keywords for these screening questions using AI.</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans flex flex-col transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 pt-8 pb-0 px-8 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start justify-between">
            <button 
              onClick={() => {
                setSelectedRole(null);
                setSelectedSkill(null);
                setSearchQuery('');
                setGeneratedAnswers(null);
                setAnswersError('');
              }}
              className="flex items-center gap-3 mb-8 hover:opacity-80 transition-opacity text-left group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/20 group-hover:scale-105 transition-transform">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent leading-none tracking-tight">
                  RoleCheck
                </h1>
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">by Intervue.io</span>
              </div>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700 shadow-sm"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>
          
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">Tech Interview Screener</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl mb-10 leading-relaxed">
              Search <span className="font-semibold text-slate-900 dark:text-white bg-pink-50 dark:bg-pink-500/10 px-2 py-0.5 rounded-md border border-pink-100 dark:border-pink-500/20">500+ screening questions across 50 roles and 100 skills</span> or generate <span className="font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-500/20">AI powered interview questions instantly.</span>
            </p>
          </motion.div>

          {/* Global Search */}
          {activeTab !== 'ai' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative max-w-3xl mb-10 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
              <input
                type="text"
                placeholder="Search roles or skills (e.g. Python, React, Data Scientist)..."
                className="w-full pl-14 pr-6 py-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl text-base focus:outline-none focus:ring-4 focus:ring-pink-500/10 dark:focus:ring-pink-500/20 focus:border-pink-500 dark:focus:border-pink-500 shadow-sm transition-all font-medium placeholder:font-normal text-slate-900 dark:text-white"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedRole(null);
                  setSelectedSkill(null);
                  setGeneratedAnswers(null);
                  setAnswersError('');
                }}
              />
            </motion.div>
          )}

          {/* Tabs - Only show if not searching and no item selected */}
          {!searchQuery && !selectedRole && !selectedSkill && (
            <div className="flex gap-8 border-b border-slate-200 dark:border-slate-800">
              <button 
                onClick={() => setActiveTab('ai')}
                className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors relative flex items-center gap-2 ${activeTab === 'ai' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300'}`}
              >
                <Sparkles className="w-4 h-4" /> AI Interview Tools
                {activeTab === 'ai' && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-t-full" />}
              </button>
              <button 
                onClick={() => setActiveTab('roles')}
                className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors relative ${activeTab === 'roles' ? 'text-pink-600 dark:text-pink-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
              >
                Role Wise Questions
                {activeTab === 'roles' && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500 dark:bg-pink-400 rounded-t-full" />}
              </button>
              <button 
                onClick={() => setActiveTab('skills')}
                className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors relative ${activeTab === 'skills' ? 'text-pink-600 dark:text-pink-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
              >
                Skill Wise Questions
                {activeTab === 'skills' && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500 dark:bg-pink-400 rounded-t-full" />}
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto p-8">
        
        {/* Detail Views */}
        {selectedRole && renderDetails(selectedRole, 'roles')}
        {selectedSkill && renderDetails(selectedSkill, 'skills')}

        {/* Search Results */}
        {searchQuery && !selectedRole && !selectedSkill && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            {searchResults.roles.length === 0 && searchResults.skills.length === 0 && (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm">
                  <Search className="w-10 h-10 text-slate-400 dark:text-slate-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">No results found</h3>
                <p className="text-slate-500 dark:text-slate-400 text-lg">We couldn't find any roles or skills matching "{searchQuery}"</p>
              </div>
            )}

            {searchResults.roles.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                  Matching Roles <span className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm py-1 px-3 rounded-full border border-slate-300 dark:border-slate-700">{searchResults.roles.length}</span>
                </h3>
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence mode="popLayout">
                    {searchResults.roles.map(role => renderGridCard(role, 'roles'))}
                  </AnimatePresence>
                </motion.div>
              </div>
            )}

            {searchResults.skills.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                  Matching Skills <span className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm py-1 px-3 rounded-full border border-slate-300 dark:border-slate-700">{searchResults.skills.length}</span>
                </h3>
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence mode="popLayout">
                    {searchResults.skills.map(skill => renderGridCard(skill, 'skills'))}
                  </AnimatePresence>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}

        {/* Grid Views */}
        {!searchQuery && !selectedRole && !selectedSkill && activeTab !== 'ai' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => activeTab === 'roles' ? setSelectedRoleCategory('All') : setSelectedSkillCategory('All')}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    (activeTab === 'roles' ? selectedRoleCategory : selectedSkillCategory) === 'All' 
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md scale-105' 
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  All {activeTab === 'roles' ? 'Roles' : 'Skills'}
                </button>
                {(activeTab === 'roles' ? roleCategories : skillCategories).map(cat => (
                  <button
                    key={cat}
                    onClick={() => activeTab === 'roles' ? setSelectedRoleCategory(cat as RoleCategory) : setSelectedSkillCategory(cat as SkillCategory)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      (activeTab === 'roles' ? selectedRoleCategory : selectedSkillCategory) === cat 
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md scale-105' 
                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              
              <button 
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex-shrink-0 shadow-sm"
              >
                {sortOrder === 'asc' ? <ArrowDownAZ className="w-4 h-4" /> : <ArrowUpZA className="w-4 h-4" />}
                Sort {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
              </button>
            </div>

            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {activeTab === 'roles' 
                  ? displayRoles.map(role => renderGridCard(role, 'roles'))
                  : displaySkills.map(skill => renderGridCard(skill, 'skills'))
                }
              </AnimatePresence>
            </motion.div>
            
            {(activeTab === 'roles' ? displayRoles : displaySkills).length === 0 && (
              <div className="text-center py-24 text-slate-500 dark:text-slate-400 font-medium text-lg">
                No items found in this category.
              </div>
            )}
          </motion.div>
        )}

        {/* AI Generator View */}
        {!searchQuery && !selectedRole && !selectedSkill && activeTab === 'ai' && (
          <AIInterviewGenerator onBack={() => setActiveTab('roles')} />
        )}
      </main>
    </div>
  );
}

