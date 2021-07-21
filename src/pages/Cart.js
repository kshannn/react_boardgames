import axios from 'axios'
import React, { useState, useEffect } from 'react'
import config from '../config'

//tmp
// import { useLocation } from 'react-router-dom'

export default function Cart() {
    
   const [ cartItems, setCartItems ] = useState([])

   useEffect(() => {
    fetchCartItems()
  }, [])

    let fetchCartItems = async () => {
        let response = await axios.get(config.API_URL + '/cart/' + 4)        
        setCartItems(response.data)
        console.log(response.data)
    }

    let renderCartItems = () => {
        let cartItemsjsx = cartItems.map((item)=> {
            return <p>{item.quantity}</p>
        })
        return cartItemsjsx
    }

    return (
        
        <React.Fragment>
            <h1>User's Cart</h1> 
            {renderCartItems()}
        </React.Fragment>
    )
}