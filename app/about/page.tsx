import { Section } from "@/components/ui/Section";

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-white/5 bg-surface/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            About Sound Alive Radio
          </p>
          <h1 className="mb-6 max-w-5xl text-4xl font-bold tracking-tight text-headline sm:text-5xl">
            Welcome to Sound Alive Radio - The Future of Decentralized Broadcasting
          </h1>
          <div className="space-y-4 text-base leading-7 text-muted">
            <p>
              Sound Alive Radio is the world&apos;s first fully decentralized 24/7 radio network,
              revolutionizing the airwaves by leveraging blockchain technology to deliver
              uncensored, uninterrupted content directly to listeners worldwide. Founded by
              acclaimed music producer and engineer E. Smitty, our platform is powered by
              Evernode DePIN (Decentralized Physical Infrastructure Network) on the XRP Ledger,
              ensuring resilience, transparency, and global accessibility without reliance on
              traditional centralized servers.
            </p>
            <p>
              Launched on March 25, 2025, Sound Alive Radio started with its flagship
              Hip-Hop/Urban station at{" "}
              <a
                href="https://soundaliveradio.net"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                soundaliveradio.net
              </a>
              , featuring non-stop beats from emerging artists and industry legends. Within
              months, we expanded to include three additional stations by August 2025: Sound
              Alive House for EDM and deep house vibes{" "}
              <a
                href="https://house.soundaliveradio.net"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                house.soundaliveradio.net
              </a>
              , Sound Alive Talk for unfiltered discussions{" "}
              <a
                href="https://talk.soundaliveradio.net"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                talk.soundaliveradio.net
              </a>
              , and Sound Alive Rock for guitar-driven anthems{" "}
              <a
                href="https://rock.soundaliveradio.net"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                rock.soundaliveradio.net
              </a>
              . This rapid growth marks a huge success, thanks to the seamless infrastructure
              provided by Evernode DePIN.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="mb-3 text-2xl font-semibold text-headline">Our Mission</h2>
            <p className="text-sm leading-7 text-muted">
              At Sound Alive Radio, we believe in breaking free from corporate gatekeepers and
              empowering creators and listeners alike. Our decentralized model eliminates
              censorship, reduces downtime, and fosters a community-driven ecosystem where music and
              content thrive on the blockchain. Whether you&apos;re tuning in for high-energy
              playlists, thought-provoking talks, or genre-specific vibes, we aim to redefine radio
              as a permissionless, innovative space fueled by cutting-edge technology.
            </p>
          </article>

          <article className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <h2 className="mb-3 text-2xl font-semibold text-headline">
              About the Founder: E. Smitty
            </h2>
            <div className="space-y-4 text-sm leading-7 text-muted">
              <p>
                E. Smitty (born Eric Finnerud on September 11, 1981) is a multi-platinum producer,
                mix engineer, and visionary entrepreneur. As the CEO and founder of Sound Alive
                Records, Sound Alive Studios, and DistroMint LLC, Smitty has worked with legendary
                artists and earned acclaim for his contributions to the music industry. A Waves
                Audio Ltd. endorsed professional, he has blended his expertise in production with
                blockchain innovation to create Sound Alive Radio.
              </p>
              <p>
                Smitty&apos;s journey in Web3 has been marked by resilience and innovation. After
                navigating challenges in the space, he found a home in the Evernode XRPL community,
                leading to the creation of this groundbreaking platform. His tagline, &quot;Surrounded
                by Miracles!!!&quot;, reflects his optimistic spirit and commitment to pushing
                boundaries. Follow him on X at{" "}
                <a
                  href="https://x.com/THEREALESMITTY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  @THEREALESMITTY
                </a>{" "}
                for updates, behind-the-scenes insights, and more.
              </p>
            </div>
          </article>
        </div>
      </Section>

      <Section className="bg-surface/50">
        <h2 className="mb-4 text-3xl font-bold text-headline">
          Powered by Evernode DePIN and XRP Ledger
        </h2>
        <div className="max-w-5xl space-y-4 text-sm leading-7 text-muted">
          <p>
            Sound Alive Radio harnesses the power of Evernode, a global, permissionless Layer 2
            solution built on the XRP Ledger (XRPL). This DePIN technology enables distributed
            hosting across nodes, ensuring our broadcasts are resilient, scalable, and resistant to
            single points of failure. Key features include:
          </p>
        </div>

        <ul className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <li className="rounded-2xl border border-border bg-surface p-5 text-sm leading-7 text-muted">
            <span className="font-semibold text-headline">Decentralized Streaming:</span> Content
            is delivered via blockchain-integrated nodes, providing 24/7 availability without
            traditional infrastructure vulnerabilities.
          </li>
          <li className="rounded-2xl border border-border bg-surface p-5 text-sm leading-7 text-muted">
            <span className="font-semibold text-headline">RLUSD Transactions:</span> We use RLUSD
            (Ripple USD), a stablecoin pegged to the U.S. dollar on the XRPL, for all transactions,
            including donations, premium features, and artist submissions. This ensures fast,
            low-cost, and secure payments.
          </li>
          <li className="rounded-2xl border border-border bg-surface p-5 text-sm leading-7 text-muted">
            <span className="font-semibold text-headline">Xaman Wallet Integration:</span> To
            access our services, including free listening, you must connect your Xaman Wallet
            (formerly Xumm). This enables decentralized authentication, verifies eligibility through
            micropayments or zero-value transactions, and facilitates seamless RLUSD interactions.
            Download the Xaman app and connect effortlessly for a secure, wallet-based experience.
          </li>
        </ul>

        <p className="mt-6 max-w-5xl text-sm leading-7 text-muted">
          Our integration with XRPL tokens like $EVR, $XRP, and $XLM further enhances the
          ecosystem, supporting creators through tokenized rewards and community governance.
        </p>
      </Section>

      <Section>
        <h2 className="mb-6 text-3xl font-bold text-headline">What Makes Us Unique</h2>
        <ul className="space-y-4">
          <li className="rounded-2xl border border-border bg-surface p-5 text-sm leading-7 text-muted">
            <span className="font-semibold text-headline">Artist-Focused Playlists:</span> Curated
            hours like &quot;E. Smitty Radio&quot; and &quot;Ms. Dj&apos;s Picks&quot; spotlight
            independent talent alongside icons. Submit your tracks to{" "}
            <a href="mailto:submissions@soundaliveradio.net" className="text-primary hover:underline">
              submissions@soundaliveradio.net
            </a>{" "}
            for consideration.
          </li>
          <li className="rounded-2xl border border-border bg-surface p-5 text-sm leading-7 text-muted">
            <span className="font-semibold text-headline">Multi-Genre Expansion:</span> From
            Hip-Hop to House, Talk, and Rock, we cater to diverse tastes with dedicated stations.
          </li>
          <li className="rounded-2xl border border-border bg-surface p-5 text-sm leading-7 text-muted">
            <span className="font-semibold text-headline">Blockchain Benefits:</span> Enjoy
            censorship-resistant content, global reach, and ownership opportunities for artists via
            decentralized tools.
          </li>
          <li className="rounded-2xl border border-border bg-surface p-5 text-sm leading-7 text-muted">
            <span className="font-semibold text-headline">Free App Access:</span> Download our free
            app for iPhone or Android to stream on the go. No traditional subscriptions needed -
            just connect your Xaman Wallet to tune in.
          </li>
        </ul>
      </Section>

      <Section className="bg-surface/50">
        <h2 className="mb-4 text-3xl font-bold text-headline">Join the Revolution</h2>
        <div className="max-w-5xl space-y-4 text-sm leading-7 text-muted">
          <p>
            Sound Alive Radio isn&apos;t just radio; it&apos;s a movement toward a decentralized
            future in media. Whether you&apos;re an artist looking to get heard, a listener craving
            fresh vibes, or a blockchain enthusiast exploring DePIN applications, we&apos;re here
            to amplify your experience.
          </p>
          <p>Connect with us:</p>
        </div>
        <ul className="mt-4 space-y-2 text-sm text-muted">
          <li>
            Website:{" "}
            <a
              href="https://soundaliveradio.net"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              soundaliveradio.net
            </a>
          </li>
          <li>
            X:{" "}
            <a
              href="https://x.com/SoundAliveRadio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              @SoundAliveRadio
            </a>
          </li>
          <li>
            Instagram:{" "}
            <a
              href="https://www.instagram.com/Sound_Alive_Rec"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              @Sound_Alive_Rec
            </a>
          </li>
          <li>
            Facebook: Eric Esmitty
          </li>
          <li>
            Blog:{" "}
            <a
              href="https://soundaliverecords.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              soundaliverecords.com
            </a>{" "}
            for news and updates
          </li>
        </ul>
        <p className="mt-6 text-sm leading-7 text-muted">
          For inquiries, partnerships, or feedback, contact us at{" "}
          <a href="mailto:info@soundaliveradio.net" className="text-primary hover:underline">
            info@soundaliveradio.net
          </a>
          .
        </p>
      </Section>
    </>
  );
}
