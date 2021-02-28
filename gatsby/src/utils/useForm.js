import { useState } from 'react';

const useForm = (defaults) => {
  const [values, setValues] = useState(defaults);
  const updateValues = (e) => {
    const { value } = e.target;
    setValues({
      ...values,
      [e.target.name]: e.target.type === 'number' ? +value : value,
    });
  };

  return { values, updateValues };
};

export default useForm;
