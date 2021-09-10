// import { useState } from 'react';

import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../../hooks/use-http';

const NewTask = (props) => {
  const {isLoading, error, sendRequest: postTasks} = useHttp();
  
  const applyData = (taskText, data) => {
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };
    props.onAddTask(createdTask);
  }

  const enterTaskHandler = async (taskText) => {  
    const requestConfig = {
      url: 'https://react-test-68f18-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json',
      method: 'POST',
      body: { text: taskText },
      headers: {
        'Content-Type': 'application/json',
      }
    }

    postTasks(requestConfig, applyData.bind(null, taskText));
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
