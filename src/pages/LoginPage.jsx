// src/pages/LoginPage.jsx
import React from 'react';
import PropTypes from 'prop-types'; // Add this line
import AuthForm from '../components/AuthForm';

const LoginPage = ({ setToken }) => {
  return (
    <div>
      <AuthForm setToken={setToken} />
    </div>
  );
};

LoginPage.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default LoginPage;
