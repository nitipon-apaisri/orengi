import { useCallback, useContext, useEffect, useState } from "react";
import { EthereumContext } from "../../contexts/EthereumContext";
import { EthereumContextType } from "../../@types/types";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import EmptyDataDisplay from "../Empty/Empty";
import { Divider } from "antd";

const Account = () => {
    const { account, getAccount } = useContext(EthereumContext) as EthereumContextType;
    const { address } = useParams();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const fetchAccount = useCallback(async () => {
        await getAccount(address as string);
    }, [getAccount, address]);
    useEffect(() => {
        if (account === undefined || account.address !== address) {
            fetchAccount().catch((err) => {
                setIsLoaded(true);
                console.log(err);
            });
        }
        if (account !== undefined && account.address === address) setIsLoaded(true);
    }, [account, address, fetchAccount]);
    return (
        <>
            {(() => {
                if (!isLoaded) {
                    return <Loader />;
                }
                if (isLoaded && account === undefined) {
                    return <EmptyDataDisplay />;
                }
                if (isLoaded && account !== undefined) {
                    console.log(account);
                    return (
                        <>
                            <div>
                                <h1>{`Account: ${address}`} </h1>
                                <Divider style={{ margin: "16px 0" }} />
                            </div>
                        </>
                    );
                }
            })()}
        </>
    );
};

export default Account;
