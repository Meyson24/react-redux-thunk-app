import {Button, Collapse} from "react-bootstrap";
import React from "react";

class CollapseBlock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {open: false};

    }
    setOpen(state) {
        this.setState({open: !state})
    }
    render() {
        // const {open} = this.state;
        return (
            <>
                <Button
                    onClick={() =>  this.setOpen(this.state.open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={this.state.open}
                >
                    click
                </Button>
                <Collapse in={this.state.open}>
                    <div id="example-collapse-text">
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                        terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                        labore wes anderson cred nesciunt sapiente ea proident.
                    </div>
                </Collapse>
            </>
        );
    }
}

CollapseBlock.propTypes = {};

export default CollapseBlock;
// const CollapseBlock = () => {
//     const open = false;
//
//     const setOpen = (open) => {
//         open = !open;
//         console.log("open", open)
//     };
//
//     return (
//         <>
//             <Button
//                 onClick={()  => setOpen(open)}
//                 aria-controls="example-collapse-text"
//                 aria-expanded={open}
//             >
//                 click
//             </Button>
//             <Collapse in={open}>
//                 <div id="example-collapse-text">
//                     Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
//                     terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
//                     labore wes anderson cred nesciunt sapiente ea proident.
//                 </div>
//             </Collapse>
//         </>
//     )
// };
//
// export default CollapseBlock
