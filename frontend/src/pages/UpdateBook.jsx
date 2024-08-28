import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [Data, setData] = useState({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
        quantity: "",
        discount: "",
        category: "",
        subcategory: "",
    });

    const [categories, setCategories] = useState([]);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`);
                setData(response.data.data || {});
            } catch (error) {
                console.error("Error fetching the book data:", error);
                alert("Error fetching book details. Please try again.");
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:1000/api/v1/get-categories');
                setCategories(response.data.data || []);
            } catch (error) {
                console.error('Error fetching categories:', error);
                alert("Error fetching categories. Please try again.");
            }
        };

        fetchData();
        fetchCategories();
    }, [id]);

    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
    };

    const handleCategoryChange = (e) => {
        setData({ ...Data, category: e.target.value, subcategory: "" });
    };

    const handleSubcategoryChange = (e) => {
        setData({ ...Data, subcategory: e.target.value });
    };

    const isEmptyOrUndefined = (value) => {
        return value === undefined || value === null || (typeof value === 'string' && value.trim() === "");
    };

    const submit = async () => {
        try {
            if (
                isEmptyOrUndefined(Data.url) ||
                isEmptyOrUndefined(Data.title) ||
                isEmptyOrUndefined(Data.author) ||
                isEmptyOrUndefined(Data.price) ||
                isEmptyOrUndefined(Data.desc) ||
                isEmptyOrUndefined(Data.language) ||
                isEmptyOrUndefined(Data.quantity) ||
                isEmptyOrUndefined(Data.category) ||
                isEmptyOrUndefined(Data.subcategory)
            ) {
                alert("Please fill all the fields");
            } else {
                console.log("Sending data:", Data);
                console.log("Sending headers:", headers);
    
                const response = await axios.put('http://localhost:1000/api/v1/update-book', Data, { headers });
    
                console.log("Response received:", response);
    
                if (response && response.data && response.data.message) {
                    alert(response.data.message);
                    navigate(`/view-book-details/${id}`);
                } else {
                    throw new Error("Unexpected response structure");
                }
            }
        } catch (error) {
            console.error("Error updating the book:", error);
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert("An error occurred while updating the book. Please try again.");
            }
            navigate(`/view-book-details/${id}`);
        }
    };

    return (
        <div className='h-[100%] p-0 md:p-4 bg-zinc-900'>
            <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>Update Book</h1>
            <div className='p-4 bg-zinc-800 rounded'>
                <div>
                    <label htmlFor="url" className='text-zinc-400'>Image</label>
                    <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='Url of image' name='url' required value={Data.url} onChange={change} />
                </div>
                <div className='mt-4'>
                    <label htmlFor="title" className='text-zinc-400'>Title Of Book</label>
                    <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='Title of Book' name='title' required value={Data.title} onChange={change} />
                </div>
                <div className='mt-4'>
                    <label htmlFor="author" className='text-zinc-400'>Author Of Book</label>
                    <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='Author of Book' name='author' required value={Data.author} onChange={change} />
                </div>
                <div className='mt-4 flex gap-4'>
                    <div className='w-3/6'>
                        <label htmlFor="language" className='text-zinc-400'>Language</label>
                        <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='Language of Book' name='language' required value={Data.language} onChange={change} />
                    </div>
                    <div className='w-3/6'>
                        <label htmlFor="price" className='text-zinc-400'>Price</label>
                        <input type="number" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='Price of Book' name='price' required value={Data.price} onChange={change} />
                    </div>
                </div>
                <div className='mt-4'>
                    <label htmlFor="quantity" className='text-zinc-400'>Quantity</label>
                    <input type="number" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='Quantity of Book' name='quantity' required value={Data.quantity} onChange={change} />
                </div>
                <div className='mt-4'>
                    <label htmlFor="discount" className='text-zinc-400'>Discount (%)</label>
                    <input type="number" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='Discount on Book' name='discount' value={Data.discount} onChange={change} />
                </div>
                <div className='mt-4'>
                    <label htmlFor="category" className='text-zinc-400'>Category</label>
                    <select className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' name='category' required value={Data.category} onChange={handleCategoryChange}>
                        <option value="" disabled>Select Category</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                {Data.category && (
                    <div className='mt-4'>
                        <label htmlFor="subcategory" className='text-zinc-400'>Subcategory</label>
                        <select className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' name='subcategory' required value={Data.subcategory} onChange={handleSubcategoryChange}>
                            <option value="" disabled>Select Subcategory</option>
                            {categories
                                .find(category => category._id === Data.category)?.subcategories
                                ?.map(subcategory => (
                                    <option key={subcategory._id} value={subcategory._id}>
                                        {subcategory.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                )}
                <div className='mt-4'>
                    <label htmlFor="desc" className='text-zinc-400'>Description Of Book</label>
                    <textarea rows="5" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='Description of Book' name='desc' required value={Data.desc} onChange={change} />
                </div>
                <button className='mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300' onClick={submit}>Update Book</button>
            </div>
        </div>
    );
}

export default UpdateBook;
