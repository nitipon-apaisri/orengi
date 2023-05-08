import React from "react";
import { Typography, Divider } from "antd";
import { cardProps } from "../../@types/types";
const { Title } = Typography;
const Card: React.FC<cardProps> = ({ children, title, width, bordered }) => {
    return (
        <div className="card" style={{ width: width !== undefined ? width : "100%", border: bordered !== undefined ? (bordered ? "0.5px solid #e8e8e8" : "") : "0.5px solid #e8e8e8" }}>
            <Title level={5}>{title}</Title>
            <Divider />
            {children}
        </div>
    );
};

export default Card;
