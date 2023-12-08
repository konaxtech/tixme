import React, { useEffect, useRef, useState } from "react";
import '../../common/css/autocompletestyle.css';
import GroupIcon from '../../common/icon/Group.svg';
import OnlineIcon from '../../common/icon/Host Online.svg';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import OffliveIcon from '../../common/icon/oflineeventlogo.svg';
import whitestar from '../../common/icon/whitestar.svg';
import Locationstart from '../../common/icon/locationstart.svg';
import InfoIcon from "../../common/icon/info.svg";
import LockIcon from "../../common/icon/lock.svg";
import WorldIcon from "../../common/icon/world.svg";
import DateIcon from "../../common/icon/date 1.svg";
import TimeIcon from "../../common/icon/time 1.svg";
import { Button, Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import WhitestarBtn from '../Whitestarbtn';
import Select from 'react-select'
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import Lottie from "lottie-react";
import TicketLotte from '../../lotte/ticketanimation.json';
import TimezoneSelect from 'react-timezone-select'
import { organizer_url, apiurl, get_date_time } from '../../common/Helpers';
import {
    Modal,
    Input,
    ModalBody,
    ModalHeader
} from 'reactstrap'
const Type = ({ title, editid }) => {
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();
    const [Loader, setLoader] = useState(false);
    const [Apiloader, setApiloader] = useState(false);
    const [Ticketshow, setTicketshow] = useState(false);
    const [FormSection, setFormSection] = useState(1);
    const [Eventtype, setEventtype] = useState();
    const [Name, setName] = useState();
    const [Displayname, setDisplayname] = useState();
    const [Displayprice, setDisplayprice] = useState();
    const [Displaycutprice, setDisplaycutprice] = useState();
    const [Type, setType] = useState(1);
    const [Category, setCategory] = useState();
    const [CategoryId, setCategoryId] = useState();
    const [Categoryname, setCategoryname] = useState();
    const [EventtypeCategory, setEventtypeCategory] = useState();
    const [EventtypeCategoryId, setEventtypeCategoryId] = useState();
    const [EventtypeCategoryname, setEventtypeCategoryname] = useState();
    const [Tag, setTag] = useState([]);
    const [Visibility, setVisibility] = useState(1);
    const [Location, setLocation] = useState();
    const [EventSubtype, setEventSubtype] = useState(1);
    const [Startdateselect, setStartdateselect] = useState(new Date());
    const [Enddateselect, setEnddateselect] = useState(new Date());
    const [IsclockCountdown, setIsclockCountdown] = useState(false);
    const [Displaystarttime, setDisplaystarttime] = useState(false);
    const [Displayendtime, setDisplayendtime] = useState(false);
    const [Eventdesc, setEventdesc] = useState();
    const [categoryList, setcategoryList] = useState([{ value: "", label: "Category" }]);
    const [countryList, setcountryList] = useState([{ value: "", label: "Country" }]);
    const [currencyList, setcurrencyList] = useState([{ value: "", label: "Currency" }]);
    const [EventtypecategoryList, setEventtypecategoryList] = useState([{ value: "", label: "Type" }]);
    const [inputValue, setInputValue] = useState('');
    const [tags, setTags] = useState([]);
    const [IsEventTicket, setIsEventTicket] = useState(true);
    const [TicketList, setTicketList] = useState([]);
    const [Tickettype, setTickettype] = useState(1);
    const [Ticketname, setTicketname] = useState();
    const [Quantity, setQuantity] = useState();
    const [TicketStartdate, setTicketStartdate] = useState(new Date());
    const [TicketEndtdate, setTicketEndtdate] = useState(new Date());
    const [Price, setPrice] = useState();
    const [Pricedisable, setPricedisable] = useState(false);
    const [EditId, setEditId] = useState();
    const [Currency, setCurrency] = useState();
    const [CurrencyId, setCurrencyId] = useState();
    const [Currencyname, setCurrencyname] = useState();
    const [Country, setCountry] = useState();
    const [CountryId, setCountryId] = useState();
    const [Countryname, setCountryname] = useState();
    const organizerid = localStorage.getItem('organizerid')

    const [selectedTimezone, setSelectedTimezone] = useState(
        Intl.DateTimeFormat().resolvedOptions().timeZone
    )
    // JSON.stringify(selectedTimezone, null, 2)
    const lottewidth = {
        width: '100%',
        height: '200px'
    }
    const handleSelect = async (selectedLocation) => {
        const results = await geocodeByAddress(selectedLocation);
        const latLng = await getLatLng(results[0]);
        console.warn('Selected location:', selectedLocation);
        console.warn('Latlng:', latLng);
        console.warn('result:', results);
        setLocation(selectedLocation);
    };
    function CheckDelete(editid, pricename) {
        MySwal.fire({
            title: 'Are you sure you want to remove?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Yes',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                TicketDelete(editid, pricename)
            } else if (result.isDenied) {

            }
        })
    }
    const TicketDelete = async (editid, pricename) => {
        try {
            const requestData = {
                updateid: editid,
                nameToRemove: pricename
            };
            fetch(apiurl + 'event/remove/price', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        toast.success('Removed successfully');
                        fetchAllTicket();
                    } else {

                    }
                })
                .catch(error => {
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error('Login api error:', error);
        }
    }
    var check_eventcreateid = localStorage.getItem('eventcreateid');
    var Editid = '';
    if (check_eventcreateid !== null) {
        var Editid = check_eventcreateid;
    }

    const handleIsclockCountdown = (event) => {
        setIsclockCountdown(event.target.checked); // Update state based on checkbox checked status
    };
    const handleDisplaystarttime = (event) => {
        setDisplaystarttime(event.target.checked); // Update state based on checkbox checked status
    };
    const handleDisplayendtime = (event) => {
        setDisplayendtime(event.target.checked); // Update state based on checkbox checked status
    };
    const fromgetdate = get_date_time(Startdateselect);
    var startdate = '';
    var starttime = '';
    if (fromgetdate) {
        startdate = fromgetdate[0].Dateview;
        starttime = fromgetdate[0].Timeview;
    }
    const togetdate = get_date_time(Enddateselect);
    var Enddate = '';
    var Rndtime = '';
    if (togetdate) {
        Enddate = togetdate[0].Dateview;
        Rndtime = togetdate[0].Timeview;
    }

    const fromticketgetdate = get_date_time(TicketStartdate);
    var ticketstartdate = '';
    var ticketstarttime = '';
    if (fromticketgetdate) {
        ticketstartdate = fromticketgetdate[0].Dateview;
        ticketstarttime = fromticketgetdate[0].Timeview;
    }
    const toticketgetdate = get_date_time(TicketEndtdate);
    var ticketenddate = '';
    var ticketendtime = '';
    if (toticketgetdate) {
        ticketenddate = toticketgetdate[0].Dateview;
        ticketendtime = toticketgetdate[0].Timeview;
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            if (inputValue.trim() !== '' && tags.length < 10) {
                setTags([...tags, inputValue.trim()]);
                setInputValue('');
            }
        }
    };
    const handleDeleteTag = (index) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
    };
    const HandelUpdatedetails = async () => {
        try {
            setLoader(true);
            var event_type_name = '';
            if (Eventtype == 1) {
                var event_type_name = 'Online Event';
            } else {
                var event_type_name = 'Offline Event';
            }
            if (!Displayprice || !Displaycutprice || !Name || !Displayname || !Category || !Location || !Country || !Currency || !selectedTimezone) {
                return toast.error("All field required");
            }
            const requestData = {
                updateid: EditId,
                isdelete: 0,
                status: 0,
                displayprice: Displayprice,
                displaycutprice: Displaycutprice,
                eventtype: Eventtype,
                event_type_name: event_type_name,
                name: Name,
                display_name: Displayname,
                type: Type,
                category: CategoryId,
                category_name: Categoryname,
                eventtypecategory: EventtypeCategoryId,
                eventtypecategory_name: EventtypeCategoryname,
                tags: tags,
                visibility: Visibility,
                location: Location,
                event_subtype_id: EventSubtype,
                start_date: startdate,
                start_time: starttime,
                end_date: Enddate,
                end_time: Rndtime,
                start_data_min: Startdateselect,
                end_data_min: Enddateselect,
                is_clock_countdown: IsclockCountdown,
                display_start_time: Displaystarttime,
                display_end_time: Displayendtime,
                organizer_id: organizerid,
                countryname: Countryname,
                currencycode: CurrencyId,
                countrysymbol: Currencyname,
                timezone: selectedTimezone,
            };
            fetch(apiurl + 'event/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    setLoader(false);
                    if (data.success == true) {
                        toast.success('Event updated successful', {
                            duration: 3000,
                        });
                        setFormSection(3);
                    } else {
                        toast.error(data.message);
                    }
                })
                .catch(error => {
                    setLoader(false);
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error('Login api error:', error);
            setLoader(false);
        }
    }
    const HandelUpdateEventDesc = async (updateid) => {
        try {
            if (!Eventdesc) {
                return toast.error("Event description require");
            }
            setLoader(true);
            const requestData = {
                event_desc: Eventdesc,
                updateid: updateid
                // event_image: [],
            };
            fetch(apiurl + 'event/update/eventdesc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    setLoader(false);
                    if (data.success == true) {
                        toast.success('Updated', {
                            duration: 3000,
                        });
                        fetchAllTicket();
                        setFormSection(4);
                    } else {
                        toast.error(data.message);
                    }
                })
                .catch(error => {
                    setLoader(false);
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error('Login api error:', error);
        }
    }
    const HandelSubmit = async () => {
        try {
            setLoader(true);
            var event_type_name = '';
            if (Eventtype == 1) {
                var event_type_name = 'Online Event';
            } else {
                var event_type_name = 'Offline Event';
            }
            if (!Displayprice || !Displaycutprice || !Name || !Displayname || !CategoryId || !Categoryname || !Location || !Countryname || !Currencyname || !selectedTimezone) {
                return toast.error("All field required");
            }
            const requestData = {
                isdelete: 0,
                status: 0,
                displayprice: Displayprice,
                displaycutprice: Displaycutprice,
                eventtype: Eventtype,
                event_type_name: event_type_name,
                name: Name,
                display_name: Displayname,
                type: Type,
                category: CategoryId,
                category_name: Categoryname,
                eventtypecategory: EventtypeCategoryId,
                eventtypecategory_name: EventtypeCategoryname,
                tags: tags,
                visibility: Visibility,
                location: Location,
                event_subtype_id: EventSubtype,
                start_date: startdate,
                start_time: starttime,
                end_date: Enddate,
                end_time: Rndtime,
                start_data_min: Startdateselect,
                end_data_min: Enddateselect,
                is_clock_countdown: IsclockCountdown,
                display_start_time: Displaystarttime,
                display_end_time: Displayendtime,
                organizer_id: organizerid,
                countryname: Countryname,
                currencycode: CurrencyId,
                countrysymbol: Currencyname,
                timezone: selectedTimezone,

            };
            fetch(apiurl + 'event/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    setLoader(false);
                    if (data.success == true) {
                        toast.success('Event Created successful', {
                            duration: 3000,
                        });
                        setEditId(data.data)
                        setFormSection(3);
                    } else {
                        toast.error(data.message);
                    }
                })
                .catch(error => {
                    setLoader(false);
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error('Login api error:', error);
            setLoader(false);
        }
    }
    function emptyField() {
        setFormSection(1);
        setEventtype('');
        setName('');
        setDisplayname('');
        setType('');
        setCategory('');
        setCategoryId('');
        setCategoryname('');
        Visibility(1);
        Location('');
        EventSubtype(1);
        IsclockCountdown(false);
        Displaystarttime(false);
        Displayendtime(false);
        Eventdesc('');
        setcategoryList({ value: "", label: "Category" });
        setEventtypecategoryList({ value: "", label: "Type" });
    }
    function emptyPriceForm() {
        setTickettype(1);
        setTicketname('');
        setQuantity('');
        setPrice('');
        setPricedisable(false);
    }
    const selectCategory = (selectedValue) => {
        setCategory(selectedValue);
        setCategoryId(selectedValue.value);
        setCategoryname(selectedValue.label);
    };
    const selectCurrency = (selectedValue) => {
        setCurrency(selectedValue);
        setCurrencyId(selectedValue.value);
        setCurrencyname(selectedValue.label);
    };
    const selectCountry = (selectedValue) => {
        setCountry(selectedValue);
        setCountryId(selectedValue.value);
        setCountryname(selectedValue.label);
    };

    const fetchCategory = async () => {
        try {
            fetch(apiurl + 'category/get-category-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        const categoryData = data.data;
                        const CategoryOption = categoryData.map(category => ({
                            value: category._id,
                            label: category.name
                        }));
                        setcategoryList(CategoryOption);
                    }
                })
                .catch(error => {
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error('Login api error:', error);
        }
    }
    const fetchCountry = async () => {
        try {
            fetch(apiurl + 'admin/country-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        const countryData = data.data;
                        const countryOption = countryData.map(item => ({
                            value: item.name,
                            label: item.name
                        }));
                        const currencyOption = countryData.map(item => ({
                            value: item.currency,
                            label: item.symbol
                        }));
                        setcountryList(countryOption);
                        setcurrencyList(currencyOption)
                    }
                })
                .catch(error => {
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error('Login api error:', error);
        }
    }
    const fetchAllTicket = async () => {
        try {
            setApiloader(true);
            const requestData = {
                updateid: EditId
            };
            fetch(apiurl + 'event/ticket-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {

                    if (data.success == true) {
                        const fetchdata = data.data.allprice;
                        setTicketList(fetchdata);
                        if (fetchdata.length > 0) {
                            setIsEventTicket(false);
                        } else {
                            setIsEventTicket(true);
                        }
                    }
                    setApiloader(false);
                })
                .catch(error => {
                    console.error('Insert error:', error);

                    setApiloader(false);

                });

        } catch (error) {
            console.error('Login api error:', error);
            setApiloader(false);
        }
    }

    const HandelPriceform = async () => {
        toast.success("Updated successfully");
        // navigate(organizer_url + 'event/all-event-list');
    }
    const handelCreateTicket = async (updateid) => {
        try {
            if (!Tickettype) {
                return toast.error('Select ticket type');
            }
            if (!Ticketname) {
                return toast.error('Enter ticket name');
            }
            if (!Quantity) {
                return toast.error('Enter ticket quantity');
            }
            if (!Price && Tickettype == 1) {
                return toast.error('Enter ticket price');
            }
            setLoader(true);
            const requestData = {
                updateid: updateid,
                ticket_type: Tickettype,
                name: Ticketname,
                quantity: Quantity,
                startdate: ticketstartdate,
                endtdate: ticketenddate,
                starttime: ticketstarttime,
                endttime: ticketendtime,
                price: Price
            };
            fetch(apiurl + 'event/update/price', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    setLoader(false);
                    if (data.success == true) {
                        toast.success('Updated', {
                            duration: 3000,
                        });
                        setTicketshow(false);
                        emptyPriceForm();
                        fetchAllTicket();
                    } else {
                        toast.error(data.message);
                    }
                    setLoader(false);
                })
                .catch(error => {
                    setLoader(false);
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error('Login api error:', error);
            setLoader(false);
        }
    }
    const fetchEventtypeCategory = async () => {
        try {
            fetch(apiurl + 'category/get-event-type-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        const categoryData = data.data;
                        const CategoryOption = categoryData.map(category => ({
                            value: category._id,
                            label: category.name
                        }));
                        setEventtypecategoryList(CategoryOption);
                    }
                })
                .catch(error => {
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error('Login api error:', error);
        }
    }
    const CategoryOption = [
        {
            options: categoryList
        }
    ]
    const CountryOption = [
        {
            options: countryList
        }
    ]
    const CurrencyOption = [
        {
            options: currencyList
        }
    ]
    function HandelCreateticket() {
        setTicketshow(true);
    }
    const getEditdata = async (editid) => {
        try {
            setApiloader(true);
            const requestData = {
                id: editid
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
                        setFormSection(2)
                        setName(data.data.name)
                        setEditId(data.data._id)
                        setDisplayname(data.data.display_name)
                        setType(data.data.eventtype)
                        setEventtype(data.data.eventtype)
                        setCategoryId(data.data.category)
                        setCategoryname(data.data.category_name)
                        setCategory([{ value: data.data.category, label: data.data.category_name }])
                        setCountry([{ value: data.data.countryname, label: data.data.countryname }])
                        setCurrency([{ value: data.data.currencycode, label: data.data.countrysymbol }])
                        setCurrencyname(data.data.countrysymbol)
                        setEventtypeCategoryId(data.data.eventtypecategory)
                        setEventtypeCategoryname(data.data.eventtypecategory_name)
                        setVisibility(data.data.visibility)
                        setLocation(data.data.location)
                        setEventSubtype(data.data.event_subtype_id)
                        setStartdateselect(data.data.start_data_min[0])
                        setEnddateselect(data.data.end_data_min[0])
                        setIsclockCountdown(data.data.is_clock_countdown)
                        setDisplaystarttime(data.data.display_start_time)
                        setDisplayendtime(data.data.display_end_time)
                        setEventdesc(data.data.event_desc)
                        setDisplayprice(data.data.displayprice)
                        setDisplaycutprice(data.data.displaycutprice)
                        setSelectedTimezone(data.data.timezone)
                        setTags(data.data.tags)
                        if (data.data.event_desc) {
                            setEventdesc(data.data.event_desc)
                        }
                        fetchAllTicket()
                    }
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setApiloader(false);
                });

        } catch (error) {
            console.error('Login api error:', error);
        }
    }
    useEffect(() => {
        fetchCategory();
        fetchCountry();
        fetchEventtypeCategory();
        if (editid) {
            getEditdata(editid)
        }
    }, []);
    return (
        <>
            <Row className="pb-2">
                <Col md={2} className="event-create-nav-bg">
                    <div className="event-create-nav">
                        {EditId ? (
                            <ul aria-expanded="false">
                                <li onClick={() => setFormSection(2)} className={FormSection === 2 ? "active-event-form" : ''}><p variant="link" className='text-black cursor-pointre'>Basic Info</p></li>
                                <li onClick={() => setFormSection(3)} className={FormSection === 3 ? "active-event-form" : ''}><p variant="link" className='text-black  cursor-pointre'>Details</p></li>
                                <li onClick={() => setFormSection(4)} className={FormSection === 4 ? "active-event-form" : ''}><p variant="link" className='text-black  cursor-pointre'>Price</p></li>
                            </ul>
                        ) : (
                            <ul aria-expanded="false">
                                <li className={FormSection === 1 ? "active-event-form" : ''}><p variant="link" className='text-black'>Add New</p></li>
                                <li className={FormSection === 2 ? "active-event-form" : ''}><p variant="link" className='text-black'>Basic Info</p></li>
                                <li className={FormSection === 3 ? "active-event-form" : ''}><p variant="link" className='text-black'>Details</p></li>
                                <li className={FormSection === 4 ? "active-event-form" : ''}><p variant="link" className='text-black'>Price</p></li>
                            </ul>
                        )}
                    </div>
                </Col>
                <Col md={10}>
                    <Card>
                        <Card.Body className="py-5">
                            {FormSection === 1 ?
                                (
                                    <Row className="pb-5">
                                        <Col md={12} className="text-center mb-5">
                                            <h2 className="theme-color mb-2 ">Select Event Type</h2>
                                            <p className="text-black">Your one stop solution for managing and conducting events</p>
                                        </Col>
                                        <Col md={6} className="mt-5">
                                            <div className="event_category_box gradient-blue text-center float-right">
                                                <h3 className="event-category-title theme-color">Online Event</h3>
                                                <p className="event-category-desc text-black mb-4">Host online events using  Zoom, Google Meet, YouTube Live etc</p>
                                                <span onClick={() => { setEventtype(1); setFormSection(2); }}>
                                                    <WhitestarBtn title={'Create Event'} />
                                                </span>
                                                <div className="icon_section">
                                                    <img src={GroupIcon} />
                                                    <img src={OnlineIcon} />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={6} className="mt-5">
                                            <div className="event_category_box gradient-grey text-center">
                                                <h3 className="event-category-title theme-color">Physical Event</h3>
                                                <p className="event-category-desc text-black mb-4">Host in-person or outdoor events using our event management platform</p>
                                                <div className="button-group">
                                                    <span onClick={() => { setEventtype(2); setFormSection(2); }}>
                                                        <WhitestarBtn title={'Create Event'} />
                                                    </span>
                                                </div>
                                                <div className="icon_section">
                                                    <img src={GroupIcon} />
                                                    <img src={OffliveIcon} />
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                ) : (<></>)}
                            {FormSection === 2 ? (
                                <Row className="pb-5">
                                    <Col md={12} className="text-center mb-5">
                                        <h2 className="theme-color mb-2 ">Event Basic Info</h2>
                                    </Col>
                                    <div className="col-md-6">
                                        <label htmlFor="" className="text-black">Event Name</label>
                                        <input type="text" class="form-control input-default" value={Name} onChange={(e) => setName(e.target.value)} placeholder="Enter Event Name" />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="" className="text-black">Event Display Name <img src={InfoIcon} /></label>
                                        <input type="text" class="form-control input-default " value={Displayname} onChange={(e) => setDisplayname(e.target.value)} placeholder="Enter Event Display Name" />
                                    </div>
                                    <div className="col-md-4 mt-4">
                                        <label htmlFor="" className="text-black">Select Category</label>
                                        <Select
                                            isClearable={false}
                                            options={CategoryOption}
                                            className='react-select select-theme'
                                            classNamePrefix='select'
                                            onChange={selectCategory}
                                            value={Category}
                                        />
                                    </div>
                                    <div className="col-md-8 mt-4"></div>
                                    <div className="col-md-4 mt-4">
                                        <label htmlFor="" className="text-black">Select Currency</label>
                                        <Select
                                            isClearable={false}
                                            options={CurrencyOption}
                                            className='react-select select-theme'
                                            classNamePrefix='select'
                                            onChange={selectCurrency}
                                            value={Currency}
                                        />
                                    </div>
                                    <div className="col-md-4 mt-4">
                                        <label htmlFor="" className="text-black">Display price</label>
                                        <input type="text" class="form-control input-default" value={Displayprice} onChange={(e) => setDisplayprice(e.target.value)} placeholder="Enter Amount" />
                                    </div>
                                    <div className="col-md-4  mt-4">
                                        <label htmlFor="" className="text-black">Display cut price</label>
                                        <input type="text" class="form-control input-default" value={Displaycutprice} onChange={(e) => setDisplaycutprice(e.target.value)} placeholder="Enter Amount" />
                                    </div>
                                    <div className="col-md-12 mt-4">
                                        <label htmlFor="">Tags</label>
                                        <p>Improve discoverability of your event by adding tags relevant to subject matter.</p>
                                        <input
                                            type="text"
                                            className="form-control input-default"
                                            placeholder="Add search keywords to your event"
                                            value={inputValue}
                                            onChange={handleInputChange}
                                            onKeyDown={handleInputKeyDown}
                                        />
                                        <span className="mt-2">{tags.length} / 10 tags.</span>
                                        <div className="tag-preview-option my-4">
                                            <ul>
                                                {tags.map((tag, index) => (
                                                    <li key={index}>
                                                        {tag}
                                                        <button onClick={() => handleDeleteTag(index)} className="delete-button">
                                                            X
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-8"></div>
                                    <div className="col-md-8 mt-4">
                                        <label htmlFor="">Event Visibility</label>
                                        <div className="tab-button-box">
                                            {/* tab-button-active */}
                                            <span onClick={() => setVisibility(1)} className={Visibility == 1 ? "tab-button-active" : ""}><img src={WorldIcon} alt="" /> Public</span>
                                            <span onClick={() => setVisibility(2)} className={Visibility == 2 ? "tab-button-active" : ""}><img src={LockIcon} alt="" /> Private</span>
                                        </div>
                                    </div>
                                    <div className="col-md-8 mt-4">
                                        <label htmlFor="">Location</label>
                                        <p>Help people in the area discover your event and let attendees know where to show up.</p>
                                        <div className="tab-button-box">
                                            <span onClick={() => setEventtype(1)} className={Eventtype == 1 ? "tab-button-active" : "tab-button-grey-active"}>Venue</span>
                                            <span onClick={() => setEventtype(2)} className={Eventtype == 2 ? "tab-button-active" : "tab-button-grey-active"}> Online Event</span>
                                            <span onClick={() => setEventtype(3)} className={Eventtype == 3 ? "tab-button-active" : ""}>To be announced</span>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-4"></div>
                                    <div className="col-md-3 mt-4">
                                        <label htmlFor="" className="text-black">Select Country</label>
                                        <Select
                                            isClearable={false}
                                            options={CountryOption}
                                            className='react-select select-theme'
                                            classNamePrefix='select'
                                            onChange={selectCountry}
                                            value={Country}
                                        />
                                    </div>
                                    <div className="col-md-6 mt-4">
                                        {/* ... (other code) */}
                                        <label htmlFor="" className="text-black">Address</label>
                                        <PlacesAutocomplete
                                            value={Location}
                                            onChange={(e) => setLocation(e)}
                                            onSelect={handleSelect}
                                        >
                                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                <div>
                                                    <input
                                                        {...getInputProps({
                                                            placeholder: 'Search for venue or address',
                                                            className: 'form-control',
                                                        })}
                                                    />
                                                    <div>
                                                        {loading ? <div>Loading...</div> : null}

                                                        {suggestions.map((suggestion) => (
                                                            <div className="location-sugg" {...getSuggestionItemProps(suggestion)}>
                                                                {suggestion.description}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </PlacesAutocomplete>
                                    </div>
                                    <div className="col-md-12 pt-4">
                                        <p className="mb-0">Tell event-goers when your event starts and ends so they can make plans to attend.</p>
                                    </div>
                                    <div className="col-md-4 mt-4">
                                        <label htmlFor="">Date & Time</label>
                                        <div className="tab-button-box">
                                            <span onClick={() => setEventSubtype(1)} className={EventSubtype == 1 ? "tab-button-active" : ""}>Single Event</span>
                                            <span onClick={() => setEventSubtype(2)} className={EventSubtype == 2 ? "tab-button-active" : ""}> Recurring Event</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mt-4 d-flex align-items-end">
                                        <div className="select-wrapper w-100">
                                            <p>Select time zone</p>
                                            <TimezoneSelect
                                                value={selectedTimezone}
                                                onChange={setSelectedTimezone}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4 checkout-style-bottom">
                                        <div className="row checkout-style-element Display-date-time-tic">
                                            <div className="col-md-2">
                                                <div class="input-group mb-3">
                                                    <input checked={IsclockCountdown} onChange={handleIsclockCountdown} type="checkbox" class="form-check-input" />
                                                </div>
                                            </div>
                                            <div className="col-md-10">
                                                <p className="mb-0">Clock Timer ( Countdown )</p>
                                                <p className="mb-0">Clock timer of your event will be displayed to attendess.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <p>Event Starts</p>
                                    </div>
                                    <div className="col-md-4">
                                        <div class="input-group mb-3 input-warning-o" style={{ position: 'relative' }}>
                                            <span class="input-group-text"><img src={DateIcon} alt="" /></span>
                                            <input type="text" class="form-control date-border-redius date-border-redius-input" placeholder="" readOnly value={startdate} />
                                            <div className="date-style-picker">
                                                <Flatpickr
                                                    value={Startdateselect}
                                                    data-enable-time
                                                    id='date-picker'
                                                    className='form-control'
                                                    onChange={date => setStartdateselect(date)}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-md-4">
                                        <div class="input-group mb-3 input-warning-o">
                                            <span class="input-group-text"><img src={TimeIcon} alt="" /></span>
                                            <input type="text" class="form-control date-border-redius-input" placeholder="" readOnly value={starttime} />
                                        </div>
                                    </div>
                                    <div className="col-md-4 checkout-style-bottom">
                                        <div className="row checkout-style-element">
                                            <div className="col-md-2 col-2">
                                                <div class="input-group mb-3">
                                                    <input checked={Displaystarttime} onChange={handleDisplaystarttime} type="checkbox" class="form-check-input" />
                                                </div>
                                            </div>
                                            <div className="col-md-10 col-10 Display-date-time-tic">
                                                <p className="mb-0">Display start time.</p>
                                                <p className="mb-0">The start time of your event will be displayed to attendess.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-4">
                                        <p>Event Ends</p>
                                    </div>
                                    <div className="col-md-4">
                                        <div class="input-group mb-3 input-warning-o" style={{ position: 'relative' }}>
                                            <span class="input-group-text"><img src={DateIcon} alt="" /></span>
                                            <input type="text" class="form-control date-border-redius date-border-redius-input" placeholder="" readOnly value={Enddate} />
                                            <div className="date-style-picker">
                                                <Flatpickr
                                                    value={Enddateselect}
                                                    data-enable-time
                                                    id='date-picker'
                                                    className='form-control'
                                                    onChange={date => setEnddateselect(date)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div class="input-group mb-3 input-warning-o">
                                            <span class="input-group-text"><img src={TimeIcon} alt="" /></span>
                                            <input type="text" class="form-control date-border-redius-input" placeholder="" readOnly value={Rndtime} />
                                        </div>
                                    </div>
                                    <div className="col-md-4 checkout-style-bottom">
                                        <div className="row checkout-style-element">
                                            <div className="col-md-2">
                                                <div class="input-group mb-3">
                                                    <input checked={Displayendtime} onChange={handleDisplayendtime} type="checkbox" class="form-check-input" />
                                                </div>
                                            </div>
                                            <div className="col-md-10 Display-date-time-tic">
                                                <p className="mb-0">Display end time.</p>
                                                <p className="mb-0">The end time of your event will be displayed to attendess.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-2">
                                        <div className="button-group mt-10">
                                            <span onClick={() => setFormSection(1)}>
                                                <WhitestarBtn title={'Back'} />
                                            </span>
                                            {Loader ? (
                                                <span onClick={HandelPriceform}>
                                                    <WhitestarBtn title={'Please wait...'} />
                                                </span>
                                            ) : (
                                                <>
                                                    {EditId ? (
                                                        <span onClick={() => HandelUpdatedetails()}>
                                                            <WhitestarBtn title={'Update'} />
                                                        </span>

                                                    ) : (
                                                        <span onClick={() => HandelSubmit()}>
                                                            <WhitestarBtn title={'Save'} />
                                                        </span>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </Row>
                            ) : (<></>)}
                            {FormSection === 3 ? (
                                <Row>
                                    <Col md={12} className="text-center mb-5">
                                        <h2 className="theme-color mb-2 ">Event Images</h2>
                                    </Col>
                                    <div className="col-md-12 mb-5">
                                        <h4 className="mb-2">About this event</h4>
                                        <p>Add photos to show what your event will be about. You can upload up to 10 images.</p>
                                        <div className="dropzone">
                                            <div class="fallback">
                                                <input name="file " type="file" multiple />
                                            </div>
                                        </div>
                                    </div>
                                    <Col md={12} className="text-center mb-5">
                                        <h2 className="theme-color mb-2 ">Event Description</h2>
                                    </Col>
                                    <div className="col-md-12">
                                        <h4 className="mb-2">About this event</h4>
                                        <textarea className="custome-text-area" placeholder="Description" value={Eventdesc} onChange={(e) => setEventdesc(e.target.value)}></textarea>

                                    </div>
                                    <div className="col-md-12 mt-2">
                                        <h3 className="text-grey">Add more sections to your event page</h3>
                                        <p className="text-light-grey">Help people in the area discover your event and let attendees know where to <br /> show up.</p>
                                    </div>
                                    <div className="col-md-12 mt-2 d-flex align-items-center">
                                        <span className="theme-color text-bold-600 font-30 mr-3">FAQ</span> <button className="btn-2" type="button">Add <img src={Locationstart} /></button>
                                    </div>
                                    <div className="col-md-12 mt-2">
                                        <div className="col-md-12 mt-2">
                                            <div className="button-group mt-10">

                                                <span onClick={() => setFormSection(2)}>
                                                    <WhitestarBtn title={'Back'} />
                                                </span>
                                                {Loader ? (
                                                    <span onClick={HandelPriceform}>
                                                        <WhitestarBtn title={'Please wait...'} />
                                                    </span>
                                                ) : (
                                                    <>
                                                        {EditId ? (
                                                            <span onClick={() => HandelUpdateEventDesc(EditId)}>
                                                                <WhitestarBtn title={'Update'} />
                                                            </span>
                                                        ) : (
                                                            <span onClick={() => HandelSubmit()}>
                                                                <WhitestarBtn title={'Save'} />
                                                            </span>
                                                        )}
                                                    </>
                                                )}

                                            </div>
                                        </div>
                                    </div>
                                </Row>
                            ) : (<></>)}
                            {FormSection === 4 ? (
                                <Row>
                                    <Col md={12} className="text-center mb-5">
                                        <h2 className="theme-color mb-2 ">Event Price</h2>
                                    </Col>
                                    <Col md={12} className="">
                                        <Button variant="link" className="button-join" onClick={HandelCreateticket}>
                                            <span>
                                                <span className="bg-style"><img height={30} width={30} src={whitestar} /></span><span className="bg-style bg-title-style">Add Ticket</span>
                                            </span>
                                        </Button>
                                    </Col>
                                    {Apiloader ? (
                                        <div className="linear-background w-100"> </div>
                                    ) : (
                                        <>
                                            {
                                                IsEventTicket ? (
                                                    <Col md={12} className="mt-5 text-center" >
                                                        <div className="no-data-found">
                                                            <Lottie animationData={TicketLotte} style={lottewidth} />
                                                            <p className="no_ticket_added">Ticket has not been added yet !</p>
                                                        </div>
                                                    </Col>
                                                ) : (

                                                    <Col md={12} className="mt-5">
                                                        <div className="price-list-box">
                                                            {TicketList.map((item, index) => (
                                                                <Row className="">
                                                                    <Col md={12}>
                                                                        <p className="price-title">
                                                                            {item.name}
                                                                        </p>
                                                                    </Col>
                                                                    <Col md={1}>
                                                                        <span class="badge light badge-success">On sale</span>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <div>
                                                                            <p className="price-section-box" style={{ marginBottom: '0px' }}>
                                                                                <span className="devide-dot">|</span> <span className="ticket-date">{item.startdate} at {item.starttime}</span>
                                                                            </p>
                                                                        </div>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <p className="ticket-sold-count">Sold : 0 / {item.quantity}</p>
                                                                    </Col>
                                                                    <Col md={1}>
                                                                        <p className="ticket-price-p"> {item.price ? (<>{Currencyname} {item.price}</>) : (Currencyname + '00')} </p>
                                                                    </Col>
                                                                    <Col md={2}>
                                                                        <div class="dropdown">
                                                                            <button type="button" class="btn btn-success light sharp" data-bs-toggle="dropdown">
                                                                                <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24" /><circle fill="#000000" cx="5" cy="12" r="2" /><circle fill="#000000" cx="12" cy="12" r="2" /><circle fill="#000000" cx="19" cy="12" r="2" /></g></svg>
                                                                            </button>
                                                                            <div class="dropdown-menu">
                                                                                <Button variant="link" class="dropdown-item">Edit</Button>
                                                                                <Button variant="link" onClick={() => CheckDelete(Editid, item.name)} class="dropdown-item">Delete</Button>
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            ))}
                                                        </div>
                                                    </Col>
                                                )}
                                        </>
                                    )}
                                    <div className="col-md-12 mt-2">
                                        <div className="button-group mt-10">
                                            <span onClick={() => setFormSection(3)}>
                                                <WhitestarBtn title={'Back'} />
                                            </span>
                                            {Loader ? (
                                                <span onClick={HandelPriceform}>
                                                    <WhitestarBtn title={'Please wait...'} />
                                                </span>
                                            ) : (
                                                <span onClick={HandelPriceform}>
                                                    <WhitestarBtn title={'Update'} />
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </Row>
                            ) : (<></>)}
                        </Card.Body>
                    </Card>
                </Col>
            </Row >
            <Modal isOpen={Ticketshow} toggle={() => setTicketshow(!Ticketshow)} className='modal-dialog-centered modal-lg'>
                <ModalHeader className='bg-transparent' toggle={() => setTicketshow(!Ticketshow)}>Create new ticket</ModalHeader>
                <ModalBody className=''>
                    <Row>
                        <Col md={12} className="justify-content-center d-flex">
                            <div className="tab-button-box">
                                {/* tab-button-active */}
                                <span onClick={() => { setTickettype(1); setPricedisable(false); }} className={Tickettype === 1 ? "tab-button-active" : ""}>Paid</span>
                                <span onClick={() => { setTickettype(2); setPricedisable(true); setPrice(''); }} className={Tickettype === 2 ? "tab-button-active" : ""}>Free</span>
                                {/* <span onClick={() => { setTickettype(3); setPricedisable(true); setPrice(''); }} className={Tickettype === 3 ? "tab-button-active" : ""}>Donation</span> */}
                            </div>
                        </Col>
                        <Col md={12} className="mb-2 mt-4">
                            <label htmlFor="" className="text-black">Name</label>
                            <input type="text" class="form-control input-default" onChange={(e) => setTicketname(e.target.value)} value={Ticketname} placeholder="Name" />
                        </Col>
                        <Col md={6} className="mb-2">
                            <label htmlFor="" className="text-black">Available quantity</label>
                            <input type="number" class="form-control input-default" onChange={(e) => setQuantity(e.target.value)} value={Quantity} placeholder="Available quantity" />
                        </Col>
                        <Col md={6} className="mb-2">
                            <label htmlFor="" className="text-black">Price</label>
                            <Input type="number" disabled={Pricedisable} class="form-control input-default" value={Price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
                        </Col>
                        <Col md={4} className="mb-2 mt-4">
                            <label htmlFor="" className="text-black">Start date</label>
                            <div class="input-group mb-3 input-warning-o" style={{ position: 'relative' }}>
                                <span class="input-group-text"><img src={DateIcon} alt="" /></span>
                                <input type="text" class="form-control date-border-redius date-border-redius-input" placeholder="" readOnly value={ticketstartdate} />
                                <div className="date-style-picker">
                                    <Flatpickr
                                        value={TicketStartdate}
                                        data-enable-time
                                        id='date-picker'
                                        className='form-control'
                                        onChange={date => setTicketStartdate(date)}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col md={4} className="mb-2  mt-4">
                            <label htmlFor="" className="text-black">Start time</label>
                            <div class="input-group mb-3 input-warning-o">
                                <span class="input-group-text"><img src={TimeIcon} alt="" /></span>
                                <input type="text" class="form-control date-border-redius-input" placeholder="" readOnly value={ticketstarttime} />
                            </div>
                        </Col>
                        <Col md={12} className="mb-2"></Col>
                        <Col md={4} className="mb-2">
                            <label htmlFor="" className="text-black">End date</label>
                            <div class="input-group mb-3 input-warning-o" style={{ position: 'relative' }}>
                                <span class="input-group-text"><img src={DateIcon} alt="" /></span>
                                <input type="text" class="form-control date-border-redius date-border-redius-input" placeholder="" readOnly value={ticketenddate} />
                                <div className="date-style-picker">
                                    <Flatpickr
                                        value={TicketEndtdate}
                                        data-enable-time
                                        id='date-picker'
                                        className='form-control'
                                        onChange={date => setTicketEndtdate(date)}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col md={4} className="mb-2">
                            <label htmlFor="" className="text-black">End time</label>
                            <div class="input-group mb-3 input-warning-o">
                                <span class="input-group-text"><img src={TimeIcon} alt="" /></span>
                                <input type="text" class="form-control date-border-redius-input" placeholder="" readOnly value={ticketendtime} />
                            </div>
                        </Col>
                        <Col md={12}>
                            {EditId ? (
                                <>
                                    {Loader ? (
                                        <span onClick={HandelPriceform}>
                                            <WhitestarBtn title={'Please wait...'} />
                                        </span>
                                    ) : (
                                        <span onClick={() => handelCreateTicket(EditId)}>
                                            <WhitestarBtn title={'Add ticket'} />
                                        </span>
                                    )}
                                </>
                            ) : (<></>)}
                        </Col>
                    </Row>
                </ModalBody>
            </Modal >
        </>
    )
}
export default Type;