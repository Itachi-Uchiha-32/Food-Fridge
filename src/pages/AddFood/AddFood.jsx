import React, { useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import useTitle from '../../hooks/useTitle';
import useFoods from '../../api/useFoods';

const AddFood = () => {
  const { user } = useContext(AuthContext);

  useTitle("Add Food")

  const {addFood} = useFoods();

  const handleAddFood = async (e) => {
    e.preventDefault();
    const form = e.target;

    const foodData = {
      foodTitle: form.foodTitle.value,
      expiryDate: new Date(form.expiryDate.value),
      addedDate: new Date(),
      description: form.description.value,
      category: form.category.value,
      quantity: parseInt(form.quantity.value),
      foodImage: form.foodImage.value,
      userEmail: user?.email || 'Anonymous',
    };

    try {
      const res = await await addFood(foodData);
      if (res.insertedId || res.acknowledged) {
        Swal.fire('Success!', 'Food added successfully!', 'success');
        form.reset();
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Oops!', 'Failed to add food. Try again.', 'error');
    }
  };

  const todayDate = new Date().toISOString().split('T')[0];

  return (
    <div className='p-24'>
      <div className='p-12 text-center space-y-4'>
        <h2 className='text-3xl font-semibold text-orange-400'>Add a Food</h2>
      </div>

      <form onSubmit={handleAddFood}>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8'>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
            <label className="label font-normal">Food Title</label>
            <input name='foodTitle' type="text" className="input w-full font-normal" required />
          </fieldset>

          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
            <label className="label font-normal">Expiry Date</label>
            <input type="date" name='expiryDate' className="input w-full" required />
          </fieldset>

          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 lg:col-span-2">
            <label className="label font-normal">Description</label>
            <textarea name='description' className="textarea w-full font-normal" required />
          </fieldset>

          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
            <label className="label font-normal">Category</label>
            <select name="category" className="select w-full font-normal" required>
              <option value="">Select category</option>
              <option>Dairy</option>
              <option>Vegetables</option>
              <option>Meat</option>
              <option>Beverage</option>
              <option>Frozen Food</option>
              <option>Snacks</option>
            </select>
          </fieldset>

          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
            <label className="label font-normal">Quantity</label>
            <input
              name='quantity'
              type="number"
              className="input validator w-full"
              min="1"
              max="20"
              required
              placeholder="Type a number between 1 to 20"
            />
            <p className="validator-hint">Must be between 1 to 20</p>
          </fieldset>

          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
            <label className="label font-normal">Image URL</label>
            <input name='foodImage' type="text" className="input w-full font-normal" required />
          </fieldset>
        </div>

        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border my-6 p-4">
          <label className="label font-normal">User Email</label>
                <input name='userEmail' type="text" className="input w-full font-normal" value={user?.email} readOnly />
          <label className="label font-normal">Added Date</label>
          <input type="date" className="input w-full font-normal" value={todayDate} readOnly />
        </fieldset>

        <input className='btn w-full' type="submit" value="Add Food" />
      </form>
    </div>
  );
};

export default AddFood;
