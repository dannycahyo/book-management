import React from "react";
import { List, Card } from "antd";
import { BooksProps } from "./App";

type MyBooksProps = {
  books: BooksProps[];
};

const MyBooks = ({ books }: MyBooksProps) => {
  const { Meta } = Card;

  return (
    <div style={{}}>
      <h1 className="site-layout-content">My Books</h1>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={books.filter((book) => {
          return book.isBuyed === true;
          // return book.isBuyed;
        })}
        renderItem={(item) => (
          <List.Item>
            <Card cover={<img alt="GRIT" src={item.image} />}>
              {item.writer}
              <Meta title={item.title} description={item.reason} />
            </Card>
          </List.Item>
        )}
      />
      ,
    </div>
  );
};

export default MyBooks;
