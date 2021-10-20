import React, { useEffect } from "react"
import { LinkContainer } from "react-router-bootstrap"
import { Table, Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../layout/Loader"
import Message from "../layout/Message"
import {
  createProduct,
  deleteProduct,
  getProducts,
} from "../../actions/productActions"
import { CREATE_PRODUCT_RESET } from "../../actions/types"
import Paginate from "../layout/Paginate"

const ProductAdmin = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch()

  const auth = useSelector((state) => state.auth)
  const { userInfo } = auth

  const productList = useSelector((state) => state.productList)
  const { loading, products, error, pages, page } = productList

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    createdProduct,
    success: successCreate,
    error: errorCreate,
  } = productCreate

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login")
    }
    if (successCreate) {
      history.push(`/admin/products/${createdProduct._id}/edit`)
    } else {
      dispatch(getProducts("", pageNumber))
    }
    dispatch({
      type: CREATE_PRODUCT_RESET,
    })
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/products/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default ProductAdmin
