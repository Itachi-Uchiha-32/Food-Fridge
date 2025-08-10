import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FoodCard from '../FoodCard/FoodCard';
import Loading from '../../components/Loading';

const ExpiredFood = () => {
    const [expiredFoods, setExpiredFoods] = useState([]);
     const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true);
        axios.get('https://b11a11-server-side-itachi-uchiha-32.vercel.app/foods/expired')
        .then(res =>{
             setExpiredFoods(res.data)
             setLoading(false)
            })
        .catch(error => {
            console.log(error)
            setLoading(false)
        })
    },[])
    if(loading){
        return(
            <div className="flex justify-center items-center py-20"> 
                <Loading/>
            </div>
        )
    }
    return (
        <div className='my-8'>
            <h2 className='text-3xl font-semibold text-orange-400 mb-8'>Expired Foods</h2>
            <div className='grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-4'>
                {
                    expiredFoods.map(food => <FoodCard key={food._id} food={food} label="Expired"/>)
                }
            </div>
        </div>
    );
};

export default ExpiredFood;