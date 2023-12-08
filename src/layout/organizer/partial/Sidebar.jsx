import React from 'react';
import DashboardIcon from '../../../common/icon/dashboardicon.svg';
import EventIcon from '../../../common/icon/event 1.svg';
import ticketIcon from '../../../common/icon/ticket 1.svg';
import walletIcon from '../../../common/icon/wallet 1.svg';
import scannerIcon from '../../../common/icon/scanner 1.svg';
import MenuIcon from '../../../common/icon/Menu sidebar.svg';
import peopleIcon from '../../../common/icon/people 1.svg';
import supportIcon from '../../../common/icon/support.svg';
import { Link, useNavigate } from 'react-router-dom';
import { organizer_url, app_url } from '../../../common/Helpers';
const Sidebar = () => {
    const navigate = useNavigate();
    function Logout() {
        localStorage.removeItem('organizerauth');
        localStorage.removeItem('organizerid');
        localStorage.removeItem('organizer_role');
        navigate(app_url);
    }
    function d() {
        const mainWrapperView = document.getElementById('main-wrapper view');
        const xyx = document.getElementsByClassName('hamburger');
        if (mainWrapperView) {
            mainWrapperView.classList.remove('show', 'menu-toggle');
            for (let i = 0; i < xyx.length; i++) {
                xyx[i].classList.remove('is-active');
            }
        }
    }
    return (
        <>
            <div className="deznav">
                <div className="deznav-scroll">
                    <ul className="metismenu" id="menu">
                        <li onClick={() => d()}><Link to={organizer_url + 'dashboard'} className="ai-icon" aria-expanded="false">
                            <img src={DashboardIcon} alt="Your Logo" />
                            <span className="nav-text">Dashboard</span>
                        </Link>
                        </li>
                        <li onClick={() => d()}>
                            <Link to={organizer_url + 'event/all-event-list'} className="ai-icon" aria-expanded="false">
                                <img src={ticketIcon} alt="Your Logo" />
                                <span className="nav-text">Event Management</span>
                            </Link>
                        </li>
                        <li><Link href="reports.html" className="ai-icon" aria-expanded="false">
                            <img src={ticketIcon} alt="Your Logo" />
                            <span className="nav-text">Event Bookings</span>
                        </Link>
                        </li>
                        <li><Link href="reports.html" className="ai-icon" aria-expanded="false">
                            <img src={walletIcon} alt="Your Logo" />
                            <span className="nav-text">Finance</span>
                        </Link>
                        </li>
                        <li onClick={() => d()}><Link to={organizer_url + 'tixme-scanner'} className="ai-icon" aria-expanded="false">
                            <img src={scannerIcon} alt="Your Logo" />
                            <span className="nav-text">Tixme Scanner</span>
                        </Link>
                        </li>
                        <li><Link href="reports.html" className="ai-icon" aria-expanded="false">
                            <img src={MenuIcon} alt="Your Logo" />
                            <span className="nav-text">Marketing</span>
                        </Link>
                        </li>
                        <li><Link href="reports.html" className="ai-icon" aria-expanded="false">
                            <img src={peopleIcon} alt="Your Logo" />
                            <span className="nav-text">Manage Attendees</span>
                        </Link>
                        </li>
                        <li><Link href="reports.html" className="ai-icon" aria-expanded="false">
                            <img src={supportIcon} alt="Your Logo" />
                            <span className="nav-text">Support</span>
                        </Link>
                        </li>
                        <li onClick={() => d()}>
                            <div onClick={Logout} className="ai-icon cursor-pointer" aria-expanded="false">
                                <img src={DashboardIcon} alt="Your Logo" />
                                <span className="nav-text">Logout</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
export default Sidebar;