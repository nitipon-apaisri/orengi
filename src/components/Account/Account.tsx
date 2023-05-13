import { useCallback, useContext, useEffect } from "react";
import { EthereumContext } from "../../contexts/EthereumContext";
import { EthereumContextType } from "../../@types/types";
import { useParams } from "react-router-dom";

const Account = () => {
    const { account, getAccount } = useContext(EthereumContext) as EthereumContextType;
    const { address } = useParams();
    const fetchAccount = useCallback(async () => {
        await getAccount(address as string);
    }, [getAccount, address]);
    useEffect(() => {
        if (account === undefined || account.address !== address) {
            fetchAccount().catch((err) => console.log(err));
        }
    }, [account, address, fetchAccount]);
    return (
        <>
            {console.log(account)}
            <div>
                <h1>Account</h1>
            </div>
        </>
    );
};

export default Account;
