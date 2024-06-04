import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { VscError } from 'react-icons/vsc';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
`;

const ModalTitle = styled.h2`
  font-weight: bold;
  color: red;
  margin-left: 20px;
`;

const ModalText = styled.p`
  font-family: Arial, Helvetica, sans-serif;
`;

const CloseButton = styled.button`
  background-color: #3182ce;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
`;

const ErrorModal = ({ onClose, selectedLanguage }) => {
  const errorMessage = selectedLanguage === 'en' ? "Incorrect username or password. Please check the fields and try again!" : "Usuário ou senha incorretos. Confira os campos e tente novamente!";
  const closeButtonLabel = selectedLanguage === 'en' ? "Close" : "Fechar";
  const errorDialogTitle = selectedLanguage === 'en' ? "Error" : "Erro";

  return (
    <ModalContainer>
      <ModalContent>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <VscError style={{ marginLeft: '20px', color: 'red'}} />
          <ModalTitle>{errorDialogTitle}</ModalTitle>
        </div>
        <ModalText>{errorMessage}</ModalText>
        <CloseButton onClick={onClose}>{closeButtonLabel}</CloseButton>
      </ModalContent>
    </ModalContainer>
  );
};

ErrorModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  selectedLanguage: PropTypes.string.isRequired,
};

export default ErrorModal;
