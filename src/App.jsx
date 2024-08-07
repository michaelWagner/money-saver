import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Bucket from './components/Bucket';
import Friends from './components/Friends';
import Profile from './components/Profile';
import UserAuth from './components/UserAuth';
import './App.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  const saveToken = (userToken) => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  return (
    <Router>
      <Header token={token} logout={logout} />
      <Routes>
        {/* <Route path="/" element={<Bucket />} />
        <Route path="/friends" element={<Friends />} /> */}
        
        <Route path="/" element={<Bucket token={token} />} />
        <Route path="/friends" element={<Friends token={token} />} />
        <Route path="/profile" element={<Profile token={token} />} />
        <Route path="/login" element={<UserAuth setToken={saveToken} />} />
      </Routes>
    </Router>
  );
};

export default App;


// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import Header from './components/Header';
// import Bucket from './components/Bucket';
// import Friends from './components/Friends';
// import Profile from './components/Profile';
// import UserAuth from './components/UserAuth';
// import './App.css';

// const App = () => {
//   const [token, setToken] = useState(localStorage.getItem('token') || '');

//   const logout = () => {
//     setToken('');
//     localStorage.removeItem('token');
//   };

//   const saveToken = (userToken) => {
//     localStorage.setItem('token', userToken);
//     setToken(userToken);
//   };

//   return (
//     <Router>
//       <Header token={token} logout={logout} />
//       <Switch>
//         <Route exact path="/" render={() => (token ? <Bucket token={token} /> : <Redirect to="/login" />)} />
//         <Route path="/friends" render={() => (token ? <Friends token={token} /> : <Redirect to="/login" />)} />
//         <Route path="/profile" render={() => (token ? <Profile token={token} /> : <Redirect to="/login" />)} />
//         <Route path="/login" render={() => <UserAuth setToken={saveToken} />} />
//       </Switch>
//     </Router>
//   );
// };

// export default App;
