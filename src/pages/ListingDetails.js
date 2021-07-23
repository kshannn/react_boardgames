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
        console.log(localStorage.getItem('decodedAccessToken'))
        await axios.post(config.API_URL + '/cart/' + gameId + '/add', {
            'user_id': context.userInfo().id,
            'unit_price': unit_price
        })        
    }

    return (
        <React.Fragment>
            <h1>Listing Details</h1>
            <p>{activeListing.name}</p>
            <p>{activeListing.price}</p>
            <p>{activeListing.description}</p>
            <p>stock: {activeListing.stock}</p>
            <button onClick={() => {
                addToCart(activeListing.id, activeListing.price)
                // console.log(listing.id,listing.price)
            }}>Add to Cart</button>
        </React.Fragment>
    )
}