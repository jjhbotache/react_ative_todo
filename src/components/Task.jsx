import { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function Task({ task, onSaveTask, onDeleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState(task.name);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Aquí puedes implementar la lógica para guardar la tarea editada
    // si es igual al nombre original, no se guarda
    if (taskName !== task.name) {
      onSaveTask(task.id, taskName);
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDeleteTask(task.id);
  };

  const handleCancel = () => {
    setTaskName(task.name);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={taskName}
        editable={isEditing}
        onChangeText={(text) => setTaskName(text)}
      />
      {isEditing ? (
        <>
          <Button title="💾" onPress={handleSave} />
          <Button title="❌" onPress={handleCancel} />
        </>
      ) : (
        <>
          <Button title="✏️" onPress={handleEdit} />
          <Button title="🗑️" onPress={handleDelete} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#555',
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 10,
  },
  input: {
    backgroundColor: '#fff',
    width: '60%',
    padding: 10,
    color: '#111',
    fontSize: 16,
  },
});