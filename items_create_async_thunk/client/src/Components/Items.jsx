import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItemApi, fetchAllItems, postItems, updateItem } from './Store/Features/itemSlice';

const Items = () => {

    const [formData, setFormData] = useState({
        brand: "",
        model: "",
        price: "",
        description: ""
    })
    // console.log(formData, "...formdata")
    const [currentItemId, setCurrentItemId] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [isDeletePopOpen, setIsdeletPopOpen] = useState(false)
    const [deleteItem, setDeleteItem] = useState({})

    console.log(deleteItem, "...deleteItem");


    // console.log(isDeletePopOpen, "...isDeletePopUp");

    const dispatch = useDispatch()
    const { status, items, error } = useSelector(state => state.itemReducer)
    // console.log(items, "...items selector");

    useEffect(() => {
        dispatch(fetchAllItems())
    }, [dispatch])

    const handleinputs = (e) => {
        const { name, value } = e.target

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleItemForm = (e) => {
        e.preventDefault()

        if (!formData.brand || !formData.model || !formData.price || !formData.description) {
            alert("Please enter all field.. All field are mandatory...!")
            return;
        }

        dispatch(postItems(formData))

        setFormData({
            brand: '',
            model: "",
            price: "",
            description: ""
        })
    }

    const handleUpdate = (_id, brand, price, model, description) => {
        setIsOpen(true)

        setCurrentItemId(_id)

        setFormData({
            brand: brand,
            price: price,
            model: model,
            description: description
        })
    }

    const handlePopUpUpdate = (e) => {
        e.preventDefault()
        // console.log(items, "...items popup");

        dispatch(updateItem({ id: currentItemId, payload: formData }))

        setFormData({
            brand: "",
            model: "",
            price: "",
            description: ""
        })

        setIsOpen(false)
    }

    const handleDelete = (_id, brand, model) => {
        setIsdeletPopOpen(true)
        setCurrentItemId(_id)
        setDeleteItem({ brand, model })
    }

    const handleDeleteItem = () => {
        dispatch(deleteItemApi(currentItemId))

        setDeleteItem({})
        setIsdeletPopOpen(false)
    }

    if (status === "loading") {
        return <p className='w-full h-screen bg-black text-4xl text-center my-6'> .... Loading </p>
    }

    if (error) {
        return <p className='w-full h-screen bg-black text-4xl text-center my-6'> .... {error} </p>
    }

    return (
        <div className='bg-cyan-900 text-cyan-50 max-w-11/12 m-auto min-h-screen p-6'>
            <h1 className='text-center text-3xl p-2 text-amber-200 mb-7'> Items Component </h1>

            <form onSubmit={handleItemForm} className='w-1/3 bg-amber-950 text-amber-50 p-5 my-5 m-auto rounded-3xl'>

                <label htmlFor="brand"> Brand : </label>
                <div className='my-2 p-1.5 rounded border border-cyan-300 '>
                    <input type="text" id='brand' name='brand' onChange={handleinputs} value={formData.brand} placeholder='Enter brand...' className='outline-none' />
                </div>

                <label htmlFor="model"> Model : </label>
                <div className='my-2 p-1.5 rounded border border-cyan-300'>
                    <input type="text" id='model' name="model" onChange={handleinputs} value={formData.model} placeholder='Enter model...' className='outline-none' />
                </div>

                <label htmlFor="price"> Price : </label>
                <div className='my-2 p-1.5 rounded border border-cyan-300'>
                    <input type="number" name='price' onChange={handleinputs} value={formData.price} placeholder='Enter price...' className='outline-none' />
                </div>

                <label htmlFor="description"> Description : </label>
                <div className='my-2 p-1.5 rounded border border-cyan-300'>
                    <input type="text" name='description' onChange={handleinputs} value={formData.description} placeholder='Enter description...' className='outline-none' />
                </div>

                <button type='submit' className='w-1/3 p-2 block m-auto my-4 bg-cyan-700 rounded-3xl' > Submit </button>
            </form>

            <div className='flex justify-center items-center gap-5 flex-wrap text-start'>
                {
                    items?.map(({ _id, brand, price, model, description }) => (
                        <div key={_id} className='w-96 bg-fuchsia-950 text-fuchsia-50 rounded-2xl p-5 '  >
                            <h1 className=''> <span className='text-amber-300 text-xl'> Brand Name : </span>  {brand} </h1>
                            <h1 className=''> <span className='text-amber-300 text-xl'> Brand model : </span> {model} </h1>
                            <h1 className=''> <span className='text-amber-300 text-xl'> Brand Price : </span> {price} </h1>
                            <h1 className=''> <span className='text-amber-300 text-xl'> Brand Description : </span> {description} </h1>

                            <div className='flex justify-center items-center gap-7 mt-3'>
                                <button onClick={() => handleUpdate(_id, brand, price, model, description)} className='p-2 bg-emerald-900 hover:bg-gray-700 text-emerald-50 rounded cursor-pointer '> Update </button>
                                <button onClick={() => handleDelete(_id, brand, model)} className='p-2 bg-emerald-900 hover:bg-gray-700 text-emerald-50 rounded cursor-pointer '> Delete </button>
                            </div>
                        </div>
                    ))
                }
            </div>

            {
                isOpen && (
                    <div className="fixed inset-0 bg-gray-950 opacity-90 flex items-center justify-center z-50">
                        <div className="border-y-green-900 rounded-lg shadow-lg p-6 w-1/3">
                            <h2 className="text-xl font-semibold mb-4 text-center">This is a Popup for upadating fields </h2>
                            <div className="flex justify-end space-x-2">

                                <form onSubmit={handlePopUpUpdate} className='w-full bg-emerald-950 text-amber-50 p-5 my-5 m-auto rounded-3xl'>

                                    <label htmlFor="brand"> Brand : </label>
                                    <div className='my-2 p-1.5 rounded border border-cyan-300 '>
                                        <input type="text" id='brand' name='brand' onChange={handleinputs} value={formData.brand} placeholder='Enter brand...' className='outline-none' />
                                    </div>

                                    <label htmlFor="model"> Model : </label>
                                    <div className='my-2 p-1.5 rounded border border-cyan-300'>
                                        <input type="text" id='model' name="model" onChange={handleinputs} value={formData.model} placeholder='Enter model...' className='outline-none' />
                                    </div>

                                    <label htmlFor="price"> Price : </label>
                                    <div className='my-2 p-1.5 rounded border border-cyan-300'>
                                        <input type="number" name='price' onChange={handleinputs} value={formData.price} placeholder='Enter price...' className='outline-none' />
                                    </div>

                                    <label htmlFor="description"> Description : </label>
                                    <div className='my-2 p-1.5 rounded border border-cyan-300'>
                                        <input type="text" name='description' onChange={handleinputs} value={formData.description} placeholder='Enter description...' className='outline-none' />
                                    </div>

                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="px-4 py-2 bg-gray-300 text-black font-bold rounded hover:bg-gray-400 cursor-pointer"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type='submit'
                                        className="px-4 py-2 ms-4 bg-blue-600 text-black font-bold rounded hover:bg-blue-700 cursor-pointer"
                                    >
                                        Update
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                isDeletePopOpen && (

                    <div className='fixed inset-0 bg-emerald-950 opacity-80 flex justify-center items-center z-50'>
                        <div className='w-lg border rounded-lg  bg-blue-950 text-green-100 p-7 '>
                            <h1 className='text-2xl mb-5'> Are you sure want to delete this item ? </h1>

                            <h1 > <span className='text-amber-300 text-xl mb-3'> Brand Name : </span>  {deleteItem.brand} </h1>
                            <h1 > <span className='text-amber-300 text-xl mt-3'> Brand model : </span> {deleteItem.model} </h1>

                            <div className='flex justify-center gap-10 '>
                                <button onClick={() => setIsdeletPopOpen(false)} className='bg-black text-shadow-amber-50 rounded-2xl p-3 cursor-pointer'> Cancel </button>
                                <button onClick={handleDeleteItem} className='bg-black text-shadow-amber-50 rounded-2xl p-3 cursor-pointer'>  Delete </button>
                            </div>
                        </div>

                    </div>
                )

            }

        </div>
    );
}

export default Items;

