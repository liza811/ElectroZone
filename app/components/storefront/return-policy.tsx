export const ReturnPolicy = () => {
  return (
    <main className="w-full my-5">
      <div className="return-header">
        <div className="welcome-box">
          <h1>Welcome to AwraMart Return Policy!</h1>
          <p>We Ensure Hassle-Free Returns for Your Peace of Mind</p>
        </div>
      </div>

      <div className="return-section">
        <h2>Return Policy</h2>
        <div className="underline"></div>
        <p>
          We accept returns of eligible items within <strong>3 days</strong> of
          delivery for your convenience.
        </p>

        <h3>1. Conditions for Return</h3>
        <ul>
          <li>
            Items must be in their <strong>original, unused condition</strong>{" "}
            with all packaging intact.
          </li>
          <li>
            Returns must be initiated within <strong>3 days</strong> of
            receiving the product.
          </li>
        </ul>

        <h3>2. How to Initiate a Return</h3>
        <p>
          To start a return, contact our customer support team at{" "}
          <a href="mailto:help@awramart.ae" className="text-primary">
            help@awramart.ae
          </a>{" "}
          with your order details. Once approved, we will provide instructions
          for the return process.
        </p>

        <h3>3. Refund Process</h3>
        <ul>
          <li>
            Refunds will be processed within{" "}
            <strong>[5-10 business days]</strong> upon receipt and inspection of
            the returned item.
          </li>
          <li>
            Refunds will be issued to your{" "}
            <strong>original payment method</strong>.
          </li>
        </ul>

        <h3>4. Non-Returnable Items</h3>
        <p>
          Some items are <strong>ineligible for returns</strong>, including but
          not limited to:
        </p>
        <ul>
          <li>Perishable goods</li>
          <li>Personalized items</li>
          <li>Other specified products</li>
        </ul>
      </div>
    </main>
  );
};
