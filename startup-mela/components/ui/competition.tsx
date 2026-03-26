import PremiumEventCard from "../PremiumEventCard";

export default function Competition() {
  return (
    <div id="competitions" className="w-full min-h-screen bg-black flex flex-col items-center px-6 py-12 gap-10">
      <span className="font-black text-4xl uppercase bg-[#014E87] px-6 py-3 text-white">
        Competitions
      </span>
      <div className="w-full max-w-7xl flex flex-wrap justify-center gap-8">
        <PremiumEventCard
          title="Startup Survival Game"
          description="Run a startup. Face a crisis. Survive."
          category="Competitions"
          type="STARUPMELA"
          phase="Rs 22,000"
          link="/competition/StartupSurvival"
          image="https://images.unsplash.com/photo-1626908013351-800ddd734b8a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHRlY2h8ZW58MHx8MHx8fDA%3D"
        />

        <PremiumEventCard
          title="REBOOTX"
          description="A failed business. A second chance. Your strategy"
          category="Competitions"
          type="STARTUPMELA"
          phase="Rs 22,000"
          link="/competition/Rebootx"
          image="https://images.unsplash.com/photo-1626908013351-800ddd734b8a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHRlY2h8ZW58MHx8MHx8fDA%3D"
        />

        <PremiumEventCard
          title="The Investor's Dilemma"
          description="Rs. 100 Crore to invest. Every rupee must earn its place."
          category="Competitions"
          type="STARTUPMELA"
          phase="Rs 22,000"
          link="/competition/InvestorDilemma"
          image="https://images.unsplash.com/photo-1626908013351-800ddd734b8a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHRlY2h8ZW58MHx8MHx8fDA%3D"
        />

        <PremiumEventCard
          title="IPL Auction"
          description="Bid smart. Build the strongest portfolio in the room."
          category="Competitions"
          type="STARTUPMELA"
          phase="Rs 14,000"
          link="/competition/IPLAuction"
          image="https://images.unsplash.com/photo-1626908013351-800ddd734b8a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHRlY2h8ZW58MHx8MHx8fDA%3D"
        />
      </div>
    </div>
  );
}