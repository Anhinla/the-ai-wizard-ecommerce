import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Shield } from 'lucide-react';
import { motion } from 'motion/react';

const sections = [
  {
    title: '1. Information We Collect',
    content: 'We collect information you provide directly, such as your name, email address, and payment details when you create an account or make a purchase. We also collect usage data, including browsing activity, prompts accessed, and course progress to improve your experience.',
  },
  {
    title: '2. How We Use Your Information',
    content: 'Your information is used to provide and improve our services, process transactions, send relevant communications, personalize your marketplace experience, and ensure platform security. We never sell your personal data to third parties.',
  },
  {
    title: '3. Data Sharing & Third Parties',
    content: 'We share data only with trusted service providers who help us operate our platform (payment processors, hosting, analytics). All third parties are bound by strict data protection agreements. We may also disclose data when required by law.',
  },
  {
    title: '4. Data Security',
    content: 'We employ industry-standard encryption, secure servers, and regular security audits to protect your data. All payment information is processed through PCI-compliant providers and never stored on our servers.',
  },
  {
    title: '5. Cookies & Tracking',
    content: 'We use cookies and similar technologies to remember preferences, analyze traffic, and deliver personalized content. You can manage cookie preferences through your browser settings at any time.',
  },
  {
    title: '6. Your Rights',
    content: 'You have the right to access, correct, or delete your personal data. You may also request data portability or opt out of marketing communications. Contact us at privacy@theaiwizard.com to exercise these rights.',
  },
  {
    title: '7. Changes to This Policy',
    content: 'We may update this policy periodically. Significant changes will be communicated via email or platform notification. Continued use of our services constitutes acceptance of the updated policy.',
  },
];

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4 px-4 py-1.5 bg-primary/10 text-primary border-primary/20">
            <Shield className="h-3.5 w-3.5 mr-1.5" />
            Legal
          </Badge>
          <h1 className="text-4xl font-bold mb-3">
            Privacy <span className="text-primary">Policy</span>
          </h1>
          <p className="text-muted-foreground">Last updated: April 1, 2026</p>
        </motion.div>

        <Card className="p-8 space-y-8">
          <p className="text-muted-foreground">
            At The AI Wizard, we take your privacy seriously. This policy explains how we collect,
            use, and protect your personal information when you use our marketplace and services.
          </p>
          {sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-lg font-semibold mb-2">{section.title}</h2>
              <p className="text-muted-foreground text-sm">{section.content}</p>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
