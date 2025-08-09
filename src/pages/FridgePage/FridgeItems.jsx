import React from 'react';
import FoodCard from '../FoodCard/FoodCard';
import Loading from '../../components/Loading';


const FridgeItems = ({ loading, foods }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loading />
      </div>
    );
  }

  if (!foods.length) {
    return (
      <p className="text-center text-red-500 font-semibold py-12">
        No food items match your search or filter.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {foods.map(food => (
        <FoodCard key={food._id} food={food} />
      ))}
    </div>
  );
};

export default FridgeItems;
