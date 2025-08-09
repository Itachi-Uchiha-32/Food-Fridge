import React from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';

const useFoods = () => {
    const axiosSecure = useAxiosSecure();

    const myItemsPromise = email =>{
        return axiosSecure.get(`foods?email=${email}`).then(res => res.data);
    }
    const getAllFoods = () => {
        return axiosSecure.get(`foods`).then(res => res.data);
    };
     const addFood = async (foodData) => {
        const res = await axiosSecure.post("foods", foodData);
        return res.data;
    };
     const updateFood = async (id, updatedData) => {
        const res = await axiosSecure.patch(`foods/${id}`, updatedData);
        return res.data;
    };

    const deleteFood = async (id) => {
        const res = await axiosSecure.delete(`foods/${id}`);
        return res.data;
    };

    return {
        myItemsPromise,
        getAllFoods,
        addFood,
        updateFood,
        deleteFood
    };
};

export default useFoods;