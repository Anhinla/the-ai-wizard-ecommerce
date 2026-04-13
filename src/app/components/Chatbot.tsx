import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Wand2, Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Input } from "./ui/input"
import { motion, AnimatePresence } from "motion/react"
import ReactMarkdown from "react-markdown"
import { Link } from "react-router" // Sử dụng Link của react-router để chuyển trang mượt mà

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: "1",
      type: "bot" as const,
      content:
        "Hi! I'm your AI assistant. How can I help you refine a prompt or find a course today?",
    },
  ])
  const [input, setInput] = useState("")

  // Ref để tự động cuộn xuống cuối khi có tin nhắn mới
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  const suggestions = [
    "Show me ChatGPT prompts",
    "Best AI courses for beginners",
    "Marketing prompts",
    "Help me choose a course",
  ]

  // Lấy API URL từ env
  const API_URL = "https://prompt-wizzard-be.onrender.com"

  const handleSend = async (textToSend?: string) => {
    const userMessage = textToSend || input.trim()
    if (!userMessage) return

    const currentMessages = [...messages]

    // Thêm tin nhắn của user vào UI ngay lập tức
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: "user" as const,
        content: userMessage,
      },
    ])
    setInput("")
    setIsLoading(true)

    try {
      // Gọi xuống Backend Express
      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          chatHistory: currentMessages, // Gửi lịch sử chat
        }),
      })

      const data = await response.json()

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            type: "bot" as const,
            content: data.reply,
          },
        ])
      } else {
        throw new Error("Failed to get response")
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          type: "bot" as const,
          content:
            "Sorry, my magic is currently fizzling. Please try again later!",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              size="lg"
              className="h-14 w-14 rounded-full bg-primary shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              onClick={() => setIsOpen(true)}
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[380px]"
          >
            <Card className="flex flex-col h-[500px] shadow-2xl border-border overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20">
                    <Wand2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Wizard Assistant</h3>
                    <p className="text-xs opacity-90">Online</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20 scroll-smooth">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg px-4 py-2 text-sm leading-relaxed ${
                        message.type === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-card border text-card-foreground shadow-sm"
                      }`}
                    >
                      {/* --- PHẦN RENDER MARKDOWN ĐÃ FIX LỖI --- */}
                      <ReactMarkdown
                        components={{
                          // Cấu hình style cho các thẻ HTML được dịch từ Markdown
                          p: ({ node, ...props }) => (
                            <p
                              className="mb-2 last:mb-0 whitespace-pre-wrap"
                              {...props}
                            />
                          ),
                          strong: ({ node, ...props }) => (
                            <strong className="font-semibold" {...props} />
                          ),
                          ul: ({ node, ...props }) => (
                            <ul
                              className="list-disc pl-4 mb-2 space-y-1"
                              {...props}
                            />
                          ),
                          li: ({ node, ...props }) => (
                            <li className="mb-1" {...props} />
                          ),
                          a: ({ node, href, ...props }) => {
                            // Bắt link nội bộ và dùng react-router Link để chuyển trang
                            if (href?.startsWith("/")) {
                              return (
                                <Link
                                  to={href}
                                  className="text-blue-600 hover:text-blue-800 underline font-medium transition-colors"
                                  onClick={() => setIsOpen(false)} // Tự động đóng chat khi click link
                                  {...(props as any)}
                                />
                              )
                            }
                            return (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 underline font-medium"
                                {...props}
                              />
                            )
                          },
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg px-4 py-3 bg-card border text-card-foreground shadow-sm flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        The Wizard is thinking...
                      </span>
                    </div>
                  </div>
                )}

                {/* Suggestions */}
                {messages.length === 1 && (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">
                      Suggested questions:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          disabled={isLoading}
                          className="text-xs px-3 py-1.5 rounded-full border bg-card hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                          onClick={() => handleSend(suggestion)}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Element ẩn để auto-scroll tới */}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t bg-card">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && !isLoading && handleSend()
                    }
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button
                    size="icon"
                    onClick={() => handleSend()}
                    disabled={isLoading || !input.trim()}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
