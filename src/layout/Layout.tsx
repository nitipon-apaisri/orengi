import React from "react";
import { Layout, Menu } from "antd";
import { layoutProps } from "../@types/types";
const { Header, Content, Footer } = Layout;
const AppLayout: React.FC<layoutProps> = ({ children }) => {
    return (
        <Layout hasSider={false}>
            <Header>
                <Menu
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={["1"]}
                    items={new Array(3).fill(null).map((_, index) => {
                        const key = index + 1;
                        return {
                            key,
                            label: `nav ${key}`,
                        };
                    })}
                />
            </Header>
            <Content className="container">{children}</Content>
            <Footer>Bamboo ©2023</Footer>
        </Layout>
    );
};

export default AppLayout;
