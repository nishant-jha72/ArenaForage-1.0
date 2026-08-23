import HeroSection from "./heroSection-homepage-without-login";
import HomepageAd from "./homepage-ad-section";
import PromoSection from "./advertisement-without-login";
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
