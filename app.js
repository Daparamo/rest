var express = 	require("express"),
	app		= 	express()
	puerto 	= 	8081, 
	bodyParser 	= require('body-parser');

//Para indicar que se envía y recibe información por medio de Json...
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Datos de prueba...
var persona = [
				{
					id 			: 	1, 					
					nombre 		: 	"Daniel Alejandro", 
					apellido	: 	"Páramo Torres", 					
					foto		: 	"https://fbcdn-sphotos-f-a.akamaihd.net/hphotos-ak-xtp1/v/t1.0-9/983790_10152725855627342_5819781132407658177_n.jpg?oh=bc793cc4025fe4660970732bd7898264&oe=55CE5468&__gda__=1438719838_e051b933b5dc9b8d8a45b2b98aeaba10"
				},
				{
					id 			: 	2, 					
					nombre 		: 	"Alejandra", 
					apellido	: 	"Gomez", 					
					foto		: 	"https://pbs.twimg.com/profile_images/522610872955322369/0go5VW2Q.jpeg"
				},
				{
					id 			: 	3, 					
					nombre 		: 	"Josefa", 
					apellido	: 	"Vella", 					
					foto		: 	"http://pollardthomasedwards.co.uk/wp-content/uploads/2014/01/Joseffa-Vella_1.jpg"
				}
				];

var mensaje = [
				{
					idmensaje 	: 	1, 					
					nombre 		: 	"Daniel", 
					mensaje		: 	"Hola, ¿Como estas?", 					
					fecha		: 	"15/05/2015",
					hora		: 	"14:20"
				},
				{
					idmensaje 	: 	2, 					
					nombre 		: 	"Alejandra", 
					mensaje		: 	"Hola, bien bien y tu", 					
					fecha		: 	"15/05/2015",
					hora		: 	"14:21"
				},
				{
					idmensaje 	: 	3, 					
					nombre 		: 	"Daniel", 
					mensaje		: 	"bien gracias", 					
					fecha		: 	"15/05/2015",
					hora		: 	"14:22"
				}
				];

//Servicios REST...
app.get('/getAllData', function(req, res)
{
	res.json(persona);   
});


app.get('/getData/:id', function(req, res)
{
	var ind = buscarIDUser(req.param("id"));
	var devuelve = {datos : ind >= 0 ? persona[ind] : "", status : ind >= 0 ? true : false};
	res.json(devuelve);
});


app.get('/getAllMensajes', function(req, res)
{
	res.json(mensaje);   
});


app.post('/createMensaje', function (req, res)
{
	res.json(createMensaje(req.body));
	console.log(req.body);

});

/*
app.post('/createMensaje', function (req, res)
{
	res.json(crearEditarUsuario(req.body));
});
app.put('/updateData', function (req, res)
{
	res.json(crearEditarUsuario(req.body, 2));
});

app.delete('/deleteData/:id', function(req, res)
{
	var ind = buscarIDUser(req.param("id"));
	if(ind >= 0)
	{
		persona.splice(ind, 1);
	}
	res.json({status : ind >= 0 ? true : false});
});

app.get('/getData/:id', function(req, res)
{
	var ind = buscarIDUser(req.param("id"));
	var devuelve = {datos : ind >= 0 ? persona[ind] : "", status : ind >= 0 ? true : false};
	res.json(devuelve);
});
*/
//Para cualquier url que no cumpla la condición...
app.get("*", function(req, res)
{
	res.status(404).send("Página no encontrada :( en el momento");
});

var createMensaje = function(ms)
{						
			mensaje.push(ms);
			mensaje[mensaje.length - 1].idmensaje = mensaje.length;			
	return {idmensaje : mensaje.length - 1};
}

//Busca la posición del usuario en el array...
var buscarIDUser = function(id)
{
	var ind = -1;
	for(var i = 0; i < persona.length; i++)
	{
		if(Number(persona[i].id) === Number(id))
		{
			ind = i;
			break;
		}
	}
	return ind;
};

//Para saber si un usuario ya existe...


app.listen(puerto);
console.log("Express server iniciado en el " + puerto);