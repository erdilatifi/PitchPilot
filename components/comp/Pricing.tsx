import { Button } from "@/components/ui/button";

const Pricing = () => {
  return (
    <section
      id="pricing"
      className="py-24 px-6 sm:px-12 md:px-20  text-white text-center flex justify-center"
    >
      <div className="max-w-xl w-full mx-auto bg-[#18181b] rounded-3xl shadow-2xl border border-[#232526] p-12 flex flex-col items-center">
        <h2 className="text-5xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
          Subscribe
        </h2>
        <p className="text-gray-300 mb-10 text-lg">
          Get started and validate unlimited startup ideas instantly with AI-powered feedback.
        </p>
        <div className="flex flex-col items-center mb-10">
          <span className="text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
            $30
          </span>
          <span className="text-lg text-gray-400 font-medium mt-2">per month</span>
        </div>
        <Button
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-4 rounded-xl shadow-md hover:from-blue-600 hover:to-purple-600 transition text-xl"
          size="lg"
          onClick={() => window.location.href = '/payments'}
        >
          Checkout
        </Button>
      </div>
    </section>
  );
};

export default Pricing;
