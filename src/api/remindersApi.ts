import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

const getReminders = () => api.get("/reminders").then((res) => res.data);

const getReminder = (id: number) =>
  api.get(`/reminders/${id}`).then((res) => res.data);

const updateReminder = (updatedreminder: any) =>
  api
    .put(`/reminders/${updatedreminder.id}`, updatedreminder)
    .then((res) => res.data);
const addReminder = (reminder: any) =>
  api
    .post("/reminders", reminder, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
    .then((res) => res.data);

const deleteReminder = (id: number) =>
  api.delete(`/reminders/${id}`).then((res) => res.data);

export {
  getReminders,
  getReminder,
  updateReminder,
  addReminder,
  deleteReminder,
};
