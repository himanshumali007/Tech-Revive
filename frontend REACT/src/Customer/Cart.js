import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import NavigationBar from '../components/NavigationBar';
import  './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  var totalPrice = 0;
 // const [totalCost, setTotalCost] = useState(0);

  var cart = JSON.parse(localStorage.getItem('customer'));

  useEffect(() => {
    // Make an Axios GET request to fetch cart items
    axios.get(`http://localhost:8080/cart/${cart.id}/services`, {
      params: { // Replace with actual cart id
        pageSize: 10, // Number of items per page
        pageNo: 0 // Page number
      }
    })
    .then(response => {
      setCartItems(response.data);
      //setTotalCost(response.data.totalCost);
    })
    .catch(error => {
      console.error('Error fetching cart items:', error);
    });
  }, []);

  const handleRemoveItem = (itemId) => {
    // Make an Axios DELETE request to remove item from cart
    axios.delete(`http://localhost:8080/cart/${cart.id}/delete/service/${itemId}`)
    .then(() => {
      // Update cart items after successful removal
      setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    })
    .catch(error => {
      console.error('Error removing item from cart:', error);
    });
  };

  const calculateTotalCost = () => {
    let total = 0;
    for (const item of cartItems) {
      total += item.price;
    }
    return total;
  };

  const handleCheckout = async () => {
    try {
      // Make POST request to checkout endpoint
      await axios.post(`http://localhost:8080/order/add/cart/${cart.id}`);

      // Clear the cart items
      setCartItems([]);
      // Show a message or navigate to a confirmation page
      alert('Checkout successful! Your order has been placed.');
      //can give toaster instead
    } catch (error) {
      console.error('Error during checkout:', error);
      // Handle error or show an error message
      alert('An error occurred during checkout. Please try again.');
    }
  };  

  return (
    <><div className="container">
      <h2>Your Cart</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Service Name</th>
            <th>Description</th>
            <th>Cost</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>₹{item.price.toFixed(2)}</td>
              <td>
                <Button variant="danger" onClick={() => handleRemoveItem(item.id)}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="total-cost">
        <strong>Total Cost: ₹{calculateTotalCost().toFixed(2)}</strong>
      </div>
      <div>        <Button  onClick={handleCheckout} className="checkout-button">
        Checkout
      </Button></div>
    </div></>
  );
};

export default Cart;
