import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import whitestart from "../../common/icon/whitestart.svg";
import about2 from "../../common/image/about2.webp";
import about11 from "../../common/image/about11.webp";
import LogoIcon from "../../common/icon/logoicon.svg";
import { Link } from "react-router-dom";
import Tada from "react-reveal/Tada";
import Zoom from "react-reveal/Zoom";
import Slide from "react-reveal/Slide";
const Page = ({ title }) => {
  return (
    <div className="content-data content-data-about">
      <Container fluid>
        <Row className="about_top_section">
          <Col md={7}>
            <Tada>
              <img src={LogoIcon} className="web-icon-about" alt="" />
            </Tada>
            <Zoom>
              <img className="about11" src={about11} alt="" />
            </Zoom>
          </Col>
          <Col md={5}>
            <Slide top cascade>
              <p className="about_banner_shop_desc">
                <span className="bullet-point"></span> Meet Cut the Code
              </p>
            </Slide>
            <Slide top cascade>
              <p className="about_banner_text">
                A new generation of digital creators
              </p>
            </Slide>
            <Slide top cascade>
              <div>
                <p className="about_banner_short_text">
                  The digital world? It changes fast. Keeping up with it takes
                  time and knowledge that not all brands have. But that all of
                  them need. We believe that being at the forefront starts with a
                  different approach to digital creation.
                </p>
              </div>
            </Slide>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="my-5">
            <div className="As_a_leading_sec">
              <Slide bottom cascade>
                <div>
                  <h3 className="mb-5">
                    As a leading no-code agency, we’re here to help brands unlock
                    the power of no-code through digital creation. Move faster,
                    build smarter, scale more, code less.
                  </h3>
                </div>
              </Slide>
              <Link className="button-join" to={"/"}>
                <span>
                  <span className="bg-style btn-a">
                    <img height={30} width={30} src={whitestart} />
                  </span>
                  <span className="bg-style btn-b">Discover more</span>
                  <span className="bg-style btn-c">
                    <img height={30} width={30} src={whitestart} />
                  </span>
                </span>
              </Link>
            </div>
          </Col>
        </Row>
        <Row className="mt-5 mb-5">
          <Col md={5}>
            <Zoom>
              <img className="about2" src={about2} alt="" />{" "}
            </Zoom>
          </Col>
          <Col md={7}>
            <div className="about2_box">
              <Slide bottom cascade>
                <div><h3>Cutting the complex to drive progress</h3></div>
              </Slide>
              <Slide bottom cascade>
                <div>

                  <p>
                    By simplifying the process of building for the web, we have
                    more room for the strategic and creative stuff. Producing
                    beautiful, scalable projects designed to bring our clients the
                    most value. Our approach is to always strive for more of the
                    new, and less of the same. Always open to change, and never
                    closed off to new possibilities. That’s the mindset behind
                    everything that we do.
                  </p>
                </div>
              </Slide>
            </div>
          </Col>
        </Row>
        <Row className="our_values_div">
          <Col md={12}>
            <h3 className="sec-main-title">Our values</h3>
          </Col>
          <Col md={4} xs={12} className="mb-3">
            <Slide bottom>
              <div className="our_values_box mx-2">
                <p className="our_values_title">Move faster</p>
                <p className="our_values_desc">
                  Getting there before anyone else, in the most efficient way
                  possible. Working smarter, not harder.
                </p>
              </div>
            </Slide>
          </Col>
          <Col md={4} xs={12} className="mb-3">
            <Slide bottom>
              <div className="our_values_box mx-2">
                <p className="our_values_title">Iterate to better</p>
                <p className="our_values_desc">
                  The drive to elevate everything that we do through a process
                  of continuous improvement.
                </p>
              </div>
            </Slide>
          </Col>
          <Col md={4} xs={12} className="mb-3">
            <Slide bottom>
              <div className="our_values_box mx-2">
                <p className="our_values_title">Focus on flow</p>
                <p className="our_values_desc">
                  A state of mind and way of working that is fluid, transparent
                  and fast to make the complex clear.
                </p>
              </div>
            </Slide>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Page;
