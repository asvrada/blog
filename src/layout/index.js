import React, { useState } from "react";
import SiteNavbar from "../components/sitenavbar";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../styles/main.scss";

const Layout = ({ children }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <Container fluid>
      <Row>
        <SiteNavbar showDropdown={showDropdown}
                    setShowDropdown={setShowDropdown}/>
      </Row>

      <Row>
        <Col>
          <main>{children}</main>
        </Col>
      </Row>
      {/*<Footer/>*/}
    </Container>
  );
};

export default Layout;
