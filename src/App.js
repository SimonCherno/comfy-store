import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import {Home, About, Error, SingleProduct, Products, PrivetRoute, Cart, Checkout, AuthWrapper} from './pages'

function App() {
  return <>
    <AuthWrapper>
    <Router>
      <Navbar />
      <Sidebar />
      <Switch>
        <Route exact path = '/'>
          <Home />
        </Route>
        <Route path = '/about'>
          <About />
        </Route>
        <Route path = '/cart'>
          <Cart />
        </Route>
        <Route exact path = '/products'>
          <Products />
        </Route>
        <Route path ='/products/:id' children = {<SingleProduct />} />
        <PrivetRoute path = '/checkout'>
          <Checkout />
        </PrivetRoute>
        <Route path= '*'>
          <Error />
        </Route>
      </Switch>
      <Footer />
    </Router>
    </AuthWrapper>
  </>
}

export default App
