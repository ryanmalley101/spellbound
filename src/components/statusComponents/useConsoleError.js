import {useEffect, useState} from "react";


function useConsoleError() {
  const [errors, setErrors] = useState([]);


  useEffect(() => {
    const originalConsoleError = console.error;

    console.error = (...args) => {
      const id = Date.now();
      setErrors((prevErrors) => [...prevErrors, { id, message: args.join(' ') }]);
      originalConsoleError(...args);

      setTimeout(() => {
        setErrors((prevErrors) => prevErrors.filter(error => error.id !== id));
      }, 5000);
    };

    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  return errors;
}

export default useConsoleError