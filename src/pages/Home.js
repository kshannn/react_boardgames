import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import config from '../config'
import MultiSelect from "react-multi-select-component";




export default function Home() {

    const history = useHistory()
    
    const [ listingState, setListingState ] = useState([])
    const [ searchForm, setSearchForm ] = useState({
        'searchName': "",
        'searchMinPrice': "",
        'searchMaxPrice': ""
    })
    const [ selected, setSelected ] = useState([]);

    
    // === All listings ===
    // 1. call function to fetch listings after component mount
    // note: if second arg of useEffect is [], behaves like componentDidMount
    useEffect(() => {
        fetchListings()
      }, [])


    // 2. fetch all game listings using api
    let fetchListings = async () => {
        let response = await axios.get(config.API_URL + '/listings')
        setListingState(response.data)
    }

    // render all the game listings
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

    // === Search Engine ===
    // 1. update state based on user's search input
    let updateSearchForm = (e) => {
        setSearchForm({
            ...searchForm,
            [e.target.name]:e.target.value
        })
    }

    // 2. clicking search button filters results
    let search = async () => {

        //extract selected categories and store them in an array of integers
        let selectedCategories = selected.map((selectedCategory)=>{
            return selectedCategory.value
        })

        let searchObject = {
            "searchName": searchForm.searchName,
            "searchMinPrice": searchForm.searchMinPrice,
            "searchMaxPrice": searchForm.searchMaxPrice,
            "searchCategories": selectedCategories
        }

        let response = await axios.post(config.API_URL + '/listings', searchObject)
        setListingState(response.data)
    }



    // multiselect (categories)
    const options = [
        { label: "Abstract", value: "1" },
        { label: "Card", value: "2" },
        { label: "Co-op", value: "3" },
        { label: "Dexterity", value: "4" },
        { label: "Party", value: "5" },
        { label: "Trivia", value: "6" },
        { label: "Others", value: "7" }
      ];

    
    return (
        <React.Fragment>
            <div className="container">
                <h1>Homepage</h1>

                {/* ############### Search Forms ############### */}
                <div>
                    <label className="form-label">Name</label>
                    <input type="text" name="searchName" className="form-control" value={searchForm.searchName} onChange={updateSearchForm}/>

                   

                    <label className="form-label">Price Range</label>
                    <input type="text" name="searchMinPrice" placeholder="$MIN" className="form-control" value={searchForm.searchMinPrice} onChange={updateSearchForm}/>
                    <input type="text" name="searchMaxPrice" placeholder="$MAX" className="form-control" value={searchForm.searchMaxPrice} onChange={updateSearchForm}/>

                    
                    <label className="form-label">Categories</label>
                    <MultiSelect
                        options={options}
                        value={selected}
                        onChange={setSelected}
                        labelledBy="Select"
                    />
                    <button className="btn btn-primary my-3" onClick={search}>Search</button>
                </div>

                 {/* ############### Game Listings ############### */}
                {renderListings()}
            </div>
          
        </React.Fragment>
    )
}