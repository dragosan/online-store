import React from "react"
import { Helmet } from "react-helmet"

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="decription" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: "Welcome To Shop-online",
  description: "Cheapest prices for great quality",
  keywords: "electronics, buy electronics, cheap electroincs",
}

export default Meta
