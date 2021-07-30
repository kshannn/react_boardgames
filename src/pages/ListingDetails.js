import React, { useEffect, useState, useContext } from 'react'
import config from '../config'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import UserContext from './UserContext'

export default function ListingDetails() {

    let context = useContext(UserContext)
    const [ activeListing, setActiveListing ] = useState({})

    let { listingId } = useParams();


    useEffect(()=>{
        fetchListing()
    },[])

    let fetchListing = async () => {
        let response = await axios.get(config.API_URL + '/listings/' + listingId)
        setActiveListing(response.data)
    }

    // add item to cart on click
    let addToCart = async (gameId,unit_price) => {
        if(!context.userInfo()){
            window.location.assign('https://3000-green-prawn-u4ktudfo.ws-us13.gitpod.io/login' + '?' + 'session=expire&' + 'callback_url=' + window.location.href)
        }
        
        try {

            await axios.post(config.API_URL + '/cart/' + gameId + '/add', {
                'user_id': context.userInfo().id,
                'unit_price': unit_price
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            })       
        
         
        } catch (err){
            console.log(err);
            if(err.toString().includes(403)){
               context.logoutRedirect()
            }
        }




        // await axios.post(config.API_URL + '/cart/' + gameId + '/add', {
        //     'user_id': context.userInfo().id,
        //     'unit_price': unit_price
        // })        
    }

    return (
        <React.Fragment>
            <h1>Listing Details</h1>
            <div id="individualListingImage" style={{ backgroundImage: `url(${activeListing.image})` }} >
            </div>
            <p>Name: {activeListing.name}</p>
            <p>Price: {activeListing.price}</p>
            <p>Description {activeListing.description}</p>
            {activeListing.stock >= 0? <p id="available">Stocks available!</p>: <p id="unavailable">Out of stock</p>}
        
            <button onClick={() => {
                addToCart(activeListing.id, activeListing.price)
            }}>Add to Cart</button>
        </React.Fragment>
    )
}