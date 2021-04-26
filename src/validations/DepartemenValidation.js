const DepartemenValidation = (values) => {
    const errors = {};
  
    if (!values.KodeDepartemen || values.KodeDepartemen === "") {
      errors.KodeDepartemen = "Kode Departemen harus diisi";
    }
  
    if (!values.NamaDepartemen || values.NamaDepartemen === "") {
      errors.NamaDepartemen = "Nama Departemen harus diisi";
    }
  
    if (!values.KeteranganDepartemen || values.KeteranganDepartemen === "") {
      errors.KeteranganDepartemen = "Keterangan harus diisi";
    }
  
  
    return errors;
  };
  
  export default DepartemenValidation;
  