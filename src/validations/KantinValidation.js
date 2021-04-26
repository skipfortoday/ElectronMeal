const KantinValidation = (values) => {
    const errors = {};
  
    if (!values.SNMesin || values.SNMesin === "") {
      errors.SNMesin = "SNMesin harus diisi";
    }
  
    if (!values.NamaKantin || values.NamaKantin === "") {
      errors.NamaKantin = "Nama Kantin harus diisi";
    }
  
    if (!values.KeteranganKantin || values.KeteranganKantin === "") {
      errors.KeteranganKantin = "Keterangan harus diisi";
    }
  
  
    return errors;
  };
  
  export default KantinValidation;
  