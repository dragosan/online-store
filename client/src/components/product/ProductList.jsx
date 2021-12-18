import React, { useEffect } from "react"
import { Col, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../../actions/productActions"
import Loader from "../layout/Loader"
import Showcase from "../layout/Showcase"
import Paginate from "../layout/Paginate"
import Product from "./Product"
import Message from "../layout/Message"
import Meta from "../layout/Meta"
import Offer from "../layout/Offer"

const ProductList = ({ match }) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1
  const { loading, error, products, page, pages } = useSelector(
    (state) => state.productList
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />
      <Showcase />
      <Row>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
      <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
      <Offer />
      {/* <ProductSlide /> */}
      {/* <ProductCarousel /> */}
    </>
  )
}

export default ProductList
