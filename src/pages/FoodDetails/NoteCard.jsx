import React from 'react';

const NoteCard = ({note}) => {
    return (
        <div className='p-5'>
            <h2 className='text-orange-400 my-3 font-medium'>Note By: {note.userEmail}</h2>
            <div className='my-3 space-y-4'>
                <h2>{note.text}</h2>
                <hr className='text-gray-300'/>
            </div>
            <p className='text-gray-300 font-medium'>Posted At: {new Date(note.postedAt).toDateString()}</p>
            
        </div>
    );
};

export default NoteCard;