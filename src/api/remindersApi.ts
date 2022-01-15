import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000'
});

const getReminders = () => api.get('/reminders').then(res => res.data);

const getReminder = (id: number) => api.get(`/reminders/${id}`).then((res) => res.data);

const updateReminder = (id: number, updatedreminder: any) => api.put(`/reminders/${id}`, updatedreminder).then((res) => res.data)

export { getReminders, getReminder, updateReminder } 