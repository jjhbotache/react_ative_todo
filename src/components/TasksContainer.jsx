import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import Task from './Task';

export default function TasksContainer() {
  const tasks = [
    { id: 1, name: 'Hacer ejercicio' },
    { id: 2, name: 'Comprar comida' },
    { id: 3, name: 'Leer un libro' },
  ];

  const handleSaveTask = (taskId, newName) => {
    console.log(`Guardar tarea con ID ${taskId} y nuevo nombre "${newName}"`);
  };

  const handleDeleteTask = (taskId) => {
    console.log(`Eliminar tarea con ID ${taskId}`);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tareas</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Task
            task={item}
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
    maxHeight: 500,
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