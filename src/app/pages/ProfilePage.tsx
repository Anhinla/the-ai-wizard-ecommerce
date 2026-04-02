import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import {
  User,
  Mail,
  Calendar,
  MapPin,
  Briefcase,
  Award,
  BookOpen,
  Zap,
  Settings,
  Shield,
  Bell,
  CreditCard,
  Camera,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';

export function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-12">
        {/* Profile Header */}
        <Card className="mb-8 overflow-hidden">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-primary to-primary/80 relative">
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                  backgroundSize: '40px 40px',
                }}
              />
            </div>
          </div>

          {/* Profile Info */}
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-20">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="h-40 w-40 border-8 border-card shadow-xl">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-5xl">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute bottom-2 right-2 h-10 w-10 rounded-full shadow-lg"
                >
                  <Camera className="h-5 w-5" />
                </Button>
              </div>

              {/* User Details */}
              <div className="flex-1 pt-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Mars</h1>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span className="text-sm">{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">Joined March 2026</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">San Francisco, CA</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => navigate('/history')}>
                      <BookOpen className="h-4 w-4 mr-2" />
                      My Library
                    </Button>
                    <Button>
                      <Settings className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <Card className="p-4 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">Prompts Owned</div>
              </Card>
              <Card className="p-4 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                    <BookOpen className="h-6 w-6 text-secondary" />
                  </div>
                </div>
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm text-muted-foreground">Courses Enrolled</div>
              </Card>
              <Card className="p-4 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                    <Award className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-muted-foreground">Certificates</div>
              </Card>
              <Card className="p-4 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <Briefcase className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="text-2xl font-bold">45h</div>
                <div className="text-sm text-muted-foreground">Learning Time</div>
              </Card>
            </div>
          </div>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          {/* Account Tab */}
          <TabsContent value="account">
            <Card className="p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-1">Personal Information</h3>
                  <p className="text-sm text-muted-foreground">
                    Update your personal details and preferences
                  </p>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" defaultValue={user.name} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue={user.email} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" defaultValue="San Francisco, CA" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" placeholder="Your company name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" placeholder="Your job title" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card className="p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-1">Security Settings</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your password and account security
                  </p>
                </div>

                <Separator />

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Two-Factor Authentication</div>
                        <div className="text-sm text-muted-foreground">
                          Add an extra layer of security
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-muted-foreground">
                      Not Enabled
                    </Badge>
                  </div>

                  <div>
                    <h4 className="font-medium mb-4">Change Password</h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline">Cancel</Button>
                  <Button>Update Password</Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-1">Notification Preferences</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose what notifications you want to receive
                  </p>
                </div>

                <Separator />

                <div className="space-y-4">
                  {[
                    {
                      title: 'Email Notifications',
                      description: 'Receive email updates about your account',
                    },
                    {
                      title: 'Course Updates',
                      description: 'Get notified about new lessons and content',
                    },
                    {
                      title: 'Marketing Emails',
                      description: 'Receive tips, promotions, and special offers',
                    },
                    {
                      title: 'Security Alerts',
                      description: 'Important security notifications',
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-sm text-muted-foreground">{item.description}</div>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Preferences</Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing">
            <Card className="p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-1">Billing & Payment</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your payment methods and billing information
                  </p>
                </div>

                <Separator />

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-4">Payment Methods</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                            <CreditCard className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium">Visa ending in 4242</div>
                            <div className="text-sm text-muted-foreground">Expires 12/2026</div>
                          </div>
                        </div>
                        <Badge>Default</Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                            <CreditCard className="h-5 w-5 text-orange-600" />
                          </div>
                          <div>
                            <div className="font-medium">Mastercard ending in 8888</div>
                            <div className="text-sm text-muted-foreground">Expires 08/2027</div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>
                    <Button variant="outline" className="mt-4">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Add Payment Method
                    </Button>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-4">Billing History</h4>
                    <div className="space-y-2">
                      {[
                        { date: 'March 29, 2026', amount: '$12.99', status: 'Paid' },
                        { date: 'March 20, 2026', amount: '$79.99', status: 'Paid' },
                        { date: 'March 15, 2026', amount: '$19.99', status: 'Paid' },
                      ].map((transaction, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="text-sm text-muted-foreground">{transaction.date}</div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="font-medium">{transaction.amount}</div>
                            <Badge className="bg-green-100 text-green-700">{transaction.status}</Badge>
                            <Button variant="ghost" size="sm">
                              View Invoice
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="mt-4" onClick={() => navigate('/history')}>
                      View All Transactions
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}