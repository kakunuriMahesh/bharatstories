import React from "react";
import { Mail,Phone,MapPin   } from "lucide-react";
// import {Phone} from "lucide-react";
// import {Location} from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
      <div className="p-[20px]">
        <h1 className="text-center mb-6 text-2xl font-bold">Contact Us</h1>
        <div className="flex md:flex-row flex-col gap-4">
          <div className=" bg-slate-200 dark:bg-slate-800 p-4 rounded-2xl flex flex-col justify-center gap-[20px]">
            <Mail size="24" />
            <div>
              <p className="font-bold">Email Us</p>
              <p>
                Let us know how we can help with a quick email - we'll get back to
                you as soon as possible.
              </p>
            </div>
            <a href="mailto:srcdesigns.gmail.com">srcdesigns.gmail.com</a>
          </div>
          <div className=" bg-slate-200 dark:bg-slate-800 p-4 rounded-2xl flex flex-col justify-center gap-[20px]">
            <Phone  size="24" />
            <div>
              <p className="font-bold">Phone</p>
              <p>
                Let us know how we can help with a quick email - we'll get back to
                you as soon as possible.
              </p>
            </div>
            <a href="tel:9109876543">9109876543</a>
          </div>
          <div className=" bg-slate-200 dark:bg-slate-800 p-4 rounded-2xl flex flex-col justify-center gap-[20px]">
            <MapPin  size="24" />
            <div>
              <p className="font-bold"> Address</p>
              <p>
                Let us know how we can help with a quick email - we'll get back to
                you as soon as possible.
              </p>
            </div>
            <a href="https://vishakapatnam">Vishakapatnam</a>
          </div>
        </div>
      </div>
    );
};

export default Contact;
