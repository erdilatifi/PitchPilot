import { Button } from "@/components/ui/button"

const Hero = () => {
  return (
    <section className="relative  bg-[#0f0f0f] w-full min-h-[100vh] flex items-center justify-center px-6 text-center  pt-[70px]">
      <img src="/robot.png" alt="robot" className="hidden sm:block absolute top-[30%] right-[0%] w-[400px] opacity-80" />
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6  bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
          Validate Your Startup Idea Instantly with <span className="text-blue-500">AI</span>
        </h1>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl">
          PitchPilot rates your idea and gives actionable feedback—before you write a single line of code.
        </p>
        <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-4 px-8 rounded-xl shadow-md hover:from-blue-600 hover:to-purple-600 transition text-xl">
          Rate Your Idea
        </Button>
      </div>
    </section>
  )
}

export default Hero
