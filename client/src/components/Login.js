import React, { useContext } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Container, Jumbotron, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'

const Login = props => {

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
           username: Yup.string()
           .required('Required'),
           password: Yup.string()
           .required('Required'),
        }),
        onSubmit: values => {
            axios.post('/api/login', values)
            .then(res => {
                localStorage.setItem('token', res.data.payload)
                props.history.push('/bubbles')
            })
        },
    })

    return (
        <Container>
            <div className='spacer'></div>
            <Jumbotron>
                <div className='center'>
                    <h1>Log In</h1>
                </div>
                <Form onSubmit={formik.handleSubmit}>
                    <Row>
                        <Col xs='6'>
                            <FormGroup>
                                <Label for='username'>Username</Label>
                                <Input
                                    id='username'
                                    name='username'
                                    type='text'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.username}
                                    className={formik.touched.username && !formik.errors.username ? 'form-control is-valid' : 'form-control is-invalid'}
                                />
                                {formik.touched.username && formik.errors.username ? <div className='invalid-feedback'>{formik.errors.username}</div> : null}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs='6'>
                            <FormGroup>
                                <Label for='password'>Password</Label>
                                <Input
                                    id='password'
                                    name='password'
                                    type='password'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    className={formik.touched.password && !formik.errors.password ? 'form-control is-valid' : 'form-control is-invalid'}
                                />
                                {formik.touched.password && formik.errors.password ? <div className='invalid-feedback'>{formik.errors.password}</div> : null}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs='6'>
                        <Label for='submit'>&nbsp;</Label>
                            <Button type='submit' style={{width: '100%'}} className='btn-primary'>Submit</Button>
                        </Col>
                    </Row>
                </Form>
            </Jumbotron>
        </Container>
    )
}

export default Login