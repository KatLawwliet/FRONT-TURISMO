import React, { useState } from 'react';
import axios from 'axios';
import Modal from '../componnents/Modal';

const EmailService = ({ email }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');

  const handleEmailClick = () => {
    console.log('Se hizo clic en el enlace de correo electrónico');
    setIsModalOpen(true);
  };

  const handleSendEmail = async (emailData) => {
    try {
      setIsModalOpen(false);
      console.log('Datos del correo electrónico a enviar:', emailData);
      const response = await axios.post('http://localhost:8080/notification/send', emailData);
      console.log('Correo electrónico enviado correctamente:', response.data);
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
    }
  };

  const handleSubjectChange = (e) => {
    console.log('Cambio en el campo de asunto:', e.target.value);
    setSubject(e.target.value);
  };

  const handleTextChange = (e) => {
    console.log('Cambio en el campo de texto:', e.target.value);
    setText(e.target.value);
  };

  return (
    <>
      <span
        style={{ color: 'blue', cursor: 'pointer' }}
        onClick={handleEmailClick}
      >
        {email}
      </span>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} width="50%" height="50%">
        <div style={{ textAlign: 'center' }}>
          <h2>Enviar correo electrónico a: {email}</h2>
          <div>
            <label htmlFor="subject">Asunto:</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={handleSubjectChange}
            />
          </div>
          <div>
            <label htmlFor="text">Texto:</label>
            <textarea
              id="text"
              value={text}
              onChange={handleTextChange}
            />
          </div>
          <button onClick={() => handleSendEmail({ to: email, subject, text })}>Enviar correo</button>
        </div>
      </Modal>
    </>
  );
};

export default EmailService;