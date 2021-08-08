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
                        <td>${eachOrder.unit_price/100}.00</td>
                        <td>{eachOrder.quantity}</td>
                        <td>${eachOrder.quantity * eachOrder.unit_price/100}.00</td>

                    </tr>
                </React.Fragment>
            )
        })
        return orderjsx
    }

   
    return (
        <React.Fragment>
            <div className="alert alert-success" role="alert">
                Payment was made successfully!
            </div>
            <div id="paymentSuccessPage">
                <div id="transactionTable">
                <h2>Your Latest Transaction</h2>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
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
                <div id="grandTotalContainer">
                    <p>Grand Total: ${total/100}.00</p>
                    <a href="/" className="btn" id="backHomeBtn">Back to Home Page</a>
                </div>
            </div>
                
                
          
        </React.Fragment>
    )
}