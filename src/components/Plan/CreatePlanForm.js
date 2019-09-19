import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

const initialValues = {
    title: '',
    description: ''
};

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required('Title is required')

});

export const CreatePlanForm = ({handleSubmit, getTextOfEditor}) => (
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
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <Field name="description" type="text" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} />
                    <ErrorMessage name="description" component="div" className="invalid-feedback" />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary mr-2">Create Plan</button>
                </div>
            </Form>
        )}
    />
);