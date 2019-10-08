import React, {useState} from 'react';
import api from '../../services/api';

export default function Login({history}) {
const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [telephone, setTelephone] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await api.post('/sessions', {email, name});

        const { _id} = response.data;
        localStorage.setItem('user', _id);

        history.push('./dashboard')
    };
    return (
        <>
            <p>
            Offer <strong>developer spots</strong> and find <strong>talent</strong> for your business
            </p>

            <form onSubmit={handleSubmit}>
            <label htmlFor="email">E-mail *</label>
            <input
                type="email"
                id="email"
                placeholder="Your best e-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                type="text"
                id="name"
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <input
                type="text"
                id="telephone"
                placeholder="Your telephone"
                value={telephone}
                onChange={e => setTelephone(e.target.value)}
            />

            <button className="btn" type="submit">Log in</button>
            </form>
        </>
    )
};