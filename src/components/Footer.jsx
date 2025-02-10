import React from "react";

const Footer = () => {
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
          <input
            className="text-left dark:text-text-dark text-text-light bg-text-dark dark:bg-text-light  pr-[45px] pl-[20px] w-[100%] h-[60px] rounded-[20px]"
            type="email"
            placeholder="Enter your email"
          />
          <button className="bg-slate-700 dark:bg-slate-50 text-white dark:text-slate-700 h-[40px] rounded-md">
            Subscribe
          </button>
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-[50px] md:text-sm text-xs">
        <p>Copyright 2025</p>
        <p>
          Design and Developerd by{" "}
          <a href="https://srcdesigns.in">SRC Designs</a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
