import {BrowserRouter} from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import {Provider} from "react-redux";
import {store} from "./store/Store";
import AppRouter from "./components/AppRouter";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Header/>
                <AppRouter/>
                <Footer/>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
