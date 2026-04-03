import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import {
  Download,
  BookOpen,
  Search,
  Receipt,
  CreditCard,
  CheckCircle2,
  Clock,
  ExternalLink,
  Sparkles,
  Zap,
  MoreVertical,
  ArrowRight,
} from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

export function PurchaseHistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');

  const purchases = [
    {
      id: 'ORD-2026-0329-001',
      product: 'Professional Email Writer',
      type: 'Prompt',
      category: 'Writing',
      date: 'March 29, 2026',
      timestamp: '10:34 AM',
      price: 12.99,
      status: 'Completed',
      downloadUrl: '#',
      image: 'https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?w=400',
      paymentMethod: 'Visa ****4242',
      description: 'AI-powered email templates for professional communication',
    },
    {
      id: 'ORD-2026-0329-002',
      product: 'Master ChatGPT Prompt Engineering',
      type: 'Course',
      category: 'Education',
      date: 'March 29, 2026',
      timestamp: '2:15 PM',
      price: 49.99,
      status: 'Completed',
      downloadUrl: '#',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
      paymentMethod: 'Visa ****4242',
      progress: 45,
      description: 'Complete guide to crafting effective AI prompts',
      duration: '8 hours',
      lessons: 24,
    },
    {
      id: 'ORD-2026-0329-003',
      product: 'Social Media Content Generator',
      type: 'Prompt',
      category: 'Marketing',
      date: 'March 29, 2026',
      timestamp: '4:52 PM',
      price: 15.99,
      status: 'Completed',
      downloadUrl: '#',
      image: 'https://images.unsplash.com/photo-1763568258266-3794097e5837?w=400',
      paymentMethod: 'Mastercard ****8888',
      description: 'Create engaging social media posts in seconds',
    },
    {
      id: 'ORD-2026-0320-001',
      product: 'AI for Business: Complete Guide',
      type: 'Course',
      category: 'Business',
      date: 'March 20, 2026',
      timestamp: '11:22 AM',
      price: 79.99,
      status: 'Completed',
      downloadUrl: '#',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400',
      paymentMethod: 'Visa ****4242',
      progress: 78,
      description: 'Transform your business with AI technology',
      duration: '12 hours',
      lessons: 36,
    },
    {
      id: 'ORD-2026-0315-001',
      product: 'Code Documentation Assistant',
      type: 'Prompt',
      category: 'Code',
      date: 'March 15, 2026',
      timestamp: '9:08 AM',
      price: 19.99,
      status: 'Completed',
      downloadUrl: '#',
      image: 'https://images.unsplash.com/photo-1565229284535-2cbbe3049123?w=400',
      paymentMethod: 'Visa ****4242',
      description: 'Generate comprehensive code documentation automatically',
    },
    {
      id: 'ORD-2026-0310-001',
      product: 'Blog Post Outline Creator',
      type: 'Prompt',
      category: 'Writing',
      date: 'March 10, 2026',
      timestamp: '3:45 PM',
      price: 9.99,
      status: 'Completed',
      downloadUrl: '#',
      image: 'https://images.unsplash.com/photo-1723862349011-e9992c8a721a?w=400',
      paymentMethod: 'Mastercard ****8888',
      description: 'Structure your blog posts with AI-generated outlines',
    },
  ];

  const filteredPurchases = purchases.filter((purchase) => {
    const matchesSearch = purchase.product.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = 
      selectedTab === 'all' || 
      (selectedTab === 'prompts' && purchase.type === 'Prompt') ||
      (selectedTab === 'courses' && purchase.type === 'Course');
    return matchesSearch && matchesTab;
  });

  const InvoiceDialog = ({ purchase }: any) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
          <Receipt className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Invoice Details</DialogTitle>
          <DialogDescription>Order #{purchase.id}</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {/* Invoice Header */}
          <div className="flex items-start justify-between pb-6 border-b">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-1">Prompt Wizard</h3>
              <p className="text-sm text-muted-foreground">Prompt Marketplace Platform</p>
              <p className="text-sm text-muted-foreground">support@aiwizard.com</p>
            </div>
            <div className="text-right">
              <Badge className="bg-green-100 text-green-700 mb-2">Paid</Badge>
              <p className="text-sm font-medium">Invoice #{purchase.id}</p>
              <p className="text-xs text-muted-foreground">
                {purchase.date} at {purchase.timestamp}
              </p>
            </div>
          </div>

          {/* Purchase Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src={purchase.image}
                  alt={purchase.product}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">{purchase.product}</h4>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={purchase.type === 'Course' ? 'default' : 'secondary'}
                    className={
                      purchase.type === 'Course'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-secondary/10 text-secondary-foreground'
                    }
                  >
                    {purchase.type}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{purchase.category}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">${purchase.price.toFixed(2)}</div>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="space-y-3 pt-4 border-t">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${purchase.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between font-semibold text-lg pt-2 border-t">
              <span>Total</span>
              <span>${purchase.price.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">Payment Method</div>
              <div className="text-sm text-muted-foreground">{purchase.paymentMethod}</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" className="flex-1">
              <Receipt className="h-4 w-4 mr-2" />
              Print Invoice
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      {/* Header */}
      <div className="container mx-auto px-4 pt-10 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-foreground mt-2">
            Purchase <span className="text-primary">History</span>
          </h1>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            Review and manage all your past orders, downloads, and course enrollments.
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 pb-10">
        {/* Search and Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-6 mb-8 shadow-xl">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 w-full relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search your library..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 h-12 text-base"
                />
              </div>
              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full md:w-auto">
                <TabsList className="grid w-full md:w-auto grid-cols-3 h-12">
                  <TabsTrigger value="all" className="px-6">All Items</TabsTrigger>
                  <TabsTrigger value="prompts" className="px-6">Prompts</TabsTrigger>
                  <TabsTrigger value="courses" className="px-6">Courses</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </Card>
        </motion.div>

        {/* Purchase Items - Timeline Style */}
        <div className="space-y-6">
          {filteredPurchases.map((purchase, index) => (
            <motion.div
              key={purchase.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="relative md:w-72 h-48 md:h-auto overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={purchase.image}
                      alt={purchase.product}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Floating Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className={`${
                        purchase.type === 'Course' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary text-secondary-foreground'
                      } shadow-lg`}>
                        {purchase.type === 'Course' ? (
                          <><BookOpen className="h-3 w-3 mr-1" /> Course</>
                        ) : (
                          <><Zap className="h-3 w-3 mr-1" /> Prompt</>
                        )}
                      </Badge>
                    </div>

                    {/* Price Tag */}
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-white/95 backdrop-blur px-3 py-1 rounded-lg">
                        <span className="text-xl font-bold text-primary">${purchase.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-6 flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                          {purchase.product}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {purchase.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {purchase.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <CreditCard className="h-4 w-4" />
                            {purchase.paymentMethod}
                          </div>
                          {purchase.duration && (
                            <div className="flex items-center gap-1">
                              <span>⏱️ {purchase.duration}</span>
                            </div>
                          )}
                          {purchase.lessons && (
                            <div className="flex items-center gap-1">
                              <span>📚 {purchase.lessons} lessons</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <InvoiceDialog purchase={purchase} />
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Progress Bar for Courses */}
                    {purchase.progress !== undefined && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-muted-foreground font-medium">Course Progress</span>
                          <span className="font-bold text-primary">{purchase.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                          <motion.div
                            className="bg-gradient-to-r from-primary to-primary/80 h-3 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${purchase.progress}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t">
                      {purchase.type === 'Prompt' ? (
                        <>
                          <Button className="flex-1 min-w-[200px] group/btn">
                            <Download className="h-4 w-4 mr-2 group-hover/btn:animate-bounce" />
                            Download Prompt
                          </Button>
                          <Button variant="outline" className="flex-1 min-w-[200px]">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button className="flex-1 min-w-[200px] group/btn">
                            {purchase.progress === 100 ? 'Review Course' : 'Continue Learning'}
                            <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                          <Button variant="outline" className="flex-1 min-w-[200px]">
                            <Download className="h-4 w-4 mr-2" />
                            Download Resources
                          </Button>
                        </>
                      )}
                    </div>

                    {/* Order ID Footer */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-xs text-muted-foreground">Order #{purchase.id}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {purchase.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPurchases.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-16 text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                  <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 border-4 border-primary/20">
                    <Sparkles className="h-16 w-16 text-primary" />
                  </div>
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-3">
                {searchQuery || selectedTab !== 'all' ? 'No items found' : 'Your library is empty'}
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                {searchQuery || selectedTab !== 'all'
                  ? 'Try adjusting your search or filter to find what you\'re looking for.'
                  : 'Start building your AI toolkit with powerful prompts and comprehensive courses.'}
              </p>
              {!searchQuery && selectedTab === 'all' && (
                <div className="flex gap-4 justify-center">
                  <Button size="lg" className="group">
                    <Zap className="h-5 w-5 mr-2 group-hover:animate-pulse" />
                    Browse Prompts
                  </Button>
                  <Button size="lg" variant="outline" className="group">
                    <BookOpen className="h-5 w-5 mr-2 group-hover:animate-pulse" />
                    Explore Courses
                  </Button>
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}