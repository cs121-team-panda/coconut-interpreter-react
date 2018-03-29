import request from './utils/request';

const baseUrl = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

const run = payload =>
  request(`${baseUrl}/coconut`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

export default run;
