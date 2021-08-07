import React, { useState, useContext, useEffect } from 'react';
import config from '../config'
import axios from 'axios'
import UserContext from './UserContext'
import Moment from 'moment';

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

            setOrderState(response.data.reverse())
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
                        <div id="orderInfoContainer">
                            <p id="orderIdOrderDate">Order ID: {order.id} <span>{Moment(order.order_date).format('LLL')}</span></p>
                            <p id="orderStatus">Status: {order.status.name}</p>
                        </div>
                        
                        
                         
                        <div className="accordion accordion-flush" id="accordionFlush">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-heading">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#flush-collapse-" + order.id}  aria-expanded="false" aria-controls={"flush-collapse-" + order.id} >
                                    Delivery Details
                                </button>
                                </h2>
                                <div id={"flush-collapse-" + order.id} className="accordion-collapse collapse" aria-labelledby="flush-heading" data-bs-parent="#accordionFlush">
                                <div className="accordion-body">
                                    <h4>Recipient's details</h4>
                                    <p>Name: {order.user.username}</p>
                                    <p>Phone No.:{order.user.phone_number}</p>
                                    <p>Shipping Address:{order.user.address}</p>
                                </div>
                                </div>
                            </div>
                        </div>
                         
                         {order.orderItem.map((eachItem)=>{
                             return (
                                 <React.Fragment>
                                    <div id="orderItem">
                                            <section id="orderItemImageSection">
                                                <div id="orderItemImage" style={{ backgroundImage: `url(${eachItem.gameListing.image})` }}></div>
                                            </section>


                                            <section id="orderItemDetailsSection">
                                                <div>
                                                    <h2>{eachItem.gameListing.name}</h2>
                                                    <p>${eachItem.unit_price/100}.00</p>
                                                    <p id="quantity">Quantity: {eachItem.quantity}</p>
                                                </div>
                                                <div id="orderSubtotalContainer">
                                                    <p id="orderSubtotal">Subtotal: ${eachItem.unit_price/100 * eachItem.quantity}.00 </p>
                                                </div>
                                            </section>    
                                    </div>
                                </React.Fragment>
                             )
                         })}

                        <div id="orderTotalContainer">
                            <p id="orderTotal">Grand Total: ${order.total_cost/100}.00</p>
                        </div>

                    </div>
                </React.Fragment>
            )
        })
        return orderjsx
    }

    return (
        <React.Fragment>
            <div id="orderHistoryPage">
           
                {/* can only see the page if they have the access token (logged in)*/}
                {localStorage.getItem('accessToken')?<div>
                <h1>Your Order History</h1>
            
            
                {renderOrders()} 
                
        
                </div>: <div>Please sign in to view this page.</div> }
            </div>

        </React.Fragment>
    )
}