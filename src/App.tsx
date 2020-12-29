import React, { useState } from "react";
import UpComingBooks from "./UpComingBooks";
import MyBooks from "./MyBooks";
import { Layout, Menu, Breadcrumb } from "antd";
import { nanoid } from "nanoid";

type Pages = "upcomingBooks" | "myBooks";

export type BooksProps = {
  title: string;
  writer: string;
  price: string | number | undefined;
  image: string;
  reason: string;
  isBuyed: boolean;
  id: string;
};

function App() {
  const [books, setBooks] = useState<BooksProps[]>([
    {
      title: "Ego Is The Enemy",
      writer: "Ryan Holiday",
      price: 75.0,
      image: "https://images-na.ssl-images-amazon.com/images/I/81VHlnP5p-L.jpg",
      reason: "Because I Wanna Be A Good Leader",
      isBuyed: true,
      id: nanoid(),
    },
    {
      title: "GRIT",
      writer: "Angela Duckworth",
      price: 120.0,
      image:
        "https://img2.pngdownload.id/20180812/ax/kisspng-grit-the-power-of-passion-and-perseverance-book-u-5b6fc6238a9c81.2333384415340518755678.jpg",
      reason: "Because I've Gotten Recomendation From My Role Model",
      isBuyed: true,
      id: nanoid(),
    },
    {
      title: "Sapiens",
      writer: "Yuval Noah Harari",
      price: 125.0,
      image:
        "https://prodimage.images-bn.com/pimages/9780062316110_p0_v5_s1200x630.jpg",
      reason: "Because This Book Is Part Of My Livelihood",
      isBuyed: false,
      id: nanoid(),
    },
  ]);

  const { Header, Content, Footer } = Layout;

  const [activePage, setActivePage] = React.useState<Pages>("myBooks");

  const handleAddBook = (newBook: BooksProps) => {
    setBooks([...books, newBook]);
  };

  const handleBuyBook = (id: string) => {
    const tempBooks = [...books];
    const index = tempBooks.findIndex((book) => {
      return book.id === id;
    });
    tempBooks[index].isBuyed = true;
    setBooks(tempBooks);
  };

  return (
    <div>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal">
            <Menu.Item
              key="1"
              onClick={() => {
                setActivePage("myBooks");
              }}
            >
              My Books
            </Menu.Item>
            <Menu.Item
              key="2"
              onClick={() => {
                setActivePage("upcomingBooks");
              }}
            >
              Up Coming Books
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
          {activePage === "upcomingBooks" ? (
            <UpComingBooks
              books={books}
              onSubmit={handleAddBook}
              onBuy={handleBuyBook}
            />
          ) : (
            <MyBooks books={books} />
          )}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Book Management System, Created By Danny ©2020
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
