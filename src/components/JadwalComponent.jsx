import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { FormGroup, Col, Label, Input, Row, Button } from "reactstrap";
import JadwalValidation from "../validations/JadwalValidation";
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

  //console.log(optsiterpilih);
  return {
    initialValues: {
      MulaiLunch: state.Jadwal.getJadwalDetail.MulaiLunch,
      SelesaiLunch: state.Jadwal.getJadwalDetail.SelesaiLunch,
      MulaiSupper: state.Jadwal.getJadwalDetail.MulaiSupper,
      SelesaiSupper: state.Jadwal.getJadwalDetail.SelesaiSupper,
    },
  };
};

//let  options = [{ value: 'one', label: 'One' }, { value: 'two', label: 'Two' }];


class JadwalComponent extends Component {
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
                type="time"
                name="MulaiLunch"
                component={renderField}
                label="Jam Mulai Lunch:"
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="time"
                name="SelesaiLunch"
                component={renderField}
                label="Jam Selesai Lunch :"
              />
            </FormGroup>
          </Col>

          
          <Col md={3}>
            <FormGroup>
              <Field
                type="time"
                name="MulaiSupper"
                component={renderField}
                label="Jam Mulai Supper:"
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="time"
                name="SelesaiSupper"
                component={renderField}
                label="Jam Selesai Supper :"
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

JadwalComponent = reduxForm({
  form: "JadwalComponent",
  validate: JadwalValidation,
  enableReinitialize: true,
})(JadwalComponent);
export default connect(mapStateToProps, null)(JadwalComponent);
