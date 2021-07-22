import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import config from '../config'
import UserContext from './UserContext'


export default function Home() {
    
    const [ listingState, setListingState ] = useState([])

    let context = useContext(UserContext)
    
    // note: if second arg of useEffect is [], behaves like componentDidMount
    useEffect(() => {
        fetchListings()
      }, [])

    // fetch all game listings
    let fetchListings = async () => {
        let response = await axios.get(config.API_URL + '/listings')
        setListingState(response.data)
    }

    // add item to cart on click
    let addToCart = async (gameId,unit_price) => {
        console.log(1)
        console.log(localStorage.getItem('decodedAccessToken'))
        await axios.post(config.API_URL + '/cart/' + gameId + '/add', {
            'user_id': context.userInfo().id,
            'total_cost': unit_price
        })        

    }

    let renderListings = () => {
        let listingjsx = listingState.map((listing)=> {
            return (
                <React.Fragment>
                    <div className="eachGame" onClick={()=> {
                        console.log(listing.id)
                    }}>
                        <p>id: {listing.id} name: {listing.name}</p>
                        <button onClick={() => {
                            addToCart(listing.id, listing.price)
                            console.log(listing.id,listing.price)
                        }}>Add to Cart</button>
                    </div>
                </React.Fragment>
            )
        })
        return listingjsx
    }

    return (
        <React.Fragment>
            <h1>Homepage</h1>
            {renderListings()}
        </React.Fragment>
    )
}