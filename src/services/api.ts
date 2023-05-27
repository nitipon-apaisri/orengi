import axios from "axios";

class EthereumApis {
    protected ethereumApiUrl = axios.create({ baseURL: import.meta.env.VITE_API_URL });

    async getEthereumStats() {
        const res = this.ethereumApiUrl.get("/ethereum/stats");
        return res;
    }
    async getEthereumAccount(address: string) {
        const res = this.ethereumApiUrl.get(`/ethereum/account?address=${address}`);
        return res;
    }
    async getEthereumGasFee() {
        const res = this.ethereumApiUrl.get(`/ethereum/gas`);
        return res;
    }
    async resolveName(name: string) {
        const res = this.ethereumApiUrl.get(`/ethereum/ens/resolveName?ens=${name}`);
        return res;
    }
}

export { EthereumApis };
