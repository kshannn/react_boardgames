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
            <nav id="breadCrumb" aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">{activeListing.name}</li>
                </ol>
            </nav>
            <div id="detailsPageContainer">
                <section id="listingImageSection">
                    <div id="individualListingImage" style={{ backgroundImage: `url(${activeListing.image})` }} >
                    </div>
                </section>
                <section id="listingDetailsSection">
                    <div id="listingDetails">
                        <h2>{activeListing.name}</h2>
                        <h3>SGD {activeListing.price/100}</h3>
                        <p>{activeListing.description}</p>
                        <p>No. of players:{activeListing.min_player_count} - {activeListing.max_player_count}</p>
                        <p>Recommended age: {activeListing.min_age} +</p>
                        <p>Min. duration: {activeListing.duration} mins</p>
                        <p>Publisher: {activeListing.publisher}</p>
                        <p>Designer: {activeListing.designer}</p>
                        <p>Published date: {activeListing.published_date}</p>
                        {activeListing.stock >= 0? <p id="available">Stocks available!</p>: <p id="unavailable">Out of stock</p>}
                    
                        <button onClick={() => {
                            addToCart(activeListing.id, activeListing.price)
                        }}>Add to Cart</button>
                    </div>
                </section>
            </div>
        </React.Fragment>
    )
}