import { RouterProvider } from "react-router-dom";
// import Content from "./Content/Content";

import router from "./Routes/AppRoute";
import "./App.css"

function App() {
  return <RouterProvider router={router} />;
}

export default App;
