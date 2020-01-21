import React, {Component} from "react"
import sortcss from '../../../css/sort.module.scss'
import Xxk from "./xxk";
import Topbar from "../../topbar";
import ReactDocumentTitle from 'react-document-title'

class Sort extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <ReactDocumentTitle title='分类-淘商城产品分类'>
                <div className={sortcss.sortnav}>
                    <Topbar/>
                    <Xxk/>
                </div>
            </ReactDocumentTitle>
        );
    }
}

export default Sort;