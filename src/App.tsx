import React, { useState, useMemo, useEffect } from 'react';
import { Search, Copy, CheckCircle2, Bookmark, BookmarkCheck, LayoutGrid, ChevronRight, Briefcase, ArrowLeft, ArrowDownAZ, ArrowUpZA, Sparkles } from 'lucide-react';
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
      <div 
        key={id}
        onClick={() => {
          if (isRole) setSelectedRole(item as Role);
          else setSelectedSkill(item as Skill);
          setSearchQuery('');
          setActiveTab(type);
        }}
        className="bg-white border border-slate-200 rounded-xl p-5 hover:border-pink-300 hover:shadow-md transition-all cursor-pointer group flex flex-col h-full"
      >
        <div className="flex justify-between items-start mb-3">
          <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md">
            {category}
          </span>
          <button 
            onClick={(e) => { e.stopPropagation(); toggleFavorite(id, type); }}
            className="text-slate-300 hover:text-pink-500 transition-colors"
          >
            {isFavorite(id, type) ? <BookmarkCheck className="w-5 h-5 text-pink-500" /> : <Bookmark className="w-5 h-5" />}
          </button>
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-pink-600 transition-colors">{title}</h3>
        <p className="text-sm text-slate-500 line-clamp-2 flex-1">{description}</p>
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-sm font-medium text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity">
          View Questions <ChevronRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    );
  };

  const renderDetails = (item: Role | Skill, type: Tab) => {
    const isRole = type === 'roles';
    const title = isRole ? (item as Role).title : (item as Skill).name;

    return (
      <div className="max-w-4xl mx-auto w-full pb-12 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <button 
          onClick={() => isRole ? setSelectedRole(null) : setSelectedSkill(null)}
          className="flex items-center text-base font-semibold text-slate-500 hover:text-slate-800 mb-6 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to {isRole ? 'Roles' : 'Skills'}
        </button>

        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider rounded-md">
                  {item.category}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-3">{title}</h2>
              <p className="text-slate-600 text-lg leading-relaxed max-w-2xl">
                {item.description}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toggleFavorite(item.id, type)}
                className="p-2.5 text-slate-400 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-colors border border-slate-200"
                title={isFavorite(item.id, type) ? "Remove from favorites" : "Add to favorites"}
              >
                {isFavorite(item.id, type) ? (
                  <BookmarkCheck className="w-5 h-5 text-pink-500" />
                ) : (
                  <Bookmark className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => handleCopy(item)}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors text-sm font-medium"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Questions'}
              </button>
            </div>
          </div>

          {isRole && (item as Role).skills && (
            <div className="mb-2">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Key Skills</h3>
              <div className="flex flex-wrap gap-2">
                {(item as Role).skills.map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-purple-50 text-purple-700 border border-purple-100 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-6 px-2">
            <h3 className="text-xl font-bold text-slate-900">Screening Questions</h3>
            <span className="text-sm text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full">{item.questions.length} Questions</span>
          </div>
          <div className="space-y-4">
            {item.questions.map((question, index) => (
              <div 
                key={index} 
                className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-pink-200 hover:shadow-md transition-all group"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 text-pink-600 flex items-center justify-center font-bold text-sm border border-pink-200">
                    {index + 1}
                  </div>
                  <p className="text-slate-800 text-base leading-relaxed pt-1 font-medium">
                    {question}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 pt-8 pb-0 px-8 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto">
          <button 
            onClick={() => {
              setSelectedRole(null);
              setSelectedSkill(null);
              setSearchQuery('');
            }}
            className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity text-left"
          >
            <Briefcase className="w-8 h-8 text-pink-500" />
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent leading-none tracking-tight">
                RoleCheck
              </h1>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-1">by Intervue.io</span>
            </div>
          </button>
          
          <h2 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Tech Interview Screener</h2>
          <p className="text-slate-600 text-lg max-w-3xl mb-8 leading-relaxed">
            Search <span className="font-semibold text-slate-900 bg-pink-50 px-1 rounded">500+ screening questions across 50 roles and 100 skills</span> or generate <span className="font-semibold text-indigo-600 bg-indigo-50 px-1 rounded">AI powered interview questions instantly.</span>
          </p>

          {/* Global Search */}
          {activeTab !== 'ai' && (
            <div className="relative max-w-3xl mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search roles or skills (e.g. Python, React, Data Scientist)..."
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-200 rounded-xl text-base focus:outline-none focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 shadow-sm transition-all font-medium placeholder:font-normal"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedRole(null);
                  setSelectedSkill(null);
                }}
              />
            </div>
          )}

          {/* Tabs - Only show if not searching and no item selected */}
          {!searchQuery && !selectedRole && !selectedSkill && (
            <div className="flex gap-8 border-b border-slate-200">
              <button 
                onClick={() => setActiveTab('ai')}
                className={`pb-4 text-sm font-semibold uppercase tracking-wider transition-colors relative flex items-center gap-1.5 ${activeTab === 'ai' ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-600'}`}
              >
                <Sparkles className="w-4 h-4" /> AI Interview Tools
                {activeTab === 'ai' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full" />}
              </button>
              <button 
                onClick={() => setActiveTab('roles')}
                className={`pb-4 text-sm font-semibold uppercase tracking-wider transition-colors relative ${activeTab === 'roles' ? 'text-pink-600' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Role Wise Questions
                {activeTab === 'roles' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500 rounded-t-full" />}
              </button>
              <button 
                onClick={() => setActiveTab('skills')}
                className={`pb-4 text-sm font-semibold uppercase tracking-wider transition-colors relative ${activeTab === 'skills' ? 'text-pink-600' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Skill Wise Questions
                {activeTab === 'skills' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500 rounded-t-full" />}
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
          <div className="space-y-12 animate-in fade-in duration-300">
            {searchResults.roles.length === 0 && searchResults.skills.length === 0 && (
              <div className="text-center py-20">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No results found</h3>
                <p className="text-slate-500">We couldn't find any roles or skills matching "{searchQuery}"</p>
              </div>
            )}

            {searchResults.roles.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  Matching Roles <span className="bg-slate-200 text-slate-700 text-xs py-0.5 px-2 rounded-full">{searchResults.roles.length}</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.roles.map(role => renderGridCard(role, 'roles'))}
                </div>
              </div>
            )}

            {searchResults.skills.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  Matching Skills <span className="bg-slate-200 text-slate-700 text-xs py-0.5 px-2 rounded-full">{searchResults.skills.length}</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.skills.map(skill => renderGridCard(skill, 'skills'))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Grid Views */}
        {!searchQuery && !selectedRole && !selectedSkill && activeTab !== 'ai' && (
          <div className="animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => activeTab === 'roles' ? setSelectedRoleCategory('All') : setSelectedSkillCategory('All')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    (activeTab === 'roles' ? selectedRoleCategory : selectedSkillCategory) === 'All' 
                      ? 'bg-slate-800 text-white shadow-sm' 
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  All {activeTab === 'roles' ? 'Roles' : 'Skills'}
                </button>
                {(activeTab === 'roles' ? roleCategories : skillCategories).map(cat => (
                  <button
                    key={cat}
                    onClick={() => activeTab === 'roles' ? setSelectedRoleCategory(cat as RoleCategory) : setSelectedSkillCategory(cat as SkillCategory)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      (activeTab === 'roles' ? selectedRoleCategory : selectedSkillCategory) === cat 
                        ? 'bg-slate-800 text-white shadow-sm' 
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              
              <button 
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors flex-shrink-0"
              >
                {sortOrder === 'asc' ? <ArrowDownAZ className="w-4 h-4" /> : <ArrowUpZA className="w-4 h-4" />}
                Sort {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeTab === 'roles' 
                ? displayRoles.map(role => renderGridCard(role, 'roles'))
                : displaySkills.map(skill => renderGridCard(skill, 'skills'))
              }
            </div>
            
            {(activeTab === 'roles' ? displayRoles : displaySkills).length === 0 && (
              <div className="text-center py-20 text-slate-500">
                No items found in this category.
              </div>
            )}
          </div>
        )}

        {/* AI Generator View */}
        {!searchQuery && !selectedRole && !selectedSkill && activeTab === 'ai' && (
          <AIInterviewGenerator onBack={() => setActiveTab('roles')} />
        )}
      </main>
    </div>
  );
}

