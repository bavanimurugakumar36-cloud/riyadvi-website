import axios from 'axios';

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  'http://localhost:5000/api'
).replace(/\/+$/, '');

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const submitApplication = async (applicationData) => {
  try {
    const response = await api.post('/applications', applicationData);

    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      'Unable to submit your application right now. Please try again.';

    throw new Error(message);
  }
};

export default submitApplication;