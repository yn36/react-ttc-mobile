import React, {Component} from "react"
import ggcsscc from "../../css/content/ggcs.module.scss";

class Shbz extends Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    render() {
        return (
            <div className={ggcsscc.ggcs}>
                <div className={ggcsscc.packto}>
                    <div className={ggcsscc.mod_tit_line}>
                        <h3>项目声明</h3>
                    </div>
                    本项目为开源项目
                </div>
            </div>
        );
    }
}

export default Shbz;