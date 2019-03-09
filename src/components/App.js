import * as React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Paper, CssBaseline } from '@material-ui/core';
import axios from 'axios';
import Header from './TopBar';
import Notes from './Notes';

const style = {
  root: {
    padding: 20
  }
};

axios.defaults.baseURL = 'http://localhost:4000';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Header />
        <Paper style={style.root} component="main">
          <Switch>
            <Route exact path="/" render={ () => { return <Notes/> } } /> 
          </Switch>
        </Paper>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
