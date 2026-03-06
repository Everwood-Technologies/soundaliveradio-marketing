import { CHANNEL_COVERS } from "@/app/assets/channels/channels";

/**
 * Mock data for channels, artists, and subscription tiers.
 * Replace with API or CMS data when backend is ready.
 */

export const MOCK_CHANNELS = [
  {
    id: "1",
    name: "Hip-Hop",
    slug: "hiphop",
    genre: "Hip-Hop",
    coverUrl: CHANNEL_COVERS.hiphop.src,
    nowPlaying: "Artist - Track Name",
    listeners: "2.4K",
  },
  {
    id: "2",
    name: "House",
    slug: "house",
    genre: "Electronic",
    coverUrl: CHANNEL_COVERS.house.src,
    nowPlaying: "DJ Set - Live Mix",
    listeners: "1.8K",
  },
  {
    id: "3",
    name: "Rock",
    slug: "rock",
    genre: "Rock",
    coverUrl: CHANNEL_COVERS.rock.src,
    nowPlaying: "Band - Song",
    listeners: "1.2K",
  },
  {
    id: "4",
    name: "Talk",
    slug: "talk",
    genre: "Talk",
    coverUrl: CHANNEL_COVERS.talk.src,
    nowPlaying: "Host - Episode",
    listeners: "890",
  },
];

export const MOCK_ARTISTS = [
  {
    id: "1",
    name: "Artist One",
    genre: "Hip-Hop",
    bio: "Pushing the sound forward from the block.",
    imageUrl: "/images/artist-1.jpg",
    channelHref: "/channels#hiphop",
  },
  {
    id: "2",
    name: "Artist Two",
    genre: "Electronic",
    bio: "House and techno from the underground.",
    imageUrl: "/images/artist-2.jpg",
    channelHref: "/channels#house",
  },
  {
    id: "3",
    name: "Artist Three",
    genre: "Rock",
    bio: "Raw energy and live instrumentation.",
    imageUrl: "/images/artist-3.jpg",
    channelHref: "/channels#rock",
  },
  {
    id: "4",
    name: "Artist Four",
    genre: "R&B",
    bio: "Soul and rhythm, on-chain.",
    imageUrl: "/images/artist-4.jpg",
    channelHref: "/channels",
  },
  {
    id: "5",
    name: "Artist Five",
    genre: "Hip-Hop",
    bio: "Independent and unfiltered.",
    imageUrl: "/images/artist-5.jpg",
    channelHref: "/channels",
  },
];

export const MOCK_TIERS = [
  {
    id: "artist-basic",
    name: "Supporter",
    price: "5",
    currency: "XAH",
    description: "Monthly support for one artist",
    benefits: ["Ad-free listening", "Early access", "Discord role"],
    highlighted: false,
  },
  {
    id: "artist-premium",
    name: "Collector",
    price: "15",
    currency: "XAH",
    description: "Deep support + perks",
    benefits: [
      "Everything in Supporter",
      "Exclusive drops",
      "NFT perks",
      "Governance rights",
    ],
    highlighted: true,
  },
  {
    id: "all-access",
    name: "All-Access",
    price: "25",
    currency: "XAH",
    description: "Platform-wide support",
    benefits: [
      "All channels ad-free",
      "All artist exclusives",
      "Governance",
      "Higher royalty share",
      "Badge",
    ],
    highlighted: false,
  },
];

export const MOCK_TESTIMONIALS = [
  {
    quote:
      "Finally a place where my listeners pay me directly. No platform taking 50%.",
    author: "Artist One",
    role: "Hip-Hop",
  },
  {
    quote: "24/7 stream that I actually own. This is the future.",
    author: "Artist Two",
    role: "Electronic",
  },
];
