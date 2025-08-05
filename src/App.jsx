import { Footer, Header } from "./components/index.js";
import { Outlet } from "react-router-dom";

function App() {
    return (
        <div className="flex flex-col min-h-screen w-full bg-sky-50">
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default App;
