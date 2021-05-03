import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { FormGroup, Col, Label, Input, Row, Button} from "reactstrap";
import UserValidation from "../validations/UserValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import Select from 'react-select'

const renderField = ({
  input,
  type,
  placeholder,
  label,
  disabled,
  readOnly,
  meta: {  touched, error, warning },
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
      >
        <option value ="">-</option>
        <option value ="false">Reguler</option>
        <option value = "true">PackMeal</option>
      </Input>

      {touched &&
        ((error && <p style={{ color: "brown" }}>{error}</p>) ||
          (warning && <p style={{ color: "brown" }}>{warning}</p>))}
    </Col>
  </Row>
);

const renderField2 = ({
  input,
  name,
  id,
  type,
  placeholder,
  label,
  disabled,
  options,
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
      
      <Select
        {...Input}
        id={id} 
        name={name} 
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        options={options}
        value={input.value}
        onChange={(value) => input.onChange(value)}
         //onBlur={() => input.onBlur()}
      />
      {touched &&
        ((error && <p style={{ color: "brown" }}>{error}</p>) ||
          (warning && <p style={{ color: "brown" }}>{warning}</p>))}
    </Col>
  </Row>
);

const mapStateToProps = (state) => {
  return {
    getOptDepartemen: state.Opt.getOptDepartemen,
    getOptKantor : state.Opt.getOptKantor,
    initialValues : {
      PIN       : state.users.getUserDetail.PIN,
      NIP          : state.users.getUserDetail.NIP, 
      Nama          : state.users.getUserDetail.Nama,
      Jabatan        : state.users.getUserDetail.Jabatan,
      Departemen       : {value : state.users.getUserDetail.Departemen, label: state.users.getUserDetail.NamaDepartemen},
      Kantor    : {value : state.users.getUserDetail.Kantor, label: state.users.getUserDetail.NamaKantor},   
      Status        : state.users.getUserDetail.Status,
      PackMeal        :   state.users.getUserDetail.PackMeal,
    }
  };
};

class FormComponent extends Component {
  render() {
    return (
     
      <form onSubmit={this.props.handleSubmit}>
        <FormGroup row>
          <Col md={3}>
            <FormGroup>
              <Field
                type="text"
                name="PIN"
                readOnly={this.props.edit}
                component={renderField}
                label="PIN  :"
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="text"
                name="NIP"
                component={renderField}
                label="NIP :"
              />
            </FormGroup>
          </Col>


          <Col md={6}>
            <FormGroup>
              <Field
                type="text"
                name="Nama"
                component={renderField}
                label="Nama  :"
              />
            </FormGroup>
          </Col>

          
          <Col md={3}>
            <FormGroup>
              <Field
                type="text"
                name="Jabatan"
                component={renderField}
                label="Jabatan :"
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                name="Departemen"
                component={renderField2}
                options={this.props.getOptDepartemen}
                label="Departemen :"
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                name="Kantor"
                component={renderField2}
                options={this.props.getOptKantor}
                label="Kantor :"
              />
            </FormGroup>
          </Col>

          
          <Col md={3}>
            <FormGroup>
              <Field
                type="select"
                name="PackMeal"
                component={renderField}
                label="Akses Karyawan :"
              />
            </FormGroup>
          </Col>


          


        </FormGroup>
        <FormGroup row>
          <Col md="12">
            <FormGroup>
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

FormComponent = reduxForm({
  form: "formCreateUser",
  validate: UserValidation,
  asyncBlurFields : ['PIN'] ,
  enableReinitialize: true,
})(FormComponent);
export default connect(mapStateToProps, null)(FormComponent);
