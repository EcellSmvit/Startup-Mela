import AboutEvent from "@/components/ui/about";
import AboutEcell from "@/components/ui/aboutecell";
import Competition from "@/components/ui/competition";
import ContactPage from "@/components/ui/contactpage";
import Eventhighlights from "@/components/ui/eventhighlight";
import FAQSection from "@/components/ui/faq";
import Herosection from "@/components/ui/Herosection";

export default function Home() {
  return (
    <div>
        <Herosection/>
        <AboutEvent/>
        <Eventhighlights/>
        <Competition/>
        <AboutEcell/>
        <FAQSection/>
        <ContactPage/>
    </div>
  );
}
