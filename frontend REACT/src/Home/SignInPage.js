import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignInPage.css';

const LoginUser = ({setIsLoggedInVendor}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(null);
  const [loginError, setLoginError] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError('');
    setPasswordError('');

    if (!formData.email) {
      setEmailError('Please enter your email.');
      return;
    }

    if (!formData.password) {
      setPasswordError('Please enter your password.');
      return;
    }

    try {
      const customerResponse = await axios.post('http://localhost:8080/customer/login', {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem('user', JSON.stringify({ type: 'customer', data: customerResponse.data }));
      localStorage.setItem('customer',JSON.stringify(customerResponse.data))
      setLoginStatus('Login successful');
      setLoginError(false);

      toast.success('Login successful!');
      navigate('/customer/categories');
    } catch (customerError) {
      try {
        const vendorResponse = await axios.post('http://localhost:8080/vendor/login', {
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem('user', JSON.stringify({ type: 'vendor', data: vendorResponse.data }));
        localStorage.setItem('vendor',JSON.stringify(vendorResponse.data))

        setIsLoggedInVendor(true);
        setLoginStatus('Login successful');
        setLoginError(false);
        toast.success('Login successful!');
        navigate('/getorders');
      } catch (vendorError) {
        setLoginError(true);
        toast.error('Invalid email or password. Please try again.');
      }
    }
  };

  return (
    <div className="sign-in-page">
      <div className="sign-in-container">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <label>Email<span> *</span></label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {emailError && <p className="error-text">{emailError}</p>}


          <label>Password<span> *</span></label>
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {passwordError && <p className="error-text">{passwordError}</p>}

          <div>
            <button type="submit">Sign In</button>
            <Link to="/forgotpassword">Forgot Password?</Link>
          </div>
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
        {loginStatus && (
          <p className={`login-status ${loginStatus === 'Login successful' ? 'success' : 'error'}`}>
            {loginStatus}
          </p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginUser;
