import React, { useEffect } from "react"

const Showcase = () => {
  // const { loading, error, products } = useSelector(
  //   (state) => state.productTopGet
  // )
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(getTopProducts())
  // }, [])

  return (
    <div className="showcase">
      {/* <img src="/images/dress1.jpg" alt="dress1"/> */}

      <div className="head">
        <div className="dark-overlay">
          <div className="inner-text">Women Fashoin</div>
        </div>
      </div>
      <div className="categ-container">
        <div className="categ-1">
          <div className="inner-text-small">Beuty</div>
        </div>
        <div className="categ-2">
          <div className="inner-text-small">Class</div>
        </div>
        <div className="categ-3">
          <div className="inner-text-small">Elegant</div>
        </div>
        <div className="categ-4">
          <div className="inner-text-small">Exiciting</div>
        </div>
        {/* <img src="/images/dress10.jpg" alt="dress10"/> */}
      </div>
    </div>
  )
}

export default Showcase
