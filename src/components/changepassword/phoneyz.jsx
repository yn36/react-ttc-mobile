import React, {Component} from "react"
import change from '../../css/changeway.module.scss'
import Topbar from "../topbar";
import axios from 'axios'
import {Link} from "react-router-dom";

class Phoneyz extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inptype: 'password',
            yzmnb: '1234'
        };
    }

    componentDidMount() {
        this.refs.submit.disabled = true
        let nub = JSON.parse(window.localStorage.tscusernamelogin)
        this.refs.spanphone.innerHTML = (nub[0].phone).replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3")
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

    dis = () => {
        let phoneyzm = this.refs.phoneyzm.value
        let inppwd = this.refs.inppwd.value
        if (phoneyzm === '' || inppwd === '' || inppwd.length < 6) {
            this.refs.submit.disabled = true
        } else {
            this.refs.submit.disabled = false
        }
    }

    yzmbtn = () => {
        let count = 60;
        let InterValObj1;
        let curCount1;
        let yzmbtn = this.refs.yzmbtn;
        curCount1 = count;
        yzmbtn.disabled = true;
        yzmbtn.innerHTML = `${curCount1}秒再获取`;
        InterValObj1 = setInterval(() => {
            if (curCount1 === 0) {
                clearInterval(InterValObj1);
                yzmbtn.disabled = false;
                yzmbtn.innerHTML = `重新获取`
            } else {
                curCount1--;
                yzmbtn.innerHTML = `${curCount1}秒再获取`
            }
        }, 1000)


        // // 验证码提示
        let abc = (Math.random() * 0xffff << 0).toString(10)
        this.setState({
            yzmnb: abc
        }, () => {
            setTimeout(() => {
                alert(abc)
                console.log(abc)
            }, 5000)
        })

    }

    psubmit = () => {
        let {yzmnb} = this.state
        let phoneyzm = this.refs.phoneyzm.value
        let inppwd = this.refs.inppwd.value
        if (phoneyzm === '') {
            alert('请输入短信验证码')
            return;
        } else if (phoneyzm != yzmnb) {
            alert('验证码错误')
            return
        }
        let username = JSON.parse(window.localStorage.tscusernamelogin)
        // console.log(username[0].user)
        let obj = {
            newuser: username[0].user,
            password: inppwd
        }
        axios.get('http://127.0.0.1:1217/changepassword', {params: {name: obj}})
            .then((res) => {
                // console.log(res)
                alert('修改成功')
                setTimeout(() => {
                    this.props.history.push("/home/about")
                }, 1000)
            })
    }

    render() {
        return (
            <div className={change.box}>
                <Topbar/>
                <p className={change.topp}>请完成一下操作</p>
                <div className={change.modifylists}>
                    <div className={change.phonemodifylists}>
                        <span>请输入<span ref='spanphone'></span>收到的短信验证码</span>
                        <div className={change.phone}>
                            <input onChange={this.dis} ref='phoneyzm' className={change.phoneyzm} type='number'
                                   placeholder='请输入短信验证码'/>
                            <button ref='yzmbtn' onClick={this.yzmbtn} className={change.yzmbtn} type='button'>获取验证码
                            </button>
                            <div className={change.inpdiv}>
                                <input onChange={this.dis} ref='inppwd' className={change.inppwd}
                                       placeholder='6-20位数字／字母／字符组合'
                                       type={this.state.inptype}/>
                                <i ref='ck' onClick={this.ck} className={change.inppwdck}></i>
                            </div>
                            <div className={change.butsubmit}>
                                <button ref='submit' onClick={this.psubmit} className={change.submit}>确定</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={change.floor}>
                    <Link to='/changeway'>
                        换其他方式认证
                    </Link>
                </div>
            </div>
        );
    }
}

export default Phoneyz;