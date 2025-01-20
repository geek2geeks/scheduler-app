import { getFileContent, updateFile } from './github';

export const getSchedules = async () => {
  // First check GitHub
  const result = await getFileContent();
  if (result?.content) {
    return result.content;
  }
  // Fall back to localStorage if GitHub fetch fails
  return JSON.parse(localStorage.getItem('pending_changes') || '[]');
};

export const saveSchedule = async (schedule) => {
  const currentSchedules = await getSchedules();
  const newSchedule = { ...schedule, id: Date.now() };
  const newContent = [...currentSchedules, newSchedule];
  
  await updateFile(newContent);
  return newContent;
};

export const deleteSchedule = async (id) => {
  const currentSchedules = await getSchedules();
  const newContent = currentSchedules.filter(
    schedule => schedule.id !== id
  );
  
  await updateFile(newContent);
  return newContent;
};

// Admin functions
export const getPendingChanges = async () => {
  const storedChanges = localStorage.getItem('pending_changes');
  return storedChanges ? JSON.parse(storedChanges) : [];
};

export const clearPendingChanges = async () => {
  localStorage.removeItem('pending_changes');
};

export const isPendingChangesPresent = async () => {
  const changes = await getPendingChanges();
  return changes.length > 0;
};