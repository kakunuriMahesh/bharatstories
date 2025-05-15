import React from "react";
import { Star, Goal, Radio } from "lucide-react";
import SRC from "../assets/SRC.jpg";
import StoryViewer from "../Content/StoryViewer";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="p-[20px] flex flex-col gap-4 items-center">
      <h1 className="text-center mb-6 text-2xl font-bold">About Us</h1>
      <img src={SRC} className="w-[300px] rounded-3xl" alt="" />
      <p className="text-center">
        Our mission is to ensure everybody can easily understand and read Bharat
        Stories
      </p>
      <div>
        <h1 className="font-bold text-2xl mb-2">Our Values</h1>
        <div className="flex md:flex-row flex-col gap-4">
          <div className=" bg-slate-200 dark:bg-slate-800 p-4 rounded-2xl flex flex-col justify-center gap-[20px]">
            <Star size="24" />
            <div>
              <p className="font-bold">Quality</p>
              <p>
                Let us know how we can help with a quick email - we'll get back
                to you as soon as possible.
              </p>
            </div>
          </div>
          <div className=" bg-slate-200 dark:bg-slate-800 p-4 rounded-2xl flex flex-col justify-center gap-[20px]">
            <Goal size="24" />
            <div>
              <p className="font-bold">Precision</p>
              <p>
                Let us know how we can help with a quick email - we'll get back
                to you as soon as possible.
              </p>
            </div>
          </div>
          <div className=" bg-slate-200 dark:bg-slate-800 p-4 rounded-2xl flex flex-col justify-center gap-[20px]">
            <Radio size="24" />
            <div>
              <p className="font-bold"> Accessibility</p>
              <p>
                Let us know how we can help with a quick email - we'll get back
                to you as soon as possible.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <button onClick={()=>navigate("/future-updates")}>Future Updates</button> */}
      <StoryViewer/>
    </div>
  );
};

export default About;
