import React, { useState } from "react";
import useFetchBook, { Book } from "./useFetchBook";
import {
  List,
  Button,
  Modal,
  Form,
  Input as AntdInput,
  Input,
  Typography,
  Card,
  Image,
  Row,
  Col,
  Space,
  Avatar,
  Descriptions,
  Result,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { RiBookMarkFill } from "react-icons/ri";
import { FormLayout } from "antd/lib/form/Form";

const MyBooks = () => {
  const { books, editBook, deleteBook } = useFetchBook();

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [isOpenModalVisible, setIsOpenModalVisible] = useState<boolean>(false);

  const [titleValue, setTitleValue] = useState<string>("");
  const [authorValue, setAuthorValue] = useState<string>("");
  const [categoryValue, setCategoryValue] = useState<string>("");
  const [priceValue, setPriceValue] = useState<string>("");
  const [imageValue, setImageValue] = useState<string>("");
  const [reasonValue, setReasonValue] = useState<string>("");

  const [searchValue, setSearchValue] = useState<string>("");

  const [formLayout, setFormLayout] = useState<FormLayout>("vertical");

  const handleShowModal = (layout: FormLayout = "horizontal") => {
    setFormLayout(layout);
    setIsModalVisible(true);
    if (selectedBook) {
      setTitleValue(selectedBook.title);
      setAuthorValue(selectedBook.author);
      setPriceValue(selectedBook.price);
      setCategoryValue(selectedBook.category);
      setImageValue(selectedBook.image);
      setReasonValue(selectedBook.reason);
    }
  };

  const handleShowOpenModal = (book: Book | null) => {
    setSelectedBook(book);
    setIsOpenModalVisible(true);
  };

  const handleShowOpenModalOk = () => {
    setIsOpenModalVisible(false);
    setSelectedBook(null);
  };

  const handleShowOpenModalCancel = () => {
    setIsOpenModalVisible(false);
    setSelectedBook(null);
  };

  const handleFinishEdit = () => {
    const editedBook = {
      title: titleValue,
      author: authorValue,
      category: categoryValue,
      price: priceValue,
      image: imageValue,
      isBuyed: true,
      reason: reasonValue,
      _id: selectedBook?._id ?? "",
    };
    editBook(editedBook);
    setSelectedBook(editedBook);
    setIsModalVisible(false);
  };

  const handleDeleteBook = (_id: string) => {
    deleteBook({
      title: titleValue,
      author: authorValue,
      category: categoryValue,
      price: priceValue,
      image: imageValue,
      isBuyed: true,
      reason: reasonValue,
      _id,
    });
    setIsOpenModalVisible(false);
    setSelectedBook(null);
  };

  const filteredBooks = books?.filter((book: Book) => {
    return (
      book.title
        .toLocaleLowerCase()
        .includes(searchValue.toLocaleLowerCase()) && book.isBuyed
    );
  });

  const IconText = ({ icon, text }: any) => (
    <Space size="small">
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const { TextArea } = Input;

  return (
    <div>
      <Row justify="center">
        <Col span={20}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 20,
              justifyContent: "center",
            }}
          >
            <Typography.Title
              style={{ color: "#3182CE", marginTop: 5 }}
              level={3}
            >
              Find Your Book
            </Typography.Title>
            <AntdInput
              style={{ width: "50%", marginLeft: 20 }}
              placeholder="Are You Looking For Some Books ?"
              allowClear
              size="middle"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSearchValue(event.target.value)
              }
              value={searchValue}
            />
          </div>
          {filteredBooks?.length === 0 ? (
            <Result status="404" title="404" subTitle="Can't Find Your Book" />
          ) : (
            <List
              grid={{
                gutter: 42,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 6,
                xxl: 3,
              }}
              dataSource={filteredBooks}
              renderItem={(book) => (
                <List.Item>
                  <Card
                    actions={[
                      <IconText
                        icon={UserOutlined}
                        text={book.author}
                        key="list-vertical-star-o"
                      />,
                      <Button
                        style={{
                          background: "#3182CE",
                          color: "white",
                          fontWeight: "bold",
                        }}
                        onClick={() => handleShowOpenModal(book)}
                      >
                        Detail Book
                      </Button>,
                      <IconText
                        icon={RiBookMarkFill}
                        text={book.category}
                        key="list-vertical-like-o"
                      />,
                    ]}
                    hoverable
                    cover={
                      <Image
                        style={{ height: 375 }}
                        src={book.image}
                        alt="BookImg"
                        preview={false}
                      />
                    }
                  >
                    <Card.Meta
                      avatar={
                        <Avatar src="https://i.pinimg.com/564x/5e/af/f3/5eaff33f83a4d168947c965bbf4f8c40.jpg" />
                      }
                      title={
                        <Typography.Title
                          style={{ color: "#3182CE" }}
                          level={4}
                        >
                          {book.title}
                        </Typography.Title>
                      }
                    />
                  </Card>
                </List.Item>
              )}
            />
          )}
        </Col>
      </Row>
      <Modal
        width={700}
        centered
        visible={isOpenModalVisible}
        onOk={handleShowOpenModalOk}
        onCancel={handleShowOpenModalCancel}
      >
        {selectedBook && (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <Image
                style={{ alignItems: "center" }}
                alt="Detail Book"
                src={selectedBook.image}
                width={350}
                height={300}
                preview={false}
              />
              <Descriptions
                title={
                  <Typography.Title style={{ color: "#3182CE" }} level={4}>
                    Detail Book
                  </Typography.Title>
                }
                bordered
                layout="vertical"
                column={4}
              >
                <Descriptions.Item
                  label={
                    <Typography.Title style={{ color: "#3182CE" }} level={5}>
                      Title
                    </Typography.Title>
                  }
                >
                  {selectedBook.title}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <Typography.Title style={{ color: "#3182CE" }} level={5}>
                      Author
                    </Typography.Title>
                  }
                >
                  {selectedBook.author}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <Typography.Title style={{ color: "#3182CE" }} level={5}>
                      Category
                    </Typography.Title>
                  }
                >
                  {selectedBook.category}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <Typography.Title style={{ color: "#3182CE" }} level={5}>
                      Price
                    </Typography.Title>
                  }
                >
                  {selectedBook.price}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <Typography.Title style={{ color: "#3182CE" }} level={5}>
                      Reason
                    </Typography.Title>
                  }
                >
                  {selectedBook.reason}
                </Descriptions.Item>
              </Descriptions>
            </div>
            <Space size="middle">
              <Button
                type="primary"
                onClick={() => handleShowModal(formLayout)}
              >
                Edit
              </Button>
              <Button
                type="primary"
                danger
                onClick={() => handleDeleteBook(selectedBook._id)}
              >
                Delete
              </Button>
            </Space>
          </>
        )}
      </Modal>
      <Modal
        title={
          <Typography.Title style={{ color: "#3182CE" }} level={4}>
            My Books
          </Typography.Title>
        }
        width={700}
        centered
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form layout={formLayout}>
          <Form.Item
            label={
              <Typography.Title style={{ color: "#3182CE" }} level={5}>
                Title
              </Typography.Title>
            }
            htmlFor="title"
          >
            <AntdInput
              id="title"
              value={titleValue}
              allowClear
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setTitleValue(event.target.value)
              }
            />
          </Form.Item>
          <Form.Item
            label={
              <Typography.Title style={{ color: "#3182CE" }} level={5}>
                Author
              </Typography.Title>
            }
            htmlFor="author"
          >
            <AntdInput
              id="author"
              value={authorValue}
              allowClear
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setAuthorValue(event.target.value)
              }
            />
          </Form.Item>
          <Form.Item
            label={
              <Typography.Title style={{ color: "#3182CE" }} level={5}>
                Category
              </Typography.Title>
            }
            htmlFor="category"
          >
            <AntdInput
              id="category"
              value={categoryValue}
              allowClear
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setCategoryValue(event.target.value)
              }
            />
          </Form.Item>
          <Form.Item
            label={
              <Typography.Title style={{ color: "#3182CE" }} level={5}>
                Price
              </Typography.Title>
            }
            htmlFor="price"
          >
            <AntdInput
              id="price"
              value={priceValue}
              allowClear
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setPriceValue(event.target.value)
              }
            />
          </Form.Item>
          <Form.Item
            label={
              <Typography.Title style={{ color: "#3182CE" }} level={5}>
                Image
              </Typography.Title>
            }
            htmlFor="image"
          >
            <AntdInput
              id="image"
              value={imageValue}
              allowClear
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setImageValue(event.target.value)
              }
            />
          </Form.Item>
          <Form.Item
            label={
              <Typography.Title style={{ color: "#3182CE" }} level={5}>
                Reason
              </Typography.Title>
            }
            htmlFor="reason"
          >
            <TextArea
              id="reason"
              value={reasonValue}
              allowClear
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                setReasonValue(event.target.value)
              }
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleFinishEdit}>
              Finish
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MyBooks;
