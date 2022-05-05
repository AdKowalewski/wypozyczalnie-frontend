import React, { useRef, useEffect, useState } from 'react';
import CarService from '../services/CarService';
import 'bulma/css/bulma.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import FileBase64 from 'react-file-base64';

const EditCar = () => {

    const navigate = useNavigate();
    const { car_id } = useParams();

    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [description, setDescription] = useState('');
    const [img, setImg] = useState('');
    const [price, setPrice] = useState('');

    const brandRef = useRef();
    const modelRef = useRef();
    const descriptionRef = useRef();
    const priceRef = useRef();

    useEffect(() => {
        CarService.getCarById(car_id).then((res) => {
            console.log(res.data);
            setImg(res.data.img);
            setBrand(res.data.brand);
            setModel(res.data.model);
            setDescription(res.data.description);
            setPrice(res.data.price);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await CarService.editCar(brand, model, description, img, price);
            console.log(JSON.stringify(response.data));
            setBrand(brand);
            setModel(model);
            setDescription(description);
            setImg(img);
            setPrice(price);
            navigate(-1);
        } catch (err) {
            console.log(err);
        }
    };

    const encodeImage = (image) => {
        setImg(image);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="brand">Brand:</label>
                <br/>
                <input
                    type="text"
                    id="brand"
                    onChange={(e) => setBrand(e.target.value)}
                    ref={brandRef}
                    value={brand}
                    required
                />
                <br/>
                <label htmlFor="model">Model:</label>
                <br/>
                <input
                    type="text"
                    id="model"
                    onChange={(e) => setModel(e.target.value)}
                    ref={modelRef}
                    value={model}
                    required
                />
                <br/>
                <label htmlFor="description">Description:</label>
                <br/>
                <input
                    type="text"
                    id="description"
                    onChange={(e) => setDescription(e.target.value)}
                    ref={descriptionRef}
                    value={description}
                    required
                />
                <br/>
                <label htmlFor="img">Image:</label>
                <br/>
                <FileBase64 multiple={ false } onDone={encodeImage} />
                {/* <input
                    type="file"
                    id="img"
                    onChange={(e) => setImg(e.target.files[0])}
                    ref={imgRef}
                    value={img}
                    required
                /> */}
                <br/>
                <label htmlFor="price">Price:</label>
                <br/>
                <input
                    type="text"
                    id="price"
                    onChange={(e) => setPrice(e.target.value)}
                    ref={priceRef}
                    value={price}
                    required
                />
                <br/>
                <button type='submit'>Edit car</button>
            </form>
            <br/>
            <button onClick={handleCancel}>Go back</button>
        </div>
    );
};

export default EditCar;