import React, {Component} from "react"
import Topbar from "../topbar";
import change from '../../css/changeway.module.scss'
import {Link} from "react-router-dom";

class Changeway extends Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    render() {
        return (
            <div className={change.box}>
                <Topbar/>
                <p className={change.topp}>请选择合适的认证方式</p>
                <div className={change.modifylists}>
                    <ul>
                        <li>
                            <Link to='/phoneyz'>使用手机验证</Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Changeway;