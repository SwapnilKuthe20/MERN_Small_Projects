import { useDispatch, useSelector } from 'react-redux';
import './App.css'
import { useEffect, useState } from 'react';

function App() {

  // const dispatch = useDispatch();
  // const { notes, status, error } = useSelector(state => state.notes);


  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // useEffect(() => {
  //   // dispatch(fetchNotes());
  // }, [dispatch]);

  const handleAddNote = () => {
    // dispatch(createNote({ title, content }));
    setTitle('');
    setContent('');
  }

  const handleDelete = (id) => {
    // dispatch(deleteNote(id));
  }

  return (
    <div className='w-full h-screen p-3.5 bg-fuchsia-950 text-fuchsia-50'>
      <h1 className='text-center text-4xl mb-5 text-amber-200'>Notes App</h1>

      <div className='flex justify-center items-center '>


        <div className='w-1/2'>

          <label htmlFor="title"> Enter Title : </label>
          <div className='w-full text-amber-50 my-5' >
            <input value={title} id='title' onChange={(e) => setTitle(e.target.value)} placeholder="Title" style={{ border: "1px solid white", padding: "7px", width: "100%" }} />
          </div>

          <label htmlFor="content"> Enter Content : </label>
          <div className='text-amber-50 my-5'>
            <textarea value={content} id='content' onChange={(e) => setContent(e.target.value)} placeholder="Content" rows={5} style={{ border: "1px solid white", padding: "7px", width: "100%" }}></textarea>
          </div>

          <button onClick={handleAddNote} className='bg-fuchsia-400 text-black p-2.5 rounded cursor-pointer'>Add Note</button>
        </div>

        {/* {status === 'loading' && <p>Loading...</p>}
      {error && <p>Error: {error}</p>} */}

        <div style={{ marginTop: '20px' }}>
          {/* {notes?.map(note => (
          <div key={note._id} style={{ border: '1px solid black', marginBottom: '10px', padding: '10px' }}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <button onClick={() => handleDelete(note._id)}>Delete</button>
          </div>
          ))} */}
        </div>
      </div>
    </div>
  )
}

export default App
