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