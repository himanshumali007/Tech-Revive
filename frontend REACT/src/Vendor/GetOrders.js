
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/GetOrders.css';

function GetOrders() {
    var vendor = JSON.parse(localStorage.getItem('vendor'));
    const [orderStatusData, setorderStatusData] = useState([]);

    useEffect(() => {
        // Fetch data from backend API
        axios.get(`http://localhost:8080/order/vendor/${vendor.id}`)
            .then(response => {
                setorderStatusData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className="get-orders">
            <h1>Order Status Page</h1>
            <table className="order-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Order Status</th>
                        <th>Timestamp</th>
                        <th>Cutomer Name </th>
                        <th>Contact No</th>
                        <th>Customer Address</th>
                    </tr>
                </thead>
                <tbody>
                    {orderStatusData.map(order => (
                        <tr key={order.orderId}>
                            <td>{order.orderId}</td>
                            <td>{order.jobStatus}</td>
                            <td>{order.timeStamp}</td>
                            <td>{order.firstName}  {order.lastName}</td>
                            <td>{order.phoneNumber}</td>
                            <td>{order.flatNo},  {order.area},  {order.city}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GetOrders;
