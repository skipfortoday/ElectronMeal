const SelectValidation = (values) => {
    const errors = {};
  
    if (!values.Nama || values.Nama === undefined) {
      errors.Nama = "Nama harus diisi";
    }
  
    if (!values.TglAkhir|| values.TglAkhir=== "") {
      errors.TglAkhir = "TglAkhir harus diisi";
    }

    if (!values.Tanggal|| values.Tanggal=== "") {
      errors.Tanggal = "Tanggal harus diisi";
    }
  
    if (!values.TglAwal|| values.TglAwal=== "") {
      errors.TglAwal = "TglAwal harus diisi";
    }

    if (!values.Kantin || values.Kantin.value === undefined) {
      errors.Kantin = "Kantin Sharus diisi";
    }
  
    return errors;
  };
  
  export default SelectValidation;
  