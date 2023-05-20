import { Col, Divider, Row, Typography, Input, Space } from "antd";
import { useCallback, useContext, useEffect, useState } from "react";
import Card from "../Card/Card";
import { EthereumContext } from "../../contexts/EthereumContext";
import { EthereumContextType, ethereumStats, ethereumGasFee } from "../../@types/types";
import { numberFormator } from "../../utils/numberFormator";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import EmptyDataDisplay from "../Empty/Empty";
const { Title, Text } = Typography;
const { Search } = Input;
const Home = () => {
    const defaultTimer = 15;
    const navigate = useNavigate();
    const { getStats, getGasFee } = useContext(EthereumContext) as EthereumContextType;
    const [refreshTime, setRefreshTime] = useState<number>(defaultTimer);
    const [stats, setStats] = useState<ethereumStats>();
    const [gasFee, setGasFee] = useState<ethereumGasFee>();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const onSearch = (value: string) => {
        navigate(`/account/${value}`);
    };

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
        fetchStats().catch((err) => {
            setTimeout(() => {
                setIsLoaded(true);
            }, 500);
            console.log(err);
        });
        fetchGasFee().catch((err) => {
            setTimeout(() => {
                setIsLoaded(true);
            }, 500);

            console.log(err);
        });
    }, [fetchStats, fetchGasFee]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRefreshTime(refreshTime - 1);
        }, 1000);
        if (refreshTime === 0) {
            setRefreshTime(defaultTimer);
            fetchGasFee().catch((err) => {
                console.log(err);
            });
        }
        return () => clearInterval(interval);
    }, [refreshTime, fetchGasFee]);
    useEffect(() => {
        if (stats && gasFee) {
            setIsLoaded(true);
        }
    }, [stats, gasFee]);
    return (
        <>
            <div className="hero">
                <Title className="app-title">
                    OREN<span className="title-highlight">JI</span> | オレン<span className="title-highlight">ジ</span>{" "}
                </Title>
                <div className="search-function">
                    <Search placeholder="Search" allowClear enterButton="Search" size="large" onPressEnter={(v) => onSearch((v.target as HTMLInputElement).value)} onSearch={(v) => onSearch(v)} />
                </div>
            </div>
            <Divider />
            {(() => {
                if (!isLoaded) {
                    return <Loader />;
                }
                if (isLoaded && !stats && !gasFee) {
                    return <EmptyDataDisplay />;
                }
                if (isLoaded && stats && gasFee) {
                    return (
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
                                                                <Text>{`~ ${numberFormator(Number(stats?.supply.value).toFixed(0))}`}</Text>
                                                                <Text>{stats?.supply.unit}</Text>
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
                                                                <Text>{`~ ${numberFormator(Number(stats?.burntFees.value).toFixed(0))}`}</Text>
                                                                <Text>{stats?.burntFees.unit}</Text>
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
                                                                <Text>{numberFormator(Number(stats?.totalNodes.value))}</Text>
                                                                <Text>{stats?.totalNodes.unit}</Text>
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
                                                        {gasFee?.average.value}
                                                    </Title>
                                                    <Title level={4} style={{ marginBottom: 0 }}>
                                                        {gasFee?.average.unit}
                                                    </Title>
                                                </Space>
                                                <Text type="secondary">{`Last block: ${gasFee?.lastBlock}`}</Text>
                                            </Space>
                                        </div>

                                        <div className="gas-price-refresh">
                                            <Text>Refresh in: {refreshTime}</Text>
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    );
                }
            })()}
        </>
    );
};

export default Home;
