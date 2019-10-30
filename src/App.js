import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { AppBar, CssBaseline, Toolbar, Typography } from '@material-ui/core';

import { ConditionalRoute } from './Reusables';
import Quote from './Quote/Quote';
import Rating from './Rating/Rating';
import useRating from './useRating';

import styles from './App.module.css';

const App = () => {
  const [quote, setQuote] = useState();
  const [rating, updateName, updateAddress] = useRating();

  return (
    <>
      <CssBaseline />
      <Router>
        <AppBar position="relative">
          <Toolbar>
            <Typography
              variant="h6"
              gutterBottom
            >
              Rocket Insurance
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          <Switch>
            <Route path="/rating" exact>
              <Rating
                rating={rating}
                updateName={updateName}
                updateAddress={updateAddress}
                setQuote={setQuote}
              />
            </Route>
            <ConditionalRoute
              path="/quote"
              redirectPath="/rating"
              condition={!!quote}
            >
              <Quote quote={quote} />
            </ConditionalRoute>
            <Redirect to="/rating" />
          </Switch>
        </main>
      </Router>
    </>
  );
};

export default App;
