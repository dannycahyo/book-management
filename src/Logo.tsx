import React from "react";
import { Link } from "react-router-dom";
import { BookTwoTone } from "@ant-design/icons";
import { Typography } from "antd";

const Logo = () => {
  return (
    <Link to="/">
      <Typography.Title
        level={4}
        style={{
          display: "flex",
          alignItems: "center",
          color: "lightblue",
          marginTop: 16,
          marginLeft: 40,
        }}
      >
        <BookTwoTone style={{ marginRight: 2 }} />
        <span>Book App</span>
      </Typography.Title>
    </Link>
  );
};

export default Logo;
