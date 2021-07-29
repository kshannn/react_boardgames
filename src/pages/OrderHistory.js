import React, { useState, useContext, useEffect } from 'react';
import config from '../config'
import axios from 'axios'
import UserContext from './UserContext'

export default function OrderHistory() {

    const [orderState, setOrderState] = useState([])
    let context = useContext(UserContext)

    useEffect(() => {
        fetchOrderDetails();
    }, [])

    let fetchOrderDetails = async () => {

        let response = await axios.get(config.API_URL + "/orders/" + context.userInfo().id + "/history")
        setOrderState(response.data)
    }

   

    let renderOrders = () => {
        let orderjsx = orderState.map((order) => {

            return (
                <React.Fragment>
                   <tr>
                         <td>{order.id}</td>
                         <td>{order.order_date}</td>
                         <td>{order.total_cost}</td>
                         <td>{order.status_id}</td>
                    </tr>   
                </React.Fragment>
            )
        })
        return orderjsx
    }

    return (
        <React.Fragment>
            <h1>Order History</h1>
           
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Order Id</th>
                        <th scope="col">Order Date</th>
                        <th scope="col">Total Cost</th>
                        <th scope="col">Status</th>
                    
                    </tr>
                </thead>
                <tbody>
                    {renderOrders()} 
                </tbody>
            </table>

        </React.Fragment>
    )
}