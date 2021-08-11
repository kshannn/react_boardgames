import React, { useState, useContext, useEffect } from 'react';
import config from '../config'
import axios from 'axios'
import UserContext from './UserContext'
import Moment from 'moment';

export default function OrderHistory() {

    const [orderState, setOrderState] = useState([])
    let context = useContext(UserContext)


    useEffect(() => {
        async function fetchOrderDetails() {
            if (!context.userInfo()) {
                window.location.assign(config.REACT_URL + '/login?session=expire&callback_url=' + window.location.href)
            }
            try {
                let response = await axios.get(config.API_URL + "/orders/" + context.userInfo().id + "/history", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                    }
                })
    
                setOrderState(response.data.reverse())
            } catch (err) {
                console.log(err);
                if (err.toString().includes(403)) {
                    context.logoutRedirect()
                }
            }
        }
        fetchOrderDetails();
    }, [context])



    // render each unique seller's information 

    let renderSeller = (order) => {
        let sellers = []

        let jsx = order.orderItem.map((eachItem) => {

            // if not in the array, add into array and render list
            if (!sellers.includes(eachItem.gameListing.vendor.id)) {
                sellers.push(eachItem.gameListing.vendor.id)

                return (
                    <React.Fragment>
                        <div id="eachSeller">
                            <p>Name: {eachItem.gameListing.vendor.username}</p>
                            <p>Contact no: {eachItem.gameListing.vendor.phone_number}</p>
                            <p>Shipping from: {eachItem.gameListing.vendor.address}</p>
                        </div>
                    </React.Fragment>
                )
            } else {
                return null
            }
    
        })
        return jsx
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
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#flush-collapse-" + order.id} aria-expanded="false" aria-controls={"flush-collapse-" + order.id} >
                                        See delivery details
                                    </button>
                                </h2>
                                <div id={"flush-collapse-" + order.id} className="accordion-collapse collapse" aria-labelledby="flush-heading" data-bs-parent="#accordionFlush">
                                    <div className="accordion-body">
                                        <h4>Recipient's Information</h4>
                                        <p>Name: {order.user.username}</p>
                                        <p>Contact no: {order.user.phone_number}</p>
                                        <p>Shipping Address: {order.user_address}</p>

                                        <h4>Seller's Information</h4>
                                        {renderSeller(order)}

                                    </div>
                                </div>
                            </div>
                        </div>

                        {order.orderItem.map((eachItem) => {
                            return (
                                <React.Fragment>
                                    <div id="orderItem">
                                        <section id="orderItemImageSection">
                                            <div id="orderItemImage" style={{ backgroundImage: `url(${eachItem.gameListing.image})` }}></div>
                                        </section>


                                        <section id="orderItemDetailsSection">
                                            <div>
                                                <h2>{eachItem.gameListing.name}</h2>
                                                <p>${(eachItem.unit_price / 100).toFixed(2)}</p>
                                                <p id="quantity">Quantity: {eachItem.quantity}</p>
                                                <p className="sellerName">Seller: {eachItem.gameListing.vendor.username}</p>
                                            </div>
                                            <div id="orderSubtotalContainer">
                                                <p id="orderSubtotal">Subtotal: ${(eachItem.unit_price / 100 * eachItem.quantity).toFixed(2)} </p>
                                            </div>
                                        </section>
                                    </div>
                                </React.Fragment>
                            )
                        })}

                        <div id="orderTotalContainer">
                            <p id="orderTotal">Grand Total: ${order.total_cost / 100}.00</p>
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
                {localStorage.getItem('accessToken') ? <div>
                    <h1>Your Order History</h1>

                    {orderState.length ? renderOrders() : <div className="whiteFont">No orders to date</div>}

                </div> : <div className="whiteFont">Please sign in to view this page.</div>}
            </div>

        </React.Fragment>
    )
}