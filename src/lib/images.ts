/**
 * Central image configuration.
 * Every Unsplash photo used on the site is declared here, so images can be swapped
 * without touching components. Format: images.unsplash.com/photo-<ID>.
 * NOTE: IDs should be spot-checked in a browser before launch; <Photo /> falls back
 * to a branded placeholder if any image fails to load.
 */
const U = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const IMAGES = {
  // Home
  heroMain: U("1518770660439-4636190af475"),
  heroCode: U("1498050108023-c5249f4df085"),
  heroTeam: U("1522071820081-009f0129c71c"),
  whatWeb: U("1460925895917-afdab827c52f"),
  whatApps: U("1551288049-bebda4e38f71"),
  whatStack: U("1555949963-ff9fe0c870eb"),
  whatCustom: U("1531297484001-80022131f5a1"),
  whatAI: U("1526374965328-7f61d4dc18c5"),
  ctaBg: U("1451187580459-43490279c0fa"),
  // About
  aboutHero: U("1497366216548-37526070297c"),
  aboutTeam: U("1522071820081-009f0129c71c"),
  aboutWork: U("1519389950473-47ba0277781c"),
  // Services
  svcEnterprise: U("1454165804606-c3d57bc86b40"),
  svcCustom: U("1555949963-ff9fe0c870eb"),
  svcMobile: U("1512941937669-90a1b58e7e9c"),
  svcData: U("1551288049-bebda4e38f71"),
  svcCloud: U("1558494949-ef010cbdcc31"),
  svcAI: U("1526374965328-7f61d4dc18c5"),
  svcDesign: U("1581091226825-a6a2a5aee158"),
  servicesHero: U("1488590528505-98d2b5aba04b"),
  // Industries
  indIT: U("1518770660439-4636190af475"),
  indBFSI: U("1559136555-9303baea8ebd"),
  indHealth: U("1576091160399-112ba8d25d1d"),
  indEdu: U("1503676260728-1c00da094a0b"),
  indRetail: U("1556742049-0cfed4f6a45d"),
  indProfessional: U("1556761175-5973dc0f32e7"),
  indAgri: U("1500382017468-9049fed747ef"),
  indLogistics: U("1586528116311-ad8dd3c8310d"),
  // Careers & contact
  careersHero: U("1504384308090-c894fdcc538d"),
  careersTeam: U("1519389950473-47ba0277781c"),
  contactHero: U("1497366216548-37526070297c"),
} as const;

export type ImageName = keyof typeof IMAGES;

export function img(name: ImageName, width = 2000, quality = 80) {
  return `${IMAGES[name]}?auto=format&fit=crop&w=${width}&q=${quality}`;
}
