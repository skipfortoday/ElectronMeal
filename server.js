const express = require("express");
const moment = require("moment");
const multer = require("multer");
let cors = require("cors");
let md5 = require("md5");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const { request } = require("express");
let session = require("express-session");


// Disk Upload File
const path = require("path");
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/uploads"));
  },
  // konfigurasi penamaan file yang unik
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// parse application/json
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

//create database connection
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mealcount",
  timezone: "utc",
});

//connect to database
conn.connect((err) => {
  if (err) console.log(err);
  console.log("Mysql Connected...");
});




/////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////        API BERHUBUNGAN DENGAN DATA USER         ////////////////////

///////////////////////////////////////////////////////////////////////////////////////////

//Menampilkan Seluruh List User untuk table data karyawan di web admin

app.get("/api/user", (req, res) => {
  conn.query(`CALL MenampilkanUser`, function (err, rows) {
    if (err) res.send(err);
    let user = rows[0];
    res.send(user);
  });
});

//menampilkan detail user  data  berdasarkan User ID
app.get("/api/user/:id", (req, res) => {
  conn.query(
    `CALL MenampilkanDetailUser('` + req.params.id + `')`,
    function (err, rows) {
      if (err) res.send(err);
      let user = rows[0];
      let detailuser = user[0];
      res.send(detailuser);
    }
  );
});

//Tambahkan data user untuk panel admin
app.post("/api/user", (req, res) => {
  let data = {
    Nama: req.body.Nama,
    PIN: req.body.PIN,
    NIP: req.body.NIP,
    Jabatan : req.body.Jabatan,
    Departemen : req.body.Departemen,
    Kantor : req.body.Kantor,
    PackMeal : req.body.PackMeal
  };

  let sql =
    `CALL InsertPegawai ('`+data.PIN+`','`+data.NIP+`','`+data.Nama+`','`+data.Jabatan+`','`+data.Departemen+`','`+data.Kantor+`','`+data.PackMeal+`')`;
  let query = conn.query(sql, (err, results) => {
    if (err) res.send(err);
    res.send(JSON.stringify(results));
  });
});


//Edit User
app.put("/api/user/:id", (req, res) => {
  let data = {
    Nama: req.body.Nama,
    PIN: req.params.id,
    NIP: req.body.NIP,
    Jabatan : req.body.Jabatan,
    Departemen : req.body.Departemen,
    Kantor : req.body.Kantor,
    PackMeal : req.body.PackMeal
  };

  let sql =
  `CALL UpPegawai ('`+data.PIN+`','`+data.NIP+`','`+data.Nama+`','`+data.Jabatan+`','`+data.Departemen+`','`+data.Kantor+`','`+data.PackMeal+`' )`;
  let query = conn.query(sql, (err) => {
    if (err) res.send(err);
    res.send(JSON.stringify(data));
  });
});

//Menghapus data user untuk panel admin
app.delete("/api/user/:id", (req, res) => {
  let sql = `DELETE FROM tblpegawai WHERE PIN="` + req.params.id + `"`;
  let query = conn.query(sql, (err, results) => {
    if (err) res.send(err);
    res.send(JSON.stringify(results));
  });
});

////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////        API BERHUBUNGAN DENGAN KANTOR          ///////////////////

///////////////////////////////////////////////////////////////////////////////////////////

//Menampilkan seluruh data cabang yang sudah terdaftar di panel admin
app.get("/api/kantor", (req, res) => {
  let sql = "SELECT * FROM tblkantor";
  let query = conn.query(sql, (err, results) => {
    if (err) res.send(err);
    res.send(JSON.stringify(results));
  });
});

//Menampilkan detai data cabang yang sudah terdaftar di panel admin
app.get("/api/kantor/:id", (req, res) => {
  conn.query(
    `SELECT * FROM tblkantor Where KantorID="` + req.params.id + `"`,
    function (err, rows) {
      if (err) res.send(err);
      let cabang = rows[0];
      res.send(cabang);
    }
  );
});

//Menambahkan Data Kantor dengan kode cabang dan nama cabang
app.post("/api/kantor", (req, res) => {
  let data = {
    NamaKantor: req.body.NamaKantor,
    KeteranganKantor: req.body.KeteranganKantor,
  };
  let sql = "INSERT INTO tblkantor SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) res.send(err);
    res.send(JSON.stringify(results));
  });
});

//Mengedit Nama Kantor untuk untuk panel admin
app.put("/api/kantor/:id", (req, res) => {
  let data = {
    NamaKantor: req.body.NamaKantor,
    KeteranganKantor: req.body.KeteranganKantor,
  };
  let sql =
    `UPDATE tblkantor SET NamaKantor="` +
    data.NamaKantor+
    `", KeteranganKantor="` +
    data.KeteranganKantor+
    `" WHERE KantorID="` +
    req.params.id +
    `"`;
  let query = conn.query(sql, (err, results) => {
    if (err) res.send(err);
    res.send(JSON.stringify(data));
  });
});

//Menghapus data cabang untuk panel admin
app.delete("/api/kantor/:id", (req, res) => {
  let sql = `DELETE FROM tblkantor WHERE KantorID="` + req.params.id + `"`;
  let query = conn.query(sql, (err, results) => {
    if (err) res.send(err);
    res.send(JSON.stringify(results));
  });
});



////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////        API BERHUBUNGAN DENGAN Departemen          ///////////////////

///////////////////////////////////////////////////////////////////////////////////////////

//Menampilkan seluruh data cabang yang sudah terdaftar di panel admin
app.get("/api/Departemen", (req, res) => {
  let sql = "SELECT * FROM tblDepartemen";
  let query = conn.query(sql, (err, results) => {
    if (err) res.send(err)
    else {res.send(JSON.stringify(results));}
  });
});

//Menampilkan detai data cabang yang sudah terdaftar di panel admin
app.get("/api/Departemen/:id", (req, res) => {
  conn.query(
    `SELECT * FROM tblDepartemen Where DepartemenID="` + req.params.id + `"`,
    function (err, rows) {
      if (err) res.send(err);
      let cabang = rows[0];
      res.send(cabang);
    }
  );
});

//Menambahkan Data Kantor dengan kode cabang dan nama cabang
app.post("/api/Departemen", (req, res) => {
  let data = {
    NamaDepartemen: req.body.NamaDepartemen,
    KeteranganDepartemen: req.body.KeteranganDepartemen,
  };
  let sql = "INSERT INTO tblDepartemen SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) res.send(err);
    res.send(JSON.stringify(data));
  });
});

//Mengedit Nama Kantor untuk untuk panel admin
app.put("/api/Departemen/:id", (req, res) => {
  let data = {
    NamaDepartemen: req.body.NamaDepartemen,
    KeteranganDepartemen: req.body.KeteranganDepartemen,
  };
  let sql =
    `UPDATE tblDepartemen SET NamaDepartemen="` +
    data.NamaDepartemen+
    `", KeteranganDepartemen="` +
    data.KeteranganDepartemen+
    `" WHERE DepartemenID="` +
    req.params.id +
    `"`;
  let query = conn.query(sql, (err, results) => {
    if (err) res.send(err);
    res.send(JSON.stringify(data));
  });
});

//Menghapus data cabang untuk panel admin
app.delete("/api/Departemen/:id", (req, res) => {
  let sql = `DELETE FROM tblDepartemen WHERE DepartemenID="` + req.params.id + `"`;
  let query = conn.query(sql, (err, results) => {
    if (err) res.send(err);
    res.send(JSON.stringify(results));
  });
});


////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////        API BERHUBUNGAN DENGAN KANTIN          ///////////////////

///////////////////////////////////////////////////////////////////////////////////////////

//Menampilkan seluruh data cabang yang sudah terdaftar di panel admin
app.get("/api/Kantin", (req, res) => {
  let sql = "SELECT * FROM tblKantin";
  let query = conn.query(sql, (err, results) => {
    if (err) res.send(err);
    res.send(JSON.stringify(results));
  });
});

//Menampilkan detai data cabang yang sudah terdaftar di panel admin
app.get("/api/Kantin/:id", (req, res) => {
  conn.query(
    `SELECT * FROM tblKantin Where SNMesin="` + req.params.id + `"`,
    function (err, rows) {
      if (err) res.send(err);
      let cabang = rows[0];
      res.send(cabang);
    }
  );
});

//Menambahkan Data Kantor dengan kode cabang dan nama cabang
app.post("/api/Kantin", (req, res) => {
  let data = {
    SNMesin: req.body.SNMesin,
    NamaKantin: req.body.NamaKantin,
    KeteranganKantin: req.body.KeteranganKantin,
  };
  let sql = "INSERT INTO tblKantin SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) res.send(err) 
    else{res.send(JSON.stringify(results))}
    
  });
});

//Mengedit Nama Kantor untuk untuk panel admin
app.put("/api/Kantin/:id", (req, res) => {
  let data = {
    NamaKantin: req.body.NamaKantin,
    KeteranganKantin: req.body.KeteranganKantin,
  };
  let sql =
    `UPDATE tblKantin SET NamaKantin="` +
    data.NamaKantin+
    `", KeteranganKantin="` +
    data.KeteranganKantin+
    `" WHERE SNMesin="` +
    req.params.id +
    `"`;
  let query = conn.query(sql, (err, results) => {
    if (err) res.send(err);
    res.send(JSON.stringify(results));
  });
});

//Menghapus data cabang untuk panel admin
app.delete("/api/Kantin/:id", (req, res) => {
  let sql = `DELETE FROM tblKantin WHERE SNMesin="` + req.params.id + `"`;
  let query = conn.query(sql, (err, results) => {
    if (err) res.send(err);
    res.send(JSON.stringify(results));
  });
});




////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////        API BERHUBUNGAN DENGAN JADWAL          ///////////////////

///////////////////////////////////////////////////////////////////////////////////////////

//Menampilkan seluruh data cabang yang sudah terdaftar di panel admin
app.get("/api/jadwal", (req, res) => {
  let sql = "SELECT * FROM tblaturan";
  let query = conn.query(sql, (err, results) => {
    if (err) res.send(err);
    res.send(JSON.stringify(results));
  });
});

//Menampilkan detai data cabang yang sudah terdaftar di panel admin
app.get("/api/jadwal/:id", (req, res) => {
  conn.query(
    `SELECT * FROM tblaturan Where JadwalID="` + req.params.id + `"`,
    function (err, rows) {
      if (err) res.send(err);
      let cabang = rows[0];
      res.send(cabang);
    }
  );
});

//Menambahkan Data Kantor dengan kode cabang dan nama cabang
app.post("/api/jadwal", (req, res) => {
  let data = {
    SNMesin: req.body.SNMesin,
    NamaKantin: req.body.NamaKantin,
    KeteranganKantin: req.body.KeteranganKantin,
  };
  let sql = "INSERT INTO tblaturan SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) res.send(err);
    res.send(JSON.stringify(data));
  });
});

//Mengedit Nama Kantor untuk untuk panel admin
app.put("/api/jadwal/:id", (req, res) => {
  let data = {
    MulaiLunch: req.body.MulaiLunch,
    SelesaiLunch: req.body.SelesaiLunch,
    MulaiSupper: req.body.MulaiSupper,
    SelesaiSupper: req.body.SelesaiSupper,
  };
  let sql =
    `UPDATE tblaturan SET MulaiLunch="` +
    data.MulaiLunch+
    `", SelesaiLunch="` +
    data.SelesaiLunch+
    `", MulaiSupper="` +
    data.MulaiSupper+
    `", SelesaiSupper="` +
    data.SelesaiSupper+
    `" WHERE JadwalID="` +
    req.params.id +
    `"`;
  let query = conn.query(sql, (err, results) => {
    if (err) res.send(err);
    res.send(JSON.stringify(data));
  });
});

//Menghapus data cabang untuk panel admin
app.delete("/api/jadwal/:id", (req, res) => {
  let sql = `DELETE FROM tblKantin WHERE SNMesin="` + req.params.id + `"`;
  let query = conn.query(sql, (err, results) => {
    if (err) res.send(err);
    res.send(JSON.stringify(results));
  });
});


////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////        API BERHUBUNGAN DENGAN LOGIN         ///////////////////////

///////////////////////////////////////////////////////////////////////////////////////////

// Api untuk proses login di APP
app.post("/api/login", (req, res) => {
  let data = {
    Password: md5(req.body.Password),
    AdminID: req.body.AdminID,
  };
  let query = "Select * FROM ?? WHERE ??=? AND ??=?";
  let table = ["admin", "Password", data.Password, "AdminID", data.AdminID];

  query = mysql.format(query, table);
  conn.query(query, function (err, rows) {
    if (err) {
      res.send(err);
    } else {
      if (rows.length == 1) {
        res.json({ AdminID: rows[0].AdminID, RoleAdmin : rows[0].RoleAdmin, message: "OK" , Login: "true" });
      } else {
        res.json({ message: "Username Passoword Salah" , Login: "false" });
      }
    }
  });
});







/////////////////////////////////////////

///////////  API Option
//////////////////////////////////////


///////////// API OPTION DEPARTEMEN /////////
app.get("/api/optDepartemen", (req, res) => {
  conn.query(`CALL optDepartemen`, function (err, rows) {
    if (err) res.send(err);
    let departemen = rows[0];
    res.send(departemen);
  });
});



///////////// API OPTION KANTOR /////////
app.get("/api/optKantor", (req, res) => {
  conn.query(`CALL optKantor`, function (err, rows) {
    if (err) res.send(err);
    let Kantor = rows[0];
    res.send(Kantor);
  });
});


///////////// API OPTION KANTOR /////////
app.get("/api/optKantin", (req, res) => {
  conn.query(`CALL optKantin`, function (err, rows) {
    if (err) res.send(err);
    let Kantor = rows[0];
    res.send(Kantor);
  });
});


 

////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////        API BERHUBUNGAN SUPER ADMIN        ///////////////////

///////////////////////////////////////////////////////////////////////////////////////////

//Menampilkan seluruh data cabang yang sudah terdaftar di panel admin
app.get("/api/superadmin", (req, res) => {
  let sql = `SELECT AdminID,  DATE_FORMAT(TanggalCreate, "%d-%m-%Y") as TanggalCreate FROM admin WHERE RoleAdmin ='1'`;
  let query = conn.query(sql, (err, results) => {
    if (err) res.send(err);
    res.send(JSON.stringify(results));
  });
});

//Menampilkan detai data cabang yang sudah terdaftar di panel admin
app.get("/api/superadmin/:id", (req, res) => {
  conn.query(
    `SELECT AdminID,Password, DATE_FORMAT(TanggalCreate, "%Y-%m-%d") as TanggalCreate FROM admin Where AdminID="`+ req.params.id +`"`,
    function (err, rows) {
      if (err) res.send(err);
      let cabang = rows[0];
      res.send(cabang);
    }
  );
});

//Menambahkan Data Cabang dengan kode cabang dan nama cabang
app.post("/api/superadmin", (req, res) => {
  let data = {
    AdminID: req.body.AdminID,
    Password: md5(req.body.Password),
    RoleAdmin : "1",
    TanggalCreate : moment.parseZone(moment()).format('YYYY-MM-DD'),
  };
  let sql = "INSERT INTO admin SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) res.send(err);
    res.send(JSON.stringify(data));
  });
});

//Mengedit Nama Cabang untuk untuk panel admin
app.put("/api/superadmin/:id", (req, res) => {
  let data = {
    AdminID: req.body.AdminID,
    Password: md5(req.body.Password),
  };
  let sql =
    `UPDATE admin SET Password="` +
    data.Password +
    `" WHERE AdminID="` +
    req.params.id +
    `"`;
  let query = conn.query(sql, (err, results) => {
    if (err) res.send(err);
    res.send(JSON.stringify(data));
  });
});

//Menghapus data cabang untuk panel admin
app.delete("/api/superadmin/:id", (req, res) => {
  let sql = `DELETE FROM admin WHERE AdminID="` + req.params.id + `"`;
  let query = conn.query(sql, (err, results) => {
    if (err) res.send(err);
    res.send(JSON.stringify(results));
  });
});

/////////////////////////////////////////////
/////  API PROSES MENAMPILKAN REPOR    ////
///////////////////////////////////////////


// Api untuk proses absensi
app.get("/api/ReportPertanggal/:id&:TglAwal&:TglAkhir", (req, res) => {
  let post = {
    SNMesin : req.params.id,
    TglAwal: req.params.TglAwal,
    TglAkhir: req.params.TglAkhir,
  };


  //Mendapatkan Nama Orang Perkantorr



  // Mendapatkan Tanggal Yang Kosong 

  let sql2 = `SELECT  *FROM tbltanggal WHERE Tanggal BETWEEN "`+post.TglAwal+`" AND "`+post.TglAkhir+`"`
  let sql3 = `SELECT DATE_FORMAT(Tanggal, "%W, %d %M  %Y") as Tanggal,JumlahLunch,JumlahSupper,JumlahPackMeal FROM tbltanggal WHERE Tanggal BETWEEN "`+post.TglAwal+`" AND "`+post.TglAkhir+`"`

 // query = mysql.format(query, table);

  conn.query(sql2, function (error, rows,results) {
    if (error) {
      console.log(error);
    } else { 
        var i;
        for (i = 0; i < rows.length; i++)
        { conn.query(`CALL MenghitungLaporan('`+moment.parseZone(rows[i].Tanggal).format('YYYY-MM-DD')+`','`+post.SNMesin+`')`); }
        let query = conn.query(sql3, (err, results) => {
          if (err) res.send(err);
          else {
            conn.query(
              `CALL RekapPertanggal ('` +
              req.params.id +
              `','` +
              req.params.TglAwal +
              `','` +
              req.params.TglAkhir +
              `')`,
              function (err, rows) {
                if (err) res.send(err);
                let rek = rows[0];
                let det = rek[0];
                res.json({ Rekap: det, results : results});
              }
            );

          }

          // res.send(JSON.stringify(results));
        });
  
  };
});

});


// Menampilkan Recent Scan Untuk APP Android Berdasarkan Tgl Mulai Dan Tgl Akhir
app.get("/api/laporanrekap/:id&:TglAwal&:TglAkhir", (req, res) => {
  conn.query(
    `CALL RekapPertanggal ('` +
    req.params.id +
    `','` +
    req.params.TglAwal +
    `','` +
    req.params.TglAkhir +
    `')`,
    function (err, rows) {
      if (err) res.send(err);
      let rek = rows[0];
      let det = rek[0];
      res.send(det);
    }
  );
});



// Menampilkan Recent Scan Untuk APP Android Berdasarkan Tgl Mulai Dan Tgl Akhir
app.get("/api/laporanrekap2/:id&:TglAwal&:TglAkhir", (req, res) => {
  conn.query(
    `CALL RekapPertanggal ('` +
    req.params.id +
    `','` +
    req.params.TglAwal +
    `','` +
    req.params.TglAkhir +
    `')`,
    function (err, rows) {
      if (err) res.send(err);
      let rek = rows[0];
      let det = rek[0];
      res.send(det);
    }
  );
});


/////////////////////////////////////////////////////
/////  API PROSES MENAMPILKAN REPORT PErhari    ////
//////////////////////////////////////////////////


// Api untuk proses absensi
app.get("/api/ReportPerhari/:id&:Tanggal&:Departemen", (req, res) => {
  let post = {
    SNMesin : req.params.id,
    Tanggal: req.params.Tanggal,
    DepartemenID : req.params.Departemen,
  };


  let sql2 = `CALL AmbilNama2('`+post.Tanggal+`','`+post.SNMesin+`','`+post.DepartemenID+`')`
  let sql3 =`TRUNCATE TABLE tmpreport`
  let sql4 = `SELECT *FROM tmpreport ORDER BY NamaKantor`

 // query = mysql.format(query, table);
 conn.query(sql2, function (error, rows) {
  if (error) {
    console.log(error);
  } else { 
    conn.query(sql3, function (error) {
      if (error) {
        console.log(error);
      } else { 
        var data = rows[0];
          var i;
          for (i = 0; i < data.length; i++)
          { conn.query(`CALL tmpLaporanHarian('`+data[i].PIN+`','`+post.Tanggal+`','`+post.SNMesin+`')`); }
          let query = conn.query(sql4, (err, results) => {
            if (err) res.send(err);
            else {
              conn.query(
                `CALL RekapPerhari ('` +
                req.params.id +
                `','` +
                req.params.Tanggal +
                `','` +
                req.params.Departemen +
                `')`,
                function (err, rows) {
                  if (err) res.send(err);
                  let rek = rows[0];
                  let det = rek[0];
                  res.json({ Rekap: det, results : results});
                }
              );
            }

            // res.send(JSON.stringify(results));
          });
    };
    });
};
});

});






/////////////////////////////////////////////////////
/////  API PROSES MENAMPILKAN REPORT PErhari    ////
//////////////////////////////////////////////////


// Api untuk proses absensi
app.get("/api/ReportPerhari2/:id&:Tanggal", (req, res) => {
  let post = {
    SNMesin : req.params.id,
    Tanggal: req.params.Tanggal,
  };


  let sql2 = `CALL AmbilNama('`+post.Tanggal+`','`+post.SNMesin+`')`
  let sql3 =`TRUNCATE TABLE tmpreport`
  let sql4 = `SELECT *FROM tmpreport ORDER BY NamaKantor`

 // query = mysql.format(query, table);
 conn.query(sql2, function (error, rows) {
  if (error) {
    console.log(error);
  } else { 
    conn.query(sql3, function (error) {
      if (error) {
        console.log(error);
      } else { 
      	  var data = rows[0];
          var i;
          for (i = 0; i < data.length; i++)
          { conn.query(`CALL tmpLaporanHarian('`+data[i].PIN+`','`+post.Tanggal+`','`+post.SNMesin+`')`); }
          let query = conn.query(sql4, (err, results) => {
            if (err) res.send(err);
            else {
              conn.query(`CALL RekapPerhari2 ('` +req.params.id + `','` +req.params.Tanggal +
              `')`,function (err, rows) { if (err) res.send(err);
                let rek = rows[0];
                let det = rek[0];
                // res.json(Rekap det,results);
                res.json({ Rekap: det, results : results});
              }
             );
            }
          });
    };
    });
};
});
});


//Server listening
app.listen(3001, () => {
  console.log("Server started on port 3001...");
});
