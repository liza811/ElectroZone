import {
  CreditCard,
  Mail,
  MessageSquare,
  PhoneCall,
  Receipt,
  University,
  Wallet,
} from "lucide-react";

export const PaymentPolicy = () => {
  return (
    <main className="my-5">
      <header className="payment-header">
        <div className="welcome-box">
          <h1>Welcome to AwraMart!</h1>
          <p>Committed to quality, convenience and customer satisfaction</p>
        </div>
      </header>

      <section className="max-w-6xl bg-[#fff] py-10 px-5 shadow-sm mx-auto ">
        <h2 className="font-bold text-2xl text-center mt-4 ">Payment Policy</h2>
        <div className="underline"></div>

        <h3 className="font-bold text-xl mt-2">1. Accepted Payment Methods</h3>
        <p className="  text-gray-800 text-base my-2">
          We accept the following payment methods to suit your convenience:
        </p>
        <ul className="flex flex-col gap-y-2 text-gray-700 text-sm my-2">
          <li className="flex gap-x-2">
            <CreditCard className="text-primary" size={19} /> Credit/Debit Cards
            (Visa, MasterCard, etc.)
          </li>
          <li className="flex gap-x-2">
            <Receipt className="text-primary" size={19} /> Cash on Delivery
            (COD)
          </li>
          <li className="flex gap-x-2">
            <Wallet className="text-primary" size={19} /> Digital Wallets
            (Google Pay, Apple Pay - Coming Soon)
          </li>
          <li className="flex gap-x-2">
            <University className="text-primary" size={19} /> Bank Transfers
            (For bulk orders)
          </li>
        </ul>

        <h3 className="font-bold text-xl mt-2">
          2. Payment by Credit/Debit Card
        </h3>
        <p className="  text-gray-800 text-base my-2">
          All card payments are securely processed through our third-party
          gateway. Your card details are encrypted, ensuring privacy and safety.
        </p>
        <p>Supported cards: Visa, MasterCard, and American Express.</p>

        <h3 className="font-bold text-xl mt-2">3. Cash on Delivery (COD)</h3>
        <p className="  text-gray-800 text-base my-2">
          Pay in cash at the time of delivery. A nominal COD fee of AED 10 may
          apply for some orders.
        </p>
        <p className="  text-gray-800 text-base my-2">
          <strong>Note:</strong> COD is unavailable for orders exceeding AED
          5,000.
        </p>

        <h3 className="font-bold text-xl mt-2">4. Refunds and Cancellations</h3>
        <p className="  text-gray-800 text-base my-2">
          If you cancel an order, the refund will be processed through the
          original payment method within 5–10 business days. For COD orders,
          refunds can be issued as store credits or bank transfers.
        </p>

        <h3 className="font-bold text-xl mt-2">5. Payment Issues</h3>
        <p className="  text-gray-800 text-base my-2">
          If you encounter any issues during payment, please reach out to our
          support team at <a href="mailto:help@awramart.ae">help@awramart.ae</a>{" "}
          for prompt assistance.
        </p>

        <h3 className="font-bold text-xl mt-2">6. Secure Payments Guarantee</h3>
        <p>
          Your security is our priority. We comply with the PCI DSS (Payment
          Card Industry Data Security Standard) to ensure all card transactions
          are safe. Our website uses SSL encryption to protect your sensitive
          data.
        </p>

        <h3 className="font-bold text-xl mt-2">7. International Payments</h3>
        <p className="  text-gray-800 text-base my-2">
          We accept international cards for most purchases. Currency conversion
          charges may apply, depending on your bank or payment provider.
        </p>

        <h3 className="font-bold text-xl mt-2">8. Promotions and Discounts</h3>
        <p>
          Discount codes or promo vouchers can be applied at checkout. Only one
          promo code is allowed per order. Promo codes cannot be combined with
          COD payment methods.
        </p>

        <h3 className="font-bold text-xl mt-2">9. Payment Policy Updates</h3>
        <p className="  text-gray-800 text-base my-2">
          AwraMart reserves the right to update or amend payment policies at any
          time. Changes will be communicated on our website. Please review this
          section periodically.
        </p>

        <h3 className="font-bold text-xl mt-2">10. Need Help?</h3>
        <p className="  text-gray-800 text-base my-2">
          For further assistance with payment policies, reach out to us:
        </p>
        <ul>
          <li className="flex gap-x-2">
            <Mail className="text-primary" size={19} /> Email:{" "}
            <a href="mailto:help@awramart.ae" className="text-primary">
              help@awramart.ae
            </a>
          </li>
          <li className="flex gap-x-2">
            <PhoneCall className="text-primary" size={19} /> Phone: +971 4 123
            4567
          </li>
          <li className="flex gap-x-2">
            <MessageSquare className="text-primary" size={19} /> Live Chat:
            Available on our website
          </li>
        </ul>
      </section>
    </main>
  );
};
