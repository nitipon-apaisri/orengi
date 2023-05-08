import { Col, Row, Typography } from "antd";
import { useEffect } from "react";
import Card from "../Card/Card";
const { Title } = Typography;
const Home = () => {
    useEffect(() => {
        document.title = "ORENJI | オレンジ";
    }, []);
    return (
        <div>
            <Card title="Stats">
                <Row gutter={8}>
                    <Col span={4}>
                        <Card title="Supply" bordered={false}>
                            <></>
                        </Card>
                    </Col>
                    {/* <Col span={4}>
                    <Card title="Stacking">
                        <></>
                    </Card>
                </Col> */}
                    <Col span={4}>
                        <Card title="Burned" bordered={false}>
                            <></>
                        </Card>
                    </Col>
                    {/* <Col span={4}>
                    <Card title="Withdrawn">
                        <></>
                    </Card>
                </Col> */}
                    <Col span={4}>
                        <Card title="Nodes" bordered={false}>
                            <></>
                        </Card>
                    </Col>
                </Row>
            </Card>
            <Title> オレンジ </Title>
        </div>
    );
};

export default Home;
