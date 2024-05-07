import { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, View } from 'react-native';
import TasksContainer from './src/components/TasksContainer';
import CreateTaskModal from './src/components/CreateTaskModal';
import { createTables, deleteTask, getTasks, insertTask, updateTask } from './db/db';

const DATABASE_NAME = "Tasks.db";

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tasks, setTasks] = useState([]);

  async function handleCreateTask (newTaskName) {
    await insertTask(newTaskName);
    setIsModalVisible(false);
  };

  function handleCancelCreateTask (){
    setIsModalVisible(false);
  };

  async function handleDeleteTask(taskId){
    console.log("Deleting task with id", taskId);
    await deleteTask(taskId)
    setTasks(
      tasks.filter((task) => task.id !== taskId)
    );
  };

  function handleUpdateTask(taskId, newName){
    updateTask(taskId, newName);
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, name: newName };
        }
        return task;
      })
    );
  }

  useEffect(()=>{
    console.log("App mounted");
    async function mount(){
      await createTables();
      const tasks = await getTasks();
      console.log(tasks);
      setTasks(tasks);
    }
    mount();
  },[])

  // update tasks each time the modal visibility changes
  useEffect(()=>{
    async function updateTasks(){
      console.log("updating tasks");
      const tasks = await getTasks();
      setTasks(tasks);
    }
    updateTasks();
  },[isModalVisible])

  console.log("taks",tasks);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TasksContainer 
        tasks={tasks}
        onDeleteTask={handleDeleteTask}
        onSaveTask={handleUpdateTask}
       />
      <Button title="➕" onPress={() => setIsModalVisible(true)} />
      <CreateTaskModal
        visible={isModalVisible}
        onCreateTask={handleCreateTask}
        onCancelCreateTask={handleCancelCreateTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});