import { useCallback, useContext, useEffect, useState } from "react";
import { EthereumContext } from "../../contexts/EthereumContext";
import { EthereumContextType } from "../../@types/types";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import EmptyDataDisplay from "../Empty/Empty";
import { Divider } from "antd";

const Account = () => {
    const { account, getAccount, resolveName } = useContext(EthereumContext) as EthereumContextType;
    const { address } = useParams();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [addressByENS, setAddressByENS] = useState<string>("");
    const fetchAccount = useCallback(async () => {
        await getAccount(address as string);
    }, [getAccount, address]);
    const fetchAddressByENS = useCallback(async () => {
        const res = await resolveName(address as string);
        setAddressByENS(res as unknown as string);
    }, [address, resolveName]);
    const fetchAccountByLookupAddress = useCallback(async () => {
        await getAccount(addressByENS as string);
    }, [addressByENS, getAccount]);
    useEffect(() => {
        if (address?.includes(".eth")) {
            fetchAddressByENS().catch((err) => {
                console.log(err);
            });
        }
        if (addressByENS === "") {
            if (account === undefined || account.address !== address) {
                fetchAccount().catch((err) => {
                    setIsLoaded(true);
                    console.log(err);
                });
            }
        } else {
            if (account === undefined || account.address !== addressByENS) {
                fetchAccountByLookupAddress().catch((err) => {
                    setIsLoaded(true);
                    console.log(err);
                });
            }
        }
        if (account !== undefined && account.address === address) setIsLoaded(true);
    }, [account, address, addressByENS, fetchAccount, fetchAddressByENS, fetchAccountByLookupAddress]);
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
