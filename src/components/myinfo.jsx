import React, {Component} from "react"
import Topbar from "./topbar";
import myscss from '../css/myinfo.module.scss'
import {Link} from "react-router-dom";
import ReactDocumentTitle from 'react-document-title'

class Myinfo extends Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    signout = () => {
        localStorage.removeItem("tscusernamelogin")
        setTimeout(() => {
            this.props.history.push("/login")
        })
    }

    render() {
        let login = JSON.parse(window.localStorage.tscusernamelogin)
        return (
            <ReactDocumentTitle title='账号管理'>
                <div className={myscss.myinfo}>
                    <Topbar/>

                    <div className={myscss.accountArea}>
                        <span>管理我的账号</span>
                        <div className={myscss.ca}>
                            <div className={myscss.catio}>当前登陆</div>
                            <div className={myscss.cainfo}>
                                <img src="/static/images/home/my.png" alt=""/>
                                <div className={myscss.user}>
                                    <span className={myscss.userspan}>{login[0].name}</span>
                                    <span className={myscss.usersp}>用户名: {login[0].user}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul className={myscss.ul}>
                        <li className={myscss.li}>
                            <Link to="/">
                                收货地址管理
                                <span>管理地址</span>
                            </Link>
                        </li>
                    </ul>
                    <ul className={myscss.ul}>
                        <li className={myscss.li}>
                            <Link to="/">
                                手机号码
                                <span>{login[0].phone}</span>
                            </Link>
                        </li>
                        <li className={myscss.li}>
                            <Link to="/changeway">
                                修改密码
                                <span>定期修改更安全</span>
                            </Link>
                        </li>
                    </ul>


                    <div onClick={this.signout} className={myscss.floor}><span>退出登录</span></div>
                </div>
            </ReactDocumentTitle>
        );
    }
}

export default Myinfo;