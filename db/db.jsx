import * as SQLite from "expo-sqlite";

const DATABASE_NAME = "Tasks.db";

async function getDBconnection() {
  return await SQLite.openDatabaseAsync(DATABASE_NAME);
}

export async function createTables() {
  const db = await getDBconnection();
  await db.execAsync("CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);");
  await db.closeAsync();
}

export async function insertTask(name) {
  console.log("creating task");
  const db = await getDBconnection();
  await db.runAsync("INSERT INTO tasks (name) VALUES (?)", [name]);
  console.log("Task created");
  await db.closeAsync();
}

export async function getTasks() {
  console.log("getting tasks");
  const db = await getDBconnection();
  const result = await db.getAllAsync("SELECT * FROM tasks");
  await db.closeAsync();
  return result
}

export async function updateTask(id, name) {
  console.log("updating task");
  const db = await getDBconnection();
  await db.runAsync("UPDATE tasks SET name = ? WHERE id = ?", [name, id]);
  console.log("Task updated");
  await db.closeAsync();
}

export async function deleteTask(id) {
  console.log("deleting task");
  const db = await getDBconnection();
  await db.runAsync("DELETE FROM tasks WHERE id = ?", [id]);
  console.log("Task deleted");
  await db.closeAsync();
}