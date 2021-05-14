import React from "react";
import LandingPage from "./LandingPage";
import UpComingBooks from "./UpComingBooks";
import MyBooks from "./MyBooks";
import Logo from "./Logo";
import { Layout, Menu, Space, Typography } from "antd";
import {
  GithubOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import { Switch, Link, Route, useLocation } from "react-router-dom";

function App() {
  const { Header, Content, Footer } = Layout;
  const { pathname } = useLocation();

  return (
    <div>
      <Layout className="layout">
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 40,
          }}
        >
          <Logo />
          <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]}>
            <Menu.Item key="/mybooks">
              <Link to="/mybooks">
                {" "}
                <Typography.Title
                  level={5}
                  style={{
                    color: "lightblue",
                    marginTop: 20,
                    marginBottom: 20,
                  }}
                >
                  My Books
                </Typography.Title>
              </Link>
            </Menu.Item>
            <Menu.Item key="/upcomingbooks">
              <Link to="/upcomingbooks">
                <Typography.Title
                  level={5}
                  style={{
                    color: "lightblue",
                    marginTop: 20,
                    marginBottom: 20,
                  }}
                >
                  Up Coming Books
                </Typography.Title>
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div style={{ minHeight: 700, padding: 24, background: "#fff" }}>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/mybooks" component={MyBooks} />
              <Route exact path="/upcomingbooks" component={UpComingBooks} />
            </Switch>
          </div>
        </Content>
        <Footer
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "center",
            background: "#001529",
            color: "white",
            marginTop: 40,
          }}
        >
          <Logo />
          <Typography.Title
            level={5}
            style={{
              color: "lightblue",
            }}
          >
            Book Management System, Created By Danny Dwi Cahyono ©2020
          </Typography.Title>
          <Space size="large">
            <Link to="https://github.com/dannycahyo">
              <GithubOutlined
                style={{ fontSize: "25px", color: "lightblue" }}
              />
            </Link>
            <Link to="https://www.linkedin.com/in/danny-cahyo/">
              <LinkedinOutlined
                style={{ fontSize: "25px", color: "lightblue" }}
              />
            </Link>
            <Link to="https://www.instagram.com/danny_cahyo/">
              <InstagramOutlined
                style={{ fontSize: "25px", color: "lightblue" }}
              />
            </Link>
          </Space>
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
