import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { CheckCircle2, Download, ArrowRight, FileText } from 'lucide-react';

export function SuccessPage() {
  const navigate = useNavigate();

  const purchasedItems = [
    {
      id: '1',
      title: 'Professional Email Writer',
      type: 'prompt',
    },
    {
      id: '2',
      title: 'Master ChatGPT Prompt Engineering',
      type: 'course',
    },
    {
      id: '3',
      title: 'Social Media Content Generator',
      type: 'prompt',
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12 px-4">
      <Card className="max-w-2xl w-full p-8 md:p-12 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl font-bold mb-3">Payment Successful!</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Thank you for your purchase. Your items are now available.
        </p>

        {/* Order Details */}
        <Card className="bg-muted/30 p-6 mb-8 text-left">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Order #12345</h2>
            <span className="text-sm text-muted-foreground">March 29, 2026</span>
          </div>

          <div className="space-y-3">
            {purchasedItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-3 border-b last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm text-muted-foreground capitalize">{item.type}</div>
                  </div>
                </div>
                {item.type === 'prompt' && (
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                )}
                {item.type === 'course' && (
                  <Button size="sm" variant="outline">
                    <ArrowRight className="h-4 w-4 mr-1" />
                    Access
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/history')}
          >
            View Purchase History
          </Button>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90"
            onClick={() => navigate('/prompts')}
          >
            Continue Shopping
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Receipt */}
        <p className="text-sm text-muted-foreground mt-8">
          A receipt has been sent to your email address.
        </p>
      </Card>
    </div>
  );
}
