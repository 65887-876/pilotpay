import { site } from '../lib/site'

export type LegalBlock =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] }

export type LegalSection = {
  title: string
  blocks: LegalBlock[]
}

export type LegalDocument = {
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
  showContact?: boolean
}

const contactBlock: LegalSection = {
  title: 'Contact Us',
  blocks: [
    {
      type: 'p',
      text: 'If you have questions about this document, please contact us:',
    },
    { type: 'p', text: 'PilotPay LTD' },
    { type: 'p', text: site.address },
    { type: 'p', text: 'Email: contact@pilotpay.com' },
  ],
}

export const legalDocuments: Record<string, LegalDocument> = {
  cookies: {
    title: 'Cookie Policy',
    updated: 'June 16, 2026',
    intro:
      'This Cookie Policy explains how PilotPay LTD uses cookies and similar tracking technologies when you visit our website.',
    showContact: true,
    sections: [
      {
        title: '1. What Are Cookies?',
        blocks: [
          {
            type: 'p',
            text: 'Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the site owner. Cookies may be "session" cookies (deleted when you close your browser) or "persistent" cookies (stored until they expire or you delete them).',
          },
        ],
      },
      {
        title: '2. How We Use Cookies',
        blocks: [
          {
            type: 'p',
            text: 'PilotPay uses cookies and similar technologies for the following purposes:',
          },
          { type: 'h3', text: 'Strictly Necessary Cookies' },
          {
            type: 'p',
            text: 'These cookies are essential for the website to function and cannot be switched off. They are usually only set in response to actions made by you, such as setting your privacy preferences or filling in forms.',
          },
          {
            type: 'table',
            headers: ['Cookie', 'Purpose', 'Duration'],
            rows: [
              ['__session', 'Session management', 'Session'],
              ['csrf_token', 'Security / CSRF protection', 'Session'],
            ],
          },
          { type: 'h3', text: 'Performance & Analytics Cookies' },
          {
            type: 'p',
            text: 'These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. All information collected is aggregated and anonymous.',
          },
          {
            type: 'table',
            headers: ['Cookie', 'Purpose', 'Duration'],
            rows: [
              ['_ga', 'Google Analytics — distinguishes users', '2 years'],
              ['_ga_*', 'Google Analytics — session persistence', '2 years'],
            ],
          },
          { type: 'h3', text: 'Functional Cookies' },
          {
            type: 'p',
            text: 'These cookies enable enhanced functionality and personalisation, such as remembering your preferences. They may be set by us or by third-party providers whose services we have added to our pages.',
          },
        ],
      },
      {
        title: '3. Third-Party Cookies',
        blocks: [
          {
            type: 'p',
            text: 'Some cookies are placed by third-party services that appear on our pages. We do not control the setting of these cookies. These may include:',
          },
          {
            type: 'ul',
            items: [
              'Google Analytics: Web analytics service provided by Google LLC.',
              'Stripe: Payment infrastructure used for partner onboarding and account verification.',
            ],
          },
        ],
      },
      {
        title: '4. Managing Cookies',
        blocks: [
          {
            type: 'p',
            text: 'You can control and manage cookies in various ways. Please note that removing or blocking cookies may impact your user experience and parts of our website may no longer be fully accessible.',
          },
          { type: 'h3', text: 'Browser Controls' },
          {
            type: 'p',
            text: 'Most browsers allow you to view, manage, delete, and block cookies. Visit the help pages of your browser for instructions:',
          },
          {
            type: 'ul',
            items: [
              'Chrome: Settings → Privacy and security → Cookies and other site data',
              'Firefox: Settings → Privacy & Security → Cookies and Site Data',
              'Safari: Preferences → Privacy → Manage Website Data',
              'Edge: Settings → Cookies and site permissions',
            ],
          },
        ],
      },
      {
        title: '5. Legal Basis (UK GDPR)',
        blocks: [
          {
            type: 'p',
            text: 'Under the UK GDPR and the Privacy and Electronic Communications Regulations (PECR), we require your consent before placing non-essential cookies on your device. Strictly necessary cookies do not require consent as they are essential for the website to function.',
          },
          {
            type: 'p',
            text: "We are committed to ensuring our cookie practices comply with the UK Information Commissioner's Office (ICO) guidance.",
          },
        ],
      },
      {
        title: '6. Updates to This Policy',
        blocks: [
          {
            type: 'p',
            text: 'We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. We will update the "Last updated" date at the top of this page when we make changes.',
          },
        ],
      },
      contactBlock,
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    updated: 'June 16, 2026',
    intro:
      'PilotPay LTD ("we", "us", "our") respects your privacy. This policy explains how we collect, use, store, and protect personal data when you use our website and eligibility application.',
    showContact: true,
    sections: [
      {
        title: '1. Information We Collect',
        blocks: [
          {
            type: 'p',
            text: 'We collect information you provide directly, including:',
          },
          {
            type: 'ul',
            items: [
              'Full legal name',
              'Phone number and country',
              'Email address',
              'Optional Telegram username',
              'Stripe account eligibility details (processing history, legal structure, payout preferences)',
            ],
          },
          {
            type: 'p',
            text: 'We also collect technical data such as IP address, browser type, and usage analytics through cookies (see our Cookie Policy).',
          },
        ],
      },
      {
        title: '2. How We Use Your Data',
        blocks: [
          {
            type: 'p',
            text: 'We use your personal data solely to:',
          },
          {
            type: 'ul',
            items: [
              'Assess partnership eligibility for our Stripe revenue-share program',
              'Communicate with you about your application and onboarding',
              'Comply with legal and regulatory obligations',
              'Improve our website and services',
            ],
          },
        ],
      },
      {
        title: '3. Legal Basis for Processing',
        blocks: [
          {
            type: 'p',
            text: 'Under UK GDPR, we process your data on the basis of: (a) your consent when you submit the eligibility form; (b) legitimate interests in operating our partnership program; and (c) legal obligations where applicable.',
          },
        ],
      },
      {
        title: '4. Data Sharing',
        blocks: [
          {
            type: 'p',
            text: 'We do not sell your personal data. We may share data with service providers who assist our operations (hosting, analytics, communication tools) under strict confidentiality agreements and only as necessary.',
          },
        ],
      },
      {
        title: '5. Data Retention',
        blocks: [
          {
            type: 'p',
            text: 'We retain application data for as long as necessary to process your eligibility, maintain our partnership records, and comply with legal requirements. You may request deletion subject to our regulatory obligations.',
          },
        ],
      },
      {
        title: '6. Your Rights',
        blocks: [
          {
            type: 'p',
            text: 'You have the right to access, correct, delete, or restrict processing of your personal data, and to withdraw consent where applicable. Contact us at contact@pilotpay.com to exercise these rights.',
          },
        ],
      },
      {
        title: '7. Security',
        blocks: [
          {
            type: 'p',
            text: 'We use industry-standard security measures including HTTPS encryption, access controls, and secure infrastructure. See our Security page for more details.',
          },
        ],
      },
      contactBlock,
    ],
  },
  terms: {
    title: 'Terms of Service',
    updated: 'June 16, 2026',
    intro:
      'These Terms of Service govern your use of the PilotPay website and partnership program. By using our services, you agree to these terms.',
    showContact: true,
    sections: [
      {
        title: '1. About PilotPay',
        blocks: [
          {
            type: 'p',
            text: 'PilotPay LTD connects Stripe account holders with vetted high-volume e-commerce operators under a revenue-share model. Partners earn a weekly share of transaction volume routed through their Stripe accounts.',
          },
        ],
      },
      {
        title: '2. Eligibility',
        blocks: [
          {
            type: 'p',
            text: 'Participation is subject to review. You must hold an active Stripe account in good standing and provide accurate information during onboarding. We reserve the right to decline or terminate partnerships that do not meet compliance or risk standards.',
          },
        ],
      },
      {
        title: '3. Revenue Share',
        blocks: [
          {
            type: 'p',
            text: 'Revenue share percentages are agreed in writing per partner. Standard tiers begin at 4% per transaction, with higher tiers available for accounts processing significant monthly volume. Payout schedules and amounts depend on processing volume and program tier.',
          },
        ],
      },
      {
        title: '4. Your Stripe Account',
        blocks: [
          {
            type: 'p',
            text: 'You retain full ownership of your Stripe account. PilotPay accesses accounts only via official team-member permissions you authorize. We never request your Stripe login credentials.',
          },
        ],
      },
      {
        title: '5. Partner Obligations',
        blocks: [
          {
            type: 'ul',
            items: [
              'Maintain your Stripe account in good standing',
              'Comply with Stripe Terms of Service and applicable laws',
              'Provide accurate business and identity information',
              'Notify us promptly of any account issues or compliance concerns',
            ],
          },
        ],
      },
      {
        title: '6. Limitation of Liability',
        blocks: [
          {
            type: 'p',
            text: 'PilotPay provides services on an "as is" basis. To the fullest extent permitted by law, we are not liable for indirect, incidental, or consequential damages arising from use of our services.',
          },
        ],
      },
      {
        title: '7. Governing Law',
        blocks: [
          {
            type: 'p',
            text: 'These terms are governed by the laws of England and Wales. Disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.',
          },
        ],
      },
      contactBlock,
    ],
  },
  aml: {
    title: 'AML Policy',
    updated: 'June 16, 2026',
    intro:
      'PilotPay LTD maintains Anti-Money Laundering (AML) and counter-terrorist financing procedures aligned with UK financial regulations.',
    showContact: true,
    sections: [
      {
        title: '1. Policy Statement',
        blocks: [
          {
            type: 'p',
            text: 'We are committed to preventing money laundering and terrorist financing. All partners and transactions are subject to risk-based due diligence.',
          },
        ],
      },
      {
        title: '2. Customer Due Diligence',
        blocks: [
          {
            type: 'p',
            text: 'All partners undergo identity and eligibility verification before onboarding, including:',
          },
          {
            type: 'ul',
            items: [
              'Verification of legal identity and business structure',
              'Stripe account standing review',
              'Source of funds and business activity assessment',
              'Ongoing monitoring of transaction patterns',
            ],
          },
        ],
      },
      {
        title: '3. Suspicious Activity',
        blocks: [
          {
            type: 'p',
            text: 'We monitor transactions for suspicious activity and fulfil reporting obligations to relevant authorities as required by law, including the National Crime Agency (NCA) where applicable.',
          },
        ],
      },
      {
        title: '4. Record Keeping',
        blocks: [
          {
            type: 'p',
            text: 'We maintain records of due diligence, transactions, and reports for the minimum period required by UK AML regulations.',
          },
        ],
      },
      {
        title: '5. Partner Responsibilities',
        blocks: [
          {
            type: 'p',
            text: 'Partners must operate legally, provide accurate information, and cooperate with any compliance requests. We reserve the right to suspend or terminate partnerships where AML concerns arise.',
          },
        ],
      },
      contactBlock,
    ],
  },
  security: {
    title: 'Security',
    updated: 'June 16, 2026',
    intro:
      'Security is fundamental to how PilotPay operates. This page outlines the measures we take to protect your data and Stripe account.',
    showContact: true,
    sections: [
      {
        title: '1. Stripe Access',
        blocks: [
          {
            type: 'p',
            text: 'We never request your Stripe login credentials. Access is granted only through official team-member invitations you control within your Stripe Dashboard. You can revoke access at any time.',
          },
        ],
      },
      {
        title: '2. Data Protection',
        blocks: [
          {
            type: 'ul',
            items: [
              'All data transmitted over HTTPS/TLS encryption',
              'Application data stored on secure, access-controlled infrastructure',
              'Admin access protected by authentication and session management',
              'Regular review of security practices and access permissions',
            ],
          },
        ],
      },
      {
        title: '3. Infrastructure',
        blocks: [
          {
            type: 'p',
            text: 'Our website and API are hosted on enterprise-grade cloud infrastructure with automated security updates, DDoS protection, and encrypted data storage.',
          },
        ],
      },
      {
        title: '4. Incident Response',
        blocks: [
          {
            type: 'p',
            text: 'We maintain procedures to detect, respond to, and notify relevant parties of security incidents in accordance with applicable regulations.',
          },
        ],
      },
      {
        title: '5. Report a Concern',
        blocks: [
          {
            type: 'p',
            text: 'If you discover a security vulnerability or have concerns, contact us immediately at contact@pilotpay.com.',
          },
        ],
      },
      contactBlock,
    ],
  },
  partnership: {
    title: 'Partnership Agreement Overview',
    updated: 'June 16, 2026',
    intro:
      'This overview summarises the PilotPay partnership program. A formal agreement is provided before activation and supersedes this summary.',
    showContact: true,
    sections: [
      {
        title: '1. Program Overview',
        blocks: [
          {
            type: 'p',
            text: 'PilotPay partners receive a weekly revenue share for routing eligible e-commerce volume through their Stripe accounts. The program is designed to generate passive income from otherwise idle Stripe capacity.',
          },
        ],
      },
      {
        title: '2. Revenue Tiers',
        blocks: [
          {
            type: 'p',
            text: 'Standard tiers begin at 4% per transaction. Higher tiers up to 8% are available for Stripe accounts processing $50,000+ in monthly volume. Exact rates are specified in your signed partnership agreement.',
          },
        ],
      },
      {
        title: '3. Onboarding',
        blocks: [
          {
            type: 'p',
            text: 'Onboarding is conducted manually by our team. After eligibility approval, you will be guided through adding PilotPay as a Stripe team member — no passwords shared, fully Stripe-compliant.',
          },
        ],
      },
      {
        title: '4. Payouts',
        blocks: [
          {
            type: 'p',
            text: 'Payouts are processed weekly. You receive transparent reporting on all routed volume and your revenue share. No hidden fees or monthly charges apply.',
          },
        ],
      },
      {
        title: '5. Termination',
        blocks: [
          {
            type: 'p',
            text: 'Either party may terminate the partnership in accordance with the signed agreement. You retain full control of your Stripe account and may revoke team access at any time.',
          },
        ],
      },
      contactBlock,
    ],
  },
}
