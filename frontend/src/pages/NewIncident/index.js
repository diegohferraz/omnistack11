import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import logoHeroes from '../../assets/logo.svg';

import './styles.css';

export default function NewIncident () {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const ong_id = localStorage.getItem('ongId');
  const history = useHistory();


  async function handleIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value
    }

    try {
      const response = await api.post('incidents', data, {
        headers: {
          Authorization: ong_id
        }
      });
      history.push('/profile');
    } catch (err) {
      alert('Erro no casdatro, tente novamente.');
    }

  }
  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoHeroes} title="Brand Heroes" />
          <h1>Cadastro novo caso</h1>
          <p>Descreva o caso detalhademante para encontrar um herói para resolver isso.</p>
          <Link to="/profile" className="blank-link">
            <FiArrowLeft size={16} color="#e02041" /> Voltar para home
            </Link>
        </section>
        <form onSubmit={handleIncident}>
          <input
            placeholder="Titulo do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required />
          <textarea
            placeholder="Descrição do caso"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required />
          <input
            placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}
            required />
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}