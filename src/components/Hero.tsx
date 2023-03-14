const appConfig = require("../../package.json");

const Hero = () => {
  return (
    <div className="w-full px-6 text-gray-800 md:max-w-2xl lg:max-w-3xl md:h-full md:flex md:flex-col dark:text-gray-100">
      <h1 className="text-4xl font-semibold text-center mt-6 sm:mt-[20vh] ml-auto mr-auto mb-10 sm:mb-16 flex gap-2 items-center justify-center">
        {appConfig.name}
      </h1>
      <p className="py-10 text-center">请友好请求。。。😐</p>
      <div className="md:w-[600px] text-lg md:mx-auto leading-8">
        <div className="flex">
          <div className="w-28">version</div>
          <div>{appConfig.version}</div>
        </div>
        <div className="flex">
          <div className="w-28">description</div>
          <div>{appConfig.description}</div>
        </div>
        <div className="flex">
          <div className="w-28">homepage</div>
          <div>
            <a
              href={appConfig.homepage}
              target="_blank"
              rel="noopener noreferrer"
            >
              {appConfig.homepage}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
