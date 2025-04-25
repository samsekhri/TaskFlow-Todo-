import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import TaskBoard from './components/tasks/TaskBoard';
import AddTaskButton from './components/tasks/AddTaskButton';
import { ThemeProvider } from './context/ThemeContext';
import { TaskProvider } from './context/TaskContext';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  
  return (
    <ThemeProvider>
      <TaskProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className="ml-16 md:ml-64 min-h-screen flex flex-col transition-all duration-300">
            <Header />
            
            <main className="flex-1">
              <div className="container mx-auto">
                <TaskBoard activeTab={activeTab} />
              </div>
            </main>
          </div>
          
          <AddTaskButton />
        </div>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;