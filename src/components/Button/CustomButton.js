import React from 'react'
import {Button, ButtonToolbar, Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";

const CustomButton = ({label, secondLabel, itemId, isLoading, type, style, statusOfItem, handleSubmit}) => {
    return (
        <>
            <Button style={style}
                    variant={type}
                    onClick={() => handleSubmit(itemId)}
                    disabled={!!isLoading}>
                {isLoading ?
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    :
                    ""
                }
                {statusOfItem === 'in progress'
                    ?
                    secondLabel
                    :
                    label
                }
            </Button>
        </>


    )
};

CustomButton.defaultProps = {
    itemId: "",
    secondLabel: "",
    type: "primary",
    style: {marginRight: '20px'},
    statusOfItem: false,
    isLoading: false,
    handleSubmit: ()=>{},
};

export default CustomButton