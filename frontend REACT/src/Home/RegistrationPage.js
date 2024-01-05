import React, { useState, } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RegistrationPage.css';
import CascadingDropdowns from './CascadingDropdowns';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
function RegistrationPage() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState('');

  const [formData, setFormData] = useState({
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
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    isVendor: false,
    addImage: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));

    } else if (name === 'city' || name === 'district' || name === 'state' || name === 'country') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSelectLocation = (location) => {
    setFormData((prevData) => ({
      ...prevData,
      city: location.city,
      district: location.district,
      state: location.state,
      country: location.country,
    }));
  };

  const handleFileChange = (e) => {
    console.log('File change event triggered');
    const file = e.target.files[0];

    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (allowedTypes.includes(file.type)) {
        setFormData((prevData) => ({
          ...prevData,
          addImage: file, 
        }));
        setFileError('');
      } else {
        setFormData((prevData) => ({
          ...prevData,
          addImage: null, 
        }));
        setFileError('Please select a valid image file (jpg, jpeg, or png)');
      }
    }
  };

  const handleSubmit = async (e) => {
    debugger
    e.preventDefault();
    console.log(formData);
    const validationErrors = {};

    if (!formData.firstName) validationErrors.firstName = 'First name is required';
    if (!formData.lastName) validationErrors.lastName = 'Last name is required';
    if (!formData.email) validationErrors.email = 'Email is required';
    if (!formData.password) validationErrors.password = 'Password is required';
    if (!formData.flatNo) validationErrors.flatNo = 'Flat No is required';
    if (!formData.area) validationErrors.area = 'Area is required';
    if (!formData.city) validationErrors.city = 'City is required';
    if (!formData.district) validationErrors.district = 'District is required';
    if (!formData.state) validationErrors.state = 'State is required';
    if (!formData.country) validationErrors.country = 'Country is required';
    if (!formData.pincode) validationErrors.pincode = 'Pincode number is required';
    if (!formData.phoneNumber) validationErrors.phoneNumber = 'Phone number is required';

    if (!/^\d{6}$/.test(formData.pincode)) {
      validationErrors.pincode = 'Pincode must be 6 digits.';
      return;
    }

    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      validationErrors.phoneNumber = 'Phone number must be 10 digits.';
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      validationErrors.password = 'Password and Confirm Password do not match.';
      return;
    }
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,12}$/;
    if (!regex.test(formData.password)) {
      validationErrors.password = "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 special character, 1 numeral and length between 4-12 characters.";
      return;
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {

      const apiUrl = formData.isVendor
      ? 'http://localhost:8080/vendor/add'
      : 'http://localhost:8080/customer/add';

      const user = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        flatNo: formData.flatNo,
        area: formData.area,
        city: formData.city,
        district: formData.district,
        state: formData.state,
        country: formData.country,
        pincode: formData.pincode,
        phoneNumber: formData.phoneNumber,
        
      };    

      const formDataToSend = new FormData();

      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

     if(formData.isVendor)
      formDataToSend.append('addImage', formData.addImage);


      try {

        await axios.post(apiUrl,formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        navigate('/');

        if (formData.isVendor) {
          navigate(formData.isVendor ? '/' : '/');
        }
      } catch (error) {
        console.error('Error registering user:', error);
      }

    }
  };

  return (
    <div className="registration-form">
      <h2>Register </h2>
      <form onSubmit={handleSubmit}>


        <label htmlFor="firstName">First Name <span> *</span></label>
        <input
          type="text"
          id="firstName"
          className="input"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="Enter your first name"
          required
        />

        <label htmlFor="lastName">Last Name <span> *</span></label>
        <input
          type="text"
          id="lastName"
          className="input"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Enter your last name"
          required
        />

        <label htmlFor="email">Email <span> *</span></label>
        <input
          type="email"
          id="email"
          className="input"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          placeholder="Enter your email"
        />
        <label htmlFor="password">Password <span>*</span></label>
        <input
          type="password"
          id="password"
          className="input"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Enter your password"
          required
        />

        <label htmlFor="confirmPassword">Confirm Password <span>*</span></label>
        <input
          type="password"
          id="confirmPassword"
          className="input"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm your password"
          required
        />
        <label htmlFor="adderss">Adderss:</label>
        <label htmlFor="flatNo">Flat No./House No. <span> *</span></label>
        <input
          type="text"
          id="flatNo"
          className="input"
          name="flatNo"
          value={formData.flatNo}
          onChange={handleInputChange}
          placeholder="Enter your FlatNo/HouseNo"
          required
        />

        <label htmlFor="area">Area <span> *</span></label>
        <input
          type="text"
          id="area"
          className="input"
          name="area"
          value={formData.area}
          onChange={handleInputChange}
          placeholder="Enter your Area"
          required
        />

        <CascadingDropdowns onSelectLocation={handleSelectLocation} />

        <label htmlFor="pincode">Pincode <span> *</span></label>
        <input
          type="text"
          id="pincode"
          className="input"
          name="pincode"
          value={formData.pincode}
          onChange={handleInputChange}
          placeholder="Enter your pincode"
          required
        />

        <label htmlFor="phoneNumber">Phone Number <span> *</span></label>
        <input
          type="tel"
          id="phoneNumber"
          className="input"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          placeholder="Enter your phone no."
          required
        />

        <label id='checkbox'>
          <input
            type="checkbox"
            name="isVendor"
            checked={formData.isVendor}
            onChange={handleInputChange}
            id="checkbox-input"

          />{' '}Register as Vendor 
          
        </label>

        {formData.isVendor && (
          <div>
            <label htmlFor="addImage">
              Add Your Image(.jpg, .jpeg, .png) <span>*</span>
            </label>
            <input
            className="input"
              type="file"
              accept=".jpg, .jpeg, .png"
              name="addImage"
              // value={formData.addImage}
             onChange={handleFileChange}
              required
            />
            {fileError && <p style={{ color: 'red' }}>{fileError}</p>}

          </div>
        )}

        <button type="submit">Register</button>
        <p>
          Already registered? <Link to="/signin/customer">Login here</Link>
        </p>
      </form>
    </div>

  );
}

export default RegistrationPage;
