import FirstPage from "./components/FirstPage";
import DestinationsSection from "./components/DestinationsSection";
import Membership from "@/app/components/Membership";
// import TestimonialsSection from "@/app/components/TestimonialsSection";
import TestimonialsFromApi from "@/app/components/TestimonialsFromApi";


export default function Home() {
  return (
    <main>
      <FirstPage />
      <DestinationsSection />
      <Membership />
      <TestimonialsFromApi />
    </main>
  );
}
