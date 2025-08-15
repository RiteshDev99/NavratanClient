import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import store from "./store/store.js";
import {Provider} from "react-redux";
import Home from "./components/pages/Home.jsx";
import Cart from "./components/pages/Cart.jsx";
import CheckOut from "./components/pages/CheckOut.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path : "/cart",
                element : <Cart />

            },
            {
                path : "/checkOut",
                element : <CheckOut />

            }
        ],
    },
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider  store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </StrictMode>,
)
