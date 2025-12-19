
import { GameLevel, Project } from './types';

export const INITIAL_BALANCE = 50_000_000_000;

export const PROJECTS: Project[] = [
  // LEVEL 1: HUMAN SCALE
  {
    id: 'p1_1',
    name: 'Nationwide Literacy Program',
    cost: 500_000_000,
    description: 'Provide tablets, teachers, and curriculum to every rural village in a developing nation.',
    icon: '📚',
    comparison: 'Roughly the price of a single B-2 Stealth Bomber.',
    level: GameLevel.HUMAN
  },
  {
    id: 'p1_2',
    name: 'Clean Water Initiative',
    cost: 1_200_000_000,
    description: 'Drill 100,000 wells and install filtration systems across drought-stricken regions.',
    icon: '💧',
    comparison: 'Slightly less than the cost of the Dallas Cowboys stadium.',
    level: GameLevel.HUMAN
  },
  {
    id: 'p1_3',
    name: 'Universal Vaccine Drive',
    cost: 800_000_000,
    description: 'Eradicate preventable diseases in three small countries simultaneously.',
    icon: '💉',
    comparison: 'Equivalent to the worldwide box office of a major Marvel movie.',
    level: GameLevel.HUMAN
  },
  {
    id: 'p1_4',
    name: 'Crisis Housing Complex',
    cost: 300_000_000,
    description: 'Construct 5,000 high-efficiency tiny homes for the displaced.',
    icon: '🏠',
    comparison: 'The cost of the most expensive private mansion ever sold.',
    level: GameLevel.HUMAN
  },

  // LEVEL 2: CITY SCALE
  {
    id: 'p2_1',
    name: 'Hyper-Efficient Metro System',
    cost: 8_000_000_000,
    description: 'A magnetic levitation transit network for a major metropolitan area.',
    icon: '🚆',
    comparison: 'The cost of building the Burj Khalifa five times over.',
    level: GameLevel.CITY
  },
  {
    id: 'p2_2',
    name: 'Smart City OS Deployment',
    cost: 5_000_000_000,
    description: 'Retrofit an entire city with AI sensors for traffic, waste, and energy.',
    icon: '🏙️',
    comparison: 'Roughly what Singapore spends on annual infrastructure maintenance.',
    level: GameLevel.CITY
  },
  {
    id: 'p2_3',
    name: 'Renewable Power Grid',
    cost: 12_000_000_000,
    description: 'A massive solar and wind farm array capable of powering 10 million homes.',
    icon: '⚡',
    comparison: 'The price tag of the James Webb Space Telescope.',
    level: GameLevel.CITY
  },

  // LEVEL 3: COUNTRY SCALE
  {
    id: 'p3_1',
    name: 'National Healthcare Network',
    cost: 15_000_000_000,
    description: 'Fully fund a comprehensive public healthcare system for a medium-sized nation for one year.',
    icon: '🏥',
    comparison: 'Equivalent to the GDP of Jamaica.',
    level: GameLevel.COUNTRY
  },
  {
    id: 'p3_2',
    name: 'Space Port Alpha',
    cost: 10_000_000_000,
    description: 'Construct a state-of-the-art orbital launch facility for commercial travel.',
    icon: '🚀',
    comparison: 'Total lifetime cost of the LHC at CERN.',
    level: GameLevel.COUNTRY
  },
  {
    id: 'p3_3',
    name: 'National AI Research Lab',
    cost: 7_000_000_000,
    description: 'A super-computing cluster dedicated to open-source national development.',
    icon: '🧠',
    comparison: 'The annual R&D budget of a top-tier tech giant like Intel.',
    level: GameLevel.COUNTRY
  },

  // LEVEL 4: FUTURE SCALE
  {
    id: 'p4_1',
    name: 'Mars Colony Seed',
    cost: 25_000_000_000,
    description: 'Establish the first self-sustaining life support habitat on the Red Planet.',
    icon: '🔴',
    comparison: 'Half your original starting fortune in one go.',
    level: GameLevel.FUTURE
  },
  {
    id: 'p4_2',
    name: 'AGI Global Alignment',
    cost: 15_000_000_000,
    description: 'The definitive project to ensure Artificial General Intelligence benefits humanity.',
    icon: '🌐',
    comparison: 'The cost of the entire Apollo Moon landing program (adjusted for some inflation).',
    level: GameLevel.FUTURE
  },
  {
    id: 'p4_3',
    name: 'Global Ocean Cleanup',
    cost: 10_000_000_000,
    description: 'Deploy 5,000 autonomous drones to remove all plastic from the Great Pacific Garbage Patch.',
    icon: '🌊',
    comparison: 'Equivalent to the 2014 Sochi Winter Olympics budget.',
    level: GameLevel.FUTURE
  }
];
