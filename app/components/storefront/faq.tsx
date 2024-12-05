"use client";
import { useState } from "react";

export const Faq = () => {
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);

  const toggleFAQ = (questionId: string) => {
    setActiveQuestion(activeQuestion === questionId ? null : questionId);
  };

  const faqCategories = [
    {
      title: "Orders and Delivery",
      items: [
        {
          id: "order1",
          question: "How do I place an order?",
          answer:
            "To place an order, add your items to the cart, proceed to checkout, and follow the instructions to complete the process.",
        },
        {
          id: "order2",
          question: "What are the delivery times?",
          answer:
            "Delivery times vary by location, typically within 3-7 business days.",
        },
      ],
    },
    {
      title: "Payment",
      items: [
        {
          id: "payment1",
          question: "What payment methods are accepted?",
          answer:
            "We accept credit/debit cards (Visa, MasterCard) and Cash on Delivery (COD).",
        },
        {
          id: "payment2",
          question: "Are my payment details secure?",
          answer:
            "Yes, your payment details are encrypted and securely processed through trusted providers.",
        },
      ],
    },
  ];

  return (
    <main className="mt-5">
      <header className="faq-header ">
        <h1 className="font-bold text-[30px]">Frequently Asked Questions</h1>
        <p>Find answers to the most common questions about AwraMart.</p>
      </header>

      <main className="faq-container ">
        {faqCategories.map((category, index) => (
          <section key={index} className="faq-category">
            <h2 className="faq-category-title  text-[24px] font-bold">
              {category.title}
            </h2>
            {category.items.map((item) => (
              <div key={item.id} className="faq-item ">
                <button
                  className={`faq-question text-[16px] font-[400] flex items-center justify-between transition-all ${
                    activeQuestion === item.id
                      ? "bg-primary text-white"
                      : "text-gray-800 bg-[#f4f4f4]"
                  }`}
                  onClick={() => toggleFAQ(item.id)}
                >
                  {item.question}
                  <span
                    className={`icon transform transition-transform duration-300 ${
                      activeQuestion === item.id ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`faq-answer  overflow-hidden transition-all duration-300 ${
                    activeQuestion === item.id ? "max-h-screen" : "max-h-0"
                  }`}
                  style={{
                    maxHeight: activeQuestion === item.id ? "500px" : "0px",
                  }}
                >
                  <div className="py-4 bg-white  text-gray-700">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </section>
        ))}
      </main>
    </main>
  );
};

export default Faq;
