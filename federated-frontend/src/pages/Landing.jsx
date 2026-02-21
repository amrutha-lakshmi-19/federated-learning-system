import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import Stats from "../components/Stats";
import heroImg from "../assets/hero.png"; 
import Footer from "../components/Footer";
const Landing = () => {
  return (
    <>
      <Navbar />
      <HeroSection />

      <section className="pt-4 pb-10 bg-white flex justify-center">
        <img
          src={heroImg}
          alt="Federated Learning Illustration"
          className="w-[90%] md:w-[70%] lg:w-[60%] rounded-2xl shadow-md"
        />
      </section>

      <HowItWorks />
      <Features />
      <Stats />
      <Footer/>
    </>
  );
};

export default Landing;