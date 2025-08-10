import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext/AuthContext';


const AddNoteForm = ({ foodId, onNoteAdded }) => {
  const { user } = useContext(AuthContext);
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      setError("Note can't be empty");
      return;
    }

    setSubmitting(true);
    setError('');

    const noteData = {
      text,
      foodId,
      userEmail: user.email,
      postedAt: new Date().toISOString(),
    };

    try {
      const res = await axios.post('https://b11a11-server-side-itachi-uchiha-32.vercel.app/notes', noteData);
      onNoteAdded(res.data);
      setText('');
    } catch (err) {
      setError('Failed to add note.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border border-gray-300 rounded p-3 mb-2"
        placeholder="Write your note here..."
        rows={3}
      />
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
      >
        {submitting ? 'Adding...' : 'Add Note'}
      </button>
    </form>
  );
};

export default AddNoteForm;
