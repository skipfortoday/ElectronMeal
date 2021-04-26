const JadwalValidation = (values) => {
    const errors = {};
  
    if (!values.MulaiLunch || values.MulaiLunch === "") {
      errors.MulaiLunch = "harus diisi";
    }
  
    if (!values.SelesaiLunch || values.SelesaiLunch === "") {
      errors.SelesaiLunch = "harus diisi";
    }
  
    
    if (!values.MulaiSupper || values.MulaiSupper === "") {
        errors.MulaiSupper = " harus diisi";
      }
    
      if (!values.SelesaiSupper || values.SelesaiSupper === "") {
        errors.SelesaiSupper = "harus diisi";
      }
    return errors;
  };
  
  export default JadwalValidation;