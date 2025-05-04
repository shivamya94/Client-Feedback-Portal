import React, { useEffect, useState } from 'react';
import axios from '../api'; // make sure this exists or use axios directly

const ApiTest = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/api/test')
      .then(res => setMessage(res.data.message))
      .catch(err => setMessage('Connection failed'));
  }, []);

  return <div>API Response: {message}</div>;
};

export default ApiTest;
