import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
const UpdateBook = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [Data, setData] = useState({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
    })
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`);
                console.log(response);
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching the book data:", error);
            }
        };
        fetchData();
    }, [id]);
    const change = (e) => {
        const { name, value } = e.target
        setData({ ...Data, [name]: value })
    }
    const submit = async (e) => {
        try {
            if (
                Data.url === "" ||
                Data.title === "" ||
                Data.author === "" ||
                Data.price === "" ||
                Data.desc === "" ||
                Data.language === ""
            ) {
                alert("Please fill all the fields")
            } else {
                const response = await axios.put('http://localhost:1000/api/v1/update-book', Data, { headers })
                setData({
                    url: "",
                    title: "",
                    author: "",
                    price: "",
                    desc: "",
                    language: "",
                })
                alert(response.data.message)
                navigate(`/view-book-details/${id}`)
            }
        } catch (error) {
            // if (error.response) {
            //     // Server responded with a status other than 200 range
            //     console.error("Error Response:", error.response);
            //     alert(error.response.data.message);
            // } else if (error.request) {
            //     // Request was made but no response received
            //     console.error("Error Request:", error.request);
            //     alert("No response received from server.");
            // } else {
            //     // Something else happened
            //     console.error("Error:", error.message);
            //     alert("An unexpected error occurred: " + error.message);
            // }
            alert(error.response.data.message)
            navigate(`/view-book-details/${id}`)
        }
    }

    return (
        <div className='h-[100%] p-0 md:p-4 bg-zinc-900'>
            <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>Update Books</h1>
            <div className='p-4 bg-zinc-800 rounded'>
                <div>
                    <label htmlFor="" className='text-zinc-400'>Image</label>
                    <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='Url of image' name='url' required value={Data.url} onChange={change} />
                </div>
                <div className='mt-4'>
                    <label htmlFor="" className='text-zinc-400'>Title Of Book</label>
                    <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='Title of Book' name='title' required value={Data.title} onChange={change} />
                </div>
                <div className='mt-4'>
                    <label htmlFor="" className='text-zinc-400'>Author Of Book</label>
                    <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='Author of Book' name='author' required value={Data.author} onChange={change} />
                </div>
                <div className='mt-4 flex gap-4'>
                    <div className='w-3/6'>
                        <label htmlFor="" className='text-zinc-400'>Language</label>
                        <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='Language of Book' name='language' required value={Data.language} onChange={change} />
                    </div>
                    <div className='w-3/6'>
                        <label htmlFor="" className='text-zinc-400'>Price</label>
                        <input type="number" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='Price of Book' name='price' required value={Data.price} onChange={change} />
                    </div>
                </div>
                <div className='mt-4'>
                    <label htmlFor="" className='text-zinc-400'>Description Of Book</label>
                    <textarea rows="5" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='Description of Book' name='desc' required value={Data.desc} onChange={change} />
                </div>
                <button className='mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300' onClick={submit}>Update Book</button>
            </div>
        </div>
    )
}

export default UpdateBook