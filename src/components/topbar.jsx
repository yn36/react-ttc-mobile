import React, {Component} from "react"
import topbarcss from '../css/home.module.scss'
import {Icon} from 'antd-mobile';
import {Link, withRouter} from "react-router-dom";

class Topbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            selected: '',
            win: window.location.href.split("/")[5]
        };
    }

    componentDidMount() {

    }

    sort = () => {
        if (window.location.hash === '#/login') {
            if (window.localStorage.tscusernamelogin) {
                window.history.go(-1);
            } else {
                this.props.history.push("/")
            }
        } else {
            window.history.go(-1);
        }
    }

    useQuery() {
        return new URLSearchParams(this.props.search);
    }

    abc = () => {
        let query = this.useQuery();
        let list = "/" + [window.location.href.split("/")[4]]
        if (list === '/list') {
            return (
                <Link className={topbarcss.topconbox} to='/sort'>
                    <span className={topbarcss.header_searchico}></span>
                    <input type="search" className={topbarcss.header_search} placeholder={query.get("title")}/>
                </Link>
            )
        } else if (window.location.hash === '#/shoppingcar') {
            return (
                <div style={{textAlign: "center", width: "100%", height: "100%"}}>
                    <span style={{lineHeight: "40px"}}>购物车</span>
                </div>
            )
        } else if (window.location.hash === '#/home/sort') {
            return (
                <Link className={topbarcss.topconbox} to='/sort'>
                    <span className={topbarcss.header_searchico}></span>
                    <input type="search" className={topbarcss.header_search} placeholder='搜索'/>
                </Link>
            )
        } else if (window.location.hash === '#/login') {
            return (
                <div style={{textAlign: "center", width: "100%", height: "100%"}}>
                    <span style={{lineHeight: "40px"}}>登陆</span>
                </div>
            )
        } else if (window.location.hash === '#/register') {
            return (
                <div style={{textAlign: "center", width: "100%", height: "100%"}}>
                    <span style={{lineHeight: "40px"}}>注册</span>
                </div>
            )
        } else if (window.location.hash === '#/home/about') {
            return (
                <div style={{textAlign: "center", width: "100%", height: "100%"}}>
                    <span style={{lineHeight: "40px"}}>我的淘商城</span>
                </div>
            )
        } else if (window.location.hash === '#/myinfo') {
            return (
                <div style={{textAlign: "center", width: "100%", height: "100%"}}>
                    <span style={{lineHeight: "40px"}}>账号管理</span>
                </div>
            )
        } else if (window.location.hash === '#/resulto') {
            return (
                <div style={{textAlign: "center", width: "100%", height: "100%"}}>
                    <span style={{lineHeight: "40px"}}>购买成功</span>
                </div>
            )
        } else if (window.location.hash.split('/')[1] === 'content') {
            let title = this.props.title
            if (title) {
                return (
                    <div className={topbarcss.topbdiv}>
                        <span className={topbarcss.titlespan}> {title} </span>
                    </div>
                )
            }
        }else if(window.location.hash === '#/changeway'){
            return (
                <div style={{textAlign: "center", width: "100%", height: "100%"}}>
                    <span style={{lineHeight: "40px"}}>选择方式</span>
                </div>
            )
        }else if(window.location.hash === '#/phoneyz'){
            return (
                <div style={{textAlign: "center", width: "100%", height: "100%"}}>
                    <span style={{lineHeight: "40px"}}>修改密码</span>
                </div>
            )
        }
    }

    islogins = () => {
        if (window.localStorage.tscusernamelogin) {
            this.props.history.push("/home/about")
        } else {
            this.props.history.push("/login")
        }
    }

    onSelect = (opt) => {
        // console.log(opt.props.value);
        this.setState({
            visible: false,
            selected: opt.props.value,
        });
    };
    handleVisibleChange = (visible) => {
        this.setState({
            visible,
        });
    };

    onrico = () => {
        if (this.refs.rico.style.right === "10px") {
            this.refs.rico.style.right = "-125px"
            this.refs.zzc.style.display = "none"
        } else {
            this.refs.rico.style.right = "10px"
            this.refs.rico.style.display = "block"
            this.refs.zzc.style.display = "block"
        }
    }

    render() {
        return (
            <header>
                <div ref='topsearch' className={topbarcss.topbar}>
                    <span onClick={this.sort} className={topbarcss.header_sort}>
                        <Icon color='#707070' size='lg' type='left'/>
                    </span>

                    {this.abc()}

                    {/* 右边菜单拦 */}
                    <span onClick={this.onrico} className={topbarcss.header_login}>
                         <Icon type="ellipsis"/>
                    </span>
                    <div className={topbarcss.rrico}>
                        <div ref="zzc" className={topbarcss.zzc} onClick={this.onrico}></div>
                        <div ref="rico" className={topbarcss.rico}>
                            <ul>
                                <li>
                                    <Link to='/'>
                                        首页
                                    </Link>
                                </li>
                                {
                                    window.location.hash !== '#/home/about' ? (
                                        <li>
                                    <span onClick={this.islogins}>
                                    我的
                                    </span>
                                        </li>
                                    ) : null

                                }
                                <li>
                                    <Link to='/shoppingcar'>
                                        购物车
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/home/sort'>
                                        分类
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default withRouter(Topbar);