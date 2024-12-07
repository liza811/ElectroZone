import { notFound } from "next/navigation";

import { AboutUs } from "@/app/components/storefront/about-us";
import { PrivacyPolicy } from "@/app/components/storefront/privacy-policy";
import { ReturnPolicy } from "@/app/components/storefront/return-policy";
import { PaymentPolicy } from "@/app/components/storefront/payment-policy";
import { Faq } from "@/app/components/storefront/faq";

export default function Footerr({ params }: { params: { name: string } }) {
  if (!params.name) {
    return notFound();
  }
  if (params.name === "about-us") {
    return <AboutUs />;
  }
  if (params.name === "privacy_policy") {
    return <PrivacyPolicy />;
  }
  if (params.name === "return_policy") {
    return <ReturnPolicy />;
  }
  if (params.name === "payment_policy") {
    return <PaymentPolicy />;
  }
  if (params.name === "FAQ") {
    return <Faq />;
  }

  return notFound();
}
