import { useState, useCallback } from "react";

const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const resetForm = useCallback(
    (newValues = initialValues) => {
      setValues(newValues);
    },
    [initialValues]
  );

  return { values, handleChange, resetForm };
};

export default useForm;
