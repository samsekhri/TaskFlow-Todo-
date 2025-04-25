import React from 'react';
import { Home, Calendar, Clock, CheckCircle, Settings } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { theme } = useTheme();

  const menuItems = [
    { id: 'home', label: 'Home', icon: <Home size={20} /> },
    { id: 'today', label: 'Today', icon: <Calendar size={20} /> },
    { id: 'upcoming', label: 'Upcoming', icon: <Clock size={20} /> },
    { id: 'completed', label: 'Completed', icon: <CheckCircle size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> }
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-16 md:w-64 bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 z-10">
      <div className="flex flex-col h-full">
        <div className="p-4 flex items-center justify-center md:justify-start">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <CheckCircle size={16} className="text-white" />
          </div>
          <h1 className="hidden md:block text-xl font-bold ml-2 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">TaskFlow</h1>
        </div>
        
        <div className="flex-1 mt-8">
          <ul>
            {menuItems.map(item => (
              <li key={item.id} className="mb-2">
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center w-full px-4 py-3 transition-all duration-200 
                  ${activeTab === item.id 
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 border-r-4 border-indigo-500' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                  <div className="flex items-center justify-center w-8">
                    {item.icon}
                  </div>
                  <span className="hidden md:block ml-4 font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-4 mt-auto">
          <div className="hidden md:block text-xs text-gray-500 dark:text-gray-400">
            Made By: Samanvay
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;