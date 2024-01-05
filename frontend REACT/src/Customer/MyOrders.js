import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import NavigationBar from '../components/NavigationBar';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);


  var customer = JSON.parse(localStorage.getItem('customer'))

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/order/customer/${customer.id}`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.patch(`http://localhost:8080/order/cancelOrder/${orderId}`);
      // Refresh the orders list after deletion
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <><div className="container">
      <h2>Your Orders</h2>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Order ID</th>
            <th>Job Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.orderId}>
              <td>{order.timeStamp}</td>
              <td>{order.id}</td>
              <td>{order.jobStatus}</td>
              <td>
                {order.jobStatus === 'SCHEDULED' && (
                  <Button variant="danger" onClick={() => handleDeleteOrder(order.id)}>
                    Delete
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div></>
  );
};

export default MyOrders;
