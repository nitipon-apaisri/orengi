import { Col, Divider, Row, Typography, Input, Space } from "antd";
import { useCallback, useContext, useEffect, useState } from "react";
import Card from "../Card/Card";
import { EthereumContext } from "../../contexts/EthereumContext";
import { EthereumContextType, ethereumStats, ethereumGasFee } from "../../@types/types";
const { Title, Text } = Typography;
const { Search } = Input;
const Home = () => {
    const { getStats, getGasFee } = useContext(EthereumContext) as EthereumContextType;
    const [refreshTime, setRefreshTime] = useState<number>(10);
    const [stats, setStats] = useState<ethereumStats>();
    const [gasFee, setGasFee] = useState<ethereumGasFee>();
    const onSearch = (value: string) => console.log(value);

    const fetchStats = useCallback(async () => {
        const res = await getStats();
        setStats(res as unknown as ethereumStats);
    }, [getStats]);

    const fetchGasFee = useCallback(async () => {
        const res = await getGasFee();
        setGasFee(res as unknown as ethereumGasFee);
    }, [getGasFee]);

    useEffect(() => {
        document.title = "ORENJI | オレンジ";
        fetchStats().catch((err) => console.log(err));
        fetchGasFee().catch((err) => console.log(err));
    }, [fetchStats, fetchGasFee]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRefreshTime(refreshTime - 1);
        }, 1000);
        if (refreshTime === 0) {
            setRefreshTime(10);
            fetchGasFee().catch((err) => console.log(err));
        }
        return () => clearInterval(interval);
    }, [refreshTime, fetchGasFee]);

    return (
        <>
            <div className="hero">
                <Title className="app-title">
                    OREN<span className="title-highlight">JI</span> | オレン<span className="title-highlight">ジ</span>{" "}
                </Title>
                <div className="search-function">
                    <Search placeholder="Search" allowClear enterButton="Search" size="large" onPressEnter={(v) => onSearch((v.target as HTMLInputElement).value)} />
                </div>
            </div>
            <Divider />
            <div className="stats">
                <Row gutter={16}>
                    <Col flex={3}>
                        <Card title="Stats">
                            <div className="card-stats">
                                <Row gutter={8}>
                                    <Col span={8}>
                                        <Card bordered={true} boxShadow={false}>
                                            <Title level={5}>Supply</Title>
                                            <Divider />
                                            <div className="stat">
                                                <Space>
                                                    <Text>{`~ ${Number(stats?.stats.supply.value).toFixed(0)}`}</Text>
                                                    <Text>{stats?.stats.supply.unit}</Text>
                                                </Space>
                                            </div>
                                        </Card>
                                    </Col>

                                    <Col span={8}>
                                        <Card bordered={true} boxShadow={false}>
                                            <Title level={5}>Burned</Title>
                                            <Divider />
                                            <div className="stat">
                                                <Space>
                                                    <Text>{`~ ${Number(stats?.stats.burntFees.value).toFixed(0)}`}</Text>
                                                    <Text>{stats?.stats.burntFees.unit}</Text>
                                                </Space>
                                            </div>
                                        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card bordered={true} boxShadow={false}>
                                            <Title level={5}>Nodes</Title>
                                            <Divider />
                                            <div className="stat">
                                                <Space>
                                                    <Text>{stats?.stats.totalNodes.value}</Text>
                                                    <Text>{stats?.stats.totalNodes.unit}</Text>
                                                </Space>
                                            </div>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                    <Col flex={2}>
                        <Card title="Gas Price ( Average )" className="gas-price-card">
                            <div className="wrapper">
                                <Space direction="vertical">
                                    <Space>
                                        <Title level={4} style={{ marginBottom: 0 }}>
                                            {gasFee?.gas.average.value}
                                        </Title>
                                        <Title level={4} style={{ marginBottom: 0 }}>
                                            {gasFee?.gas.average.unit}
                                        </Title>
                                    </Space>
                                    <Text type="secondary">{`Last block: ${gasFee?.gas.lastBlock}`}</Text>
                                </Space>
                            </div>

                            <div className="gas-price-refresh">
                                <Text>Refresh in: {refreshTime}</Text>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Home;
