
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './css/UpdateServices.css'; 
import {toast ,ToastContainer} from 'react-toastify'
const UpdateServices = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  var vendor = JSON.parse(localStorage.getItem('vendor'));
  const [item, setItem] = useState({
    id: 0,
    name: '',
    description: '',
    price: 0,
    category: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:8080/vendor/service/${id}`)
      .then(response => {
        setItem(response.data);
      })
      .catch(error => {
        console.error('Error fetching item data:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem(prevItem => ({
      ...prevItem,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/vendor/update/${vendor.id}/service/${id}`, item)
      .then(response => {
        console.log('Item data updated:', response.data);
        toast.success('update Successfully');
        navigate('/serviceDetails')
      })
      .catch(error => {
        console.error('Error updating item data:', error);
        toast.error('Not updated')
      });
  };

  const categories = [
    "AC",
    "MICROWAVE",
    "REFRIGERATOR",
    "LAPTOP",
    "PC",
    "WASHING_MACHINE",
    "WATER_FILTER"
  ];

  return (
    <div className="update-services-container">
      <h1>Update Service Details</h1>
      <form onSubmit={handleSubmit} className="update-form">
        <label>
          Name:
          <input type="text" name="name" value={item.name} onChange={handleChange} />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={item.description} onChange={handleChange} />
        </label>
        <label>
          Price:
          <input type="number" name="price" value={item.price} onChange={handleChange} />
        </label>
        <label>
          Category:
          <select name="category" value={item.category} onChange={handleChange}>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateServices;

