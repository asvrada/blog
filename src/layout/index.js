import React from "react";
import SiteNavbar from "../components/sitenavbar";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Layout = ({ children }) => {
  return (
    <>
      <SiteNavbar/>

      <Container>
        <Row>
          <Col>
            <main className="mt-3 mb-3" id="main">{children}</main>
          </Col>
        </Row>
        {/*<Footer/>*/}
      </Container>
    </>
  );
};

export default Layout;
