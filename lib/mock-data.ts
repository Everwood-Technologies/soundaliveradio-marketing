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
    coverUrl: "/channels/hiphop.png",
    nowPlaying: "Artist - Track Name",
    listeners: "2.4K",
  },
  {
    id: "2",
    name: "House",
    slug: "house",
    genre: "Electronic",
    coverUrl: "/channels/house.png",
    nowPlaying: "DJ Set - Live Mix",
    listeners: "1.8K",
  },
  {
    id: "3",
    name: "Rock",
    slug: "rock",
    genre: "Rock",
    coverUrl: "/channels/rock.png",
    nowPlaying: "Band - Song",
    listeners: "1.2K",
  },
  {
    id: "4",
    name: "Talk",
    slug: "talk",
    genre: "Talk",
    coverUrl: "/channels/talk.png",
    nowPlaying: "Host - Episode",
    listeners: "890",
  },
];

export const MOCK_ARTISTS = [
  {
    id: "1",
    name: "E. Smitty",
    genre: "Hip-Hop",
    bio: "Driving the Sound Alive Radio Hip-Hop channel with original cuts.",
    imageUrl: "/discover/E.%20Smitty%20-%20Currency%20Of%20Time.jpeg",
    channelHref: "https://soundaliveradio.net",
  },
  {
    id: "2",
    name: "E. Smitty",
    genre: "House",
    bio: "Curating high-energy House sets for the Sound Alive underground.",
    imageUrl: "/discover/E.%20Smitty%20-%20Flash%20Future%20Art.jpeg",
    channelHref: "https://house.soundaliveradio.net",
  },
  {
    id: "3",
    name: "TakeoffTuesdays",
    genre: "House",
    bio: "Weekly House-focused programming built for peak-time momentum.",
    imageUrl: "/discover/TakeoffTuesdays%20-%20Awakening.jpg",
    channelHref: "https://house.soundaliveradio.net",
  },
  {
    id: "4",
    name: "Kristen Capolino",
    genre: "Rock",
    bio: "Rock-driven sessions blending powerful vocals and live performance.",
    imageUrl: "/discover/Kristen%20Capolino.jpg",
    channelHref: "https://rock.soundaliveradio.net",
  },
  {
    id: "5",
    name: "Craig G",
    genre: "Hip-Hop",
    bio: "Classic lyricism and East Coast energy on the Hip-Hop stream.",
    imageUrl: "/discover/Craig%20G%20E.%20Smitty.jpg",
    channelHref: "https://soundaliveradio.net",
  },
  {
    id: "6",
    name: "Everglades Boss",
    genre: "Hip-Hop",
    bio: "South Florida grit and raw storytelling from the independent lane.",
    imageUrl: "/discover/Everglades%20Boss.jpg",
    channelHref: "https://soundaliveradio.net",
  },
  {
    id: "7",
    name: "Joe Rosati",
    genre: "Rock",
    bio: "Host and artist spotlighting guitar-driven records and interviews.",
    imageUrl: "/discover/Joe%20Rosati.jpeg",
    channelHref: "https://rock.soundaliveradio.net",
  },
  {
    id: "8",
    name: "TruthStream Radio",
    genre: "Talk",
    bio: "Talk programming hosted by Joe Rosati and Scott Stone.",
    imageUrl: "/discover/TruthStream.jpg",
    channelHref: "https://talk.soundaliveradio.net",
  },
  {
    id: "9",
    name: "Rappin' 4 Tay",
    genre: "Hip-Hop",
    bio: "West Coast Hip-Hop icon delivering timeless records.",
    imageUrl: "/discover/Rappin%27%204%20Tay.jpg",
    channelHref: "https://soundaliveradio.net",
  },
  {
    id: "10",
    name: "Rebel Rodomez",
    genre: "Hip-Hop",
    bio: "Underground Hip-Hop storyteller with street-level perspective.",
    imageUrl: "/discover/Rebel%20Rodomez%20-%20Boston%20Ave.jpg",
    channelHref: "https://soundaliveradio.net",
  },
  {
    id: "11",
    name: "DJ Rye Bread",
    genre: "House",
    bio: "House selections built for dance floors and all-night sets.",
    imageUrl: "/discover/Dj%20Rye%20Bread.jpg",
    channelHref: "https://house.soundaliveradio.net",
  },
  {
    id: "12",
    name: "Boo Jackson",
    genre: "House",
    bio: "Groove-forward House records from the Sound Alive roster.",
    imageUrl: "/discover/Boo%20Jackson%20Higher.jpg",
    channelHref: "https://house.soundaliveradio.net",
  },
];

export const MOCK_TIERS = [
  {
    id: "free",
    name: "Free",
    price: 0,
    currency: "USD",
    description: "Listen to Sound Alive Radio with ads.",
    benefits: ["Listen with ads", "Access all live channels"],
    highlighted: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: 5,
    currency: "USD",
    description: "Ad-free channels plus a social badge on Sound Alive Radio.",
    benefits: ["Ad-free channels", "Premium social badge"],
    highlighted: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: 15,
    currency: "USD",
    description: "Ad-free listening with a pro badge and exclusive NFT drops.",
    benefits: ["Ad-free listening", "Pro badge", "Exclusive NFT drops"],
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
