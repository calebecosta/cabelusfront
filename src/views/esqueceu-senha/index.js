import React, { useState, useEffect, Suspense } from "react";
import {
  Row,
  Card,
  CardTitle,
  Label,
  FormGroup,
  Button,
  Alert,
} from "reactstrap";
import { NavLink } from "react-router-dom";

import { Formik, Form, Field } from "formik";
import { NotificationManager } from "../../components/common/react-notifications";

import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import UserLayout from "../../layout/UserLayout";

import api from "../../services/api";

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = "Por favor, preencha o campo E-mail";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "E-mail no inválido";
  }
  return error;
};

const EsqueceuSenha = () => {
  const [email] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorApi, setErrorApi] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {});

  const onSubmit = async (values) => {
    if (!loading) {
      if (values.email !== "") {
        setShowError(false);
        setShowSuccess(false);
        try {
          const response = await api.post(`/esqueci_senha`, {
            email: values.email,
          });
          const { error } = response.data;
          if (error === undefined) {
            setShowSuccess(true);
            setShowError(false);
          } else {
            setShowSuccess(false);
            setErrorApi(error);
            setShowError(true);
          }
        } catch (error) {
          setShowSuccess(false);
          setErrorApi(error);
          setShowError(true);
        }
      }
    }
  };

  const initialValues = { email };

  return (
    <UserLayout>
      <Suspense>
        <Row className="h-100">
          <Colxx xxs="12" md="11" className="mx-auto my-auto">
            <Card className="auth-card">
              <div className="position-relative image-side ">
                <p className="text-white h2">Perdeu sua senha?</p>
                <p className="white mb-0">
                  Tudo bem, problemas acontecem :)
                  <br />
                  Você receberá por email um link para escolher a uma nova.
                </p>
              </div>
              <div className="form-side">
                <NavLink to="/" className="white">
                  {/* <span className="logo-single" /> */}
                </NavLink>

                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                  {({ errors, touched }) => (
                    <Form className="av-tooltip tooltip-label-bottom">
                      {showSuccess && (
                        <Alert color="success">
                          Email enviado com sucesso!
                        </Alert>
                      )}
                      {showError && <Alert color="danger">{errorApi}</Alert>}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="user.email" />
                        </Label>
                        <Field
                          className="form-control"
                          name="email"
                          validate={validateEmail}
                        />
                        {errors.email && touched.email && (
                          <div className="invalid-feedback d-block">
                            {errors.email}
                          </div>
                        )}
                      </FormGroup>
                      <div className="d-flex justify-content-between align-items-center">
                        <Button
                          color="primary"
                          className={`btn-shadow btn-multiple-state ${
                            loading ? "show-spinner" : ""
                          }`}
                          size="lg"
                        >
                          <span className="spinner d-inline-block">
                            <span className="bounce1" />
                            <span className="bounce2" />
                            <span className="bounce3" />
                          </span>
                          <span className="label">
                            <IntlMessages id="user.reset-password-button" />
                          </span>
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </Card>
          </Colxx>
        </Row>
      </Suspense>
    </UserLayout>
  );
};

export default EsqueceuSenha;
