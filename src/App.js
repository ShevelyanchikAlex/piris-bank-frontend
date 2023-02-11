import {BrowserRouter} from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import AppRouter from "./components/AppRouter";

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <AppRouter/>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
