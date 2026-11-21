export const BUILTIN_PAGES = [
  'home',
  'about',
  'programs',
  'hire',
  'youth-support',
  'partnerships',
  'sponsors',
  'holiday-drop',
  'merch',
  'donate',
  'contact',
] as const;

export type BuiltinPageSlug = (typeof BUILTIN_PAGES)[number];
export type TemplateType = 'campaign' | 'program' | 'spotlight' | 'gallery';

export interface CustomPageCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
  linkLabel: string;
  linkUrl: string;
}

export interface CustomPageData {
  id: string;
  slug: string;
  title: string;
  templateType: TemplateType;
  published: boolean;
  showInNav: boolean;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  ctaLabel: string;
  ctaTarget: string;
  sectionTitle: string;
  sectionBody: string;
  sectionImage: string;
  cards: CustomPageCard[];
  ownerId?: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface SiteSettingsData {
  id: string;
  brandName: string;
  logoUrl: string;
  announcementBadge: string;
  announcementText: string;
  announcementCta: string;
  announcementVisible: boolean;
  pagesOrder: string[];
  hiddenPages: string[];
  pageLabels: Record<string, string>;
  textOverrides: Record<string, string>;
  imageOverrides: Record<string, string>;
  updatedBy?: string;
  updatedAt?: unknown;
}

export interface MediaAssetData {
  id: string;
  name: string;
  mimeType: string;
  dataUrl: string;
  width: number;
  height: number;
  sizeBytes: number;
  isPublic: boolean;
  uploadedBy?: string;
  createdAt?: unknown;
}

export const DEFAULT_PAGE_LABELS: Record<BuiltinPageSlug, string> = {
  home: 'Home',
  about: 'About',
  programs: 'Programs',
  hire: 'Hire Project 201',
  'youth-support': 'Youth Support',
  partnerships: 'Schools & Partnerships',
  sponsors: 'Sponsors & Partners',
  'holiday-drop': 'Holiday Drop',
  merch: 'Merch',
  donate: 'Donate',
  contact: 'Contact',
};

export const DEFAULT_SITE_SETTINGS: SiteSettingsData = {
  id: 'published',
  brandName: 'PROJECT 201',
  logoUrl: 'https://cdn.prod.website-files.com/676454c7900c0070c4219d2a/67a1e7a94e7d4cbcfd580329_uc.png',
  announcementBadge: '🍕 Pizzeria Partner',
  announcementText: 'Help Project 201 acquire a passenger van for our youth!',
  announcementCta: 'Scan QR / Zeffy',
  announcementVisible: true,
  pagesOrder: [...BUILTIN_PAGES],
  hiddenPages: [],
  pageLabels: { ...DEFAULT_PAGE_LABELS },
  textOverrides: {},
  imageOverrides: {},
};

export interface PageTemplatePreset {
  type: TemplateType;
  name: string;
  summary: string;
  badge: string;
  defaults: Omit<CustomPageData, 'id' | 'slug' | 'title' | 'ownerId' | 'createdAt' | 'updatedAt'>;
}

export const PAGE_TEMPLATES: PageTemplatePreset[] = [
  {
    type: 'campaign',
    name: 'Campaign & Fundraising Landing',
    summary: 'Hero banner with call-to-action, featured story split with photo, and 3-column impact highlights.',
    badge: 'Campaign',
    defaults: {
      templateType: 'campaign',
      published: true,
      showInNav: true,
      heroEyebrow: 'Project 201 Community Initiative',
      heroTitle: 'Support Our Next Community Drive',
      heroSubtitle:
        'Rallying families, local businesses, and youth leaders across New Jersey to create meaningful access and opportunity.',
      heroImage: 'https://lh3.googleusercontent.com/d/17g5VEHcANuRmly8jBswRPBmp6lrgupXq',
      ctaLabel: 'Get Involved Today',
      ctaTarget: 'donate',
      sectionTitle: 'Why This Campaign Matters',
      sectionBody:
        'Every dollar and volunteer hour expands safe athletic spaces, mentorship sessions, and community workshops for students across Hudson and Bergen counties.',
      sectionImage: 'https://lh3.googleusercontent.com/d/10NdIV7FeIt5tIMhFOWKsiMuM-uyhI_Db',
      cards: [
        {
          id: 'card-1',
          badge: 'Direct Impact',
          title: 'Equipment & Gear Access',
          subtitle: 'Zero Cost to Families',
          description: 'Supplying gloves, training gear, and safe athletic equipment to every registered youth athlete.',
          image: 'https://lh3.googleusercontent.com/d/14Bbiwk_VYTyHK4mIsDK6GoPHe7HNYARh',
          linkLabel: 'Support Gear Fund',
          linkUrl: 'donate',
        },
        {
          id: 'card-2',
          badge: 'Mentorship',
          title: 'Weekly Accountability Circles',
          subtitle: 'Consistent Coaching',
          description: 'Guided check-ins focused on school performance, personal goals, and leadership habits.',
          image: 'https://lh3.googleusercontent.com/d/1nTPDEyLCS3fLcD4bRXn06ZVbBOGdhnSS',
          linkLabel: 'View Programs',
          linkUrl: 'programs',
        },
        {
          id: 'card-3',
          badge: 'Community',
          title: 'Local Partner Network',
          subtitle: 'Statewide Allies',
          description: 'Local restaurants, gyms, and schools collaborating to host safe events and mentorship nights.',
          image: 'https://lh3.googleusercontent.com/d/1YBRTvldGcoB_fA8vuIstjmUAyl8dlHT5',
          linkLabel: 'Partner With Us',
          linkUrl: 'contact',
        },
      ],
    },
  },
  {
    type: 'program',
    name: 'Program & Event Showcase',
    summary: 'Structured banner, detailed program overview with side image, and schedule/session cards.',
    badge: 'Program',
    defaults: {
      templateType: 'program',
      published: true,
      showInNav: true,
      heroEyebrow: 'Structured Youth Programming',
      heroTitle: 'Seasonal Training & Community Workshops',
      heroSubtitle:
        'Hands-on athletic conditioning, boxing fundamentals, and peer leadership clinics open to NJ youth.',
      heroImage: 'https://lh3.googleusercontent.com/d/13zHLJ8oTLd-goOxDLITydzZfFCmCABlk',
      ctaLabel: 'Register Youth Participant',
      ctaTarget: 'hire',
      sectionTitle: 'What Athletes Experience',
      sectionBody:
        'Our curriculum blends speed and agility drills with calm emotional discipline, helping youth transfer athletic confidence straight into the classroom and home.',
      sectionImage: 'https://lh3.googleusercontent.com/d/1L0cLNuH8hdJchCD0BIgyFzZIm0BJLWlF',
      cards: [
        {
          id: 'prog-1',
          badge: 'Session 01',
          title: 'Athletic Foundations',
          subtitle: 'Tuesdays & Thursdays',
          description: 'Footwork, coordination, conditioning circuits, and injury-prevention mechanics.',
          image: 'https://lh3.googleusercontent.com/d/14Bbiwk_VYTyHK4mIsDK6GoPHe7HNYARh',
          linkLabel: 'Enroll Now',
          linkUrl: 'hire',
        },
        {
          id: 'prog-2',
          badge: 'Session 02',
          title: 'Mentorship Roundtable',
          subtitle: 'Weekly Huddles',
          description: 'Small-group goal tracking, conflict resolution, and positive accountability coaching.',
          image: 'https://lh3.googleusercontent.com/d/1nTPDEyLCS3fLcD4bRXn06ZVbBOGdhnSS',
          linkLabel: 'Request Support',
          linkUrl: 'youth-support',
        },
      ],
    },
  },
  {
    type: 'spotlight',
    name: 'Team & Community Spotlight',
    summary: 'Editorial story hero, featured quote/mission split, and profile cards for coaches, partners, or honorees.',
    badge: 'Spotlight',
    defaults: {
      templateType: 'spotlight',
      published: true,
      showInNav: true,
      heroEyebrow: 'People Behind The Mission',
      heroTitle: 'Coaches, Mentors & Community Champions',
      heroSubtitle:
        'Meet the dedicated leaders, volunteers, and local allies showing up every week for New Jersey youth.',
      heroImage: 'https://lh3.googleusercontent.com/d/1M0HwqaNFccK3FFxPfUQxTeOSzkyv33_3',
      ctaLabel: 'Join Our Team',
      ctaTarget: 'contact',
      sectionTitle: 'Built On Consistency & Trust',
      sectionBody:
        'Every mentor and partner at Project 201 is vetted, trained, and committed to long-term relationships that help young people feel seen and supported.',
      sectionImage: 'https://lh3.googleusercontent.com/d/10NdIV7FeIt5tIMhFOWKsiMuM-uyhI_Db',
      cards: [
        {
          id: 'spot-1',
          badge: 'Leadership',
          title: 'Coaching & Mentorship Staff',
          subtitle: 'Certified NJ Mentors',
          description: 'USA Boxing and Rutgers Youth Sports Safety certified leaders guiding weekly sessions.',
          image: 'https://lh3.googleusercontent.com/d/13aND3E8KNJgCn80zUh8EdNjXop5E3HEH',
          linkLabel: 'Meet Our Team',
          linkUrl: 'about',
        },
        {
          id: 'spot-2',
          badge: 'Community Ally',
          title: 'Neighborhood Sponsors',
          subtitle: 'Local Business Backing',
          description: 'Community hubs providing meals, safe meeting spaces, and equipment sponsorships.',
          image: 'https://lh3.googleusercontent.com/d/1Ds-o_Hg5Qm2fA0sS7ybSnlHCI8dlMCpt',
          linkLabel: 'View Sponsors',
          linkUrl: 'sponsors',
        },
      ],
    },
  },
  {
    type: 'gallery',
    name: 'Photo Gallery & Announcements',
    summary: 'Clean visual showcase grid for uploading event photos, flyers, recaps, and community updates.',
    badge: 'Gallery',
    defaults: {
      templateType: 'gallery',
      published: true,
      showInNav: true,
      heroEyebrow: 'Moments In Action',
      heroTitle: 'Community Gallery & Highlights',
      heroSubtitle:
        'Photos, flyers, and recaps from our training sessions, mentorship circles, and statewide outings.',
      heroImage: 'https://lh3.googleusercontent.com/d/1enyTSJEjOfzEUFRQ0zKE4qCvxjuwlSry',
      ctaLabel: 'Contact Our Team',
      ctaTarget: 'contact',
      sectionTitle: 'Latest Field Highlights',
      sectionBody:
        'Click any photo or card inside /console to swap in newly uploaded images, event flyers, and community updates.',
      sectionImage: 'https://lh3.googleusercontent.com/d/1fOWZZzWRgsNZS_aB_tCyNqSvYrcidgHe',
      cards: [
        {
          id: 'gal-1',
          badge: 'Training',
          title: 'Speed & Agility Drills',
          subtitle: 'Bayonne / Jersey City',
          description: 'Youth athletes building footwork, balance, and confidence together.',
          image: 'https://lh3.googleusercontent.com/d/1TCtwj6nM05Y7Y5lR_rsyYNF6IbErmzL4',
          linkLabel: 'Explore Programs',
          linkUrl: 'programs',
        },
        {
          id: 'gal-2',
          badge: 'Community',
          title: 'Mentorship Outings',
          subtitle: 'Weekend Field Trips',
          description: 'Shared meals, team conversations, and positive peer bonding outside the gym.',
          image: 'https://lh3.googleusercontent.com/d/1kkrGaepZ_PN04fwyxvycAiymBpr_fmkh',
          linkLabel: 'Support Youth',
          linkUrl: 'donate',
        },
        {
          id: 'gal-3',
          badge: 'Athletics',
          title: 'Boxing Conditioning',
          subtitle: 'Discipline & Focus',
          description: 'Structured pad work and heavy bag conditioning led by certified trainers.',
          image: 'https://lh3.googleusercontent.com/d/13zHLJ8oTLd-goOxDLITydzZfFCmCABlk',
          linkLabel: 'Book A Session',
          linkUrl: 'hire',
        },
      ],
    },
  },
];
