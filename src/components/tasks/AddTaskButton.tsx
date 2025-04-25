import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import TaskForm from './TaskForm';

const AddTaskButton: React.FC = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  return (
    <>
      <button
        onClick={() => setIsFormVisible(true)}
        className="fixed right-6 bottom-6 z-10 flex items-center justify-center w-14 h-14 rounded-full shadow-lg text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 group hover:scale-105 active:scale-95"
        aria-label="Add new task"
      >
        <Plus size={24} className="transition-transform group-hover:rotate-90" />
      </button>
      
      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-30 dark:bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md m-4 animate-scaleIn">
            <div className="p-6">
              <TaskForm onClose={() => setIsFormVisible(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTaskButton;