import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import config from '../config'
import UserContext from './UserContext'


export default function Cart() {

    let context = useContext(UserContext);

    const [cartItems, setCartItems] = useState([])
    const [ deleteState, setDeleteState ] = useState(false)

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
                            <h3 id="cartItemPrice">SGD{item.unit_price/100}.00</h3> 

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

                            <h4 id="cartSubtotal">Subtotal: SGD{item.unit_price/100 * item.quantity}.00</h4>
                            {calculateGrandTotal(item.unit_price/100 * item.quantity)}
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
                {localStorage.getItem('accessToken')?
                <React.Fragment>
                
                <div id="cartPage">
                <h1>Your Cart</h1>
                
                    {renderCartItems()}

                    {!cartItems.length? <div>Cart is empty</div>: <div id="checkoutContainer">
                        <h3 id="grandTotal">Grand Total: ${grandTotal}.00</h3>
                        <button id="checkoutBtn" className="btn my-4" onClick={async ()=>{
                        
                            await window.location.assign(config.API_URL + '/checkout' + '?token=' + localStorage.getItem('accessToken'), {
                                headers: {
                                    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                                }
                            
                            })

                        }}>Proceed to Check out</button>
                    </div>}

                   
                    
                   
        
                </div></React.Fragment>: <div>Please sign in to view this page.</div> }

        
           
         
        </React.Fragment>
    )
}