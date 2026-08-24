
import Header from "@/src/components/ui/Header/Header";
import Footer from "../components/ui/Footer";
import Faq from "../components/ui/homepage/faq";
import Features from "../components/ui/homepage/features";
import HeroSection from "../components/ui/homepage/heroSec";
import HowItWorks from "../components/ui/homepage/howItWorks";
import Pricing from "../components/ui/homepage/pricing";
import Results from "../components/ui/homepage/results";
import Testimonials from "../components/ui/homepage/testimonials";
import UseCases from "../components/ui/homepage/useCases";

export default function Landing(){
  return(
    <>
    <Header/>
    <HeroSection/>
    <Features/>
    <UseCases/>
    <HowItWorks/>
    <Results/>
    <Pricing/>
    <Testimonials/>
    <Faq/>
    <Footer/>
    </>
  )
}
