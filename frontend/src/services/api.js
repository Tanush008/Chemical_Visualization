import axios from "axios";
const API_BASE = process.env.REACT_APP_WEB_URL ?? "http://localhost:8000";
// console.log(API_BASE, "dkfafas");
export const uploadCSV = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return axios.post(`${API_BASE}/api/upload/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const getHistory = () => {
  return axios.get(`${API_BASE}/api/history/`);
};
export const deleteDataset = (id) => {
  return axios.delete(`${API_BASE}/api/delete/${id}/`);
};
