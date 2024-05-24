import { memo } from 'react';
import PropTypes from 'prop-types';

const Input = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      className="w-full h-12 px-4 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired, 
  onChange: PropTypes.func.isRequired,
};

const MemoizedInput = memo(Input);
export default MemoizedInput;
