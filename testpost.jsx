import React, { useRef } from 'react';
import axios from 'axios';

function TestCORS() {
    const titleRef = useRef();
    const imageRef = useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', titleRef.current.value);
        formData.append('image', imageRef.current.files[0]);

        try {
            const response = await axios.post('http://202.10.36.31:8000/api/v1/gallery', formData, {
                headers: {
                    'Authorization': 'Bearer your_token_here',
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" ref={titleRef} required /><br /><br />

            <label htmlFor="image">Image:</label>
            <input type="file" id="image" name="image" ref={imageRef} required /><br /><br />

            <input type="submit" value="Submit" />
        </form>
    );
}

export default TestCORS;