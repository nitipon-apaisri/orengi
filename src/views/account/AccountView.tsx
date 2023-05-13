import Account from "../../components/Account/Account";
import { EthereumProvider } from "../../contexts/EthereumContext";

const AccountView = () => (
    <EthereumProvider>
        <Account />
    </EthereumProvider>
);
export default AccountView;
