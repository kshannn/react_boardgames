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
        if(!context.userInfo()){
            window.location.assign('https://3000-green-prawn-u4ktudfo.ws-us13.gitpod.io/login' + '?' + 'session=expire&' + 'callback_url=' + window.location.href)
        }
        try {
            let response = await axios.get(config.API_URL + "/orders/" + context.userInfo().id + "/history",{
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            console.log(response.data)
            setOrderState(response.data)
        } catch (err){
            console.log(err);
            if(err.toString().includes(403)){
               context.logoutRedirect()
            }
        }
    }

   

    let renderOrders = () => {
        let orderjsx = orderState.map((order) => {

            return (
                <React.Fragment>
                    <div id="orderContainer">
                        <p>Order ID: {order.id} [{order.order_date}]</p>
                        <p>Status: {order.status.name}</p>
                         
                         
                         
                         {order.orderItem.map((eachItem)=>{
                             return <div id="orderItem">

                                 <section id="orderItemImageSection">
                                     <div id="orderItemImage" style={{ backgroundImage: `url(${eachItem.gameListing.image})` }}></div>
                                 </section>


                                 <section id="orderItemDetails">
                                    {eachItem.gameListing.name}
                                    Quantity: {eachItem.quantity}
                                    Unit Price: {eachItem.unit_price}
                                </section>
                                 
                                 
                            </div>
                         })}

                        <p>Grand Total: ${order.total_cost/100}.00</p>

                    </div>
                </React.Fragment>
            )
        })
        return orderjsx
    }

    return (
        <React.Fragment>
           
            {/* can only see the page if they have the access token (logged in)*/}
            {localStorage.getItem('accessToken')?<div>
            <h1>Your Order History</h1>
           
           
            {renderOrders()} 
             
    
            </div>: <div>Please sign in to view this page.</div> }

        </React.Fragment>
    )
}