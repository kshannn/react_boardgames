import React, { useEffect, useState, useContext } from 'react'
import config from '../config'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import UserContext from './UserContext'
import Moment from 'moment'

export default function ListingDetails() {

    let context = useContext(UserContext)
    const [ activeListing, setActiveListing ] = useState({})

    let { listingId } = useParams();


    useEffect(()=>{
        fetchListing()
    },[])

    useEffect(()=>{
        console.log('useeffect called')
        renderCategories()
    }, [activeListing])

    let fetchListing = async () => {
        let response = await axios.get(config.API_URL + '/listings/' + listingId)
        // console.log(response.data)
        setActiveListing(response.data)
    }

    // add item to cart on click
    let addToCart = async (gameId,unit_price) => {
        if(!context.userInfo()){
            window.location.assign('https://3000-green-prawn-u4ktudfo.ws-us14.gitpod.io/login' + '?' + 'session=expire&' + 'callback_url=' + window.location.href)
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
    }

    // render each game category
    let renderCategories = () => {
        
        console.log(activeListing)
        if (activeListing !== undefined){
            // let category = activeListing.category.map((category)=>{
            //     return <span class="badge rounded-pill bg-secondary">{category.name}</span>
            // })
        }
       
        
    }

    return (
        <React.Fragment>
            <div id="breadCrumb"> 
                <nav  aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">{activeListing.name}</li>
                    </ol>
                </nav>
            </div>
            <div id="detailsPageContainer">
                <section id="listingImageSection">
                    <div id="individualListingImageContainer">
                        <div id="individualListingImage" style={{ backgroundImage: `url(${activeListing.image})` }} >
                        </div>
                    </div>
                </section>
                <section id="listingDetailsSection">
                    <div id="listingDetails">
                        <h2>{activeListing.name}</h2>
                        <h3>${activeListing.price/100}</h3>
                        <p>{activeListing.description}</p>
                        <p><i class="fas fa-users"></i>No. of players: {activeListing.min_player_count} - {activeListing.max_player_count}</p>
                        <p>Categories:{renderCategories()}</p>
                        <p><i class="fas fa-user"></i>Recommended age: {activeListing.min_age} +</p>
                        <p><i class="fas fa-hourglass"></i>Min. duration: {activeListing.duration} mins</p>
                        <p><i class="fas fa-newspaper"></i>Publisher: {activeListing.publisher}</p>
                        <p><i class="fas fa-paint-brush"></i>Designer: {activeListing.designer}</p>
                        <p><i class="fas fa-calendar-alt"></i>Published date: {Moment(activeListing.published_date).format('LL')}</p>
                        {activeListing.stock >= 0? <p id="available">Stocks available!</p>: <p id="unavailable">Out of stock</p>}
                    
                        <button id="addToCartBtn" className="btn" onClick={() => {
                            addToCart(activeListing.id, activeListing.price)
                        }}>Add to Cart</button>
                    </div>
                </section>
            </div>
        </React.Fragment>
    )
}