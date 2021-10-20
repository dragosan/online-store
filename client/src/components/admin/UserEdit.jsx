import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import FormContainer from "../layout/FormContainer"
import { getUser, updateUser } from "../../actions/userActions"
import Loader from "../layout/Loader"
import Message from "../layout/Message"
import { UPDATE_USER_RESET } from "../../actions/types"

const UserEdit = ({ match, history }) => {
  const userId = match.params.id
  const dispatch = useDispatch()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = userUpdate

  const userGet = useSelector((state) => state.userGet)
  const { loading, user, error } = userGet

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: UPDATE_USER_RESET })
      history.push("/admin/users")
    } else {
      if (!user || !user.name || user._id !== userId) {
        dispatch(getUser(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [history, user, userId, successUpdate, dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: user._id, name, email, isAdmin }))
  }

  return (
    <>
      <Link to="/admin/users" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEdit
