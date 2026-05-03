import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Input } from "../components/ui/input"
import { ImageWithFallback } from "../components/figma/ImageWithFallback"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog"
import {
  Search,
  Receipt,
  CreditCard,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  BookOpen,
  Loader2,
  Download,
  ArrowRight,
  Package,
} from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { useNavigate } from "react-router-dom"
// Import API của bạn (điều chỉnh đường dẫn cho phù hợp)
import { getOrders, getOrderById } from "../api/order"

export function PurchaseHistoryPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")

  // States cho danh sách Orders
  const [orders, setOrders] = useState<any[]>([])
  const [isLoadingOrders, setIsLoadingOrders] = useState(true)

  // States cho Order Details (Modal)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoadingDetails, setIsLoadingDetails] = useState(false)

  // Lấy danh sách Orders khi vào trang
  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setIsLoadingOrders(true)
      const response = await getOrders()
      if (response.success) {
        setOrders(response.payload)
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error)
    } finally {
      setIsLoadingOrders(false)
    }
  }

  // Mở Modal và lấy chi tiết Order
  const handleViewDetails = async (orderId: number) => {
    setIsModalOpen(true)
    setIsLoadingDetails(true)
    setSelectedOrder(null) // Reset detail cũ

    try {
      const response = await getOrderById(orderId)
      if (response.success) {
        setSelectedOrder(response.payload)
      }
    } catch (error) {
      console.error("Failed to fetch order details:", error)
    } finally {
      setIsLoadingDetails(false)
    }
  }

  // Lọc danh sách Order theo Search
  const filteredOrders = orders.filter((order) => {
    const searchLower = searchQuery.toLowerCase()
    return (
      `ORD-${order.orderId}`.toLowerCase().includes(searchLower) ||
      order.status.toLowerCase().includes(searchLower)
    )
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

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
            Review and manage all your past orders, downloads, and course
            enrollments.
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 pb-10">
        {/* Search */}
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
                  placeholder="Search by Order ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 h-12 text-base"
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Loading State */}
        {isLoadingOrders && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        )}

        {/* Orders List */}
        {!isLoadingOrders && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map((order, index) => (
              <motion.div
                key={order.orderId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-xl transition-shadow flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Package className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">
                          Order #{order.orderId}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        order.status === "completed" ? "default" : "secondary"
                      }
                      className="capitalize"
                    >
                      {order.status}
                    </Badge>
                  </div>

                  <div className="mt-4 pt-4 border-t flex-1">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-muted-foreground">
                        Total Amount
                      </span>
                      <span className="text-xl font-bold text-primary">
                        ${Number(order.totalAmount).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => handleViewDetails(order.orderId)}
                  >
                    <Receipt className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoadingOrders && filteredOrders.length === 0 && (
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
                {searchQuery ? "No orders found" : "No purchase history yet"}
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                {searchQuery
                  ? "Try adjusting your search to find what you're looking for."
                  : "Start building your AI toolkit with powerful prompts and comprehensive courses."}
              </p>
              {!searchQuery && (
                <div className="flex gap-4 justify-center">
                  <Button size="lg" onClick={() => navigate("/courses")}>
                    <BookOpen className="h-5 w-5 mr-2" />
                    Explore Courses
                  </Button>
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </div>

      {/* Order Detail Modal (Dialog) */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Order Details</DialogTitle>
            <DialogDescription>
              {selectedOrder ? `Order #${selectedOrder.orderId}` : "Loading..."}
            </DialogDescription>
          </DialogHeader>

          {isLoadingDetails ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          ) : selectedOrder ? (
            <div className="space-y-6">
              {/* Header Info */}
              <div className="flex flex-wrap items-center justify-between p-4 bg-muted/30 rounded-lg gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Order Date
                  </p>
                  <p className="font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    {formatDate(selectedOrder.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 uppercase">
                    {selectedOrder.status}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">
                    Total Amount
                  </p>
                  <p className="text-xl font-bold text-primary">
                    ${Number(selectedOrder.totalAmount).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Purchased Items ({selectedOrder.items?.length || 0})
                </h3>

                <div className="space-y-4">
                  {selectedOrder.items?.map((item: any, idx: number) => (
                    <Card
                      key={idx}
                      className="p-4 flex flex-col sm:flex-row gap-4 hover:shadow-md transition-shadow"
                    >
                      <div className="w-full sm:w-32 h-24 rounded-md overflow-hidden flex-shrink-0 bg-muted">
                        {item.coverUrl ? (
                          <ImageWithFallback
                            src={item.coverUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            {item.type === "course" ? (
                              <BookOpen className="h-8 w-8 text-muted-foreground/50" />
                            ) : (
                              <Zap className="h-8 w-8 text-muted-foreground/50" />
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-bold text-lg leading-tight mb-1">
                              {item.title}
                            </h4>
                            <span className="font-bold text-primary whitespace-nowrap ml-4">
                              ${Number(item.price).toFixed(2)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant={
                                item.type === "course" ? "default" : "secondary"
                              }
                              className="capitalize"
                            >
                              {item.type}
                            </Badge>
                            {item.category && (
                              <span className="text-sm text-muted-foreground">
                                {item.category}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4 pt-4 border-t w-full">
                          {item.type === "course" ? (
                            <Button
                              size="sm"
                              className="w-full sm:w-auto"
                              onClick={() => navigate(`/my-learning/${item.id}`)}
                            >
                              <BookOpen className="h-4 w-4 mr-2" />
                              Go to Course
                            </Button>
                          ) : (
                            <Button size="sm" className="w-full sm:w-auto">
                              <Download className="h-4 w-4 mr-2" />
                              Download Prompt
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-muted/30 p-4 rounded-lg space-y-2 mt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>
                    ${(Number(selectedOrder.totalAmount) / 1.1).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (10%)</span>
                  <span>
                    $
                    {(
                      Number(selectedOrder.totalAmount) -
                      Number(selectedOrder.totalAmount) / 1.1
                    ).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t mt-2">
                  <span>Total Paid</span>
                  <span className="text-primary">
                    ${Number(selectedOrder.totalAmount).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-muted-foreground">
              Could not load order details.
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
