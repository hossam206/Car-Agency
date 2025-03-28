import { contentLoader } from "./classNames";

const ContentLoader = () => {
  return (
    <div className="flex justify-center h-screen items-center">
      <div className={contentLoader.loaderStyle}></div>
    </div>
  );
};

export default ContentLoader;
