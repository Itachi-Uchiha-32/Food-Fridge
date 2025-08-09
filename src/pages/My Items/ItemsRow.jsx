import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useFoods from '../../api/useFoods';

const ItemsRow = ({ item, index, onItemUpdated }) => {
  const { _id, foodTitle, category, quantity, expiryDate, foodImage, description } = item;
  const { updateFood, deleteFood } = useFoods();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    foodTitle,
    category,
    description,
    quantity,
    expiryDate: new Date(expiryDate).toISOString().split('T')[0]
  });

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await updateFood(_id, updatedData);
      console.log(data);
      if (data.success) {
        setShowUpdateModal(false);
        onItemUpdated?.();
        Swal.fire('Success!', 'Food Updated Successfully', 'success');
      } else {
        Swal.fire('No Changes', 'No update was made.', 'info');
      }
    } catch (error) {
      console.error('Update failed:', error);
      Swal.fire('Error', 'Update operation failed.', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      const data = await deleteFood(_id);

      if (data.deletedCount > 0) {
        document.getElementById(`delete-${_id}`).close();
        Swal.fire('Success!', 'Food Deleted Successfully', 'success');
        onItemUpdated?.();
      } else {
        Swal.fire('Oops!', 'Food not found or already deleted.', 'warning');
      }
    } catch (err) {
      console.error('Delete failed:', err);
      Swal.fire('Error', 'Something went wrong while deleting.', 'error');
    }
  };

  return (
    <>
      <tr>
        <th>
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={foodImage} alt={foodTitle || "Food Image"} />
            </div>
          </div>
        </th>
        <td>
          <div className="font-bold text-orange-400">{foodTitle}</div>
        </td>
        <td className="font-medium">{category}</td>
        <td>{quantity}</td>
        <td className="text-red-500 font-medium">{new Date(expiryDate).toDateString()}</td>
        <th>
          <div className="join join-vertical lg:join-horizontal gap-5">
            <button
              className="btn join-item bg-orange-400 text-white hover:bg-orange-500 rounded-full"
              onClick={() => setShowUpdateModal(true)}
            >
              Update
            </button>
            <button
              className="btn join-item bg-red-400 text-white hover:bg-red-600 rounded-full"
              onClick={() => document.getElementById(`delete-${_id}`).showModal()}
            >
              Delete
            </button>
          </div>
        </th>
      </tr>

      {showUpdateModal && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-orange-400">Update Food Info</h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-4 mt-4">
              <input
                type="text"
                className="input input-bordered w-full"
                value={updatedData.foodTitle}
                onChange={e => setUpdatedData({ ...updatedData, foodTitle: e.target.value })}
                placeholder="Food Title"
                required
              />
              <select
                name="category"
                className="select w-full font-normal"
                value={updatedData.category}
                onChange={e => setUpdatedData({ ...updatedData, category: e.target.value })}
                required
              >
                <option value="">Select category</option>
                <option>Dairy</option>
                <option>Vegetables</option>
                <option>Meat</option>
                <option>Beverage</option>
                <option>Frozen Food</option>
                <option>Snacks</option>
              </select>
              <input
                type="text"
                className="input input-bordered w-full"
                value={updatedData.description}
                onChange={e => setUpdatedData({ ...updatedData, description: e.target.value })}
                placeholder="Description"
                required
              />
              <input
                type="number"
                className="input input-bordered w-full"
                value={updatedData.quantity}
                onChange={e => setUpdatedData({ ...updatedData, quantity: e.target.value })}
                placeholder="Quantity"
                required
              />
              <input
                type="date"
                className="input input-bordered w-full"
                value={updatedData.expiryDate}
                onChange={e => setUpdatedData({ ...updatedData, expiryDate: e.target.value })}
                required
              />

              <div className="modal-action">
                <button type="submit" className="btn btn-success btn-sm">Save</button>
                <button type="button" className="btn btn-sm" onClick={() => setShowUpdateModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </dialog>
      )}

      <dialog id={`delete-${_id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Deletion</h3>
          <p>Are you sure you want to delete <strong>{foodTitle}</strong>?</p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-3">
              <button className="btn btn-sm" onClick={() => document.getElementById(`delete-${_id}`).close()}>Cancel</button>
              <button className="btn btn-error btn-sm" onClick={handleDelete}>Delete</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ItemsRow;
