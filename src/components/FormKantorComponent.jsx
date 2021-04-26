import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { FormGroup, Col, Label, Input, Row, Button } from "reactstrap";
import CabangValidation from "../validations/CabangValidation";
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
        ((error && <p style={{ color: "white" }}>{error}</p>) ||
          (warning && <p style={{ color: "brown" }}>{warning}</p>))}
    </Col>
  </Row>
);

const mapStateToProps = (state) => {

  //console.log(optsiterpilih);
  return {
    getOptUser : state.Opt.getOptUser,
    initialValues: {
      KodeCabang: state.Cabang.getCabangDetail.KodeCabang,
      NamaCabang: state.Cabang.getCabangDetail.NamaCabang,
      Alamat: state.Cabang.getCabangDetail.Alamat,
      NoTelp: state.Cabang.getCabangDetail.NoTelp,
    },
  };
};

//let  options = [{ value: 'one', label: 'One' }, { value: 'two', label: 'Two' }];


class FormKantorComponent extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
   
        <FormGroup row>
          {/* <Col md={2}>
            <FormGroup>
              <Field
                type="text"
                name="KodeCabang"
                component={renderField}
                label="Kode Cabang :"
              />
            </FormGroup>
          </Col> */}

          <Col md={3}>
            <FormGroup>
              <Field
                type="text"
                name="NamaCabang"
                component={renderField}
                label="Nama Kantor:"
              />
            </FormGroup>
          </Col>

          <Col md={4}>
            <FormGroup>
              <Field
                type="text"
                name="Alamat"
                component={renderField}
                label="Detail Kantor :"
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

FormKantorComponent = reduxForm({
  form: "formCreateKantor",
  validate: CabangValidation,
  enableReinitialize: true,
})(FormKantorComponent);
export default connect(mapStateToProps, null)(FormKantorComponent);
