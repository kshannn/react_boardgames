import React, { useState, useContext, useEffect } from 'react';
import config from '../config'
import axios from 'axios'
import UserContext from './UserContext'

export default function OrderHistory() {

    const [orderState, setOrderState] = useState([])
    let context = useContext(UserContext)

    useEffect(() => {
        fetchOrderDetails();
    }, [])

    let fetchOrderDetails = async () => {
        if(!context.userInfo()){
            window.location.assign('https://3000-green-prawn-u4ktudfo.ws-us13.gitpod.io/login' + '?' + 'session=expire&' + 'callback_url=' + window.location.href)
        }
        try {
            let response = await axios.get(config.API_URL + "/orders/" + context.userInfo().id + "/history",{
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            setOrderState(response.data)
        } catch (err){
            console.log(err);
            if(err.toString().includes(403)){
               context.logoutRedirect()
            }
        }
    }

   

    let renderOrders = () => {
        let orderjsx = orderState.map((order) => {

            return (
                <React.Fragment>
                   <tr>
                         <td>{order.id}</td>
                         <td>{order.order_date}</td>
                         <td>{order.total_cost}</td>
                         <td>{order.status.name}</td>
                    </tr>   
                </React.Fragment>
            )
        })
        return orderjsx
    }

    return (
        <React.Fragment>
           
            {/* can only see the page if they have the access token (logged in)*/}
            {localStorage.getItem('accessToken')?<div>
            <h1>Your Order History</h1>
           
           <table className="table">
               <thead>
                   <tr>
                       <th scope="col">Order Id</th>
                       <th scope="col">Order Date</th>
                       <th scope="col">Total Cost</th>
                       <th scope="col">Status</th>
                   
                   </tr>
               </thead>
               <tbody>
                   {renderOrders()} 
               </tbody>
           </table>
                
    
            </div>: <div>Please sign in to view this page.</div> }

        </React.Fragment>
    )
}