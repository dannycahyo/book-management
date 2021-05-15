import React from "react";
import {
  Carousel,
  Row,
  Col,
  Image,
  Typography,
  Button,
  Steps,
  message,
} from "antd";
import FirstImg from "./Assets/undraw_Reading_book_re_kqpk.svg";
import SecondImg from "./Assets/undraw_Books_l33t.svg";
import ThirdImg from "./Assets/undraw_Reading_list_re_bk72.svg";
import TutorialImg from "./Assets/undraw_reading_time_gvg0.svg";

type Tutorial = {
  title: string;
  content: string;
};

const LandingPage = () => {
  const [current, setCurrent] = React.useState<number>(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const tutorials: Tutorial[] = [
    {
      title: "Landing Page",
      content:
        "This is the main page. You will get some of the information about the purpose and the story behind the application created and also some detailed explanation about every page, such as the workflow and feature on it.",
    },
    {
      title: "My Book Page",
      content:
        "This page contains a list of all your own books. Moreover, you can see the detail of your book and manipulate it, for example, edit the content of your current book and also delete it when it is probably lost and borrowed by your friend and never get back.",
    },
    {
      title: "Upcoming Book Page",
      content:
        " This page will help you by reminding you of some of the quotes before unsure about buying a new book and also giving you a chance to manipulate the upcoming book. For example, adding and seeing the list of it.",
    },
  ];

  return (
    <div style={{ width: "80%", marginRight: "auto", marginLeft: "auto" }}>
      <Row justify="space-between" gutter={70} align="middle">
        <Col span={12} xxl={12} xl={9} lg={8}>
          <div>
            <Typography.Title style={{ color: "#4A5568", fontSize: 40 }}>
              Manage Your Valuable Book
            </Typography.Title>
          </div>
          <div>
            <Typography.Title style={{ color: "#3182CE", fontSize: 40 }}>
              Properly & Systematically
            </Typography.Title>
          </div>
          <div style={{ width: "80%", marginLeft: 10 }}>
            <Typography.Text>
              As a reader, we all have the same concern about managing our
              current book, or the upcoming book. For instance, we often forget
              with all of the books that we've read and get confused to handle
              our desire to buy a new book. Book App solves that common problem.
            </Typography.Text>
          </div>
        </Col>
        <Col span={12} style={{ marginTop: 20 }} xxl={12} xl={15} lg={16}>
          <Carousel autoplay>
            <Image
              alt="Heroes"
              src={FirstImg}
              preview={false}
              height={450}
              width={520}
            />
            <Image
              alt="Heroes"
              src={SecondImg}
              preview={false}
              height={450}
              width={520}
            />
            <Image
              alt="Heroes"
              src={ThirdImg}
              preview={false}
              height={450}
              width={520}
            />
          </Carousel>
        </Col>
      </Row>
      <div id="tutorials">
        <Row justify="center" style={{ marginTop: "34px" }}>
          <Col span={20}>
            <Steps current={current}>
              {tutorials.map((tutorial) => (
                <Steps.Step key={tutorial.title} title={tutorial.title} />
              ))}
            </Steps>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                minHeight: "200px",
                marginTop: "16px",
                paddingTop: "80px",
                textAlign: "center",
                backgroundColor: "#90CDF4",
                border: "1px dashed #e9e9e9",
                borderRadius: "2px",
                color: "black",
              }}
            >
              <Image alt="Tutorial" src={TutorialImg} preview={false} />
              <Typography.Paragraph
                style={{ marginRight: 10, fontSize: "20px" }}
              >
                {tutorials[current].content}
              </Typography.Paragraph>
            </div>
            <div style={{ marginTop: "24px" }}>
              {current < tutorials.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                  Next
                </Button>
              )}
              {current === tutorials.length - 1 && (
                <Button
                  type="primary"
                  onClick={() =>
                    message.success("Go Ahead & Manage Your Book!")
                  }
                >
                  Done
                </Button>
              )}
              {current > 0 && (
                <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                  Previous
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LandingPage;
