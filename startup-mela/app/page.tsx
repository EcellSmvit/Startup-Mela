import AboutEvent from "@/components/ui/about";
import Competition from "@/components/ui/competition";
import ContactPage from "@/components/ui/contactpage";
import Eventhighlights from "@/components/ui/eventhighlight";
import FAQSection from "@/components/ui/faq";
import Herosection from "@/components/ui/Herosection";
import SpeakerComingSoon from "@/components/ui/speaker";
import SponsorSection from "@/components/ui/sponsorsection";

export default function Home() {
  return (
    <div>
        <Herosection/>
        <AboutEvent/>
        <Eventhighlights/>
        <Competition/>
        <SpeakerComingSoon/>
        <SponsorSection/>
        <FAQSection/>
        <ContactPage/>
    </div>
  );
}
