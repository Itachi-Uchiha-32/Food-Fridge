import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

import { AuthContext } from '../../context/AuthContext/AuthContext';
import CountDownTimer from './CountDownTimer';
import CountUpTimer from './CountUpTimer';
import AddNoteForm from './AddNoteForm';
import NoteCard from './NoteCard';
import Loading from '../../components/Loading';
import useTitle from '../../hooks/useTitle';

const FoodDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useTitle(food?.foodTitle || 'Food Details');

  useEffect(() => {
    const fetchFoodAndNotes = async () => {
      try {
        const [foodRes, notesRes] = await Promise.all([
          axios.get(`https://b11a11-server-side-itachi-uchiha-32.vercel.app/foods/${id}`),
          axios.get(`https://b11a11-server-side-itachi-uchiha-32.vercel.app/notes/${id}`)
        ]);
        setFood(foodRes.data);
        setNotes(notesRes.data);
      } catch (error) {
        console.error("Error loading food details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodAndNotes();
  }, [id]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  if (!food) {
    return (
      <div className="text-center text-red-500 font-semibold mt-12">
        Food not found or failed to load.
      </div>
    );
  }

   
  const isExpired = new Date(food.expiryDate) < new Date();
 
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 my-15">

      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* Image */}
        <div className="md:w-1/2 w-full">
          <img
            src={food.foodImage}
            alt={food.foodTitle}
            className="rounded-xl shadow-lg object-cover w-full h-64"
          />
        </div>

        {/* Details */}
        <div className="md:w-1/2 w-full space-y-3 text-gray-700">
          <h2 className="text-3xl font-bold text-orange-500">{food.foodTitle}</h2>
          <p><span className="font-semibold text-orange-400">Category:</span> {food.category}</p>
          <p><span className="font-semibold text-orange-400">Quantity:</span> {food.quantity}</p>
          <p><span className="font-semibold text-orange-400">Description:</span> {food.description}</p>
          <p><span className="font-semibold text-orange-400">Expiry Date:</span> {new Date(food.expiryDate).toDateString()}</p>

          <div className="mt-4 p-4 bg-orange-50 rounded-lg shadow-xl w-fit">
            {isExpired ? (
              <CountUpTimer expiryDate={food.expiryDate} />
            ) : (
              <CountDownTimer expiryDate={food.expiryDate} />
            )}
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-orange-400 mb-4">Notes</h3>

        {user?.email === food.userEmail ? (
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <AddNoteForm foodId={id} onNoteAdded={note => setNotes(prev => [...prev, note])} />
          </div>
        ) : (
          <p className="text-sm italic text-red-500 mb-6">Only the user who added this food can add notes.</p>
        )}

        {notes.length === 0 ? (
          <p className="text-gray-500">No notes added yet.</p>
        ) : (
          <div className="space-y-4">
            {notes.map(note => (
              <div key={note._id} className="bg-gray-50  p-4 rounded-xl shadow-sm">
                <NoteCard note={note} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDetails;
