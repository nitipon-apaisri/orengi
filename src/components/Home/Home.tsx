import { Col, Divider, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import Card from "../Card/Card";
const { Title, Text } = Typography;
const Home = () => {
    const [refreshTime, setRefreshTime] = useState(10);
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
            <Row gutter={16}>
                <Col flex={3}>
                    <Card title="Stats">
                        <div className="card_stats">
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
            <div className="search_fuction">
                <Title className="app-title">
                    OREN<span className="title-highlight">JI</span> | オレン<span className="title-highlight">ジ</span>{" "}
                </Title>
            </div>
        </>
    );
};

export default Home;
