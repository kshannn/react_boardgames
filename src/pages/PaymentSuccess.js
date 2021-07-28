import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config'



export default function PaymentSuccess() {

    const [ latestOrderState, setLatestOrderState ] = useState([]) 

    // 1. call function to fetch transaction on component mount
    useEffect(() => {
        fetchTransactionDetail();
    }, [])

    // 2. call API to fetch transaction details and store in state
    let fetchTransactionDetail = async() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        let response = await axios.get(config.API_URL + '/orders/success?' + "orderid=" + params.orderId)
        setLatestOrderState(response.data)
    }

    // 3. render listing of orders by using stored state
    let total = 0 // to store total amount
    let renderTransactionDetail = () => {
        let orderjsx = latestOrderState.map((eachOrder)=> {
            total += eachOrder.quantity * eachOrder.unit_price
            return (
                <React.Fragment>
                    <tr>
                        <td>{eachOrder.id}</td>
                        <td>{eachOrder.gameListing.name}</td>
                        <td>SGD {eachOrder.unit_price/100}</td>
                        <td>{eachOrder.quantity}</td>
                        <td>SGD {eachOrder.quantity * eachOrder.unit_price/100}</td>

                    </tr>
                </React.Fragment>
            )
        })
        return orderjsx
    }

   
    return (
        <React.Fragment>
            <h1>Payment Successful!</h1>
            <h2>Your Latest Transaction(s)</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Order Item Id</th>
                        <th>Game</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Sub-total</th>
                    </tr>
                </thead>
                <tbody>
                     {renderTransactionDetail()}
                </tbody>
            </table>
            Total: SGD {total/100}
                
                
          
        </React.Fragment>
    )
}