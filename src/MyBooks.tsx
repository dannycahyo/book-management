import React from "react";
import { List, Card, Button } from "antd";
import { BooksProps } from "./App";

type MyBooksProps = {
  books: BooksProps[];
  onDeleteBook: (id: string) => void;
};

const MyBooks = ({ books, onDeleteBook }: MyBooksProps) => {
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
        renderItem={(item, index) => (
          <List.Item>
            <Card cover={<img alt="GRIT" src={item.image} />}>
              {item.writer}
              <Meta title={item.title} description={item.reason} />
            </Card>
            <Button type="primary" danger onClick={() => onDeleteBook(item.id)}>
              Delete
            </Button>
          </List.Item>
        )}
      />
      ,
    </div>
  );
};

export default MyBooks;
