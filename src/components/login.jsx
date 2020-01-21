import React, {Component} from "react"
import Topbar from "./topbar";
import {Link} from "react-router-dom";
import ReactDocumentTitle from 'react-document-title'
import axios from 'axios'

import logincss from '../css/login.module.scss'

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inptype: "password"
        };

        if (window.localStorage.tscusernamelogin) {
            setTimeout(() => {
                this.props.history.push("/shoppingcar")
            }, 1000)
        }
    }

    login = () => {
        let text = this.refs.text
        let password = this.refs.password
        let isHad = false;
        let userobj = {}
        let obj = {
            username: text.value,
            password: password.value,
        }


        // 登陆成功存本地
        if (window.localStorage.tscusernamelogin) {
            var loginarr = []
        } else {
            loginarr = []
        }


        if (text.value && password.value) {
            axios.get('http://127.0.0.1:1217/sele', {params: {name: obj}})
                .then((res) => {
                    if (res.data.length >= 1) {
                        if (text.value === res.data[0].user || text.value === res.data[0].phone) {
                            isHad = true
                            userobj = res.data[0]
                        }
                    }

                    if (isHad) {
                        if (password.value === userobj.password) {
                            let loginobj = {
                                islogin: true,
                                name: userobj.name,
                                user: userobj.user,
                                phone: userobj.phone
                            }

                            loginarr.push(loginobj)
                            window.localStorage.tscusernamelogin = JSON.stringify(loginarr)
                            alert("登陆成功!")
                            window.history.go(-1);
                            // console.log(this.props)
                        } else {
                            alert("密码错误");
                        }
                    } else {
                        alert("账号不存在或输入错误")
                    }
                })
        } else {
            return
        }
    }

    componentDidMount() {

    }

    ionec = () => {
        this.refs.text.value = ''
        this.refs.login.style.background = `linear-gradient(90deg, #fab3b3, #ffbcb3 73%, #ffcaba)`
    }
    itoc = () => {
        this.refs.password.value = ''
        this.refs.login.style.background = `linear-gradient(90deg, #fab3b3, #ffbcb3 73%, #ffcaba)`
    }
    itof = () => {
        this.refs.ito.style.display = 'block'
    }
    itob = (e) => {
        e.stopPropagation()
        if (window.location.hash === '#/login') {
            setTimeout(() => {
                this.refs.ito.style.display = 'none'
            }, 100)
        }
        return false;
    }
    ionef = () => {
        this.refs.ione.style.display = 'block'
    }
    ioneb = (e) => {
        e.stopPropagation()
        if (window.location.hash === '#/login') {
            setTimeout(() => {
                this.refs.ione.style.display = 'none'
            }, 100)
        }
        return false;
    }

    ck = () => {
        if (this.state.inptype === "password") {
            this.setState({
                inptype: "text"
            })
            this.refs.ck.style.background = `url(/static/images/home/password.jpg)`;
            this.refs.ck.style.backgroundSize = `100% auto`
        } else {
            this.setState({
                inptype: "password"
            })
            this.refs.ck.style.background = `url(/static/images/home/text.jpg)`;
            this.refs.ck.style.backgroundSize = `100% auto`
        }
    }

    isvalue = () => {
        if (window.location.hash === '#/login') {
            if (this.refs.text.value !== "" && this.refs.password.value !== "") {
                this.refs.login.style.background = `linear-gradient(90deg,#f10000,#ff2000 73%,#ff4f18)`
            } else {
                this.refs.login.style.background = `linear-gradient(90deg, #fab3b3, #ffbcb3 73%, #ffcaba)`
            }
        }
    }


    render() {
        return (
            <ReactDocumentTitle title="登陆-淘商城登陆页">
                <div className={logincss.login}>
                    <Topbar/>
                    <div className={logincss.box}>
                        <div className={logincss.input}>
                            <input ref='text'
                                   type='text'
                                   placeholder='用户名/邮箱/账号'
                                   onFocus={this.ionef}
                                   onBlur={this.ioneb}
                                   onInput={this.isvalue}
                            />
                            <i ref='ione' onClick={this.ionec} className={logincss.clear}></i>
                        </div>
                        <div className={logincss.input}>
                            <input ref='password'
                                   type={this.state.inptype}
                                   placeholder='密码'
                                   onFocus={this.itof}
                                   onBlur={this.itob}
                                   onInput={this.isvalue}
                            />
                            <i ref='ito' onClick={this.itoc} className={logincss.clear}></i>
                            <i ref='ck' onClick={this.ck} className={logincss.ck}></i>
                        </div>

                        <button onClick={this.login} ref="login" className={logincss.loginbtn}>登 陆</button>
                        <div className={logincss.wenhao}>
                            还没账号？
                            <Link to='/register'>快 速 注 册</Link>
                        </div>
                    </div>
                </div>
            </ReactDocumentTitle>
        );
    }
}

export default Login;