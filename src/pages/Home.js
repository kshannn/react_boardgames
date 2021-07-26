import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import config from '../config'
import UserContext from './UserContext'



export default function Home() {

    const history = useHistory()
    
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

    

    let renderListings = () => {
        let listingjsx = listingState.map((listing)=> {
            return (
                <React.Fragment>
                    <div className="eachGame" style={{ backgroundImage: `url(${listing.image})` }} onClick={()=> {
                        history.push('/listing/' + listing.id)
                    }}>
                        <p>id: {listing.id} name: {listing.name}</p>
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