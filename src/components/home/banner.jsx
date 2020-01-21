import React, {Component} from "react"
import {Carousel} from 'antd-mobile';
import bannercss from '../../css/home.module.scss'

class Banner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: ['1', '2', '3', '4', '5', '6', '7', '8'],
            imgHeight: 167,
        }
    }

    render() {
        return (
            <div className={bannercss.jsbannerbox}>
                <div className={bannercss.jsbanner}>
                    <Carousel
                        autoplay={true}
                        infinite
                    >
                        {this.state.data.map(val => (

                            <img key={val}
                                src={`/static/images/banner/banner${val}.jpg`}
                                alt=""
                                style={{width: '100%', verticalAlign: 'top'}}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({imgHeight: 'auto'});
                                }}
                            />
                        ))}
                    </Carousel>
                </div>
            </div>
        );

    }
}

export default Banner;