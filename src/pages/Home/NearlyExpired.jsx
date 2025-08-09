import React, { useEffect, useState } from 'react';
import FoodCard from '../FoodCard/FoodCard';
import Loading from '../../components/Loading';

const NearlyExpired = () => {

    const [foods, setFood] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() =>{
        setLoading(true)
        fetch('http://localhost:3000/foods/nearly-expired')
        .then(res => res.json())
        .then(data => {
            setFood(data)
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
        <div>
            <h2 className='text-3xl font-semibold text-orange-400'>Products that are about to be expired</h2>
            <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
                {
                    foods.map(food => <FoodCard key={food._id} food={food}/>)
                }
            </div>
        </div>
    );
};

export default NearlyExpired;