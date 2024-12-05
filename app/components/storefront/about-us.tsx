export const AboutUs = () => {
  return (
    <main className="mt-5">
      <header className="about-header w-full">
        <div className="w-full">
          <h1 className="font-bold text-[30px]">Welcome to AwraMart!</h1>
          <p className=" text-[16px]">
            Committed to quality, convenience, and customer satisfaction
          </p>
        </div>
      </header>
      <section className="about-section">
        <h2 className="font-bold text-[25px]">About Us</h2>
        <div className="underline"></div>
        <p>
          At AwraMart, we are committed to delivering a seamless shopping
          experience that prioritizes convenience, quality, and customer
          satisfaction. Established with a vision to cater to modern
          consumers&apos; needs, AwraMart has quickly grown into a trusted
          destination for a diverse range of products, handpicked for quality
          and value.
        </p>

        <h3>Our Mission</h3>
        <p>
          Our mission is to provide our customers with access to premium
          products across various categories at competitive prices. We strive to
          combine exceptional quality with outstanding customer service, making
          shopping with us easy, reliable, and enjoyable.
        </p>

        <h3>Our Products</h3>
        <p>
          From electronics, fashion, home essentials, and more, each item on our
          platform is carefully selected to meet the highest standards. We
          believe in offering not just products but also solutions that fit
          seamlessly into your lifestyle, bringing convenience and reliability
          to your doorstep.
        </p>

        <h3>Why Choose AwraMart?</h3>
        <ul>
          <li>
            <strong>Quality Assurance:</strong> Each product undergoes strict
            quality checks to ensure it meets our high standards.
          </li>
          <li>
            <strong>Customer Support:</strong> Our dedicated team is available
            to answer your questions and address any concerns via email at{" "}
            <a href="mailto:help@awramart.ae" className="text-primary ">
              help@awramart.ae
            </a>
            .
          </li>
          <li>
            <strong>Secure Payments:</strong> We offer safe and convenient
            payment options, including card and cash on delivery.
          </li>
          <li>
            <strong>Fast & Trackable Delivery:</strong> With efficient delivery
            partners, we ensure that your orders reach you on time, with
            tracking information provided for peace of mind.
          </li>
        </ul>

        <h3>Our Commitment to You</h3>
        <p>
          AwraMart is more than just a shopping platform—it&rsquo;s a commitment
          to quality, integrity, and customer satisfaction. Every team member at
          AwraMart is dedicated to ensuring that your experience with us is
          outstanding from start to finish. Whether you&apos;re placing your
          first order or are a repeat customer, we’re here to make your shopping
          journey smooth and enjoyable.
        </p>

        <p>Thank you for choosing AwraMart. We look forward to serving you!</p>
      </section>
    </main>
  );
};
