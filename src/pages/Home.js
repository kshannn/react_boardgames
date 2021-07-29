import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import config from '../config'




export default function Home() {

    const history = useHistory()
    
    const [ listingState, setListingState ] = useState([])
    const [ searchForm, setSearchForm ] = useState({
        'searchName': "",
        'searchMinPrice': "",
        'searchMaxPrice': ""
    })
    const[ searchedListing, setSearchedListing ] = useState()

    
    
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

    let updateSearchForm = (e) => {
        setSearchForm({
            ...searchForm,
            [e.target.name]:e.target.value
        })
    }

    let search = async () => {
        let searchObject = {
            "searchName": searchForm.searchName,
            "searchMinPrice": searchForm.searchMinPrice,
            "searchMaxPrice": searchForm.searchMaxPrice
        }

        let response = await axios.post(config.API_URL + '/listings', searchObject)
        setSearchedListing(response.data)
    }

    let renderSearchedListing = () => {
        let listingjsx = searchedListing.map((listing)=> {
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

            <div className="container">
                <label className="form-label">Name</label>
                <input type="text" name="searchName" className="form-control" value={searchForm.searchName} onChange={updateSearchForm}/>
                <label className="form-label">Min. Price</label>
                <input type="text" name="searchMinPrice" className="form-control" value={searchForm.searchMinPrice} onChange={updateSearchForm}/>
                <label className="form-label">Max. Price</label>
                <input type="text" name="searchMaxPrice" className="form-control" value={searchForm.searchMaxPrice} onChange={updateSearchForm}/>

                <button className="btn btn-primary my-3" onClick={search}>Search</button>
            </div>


            {searchedListing ? renderSearchedListing():renderListings()}
            {/* {renderListings()}  */}
            {/* {renderSearchedListing()}  */}
        </React.Fragment>
    )
}