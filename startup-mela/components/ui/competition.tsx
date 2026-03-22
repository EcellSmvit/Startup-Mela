import PremiumEventCard from "../PremiumEventCard";

export default function Competition() {
  return (
    <div id="competitions" className="w-full min-h-screen bg-black flex flex-col items-center px-6 py-12 gap-10">
      <span className="font-black text-4xl uppercase bg-[#014E87] px-6 py-3 text-white">
        Competition
      </span>

      <div className="w-full max-w-7xl flex flex-wrap justify-center gap-8">
        <PremiumEventCard
          title="Startup Survival Game"
          description="Run a startup. Face a crisis. Survive."
          category="Competitions"
          type="Technical"
          phase="Rs 22,000"
          link="/competition/StartupSurvival"
          image="https://images.unsplash.com/photo-1581092335397-9583eb92d232"
        />

        <PremiumEventCard
          title="REBOOTX"
          description="A failed business. A second chance. Your strategy"
          category="Competitions"
          type="Technical"
          phase="Rs 22,000"
          link="/competition/Rebootx"
          image="https://plus.unsplash.com/premium_photo-1675432656807-216d786dd468?w=600&auto=format&fit=crop&q=60"
        />

        <PremiumEventCard
          title="The Investor's Dilemma"
          description="Rs. 100 Crore to invest. Every rupee must earn its place."
          category="Competitions"
          type="Technical"
          phase="Rs 22,000"
          link="/competition/InvestorDilemma"
          image="https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=600&auto=format&fit=crop&q=60"
        />

        <PremiumEventCard
          title="IPL Auction"
          description="Bid smart. Build the strongest portfolio in the room."
          category="Competitions"
          type="Technical"
          phase="Rs 14,000"
          link="/competition/IPLAuction"
          image="https://images.unsplash.com/photo-1565787154274-c8d076ad34e7?w=600&auto=format&fit=crop&q=60"
        />
        <PremiumEventCard
          title="IPL Auction"
          description="Bid smart. Build the strongest portfolio in the room."
          category="Speaker Session"
          type="Technical"
          phase="Rs 14,000"
          link="/competition/IPLAuction"
          image="https://images.unsplash.com/photo-1565787154274-c8d076ad34e7?w=600&auto=format&fit=crop&q=60"
        />
      </div>
    </div>
  );
}