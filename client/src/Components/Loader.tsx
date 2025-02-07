import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="bg-[#212121] fixed inset-0 w-full h-full flex items-center justify-center">
      <div className="relative w-14 h-14">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-[30%] w-[8%] h-[24%] bg-gray-400 rounded-full shadow-md animate-fade"
            style={{
              transform: `rotate(${i * 30}deg) translate(0, -130%)`,
              animationDelay: `-${(12 - i) * 0.1}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
