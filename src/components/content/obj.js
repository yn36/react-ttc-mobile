import React, {Component} from "react"
import Topbar from "../topbar";
import {Carousel} from 'antd-mobile';

import content from '../../css/content/content.module.scss'

class Content extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            imgHeight: 375,
        };
    }

    render() {
        return (
            <div className={content.contentbox}>
                <div className={content.topbar}>
                    <Topbar/>
                </div>
                <div>
                    <Carousel
                        autoplay={false}
                    >
                        {this.state.data.map(val => {
                            return (

                                <img key={val}
                                     src={`/static/images/content/yijia/yijia${val}.jpg`}
                                     alt=""
                                     style={{width: '100%', verticalAlign: 'top'}}
                                />

                            )
                        })}
                    </Carousel>
                </div>
            </div>
        );
    }
}

export default Content;