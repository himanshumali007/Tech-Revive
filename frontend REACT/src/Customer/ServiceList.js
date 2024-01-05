import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios library
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useParams, Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar'

import './ServiceList.css'

const ServicesList = () => {
  const { category } = useParams();
  const [services, setServices] = useState([]);
  const [cartMessages, setCartMessages] = useState('');


  var cartid = JSON.parse(localStorage.getItem('customer')).id;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/service/category`, {
          params: {
            category: category
          }
        });
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }

      services.map((service)=> console.log(service.id));
    };

    fetchServices();
  }, [category]);

  const handleAddToCart = (service) => {
    axios
    .post(`http://localhost:8080/cart/${cartid}/add/service/${service.serviceId}`)
    .then((response) => {
      if (response.status === 200) {
        setCartMessages(`Service ${service.name} added to cart successfully!`);
        toast.success(`Service ${service.name} added to Cart!`,{position : toast.POSITION.TOP_RIGHT});
        } else {
        console.error('Error adding service to cart:', response.status);
      }
    })
    .catch((error) => {
      console.error('Error adding service to cart:', error);
      setCartMessages('Cannot be added to cart!');
      console.log(`Service with ID ${service.serviceId} cannot be added to cart`);
      toast.warning(`Cannot add ${service.name} Service! Please select services of same Vendor`,{position : toast.POSITION.TOP_RIGHT});

      ;    });
  };

  console.log(services);

  return (
    <><div className="services-list">
      <h2>Services for {category}</h2>
      {services.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Vendor</th>
              <th>Vendor Contact</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>{service.name}</td>
                <td>{service.description}</td>
                <td>{service.price}</td>
                <td>{service.firstName} {service.lastName}</td>
                <td>{service.phoneNumber}</td>
                
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(service)}
                  >
                    Add to Cart
                  </button>
                  <span className="cart-message">{cartMessages[service.id]}</span>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No services available for the selected category.</p>
      )}
      {/* {cartMessage && <p className="cart-message">{cartMessage}</p>} */}
    </div>
    <div className="proceed-button">
        <Link to="/customer/cart" className="btn btn-primary">Proceed to Cart</Link>
      </div>
    </>

  );
};

export default ServicesList;
