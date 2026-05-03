import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom" 
import { Loader2, CheckCircle2, XCircle } from "lucide-react"
import { apiClientVNPay } from "../api/client"
import { Card } from "../components/ui/card"
import { Button } from "../components/ui/button"

export function VNPayReturnPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  )
  const [message, setMessage] = useState("Verifying your payment...")

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const params = Object.fromEntries(searchParams.entries())

        const response = await apiClientVNPay.get("/vnpay_return", { params })

        if (response.data.success) {
          setStatus("success")
          setMessage("Payment successful! Thank you for your purchase.")
        } else {
          setStatus("error")
          setMessage(response.data.message || "Transaction failed.")
        }
      } catch (error) {
        console.error("Payment verification error:", error)
        setStatus("error")
        setMessage("Server connection error during payment verification.")
      }
    }

    if (searchParams.get("vnp_SecureHash")) {
      verifyPayment()
    } else {
      setStatus("error")
      setMessage("Transaction information not found.")
    }
  }, [searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="max-w-md w-full p-8 text-center shadow-sm">
        {status === "loading" && (
          <div className="flex flex-col items-center">
            <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
            <h2 className="text-xl font-semibold">{message}</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Please do not close this window.
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center">
            <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Success!</h2>
            <p className="text-slate-600 mb-6">{message}</p>
            <Button onClick={() => navigate("/")} className="w-full">
              Go to Dashboard
            </Button>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center">
            <XCircle className="h-16 w-16 text-destructive mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Payment Failed
            </h2>
            <p className="text-slate-600 mb-6">{message}</p>
            <Button
              variant="outline"
              onClick={() => navigate("/checkout")}
              className="w-full"
            >
              Return to Checkout
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
