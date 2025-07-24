import AiAgent from "./AiAgent/page";
import AnyCollaboration from "./AnyCollaboration/page";
import AnySolution from "./AnySolution/page";
import AnyWorkflow from "./AnyWorkflow/page";
import Brands from "./Brands/page";
import ClientTestimonal from "./ClientTestimonal/page";
import DeeplyDesigned from "./DeeplyDesigned/page";
import HomeHero from "./Hero/page";
import HomeCTA from "./HomeCTA/page";
import HomeVideo from "./HomeVideo/page";
import PowerWorkflow from "./PowerWorkflow/page";
import Recognition from "./Recognition/page";
import SeeYourWork from "./SeeyourWork/page";

export default function HomeIndex() {
  return (
    <>
      <HomeHero />
      <Brands />
      <HomeVideo />
      <AiAgent />
      <AnyWorkflow />
      <AnySolution />
      <PowerWorkflow />
      <SeeYourWork />
      <AnyCollaboration />
      <DeeplyDesigned />
      <ClientTestimonal />
      <Recognition />
      <HomeCTA />
    </>
  );
}
