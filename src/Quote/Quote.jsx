import React, { useState, useEffect } from 'react';
import { navigate } from "@reach/router"

import { Input, Button } from '../Reusables';

const Quote = ({ setQuote }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [postal, setPostal] = useState('');

  const handleQuoteSubmission = async () => {
    const { quote } = await fetch('https://fed-challenge-api.sure.now.sh/api/v1/quotes', {
      method: 'POST',
      body: JSON.stringify({
        first_name: "Prairie",
        last_name: "Johnson",
        address: {
          line_1: "123 Mulberry Lane",
          line_2: "3B",
          city: "Brooklyn",
          region: "NY",
          postal: "11211"
        }
      }),
    }).then(response => {
      return response.json();
    });

    setQuote(quote);
    navigate('/ratings');
  }

  return (
    <div>
      Quote
      <div>
        <Input value={firstName} onChange={setFirstName} />
        <Input value={lastName} onChange={setLastName} />
        <Input value={line1} onChange={setLine1} />
        <Input value={line2} onChange={setLine2} />
        <Input value={city} onChange={setCity} />
        <Input value={region} onChange={setRegion} />
        <Input value={postal} onChange={setPostal} />
        <Button type="submit" onClick={handleQuoteSubmission} />
      </div>
    </div>
  );
}

export default Quote;