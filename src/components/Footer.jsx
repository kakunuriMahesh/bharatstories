import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import logo from "../assets/Krishna-2/dharmChakra.jpg";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true); // Set loading state
console.log(email, "email check");
    try {
      // Subscribe to backend API
      const response = await fetch("https://bharat-story-backend.vercel.app/api/subscribers/new-subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      console.log(response, "onclick response of subscription");
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Subscription API error:", response.status, errorText);
        throw new Error("Subscription failed");
      }

      // Send thank-you email via EmailJS
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_78sy4cn";
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_b3s2acs";
      const userId = import.meta.env.VITE_EMAILJS_USER_ID || "I3FrnElOF94OEwk9Z";

      const emailResult = await emailjs.send(
        serviceId,
        templateId,
        {
          email: email,
          name: "Thank You for Subscribing",
          message: "Thank you for subscribing to Bharat Stories! We're excited to keep you updated with the latest stories and updates.",
        },
        userId
      );
      console.log("Thank-you email sent:", emailResult);

      // Update UI
      setIsSubscribed(true);
      setIsLoading(false); // Reset loading state
      setShowModal(true);
      setEmail(""); // Reset email input
    } catch (err) {
      setError("Failed to subscribe or send email. Please try again.");
      console.error("Subscription error:", err);
      setIsLoading(false); // Reset loading state
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setIsSubscribed(false); // Allow re-subscription after closing modal
  };

  return (
    <div className="p-[30px] flex flex-col items-center dark:text-text-dark text-text-light bg-slate-200 dark:bg-slate-800">
      <div className="flex md:items-start justify-between flex-col md:flex-row gap-4">
        <div className="flex md:flex-row md:gap-[60px] flex-col gap-4 items-center">
          <h1 className="text-2xl font-bold">Bharat Stories</h1>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="flex flex-col md:items-start items-center">
              <h2 className="font-bold">Stories</h2>
              <ul className="flex flex-col md:items-start items-center">
                <li>
                  <a href="#">Krishna</a>
                </li>
                <li>
                  <a href="#">MahaBharatha</a>
                </li>
                <li>
                  <a href="#">Bhagavath Geetha</a>
                </li>
                <li>
                  <a href="#">Ramayana</a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col md:items-start items-center">
              <h2 className="font-bold">Resources</h2>
              <ul className="flex flex-col md:items-start items-center">
                <li>
                  <a href="#">archive.org</a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col md:items-start items-center">
              <h2 className="font-bold">Contact</h2>
              <ul className="flex flex-col md:items-start items-center">
                <li>
                  <a href="#">Email</a>
                </li>
                <li>
                  <a href="#">Phone</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-bold text-2xl">
            Get the latest updates from Bharat Stories
          </p>
          <form onSubmit={handleSubscribe}>
            <input
              className="text-left dark:text-text-dark text-text-light bg-text-dark dark:bg-text-light pr-[45px] pl-[20px] w-[100%] h-[60px] rounded-[20px]"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className={`bg-slate-700 text-white h-[40px] rounded-md ${
                isSubscribed
                  ? "cursor-not-allowed"
                  : " dark:bg-slate-50 dark:text-slate-700 hover:bg-slate-600 dark:hover:bg-slate-200"
              } mt-2 w-full`}
              disabled={isSubscribed}
            >
              {isLoading ? "Sending..." : "Subscribe"}
            </button>
          </form>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-[50px] md:text-sm text-xs">
        <p>Copyright 2025</p>
        <p>
          Design and Developed by{" "}
          <a href="https://srcdesigns.in">SRC Designs</a>
        </p>
      </div>

      {/* Thank You Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="flex flex-col items-center bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <img src={logo} className="w-[45px]" alt="logo"/>
            <h2 className="text-2xl font-bold mb-4 text-text-light dark:text-text-dark">
            Thank you for subscribing to Bharat Stories!
            </h2>
            <p className="text-text-light dark:text-text-dark mb-6">
               You'll receive updates
              on our latest stories and content.
            </p>
            <button
              onClick={closeModal}
              className="bg-green-800 text-white py-2 px-4 rounded-md w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;

// import React, { useState } from "react";

// const Footer = () => {
//   const [email, setEmail] = useState("");
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSubscribe = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:5000/api/subscribers/new-subscribe', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });
//       console.log(response, 'response check');

//       if (!response.ok) {
//         throw new Error('Subscription failed');
//       }

//       setIsSubscribed(true);
//       setError(null);
//     } catch (err) {
//       setError('Failed to subscribe. Please try again.');
//       console.error(err);
//     }
//   };

//   return (
//     <div className="p-[30px] flex flex-col items-center dark:text-text-dark text-text-light bg-slate-200 dark:bg-slate-800">
//       <div className="flex md:items-start justify-between flex-col md:flex-row gap-4">
//         <div className="flex md:flex-row md:gap-[60px] flex-col gap-4 items-center">
//           <h1 className="text-2xl font-bold">Bharat Stories</h1>
//           <div className="grid md:grid-cols-3 gap-5">
//             <div className="flex flex-col md:items-start items-center">
//               <h2 className="font-bold">Stories</h2>
//               <ul className="flex flex-col md:items-start items-center">
//                 <li>
//                   <a href="#">Krishna</a>
//                 </li>
//                 <li>
//                   <a href="#">MahaBharatha</a>
//                 </li>
//                 <li>
//                   <a href="#">Bhagavath Geetha</a>
//                 </li>
//                 <li>
//                   <a href="#">Ramayana</a>
//                 </li>
//               </ul>
//             </div>
//             <div className="flex flex-col md:items-start items-center">
//               <h2 className="font-bold">Resources</h2>
//               <ul className="flex flex-col md:items-start items-center">
//                 <li>
//                   <a href="#">archive.org</a>
//                 </li>
//               </ul>
//             </div>
//             <div className="flex flex-col md:items-start items-center">
//               <h2 className="font-bold">Contact</h2>
//               <ul className="flex flex-col md:items-start items-center">
//                 <li>
//                   <a href="#">Email</a>
//                 </li>
//                 <li>
//                   <a href="#">Phone</a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-col gap-4">
//           <p className="font-bold text-2xl">
//             Get the latest updates from Bharat Stories
//           </p>
//           <form onSubmit={handleSubscribe}>
//             <input
//               className="text-left dark:text-text-dark text-text-light bg-text-dark dark:bg-text-light pr-[45px] pl-[20px] w-[100%] h-[60px] rounded-[20px]"
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <button
//               type="submit"
//               className={`h-[40px] rounded-md ${
//                 isSubscribed
//                   ? 'bg-green-500 text-white'
//                   : 'bg-slate-700 dark:bg-slate-50 text-white dark:text-slate-700'
//               }`}
//               disabled={isSubscribed}
//             >
//               {isSubscribed ? 'Subscribed' : 'Subscribe'}
//             </button>
//           </form>
//           {error && <p className="text-red-500 text-sm">{error}</p>}
//         </div>
//       </div>
//       <div className="flex justify-center gap-4 mt-[50px] md:text-sm text-xs">
//         <p>Copyright 2025</p>
//         <p>
//           Design and Developed by{" "}
//           <a href="https://srcdesigns.in">SRC Designs</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Footer;


// FIXME: without subscription

// // import React from "react";

// // const Footer = () => {
// //   return (
// //     <div className="p-[30px] flex flex-col items-center dark:text-text-dark text-text-light bg-slate-200 dark:bg-slate-800">
// //       <div className="flex md:items-start justify-between flex-col md:flex-row gap-4">
// //         <div className="flex md:flex-row md:gap-[60px] flex-col gap-4 items-center">
// //           <h1 className="text-2xl font-bold">Bharat Stories</h1>
// //           <div className="grid md:grid-cols-3 gap-5">
// //             <div className="flex flex-col md:items-start items-center">
// //               <h2 className="font-bold">Stories</h2>
// //               <ul className="flex flex-col md:items-start items-center">
// //                 <li>
// //                   <a href="#">Krishna</a>
// //                 </li>
// //                 <li>
// //                   <a href="#">MahaBharatha</a>
// //                 </li>
// //                 <li>
// //                   <a href="#">Bhagavath Geetha</a>
// //                 </li>
// //                 <li>
// //                   <a href="#">Ramayana</a>
// //                 </li>
// //               </ul>
// //             </div>
// //             <div className="flex flex-col md:items-start items-center">
// //               <h2 className="font-bold">Resources</h2>
// //               <ul className="flex flex-col md:items-start items-center">
// //                 <li>
// //                   <a href="#">archive.org</a>
// //                 </li>
// //               </ul>
// //             </div>
// //             <div className="flex flex-col md:items-start items-center">
// //               <h2 className="font-bold">Contact</h2>
// //               <ul className="flex flex-col md:items-start items-center">
// //                 <li>
// //                   <a href="#">Email</a>
// //                 </li>
// //                 <li>
// //                   <a href="#">Phone</a>
// //                 </li>
// //               </ul>
// //             </div>
// //           </div>
// //         </div>
// //         <div className="flex flex-col gap-4">
// //           <p className="font-bold text-2xl">
// //             Get the latest updates from Bharat Stories
// //           </p>
// //           <input
// //             className="text-left dark:text-text-dark text-text-light bg-text-dark dark:bg-text-light  pr-[45px] pl-[20px] w-[100%] h-[60px] rounded-[20px]"
// //             type="email"
// //             placeholder="Enter your email"
// //           />
// //           <button className="bg-slate-700 dark:bg-slate-50 text-white dark:text-slate-700 h-[40px] rounded-md">
// //             Subscribe
// //           </button>
// //         </div>
// //       </div>
// //       <div className="flex justify-center gap-4 mt-[50px] md:text-sm text-xs">
// //         <p>Copyright 2025</p>
// //         <p>
// //           Design and Developerd by{" "}
// //           <a href="https://srcdesigns.in">SRC Designs</a>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Footer;
