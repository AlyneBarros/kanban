import React, { useState } from "react";

const ConfigModal = ({ isOpen, onClose, setCardWidth, setColumnWidth, setContainerHeight }) => {
  const [newCardWidth, setNewCardWidth] = useState('');
  const [newColumnWidth, setNewColumnWidth] = useState('');
  const [newContainerHeight, setNewContainerHeight] = useState('');

  const handleSave = () => {
    // Aplicar as configurações alteradas
    if (newCardWidth !== '') {
      setCardWidth(newCardWidth);
    }
    if (newColumnWidth !== '') {
      setColumnWidth(newColumnWidth);
    }
    if (newContainerHeight !== '') {
      setContainerHeight(newContainerHeight);
    }
    onClose(); // Fechar o modal após salvar as configurações
  };

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <div className="box">
          <h2 className="title is-4">Configurações</h2>
          <div className="field">
            <label className="label">Tamanho do Card:</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Novo tamanho do card"
                value={newCardWidth}
                onChange={(e) => setNewCardWidth(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Tamanho da Coluna:</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Novo tamanho da coluna"
                value={newColumnWidth}
                onChange={(e) => setNewColumnWidth(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Altura do Container:</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Nova altura do container"
                value={newContainerHeight}
                onChange={(e) => setNewContainerHeight(e.target.value)}
              />
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-primary" onClick={handleSave}>Salvar</button>
            </div>
            <div className="control">
              <button className="button" onClick={onClose}>Cancelar</button>
            </div>
          </div>
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
    </div>
  );
};

export default ConfigModal;
