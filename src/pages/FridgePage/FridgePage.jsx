import React, { useEffect, useState, useContext } from 'react';
import CountUp from 'react-countup';
import FoodCard from '../FoodCard/FoodCard';
import Loading from '../../components/Loading';
import FridgeItems from './FridgeItems';
import useTitle from '../../hooks/useTitle';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import useFoods from '../../api/useFoods';

const FridgePage = () => {
  
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [filtering, setFiltering] = useState(false);
  const { getAllFoods } = useFoods();

  useTitle("Fridge");

  useEffect(() => {
    setLoading(true);
    getAllFoods()
      .then(data => {
        setFoods(data);
        setFilteredFoods(data);
      })
      .catch(err => {
        console.error("Failed to fetch foods:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setFiltering(true);
    const timeout = setTimeout(() => {
      let filtered = [...foods];

      if (search) {
        filtered = filtered.filter(food =>
          food.foodTitle.toLowerCase().includes(search.toLowerCase()) ||
          food.category.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (category) {
        filtered = filtered.filter(food =>
          food.category.toLowerCase() === category.toLowerCase()
        );
      }

      setFilteredFoods(filtered);
      setFiltering(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, category, foods]);

  const today = new Date();
  const expiredCount = foods.filter(food => new Date(food.expiryDate) < today).length;
  const nearlyExpiredCount = foods.filter(food => {
    const expiry = new Date(food.expiryDate);
    const diff = (expiry - today) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 5;
  }).length;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 mt-18">
      <h2 className="text-3xl font-semibold my-6 text-center text-orange-400">Your Fridge</h2>

      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center items-center">
        <label className="input w-3/4">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="text"
            placeholder="Search by title or category"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full md:w-full border-none"
          />
        </label>

        <select
          className="select select-bordered w-3/4 md:w-1/6"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Dairy">Dairy</option>
          <option value="Meat">Meat</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Beverage">Beverage</option>
          <option value="Frozen Food">Frozen Food</option>
          <option value="Snacks">Snacks</option>
        </select>
      </div>

      {/* CountUp Display */}
      <div className="flex flex-wrap justify-center gap-6 mb-8 text-xl font-semibold ">
        <div className="md:w-1/4 px-12 py-10 rounded-2xl text-center shadow-xl bg-red-100 text-red-600">
          <h2 className='text-lg'>Expired Items: <CountUp end={expiredCount} duration={1} /></h2>
        </div>
        <div className="md:w-1/4 px-12 py-10 rounded-2xl text-center shadow-xl bg-yellow-100 text-yellow-600">
          <h2 className='text-lg'>Nearly Expired (≤5 days): <CountUp end={nearlyExpiredCount} duration={1} /></h2>
        </div>
      </div>

      {/* Food Cards */}
      <div>
        <FridgeItems
          loading={filtering}
          foods={filteredFoods}
        />
      </div>
    </div>
  );
};

export default FridgePage;
