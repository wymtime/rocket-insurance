import { useState } from 'react';

const useRating = () => {
  const [name, setName] = useState({
    firstName: '',
    lastName: '',
  });

  const [address, setAddress] = useState({
    line1: '',
    line2: '',
    city: '',
    region: '',
    postal: '',
  });


  const updateName = (field, value) => {
    setName({
      ...name,
      [field]: value,
    });
  };

  const updateAddress = (field, value) => {
    setAddress({
      ...address,
      [field]: value,
    });
  };

  const rating = {
    ...name,
    address,
  };

  return [rating, updateName, updateAddress];
};

export default useRating;
