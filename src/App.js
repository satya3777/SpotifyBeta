// App.js

import React, { useState } from "react";
import "./App.css"; 
import Login from "./Login";
import MainApp from "./MainApp"; 


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(""); 

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUsername(user); 
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <MainApp username={username} />
      )}
    </div>
  );
};

export default App;
