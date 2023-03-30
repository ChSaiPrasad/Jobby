import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import Login from './Components/Login'

import Home from './Components/Home'
import Jobs from './Components/Jobs'

import JobItemDetails from './Components/JobItemDetails'
import NotFound from './Components/NotFound'
import Protected from './Components/Protected'

import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <Protected exact path="/" component={Home} />
        <Protected exact path="/jobs" component={Jobs} />
        <Protected exact path="/jobs/:id" component={JobItemDetails} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    )
  }
}

export default App
