import React, { Component } from "react";
import { reduxForm, Field} from "redux-form";
import { connect } from "react-redux";
import Select from 'react-select';
import {
  FormGroup,
  Col,
  Label,
  Input,
  Button,
  Row,
  Container,
} from "reactstrap";
import SelectValidation from "../validations/SelectValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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
    isMulti,
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
          isMulti={isMulti}
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
    getOptKantin : state.Opt.getOptKantin,
    initialValues: {
      Kantin : {value : state.Laporan.getLaporanRekap.SNMesin, label: state.Laporan.getLaporanRekap.NamaKantin},
      TglAwal : state.Laporan.getLaporanRekap.TglAwalInit,
      TglAkhir: state.Laporan.getLaporanRekap.TglAkhirInit,
    },
  };
};


class LengkapiAbsenGuestComponent extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
          
        <Container>
          <FormGroup row>
            <Row>
            

            <Col md={3}>
              <FormGroup>
                <Field
                  type="date"
                  name="TglAwal"
                  component={renderField}
                  label="Tanggal Awal:"
                />
              </FormGroup>
            </Col>

            <Col md={3}>
              <FormGroup>
                <Field
                  type="date"
                  name="TglAkhir"
                  component={renderField}
                  label="Tanggal Akhir :"
                />
              </FormGroup>
            </Col>

            <Col md={3}>
              <FormGroup>
                <Field
                  name="Kantin"
                  component={renderField2}
                  label="Nama:"
                  options={this.props.getOptKantin}
                />
              </FormGroup>
            </Col>

            <Col md={3}>
              <FormGroup style={{ marginTop: "37px" }}>
              <Button
                      onClick={this.props.handleSubmit(values =>
                        this.props.onSubmit({
                          ...values,
                          type: 'view'
                        }))}
                      color="dark"
                      type="submit"
                      disabled={this.props.submitting}
                    >
                      <FontAwesomeIcon icon={faSearch} /> View
                    </Button>
              </FormGroup>
            </Col>
            </Row>
          </FormGroup>
        </Container>
      </form>
    );
  }
}


 
LengkapiAbsenGuestComponent = reduxForm({
  form: "formLengkapiAbsenGuest",
  validate: SelectValidation,
  enableReinitialize: true,
})(LengkapiAbsenGuestComponent);
export default connect(mapStateToProps, null)(LengkapiAbsenGuestComponent);
