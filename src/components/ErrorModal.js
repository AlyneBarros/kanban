import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { VscError } from 'react-icons/vsc';

const ErrorModal = ({ onClose, selectedLanguage }) => {
  const errorMessage = selectedLanguage === 'en' ? "Incorrect username or password. Please check the fields and try again!" : "Usuário ou senha incorretos. Confira os campos e tente novamente!";
  const closeButtonLabel = selectedLanguage === 'en' ? "Close" : "Fechar";
  const errorDialogTitle = selectedLanguage === 'en' ? "Error" : "Erro";

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <VscError style={{ marginLeft: '200px', color: 'red'}} />
          {errorDialogTitle}
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <p style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
          {errorMessage}
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {closeButtonLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ErrorModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  selectedLanguage: PropTypes.string.isRequired,
};

export default ErrorModal;
