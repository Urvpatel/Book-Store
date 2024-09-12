import React, { useState } from 'react'
import axios from 'axios'
const AddBook = () => {
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
    }
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
                const response = await axios.post('http://localhost:1000/api/v1/add-book', Data, { headers })
                setData({
                    url: "",
                    title: "",
                    author: "",
                    price: "",
                    desc: "",
                    language: "",
                })
                alert(response.data.message)
            }
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 200 range
                console.error("Error Response:", error.response);
                alert(error.response.data.message);
            } else if (error.request) {
                // Request was made but no response received
                console.error("Error Request:", error.request);
                alert("No response received from server.");
            } else {
                // Something else happened
                console.error("Error:", error.message);
                alert("An unexpected error occurred: " + error.message);
            }
        }
    }
    return (
        <div className='h-[100%] p-0 md:p-4'>
            <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>Add Books</h1>
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
                <button className='mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300' onClick={submit}>Add Book</button>
            </div>
        </div>
    )
}

export default AddBook

// import React, { useState } from 'react';
// import axios from 'axios';

// const AddBook = () => {
//     const [data, setData] = useState({
//         url: "",
//         title: "",
//         author: "",
//         price: "",
//         desc: "",
//         language: "",
//     });

//     const headers = {
//         'Authorization': `Bearer ${localStorage.getItem("token")}`,
//         'Content-Type': 'application/json'
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setData({ ...data, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (Object.values(data).some(field => field === "")) {
//                 alert("Please fill all the fields");
//             } else {
//                 const response = await axios.post('http://localhost:3001/api/v1/add-book', data, { headers });
//                 setData({
//                     url: "",
//                     title: "",
//                     author: "",
//                     price: "",
//                     desc: "",
//                     language: "",
//                 });
//                 alert(response.data.message);
//             }
//         } catch (error) {
//             if (error.response) {
//                 console.error("Error Response:", error.response);
//                 alert(error.response.data.message);
//             } else if (error.request) {
//                 console.error("Error Request:", error.request);
//                 alert("No response received from server.");
//             } else {
//                 console.error("Error:", error.message);
//                 alert("An unexpected error occurred: " + error.message);
//             }
//         }
//     };

//     return (
//         <div className='h-[100%] p-0 md:p-4'>
//             <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>Add Books</h1>
//             <form className='p-4 bg-zinc-800 rounded' onSubmit={handleSubmit}>
//                 <div>
//                     <label className='text-zinc-400'>Image</label>
//                     <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='Url of image' name='url' required value={data.url} onChange={handleChange} />
//                 </div>
//                 <div className='mt-4'>
//                     <label className='text-zinc-400'>Title Of Book</label>
//                     <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='Title of Book' name='title' required value={data.title} onChange={handleChange} />
//                 </div>
//                 <div className='mt-4'>
//                     <label className='text-zinc-400'>Author Of Book</label>
//                     <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='Author of Book' name='author' required value={data.author} onChange={handleChange} />
//                 </div>
//                 <div className='mt-4 flex gap-4'>
//                     <div className='w-3/6'>
//                         <label className='text-zinc-400'>Language</label>
//                         <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='Language of Book' name='language' required value={data.language} onChange={handleChange} />
//                     </div>
//                     <div className='w-3/6'>
//                         <label className='text-zinc-400'>Price</label>
//                         <input type="number" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='Price of Book' name='price' required value={data.price} onChange={handleChange} />
//                     </div>
//                 </div>
//                 <div className='mt-4'>
//                     <label className='text-zinc-400'>Description Of Book</label>
//                     <textarea rows="5" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='Description of Book' name='desc' required value={data.desc} onChange={handleChange} />
//                 </div>
//                 <button type='submit' className='mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300'>Add Book</button>
//             </form>
//         </div>
//     );
// };

// export default AddBook;
