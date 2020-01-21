import React, {Component} from "react"
import axios from 'axios'

import lcss from '../../css/home.module.scss'


class Lovelife extends Component {
    constructor(props) {
        super(props);

        this.state = {
            floorl: [],
            floorul: []
        };

    }

    componentWillMount() {
        let url = '/static/data/lovelife.json'
        axios.get(url)
            .then(res => {
                let floorl = res.data.goodl
                let floorul = res.data.floorul
                this.setState({
                    floorl,
                    floorul
                })
            })
    }

    render() {
        return (
            <div className={lcss.floorbox}>
                <div className={lcss.floor}>
                    <div className={lcss.floortitle}>
                    <span>
                        <img src='/static/images/lovelife/left.jpg' alt=''/>
                    </span>
                    </div>
                    <div className={lcss.section}>
                        {
                            this.state.floorl.map(item => {
                                return (
                                    <div key={item.id} className={lcss.goodl}>
                                        <div className={lcss.goodtext}>
                                            <h3>{item.title}</h3>
                                            <p>{item.title2}</p>
                                        </div>
                                        <div className={lcss.goodtextimg}>
                                            <span>
                                                <img src={item.url} alt=""/>
                                            </span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <ul className={lcss.floorul}>
                            {
                                this.state.floorul.map(item => {
                                    return (
                                        <li key={item.id}>
                                            <span>
                                                <h3>{item.title}</h3>
                                                <p>{item.title2}</p>
                                            </span>
                                            <a href="hello">
                                                <img src={item.url} alt=""/>
                                            </a>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Lovelife;