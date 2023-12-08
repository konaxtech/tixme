import React from "react";
import DashboardIcon from '../../../common/icon/dashboardicon.svg';
import LocationsIcon from '../../../common/icon/locations.svg';
import Locationstart from '../../../common/icon/locationstart.svg';
import PersonIcon from '../../../common/icon/person 1.svg';
import WhitestarBtn from '../../../component/Whitestarbtn';
import { Link } from "react-router-dom";
import { organizer_url, app_url, customer_url } from '../../../common/Helpers';
const Header = () => {
    return (
        <>
            <div className="header">
                <div className="header-content">
                    <nav className="navbar navbar-expand">
                        <div className="collapse navbar-collapse justify-content-between">
                            <div className="header-left">

                            </div>
                            <ul className="navbar-nav header-right">
                                <li className="nav-item dropdown notification_dropdown">
                                    <Link to={app_url}>
                                        <WhitestarBtn title={'Website'} />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}
export default Header;