import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import config from '../config'
import UserContext from './UserContext'


export default function Cart() {

    let context = useContext(UserContext);

    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        fetchCartItems()
    }, [])

    // remove cart item
    let removeCartItem = async (gameId) => {
        
        try {
            await axios.post(config.API_URL + '/cart/' + gameId + '/remove' , {
                'user_id': context.userInfo().id
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            // re-render page to reflect updated changes
            fetchCartItems();
        } catch (err){
            console.log(err);
            if(err.toString().includes(403)){
               context.logoutRedirect()
            }
        }

    }

    // fetch cart items based on user id
    let fetchCartItems = async () => {
        // if user not logged in, redirected to login page
        if(!context.userInfo()){
            window.location.assign('https://3000-green-prawn-u4ktudfo.ws-us13.gitpod.io/login' + '?' + 'session=expire&' + 'callback_url=' + window.location.href)
        }
        try {
            let response = await axios.get(config.API_URL + '/cart/' + context.userInfo().id, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
        
            setCartItems(response.data)
        } catch (err){
            console.log(err);
            if(err.toString().includes(403)){
               context.logoutRedirect()
            }
        }



        
    }

    // increase cart item by one
    let addOneToCart = async (gameId,userId,unit_price) => {
       // if user not logged in, redirected to login page
    
        try {
            await axios.post(config.API_URL + "/cart/" + gameId + "/add", {
                "user_id": userId,
                'unit_price': unit_price
            },{
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            // re-render page to reflect updated changes
            fetchCartItems();
        
        } catch (err){
            console.log(err);
            if(err.toString().includes(403)){
               context.logoutRedirect()
            }
        }




    }

    // decrease cart item by one
    let subtractOneFromCart = async (gameId,userId) => {

        try {
            await axios.post(config.API_URL + "/cart/" + gameId + "/subtract", {
                "user_id": userId
            },{
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            // re-render page to reflect updated changes
            fetchCartItems();
        
        } catch (err){
            console.log(err);
            if(err.toString().includes(403)){
               context.logoutRedirect()
            }
        }





    }


    let renderCartItems = () => {
        let cartItemsjsx = cartItems.map((item) => {
            return (
                <div id="cartItemContainer">
                    <div id="cartItemImage" style={{ backgroundImage: `url(${item.gameListing.image})` }}></div>
                    <div id="cartItemInfo">
                        <h2>{item.gameListing.name}</h2>
                        <h3 id="cartItemPrice">SGD{item.unit_price/100}</h3> 

                        Quantity:
                        <button className="addSubtractBtn" onClick={()=>{
                            subtractOneFromCart(item.gameListing.id, context.userInfo().id);
                        }}>-</button>{item.quantity}<button className="addSubtractBtn" onClick={()=>{
                            addOneToCart(item.gameListing.id, context.userInfo().id,item.gameListing.price);
                        }}>+</button>


                        <button id="removeBtn" onClick={() => {
                            removeCartItem(item.gameListing.id)
                        }}>x
                        </button>
                        </div>
                    
                </div>
            )
        })
        return cartItemsjsx
    }

    return (
        <React.Fragment>
            <h1>Your Cart</h1>
            

            
                {/* can only see the page if they have the access token (logged in)*/}
                {localStorage.getItem('accessToken')?
                <div id="cartPage">
                
                    {renderCartItems()}
                    
                    <button onClick={async ()=>{
                        
                        await window.location.assign(config.API_URL + '/checkout' + '?token=' + localStorage.getItem('accessToken'), {
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                            }
                        
                        })

                    }}>Check out</button>
        
                </div>: <div>Please sign in to view this page.</div> }

        
           
         
        </React.Fragment>
    )
}