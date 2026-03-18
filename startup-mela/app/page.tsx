import AboutEvent from "@/components/ui/about";
import Eventhighlights from "@/components/ui/eventhighlight";
import Herosection from "@/components/ui/Herosection";

export default function Home() {
  return (
    <div>
        <Herosection/>
        <AboutEvent/>
        <Eventhighlights/>
    </div>
  );
}
