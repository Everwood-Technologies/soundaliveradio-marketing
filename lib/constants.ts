export const SITE_NAME = "Sound Alive Radio";

export const BRAND = {
  tagline: "The World's First Fully Decentralized Radio Network",
  poweredBy: "Powered by Evernode DePIN",
  pioneer: "Developed and Pioneered by Super Producer E. Smitty",
  website: "https://soundaliveradio.net",
  handle: "@SoundAliveRadio",
  revolution: "Revolutionizing Broadcasting with Blockchain Technology",
} as const;

export const NAV_LINKS = [
  { href: "/discover", label: "Discover" },
  { href: "/channels", label: "Channels" },
  { href: "/about", label: "About" },
  { href: "/subscription", label: "Subscription" },
] as const;

export const TRUST_BAR = [
  "Powered by Evernode DePIN",
  "Censorship-resistant",
  "Direct artist payouts",
  "No gatekeepers",
] as const;

export const HERO = {
  headline: SITE_NAME,
  tagline: BRAND.tagline,
  subheadline:
    "24/7 streaming. Built on Evernode. No middlemen. Direct artist-to-listener connections and crypto payouts.",
  cta: "Tune In Live",
} as const;

/* Pitch deck: The Problem */
export const THE_PROBLEM = {
  title: "The Problem",
  intro:
    "Traditional radio and music streaming face significant challenges. The global music industry is valued at $26 billion, but independent artists capture only a fraction due to these barriers.",
  points: [
    {
      title: "Centralized Control",
      description:
        "Gatekeepers like major labels and platforms dictate content, limiting artist exposure and diversity.",
    },
    {
      title: "Middlemen and Fees",
      description:
        "High costs, royalties deductions, and inefficient distribution reduce earnings for creators.",
    },
    {
      title: "Censorship and Accessibility",
      description:
        "Content is often restricted by geography, regulations, or corporate agendas, stifling innovation.",
    },
    {
      title: "Lack of Decentralization",
      description:
        "Reliance on centralized servers leads to downtime, data vulnerabilities, and unequal access.",
    },
  ],
} as const;

/* Pitch deck: The Solution */
export const THE_SOLUTION = {
  title: "The Solution",
  intro:
    "Sound Alive Radio is the pioneering decentralized radio station, eliminating middlemen through blockchain technology.",
  points: [
    {
      title: "Powered by Evernode DePIN",
      description:
        "Built on the XRP Ledger (XRPL), leveraging decentralized physical infrastructure for seamless, permissionless broadcasting.",
    },
    {
      title: "24/7 Streaming",
      description:
        "Raw beats, soulful rhymes, and electrifying vibes without interruptions or censorship.",
    },
    {
      title: "Web3 Integration",
      description:
        "Blockchain-driven: direct artist-to-listener connections, crypto payouts, and untamed creative freedom.",
    },
    {
      title: "Free from Gatekeepers",
      description:
        "Empowers independent artists with global reach in a middleman-free ecosystem.",
    },
  ],
} as const;

/* Pitch deck: Product Overview */
export const PRODUCT_OVERVIEW = {
  title: "Product Overview",
  coreFeatures: [
    "24/7 live streaming of diverse music genres, curated by visionary producer E. Smitty.",
    "Free mobile app for easy access on iOS and Android.",
    "Decentralized hosting via Evernode, ensuring reliability and scalability with $EVR and $XRP tokens.",
    "Artist submission portal integrated with Sound Alive Records for blockchain-based distribution.",
  ],
  userExperience:
    "Listeners tune in via web or app for high-energy content; artists upload and monetize directly.",
  technicalEdge:
    "Permissionless DePIN eliminates single points of failure, providing a robust, censorship-resistant platform.",
} as const;

export const STATS = [
  { value: "12+", label: "Live Channels" },
  { value: "50+", label: "Artists" },
  { value: "10K+", label: "Listeners" },
  { value: "100%", label: "On-Chain Royalties" },
] as const;

export const WHY_SOUND_ALIVE = [
  {
    title: "Fully decentralized",
    description:
      "No single point of failure. Runs on Evernode DePIN across the XRPL/Xahau ecosystem.",
  },
  {
    title: "Artist-first royalties",
    description:
      "Subscriptions and tips go on-chain directly to artists. No intermediaries taking a cut.",
  },
  {
    title: "Always on",
    description:
      "24/7 autonomous streams. No middlemen, no gatekeepers, no takedowns.",
  },
  {
    title: "Community-owned",
    description:
      "Governance and rewards live on XRPL/Xahau. Owned by the artists and listeners.",
  },
] as const;

export const FOOTER = {
  product: [
    { label: "Discover", href: "/discover" },
    { label: "Channels", href: "/channels" },
    { label: "Subscription", href: "/subscription" },
    { label: "Listen Live", href: "#listen" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Advertise", href: "/advertise" },
    { label: "Artist", href: "/discover" },
    { label: "Contact", href: "#" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy-policy" },
    { label: "Terms", href: "#" },
  ],
  downloadApp: "Download the App",
  poweredBy: "Powered by Evernode DePIN on XRPL",
  pioneer: "Developed and Pioneered by Super Producer E. Smitty",
  website: "https://soundaliveradio.net",
  handle: "@SoundAliveRadio",
} as const;

export const DISCOVER = {
  heroTitle: "Discover the Artists Shaping the Future",
  heroSub: "Stream their channels. Support them on-chain.",
  searchPlaceholder: "Search artists...",
  submitCta:
    "Are you an artist? Submit your music via our portal, integrated with Sound Alive Records for blockchain-based distribution and your own 24/7 channel.",
  listenToChannel: "Listen to their channel",
  supportArtist: "Support this artist",
} as const;

export const CHANNELS = {
  heroTitle: "Live Channels - Always On - Fully Decentralized",
  heroSub: "Tune in to any channel. No sign-up required.",
  tuneIn: "Tune In",
  nowPlaying: "Now Playing",
} as const;

export const SUBSCRIPTION = {
  heroTitle: "Choose Your Sound Alive Plan",
  heroSub:
    "Listen free with ads, or upgrade to Premium and Pro for ad-free channels, badges, and exclusive perks.",
  connectWallet: "Connect XRPL Wallet",
  artistTiers: "Subscription Plans",
  allAccess: "All-Access",
  selectTier: "Choose Plan",
} as const;

export const TIER_BENEFITS = [
  "Ad-free listening",
  "Exclusive drops",
  "Early access",
  "NFT perks",
  "Governance rights",
  "Higher royalty share",
  "Badge",
] as const;
