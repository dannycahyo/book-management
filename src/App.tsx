import React from "react";
import UpComingBooks from "./UpComingBooks";
import MyBooks from "./MyBooks";
import { Layout, Menu, Breadcrumb } from "antd";
import { Switch, Link, Route, useLocation } from "react-router-dom";

function App() {
  const { Header, Content, Footer } = Layout;
  const { pathname } = useLocation();

  return (
    <div>
      <Layout className="layout">
        <Header style={{ display: "flex" }}>
          <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]}>
            <Menu.Item key="/mybooks">
              <Link to="/mybooks">My Books</Link>
            </Menu.Item>
            <Menu.Item key="/upcomingbooks">
              <Link to="/upcomingbooks">Up Coming Books</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content
          style={{ padding: "0 50px", textAlign: "center", minHeight: 450 }}
        >
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Switch>
            <Route path="/mybooks">
              <MyBooks />
            </Route>
            <Route path="/upcomingbooks">
              <UpComingBooks />
            </Route>
          </Switch>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Book Management System, Created By Danny ©2020
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
