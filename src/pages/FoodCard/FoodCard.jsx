import React from 'react';
import { Link } from 'react-router';
import { motion } from "motion/react";

const FoodCard = ({ food, label }) => {
    const today = new Date();
    const expiry = new Date(food.expiryDate);

    const isExpired = expiry < today;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="bg-gradient-to-t from-orange-300 to-orange-500 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden max-w-3xl flex gap-5 p-4"
    >
      <div className="relative w-6/12">
       {(label || isExpired) && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
            {label || 'Expired'}
          </span>
        )}
        <img
          src={food.foodImage}
          alt={food.foodTitle}
          className="h-56 object-cover rounded-xl w-full"
        />
      </div>

      <div className="flex flex-col justify-between w-6/12">
        <div>
          <h3 className="text-2xl text-orange-200 font-bold">{food.foodTitle}</h3>
          <p className="text-lg text-orange-700 font-medium mt-2">Category: {food.category}</p>
          <p className="text-lg text-orange-200 font-medium mt-2">Quantity: {food.quantity}</p>
          <p className="text-red-700 font-medium mt-2">
            Expires on: {new Date(food.expiryDate).toDateString()}
          </p>
        </div>
        <Link to={`/food/${food._id}`}>
          <button className="text-orange-500 font-medium mt-4 btn rounded-full">
            See Details
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default FoodCard;
