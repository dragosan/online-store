import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Offer = () => {
  const auth = useSelector((state) => state.auth)
  const { userInfo } = auth

  return (
    <div className="offer custom-container">
      <div className="grid-image">
        <img src="/images/discounts.jpg" alt="" />
      </div>
      <div className="offer-text">
        <h2>Enjoy our discounts</h2>
        <p>Become a member to get all our great offers</p>
        <p>
          {userInfo && userInfo.name
            ? "Contact Us"
            : "if not a member now ,please Register"}{" "}
        </p>
        <Link
          to={userInfo && userInfo.name ? "/contact" : "register"}
          style={{ width: "100%", textAlign: "center" }}
        >
          <button className="button colored">
            {userInfo && userInfo.name ? "Contact Us" : "Register"}
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Offer
