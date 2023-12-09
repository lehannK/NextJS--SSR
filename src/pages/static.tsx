// pages/static.tsx

import { NextPage, GetStaticProps } from "next";
import { useEffect, useState, ReactNode } from "react";
import { Col, Container, Row } from "reactstrap";

type ApiResponse = {
  name: string;
  timeStamp: Date;
};

export const getStaticProps: GetStaticProps = async () => {
  const staticData = await fetch(
    `${process.env.NEXT_PUBLIC_APIURL}/api/hello`
  ).then((res) => res.json());

  return {
    props: {
      staticData,
    },
    revalidate: 10,
  };
};

const Static: NextPage = (props: {
  children?: ReactNode;
  staticData?: ApiResponse;
}) => {
  const [clientSideData, setClientSideData] = useState<ApiResponse>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(`/api/hello`).then((res) => res.json());
    setClientSideData(data);
  };

  return (
    <Container tag="main">
      <h1 className="my-5">Como funcionam as renderizações do Next.js</h1>

      <Row>
        <Col>
          <h3>Gerado estaticamente durante o build:</h3>
          <h2>{props.staticData?.timeStamp.toString()}</h2>
        </Col>

        <Col>
          <h3>Gerado no cliente: </h3>
          <h2>{clientSideData?.timeStamp.toString()}</h2>
        </Col>
      </Row>
    </Container>
  );
};

export default Static;
