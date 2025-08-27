import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';
import { 
  Users, 
  Search, 
  Filter,
  Grid3X3,
  List,
  Sparkles,
  UserCheck,
  Globe,
  TrendingUp,
  ChevronDown,
  SortAsc,
  Eye,
  Heart
} from 'lucide-react';

const Profiles = () => {
  const dispatch = useDispatch();
  const { profiles, loading } = useSelector(state => state.profile);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    dispatch(getProfiles());
    // Trigger entrance animation
    setTimeout(() => setAnimate(true), 100);
  }, [dispatch]);

  useEffect(() => {
    if (profiles) {
      let filtered = profiles.filter(profile => {
        const searchMatch = profile.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          profile.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (profile.company && profile.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (profile.location && profile.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
          profile.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

        const filterMatch = filterBy === 'all' || 
          (filterBy === 'senior' && profile.status.toLowerCase().includes('senior')) ||
          (filterBy === 'junior' && profile.status.toLowerCase().includes('junior')) ||
          (filterBy === 'remote' && profile.location && profile.location.toLowerCase().includes('remote'));

        return searchMatch && filterMatch;
      });

      // Sort filtered profiles
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.user.name.localeCompare(b.user.name);
          case 'company':
            return (a.company || '').localeCompare(b.company || '');
          case 'skills':
            return b.skills.length - a.skills.length;
          default:
            return 0;
        }
      });

      setFilteredProfiles(filtered);
    }
  }, [profiles, searchTerm, sortBy, filterBy]);

  const LoadingSpinner = () => (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      <p className="loading-text">Loading amazing developers...</p>
      <div className="loading-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="empty-state">
      <div className="empty-icon">
        <Users size={64} />
        <div className="empty-sparkles">
          <Sparkles size={20} />
          <Sparkles size={16} />
          <Sparkles size={12} />
        </div>
      </div>
      <h3>No developers found</h3>
      <p>Try adjusting your search criteria or check back later for new profiles.</p>
      <button 
        className="empty-action-btn"
        onClick={() => {
          setSearchTerm('');
          setFilterBy('all');
        }}
      >
        Clear Filters
      </button>
    </div>
  );

  return (
    <>
      <style>
        {`
          .profiles-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #0f0f23 0%, #1a1a3a 25%, #2d1b69 50%, #4c1d95 75%, #6b21a8 100%);
            color: white;
            position: relative;
            overflow-x: hidden;
          }
          
          .profiles-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="1" fill="white" opacity="0.1"/><circle cx="80" cy="40" r="0.5" fill="white" opacity="0.1"/><circle cx="40" cy="80" r="1.5" fill="white" opacity="0.1"/><circle cx="90" cy="10" r="1" fill="white" opacity="0.1"/><circle cx="10" cy="90" r="0.8" fill="white" opacity="0.1"/><circle cx="70" cy="70" r="1.2" fill="white" opacity="0.1"/></svg>') repeat;
            background-size: 200px 200px;
            animation: float 20s ease-in-out infinite;
            pointer-events: none;
          }

          .profiles-container::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.05) 0%, transparent 70%);
            pointer-events: none;
            animation: glow 8s ease-in-out infinite alternate;
          }

          @keyframes glow {
            0% { opacity: 0.5; }
            100% { opacity: 0.8; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-10px) rotate(1deg); }
            50% { transform: translateY(0px) rotate(0deg); }
            75% { transform: translateY(10px) rotate(-1deg); }
          }
          
          .profiles-content {
            position: relative;
            z-index: 10;
            max-width: 1400px;
            margin: 0 auto;
            padding: 40px 20px;
            opacity: 0;
            animation: slideUp 0.8s ease-out 0.2s forwards;
          }

          .profiles-content.animate {
            opacity: 1;
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .profiles-header {
            text-align: center;
            margin-bottom: 60px;
            padding: 40px 0;
          }
          
          .main-title {
            font-size: 56px;
            font-weight: 800;
            margin-bottom: 16px;
            background: linear-gradient(45deg, #ffffff, #a78bfa, #60a5fa);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 16px;
            text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            animation: titleGlow 3s ease-in-out infinite;
          }

          @keyframes titleGlow {
            0%, 100% { filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.3)); }
            50% { filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.5)); }
          }
          
          .subtitle {
            font-size: 20px;
            color: #d1d5db;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            animation: fadeIn 1s ease-out 0.5s both;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          .description {
            font-size: 16px;
            color: #9ca3af;
            max-width: 600px;
            margin: 0 auto 40px auto;
            line-height: 1.6;
            animation: fadeIn 1s ease-out 0.7s both;
          }
          
          .stats-bar {
            display: flex;
            justify-content: center;
            gap: 40px;
            margin-bottom: 40px;
            flex-wrap: wrap;
            animation: fadeIn 1s ease-out 0.9s both;
          }
          
          .stat-item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 12px 24px;
            background: rgba(15, 15, 35, 0.7);
            backdrop-filter: blur(10px);
            border-radius: 50px;
            border: 1px solid rgba(139, 92, 246, 0.3);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }

          .stat-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.2), transparent);
            transition: left 0.5s;
          }
          
          .stat-item:hover {
            background: rgba(15, 15, 35, 0.9);
            transform: translateY(-3px) scale(1.05);
            border-color: rgba(139, 92, 246, 0.6);
            box-shadow: 0 10px 25px rgba(139, 92, 246, 0.2);
          }

          .stat-item:hover::before {
            left: 100%;
          }
          
          .controls-section {
            background: rgba(15, 15, 35, 0.6);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            border: 1px solid rgba(139, 92, 246, 0.2);
            padding: 30px;
            margin-bottom: 40px;
            animation: slideUp 0.8s ease-out 1.1s both;
          }

          .search-controls {
            display: flex;
            gap: 16px;
            margin-bottom: 20px;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
          }
          
          .search-input-container {
            position: relative;
            flex-grow: 1;
            max-width: 400px;
          }
          
          .search-input {
            width: 100%;
            padding: 16px 50px 16px 20px;
            background: rgba(15, 15, 35, 0.8);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(139, 92, 246, 0.3);
            border-radius: 50px;
            color: white;
            font-size: 16px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            outline: none;
          }
          
          .search-input::placeholder {
            color: #9ca3af;
          }
          
          .search-input:focus {
            background: rgba(15, 15, 35, 0.95);
            border-color: rgba(139, 92, 246, 0.8);
            box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2), 0 0 20px rgba(139, 92, 246, 0.1);
            transform: translateY(-1px);
          }
          
          .search-icon {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: #9ca3af;
            transition: all 0.3s ease;
          }

          .search-input:focus + .search-icon {
            color: #a78bfa;
            transform: translateY(-50%) scale(1.1);
          }
          
          .view-toggle {
            display: flex;
            background: rgba(15, 15, 35, 0.7);
            backdrop-filter: blur(10px);
            border-radius: 50px;
            border: 1px solid rgba(139, 92, 246, 0.3);
            overflow: hidden;
            position: relative;
          }

          .view-toggle::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 50%;
            height: 100%;
            background: linear-gradient(45deg, #3b82f6, #8b5cf6);
            border-radius: 50px;
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            transform: translateX(${viewMode === 'list' ? '100%' : '0%'});
          }
          
          .view-btn {
            padding: 12px 16px;
            background: none;
            border: none;
            color: #9ca3af;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 6px;
            position: relative;
            z-index: 1;
          }
          
          .view-btn.active {
            color: white;
          }

          .filters-toggle {
            background: rgba(15, 15, 35, 0.7);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(139, 92, 246, 0.3);
            border-radius: 50px;
            color: #d1d5db;
            padding: 12px 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .filters-toggle:hover {
            background: rgba(15, 15, 35, 0.8);
            border-color: rgba(139, 92, 246, 0.5);
            transform: translateY(-1px);
          }

          .filters-dropdown {
            display: flex;
            gap: 16px;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            opacity: 0;
            max-height: 0;
            overflow: hidden;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .filters-dropdown.show {
            opacity: 1;
            max-height: 100px;
            margin-top: 20px;
          }

          .filter-select {
            background: rgba(15, 15, 35, 0.8);
            border: 1px solid rgba(139, 92, 246, 0.3);
            border-radius: 12px;
            color: white;
            padding: 8px 16px;
            outline: none;
            transition: all 0.3s ease;
            cursor: pointer;
          }

          .filter-select:focus {
            border-color: rgba(139, 92, 246, 0.6);
            box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
          }

          .filter-select option {
            background: #1a1a3a;
            color: white;
          }
          
          .results-count {
            text-align: center;
            margin-bottom: 30px;
            color: #d1d5db;
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 16px 24px;
            background: rgba(15, 15, 35, 0.6);
            backdrop-filter: blur(20px);
            border-radius: 50px;
            border: 1px solid rgba(139, 92, 246, 0.2);
            animation: pulse 2s infinite;
          }

          @keyframes pulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4); }
            50% { box-shadow: 0 0 0 10px rgba(139, 92, 246, 0); }
          }
          
          .profiles-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 30px;
            margin-bottom: 40px;
          }
          
          .profiles-list {
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin-bottom: 40px;
          }
          
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 400px;
            gap: 24px;
          }
          
          .loading-spinner {
            position: relative;
            width: 80px;
            height: 80px;
          }
          
          .spinner-ring {
            position: absolute;
            border: 4px solid transparent;
            border-top: 4px solid;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          
          .spinner-ring:nth-child(1) {
            width: 80px;
            height: 80px;
            border-top-color: #3b82f6;
          }
          
          .spinner-ring:nth-child(2) {
            width: 60px;
            height: 60px;
            top: 10px;
            left: 10px;
            border-top-color: #8b5cf6;
            animation-duration: 0.8s;
            animation-direction: reverse;
          }
          
          .spinner-ring:nth-child(3) {
            width: 40px;
            height: 40px;
            top: 20px;
            left: 20px;
            border-top-color: #ec4899;
            animation-duration: 0.6s;
          }

          .loading-text {
            font-size: 18px;
            color: #d1d5db;
            margin-bottom: 10px;
          }

          .loading-dots {
            display: flex;
            gap: 8px;
          }

          .loading-dots span {
            width: 8px;
            height: 8px;
            background: #8b5cf6;
            border-radius: 50%;
            animation: bounce 1.4s ease-in-out infinite both;
          }

          .loading-dots span:nth-child(1) { animation-delay: -0.32s; }
          .loading-dots span:nth-child(2) { animation-delay: -0.16s; }

          @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .empty-state {
            text-align: center;
            padding: 80px 40px;
            background: rgba(15, 15, 35, 0.6);
            backdrop-filter: blur(20px);
            border-radius: 24px;
            border: 1px solid rgba(139, 92, 246, 0.2);
            margin: 40px 0;
            position: relative;
            overflow: hidden;
          }

          .empty-state::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: conic-gradient(from 0deg, transparent, rgba(139, 92, 246, 0.1), transparent);
            animation: rotate 10s linear infinite;
            pointer-events: none;
          }
          
          .empty-icon {
            margin-bottom: 24px;
            color: #6b7280;
            animation: float 3s ease-in-out infinite;
            position: relative;
            display: inline-block;
          }

          .empty-sparkles {
            position: absolute;
            top: -10px;
            right: -10px;
          }

          .empty-sparkles svg {
            animation: sparkle 2s ease-in-out infinite;
          }

          .empty-sparkles svg:nth-child(2) {
            animation-delay: 0.5s;
          }

          .empty-sparkles svg:nth-child(3) {
            animation-delay: 1s;
          }

          @keyframes sparkle {
            0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
            50% { opacity: 1; transform: scale(1) rotate(180deg); }
          }

          @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .empty-state h3 {
            font-size: 24px;
            margin-bottom: 12px;
            color: #d1d5db;
            position: relative;
            z-index: 1;
          }
          
          .empty-state p {
            color: #9ca3af;
            font-size: 16px;
            margin-bottom: 24px;
            position: relative;
            z-index: 1;
          }

          .empty-action-btn {
            background: linear-gradient(45deg, #3b82f6, #8b5cf6);
            border: none;
            border-radius: 12px;
            color: white;
            padding: 12px 24px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            z-index: 1;
            overflow: hidden;
          }

          .empty-action-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s;
          }

          .empty-action-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
          }

          .empty-action-btn:hover::before {
            left: 100%;
          }
          
          @media (max-width: 768px) {
            .main-title {
              font-size: 36px;
              flex-direction: column;
            }
            
            .search-controls {
              flex-direction: column;
              align-items: stretch;
            }
            
            .search-input-container {
              max-width: none;
            }
            
            .stats-bar {
              gap: 20px;
            }
            
            .stat-item {
              padding: 8px 16px;
              font-size: 14px;
            }
            
            .profiles-grid {
              grid-template-columns: 1fr;
              gap: 20px;
            }

            .filters-dropdown {
              flex-direction: column;
              gap: 12px;
            }

            .controls-section {
              padding: 20px;
            }
          }
          
          @media (max-width: 480px) {
            .profiles-content {
              padding: 20px 16px;
            }
            
            .main-title {
              font-size: 28px;
            }
            
            .stats-bar {
              flex-direction: column;
              gap: 12px;
            }

            .view-toggle {
              width: 100%;
            }

            .view-btn {
              flex: 1;
              justify-content: center;
            }
          }
        `}
      </style>
      
      <div className="profiles-container">
        <div className={`profiles-content ${animate ? 'animate' : ''}`}>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className="profiles-header">
                <h1 className="main-title">
                  <Users size={56} />
                  Developers
                  <Sparkles size={40} style={{ color: '#fbbf24' }} />
                </h1>
                
                <p className="subtitle">
                  <Globe size={20} />
                  Connect with talented developers worldwide
                </p>
                
                <p className="description">
                  Discover amazing developers, explore their skills, and build meaningful 
                  connections in our growing community. From junior developers to senior 
                  engineers, find your next collaboration partner or mentor.
                </p>

                <div className="stats-bar">
                  <div className="stat-item" onClick={() => console.log('Total developers:', profiles?.length)}>
                    <UserCheck size={16} />
                    <span>{profiles?.length || 0} Developers</span>
                  </div>
                  <div className="stat-item" onClick={() => console.log('Growing community!')}>
                    <TrendingUp size={16} />
                    <span>Growing Daily</span>
                  </div>
                  <div className="stat-item" onClick={() => console.log('Worldwide reach!')}>
                    <Globe size={16} />
                    <span>Worldwide</span>
                  </div>
                </div>
              </div>

              <div className="controls-section">
                <div className="search-controls">
                  <div className="search-input-container">
                    <input
                      type="text"
                      placeholder="Search by name, skills, company, or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input"
                    />
                    <Search size={20} className="search-icon" />
                  </div>

                  <div className="view-toggle">
                    <button
                      className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid3X3 size={16} />
                      Grid
                    </button>
                    <button
                      className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                      onClick={() => setViewMode('list')}
                    >
                      <List size={16} />
                      List
                    </button>
                  </div>

                  <button 
                    className="filters-toggle"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter size={16} />
                    Filters
                    <ChevronDown 
                      size={16} 
                      style={{ 
                        transform: showFilters ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }} 
                    />
                  </button>
                </div>

                <div className={`filters-dropdown ${showFilters ? 'show' : ''}`}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <SortAsc size={16} />
                    <span>Sort by:</span>
                    <select 
                      value={sortBy} 
                      onChange={(e) => setSortBy(e.target.value)}
                      className="filter-select"
                    >
                      <option value="name">Name</option>
                      <option value="company">Company</option>
                      <option value="skills">Skills Count</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Filter size={16} />
                    <span>Filter by:</span>
                    <select 
                      value={filterBy} 
                      onChange={(e) => setFilterBy(e.target.value)}
                      className="filter-select"
                    >
                      <option value="all">All Developers</option>
                      <option value="senior">Senior</option>
                      <option value="junior">Junior</option>
                      <option value="remote">Remote</option>
                    </select>
                  </div>
                </div>
              </div>

              {(searchTerm || filterBy !== 'all') && (
                <div className="results-count">
                  <Eye size={18} />
                  Found {filteredProfiles.length} developer{filteredProfiles.length !== 1 ? 's' : ''} 
                  {searchTerm && ` matching "${searchTerm}"`}
                  {filterBy !== 'all' && ` in ${filterBy} category`}
                </div>
              )}

              <div className={viewMode === 'grid' ? 'profiles-grid' : 'profiles-list'}>
                {(searchTerm || filterBy !== 'all' ? filteredProfiles : profiles).length > 0 ? (
                  (searchTerm || filterBy !== 'all' ? filteredProfiles : profiles).map(profile => (
                    <ProfileItem key={profile._id} profile={profile} />
                  ))
                ) : (
                  <EmptyState />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profiles;