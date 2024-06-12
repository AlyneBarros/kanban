import React, { useState } from "react";
import { MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import ErrorModal from './ErrorModal';
import Cookies from 'js-cookie';

function Login({ setAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Extraia 'centro' e 'area' de alguma fonte, como um formulário
      const centro = 'SG00'; // Exemplo: centro vem do formulário
      const area = 'SOLIDOS'; // Exemplo: área vem do formulário

      // Simula uma resposta bem-sucedida do servidor
      const response = { ok: true }; // Isso é apenas um exemplo simulado

      if (response.ok) {
        setAuthenticated(true);
        Cookies.set('username', username);

        // Redirecionar para a página inicial com a URL contendo o centro e a área
        navigate(`/home#${centro}/${area}`);
      } else {
        setErrorModalOpen(true);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Ocorreu um erro ao fazer login. Por favor, tente novamente mais tarde.');
    }
  };

  const handleCloseErrorModal = () => {
    setErrorModalOpen(false);
  };

  return (
    <MDBContainer fluid>
      <div className="p-5 bg-image" style={{backgroundImage: 'url(https://mdbootstrap.com/img/new/textures/full/171.jpg)', height: '300px'}}></div>
      <MDBCard className='mx-5 mb-5 p-5 shadow-5' style={{marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)'}}>
        <MDBCardBody className='p-5 text-center'>
          <h2 className="fw-bold mb-5">União Quimica</h2>
          <form onSubmit={handleLogin}>
            <MDBInput wrapperClass='mb-4' label='Username' id='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
            <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <MDBBtn className='w-100 mb-4' size='md' type="submit">Login</MDBBtn>
          </form>
        </MDBCardBody>
      </MDBCard>
      {errorModalOpen && <ErrorModal onClose={handleCloseErrorModal} selectedLanguage="pt" />}
    </MDBContainer>
  );
}

export default Login;
