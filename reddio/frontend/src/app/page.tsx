import SectionAbout from "../features/Landing/components/SectionAbout";
import SectionFAQ from "../features/Landing/components/SectionFAQ";
import SectionHero from "../features/Landing/components/SectionHero";
import SectionHowWeWork from "../features/Landing/components/SectionHowWeWork";
import SectionOurTeam from "../features/Landing/components/SectionOurTeam";

const LandingPage = () => {
  return (
    <>
      <SectionHero />
      <SectionAbout />
      <SectionHowWeWork />
      <SectionOurTeam />
      <SectionFAQ />
    </>
  );
};

export default LandingPage;
