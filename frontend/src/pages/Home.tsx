import HeroSection from "../components/home/HeroSection";
import HomepageAd from "../components/home/HomepageAd";
import PromoSection from "../components/home/PromoSection";
export default function Home() {
  return (
    <div className="w-full bg-black">
      <section id="hero">
        <HeroSection />
      </section>
      <section id="testimonials">
        <HomepageAd />
      </section>
      <section id="promo">
        <PromoSection />
      </section>
    </div>
  );
}
