import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import Task from './Task';

export default function TasksContainer({tasks, onDeleteTask, onSaveTask}) {
  console.log("TasksContainer", tasks);
  const handleSaveTask = (taskId, newName) => {
    console.log(`Guardar tarea con ID ${taskId} y nuevo nombre "${newName}"`);
    onSaveTask(taskId, newName);
  };

  const handleDeleteTask = (taskId) => {
    console.log(`Eliminar tarea con ID ${taskId}`);
    onDeleteTask(taskId);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tareas</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Task
            task={item || "error with the name"}
            onSaveTask={handleSaveTask}
            onDeleteTask={handleDeleteTask}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    height: 500,
    padding: 5,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});