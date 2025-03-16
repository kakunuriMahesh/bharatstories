import React from "react";

// Shimmer component that matches your layout
const StoryShimmer = () => {
  return (
    <div className="px-[20px] pb-[20px]">
      {/* StoryDisplay shimmer - assuming it's a header or title */}
      <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-6"></div>

      {/* Two section shimmers to match your typical content */}
      {[1, 2].map((_, index) => (
        <div key={index} className="py-[10px]">
          {/* Heading shimmer */}
          <div className="h-9 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-[5px]"></div>

          {/* Quote shimmer */}
          <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-[15px]"></div>

          {/* Image shimmer */}
          <div className="flex items-center justify-start">
            <div className="w-full md:w-[500px] h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-[20px] animate-pulse"></div>
          </div>

          {/* Text shimmer - multiple lines */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-4/5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

// StoriesList Shimmer
const StoriesListShimmer = () => {
  return (
    <div className="my-[10px]">
      <div className="w-[260px] h-[350px] border-2 rounded-[20px]">
        <div className="h-[350px] bg-gray-200 dark:bg-gray-700 p-1 rounded-[20px] flex flex-col justify-between animate-pulse">
          <div>
            {/* Image shimmer */}
            <div className="w-full h-[150px] bg-gray-300 dark:bg-gray-600 rounded-tr-[20px] rounded-tl-[20px]"></div>

            {/* Story type shimmer */}
            <div className="mt-3 px-[10px] py-[3px]">
              <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>

            {/* Title and description shimmer */}
            <div className="p-[10px] space-y-2">
              <div className="h-5 w-3/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-3 w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-3 w-5/6 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          </div>

          {/* Date and time shimmer */}
          <div className="px-[10px] pb-[10px]">
            <div className="h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// HomeBanner Shimmer
const HomeBannerShimmer = () => {
  return (
    <div className="relative w-full">
      <div className="relative lg:h-[55vh] md:h-[50vh] h-[35vh] w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse">
        {/* Overlay shimmer */}
        <div className="relative opacity-[0.4] h-full w-full rounded-lg bg-gray-300 dark:bg-gray-600"></div>

        {/* Text content shimmer */}
        <div className="absolute left-4 bottom-3">
          <div className="h-10 md:h-14 w-64 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
          <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
          <div className="h-3 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>

        {/* Pagination dots shimmer */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="w-[10px] h-[10px] bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Content Shimmer
const ContentShimmer = () => {
  return (
    <div className="mt-[10px] px-[20px] pb-[20px]">
      {/* HomeBanner shimmer */}
      <HomeBannerShimmer />

      {/* Two story sections shimmer */}
      {[1, 2].map((_, index) => (
        <div key={index} className="animate-pulse">
          {/* Header shimmer */}
          <div className="flex justify-between mt-[10px]">
            <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>

          {/* Stories list shimmer */}
          <div className="mt-[10px] flex gap-2">
            {[1, 2, 3].map((_, cardIndex) => (
              <StoriesListShimmer key={cardIndex} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Export all components
export { StoryShimmer, StoriesListShimmer, HomeBannerShimmer, ContentShimmer };

// import React from "react";

// // Shimmer component that matches your layout
// const StoryShimmer = () => {
//   return (
//     <div className="px-[20px] pb-[20px]">
//       {/* StoryDisplay shimmer - assuming it's a header or title */}
//       <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-6"></div>

//       {/* Two section shimmers to match your typical content */}
//       {[1, 2].map((_, index) => (
//         <div key={index} className="py-[10px]">
//           {/* Heading shimmer */}
//           <div className="h-9 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-[5px]"></div>

//           {/* Quote shimmer */}
//           <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-[15px]"></div>

//           {/* Image shimmer */}
//           <div className="flex items-center justify-start">
//             <div className="w-full md:w-[500px] h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-[20px] animate-pulse"></div>
//           </div>

//           {/* Text shimmer - multiple lines */}
//           <div className="space-y-2">
//             <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
//             <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
//             <div className="h-4 w-4/5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StoryShimmer;
