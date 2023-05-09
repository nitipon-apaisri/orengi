import { Col, Divider, Row, Typography, Input } from "antd";
import { useEffect, useState } from "react";
import Card from "../Card/Card";
const { Title, Text } = Typography;
const { Search } = Input;
const Home = () => {
    const [refreshTime, setRefreshTime] = useState<number>(10);
    const onSearch = (value: string) => console.log(value);
    useEffect(() => {
        document.title = "ORENJI | オレンジ";
    }, []);
    useEffect(() => {
        const interval = setInterval(() => {
            setRefreshTime(refreshTime - 1);
        }, 1000);
        if (refreshTime === 0) setRefreshTime(10);
        return () => clearInterval(interval);
    }, [refreshTime]);
    return (
        <>
            <div className="hero">
                <Title className="app-title">
                    OREN<span className="title-highlight">JI</span> | オレン<span className="title-highlight">ジ</span>{" "}
                </Title>
                <div className="search-function">
                    <Search placeholder="Search" allowClear enterButton="Search" size="large" onPressEnter={(v) => onSearch(v.target.value)} />
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
                                            <></>
                                        </Card>
                                    </Col>

                                    <Col span={8}>
                                        <Card bordered={true} boxShadow={false}>
                                            <Title level={5}>Burned</Title>
                                            <Divider />
                                            <></>
                                        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card bordered={true} boxShadow={false}>
                                            <Title level={5}>Nodes</Title>
                                            <Divider />
                                            <></>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                    <Col flex={2}>
                        <Card title="Gas Price" className="gas-price-card">
                            <></>
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
