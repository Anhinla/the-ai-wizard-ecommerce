import { CheckCircle2, Wand2, Crown, Gem } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export function PricingPage() {
  const plans = [
    {
      name: 'Apprentice',
      price: 0,
      description: 'Perfect for trying out our platform',
      icon: Wand2,
      features: [
        '3 free prompts per month',
        'Access to community',
        'Basic support',
        'Weekly newsletter',
      ],
      popular: false,
    },
    {
      name: 'Wizard',
      price: 19,
      description: 'Best for individual creators',
      icon: Gem,
      features: [
        'Unlimited prompt access',
        '20% discount on all courses',
        'Priority support',
        'Early access to new features',
        'Monthly exclusive prompts',
        'Advanced analytics',
      ],
      popular: true,
    },
    {
      name: 'Archmage',
      price: 49,
      description: 'For teams and businesses',
      icon: Crown,
      features: [
        'Everything in Pro',
        'Team collaboration tools',
        'Custom prompt library',
        'Dedicated account manager',
        'Advanced API access',
        'Custom integrations',
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select the perfect plan for your needs. All plans include access to our marketplace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`p-8 relative ${plan.popular ? 'border-primary shadow-lg ring-2 ring-primary' : ''}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 right-6 bg-primary">Most Popular</Badge>
              )}
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
                <plan.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <Button
                className={`w-full mb-8 ${plan.popular ? 'bg-primary' : ''}`}
                variant={plan.popular ? 'default' : 'outline'}
              >
                Get Started
              </Button>
              <div className="space-y-3">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}