import React, {Component} from "react"
import Itema from './item'

class Recommend extends Component {
    render() {
        return (
            <div>
                <span style={{display: "block", width: "100%"}}>
                    <img style={{width: "100%"}} src="/static/images/recommend/recommend.png" alt=""/>
                </span>
                <Itema/>
            </div>
        );
    }
}

export default Recommend;