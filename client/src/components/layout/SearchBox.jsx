import React, { useState } from "react"
import { Form, Button, FormControl } from "react-bootstrap"

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("")

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push("/")
    }
  }
  return (
    <Form onSubmit={submitHandler} inline>
      <FormControl
        type="text"
        name="q"
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
        onChange={(e) => setKeyword(e.target.value)}
      ></FormControl>
      <Button
        type="submit"
        variant="outline-success"
        className="btn-sm p-1 m-1"
      >
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
