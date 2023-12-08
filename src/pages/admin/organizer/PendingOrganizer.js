import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { apiurl, admin_url } from '../../../common/Helpers';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {
    Modal,
    ModalBody,
    ModalHeader,
} from 'reactstrap'
import toast from "react-hot-toast";
const Dashboard = ({ title }) => {
    const MySwal = withReactContent(Swal)
    const [Loader, setLoader] = useState(true);
    const [Listitems, setListitems] = useState([]);
    const fetchList = async () => {
        try {
            const requestData = {
                isactive: 0,
            };
            fetch(apiurl + 'admin/get-organizer-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setLoader(false);
                        setListitems(data.data);
                    } else {
                        setLoader(false);
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
    const ActiveOrganizer = async (id) => {
        try {
            const requestData = {
                id: id,
                isactive: 1,
                password: "12345678"
            };
            fetch(apiurl + 'admin/active-organizer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        toast.success("Organizer status change to active");
                        fetchList();
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
    function CheckActiveOrganizer(id) {
        MySwal.fire({
            title: 'Are you sure you want to active?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Yes',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                ActiveOrganizer(id);
            } else if (result.isDenied) {

            }
        })
    }
    useEffect(() => {
        fetchList();
    }, []);
    return (
        <>
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">
                    <div className="page-titles">
                        <Link className="page-theme-btn position-right" to={admin_url + 'active-organizers'}>View organizer</Link>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">{title}</li>
                        </ol>
                    </div>
                    <Row className="justify-content-center">
                        <Col md={12}>
                            <Card className="py-4">
                                <Card.Body>
                                    <Row className="justify-content-center">
                                        <Col md={12}>
                                            <div class="table-responsive">
                                                {Loader ? (
                                                    <div className="linear-background w-100"> </div>
                                                ) : (
                                                    <table class="table table-responsive-md">
                                                        <thead>
                                                            <tr>
                                                                <th style={{ width: '80px' }}><strong>#</strong></th>
                                                                <th><strong>Name</strong></th>
                                                                <th><strong>Email</strong></th>
                                                                <th><strong>Phone Number</strong></th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {Listitems.map((item, index) => (
                                                                <tr>
                                                                    <td><strong>{index + 1}</strong></td>
                                                                    <td>{item.name}</td>
                                                                    <td>{item.email}</td>
                                                                    <td>{item.area_code}{item.phone_number}</td>
                                                                    <td>
                                                                        <div class="dropdown">
                                                                            <button type="button" class="btn btn-success light sharp" data-bs-toggle="dropdown">
                                                                                <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24" /><circle fill="#000000" cx="5" cy="12" r="2" /><circle fill="#000000" cx="12" cy="12" r="2" /><circle fill="#000000" cx="19" cy="12" r="2" /></g></svg>
                                                                            </button>
                                                                            <div class="dropdown-menu">
                                                                            <Link to={`${admin_url}organizer-details/${item._id}/${item.name}`} class="dropdown-item">View</Link>
                                                                                <Button variant="link" onClick={() => CheckActiveOrganizer(item._id)} class="dropdown-item">Active</Button>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                )}
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}
export default Dashboard;