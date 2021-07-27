import React from 'react';
import axios from 'axios';
import config from '../config'



export default function PaymentSuccess() {


    let fetchTransactionDetail = async(req,res) => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        await axios.get(config.API_URL + '/orders/success?' + "orderid=" + params.orderId)
    }

   

    return (
        <React.Fragment>
            <h1>Payment Successful!</h1>
            {fetchTransactionDetail()}
        </React.Fragment>
    )
}