import React from 'react'

const Phone = () => {
  return (
    <div>
      <div className="flex  items-center justify-center h-screen bg-gray-300 text-black text-center p-4">
        <div className="flex justify-center ">
          <h1 className="font-bold absolute top-20 text-xl pb-5">
            NOT SUPPORTED
          </h1>
          <p className="text-sm absolute top-30 px-5 font-medium">
            This website is not supported on your current device. For the best
            experience, please use a laptop or desktop with a high performance
            GPU, as this site is built using WebGL.
          </p>

          <a
            href="https://en.wikipedia.org/wiki/WebGL"
            target='_blank'
            className="text-white bg-black px-4 absolute top-60 py-2 rounded-full"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}

export default Phone