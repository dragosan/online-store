import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../layout/Loader"
import Message from "../layout/Message"
import { getTopProducts } from "../../actions/productActions"

const ProductSlide = () => {
  const { loading, error, products } = useSelector(
    (state) => state.productTopGet
  )
  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(getTopProducts())
  // }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div class="grid-show">
      {products.map((product) => (
        <img src={product.image} alt={product.name} />
      ))}
    </div>
  )
}

export default ProductSlide
