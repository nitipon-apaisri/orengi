type layoutProps = { children: React.ReactNode };
type cardProps = { children: React.ReactNode; title?: string; width?: number; bordered?: boolean; boxShadow?: boolean; className?: string };
type contextChildren = { children: React.ReactNode };
interface EthereumContextType {
    account?: ethereumAccount;
    stats?: ethereumStats;
    getAccount: (address: string) => void;
    getStats: () => void;
    getGasFee: () => void;
}
interface ethereumAccount {
    address: string;
    balance: valueFormat;
    transactions: { sent: unknown; received: unknown };
    tokens: Array<tokenERC20>;
}
interface ethereumStats {
    supply: valueFormat;
    staking: valueFormat;
    burntFees: valueFormat;
    totalWithdrawn: valueFormat;
    totalNodes: valueFormat;
}
interface ethereumGasFee {
    average: valueFormat;
    lastBlock: number;
}
interface valueFormat {
    value: number;
    unit: string;
}
interface tokenERC20 {
    name: string;
    balance: string;
}
export type { EthereumContextType, ethereumAccount, layoutProps, cardProps, contextChildren, ethereumStats, ethereumGasFee };
