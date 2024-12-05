"use client";
import Image from "next/image";
import { useEffect } from "react";

export const ContactUs = () => {
  useEffect(() => {
    // Select all input elements with the class 'input'
    const inputs = document.querySelectorAll(".input");

    // Define the focus function
    const focusFunc = (event: { target: { parentNode: any } }) => {
      const parent = event.target.parentNode;
      parent.classList.add("focus");
    };

    // Define the blur function
    const blurFunc = (event: {
      target: { parentNode: any; value: string };
    }) => {
      const parent = event.target.parentNode;
      if (event.target.value === "") {
        parent.classList.remove("focus");
      }
    };

    // Add event listeners to each input
    inputs.forEach((input) => {
      input.addEventListener("focus", focusFunc);
      input.addEventListener("blur", blurFunc);
    });

    // Cleanup event listeners on component unmount
    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("focus", focusFunc);
        input.removeEventListener("blur", blurFunc);
      });
    };
  }, []); // Empty dependency array ensures this runs once after the component mounts

  return (
    <main className="mt-5">
      <div className="container">
        <span className="big-circle"></span>
        <Image src="/img/shape.png" className="square" alt="" />
        <div className="form">
          <div className="contact-info">
            <h3 className="title">Let&apos;s get in touch</h3>
            <p className="text">
              We would be happy to answer any questions and assist you with your
              needs.
            </p>

            <div className="info">
              <div className="information">
                <Image src="/img/location.png" className="icon" alt="" />
                <p>Business Bay Dubai, United Arab Emirates</p>
              </div>
              <div className="information">
                <Image src="/img/email.png" className="icon" alt="" />
                <p>info@awramart.ae</p>
              </div>
              <div className="information">
                <Image src="/img/phone.png" className="icon" alt="" />
                <p>+971559968516</p>
              </div>
            </div>

            <div className="social-media">
              <p>Connect with us :</p>
              <div className="social-icons">
                <a href="#" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <span className="circle one"></span>
            <span className="circle two"></span>

            <form action="https://api.web3forms.com/submit" method="POST">
              <h3 className="title">Contact us</h3>
              <input
                type="hidden"
                name="access_key"
                value="ec56a1f1-8b6d-4ab9-8259-1da8e55ae495"
              />
              <div className="input-container">
                <input type="text" name="name" className="input" required />
                <label htmlFor="name">Username</label>
                <span>Username</span>
              </div>
              <div className="input-container">
                <input type="email" name="email" className="input" required />
                <label htmlFor="email">Email</label>
                <span>Email</span>
              </div>
              <div className="input-container">
                <input type="tel" name="phone" className="input" required />
                <label htmlFor="phone">Phone</label>
                <span>Phone</span>
              </div>
              <div className="input-container textarea">
                <textarea name="message" className="input" required></textarea>
                <label htmlFor="message">Message</label>
                <span>Message</span>
              </div>
              <input type="checkbox" name="botcheck" className="hidden" />
              <input type="submit" value="Send" className="btn" />
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};
