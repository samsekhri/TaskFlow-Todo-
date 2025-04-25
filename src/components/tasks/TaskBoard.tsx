import React from 'react';
import { useTasks } from '../../context/TaskContext';
import TaskCard from './TaskCard';
import { CircleSlash2 } from 'lucide-react';

interface TaskBoardProps {
  activeTab: string;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ activeTab }) => {
  const { filteredTasks } = useTasks();
  
  // Filter tasks based on the active tab
  const todayTasks = filteredTasks.filter(task => {
    if (activeTab === 'today') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const taskDate = task.dueDate ? new Date(task.dueDate) : null;
      if (taskDate) {
        const taskDay = new Date(taskDate);
        taskDay.setHours(0, 0, 0, 0);
        return taskDay.getTime() === today.getTime();
      }
      return false;
    }
    
    if (activeTab === 'upcoming') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const taskDate = task.dueDate ? new Date(task.dueDate) : null;
      if (taskDate) {
        const taskDay = new Date(taskDate);
        taskDay.setHours(0, 0, 0, 0);
        return taskDay.getTime() > today.getTime();
      }
      return false;
    }
    
    if (activeTab === 'completed') {
      return task.completed;
    }
    
    // Home tab shows all tasks
    return true;
  });
  
  let pageTitle = 'All Tasks';
  if (activeTab === 'today') pageTitle = "Today's Tasks";
  if (activeTab === 'upcoming') pageTitle = "Upcoming Tasks";
  if (activeTab === 'completed') pageTitle = "Completed Tasks";
  if (activeTab === 'settings') pageTitle = "Settings";
  
  // Render settings view if active tab is settings
  if (activeTab === 'settings') {
    return (
      <div className="py-8 px-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">{pageTitle}</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">App Settings</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Settings will be available in a future update.</p>
          
          <div className="mt-8 px-4 py-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-sm text-indigo-700 dark:text-indigo-300">
            <p>Version 1.0.0 - TaskFlow</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-8 px-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">{pageTitle}</h1>
      
      {todayTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <CircleSlash2 size={32} className="text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No tasks found</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            {activeTab === 'today' 
              ? "You don't have any tasks due today. Click the + button to add a new task."
              : activeTab === 'upcoming'
                ? "You don't have any upcoming tasks. Click the + button to add a new task."
                : activeTab === 'completed'
                  ? "You haven't completed any tasks yet. Complete a task to see it here."
                  : "No tasks match your current filters. Try adjusting your search or filters."}
          </p>
        </div>
      ) : (
        <div className="space-y-1">
          {todayTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskBoard;