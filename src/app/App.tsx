import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export default function App() {
  return <RouterProvider router={router} />
}
