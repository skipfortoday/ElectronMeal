const CabangValidation = (values) => {
    const errors = {};
  
    if (!values.KodeCabang || values.KodeCabang === "") {
      errors.KodeCabang = "Kode Cabang harus diisi";
    }
  
    if (!values.NamaKantor || values.NamaKantor === "") {
      errors.NamaKantor = "Nama Kantor harus diisi";
    }
  
    if (!values.KeteranganKantor || values.KeteranganKantor === "") {
      errors.KeteranganKantor = "Keterangan harus diisi";
    }
  
    return errors;
  };
  
  export default CabangValidation;
  