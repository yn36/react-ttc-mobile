import React, {Component} from "react"
import Topbar from "./topbar";
import logincss from "../css/login.module.scss";
import {Link} from "react-router-dom";
import ReactDocumentTitle from 'react-document-title'
import axios from 'axios'

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inptype: "password",
            a1: false,
            a2: false,
            a3: false,
            a4: false,
            a5: false,
            a6: false,
            yzmnb: '1234'
        };
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

    reg = () => {
        let name = this.refs.name
        let username = this.refs.user
        let phone = this.refs.phone
        let password = this.refs.password;
        let {a1, a2, a3, a4, a5} = this.state

        if (a1 && a2 && a3 && a4 && a5) {
            if (!this.refs.yidu.checked) {
                alert("请阅读并同意注册协议")
            } else {
                var obj = {
                    name: name.value,
                    username: username.value,
                    phone: phone.value,
                    password: password.value,
                    islogin: false
                }

                axios.get('http://127.0.0.1:1217/sele', {params: {name: obj}})
                    .then((res) => {
                        if (res.data.length >= 1) {
                            alert('用户名已存在请登陆')
                            return
                        } else {
                            axios.get('http://127.0.0.1:1217/reg', {params: {name: obj}})
                                .then((res) => {
                                    if (window.localStorage.tscusernamelogin) {
                                        var loginarr = []
                                    } else {
                                        loginarr = []
                                    }
                                    let loginobj = obj
                                    loginarr.push(loginobj)
                                    window.localStorage.tscusernamelogin = JSON.stringify(loginarr)
                                    alert('恭喜您！用户注册成功~~~')
                                    setTimeout(() => {
                                        window.history.go(-1);
                                    }, 1000);
                                })
                        }
                    })
                    .catch((res) => {
                        console.log(res)
                    })

            }
        } else if (!a1 && !a2 && !a3 && !a4) {
            alert("带*选择为必填")

        } else if (!a5) {
            alert('请输入正确的验证码')
        }
    }

    // 验证码
    yzm = () => {
        let phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
        let count = 60;
        let InterValObj1;
        let curCount1;
        let yzmbtn = this.refs.yzm;
        curCount1 = count;
        let phone = this.refs.phone.value
        if (!phoneReg.test(phone)) {
            alert("请输入正确的手机号码")
            return
        }
        yzmbtn.disabled = true;
        yzmbtn.innerHTML = `${curCount1}秒再获取`;
        InterValObj1 = setInterval(() => {
            if (curCount1 === 0) {
                clearInterval(InterValObj1);
                yzmbtn.disabled = false;
                yzmbtn.innerHTML = `重新发送`
            } else {
                curCount1--;
                yzmbtn.innerHTML = `${curCount1}秒再获取`
            }
        }, 1000)


        // // 验证码提示
        let checking = (Math.random() * 0xffff << 0).toString(10)
        this.setState({
            yzmnb: checking
        }, () => {
            setTimeout(() => {
                alert(checking)
                console.log(checking)
            }, 5000)
        })

    }

    yzmtext = () => {
        let {yzmnb} = this.state
        if (this.refs.yzmtext.value == yzmnb) {
            this.setState({
                a5: true
            })
        } else {
            this.setState({
                a5: false
            })
        }
    }

    user = () => {
        let user = this.refs.user
        if (!user.value) {
            user.nextElementSibling.innerHTML = "请输入用户名"
            user.nextElementSibling.style.display = "block"
            this.setState({
                a4: false
            })
        } else {
            user.nextElementSibling.style.display = "none"
            this.setState({
                a4: true
            })
        }
    }

    phone = () => {
        let phone = this.refs.phone
        let phoneReg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        if (!phoneReg.test(phone.value)) {
            phone.nextElementSibling.innerHTML = "请输入正确的手机号码"
            phone.nextElementSibling.style.display = "block"
            this.setState({
                a1: false
            })
        } else {
            phone.nextElementSibling.style.display = "none"
            this.setState({
                a1: true
            })
        }
    }

    password = () => {
        let password = this.refs.password;
        let passReg = /^[a-zA-Z].{5,17}$/;
        if (!passReg.test(password.value)) {
            // console.dir(password)
            password.nextElementSibling.innerHTML = "请输入6-18为数的密码包含字母、数字"
            password.nextElementSibling.style.display = "block"
            this.setState({
                a2: false
            })
        } else {
            password.nextElementSibling.style.display = "none"
            this.setState({
                a2: true
            })
        }
    }

    password2 = () => {
        let password = this.refs.password;
        let password2 = this.refs.password2;
        if (password.value !== password2.value) {
            password2.nextElementSibling.innerHTML = "请保证两次密码一致"
            password2.nextElementSibling.style.display = "block"
            this.setState({
                a3: false
            })
        } else {
            password2.nextElementSibling.style.display = "none"
            this.setState({
                a3: true
            })
        }
    }


    render() {
        return (
            <ReactDocumentTitle title='注册-淘商城注册'>
                <div className={logincss.login}>
                    <Topbar/>
                    <div className={logincss.box}>
                        <div>
                            <div className={logincss.inp}>
                                <div className={logincss.inpitem}>
                                    <p className={logincss.inpitemp}>
                                        昵称
                                    </p>
                                    <input ref='name' type="text" placeholder='请输入昵称'/>
                                </div>
                            </div>
                            <div className={logincss.inp}>
                                <div className={logincss.inpitem}>
                                    <p className={logincss.inpitemp}>
                                        <i>*</i> 用户名:
                                    </p>
                                    <input onBlur={this.user} ref='user' type="text" placeholder='请输入用户名'/>
                                    <span className={logincss.error}>错误</span>
                                </div>
                            </div>
                            <div className={logincss.inp}>
                                <div className={logincss.inpitem}>
                                    <p className={logincss.inpitemp}>
                                        <i>*</i> 手机号码:
                                    </p>
                                    <input onBlur={this.phone}
                                           ref='phone'
                                           type='text'
                                           placeholder='请输入手机号码'
                                           maxLength={11}
                                    />
                                    <span className={logincss.error}></span>
                                </div>
                            </div>
                            <div className={logincss.inp}>
                                <div className={logincss.inpitem}>
                                    <p className={logincss.inpitemp}>
                                        验证码:
                                    </p>
                                    <input ref='yzmtext'
                                           type='text'
                                           placeholder='请输入验证码'
                                           onBlur={this.yzmtext}
                                    />
                                    <button ref="yzm" onClick={this.yzm} className={logincss.yzm} type='button'
                                    >获取验证码
                                    </button>
                                    <span className={logincss.error}></span>
                                </div>
                            </div>
                            <div className={logincss.inp}>
                                <div className={logincss.inpitem}>
                                    <p className={logincss.inpitemp}>
                                        <i>*</i> 密码:
                                    </p>
                                    <input onBlur={this.password}
                                           ref='password'
                                           type={this.state.inptype}
                                           placeholder='请输入密码'
                                    />
                                    <span className={logincss.error}></span>
                                    <i ref='ck' onClick={this.ck} className={logincss.ck}></i>
                                </div>
                            </div>
                            <div className={logincss.inp}>
                                <div className={logincss.inpitem}>
                                    <p className={logincss.inpitemp}>
                                        <i>*</i> 确认密码:
                                    </p>
                                    <input onBlur={this.password2}
                                           ref='password2'
                                           type='password'
                                           placeholder='请再次确认密码'
                                    />
                                    <span className={logincss.error}></span>
                                </div>
                            </div>
                        </div>


                        <div className={logincss.yuedu}>
                            <label form='yidu'>
                                <input ref='yidu' id='yidu' type='checkbox'/>我以阅读并同意
                            </label>
                            <span>
                            <a href='javaseript:(vid);'>淘商城注册协议</a>
                        </span>
                        </div>
                        <button onClick={this.reg} ref="reg" className={logincss.register}>注 册</button>
                        <div className={logincss.wenhao}>
                            已有账号？
                            <Link to='/login'>登陆</Link>
                        </div>
                    </div>
                </div>
            </ReactDocumentTitle>
        );
    }
}

export default Register;