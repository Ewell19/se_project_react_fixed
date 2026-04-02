import { useState, useCallback, useRef } from "react";

const useForm = (initialValues = {}) => {
  const initialValuesRef = useRef(initialValues);
  const [values, setValues] = useState(initialValues);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const resetForm = useCallback((newValues) => {
    setValues(newValues !== undefined ? newValues : initialValuesRef.current);
  }, []);

  const setValue = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  return { values, handleChange, resetForm, setValue };
};

export default useForm;
