import { getFileContent, updateFile } from './github';

export const getSchedules = async () => {
  const result = await getFileContent();
  return result?.content || [];
};

export const saveSchedule = async (schedule) => {
  const currentContent = await getFileContent();
  const newSchedule = { ...schedule, id: Date.now() };
  const newContent = currentContent
    ? [...currentContent.content, newSchedule]
    : [newSchedule];
    
  await updateFile(
    newContent,
    currentContent?.sha,
    `Add booking: ${schedule.name} for ${new Date(schedule.date).toLocaleDateString()}`
  );
  return newContent;
};

export const deleteSchedule = async (id) => {
  const currentContent = await getFileContent();
  if (!currentContent) return [];
  
  const bookingToDelete = currentContent.content.find(s => s.id === id);
  const newContent = currentContent.content.filter(schedule => schedule.id !== id);
  
  await updateFile(
    newContent,
    currentContent.sha,
    `Delete booking for ${bookingToDelete?.name || 'unknown'} on ${bookingToDelete ? new Date(bookingToDelete.date).toLocaleDateString() : 'unknown date'}`
  );
  return newContent;
};