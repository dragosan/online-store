import { Container } from "react-bootstrap"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Order from "./components/order/Order"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import Cart from "./components/cart/Cart"
import PaymentMethod from "./components/cart/PaymentMethod"
import Shipping from "./components/cart/Shipping"

import Footer from "./components/layout/Footer"
import Header from "./components/layout/Header"
import PlaceOrder from "./components/order/PlaceOrder"
import ProductDetails from "./components/product/ProductDetails"
import ProductList from "./components/product/ProductList"
import Profile from "./components/user/Profile"
import UsersList from "./components/admin/UsersList"
import UserEdit from "./components/admin/UserEdit"
import ProductAdmin from "./components/admin/ProductAdmin"
import ProductAdminEdit from "./components/admin/ProductAdminEdit"
import OrderAdmin from "./components/admin/OrderAdmin"
import Offer from "./components/layout/Offer"
import Contact from "./components/layout/Contact"

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Route exact path="/" component={ProductList} />
          <Route exact path="/search/:keyword" component={ProductList} />
          <Route exact path="/page/:pageNumber" component={ProductList} />
          <Route
            exact
            path="/search/:keyword/page/:pageNumber"
            component={ProductList}
          />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/Profile" component={Profile} />
          <Route exact path="/product/:id" component={ProductDetails} />
          <Route exact path="/shipping" component={Shipping} />
          <Route exact path="/payment" component={PaymentMethod} />
          <Route exact path="/placeorder" component={PlaceOrder} />
          <Route exact path="/order/:id" component={Order} />
          <Route exact path="/cart/:id?" component={Cart} />
          {/* admin routs */}
          <Route exact path="/admin/users" component={UsersList} />
          <Route exact path="/admin/users/:id/edit" component={UserEdit} />
          <Route exact path="/admin/products" component={ProductAdmin} />
          <Route
            exact
            path="/admin/products/:pageNumber"
            component={ProductAdmin}
          />
          <Route
            exact
            path="/admin/products/:id/edit"
            component={ProductAdminEdit}
          />
          <Route exact path="/admin/orders" component={OrderAdmin} />
        </Container>
      </main>

      <Footer />
    </Router>
  )
}

export default App
