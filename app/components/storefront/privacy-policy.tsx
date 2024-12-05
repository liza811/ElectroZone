export const PrivacyPolicy = () => {
  return (
    <main className="my-5">
      <div className="privacy-header">
        <div className="welcome-box">
          <h1 className="font-bold text-[28px]">
            Welcome to AwraMart Privacy Policy!
          </h1>
          <p className=" text-[15px]">
            Protecting Your Data, Ensuring Your Trust
          </p>
        </div>
      </div>

      <div className="privacy-section">
        <h2 className="font-bold text-[25px]">Privacy Policy</h2>
        <div className="underline"></div>

        <h3>1. Information We Collect</h3>
        <p>
          We gather personal data that you willingly provide when engaging with
          our Website, such as:
        </p>
        <ul>
          <li>
            <strong>Contact Details:</strong> Your name, email address, and
            phone number.
          </li>
          <li>
            <strong>Transaction Information:</strong> Shipping and billing
            details.
          </li>
          <li>
            <strong>Payment Details:</strong> Securely processed information
            related to your purchases.
          </li>
        </ul>

        <h3>2. How We Use Your Information</h3>
        <p>We process your personal information to:</p>
        <ul>
          <li>Manage and fulfill your orders.</li>
          <li>Communicate updates about your orders or account.</li>
          <li>
            Enhance your shopping experience through personalized services.
          </li>
          <li>Meet legal and security requirements.</li>
        </ul>

        <h3>3. Sharing and Disclosure</h3>
        <p>
          Your personal data remains confidential. However, we may share limited
          data:
        </p>
        <ul>
          <li>
            With <strong>trusted service providers</strong>, like shipping
            companies, to process and deliver your orders.
          </li>
          <li>
            When required by <strong>law or legal obligations</strong>.
          </li>
        </ul>

        <h3>4. Data Security</h3>
        <p>
          We use industry-standard measures to safeguard your data, such as
          encryption and secure servers. However, no system is entirely
          risk-free.
        </p>

        <h3>5. Your Rights</h3>
        <p>
          You have the right to access, update, or request deletion of your
          data. Please contact us at{" "}
          <a href="mailto:help@awramart.ae" className="text-primary">
            help@awramart.ae
          </a>{" "}
          for any inquiries.
        </p>
      </div>
    </main>
  );
};
