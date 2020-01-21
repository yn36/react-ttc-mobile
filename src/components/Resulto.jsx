import React, {Component} from "react"
import {Result} from 'antd-mobile';
import Topbar from "./topbar";
import ReactDocumentTitle from 'react-document-title'

const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt=""/>;

class Resulto extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <ReactDocumentTitle title='下单'>
                <div>
                    <Topbar/>

                    <Result
                        img={myImg('https://gw.alipayobjects.com/zos/rmsportal/HWuSTipkjJRfTWekgTUG.svg')}
                        title="等待处理"
                        message="已提交申请，等待银行处理"
                    />
                </div>
            </ReactDocumentTitle>
        );
    }
}

export default Resulto;