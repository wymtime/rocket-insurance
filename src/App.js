import React, { useState } from 'react';
import { Router } from "@reach/router"

import Quote from './Quote/Quote';
import Ratings from './Ratings/Ratings';

import styles from './App.module.css';

const App = () => {
  const [quote, setQuote] = useState({});

  return (
    <div className={styles.app}>
      <header className={styles.header}>
          Rocket Insurance
      </header>
      <Router>
        <Quote path="quote" setQuote={setQuote} default />
        <Ratings path="ratings" quote={quote} />
      </Router>
    </div>
  );
}

export default App;