import React, { useState } from "react";
import useFetchBook, { Book } from "./useFetchBook";
import {
  Input as AntdInput,
  Button,
  Modal,
  Form,
  List,
  Typography,
  Space,
  Avatar,
  Divider,
  Row,
  Col,
  Image,
  Result,
} from "antd";
import {
  BulbOutlined,
  CheckOutlined,
  DollarOutlined,
  CaretUpOutlined,
} from "@ant-design/icons";
import { RiBookMarkFill } from "react-icons/ri";
import { FormLayout } from "antd/lib/form/Form";
import SvgImage from "./Assets/undraw_book_lover_mkck.svg";

const UpComingBooks = () => {
  const { books, addBook, editBook } = useFetchBook();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [titleValue, setTitleValue] = useState<string>("");
  const [authorValue, setAuthorValue] = useState<string>("");
  const [categoryValue, setCategoryValue] = useState<string>("");
  const [priceValue, setPriceValue] = useState<string>("");
  const [imageValue, setImageValue] = useState<string>("");
  const [reasonValue, setReasonValue] = useState<string>("");

  const [formLayout, setFormLayout] = useState<FormLayout>("vertical");

  const handleShowModal = (layout: FormLayout = "vertical") => {
    setFormLayout(layout);
    setIsModalVisible(true);
  };

  const handleSubmitForm = () => {
    addBook({
      title: titleValue,
      author: authorValue,
      category: categoryValue,
      price: priceValue,
      image: imageValue,
      reason: reasonValue,
      isBuyed: false,
    });
    setIsModalVisible(false);
  };

  const handleBuyBook = (book: Book) => {
    editBook({
      title: book.title,
      author: book.author,
      category: book.category,
      price: book.price,
      image: book.image,
      reason: book.reason,
      isBuyed: true,
      _id: book._id,
    });
  };

  const { TextArea } = AntdInput;

  const IconText = ({ icon, text }: any) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <div>
      <Row justify="center" gutter={[48, 12]}>
        <Col span={12} xxl={12} xl={10} xs={0}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              marginTop: 20,
            }}
          >
            <Typography.Title style={{ color: "#3182CE" }} level={2}>
              This Is The List Of Your Future Book
            </Typography.Title>
            <Button
              size="large"
              style={{
                background: "#3182CE",
                color: "white",
                borderRadius: 10,
                marginBottom: 15,
                fontWeight: "bold",
              }}
              onClick={() => {
                handleShowModal(formLayout);
              }}
            >
              Add More Book
              <CaretUpOutlined />
            </Button>
          </div>
          <Image
            height={550}
            style={{ marginTop: 20 }}
            src={SvgImage}
            alt="Banner"
            preview={false}
          />
          <Result
            style={{ marginTop: 30 }}
            icon={<BulbOutlined />}
            title={`" When I have a little money, I buy books; and if I have any left, I buy food and clothes "`}
            subTitle="~ Erasmus"
          />
        </Col>
        <Col span={12} xxl={12} xl={14}>
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 2,
            }}
            dataSource={books?.filter((book) => {
              return !book.isBuyed;
            })}
            footer={
              <Result
                title={`" We buy books because we believe we're buying the time to read "`}
                subTitle="~ Warren Zevon"
              />
            }
            renderItem={(book) => (
              <List.Item
                key={book.price}
                actions={[
                  <IconText
                    icon={DollarOutlined}
                    text={`Rp.${book.price}`}
                    key="list-vertical-star-o"
                  />,
                  <IconText
                    icon={RiBookMarkFill}
                    text={book.category}
                    key="list-vertical-like-o"
                  />,
                ]}
                extra={
                  <img
                    width={275}
                    height={250}
                    alt="BookImg"
                    src={book.image}
                  />
                }
              >
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://i.pinimg.com/564x/5e/af/f3/5eaff33f83a4d168947c965bbf4f8c40.jpg" />
                  }
                  title={
                    <Typography.Title style={{ color: "#3182CE" }} level={4}>
                      {book.title}
                    </Typography.Title>
                  }
                  description={book.author}
                />
                {book.reason}
                <Divider type="horizontal" />
                {
                  <Button
                    style={{
                      background: "#3182CE",
                      color: "white",
                      fontWeight: "bold",
                    }}
                    onClick={() => handleBuyBook(book)}
                  >
                    <CheckOutlined />
                    Already Buyed
                  </Button>
                }
              </List.Item>
            )}
          />
        </Col>
      </Row>
      <>
        <Modal
          title={
            <Typography.Title style={{ color: "#3182CE" }} level={4}>
              Up Coming Books
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
                placeholder="Type The Title Of Your Upcoming Book"
                allowClear
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setTitleValue(event.target.value)
                }
                value={titleValue}
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
                placeholder="Type The Author Of Your Upcoming Book"
                allowClear
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setAuthorValue(event.target.value)
                }
                value={authorValue}
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
                placeholder="Type The Category Of Your UpcomingBook"
                allowClear
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setCategoryValue(event.target.value)
                }
                value={categoryValue}
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
                placeholder="Input the price"
                allowClear
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setPriceValue(event.target.value)
                }
                value={priceValue}
              />
            </Form.Item>
            <Form.Item
              label={
                <Typography.Title style={{ color: "#3182CE" }} level={5}>
                  Image URL
                </Typography.Title>
              }
              htmlFor="image"
            >
              <AntdInput
                id="image"
                placeholder="Input Link Of The Image"
                allowClear
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setImageValue(event.target.value)
                }
                value={imageValue}
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
                placeholder="Why you decide to buy the book ?"
                rows={4}
                allowClear
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setReasonValue(event.target.value)
                }
                value={reasonValue}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                onClick={handleSubmitForm}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    </div>
  );
};

export default UpComingBooks;
