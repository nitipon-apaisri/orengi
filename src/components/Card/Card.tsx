import React from "react";
import { Typography, Divider } from "antd";
import { cardProps } from "../../@types/types";

const { Title } = Typography;
const Card: React.FC<cardProps> = ({ children, title, width, bordered, boxShadow, className }) => {
    const styles: React.CSSProperties = {
        width: width !== undefined ? width : "100%",
        border: bordered !== undefined ? (bordered ? "1px solid #e8e8e8" : "") : "1px solid #e8e8e8",
        boxShadow: boxShadow !== undefined ? (boxShadow ? "0px 8px 16px -6px rgba(0, 0, 0, 0.02)" : "") : "0px 8px 16px -6px rgba(0, 0, 0, 0.02)",
    };
    return (
        <div className={`card ${className ? className : ""}`} style={styles}>
            {title && (
                <>
                    <Title level={4}>{title}</Title>
                    <Divider style={{ margin: "1px 0" }} />
                </>
            )}
            {children}
        </div>
    );
};

export default Card;
