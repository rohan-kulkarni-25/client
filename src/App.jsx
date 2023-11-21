// App.js
import React, { useState } from 'react';
import Layout from './layout/Layout';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Add your authentication logic here.
    // For simplicity, let's consider the user is logged in when the login button is clicked.
    setLoggedIn(true);
  };

  return (
    <div className="App">
      <Layout isLoggedIn={isLoggedIn} onLogin={handleLogin} />
    </div>
  );
};

export default App;
