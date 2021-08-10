import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import config from '../config'
import ProductContext from './ProductContext'
import UserContext from './UserContext'


export default function Cart() {

    let productContext = useContext(ProductContext)
    let context = useContext(UserContext);

    const [cartItems, setCartItems] = useState([])


    // useEffect(() => {
    //     fetchCartItems()
    // }, [])

    useEffect(() => {
        async function fetchCartItems2(){
            // if user not logged in, redirected to login page
            if (!context.userInfo()) {
                window.location.assign(config.REACT_URL + '/login?session=expire&callback_url=' + window.location.href)
            }
            try {
                let response = await axios.get(config.API_URL + '/cart/' + context.userInfo().id, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                    }
                })

                setCartItems(response.data)
            } catch (err) {
                console.log(err);
                if (err.toString().includes(403)) {
                    context.logoutRedirect()
                }
            }
        }
        fetchCartItems2()
    }, [context])




    // remove cart item
    let removeCartItem = async (gameId) => {

        try {
            await axios.post(config.API_URL + '/cart/' + gameId + '/remove', {
                'user_id': context.userInfo().id
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            })

            // re-render page to reflect updated changes
            fetchCartItems();

            productContext.setCartEmpty(context.userInfo())


        } catch (err) {
            console.log(err);
            if (err.toString().includes(403)) {
                context.logoutRedirect()
            }
        }

    }

    // fetch cart items based on user id
    let fetchCartItems = async () => {
        // if user not logged in, redirected to login page
        if (!context.userInfo()) {
            window.location.assign(config.REACT_URL + '/login?session=expire&callback_url=' + window.location.href)
        }
        try {
            let response = await axios.get(config.API_URL + '/cart/' + context.userInfo().id, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            })

            setCartItems(response.data)
        } catch (err) {
            console.log(err);
            if (err.toString().includes(403)) {
                context.logoutRedirect()
            }
        }

    }

    // increase cart item by one
    let addOneToCart = async (gameId, userId, unit_price) => {
        // if user not logged in, redirected to login page

        try {
            await axios.post(config.API_URL + "/cart/" + gameId + "/add", {
                "user_id": userId,
                'unit_price': unit_price
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            // re-render page to reflect updated changes
            fetchCartItems();

        } catch (err) {
            console.log(err);
            if (err.toString().includes(403)) {
                context.logoutRedirect()
            }
        }

    }

    // decrease cart item by one
    let subtractOneFromCart = async (gameId, userId) => {

        try {

            // get current cart item quantity for particular game
            let currentCartItem = await axios.post(config.API_URL + "/cart/" + gameId, {
                'user_id': userId
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            
            if (currentCartItem.data.quantity <= 1) {
                // if quantity <1, don't proceed to axios call (provide error message)
                return
            }
            
            await axios.post(config.API_URL + "/cart/" + gameId + "/subtract", {
                "user_id": userId
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            // re-render page to reflect updated changes
            fetchCartItems();

        } catch (err) {
            console.log(err);
            if (err.toString().includes(403)) {
                context.logoutRedirect()
            }
        }
    }

    // calculate grandtotal from subtotals
    let grandTotal = 0
    let calculateGrandTotal = (subtotal) => {
        grandTotal += subtotal
    }








    let renderCartItems = () => {
        let cartItemsjsx = cartItems.map((item) => {

            return (
                <React.Fragment>
                    <div id="cartItemContainer">
                        <div id="cartItemImageContainer">
                            <div id="cartItemImage" style={{ backgroundImage: `url(${item.gameListing.image})` }}></div>
                        </div>
                        <div id="cartItemInfo">
                            <h2>{item.gameListing.name}</h2>
                            <h3 id="cartItemPrice">${item.unit_price / 100}.00</h3>

                            <span id="cartItemQuantity">Quantity:</span>
                            <button className="addSubtractBtn" onClick={() => {
                                subtractOneFromCart(item.gameListing.id, context.userInfo().id);
                            }}>-</button>{item.quantity}<button className="addSubtractBtn" onClick={() => {
                                addOneToCart(item.gameListing.id, context.userInfo().id, item.gameListing.price);
                            }}>+</button>


                            <button id="removeBtn" onClick={() => {
                                removeCartItem(item.gameListing.id)
                            }}>x
                            </button>

                            <h4 id="cartSubtotal">Subtotal: ${item.unit_price / 100 * item.quantity}.00</h4>
                            {calculateGrandTotal(item.unit_price / 100 * item.quantity)}
                        </div>

                    </div>

                </React.Fragment>

            )


        })
        return cartItemsjsx
    }


    return (
        <React.Fragment>

            {/* can only see the page if they have the access token (logged in)*/}
            {localStorage.getItem('accessToken') ?
                <React.Fragment>
                    {window.location.href.includes('stock=insufficient') ? <div className="alert alert-danger" role="alert">
                        Insufficient stock. Please try again.
                    </div> : null}

                    <div id="cartPage">

                        <h1>Your Cart</h1>

                        {renderCartItems()}

                        {!cartItems.length ? <div className="whiteFont">Cart is empty</div> : <div id="checkoutContainer">
                            <h3 id="grandTotal">Grand Total: ${grandTotal}.00</h3>
                            <button id="checkoutBtn" className="btn my-4" onClick={async () => {

                                await window.location.assign(config.API_URL + '/checkout?token=' + localStorage.getItem('accessToken'), {
                                    headers: {
                                        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                                    }

                                })

                            }}>Proceed to Check out</button>
                        </div>}





                    </div></React.Fragment> : <div className="whiteFont">Please sign in to view this page.</div>}




        </React.Fragment>
    )
}