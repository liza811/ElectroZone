import { footerCategories } from "@/lib/categories";
import { Facebook, Music2, Youtube } from "lucide-react";

import Link from "next/link";

export async function Footer() {
  const cats = await footerCategories();
  return (
    <footer className="footer">
      <div className="container">
        <div className="flex justify-around">
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li>
                <Link href="/Company/about-us">About Us</Link>
              </li>
              <li>
                <Link href="/Company/privacy_policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/Company/return_policy">Return Policy</Link>
              </li>
              <li>
                <Link href="/Company/payment_policy">Payment Policy</Link>
              </li>
              <li>
                <Link href="/Company/FAQ">FAQ</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Online Shop</h4>
            <ul>
              {cats.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/category/${cat.id}`}>{cat.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact Us</h4>
            <Link href="/contact_us" className="btn-contact">
              Contact Us
            </Link>
            <h4>Follow Us</h4>
            <div className="social-links">
              <Link
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 flex items-center justify-center"
              >
                <Facebook size={20} />
              </Link>

              <Link
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 flex items-center justify-center"
              >
                <Youtube size={20} />
              </Link>

              <Link
                href="https://www.tiktok.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 flex items-center justify-center"
              >
                <Music2 size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
    // <footer className="footer mt-5">
    //   <div className="container">
    //     <div className="row">
    //       <div className="footer-col">
    //         <h4>company</h4>
    //         <ul>
    //           <li>
    //             <Link href="#">about us</Link>
    //           </li>
    //           <li>
    //             <Link href="#">our services</Link>
    //           </li>
    //           <li>
    //             <Link href="#">privacy policy</Link>
    //           </li>
    //           <li>
    //             <Link href="#">affiliate program</Link>
    //           </li>
    //         </ul>
    //       </div>
    //       <div className="footer-col">
    //         <h4>get help</h4>
    //         <ul>
    //           <li>
    //             <Link href="#">FAQ</Link>
    //           </li>
    //           <li>
    //             <Link href="#">shipping</Link>
    //           </li>
    //           <li>
    //             <Link href="#">returns</Link>
    //           </li>
    //           <li>
    //             <Link href="#">order status</Link>
    //           </li>
    //           <li>
    //             <Link href="#">payment options</Link>
    //           </li>
    //         </ul>
    //       </div>
    //       <div className="footer-col">
    //         <h4>online shop</h4>
    //         <ul>
    //           <li>
    //             <Link href="#">watch</Link>
    //           </li>
    //           <li>
    //             <Link href="#">bag</Link>
    //           </li>
    //           <li>
    //             <Link href="#">shoes</Link>
    //           </li>
    //           <li>
    //             <Link href="#">dress</Link>
    //           </li>
    //         </ul>
    //       </div>
    //       <div className="footer-col">
    //         <h4>follow us</h4>
    //         <div className="social-links">
    //           <a href="#" className="flex justify-center items-center p-2">
    //             <Facebook size={22} className="mx-auto my-auto" />
    //           </a>
    //           <Link href="#" className="flex justify-center items-center p-2">
    //             <Twitter size={22} className="mx-auto my-auto" />
    //           </Link>
    //           <Link href="#" className="flex justify-center items-center p-2">
    //             <Instagram size={22} className="mx-auto my-auto" />
    //           </Link>
    //           <Link href="#" className="flex justify-center items-center p-2">
    //             <Linkedin size={22} className="mx-auto my-auto" />
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </footer>
    // <footer className="  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
    //   <div className="border-t  pt-8">
    //     <p className="text-xs leading-5 text-gray-700">
    //       &copy; 2024 Awramart. All Rights Reserved.
    //     </p>
    //   </div>
    // </footer>
  );
}
