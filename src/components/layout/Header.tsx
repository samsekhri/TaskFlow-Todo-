import React, { useState } from 'react';
import { Search, X, Tag, Moon, Sun, Filter } from 'lucide-react';
import { useTasks } from '../../context/TaskContext';
import { useTheme } from '../../context/ThemeContext';
import { TaskLabel } from '../../types';

const labelColors: Record<TaskLabel, string> = {
  work: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  personal: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  shopping: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  health: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  other: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
};

const Header: React.FC = () => {
  const { filter, setFilter } = useTasks();
  const { theme, toggleTheme } = useTheme();
  const [showFilters, setShowFilters] = useState(false);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(prev => ({ ...prev, searchTerm: e.target.value }));
  };
  
  const clearSearch = () => {
    setFilter(prev => ({ ...prev, searchTerm: '' }));
  };
  
  const toggleLabel = (label: TaskLabel) => {
    setFilter(prev => {
      const labels = prev.labels.includes(label)
        ? prev.labels.filter(l => l !== label)
        : [...prev.labels, label];
      return { ...prev, labels };
    });
  };
  
  const toggleShowCompleted = () => {
    setFilter(prev => ({ ...prev, showCompleted: !prev.showCompleted }));
  };
  
  return (
    <header className="pl-16 md:pl-64 pr-4 py-4 sticky top-0 bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm shadow-sm z-10 transition-all duration-300">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex-1 relative">
            <div className="max-w-md relative">
              <input
                type="text"
                placeholder="Search tasks..."
                value={filter.searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
              {filter.searchTerm && (
                <button onClick={clearSearch} className="absolute right-3 top-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
            >
              <Filter size={20} className="text-gray-600 dark:text-gray-300" />
              {(filter.labels.length > 0 || !filter.showCompleted) && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full"></span>
              )}
            </button>
            
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === 'dark' 
                ? <Sun size={20} className="text-gray-600 dark:text-gray-300" /> 
                : <Moon size={20} className="text-gray-600 dark:text-gray-300" />
              }
            </button>
          </div>
        </div>
        
        {showFilters && (
          <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg animate-fadeIn border border-gray-200 dark:border-gray-700">
            <div className="mb-2">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300">Filter by label:</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {(["work", "personal", "shopping", "health", "other"] as TaskLabel[]).map(label => (
                  <button
                    key={label}
                    onClick={() => toggleLabel(label)}
                    className={`rounded-full px-3 py-1 text-xs font-medium capitalize flex items-center transition-all ${
                      filter.labels.includes(label) 
                        ? labelColors[label] + ' ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-800 ring-opacity-50 ring-indigo-300'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <Tag size={12} className="mr-1" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center mt-4">
              <label className="inline-flex items-center cursor-pointer">
                <span className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">Show completed tasks</span>
                <div className="relative">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={filter.showCompleted}
                    onChange={toggleShowCompleted}
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 dark:peer-focus:ring-gray-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-500"></div>
                </div>
              </label>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;