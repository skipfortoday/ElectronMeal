const UserValidation = (values) => {
  const errors = {};

  if (!values.Nama || values.Nama === "") {
    errors.Nama = "Nama harus diisi";
  }

  if (!values.Jabatan || values.Jabatan=== "") {
    errors.Jabatan = "Jabatan harus diisi";
  } 

  if (!values.TglMasuk || values.TglMasuk=== "") {
    errors.TglMasuk = "Tanggal Masuk harus diisi";
  }


  if (!values.PIN || values.PIN === "") {
    errors.PIN = "PIN harus diisi"; 
  } 


  if (!values.NIP || values.NIP === "") {
    errors.NIP = "NIP harus diisi";
  } 

  if (!values.PackMeal || values.PackMeal === "") {
    errors.PackMeal = "Akses harus diisi";
  } 

  if (!values.Departemen || values.Departemen.value === undefined) {
    errors.Departemen = "Departemen harus diisi";
  }

  if (!values.Kantor || values.Kantor.value === undefined) {
    errors.Kantor = "Kantor harus diisi";
  }



  return errors;
};

export default UserValidation;
