import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Button, Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { apiurl, admin_url } from '../../../common/Helpers';
import { Link } from "react-router-dom";
const Dashboard = ({ title }) => {
    const { id, name } = useParams();
    const [Loader, setLoader] = useState(false);
    const [Listitems, setListitems] = useState([]);
    const fetchList = async () => {
        try {
            setLoader(true)
            fetch(apiurl + 'admin/get-customer-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setListitems(data.data);
                    } else {

                    }
                    setLoader(false)
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setLoader(false)
                });
        } catch (error) {
            console.error('Login api error:', error);
            setLoader(false)
        }
    }
    const fetchListWithfilter = async () => {
        try {
            setLoader(true)
            const requestData = {
                membershipid: id,
            };
            fetch(apiurl + 'admin/get-customer-list-with-filter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setListitems(data.data);
                    } else {

                    }
                    setLoader(false)
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setLoader(false)
                });
        } catch (error) {
            console.error('Login api error:', error);
            setLoader(false)
        }
    }
    useEffect(() => {
        if (id) {
            fetchListWithfilter();
        } else {
            fetchList();
        }
    }, [id]);
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
                                            {Loader ? (
                                                <div className="linear-background w-100"> </div>
                                            ) : (
                                                <>
                                                    {Listitems.length > 0 ? (
                                                        <>
                                                            <div class="table-responsive">
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
                                                                                            <Link to={`${admin_url}user-details/${item._id}/${item.name}`} class="dropdown-item">View</Link>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div class="no-data-box">
                                                            <p>No Data Found !</p>
                                                        </div>
                                                    )}
                                                </>
                                            )}
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