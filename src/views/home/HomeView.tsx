import Home from "../../components/Home/Home";
import { EthereumProvider } from "../../contexts/EthereumContext";

const HomeView = () => {
    return (
        <EthereumProvider>
            <Home />
        </EthereumProvider>
    );
};

export default HomeView;
