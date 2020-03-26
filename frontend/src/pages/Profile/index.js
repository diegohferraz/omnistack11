import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import logoHeroes from '../../assets/logo.svg';

export default function Profile() {
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  const [incident, setIncident] = useState([]);

  const history = useHistory();

  useEffect(() => {
    api.get('/profile', {
      headers: {
        Authorization: ongId
      }
    }).then(response => {
      setIncident(response.data)
    });
  }, [ongId]);

  async function handleDelete(id) {
    try {
      await api.delete(`/incidents/${id}`, {
        headers: { Authorization: ongId }
      });
      setIncident(incident.filter(incident => incident.id !== id));
    } catch (err) {
      alert("Erro ao deletar caso tente novamente!");
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoHeroes} title="Brand Heroes" />
        <span>Bem vinda, {ongName}</span>

        <Link to="/incidents/new" className="button">Cadastrar novo caso</Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos Cadastrados</h1>

      <ul>
        {incident.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>Descrição:</strong>
            <p>{incident.description}</p>

            <strong>Valor:</strong>
            <p>R$ {incident.value}</p>

            <button type="button" onClick={() => handleDelete(incident.id) }>
              <FiTrash2 size={16} color="" />
            </button>
          </li>
        ))}
      </ul>

    </div>
  );
}