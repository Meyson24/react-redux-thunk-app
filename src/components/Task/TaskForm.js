import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import {Button} from "react-bootstrap";

const initialValues = {
    title: '',
    text: ''
};

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required('Title is required'),

});

export const TaskForm = ({task='', handleSubmit, buttonName, getTextOfEditor}) => {
    initialValues.title = task.title;
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(data) => handleSubmit(data)}
            render={({ errors, status, touched }) => (
                <Form>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <Field name="title" type="text" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')} />
                        <ErrorMessage name="title" component="div" className="invalid-feedback" />
                    </div>
                    <RichTextEditor taskDescription={task.description} getTextOfEditor={getTextOfEditor}/>
                    <Button style={{marginRight: '20px'}} type={onsubmit} variant="primary">
                        {buttonName} Task
                    </Button>
                </Form>
            )}
        />
    )
};