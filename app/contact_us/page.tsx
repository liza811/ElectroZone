"use client";
import Image from "next/image";
import { useEffect } from "react";
import "../contact.css";
import { Facebook, Music2, Youtube } from "lucide-react";

const ContactUs = () => {
  useEffect(() => {
    const inputs = document.querySelectorAll<HTMLInputElement>(".input");

    const focusFunc = (event: FocusEvent) => {
      const parent = (event.target as HTMLElement).parentNode as HTMLElement;
      parent.classList.add("focus");
    };

    const blurFunc = (event: FocusEvent) => {
      const parent = (event.target as HTMLInputElement)
        .parentNode as HTMLElement;
      if ((event.target as HTMLInputElement).value === "") {
        parent.classList.remove("focus");
      }
    };

    inputs.forEach((input) => {
      input.addEventListener("focus", focusFunc);
      input.addEventListener("blur", blurFunc);
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("focus", focusFunc);
        input.removeEventListener("blur", blurFunc);
      });
    };
  }, []);

  return (
    <main className="mt-5 w-full">
      <div className="container w-full">
        <span className="big-circle"></span>
        <Image
          src="/shape.png"
          className="square"
          alt=""
          width={50}
          height={50}
        />
        <div className="form">
          <div className="contact-info">
            <h3 className="title">Let&apos;s get in touch</h3>
            <p className="text">
              We would be happy to answer any questions and assist you with your
              needs.
            </p>

            <div className="flex flex-col gap-y-2 w-full">
              <div className="flex gap-x-2 items-start  ">
                <Image src="/location.png" alt="" width={20} height={20} />
                <p>Business Bay Dubai, United Arab Emirates</p>
              </div>
              <div className="flex gap-x-2 ">
                <Image src="/email.png" alt="" width={20} height={20} />
                <p>info@awramart.ae</p>
              </div>
              <div className="flex gap-x-2 ">
                <Image src="/phone.png" alt="" width={20} height={20} />
                <p>+971559968516</p>
              </div>
            </div>

            <div className="social-media">
              <p>Connect with us :</p>
              <div className="social-icons ">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook "
                  className="flex items-center justify-center text-center"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Youtube "
                  className="flex items-center justify-center text-center"
                >
                  <Youtube size={20} />
                </a>
                <a
                  href="https://www.tiktok.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Tiktok "
                  className="flex items-center justify-center text-center"
                >
                  <Music2 size={20} />
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
export default ContactUs;
