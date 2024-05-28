import React from 'react';

function LandingPage() {
  return (
    <section className="">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl text-blue-50">
            Secure Chat for Your Privacy.
            <strong className="font-extrabold text-blue-500 sm:block"> Confidential and Encrypted. </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed text-blue-50">
            Protect your conversations from prying eyes. Our secure chat service offers end-to-end encryption and ensures your privacy.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-blue-500 px-12 py-3 text-sm font-medium text-white shadow hover:bg-transparent focus:outline-none focus:ring  sm:w-auto border border-blue-500"
              href="#"
            >
              Get Started Now
            </a>

            <a
              className="block w-full rounded px-12 py-3 text-sm font-medium text-blue-500 border border-blue-500 shadow hover:text-blue-50 focus:outline-none focus:ring  sm:w-auto"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingPage;
