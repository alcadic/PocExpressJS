var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./properties.file');

var connection = mysql.createConnection({
  host     : properties.get('bbdd.con.host'),
  port	   : properties.get('bbdd.con.port'),
  user     : properties.get('bbdd.con.user'),
  password : properties.get('bbdd.con.password'),
  database : properties.get('bbdd.con.database')
});

/* Se habilita que el origen de las peticiones venga de cualquier parte */
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

/* By default */
router.get('/', function(req, res, next) {
  res.render('index', { title: '' });
});

/* Devuelve todo los usuarios */
// http://localhost:3000/GetUsuarios
router.get('/GetUsuarios', function(req, res, next) {
	
	connection.query('SELECT * FROM Usuario', function(err, rows){

      if (err) {
        return res.status(500).send(err);
      }

      res.status(200).send({usuarios : rows});
	});
		
});


/* Devuelve un usuario indicando su id */
// http://localhost:3000/GetUsuario/?id=0
router.get('/GetUsuario', function(req, res, next) {
  
  let idUsuario = req.query.id;
  let query = "SELECT * FROM Usuario WHERE id = '" + idUsuario + "' ";

	connection.query(query, function(err, row){

      if (err) {
        return res.status(500).send(err);
      }

      res.status(200).send({usuario : row});
	});
		
});



/* Añade un usuario */
// http://localhost:3000/AddUsuario
router.post('/AddUsuario', function(req, res, next) {
  
    connection.query('INSERT INTO ?? SET id = ?, nombre = ?, apellidos = ?, dni = ?', ['Usuario', req.body.id, req.body.nombre, req.body.apellidos, req.body.dni], function(err, rows){
      
      if (err) {
        return res.status(500).send(err);
      }

      res.status(200).send({usuarios : rows});

  });

});


/* Delete un usuario */
// http://localhost:3000/DelUsuario
router.delete('/DelUsuario', function(req, res, next) {
  
  connection.query('DELETE FROM ?? WHERE id = ?', ['Usuario', req.query.id], function(err, rows){

      if (err) {
        return res.status(500).send(err);
      }

      res.status(200).send({usuarios : rows});
  });
 
});


/* Añade un usuario */
// http://localhost:3000/UpdateUsuario
router.put('/UpdateUsuario', function(req, res, next) {
  
  connection.query('UPDATE ?? SET nombre = ?, apellidos = ?, dni = ? WHERE id = ?', ['Usuario', req.body.nombre, req.body.apellidos, req.body.dni, req.body.id], function(err, rows){

      if (err) {
        return res.status(500).send(err);
      }

      res.status(200).send({usuarios : rows});
  });


});

module.exports = router;