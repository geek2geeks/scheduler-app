const STORAGE_KEY = 'scheduler_data';

export const saveSchedule = (schedule) => {
  const existingData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const newData = [...existingData, { ...schedule, id: Date.now() }];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  return newData;
};

export const getSchedules = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
};

export const deleteSchedule = (id) => {
  const existingData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const newData = existingData.filter(schedule => schedule.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  return newData;
};