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
                    <div id="listingGrid" className="col-lg-3 col-md-4 col-sm-6 col-xs-12" onClick={()=> {
                            history.push('/listing/' + listing.id)
                        }}>

                        <div id="listingContainer">
                            <div className="listingImage" style={{ backgroundImage: `url(${listing.image})` }} >
                            </div>
                            
                            <h3 id="listingName">{listing.name}</h3>
                            <h4 id="listingPrice">SGD {listing.price/100}</h4>
                        </div>

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
            <div className="container-fluid" id="mainSection">
                {/* ############### Search Forms ############### */}
                <section id="searchSection">
                    {/* name */}
                    <label className="form-label">Name</label>
                    <input type="text" name="searchName" className="form-control" value={searchForm.searchName} onChange={updateSearchForm}/>

                    {/* price range */}
                    <label className="form-label">Price Range</label>
                    <div id="priceRange">
                        <input type="text" name="searchMinPrice" placeholder="$MIN" className="form-control" value={searchForm.searchMinPrice} onChange={updateSearchForm}/>
                        <span>_</span>
                        <input type="text" name="searchMaxPrice" placeholder="$MAX" className="form-control" value={searchForm.searchMaxPrice} onChange={updateSearchForm}/>
                        </div>
                    {/* categories */}
                    <label className="form-label">Categories</label>
                    <MultiSelect
                        options={options}
                        value={selected}
                        onChange={setSelected}
                        labelledBy="Select"
                    />
                    <button className="btn btn-primary my-3" onClick={search}>Search</button>
                </section>

                 {/* ############### Game Listings ############### */}
                 <section id="displaySection">
                     <div className="row">
                        {renderListings()}
                    </div>
                 </section>
                
            </div>
          
        </React.Fragment>
    )
}