import React from 'react';
import './RightSection.css';

function RightSection({ tasks, onEditTask, onDeleteTask }) {
  return (
    <div className="right-section">
      <h3>Filtered Tasks</h3>
      {tasks.length === 0 ? (
        <p>No tasks match the selected filters.</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due Date: {task.dueDate}</p>
            <p>Priority: {task.priority}</p>
            <p>Status: {task.completed ? 'Completed' : 'Incomplete'}</p>
            <button onClick={() => onEditTask(task)}>Edit</button>
            <button onClick={() => onDeleteTask(task.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default RightSection;
