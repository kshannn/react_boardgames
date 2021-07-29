import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import config from '../config'
import UserContext from './UserContext'


export default function Cart() {

    let context = useContext(UserContext);

    // check if user is logged in
    // const [isLoggedIn, setIsLoggedIn] = useState(false)

    // if (context.userInfo()) {
    //     setIsLoggedIn(true)
    // }


    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        fetchCartItems()
    }, [])

    // remove cart item
    let removeCartItem = async (gameId) => {
        // console.log(context.userInfo().id)
        await axios.post(config.API_URL + '/cart/' + gameId + '/remove' , {
            'user_id': context.userInfo().id
        })
        // re-render page to reflect updated changes
        fetchCartItems();
    }

    // fetch cart items based on user id
    let fetchCartItems = async () => {
        let response = await axios.get(config.API_URL + '/cart/' + context.userInfo().id)
        setCartItems(response.data)
    }

    // increase cart item by one
    let addOneToCart = async (gameId,userId,unit_price) => {
        await axios.post(config.API_URL + "/cart/" + gameId + "/add", {
            "user_id": userId,
            'unit_price': unit_price
        })
        // re-render page to reflect updated changes
        fetchCartItems();
    }

    // decrease cart item by one
    let subtractOneFromCart = async (gameId,userId) => {
        await axios.post(config.API_URL + "/cart/" + gameId + "/subtract", {
            "user_id": userId
        })
        // re-render page to reflect updated changes
        fetchCartItems();
    }


    let renderCartItems = () => {
        let cartItemsjsx = cartItems.map((item) => {
            return (
                <div>id: {item.gameListing.id} {item.gameListing.name} 

                <button onClick={()=>{
                    subtractOneFromCart(item.gameListing.id, context.userInfo().id);
                }}>-</button>{item.quantity}<button onClick={()=>{
                    addOneToCart(item.gameListing.id, context.userInfo().id,item.gameListing.price);
                }}>+</button>
                
                
                <button onClick={() => {
                    removeCartItem(item.gameListing.id)
                }}>Remove from cart
                </button>
                
                </div>
            )
        })
        return cartItemsjsx
    }

    return (
        <React.Fragment>
    
            <h1>User's Cart</h1>
            {renderCartItems()}
            
            <button onClick={async ()=>{
        
                await window.location.assign(config.API_URL + '/checkout' + '?token=' + localStorage.getItem('accessToken'), {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                    }
                
                })

            }}>Check out</button>
         
        </React.Fragment>
    )
}