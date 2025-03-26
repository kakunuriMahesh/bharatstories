import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import { TeEn } from "../Utils/TeEn";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { HomeBannerShimmer } from "../components/Loading/storyShimmer";

const HomeBanner = () => {
  const navigate = useNavigate();
  const { stories, filteredStories } = useOutletContext();

  const language = useSelector((state) => state.language.language);

  const allTitles = stories.flatMap((each) => each.bannerImge);
  const allNames = stories.flatMap((each) => each.name);

  const handleViewAll = (storyName) => {
    navigate(`/viewstory/${storyName}`);
  };
  console.log(allTitles, allNames, stories, "allTitles");

  const isLoading = !allTitles || !allNames;


  return (
    <div className="relative w-full">
      {isLoading ? (
        <HomeBannerShimmer/>
      ) : (
        <Swiper
          modules={[Pagination, Autoplay, EffectFade]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          effect="fade"
          className="w-full"
        >
          {allTitles.map((eachTitle, index) => (
            <SwiperSlide key={index}>
              <div
                onClick={() => handleViewAll(allNames[index]["en"])}
                className="relative lg:h-[55vh] md:h-[50vh] h-[35vh] w-full bg-cover bg-top bg-no-repeat cursor-pointer rounded-lg"
                style={{ backgroundImage: `url(${eachTitle})` }}
              >
                <div className="relative opacity-[0.4] h-full w-full rounded-lg"></div>
                <div className="absolute left-4 bottom-3 text-white">
                  <h1 className="text-white opacity-[0.9] font-extrabold text-[30px] md:text-[50px]">
                    {allNames[index][language]}
                  </h1>
                  <p>Parts</p>
                  <p className="text-[10px] font-semibold">ENG / TEL</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      
      <style jsx>{`
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.6);
          opacity: 1;
          transition: background 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background: white;
          width: 12px;
          height: 12px;
        }
      `}</style>
    </div>
  );
};

export default HomeBanner;
