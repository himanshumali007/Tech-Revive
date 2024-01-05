
import './css/UpdateVenderDetails.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {toast ,ToastContainer} from 'react-toastify'

const UpdateVenderDetails = () => {
  var vendor = JSON.parse(localStorage.getItem('vendor'));
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
      flatNo: '',
      area: '',
      city: '',
      district: '',
      state: '',
      country: '',
      pincode: '',
    phoneNumber: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:8080/vendor/${vendor.id}`)
      .then(response => {
        setUser(response.data);
        setUpdatedUser(response.data); // Set initial form values
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser(prevUser => ({
      ...prevUser,
      address: {
        ...prevUser.address,
        [name]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send updated user data to Spring Boot backend
    axios.put(`http://localhost:8080/vendor/update/${vendor.id}`, updatedUser)
      .then(response => {
        console.log('User data updated:', response.data);
        toast.success("Details Updated!!!")
        navigate('/vendor/:id')
      })
      .catch(error => {
        console.error('Error updating user data:', error);
      });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="update-user">
      <h1>Update User Details</h1>
      <form className="update-form" onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="firstName" value={updatedUser.firstName} onChange={handleChange} />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" value={updatedUser.lastName} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={updatedUser.email} onChange={handleChange} />
        </label>
        <h2>Address</h2>
        <label>
          Store No:
          <input type="text" name="flatNo" value={updatedUser.flatNo} onChange={handleChange} />
        </label>
        <label>
          Area:
          <input type="text" name="area" value={updatedUser.area} onChange={handleChange} />
        </label>
        <label>
          City:
          <input type="text" name="city" value={updatedUser.city} onChange={handleChange} />
        </label>
        <label>
          District:
          <input type="text" name="district" value={updatedUser.district} onChange={handleChange} />
        </label>
        <label>
          State:
          <input type="text" name="state" value={updatedUser.state} onChange={handleChange} />
        </label>
        <label>
          Country:
          <input type="text" name="country" value={updatedUser.country} onChange={handleChange} />
        </label>
        <label>
          Pincode:
          <input type="text" name="pincode" value={updatedUser.pincode} onChange={handleChange} />
        </label>
        <label>
          Phone Number:
          <input type="text" name="phoneNumber" value={updatedUser.phoneNumber} onChange={handleChange} />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateVenderDetails;
