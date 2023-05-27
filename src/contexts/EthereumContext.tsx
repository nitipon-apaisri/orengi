import { createContext, useState } from "react";
import { EthereumContextType, contextChildren, ethereumAccount } from "../@types/types";
import { EthereumApis } from "../services/api";

const EthereumContext = createContext<EthereumContextType | null>(null);
const EthereumProvider = ({ children }: contextChildren) => {
    const ethereumApis = new EthereumApis();
    const [account, setAccount] = useState<ethereumAccount>();
    const getAccount = async (address: string) => {
        const res = await ethereumApis.getEthereumAccount(address);
        setAccount(res.data.account);
    };
    const getStats = async () => {
        const res = await ethereumApis.getEthereumStats();
        const data = await res.data.stats;
        return data;
    };
    const getGasFee = async () => {
        const res = await ethereumApis.getEthereumGasFee();
        const data = await res.data.gas;
        return data;
    };
    const resolveName = async (name: string) => {
        const res = await ethereumApis.resolveName(name);
        const data = await res.data.address;
        return data;
    };
    return <EthereumContext.Provider value={{ account, getAccount, getStats, getGasFee, resolveName }}>{children}</EthereumContext.Provider>;
};

export { EthereumContext, EthereumProvider };
