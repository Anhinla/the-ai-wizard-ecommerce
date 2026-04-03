import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Scroll } from 'lucide-react';
import { motion } from 'motion/react';

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: 'By accessing or using the Prompt Wizard marketplace, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform. These terms apply to all users, including buyers, sellers, and visitors.',
  },
  {
    title: '2. Account Registration',
    content: 'You must provide accurate information when creating an account. You are responsible for maintaining the security of your credentials and all activity under your account. You must be at least 18 years old to use our services.',
  },
  {
    title: '3. Purchases & Payments',
    content: 'All prices are listed in USD. Purchases are processed securely through our payment providers. Digital products (prompts and courses) are delivered immediately upon successful payment. Refunds are available within 14 days if the product has not been substantially used.',
  },
  {
    title: '4. Intellectual Property',
    content: 'Prompts and courses sold on our platform are licensed for personal or commercial use as specified by each product listing. You may not redistribute, resell, or claim authorship of purchased content without explicit permission from the creator.',
  },
  {
    title: '5. User Conduct',
    content: 'You agree not to use our platform for any unlawful purpose, upload harmful content, attempt to compromise platform security, or harass other users. Violation of these guidelines may result in account suspension or termination.',
  },
  {
    title: '6. Seller Terms',
    content: 'Creators who sell on our marketplace grant Prompt Wizard a non-exclusive license to display and distribute their content. Sellers are responsible for ensuring their content does not infringe on third-party rights. Revenue sharing and payout terms are outlined in the Seller Agreement.',
  },
  {
    title: '7. Limitation of Liability',
    content: 'Prompt Wizard is provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the platform. Our total liability shall not exceed the amount you have paid us in the preceding 12 months.',
  },
  {
    title: '8. Modifications',
    content: 'We reserve the right to modify these terms at any time. Material changes will be communicated via email or platform notification at least 30 days before taking effect. Continued use after changes constitutes acceptance.',
  },
];

export function TermsPage() {
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
            <Scroll className="h-3.5 w-3.5 mr-1.5" />
            Legal
          </Badge>
          <h1 className="text-4xl font-bold mb-3">
            Terms of <span className="text-primary">Service</span>
          </h1>
          <p className="text-muted-foreground">Last updated: April 1, 2026</p>
        </motion.div>

        <Card className="p-8 space-y-8">
          <p className="text-muted-foreground">
            Welcome to Prompt Wizard. These terms govern your use of our marketplace, services,
            and any related tools or content provided through our platform.
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