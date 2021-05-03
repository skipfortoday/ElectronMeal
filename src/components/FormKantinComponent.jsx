import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { FormGroup, Col, Label, Input, Row, Button } from "reactstrap";
import KantinValidation from "../validations/KantinValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";


const renderField = ({
  input,
  type,
  placeholder,
  label,
  disabled,
  readOnly,
  meta: { touched, error, warning },
}) => (
  <Row>
    <Col md="12">
      <Label htmlFor="{input}" className="col-form-label">
        {label}
      </Label>
    </Col>
    <Col md="12">
      <Input
        {...input}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        
      ></Input>
      {touched &&
        ((error && <p style={{ color: "brown" }}>{error}</p>) ||
          (warning && <p style={{ color: "brown" }}>{warning}</p>))}
    </Col>
  </Row>
);

const mapStateToProps = (state) => {
  return {
    initialValues: {
      SNMesin: state.Kantin.getKantinDetail.SNMesin,
      NamaKantin: state.Kantin.getKantinDetail.NamaKantin,
      KeteranganKantin: state.Kantin.getKantinDetail.KeteranganKantin,
    },
  };
};

class FormKantinComponent extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
   
        <FormGroup row>
          <Col md={3}>
            <FormGroup>
              <Field
                readOnly={this.props.dis}
                type="text"
                name="SNMesin"
                component={renderField}
                label="SN Mesin:"
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="text"
                name="NamaKantin"
                component={renderField}
                label="Nama Kantin :"
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="text"
                name="KeteranganKantin"
                component={renderField}
                label="Detail Kantin:"
              />
            </FormGroup>
          </Col>

          <Col md={1}>
            <FormGroup>
              <Label></Label>
            <Button
                color="dark"
                type="submit"
                disabled={this.props.submitting}
              >
                <FontAwesomeIcon icon={faSave} /> SIMPAN
              </Button>
            </FormGroup>
          </Col>
        </FormGroup>
      </form>
    );
  }
}

FormKantinComponent = reduxForm({
  form: "formCreateKantin",
  validate: KantinValidation,
  enableReinitialize: true,
})(FormKantinComponent);
export default connect(mapStateToProps, null)(FormKantinComponent);
