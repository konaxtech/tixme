import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useParams } from 'react-router-dom';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TimerComponent from '../../component/event/timer';
import Eventlogo from "../../common/icon/eventlogo.svg";
import Timelogo from "../../common/icon/time 1.svg";
import Hourglasslogo from "../../common/icon/hourglass.svg";
import LocationIcon from "../../common/icon/location.svg";
import Eventimg from "../../common/event.jpg";
import DateIcon from "../../common/icon/date 2.svg";
import MapIcon from "../../common/icon/mapicon.svg";
import HeartIcon from "../../common/icon/heart.svg";
import ShareIcon from "../../common/icon/share.svg";
import EventImg from "../../common/event1.png";
import MailIcon from "../../common/icon/mail.svg";
import whitestart from "../../common/icon/whitestart.svg";
import FlagIcon from "../../common/icon/flag.svg";
import { Link, useNavigate } from "react-router-dom";
import Flip from "react-reveal/Flip";
import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Slide";
import CountUp from "react-countup";
import Header from "../../layout/website/partial/Header";
import Footer from "../../layout/website/partial/Footer";
import Mobilemenu from "../../component/mobilemenu";
import Whitestarbtn from "../../component/Whitestarbtn";
import { apiurl, onlyDayMonth, shortPer, app_url } from "../../common/Helpers";
import toast from "react-hot-toast";
const Page = ({ title }) => {
  const { id, name } = useParams();
  const navigate = useNavigate();
  const [Apiloader, setApiloader] = useState(true);
  const [isFirstRender, setIsFirstRender] = useState(false);
  const [Eventdata, setEventdata] = useState();
  const [Paynowbtnstatus, setPaynowbtnstatus] = useState(true);
  const [Eventlist, setEventlist] = useState([]);
  const [OrganizerData, setOrganizerData] = useState();
  const [OrganizerEventlist, setOrganizerEventlist] = useState([]);

  const viewEvent = async (id, name) => {
    navigate(`${app_url}event/${id}/${name}`)
    try {
      setApiloader(true)
      const requestData = {
        id: id
      };
      fetch(apiurl + 'event/get-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the Content-Type header to JSON
        },
        body: JSON.stringify(requestData),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success == true) {
            setEventdata(data.data);
            if (data.data.organizer_id) {
              fetchOrganizerEvent(data.data.organizer_id);
            }
            if (data.data) {
              setApiloader(false)
            }
          } else {

          }
        })
        .catch(error => {
          console.error('Insert error:', error);
          setApiloader(false)
        });
    } catch (error) {
      console.error('Login api error:', error);
    }
    if (!cartItems || cartItems.length === 0) {
      setAllItemsTotalPrice(0);
      setEventTotalPrice(0);
      return;
    }

    const total = cartItems.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.quantity;
    }, 0);

    setAllItemsTotalPrice(total);

    // Calculate total price for the current event
    const eventTickets = cartItems.filter((item) => item.eventId === id);
    const eventTotal = eventTickets.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.quantity;
    }, 0);

    setEventTotalPrice(eventTotal);
    window.scrollTo(0, 0);
  }
  const fetchEvent = async () => {
    try {
      const requestData = {
        limit: 3,
        organizerid: null
      }
      fetch(apiurl + "website/all-events-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header to JSON
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success == true) {
            setEventlist(data.data);
          } else {
          }
        })
        .catch((error) => {
          console.error("Insert error:", error);
        });
    } catch (error) {
      console.error("Login api error:", error);
    }
  };
  const fetchData = async () => {
    try {
      setApiloader(true)
      const requestData = {
        id: id
      };
      fetch(apiurl + 'event/get-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the Content-Type header to JSON
        },
        body: JSON.stringify(requestData),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success == true) {
            setEventdata(data.data);
            if (data.data.organizer_id) {
              fetchOrganizerEvent(data.data.organizer_id);
              window.scrollTo(0, 0);
            }
            if (data.data) {
              setApiloader(false)
            }
          } else {

          }
        })
        .catch(error => {
          console.error('Insert error:', error);
          setApiloader(false)
        });
    } catch (error) {
      console.error('Login api error:', error);
    }
  }
  const fetchOrganizerEvent = async () => {
    try {
      const requestData = {
        limit: 2,
        organizerid: null
      }
      fetch(apiurl + "website/all-events-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header to JSON
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success == true) {
            setOrganizerEventlist(data.data);
          } else {
          }
        })
        .catch((error) => {
          console.error("Insert error:", error);
        });
    } catch (error) {
      console.error("Login api error:", error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchEvent();
  }, []);
  useEffect(() => {

  }, [Eventlist]);
  const [cartItems, setCartItems] = useState([]);
  const [allItemsTotalPrice, setAllItemsTotalPrice] = useState(0);
  const [eventTotalPrice, setEventTotalPrice] = useState(0);
  const [localQuantities, setLocalQuantities] = useState({});
  const eventId = id; // Assuming Eventdata has _id property

  useEffect(() => {
    // Calculate total price when cart items change
    calculateTotalPrice();
  }, [cartItems]);
  useEffect(() => {
    if (isFirstRender) {
      localStorage.setItem('cart', JSON.stringify({ items: cartItems, quantities: localQuantities }));
    }
  }, [cartItems]);
  useEffect(() => {
    // Load cart and local quantities from localStorage when component mounts
    loadCartFromLocalStorage();
  }, []);

  const addToCart = (item) => {
    // Initialize cartItems as an empty array if it's undefined
    const existingItem = cartItems.find((cartItem) => cartItem.name === item.name);

    if (existingItem) {
      // If item already exists in cart, update quantity
      const updatedCart = cartItems.map((cartItem) =>
        cartItem.name === item.name ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
      setCartItems(updatedCart);
    } else {
      // If item is not in cart, add it with quantity 1 and eventId
      setCartItems([...cartItems, { ...item, quantity: 1, eventId, event: Eventdata, ticket: item }]);
    }

    // Update local quantity state
    setLocalQuantities({
      ...localQuantities,
      [item.name]: (localQuantities[item.name] || 0) + 1,
    });

    setIsFirstRender(true)
  };

  const removeFromCart = (itemName, quantity) => {
    const updatedCart = cartItems.map((cartItem) =>
      cartItem.name === itemName ? { ...cartItem, quantity: cartItem.quantity > 0 ? cartItem.quantity - 1 : 0 } : cartItem
    );

    const filteredCart = updatedCart.filter((cartItem) => cartItem.quantity > 0);
    setCartItems(filteredCart);

    // Update local quantity state
    setLocalQuantities({
      ...localQuantities,
      [itemName]: quantity > 0 ? quantity - 1 : 0,
    });
    setIsFirstRender(true)
  };

  const calculateTotalPrice = () => {
    if (!cartItems || cartItems.length === 0) {
      setAllItemsTotalPrice(0);
      setEventTotalPrice(0);
      return;
    }

    const total = cartItems.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.quantity;
    }, 0);

    setAllItemsTotalPrice(total);

    // Calculate total price for the current event
    const eventTickets = cartItems.filter((item) => item.eventId === eventId);
    const eventTotal = eventTickets.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.quantity;
    }, 0);

    setEventTotalPrice(eventTotal);
    if (eventTotal > 0) {
      setPaynowbtnstatus(true)
    } else {
      setPaynowbtnstatus(true)
    }
  };

  const saveCartToLocalStorage = () => {
    navigate(app_url + 'cart-details');
  };


  const loadCartFromLocalStorage = () => {
    // Load cart items, local quantities, and eventId from localStorage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const { items, quantities } = JSON.parse(storedCart);
      // Check if items and quantities exist in the stored data
      if (items && quantities) {
        setCartItems(items);
        setLocalQuantities(quantities);
      }
    }
  };
  return (
    <>
      <Mobilemenu />
      <Header />
      <div className="content-data content-data-event">
        {Apiloader ? (
          <div className="linear-background w-100"> </div>
        ) : (
          <>
            <div className="event-page-header mt-5 mb-5">
              <Container fluid>
                <div className="mt-5">
                  <Flip>
                    <span className="event-category-title">{Eventdata.category_name}</span>
                  </Flip>
                  <p className="event-title mt-5">
                    {" "}
                    <Flip left cascade>
                      {Eventdata.display_name}
                    </Flip>
                  </p>
                </div>
                <div>
                  <div className="organizer-name-sec px-2 py-2">
                    <div className="d-inline-flex align-items-center border-right event-time-area py-2">
                      <div className="d-inline-block mr-1">
                        <img height={30} width={30} src={DateIcon} alt="" />
                      </div>
                      <div className="d-inline-block">
                        <span className="event-duration d-block">{Eventdata.start_date}</span>
                      </div>
                    </div>
                    <div className="d-inline-flex align-items-center border-right event-time-area px-2">
                      <div className="d-inline-block mr-1">
                        <img height={30} width={30} src={Timelogo} alt="" />
                      </div>
                      <div className="d-inline-block">
                        <span className="event-duration d-block">Event Time</span>
                        <span className="event-time d-block">{Eventdata.start_time}</span>
                      </div>
                    </div>
                    <div className="d-inline-flex align-items-center border-right event-time-area">
                      <div className="d-inline-block mr-1">
                        <img height={30} width={30} src={Hourglasslogo} alt="" />
                      </div>
                      <div className="d-inline-block">
                        <span className="event-duration d-block">Event Duration</span>
                        <span className="event-time d-block">2Hr 11Min</span>
                      </div>
                    </div>
                    <div className="d-inline-flex align-items-center">
                      <div className="d-inline-block mr-1">
                        <img height={30} width={30} src={LocationIcon} alt="" />
                      </div>
                      <div className="d-inline-block">
                        <span className="event-duration d-block">
                          {Eventdata.location}
                        </span>
                        <span className="event-time d-block">Get direction</span>
                      </div>
                      <div className="d-inline-block mr-1 ml-3">
                        <img height={30} width={30} src={MapIcon} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                <Row className="mt-5">
                  <Col md={12}>
                    <span className="float-right">
                      <img className="mx-1" src={HeartIcon} alt="" />
                      <img className="mx-1" src={ShareIcon} alt="" />
                    </span>
                  </Col>
                  <Col md={12}>
                    <img className="mt-2 event-banner" src={EventImg} alt="" />
                  </Col>
                </Row>
              </Container>
            </div>
            <div className="event-desc">
              <Container fluid>
                <Row>
                  <Col md={9}>
                    <div className="desc-sec">
                      <span className="sec-title">
                        <Fade bottom>Description</Fade>
                      </span>
                      <Fade bottom>
                        <p>
                          {Eventdata.event_desc}
                        </p>
                      </Fade>
                    </div>
                    <div className="desc-sec">
                      <span className="sec-title">Map</span>
                    </div>
                    <div className="desc-sec">
                      <span className="sec-title">
                        Return Policy{" "}
                        <span>
                          <img src={ShareIcon} alt="" />
                        </span>
                      </span>
                      <p className="report">
                        <img src={FlagIcon} alt="" /> Report this event
                      </p>
                    </div>
                    <Row>
                      <Col md={12}>
                        <Slide bottom>
                          <div className="start-in-box eventpage-box-style mb-5">
                            <Row>
                              <Col md={6}>
                                <div className="right-box-title">
                                  <p>Tags</p>
                                </div>
                              </Col>
                              <Col md={12}>
                                <div className="tags pt-4 pb-5">
                                  <ul>
                                    {Eventdata.tags.map((item, index) => (
                                      <li className="d-inline-block m-1 mb-3">
                                        <span className="event-category-title event-category-title-mobile font-13">
                                          {item}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </Slide>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <div className="start-in-box eventpage-box-style mb-5 More-events">
                          <Row>
                            <Col md={8}>
                              <div className="right-box-title">
                                <p>More events from this organiser</p>
                              </div>
                            </Col>
                            <Col md={12}>
                              <Row>
                                {OrganizerEventlist.map((item, index) => (
                                  <Col md={6}>
                                    <div className="cursor-pointer" title="View" onClick={() => viewEvent(item._id, item.name)}>
                                      <Slide bottom>
                                        <div className="more-event-box">
                                          <div className="ticket-price-area ticket-price-area-bg mt-3">
                                            <Row>
                                              <Col
                                                md={5}
                                                className="d-flex align-items-center"
                                              >
                                                <div className="event-image-part">
                                                  <img
                                                    className="event-image"
                                                    src={Eventimg}
                                                    alt=""
                                                  />
                                                </div>
                                              </Col>
                                              <Col md={7} className="event-view-page">
                                                <div className="organizer-name-sec px-2 py-2">
                                                  <div className="d-inline-flex align-items-center  event-time-area">
                                                    <div className="d-inline-block mr-1">
                                                      <img
                                                        height={30}
                                                        width={30}
                                                        src={Timelogo}
                                                        alt=""
                                                      />
                                                    </div>
                                                    <div className="d-inline-block">
                                                      <span className="event-duration d-block">
                                                        Event Date
                                                      </span>
                                                      <span className="event-time d-block">
                                                        {item.start_date}
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="d-inline-flex align-items-center">
                                                    <div className="d-inline-block mr-1">
                                                      <img
                                                        height={30}
                                                        width={30}
                                                        src={Hourglasslogo}
                                                        alt=""
                                                      />
                                                    </div>
                                                    <div className="d-inline-block">
                                                      <span className="event-duration d-block">
                                                        Event Duration
                                                      </span>
                                                      <span className="event-time d-block">
                                                        2Hr 11Min
                                                      </span>
                                                    </div>
                                                  </div>
                                                </div>
                                              </Col>
                                              <Col md={12}>
                                                <div className="event-name  ml-2">
                                                  <span>{item.display_name}</span>
                                                  <p className="font-10">
                                                    {shortPer(item.event_desc, 100)}
                                                  </p>
                                                </div>
                                              </Col>
                                              <Col
                                                md={6}
                                                xs={6}
                                                className="border-top-doted"
                                              >
                                                <div className="location d-flex align-items-center text-center">
                                                  <img
                                                    height={30}
                                                    width={30}
                                                    src={LocationIcon}
                                                    alt=""
                                                  />{" "}
                                                  <span>{item.location}</span>
                                                </div>
                                              </Col>
                                              <Col md={5} xs={5}>
                                                <div className="price-section text-center">
                                                  <p>Ticket Price</p>
                                                  <span className="price">${item.displayprice}</span>
                                                  <span className="cut-price">${item.displaycutprice}</span>
                                                </div>
                                              </Col>
                                            </Row>
                                          </div>
                                        </div>
                                      </Slide>
                                    </div>
                                  </Col>
                                ))}
                              </Row>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={3}>
                    <div className="start-in-box eventpage-box-style mb-5">
                      <div className="right-box-title">
                        <p><Flip left cascade>Starts In</Flip></p>
                      </div>
                      <div className="right-box-con mt-4">
                        <div className="time-box d-inline-block text-center">
                          <p className="time-box-date"><CountUp separator="" start={1} end={10} /></p>
                          <p className="time-box-text">Days</p>
                        </div>
                        <div className="time-box d-inline-block text-center">
                          <p className="time-box-date"><CountUp separator="" start={1} end={5} /></p>
                          <p className="time-box-text">Hours</p>
                        </div>
                        <div className="time-box d-inline-block text-center">
                          <p className="time-box-date"><CountUp separator="" start={1} end={33} /></p>
                          <p className="time-box-text">Minutes</p>
                        </div>
                        <div className="time-box d-inline-block text-center">
                          <p className="time-box-date"><CountUp separator="" start={1} end={16} /></p>
                          <p className="time-box-text">Seconds</p>
                        </div>
                      </div>
                    </div>
                    <div className="organised-by-box eventpage-box-style">
                      <div className="organizer-name-sec d-flex align-items-center px-2 py-2">
                        <div className="d-inline-block mr-3">
                          <img
                            height={70}
                            width={70}
                            src={Eventlogo}
                            alt=""
                            className="organiger-logo"
                          />
                        </div>
                        <div className="d-inline-block">
                          <span className="organizer-by d-block">Organised by</span>
                          <span className="organizer-name d-block">By KING</span>
                        </div>
                      </div>
                      <div className="border-botton-devider my-2"></div>
                      <div className="right-box-con mt-4">
                        <div className="d-flex align-items-center">
                          <div className="d-inline-block mr-4">
                            <p className="followers-title">Followers</p>
                            <p className="followers-count">99</p>
                          </div>
                          <div className="d-inline-block">
                            <button type="button" className="follow-btn">
                              Follow
                            </button>
                          </div>
                        </div>
                        <div className="d-inline-flex align-items-center py-2">
                          <div className="d-inline-block mr-1">
                            <img height={30} width={30} src={LocationIcon} alt="" />
                          </div>
                          <div className="d-inline-block">
                            <span className="event-page-organizer-deta d-block">
                              454 Isaac Frye Hwy, Wilton, United States
                            </span>
                          </div>
                        </div>
                        <div className="d-inline-flex align-items-center py-2">
                          <div className="d-inline-block mr-1">
                            <img height={30} width={30} src={MailIcon} alt="" />
                          </div>
                          <div className="d-inline-block">
                            <span className="event-page-organizer-deta d-block">
                              kin@gmail.com
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="start-in-box eventpage-box-style mb-5 my-5 event-page-ticket">
                      <div className="right-box-title">
                        <p><Flip left cascade>Tickets</Flip></p>
                      </div>
                      {Eventdata.allprice ? (
                        <>
                          {Eventdata.allprice.map((items, index) => (
                            <>
                              <div key={items.id} className="right-box-con mt-4 in-event-page-cart-sec">
                                <div className="d-flex align-items-center">
                                  <div className="price-section d-inline-block">
                                    <p className="Ticket-title">{items.name}</p>
                                    {items.ticket_type == 1 ? (
                                      <>
                                        <span className="price">${items.price}</span>
                                        {/* <span className="cut-price">${items.price}</span> */}
                                      </>
                                    ) : (<>
                                      <span className="price">$00</span>
                                    </>)}
                                  </div>
                                  <div className="d-inline-block cart-increment-button">
                                    <span>
                                      <span className="cart-minus cart-btn" onClick={() => removeFromCart(items.name, localQuantities[items.name] || 0)}>-</span>
                                      <span className="cart-number">{localQuantities[items.name] || 0}</span>
                                      <span className="cart-plus cart-btn" onClick={() => addToCart(items)}>+</span>
                                    </span>
                                  </div>
                                </div>
                                <div className="organizer-name-sec px-2 py-2 margin-css ">
                                  <div className="event-name">
                                    <p className="mb-0">Discount available :</p>
                                  </div>
                                  <div className="d-inline-flex align-items-center border-right event-time-area">
                                    <div className="d-inline-block mr-1">
                                      <img height={20} width={20} src={Timelogo} alt="" />
                                    </div>
                                    <div className="d-inline-block">
                                      <span className="event-duration d-block">
                                        Event Time
                                      </span>
                                      <span className="event-time d-block">{Eventdata.start_time}</span>
                                    </div>
                                  </div>
                                  <div className="d-inline-flex align-items-center">
                                    <div className="d-inline-block mr-1">
                                      <img
                                        height={20}
                                        width={20}
                                        src={Hourglasslogo}
                                        alt=""
                                      />
                                    </div>
                                    <div className="d-inline-block">
                                      <span className="event-duration d-block font-13">
                                        Event Duration
                                      </span>
                                      <span className="event-time d-block">2Hr 11Min</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="dashed-border-devider my-2"></div>
                            </>
                          ))}
                        </>
                      ) : (
                        <></>
                      )}
                      <div>
                        <span className="main-title">Total Price :</span>{" "}
                        <span className="float-right main-title">${eventTotalPrice.toFixed(2)}</span>
                      </div>
                      {Paynowbtnstatus ? (
                        <div className="mt-5 paynow-btn-box">
                          <span onClick={() => saveCartToLocalStorage()}>
                            <Whitestarbtn title={'Pay now'} />
                          </span>
                        </div>
                      ) : ''}
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
            <div className="event-category-section mb-5 in-event-page">
              <Container fluid className="">
                <Row className="event-box-mobile">
                  {Eventlist.map((item, index) => (
                    <Col md={4} className="mb-3 cursor-pointer" title="View" onClick={() => viewEvent(item._id, item.name)}>
                      <Fade bottom>
                        <div className="event-box-style">
                          <div className="event-image-part">
                            <img className="event-image" src={Eventimg} alt="" />
                            <span className="event-category-img">{item.category_name}</span>
                            <span className="on-img-date">
                              <img src={DateIcon} alt="" />
                              <span className="on-img-date-val">{onlyDayMonth(item.start_date)}</span>
                            </span>
                          </div>
                          <div className="organizer-name-sec d-flex align-items-center px-2 py-2">
                            <div className="d-inline-block mr-3">
                              <img
                                height={70}
                                width={70}
                                src={Eventlogo}
                                alt=""
                                className="organiger-logo"
                              />
                            </div>
                            <div className="d-inline-block">
                              <span className="organizer-by d-block">Organised by</span>
                              <span className="organizer-name d-block">By {item.organizer_name}</span>
                            </div>
                          </div>
                          <div className="organizer-name-sec px-2 py-2">
                            <div className="d-inline-flex align-items-center border-right event-time-area">
                              <div className="d-inline-block mr-1">
                                <img height={30} width={30} src={Timelogo} alt="" />
                              </div>
                              <div className="d-inline-block">
                                <span className="event-duration d-block">Event Time</span>
                                <span className="event-time d-block">{item.start_time}</span>
                              </div>
                            </div>
                            <div className="d-inline-flex align-items-center">
                              <div className="d-inline-block mr-1">
                                <img height={30} width={30} src={Hourglasslogo} alt="" />
                              </div>
                              <div className="d-inline-block">
                                <span className="event-duration d-block">
                                  Event Duration
                                </span>
                                <span className="event-time d-block">2Hr 11Min</span>
                              </div>
                            </div>
                            <div className="event-name">
                              <span>{item.display_name}</span>
                              <p>
                                {shortPer(item.event_desc, 100)}
                              </p>
                            </div>
                          </div>
                          <div className="ticket-price-area mt-3">
                            <Row>
                              <Col md={7} xs={7} className="border-top-doted">
                                <div className="location d-flex align-items-center text-center">
                                  <img height={30} width={30} src={LocationIcon} alt="" />{" "}
                                  <span>{item.location}</span>
                                </div>
                              </Col>
                              <Col md={5} xs={5}>
                                <div className="price-section text-center">
                                  <p>Ticket Price</p>
                                  <span className="price">${item.displayprice}</span>
                                  <span className="cut-price">${item.displaycutprice}</span>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </div>
                      </Fade>
                    </Col>
                  ))}
                </Row>
              </Container>
            </div>
          </>)}
      </div >
      <Footer />
    </>
  );
};
export default Page;