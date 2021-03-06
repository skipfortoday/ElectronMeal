import React, { Component } from "react";
import { reduxForm, Field} from "redux-form";
import { connect } from "react-redux";
import Select from 'react-select';
import {
  FormGroup,
  Col,
  Label,
  Input,
  Row,
  Button,
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
    // getOptDepartemen : state.Opt.getOptDepartemen,
    initialValues: {
      Kantin : {value : state.Laporan.getLaporanRperhari2.SNMesin, label: state.Laporan.getLaporanRperhari2.NamaKantin},
      Tanggal : state.Laporan.getLaporanRperhari2.TanggalInit,
      // Departemen: {value : state.Laporan.getLaporanRperhari.Departemen, label: state.Laporan.getLaporanRperhari.NamaDepartemen},
    },
  };
};


class FormLaporanPerhari2 extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
          
        <Container>
          <FormGroup row>
            <Row>
            

            <Col md={5}>
              <FormGroup>
                <Field
                  type="date"
                  name="Tanggal"
                  component={renderField}
                  label="Tanggal:"
                />
              </FormGroup>
            </Col>

            {/* <Col md={4}>
              <FormGroup>
                <Field
                  name="Departemen"
                  component={renderField2}
                  label="Departemen :"
                  options={this.props.getOptDepartemen}
                />
              </FormGroup>
            </Col> */}


            <Col md={4}>
              <FormGroup>
                <Field
                  name="Kantin"
                  component={renderField2}
                  label="Kantin :"
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


 
FormLaporanPerhari2 = reduxForm({
  form: "formLaporanPerhari2",
  validate: SelectValidation,
  enableReinitialize: true,
})(FormLaporanPerhari2);
export default connect(mapStateToProps, null)(FormLaporanPerhari2);
