import React from 'react';
import Banner from './Banner';
import NearlyExpired from './NearlyExpired';
import ExpiredFood from '../ExpiredFood/ExpiredFood';
import FoodStorageTips from './FoodStorageTips';
import ExpiryLabel from './ExpiryLabel';
import useTitle from '../../hooks/useTitle';

const Home = () => {
    useTitle("Home")
    return (
        <div className='bg-[#fdede9]'>
            <Banner/>
            <div className='w-11/12 mx-auto my-10'>
                <NearlyExpired/>
                <ExpiredFood/>
                <FoodStorageTips/>
                <ExpiryLabel/>
            </div>
            
        </div>
    );
};

export default Home;