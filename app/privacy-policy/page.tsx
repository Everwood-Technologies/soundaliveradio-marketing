import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the Sound Alive Radio Privacy Policy, including what data we collect, how we use it, and your rights.",
};

const POLICY_SECTIONS = [
  { id: "information-we-collect", label: "1. Information We Collect" },
  { id: "how-we-collect-information", label: "2. How We Collect Information" },
  { id: "how-we-use-information", label: "3. How We Use Your Information" },
  { id: "sharing-information", label: "4. Sharing Your Information" },
  { id: "data-security", label: "5. Data Security" },
  { id: "data-retention", label: "6. Data Retention" },
  { id: "cookies", label: "7. Cookies and Tracking Technologies" },
  { id: "rights-and-choices", label: "8. Your Rights and Choices" },
  { id: "children-privacy", label: "9. Children's Privacy" },
  { id: "international-transfers", label: "10. International Data Transfers" },
  { id: "policy-changes", label: "11. Changes to This Privacy Policy" },
  { id: "contact", label: "12. Contact Us" },
] as const;

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="border-b border-white/5 bg-surface/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">Legal</p>
          <h1 className="mb-4 max-w-4xl text-4xl font-bold tracking-tight text-headline sm:text-5xl">
            Privacy Policy for Sound Alive Radio
          </h1>
          <p className="mb-6 text-sm font-medium text-muted">Effective Date: March 12, 2026</p>
          <div className="max-w-5xl space-y-4 text-base leading-7 text-muted">
            <p>
              Sound Alive Radio (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is a decentralized
              radio platform operated by E. Smitty and powered by Evernode DePIN. This policy
              explains how we collect, use, disclose, and protect your information when you visit{" "}
              <a
                href="https://soundaliveradio.net"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                soundaliveradio.net
              </a>
              , listen to broadcasts, or use related services.
            </p>
            <p>
              By accessing or using our services, you agree to this Privacy Policy. If you do not
              agree, please do not use our services.
            </p>
          </div>
        </div>
      </section>

      <Section className="pt-10 md:pt-14">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-2xl font-semibold text-headline">Quick Navigation</h2>
          <p className="mt-2 text-sm text-muted">
            Use these links to jump to any section of the policy.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {POLICY_SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="rounded-lg border border-border bg-background/40 px-3 py-2 text-sm text-muted transition-colors hover:text-foreground"
              >
                {section.label}
              </a>
            ))}
          </div>
        </div>
      </Section>

      <Section className="pt-8 md:pt-10">
        <div className="space-y-6">
          <article id="information-we-collect" className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-2xl font-semibold text-headline">1. Information We Collect</h2>
            <div className="mt-4 space-y-5 text-sm leading-7 text-muted">
              <div>
                <h3 className="text-base font-semibold text-headline">Personal Information</h3>
                <ul className="mt-2 list-disc space-y-2 pl-5">
                  <li>
                    <span className="font-semibold text-headline">Contact information:</span> Your
                    name, email address, or phone number if you provide it for newsletters, support,
                    feedback, or similar communications.
                  </li>
                  <li>
                    <span className="font-semibold text-headline">Account information:</span>{" "}
                    Username, password, and listening preferences if account functionality is used.
                  </li>
                  <li>
                    <span className="font-semibold text-headline">Wallet information:</span> When
                    you connect a Xaman Wallet, we collect wallet address and related identifiers to
                    enable decentralized authentication and service access.
                  </li>
                  <li>
                    <span className="font-semibold text-headline">Payment information:</span> We
                    process RLUSD-related transaction details via your connected wallet. We do not
                    store private keys or full wallet credentials.
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-base font-semibold text-headline">Non-Personal Information</h3>
                <ul className="mt-2 list-disc space-y-2 pl-5">
                  <li>
                    <span className="font-semibold text-headline">Usage data:</span> IP address,
                    browser type, device identifiers, pages visited, time on page, and referral
                    sources.
                  </li>
                  <li>
                    <span className="font-semibold text-headline">Listening data:</span> Anonymized
                    stream activity such as content, timestamps, and preferences to improve
                    broadcasting.
                  </li>
                  <li>
                    <span className="font-semibold text-headline">Technical data:</span> Evernode
                    DePIN integration logs and XRP Ledger related activity, which may include hashed
                    identifiers and public blockchain transaction data.
                  </li>
                </ul>
              </div>
              <p>
                We do not intentionally collect sensitive personal information (for example, health
                data, political opinions, or racial or ethnic origin) unless you voluntarily provide
                it.
              </p>
            </div>
          </article>

          <article
            id="how-we-collect-information"
            className="rounded-2xl border border-border bg-surface p-6"
          >
            <h2 className="text-2xl font-semibold text-headline">2. How We Collect Information</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-muted">
              <li>
                <span className="font-semibold text-headline">Directly from you:</span> Through
                forms, registrations, support requests, and wallet connection actions. By connecting
                your Xaman Wallet, you explicitly consent to sharing wallet identifiers and enabling
                RLUSD interactions as required.
              </li>
              <li>
                <span className="font-semibold text-headline">Automatically:</span> Through your
                browser, device, and normal service usage.
              </li>
              <li>
                <span className="font-semibold text-headline">From third parties:</span> Such as
                analytics providers, social platforms (if linked), infrastructure partners, and data
                available from XRP Ledger activity you authorize.
              </li>
              <li>
                <span className="font-semibold text-headline">From decentralized sources:</span>{" "}
                Pseudonymous data tied to blockchain interactions, including RLUSD transactions on
                the public XRP Ledger.
              </li>
            </ul>
          </article>

          <article id="how-we-use-information" className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-2xl font-semibold text-headline">3. How We Use Your Information</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-muted">
              <li>Provide, maintain, and improve services and listening experience.</li>
              <li>Enable decentralized access control using connected Xaman Wallet accounts.</li>
              <li>
                Facilitate RLUSD transactions on the XRP Ledger, including micropayments or
                zero-value eligibility checks where applicable.
              </li>
              <li>Communicate service updates, newsletters, and support responses.</li>
              <li>Analyze performance and usage patterns to improve network reliability.</li>
              <li>Comply with legal obligations, enforce terms, and help prevent fraud.</li>
              <li>Conduct marketing activity where permitted and with consent when required.</li>
            </ul>
            <p className="mt-4 text-sm leading-7 text-muted">
              In our decentralized model, data may be processed across distributed infrastructure for
              service delivery. Connecting a Xaman Wallet is required for broadcast access,
              including free subscription access.
            </p>
          </article>

          <article id="sharing-information" className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-2xl font-semibold text-headline">4. Sharing Your Information</h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              We do not sell your personal information. We may share information in the following
              cases:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-muted">
              <li>Service providers that support hosting, analytics, and wallet integrations.</li>
              <li>Decentralized infrastructure providers supporting broadcasting and storage.</li>
              <li>Legal compliance requests, including lawful subpoenas and similar obligations.</li>
              <li>Business transfers such as mergers, acquisitions, or asset sales.</li>
              <li>Other disclosures with your explicit consent.</li>
            </ul>
            <p className="mt-4 text-sm leading-7 text-muted">
              We require relevant third parties to follow confidentiality and security standards.
              Public blockchain data (including wallet addresses and RLUSD transaction records) is
              inherently visible on the XRP Ledger and may not be fully removable or deletable.
            </p>
          </article>

          <article id="data-security" className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-2xl font-semibold text-headline">5. Data Security</h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-muted">
              <p>
                We use reasonable safeguards such as encryption, access controls, and operational
                reviews to protect personal information. As a decentralized platform, Evernode DePIN
                also benefits from blockchain-backed integrity.
              </p>
              <p>
                No system is completely secure. You are responsible for protecting your Xaman Wallet
                credentials and private keys.
              </p>
            </div>
          </article>

          <article id="data-retention" className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-2xl font-semibold text-headline">6. Data Retention</h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-muted">
              <p>
                We retain personal information only as long as needed for the purposes in this
                policy or as required by law.
              </p>
              <p>
                Anonymized data may be retained for analytics. Blockchain records, including RLUSD
                transactions on XRP Ledger, are permanent by design.
              </p>
            </div>
          </article>

          <article id="cookies" className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-2xl font-semibold text-headline">
              7. Cookies and Tracking Technologies
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              We use cookies for site functionality, analytics, and advertising where applicable.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-muted">
              <li>
                <span className="font-semibold text-headline">Essential cookies:</span> Required for
                core site operation.
              </li>
              <li>
                <span className="font-semibold text-headline">Analytics cookies:</span> Help us
                understand traffic and usage patterns.
              </li>
              <li>
                <span className="font-semibold text-headline">Advertising cookies:</span> Support
                campaign measurement and relevant ads where enabled.
              </li>
            </ul>
            <p className="mt-4 text-sm leading-7 text-muted">
              You can manage cookie preferences in your browser settings. Disabling cookies may
              reduce functionality. We respect Do Not Track signals where feasible.
            </p>
          </article>

          <article id="rights-and-choices" className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-2xl font-semibold text-headline">8. Your Rights and Choices</h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              Depending on your location and applicable law (including GDPR or CCPA-style laws), you
              may be able to:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-muted">
              <li>Access, correct, or request deletion of personal information we control.</li>
              <li>Object to processing or request restrictions in certain cases.</li>
              <li>
                Withdraw consent, including disconnecting your Xaman Wallet (which may remove
                service access).
              </li>
              <li>Opt out of marketing communications.</li>
              <li>Request data portability where required by law.</li>
            </ul>
            <p className="mt-4 text-sm leading-7 text-muted">
              To exercise these rights, contact us using the details below. We may verify identity
              before processing requests. For California residents, we do not sell personal
              information, but you may opt out of any future sale if our practices change.
            </p>
          </article>

          <article id="children-privacy" className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-2xl font-semibold text-headline">9. Children&apos;s Privacy</h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              Our services are not intended for children under 13 (or under 16 in some
              jurisdictions). We do not knowingly collect personal data from children. If we learn
              that child data has been collected, we will take prompt steps to delete it.
            </p>
          </article>

          <article
            id="international-transfers"
            className="rounded-2xl border border-border bg-surface p-6"
          >
            <h2 className="text-2xl font-semibold text-headline">
              10. International Data Transfers
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              Your information may be processed outside your country of residence, including in
              locations with different data protection laws. We apply reasonable safeguards where
              required, including contractual protections when applicable. Public blockchain data on
              XRP Ledger is globally distributed by design.
            </p>
          </article>

          <article id="policy-changes" className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-2xl font-semibold text-headline">
              11. Changes to This Privacy Policy
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              We may update this policy from time to time. Updated versions will be posted on the
              site with a revised effective date. Continued use of our services after updates
              indicates acceptance of the revised policy.
            </p>
          </article>

          <article id="contact" className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <h2 className="text-2xl font-semibold text-headline">12. Contact Us</h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              If you have questions or concerns about this policy, contact:
            </p>
            <div className="mt-4 space-y-1 text-sm text-muted">
              <p className="font-semibold text-headline">E. Smitty</p>
              <p>Sound Alive Radio</p>
              <p>
                Email:{" "}
                <a href="mailto:privacy@soundaliveradio.net" className="text-primary hover:underline">
                  privacy@soundaliveradio.net
                </a>
              </p>
              <p>
                Website:{" "}
                <a
                  href="https://soundaliveradio.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  soundaliveradio.net
                </a>
              </p>
            </div>
            <p className="mt-5 text-sm leading-7 text-muted">
              This Privacy Policy is governed by the laws of the United States.
            </p>
          </article>
        </div>
      </Section>
    </>
  );
}
