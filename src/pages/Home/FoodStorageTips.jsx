import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Loading from '../../components/Loading';

const FoodStorageTips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('https://b11a11-server-side-itachi-uchiha-32.vercel.app/tips')
      .then(res => {
        setTips(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load tips.');
        setLoading(false);
      });
  }, []);

  if(loading){
        return(
            <div className="flex justify-center items-center py-20"> 
                <Loading/>
            </div>
        )
    }

  if (error) {
    return <div className="text-center py-10 text-red-500 font-semibold">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-orange-400">Food Storage Tips</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tips.map((tip, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <img src={tip.icon} alt={tip.title} className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-center mb-2 text-orange-400">{tip.title}</h3>
            <p className="text-orange-600 text-sm text-center">{tip.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FoodStorageTips;
