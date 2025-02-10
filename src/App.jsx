import { RouterProvider } from "react-router-dom";
import router from "./Routes/AppRoute";
import "./App.css";
import { Provider } from "react-redux";
import Store from "./Store/store";
function App() {

  return (
    <Provider store={Store}>
      <RouterProvider router={router} />
    </Provider>
  );;
}

export default App;
