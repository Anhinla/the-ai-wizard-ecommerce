import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Separator } from "../components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog"
import { X, ShoppingBag, Tag, Loader2 } from "lucide-react"
import { getCart, removeItem, CartProps } from "../api/cart"

export function CartPage() {
  const navigate = useNavigate()
  const [couponCode, setCouponCode] = useState("")
  const [cartItems, setCartItems] = useState<CartProps[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch cart data on component mount
  useEffect(() => {
    fetchCartData()
  }, [])

  const fetchCartData = async () => {
    try {
      setIsLoading(true)
      const response = await getCart()
      setCartItems(response.payload || [])
    } catch (error) {
      console.error("Failed to fetch cart items:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveItem = async (itemId: number) => {
    try {
      await removeItem(itemId)
      fetchCartData()
    } catch (error) {
      console.error("Failed to remove item:", error)
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Start exploring our prompts and courses to add items to your cart.
            </p>
            <Button onClick={() => navigate("/prompts")}>Browse Prompts</Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.itemId} className="p-6">
                  <div className="flex gap-4">
                    {item.coverUrl && (
                      <img
                        src={item.coverUrl}
                        alt={item.title}
                        onClick={() => navigate(`/courses/${item.itemId}`)}
                        className="w-24 h-24 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    )}

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3
                            className="font-semibold text-lg mb-1 cursor-pointer hover:text-primary transition-colors inline-block"
                            onClick={() => navigate(`/courses/${item.itemId}`)}
                          >
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {item.category}
                          </p>
                        </div>

                        {/* THÊM ALERT DIALOG CHO NÚT XÓA */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <X className="h-5 w-5" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Remove item</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to remove "{item.title}"
                                from your cart?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleRemoveItem(item.itemId)}
                                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                              >
                                Remove
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>

                      <div className="flex items-center justify-end mt-4">
                        <div className="text-right flex flex-col justify-end">
                          <div className="text-xl font-bold">
                            ${item.price.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              {/* Continue Shopping */}
              <Button
                variant="outline"
                onClick={() => navigate("/courses")}
                className="w-full"
              >
                Continue Shopping
              </Button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-20">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Coupon Code */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <Button variant="outline">Apply</Button>
                  </div>
                </div>

                <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  size="lg"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Secure checkout powered by Stripe
                </p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
