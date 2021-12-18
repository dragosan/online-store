import React, { useRef } from "react"
import emailjs from "emailjs-com"
import sendEmail from "../../utils/sendEmail"

import Map from "../layout/Map"
import Countries from "./Countries"

const Contact = () => {
  const form = useRef()
  const email = "mostafamansour2024@gmail.com"

  const onSubmit = (e) => {
    e.preventDefault()
    emailjs
      .sendForm(
        "service_bmtb4rn",
        "template_aqnxaku",
        form.current,
        "user_l5xkuApwcOxiqo9Sum4Ci"
      )
      .then(
        (result) => {
          console.log(result.text)
        },
        (error) => {
          console.log(error.text)
        }
      )
  }
  return (
    <div className="contact container">
      <div className="info">
        <div className="info-data">
          <h2>Contact Info</h2>

          <h3>
            <i className="fas fa-map-marker-alt"></i> Address
          </h3>
          <h3>Maadi Cairo Egypt</h3>
          <h3>
            <i className="fas fa-phone"></i> Phone
          </h3>
          <p>01025132059</p>
          <h3>
            <i className="fas fa-phone-volume"></i> Support
          </h3>
          <a className="email" href={`mailto:${email}`}>
            {email}
          </a>
        </div>
        <div className="info-form">
          <form ref={form} onSubmit={onSubmit}>
            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              id="fname"
              name="user_name"
              placeholder="Your name.. ."
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="user_email"
              placeholder="Your Email.."
              required
            />

            <label htmlFor="country">Country</label>
            <Countries />

            <label htmlFor="subject">Subject</label>
            <textarea
              id="subject"
              name="message"
              placeholder="Write something.."
              style={{ height: "100px" }}
            ></textarea>

            <input className="button" type="submit" value="Submit" />
            {/* TODO: form functionality */}
          </form>
        </div>
      </div>
      <Map />
    </div>
  )
}

export default Contact
