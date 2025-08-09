import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Loading from '../../components/Loading';

const ExpiryLabel = () => {
  const [labels, setLabels] = useState([]);
   const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:3000/expiryLabel')
      .then(res => {
        setLabels(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching expiry labels:', err)
        setLoading(false)
      });
  }, []);
  if(loading){
        return(
            <div className="flex justify-center items-center py-20"> 
                <Loading/>
            </div>
        )
    }
  return (
    <div className="my-16 px-4">
      <h2 className="text-3xl font-bold text-center text-orange-500 mb-10">
        Understanding Expiry Labels
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {labels.map((label, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="bg-white shadow-md rounded-xl p-6 border border-orange-200"
          >
            <h3 className="text-xl font-semibold text-orange-600 mb-2">{label.label}</h3>
            <p className="text-gray-700 mb-2">{label.meaning}</p>
            <p className="text-sm text-orange-500 italic">Example: {label.example}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExpiryLabel;
