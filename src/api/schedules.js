import { saveSchedule, getSchedules, deleteSchedule } from '../utils/storage';

export const fetchSchedules = async () => {
  return getSchedules();
};

export const createSchedule = async (scheduleData) => {
  return saveSchedule(scheduleData);
};

export const removeSchedule = async (id) => {
  return deleteSchedule(id);
};