import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { FormGroup, Col, Label, Input, Row, Button } from "reactstrap";
import DepartemenValidation from "../validations/DepartemenValidation";
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
      DepartemenID: state.Departemen.getDepartemenDetail.DepartemenID,
      NamaDepartemen: state.Departemen.getDepartemenDetail.NamaDepartemen,
      KeteranganDepartemen: state.Departemen.getDepartemenDetail.KeteranganDepartemen,
    },
  };
};

class FormDepartemenComponent extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
   
        <FormGroup row>
          <Col md={2}>
            <FormGroup>
              <Field
                type="text"
                name="DepartemenID"
                disabled
                component={renderField}
                label="Departemen ID :"
              />
            </FormGroup>
          </Col>

          <Col md={4}>
            <FormGroup>
              <Field
                type="text"
                name="NamaDepartemen"
                component={renderField}
                label="Nama Departemen :"
              />
            </FormGroup>
          </Col>

          <Col md={4}>
            <FormGroup>
              <Field
                type="text"
                name="KeteranganDepartemen"
                component={renderField}
                label="Detail Departemen:"
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

FormDepartemenComponent = reduxForm({
  form: "formCreateDepartemen",
  validate: DepartemenValidation,
  enableReinitialize: true,
})(FormDepartemenComponent);
export default connect(mapStateToProps, null)(FormDepartemenComponent);
