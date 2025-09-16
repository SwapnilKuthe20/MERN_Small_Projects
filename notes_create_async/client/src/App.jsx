import { useDispatch, useSelector } from 'react-redux';
import './App.css'
import { useEffect, useState } from 'react';
import { createNotes, deleteNotes, fetchNotes, updateNotes } from './Components/Features/notesSlice';

function App() {

  const dispatch = useDispatch();
  const { status, notes, error } = useSelector(state => state.notesReducer);

  // console.log(notes, "...notes app.jsx");

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null); // ID of note being edited

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const handleAddNote = () => {

    if (!title.trim() || !content.trim()) {
      alert("Please enter both title and content!");
      return;
    }

    if (editId) {
      dispatch(updateNotes({ id: editId, updatedData: { title, content } }))
      setEditId(null)
      setTitle('');   // reset after update
      setContent('');

    } else {
      dispatch(createNotes({ title, content }));
      setTitle('');
      setContent('');
    }
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure want to delete ? ")) {
      dispatch(deleteNotes(id));
    }
  }

  const handleUpdate = (id, title, content) => {
    setEditId(id)
    setTitle(title)
    setContent(content)
  }

  return (
    <div className='w-full p-3.5 bg-fuchsia-950 text-fuchsia-50'>
      <h1 className='text-center text-4xl mb-5 text-amber-200'>Notes App</h1>

      <div className='flex justify-center items-center flex-col gap-2.5'>
        <div className='w-96'>

          <label htmlFor="title"> Enter Title : </label>
          <div className='w-full text-amber-50 my-5' >
            <input
              value={title}
              id='title'
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              style={{ border: "1px solid white", padding: "7px", width: "100%" }}
            />
          </div>

          <label htmlFor="content"> Enter Content : </label>
          <div className='text-amber-50 my-5'>
            <textarea
              value={content}
              id='content'
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content" rows={5}
              style={{ border: "1px solid white", padding: "7px", width: "100%" }}
            >
            </textarea>
          </div>

          <button
            onClick={handleAddNote}
            className='bg-fuchsia-400 text-black p-2.5 rounded cursor-pointer block m-auto'
          >
            {editId ? "Update Note" : "Add Note"}
          </button>
        </div>

        {status === 'loading' && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        <div className='mt-5 w-96'>
          {
            notes?.map(({ _id, title, content }) => (

              < div key={_id} className=' bg-amber-950 text-amber-50 my-3 p-3 border ' >
                <h3> title : {title} </h3>
                <p> content : {content} </p>
                <button
                  onClick={() => handleDelete(_id)}
                  className='p-1.5 rounded m-2  border-amber-50 bg-emerald-900 cursor-pointer'
                >
                  Delete
                </button>

                <button
                  onClick={() => handleUpdate(_id, title, content)}
                  className='p-1.5 rounded m-2  border-amber-50 bg-emerald-900 cursor-pointer'
                >
                  Update
                </button>
              </div>

            ))
          }
        </div>
      </div>
    </div >
  )
}

export default App
