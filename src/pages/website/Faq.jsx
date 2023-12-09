import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
import BannerComponent from '../../component/BannerTop';
import Fade from "react-reveal/Fade";
const Page = ({ title }) => {
  const [open, setOpen] = useState("1");
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  return (
    <div className="content-data">
      <Container>
        <Row>
        <BannerComponent title={title}/>
          <Col md={12} className="p-5 mt-5 mb-5">
            <div className="faq-box">
              <Accordion open={open} toggle={toggle}>
                <Fade bottom cascade>
                  <AccordionItem>
                    <AccordionHeader targetId="1">
                      <span className="faq-sl-no">01</span>{" "}
                      <span className="faq-title">
                        How big is the global no-code market?
                      </span>
                    </AccordionHeader>
                    <AccordionBody accordionId="1">
                      <p className="faq-text">
                        According to Gartner, the market for no-code/low-code
                        development will hit around $26.9 billion in 2023. By
                        2025, 70% of new products developed by organizations
                        will be built with low-code or no-code technologies, up
                        from less than 25% in 2020.
                      </p>
                    </AccordionBody>
                  </AccordionItem>
                </Fade>
                <Fade bottom cascade>
                  <AccordionItem>
                    <AccordionHeader targetId="2">
                      <span className="faq-sl-no">02</span>{" "}
                      <span className="faq-title">
                        Is no-code development faster?
                      </span>
                    </AccordionHeader>
                    <AccordionBody accordionId="2">
                      <p className="faq-text">
                        According to Gartner, the market for no-code/low-code
                        development will hit around $26.9 billion in 2023. By
                        2025, 70% of new products developed by organizations
                        will be built with low-code or no-code technologies, up
                        from less than 25% in 2020.
                      </p>
                    </AccordionBody>
                  </AccordionItem>
                </Fade>
                <Fade bottom cascade>
                  <AccordionItem>
                    <AccordionHeader targetId="3">
                      <span className="faq-sl-no">03</span>{" "}
                      <span className="faq-title">
                        Will no-code make developers obsolete?
                      </span>
                    </AccordionHeader>
                    <AccordionBody accordionId="3">
                      <p className="faq-text">
                        According to Gartner, the market for no-code/low-code
                        development will hit around $26.9 billion in 2023. By
                        2025, 70% of new products developed by organizations
                        will be built with low-code or no-code technologies, up
                        from less than 25% in 2020.
                      </p>
                    </AccordionBody>
                  </AccordionItem>
                </Fade>
                <Fade bottom cascade>
                  <AccordionItem>
                    <AccordionHeader targetId="4">
                      <span className="faq-sl-no">04</span>{" "}
                      <span className="faq-title">
                        What are the most popular no-code tools?
                      </span>
                    </AccordionHeader>
                    <AccordionBody accordionId="4">
                      <p className="faq-text">
                        According to Gartner, the market for no-code/low-code
                        development will hit around $26.9 billion in 2023. By
                        2025, 70% of new products developed by organizations
                        will be built with low-code or no-code technologies, up
                        from less than 25% in 2020.
                      </p>
                    </AccordionBody>
                  </AccordionItem>
                </Fade>
                <Fade bottom cascade>
                  <AccordionItem>
                    <AccordionHeader targetId="5">
                      <span className="faq-sl-no">05</span>{" "}
                      <span className="faq-title">
                        What makes a good no-code website?
                      </span>
                    </AccordionHeader>
                    <AccordionBody accordionId="5">
                      <p className="faq-text">
                        According to Gartner, the market for no-code/low-code
                        development will hit around $26.9 billion in 2023. By
                        2025, 70% of new products developed by organizations
                        will be built with low-code or no-code technologies, up
                        from less than 25% in 2020.
                      </p>
                    </AccordionBody>
                  </AccordionItem>
                </Fade>
                <Fade bottom cascade>
                  <AccordionItem>
                    <AccordionHeader targetId="6">
                      <span className="faq-sl-no">06</span>{" "}
                      <span className="faq-title">
                        What is the difference between no-code and low code?
                      </span>
                    </AccordionHeader>
                    <AccordionBody accordionId="6">
                      <p className="faq-text">
                        According to Gartner, the market for no-code/low-code
                        development will hit around $26.9 billion in 2023. By
                        2025, 70% of new products developed by organizations
                        will be built with low-code or no-code technologies, up
                        from less than 25% in 2020.
                      </p>
                    </AccordionBody>
                  </AccordionItem>
                </Fade>
                <Fade bottom cascade>
                  <AccordionItem>
                    <AccordionHeader targetId="7">
                      <span className="faq-sl-no">07</span>{" "}
                      <span className="faq-title">
                        What can you develop with no-code?
                      </span>
                    </AccordionHeader>
                    <AccordionBody accordionId="7">
                      <p className="faq-text">
                        According to Gartner, the market for no-code/low-code
                        development will hit around $26.9 billion in 2023. By
                        2025, 70% of new products developed by organizations
                        will be built with low-code or no-code technologies, up
                        from less than 25% in 2020.
                      </p>
                    </AccordionBody>
                  </AccordionItem>
                </Fade>
                <Fade bottom cascade>
                  <AccordionItem>
                    <AccordionHeader targetId="8">
                      <span className="faq-sl-no">08</span>{" "}
                      <span className="faq-title">Do you host websites?</span>
                    </AccordionHeader>
                    <AccordionBody accordionId="8">
                      <p className="faq-text">
                        According to Gartner, the market for no-code/low-code
                        development will hit around $26.9 billion in 2023. By
                        2025, 70% of new products developed by organizations
                        will be built with low-code or no-code technologies, up
                        from less than 25% in 2020.
                      </p>
                    </AccordionBody>
                  </AccordionItem>
                </Fade>
                <Fade bottom cascade>
                  <AccordionItem>
                    <AccordionHeader targetId="9">
                      <span className="faq-sl-no">09</span>{" "}
                      <span className="faq-title">
                        Can you help us with a domain name?
                      </span>
                    </AccordionHeader>
                    <AccordionBody accordionId="9">
                      <p className="faq-text">
                        According to Gartner, the market for no-code/low-code
                        development will hit around $26.9 billion in 2023. By
                        2025, 70% of new products developed by organizations
                        will be built with low-code or no-code technologies, up
                        from less than 25% in 2020.
                      </p>
                    </AccordionBody>
                  </AccordionItem>
                </Fade>
                <Fade bottom cascade>
                  <AccordionItem>
                    <AccordionHeader targetId="10">
                      <span className="faq-sl-no">10</span>{" "}
                      <span className="faq-title">
                        I want to get into no-code myself, where do I start?
                      </span>
                    </AccordionHeader>
                    <AccordionBody accordionId="10">
                      <p className="faq-text">
                        According to Gartner, the market for no-code/low-code
                        development will hit around $26.9 billion in 2023. By
                        2025, 70% of new products developed by organizations
                        will be built with low-code or no-code technologies, up
                        from less than 25% in 2020.
                      </p>
                    </AccordionBody>
                  </AccordionItem>
                </Fade>
              </Accordion>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Page;
