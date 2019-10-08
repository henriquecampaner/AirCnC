import React, {useState, useMemo} from 'react';
import api from '../../services/api'

import camera from '../../assets/camera.svg';

import './styles.css';

export default function New({history}) {
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        
        const data = new FormData();
        data.append('thumbnail', thumbnail);
        data.append('techs', techs);
        data.append('price', price);
        data.append('company', company);

        const user_id = localStorage.getItem('user');

        await api.post('/spots', data, {
            headers: {user_id}
        });

        history.push('/dashboard');

    };

    const preview = useMemo(
        () => {
            return thumbnail ? URL.createObjectURL(thumbnail) : null;
        },
        [thumbnail]
    )

    return (
        <form onSubmit={handleSubmit}>
            <label
                id="thumbnail"
                style={{backgroundImage: `url(${preview})`}}
                className={thumbnail ? 'has-thumbnail' : ''}
            >
                <input type="file" onChange={e => setThumbnail(e.target.files[0])} />
                <img src={camera} alt="select img"/>
            </label>

            <label htmlFor="company">Company *</label>
            <input
                placeholder="Your Company"
                id="company"
                value={company}
                onChange={e => setCompany(e.target.value)}
            />

            <label htmlFor="techs">Techs * <span>(comma separated)</span></label>
            <input
                placeholder="Which techs do you use?"
                id="techs"
                value={techs}
                onChange={e => setTechs(e.target.value)}
            />

<           label htmlFor="techs">Price per day * <span>(Blank to free)</span></label>
            <input
                placeholder="Price per day"
                id="price"
                value={price}
                onChange={e => setPrice(e.target.value)}
            />

            <button type="submit" className="btn">Register</button>
        </form>
    )
};