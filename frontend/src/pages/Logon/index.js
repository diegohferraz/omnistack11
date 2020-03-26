import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import heroesImg from '../../assets/heroes.png';
import logoHeroes from '../../assets/logo.svg';


export default function Logon() {
  const [id, setId] = useState('');

  const history = useHistory();

  async function handleLogon(e) {
    e.preventDefault();

    const data = { id }

    try {
      const response = await api.post('sessions', data);
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);
      history.push('/profile');
    } catch (err) {
      alert(`Informe o ID corretamente!`);
      setId('');
    }

  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoHeroes} title="Brand Heroes" />
        <form onSubmit={handleLogon}>
          <h1>Faça seu logon</h1>

          <input
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
            required />

          <button className="button" type="submit">Entrar</button>
          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} title="Illustration Logon" />
    </div>
  );
}