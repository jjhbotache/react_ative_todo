import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, Alert } from 'react-native';

export default function CreateTaskModal({ onCreateTask, onCancelCreateTask, visible }) {
  const [newTaskName, setNewTaskName] = useState('');

  const handleCreateTask = () => {
    if (newTaskName.trim() === '') {
      Alert.alert('Error', 'El nombre de la tarea no puede estar vacío');
    } else {
      onCreateTask(newTaskName);
      setNewTaskName('');
    }
  };

  const handleCancelCreateTask = () => {
    setNewTaskName('');
    onCancelCreateTask();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Crear Tarea</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre de la tarea"
          value={newTaskName}
          onChangeText={setNewTaskName}
        />
        <View style={styles.buttonContainer}>
          <Button title="Guardar" onPress={handleCreateTask} />
          <Button title="Cancelar" onPress={handleCancelCreateTask} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});