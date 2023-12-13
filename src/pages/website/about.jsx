import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import whitestart from "../../common/icon/whitestart.svg";
import about2 from "../../common/image/about2.webp";
import about11 from "../../common/icon/aboutus.svg";
// import LogoIcon from "../../common/icon/logoicon.svg";
import { Link } from "react-router-dom";
// import Tada from "react-reveal/Tada";
import Zoom from "react-reveal/Zoom";
import Slide from "react-reveal/Slide";
const about = ({ title }) => {
  return (
    <div className="content-data content-data-about">
      <div>
        <Row className="about_top_section">
          <Col md={5} className="about_section-img">
            <div className="about_section-img-inner">
              <img className="about11" src={about11} alt="" />
            </div>
          </Col>
          <Col md={7} className="about_section-content">
            <div className="about_section-content-inner">
                <p>Welcome to TIXME, where every ticket tells a story! Our mission is to redefine events, making each occasion an unforgettable and cherished memory. We promise fair prices, support event organizers with insights, and ensure secure transactions. Our user-friendly website and interactive features ensure simple ticketing and help curate extraordinary events. TIXME creates a community, by rewarding and incentivizing members with every ticket purchase. Our social network enables us to reach a variety of customers. To bring this vision to life, we seamlessly blend 
                    cutting-edge technology with an unwavering commitment to prioritizing customer satisfaction.</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="my-5">
            <div className="As_a_leading_sec">
                
                <p>Step with us into the spotlight of unforgettable moments where the journey is secure, the path is clear, and the memories are
                     destined to be extraordinary!Seize the moment, secure your ticket!</p>
                <p>As you make your initial purchases, you enter the Silver Tier, unlocking a range of benefits. Enjoy exclusive discounts on future ticket purchases, ensuring that your loyalty is immediately rewarded.</p>

            </div>
            <Col md={12} className="mt-5 As_a_leading_sec-main">
                        <div>
                            <div className="As_a_leading_sec">
                                <div><span>Silver Tier :</span> <span  className="As_a_leading_sec-inner"> The Beginning Of Your Journey </span></div>  
                            <p>
                                As you make your initial purchases, you enter the Silver Tier, unlocking a range of benefits. Enjoy exclusive discounts on future ticket purchases, ensuring that your loyalty is immediately rewarded.
                            </p>
                        </div>
                        <div className="As_a_leading_sec">
                            <div><span>Gold Tier :</span><span  className="As_a_leading_sec-inner">Ascending To Greater Rewards</span></div>
                            <p>
                            
                            With continued engagement, your loyalty propels you into the Gold Tier, where the rewards become even more enticing. In addition to enhanced discounts, Gold members get early access to select events, securing your spot before general sales commence
                        </p>
                        </div>
                        <div  className="As_a_leading_sec">
                            <div><span> Platinum Tier :</span><span className="As_a_leading_sec-inner">Achieving The Pinnacle Of Exclusive Benefits </span></div>
                            <p>
                            
                            Achieve Platinum status through your sustained support, and experience the pinnacle of our Loyalty and Rewards Program. TIXME’s platinum members receive the most substantial discounts, priority access to special events, and exclusive perks tailored to make your ticket-buying experience truly exceptional.
                        </p>
                        </div>
                        </div>
                    </Col>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default about;
