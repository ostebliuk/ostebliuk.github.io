import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Head from './head'
import Header from './header'
import Main from './main'
import Basket from './basket'

const Home = () => {
  return (
    <div>
      <Head title="Hello" />
      <Header />
      <Switch>
        <Route exact path="/" component={() => <Main />} />
        <Route exact path="/basket" component={() => <Basket />} />
      </Switch>
    </div>
  )
}

Home.propTypes = {}

export default Home
