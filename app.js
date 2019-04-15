var express = require('express')
var path = require("path")
var http = require("http")
var app=express()
var mongoose=require('mongoose')

var user=require('./Schemas/UserSchema.js')
var info=require('./Schemas/InfosSchema.js')
var amis=require('./Schemas/AmisSchema.js')

//Model
var Infos=mongoose.model('u1');
var User=mongoose.model('u2'); 
var Amis=mongoose.model('u3');

var url = "mongodb://127.0.0.1:27017/carnet";  
var db = mongoose.connect(url,{ useNewUrlParser: true });                     

/**
 * écoute:Peut utiliser avec localhost 8888
 */
var  server=app.listen(8888,function () {
    console.log("start");
})

app.use(express.static('view'));
// view engine setup
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'html');

app.get('/',function(req,res){
    res.sendfile(__dirname+'/'+'view/welcome.html')
})

// Logique de traitement de connexion："Login.html"
app.get('/login',function(req,res){
	var name=req.query.name;
    var pwd=req.query.pwd;
    User.findOne({name:name,pwd:pwd},function(err,result){
        if (result==null) {
            res.sendfile(__dirname+'/'+'view/no.html');
        } else {
			console.log(name + ": bienvenue " );
            res.sendfile(__dirname+'/'+'view/welcome.html');
        }
    })
                                  
})

//Logique de traitement de s'inscrire："register.html"
app.get('/register',function(req,res){
	console.log("start");
    var name=req.query.name;
    var pwd=req.query.pwd;
    var user=new User(
        {
        name: name,
        pwd: pwd
        }
    )
    user.save(function(err,result){
    if(result==null){
        res.sendfile(__dirname + "/" + "view/no.html" );
    }else {
        res.sendfile(__dirname + "/" + "view/register_OK.html" );}
	})

})

app.get('/infos',function(req,res){
	console.log("start");
	var name=req.query.name;
	Infos.findOne({name:name},function(err,result){
        if (result!=null) {	
          console.log("Voici des imformations" );
		  Infos.findOne({"name":name},function(err,result){
			if (err) throw err;
			console.log(result);
			})
        Infos.find({"name":name},function(err, cursor) {
            //res.send(cursor.toString())
			res.sendfile(__dirname + "/" +"view/infos_affiche.html")
        
		})
		} else {
			console.log("Vous n'avez pas encore enregistré les informations. Entrez maintenant" );
			res.sendfile(__dirname + "/" + "view/infos_insert.html" );
		}
	});
})	

app.get('/infos_miseajour',function(req,res){
	console.log("start");
	var name=req.query.name;
	var SortID=req.query.SortID;
    var Famile=req.query.Famile;
	var role=req.query.role;
	Infos.findOne({name:name},function(err,result){
        if (result==null) {
		var infos=new Infos(
			{
			name:name,
			SortID:SortID,
			Famile:Famile,
			role:role
			}
		)

	infos.save(function(err,result){
		if(result==null){
        res.sendfile(__dirname + "/" + "view/no.html" );
		}else {
        res.sendfile(__dirname + "/" + "view/infos_OK.html" );}
		})
    }
	else {
		var whereStr = {"name":name}; 
		var updateStr1 = {$set: {SortID:SortID }};
		var updateStr2 = {$set: {Famile:Famile }};
		var updateStr3 = {$set: {role:role}};
 
		Infos.updateOne(whereStr,updateStr1,function(err, res) {
        if (err) throw err;
		})
		Infos.updateOne(whereStr,updateStr2,function(err, res) {
        if (err) throw err;
		})
		Infos.updateOne(whereStr,updateStr3,function(err, res) {
        if (err) throw err;
		})
	
	res.sendfile(__dirname + "/" + "view/infos_OK.html" );
	}
    
	
});
})	


app.get('/infos_insert',function(req,res){
	console.log("start");
	var name=req.query.name;
	var SortID=req.query.SortID;
    var Famile=req.query.Famile;
	var role=req.query.role;
	Infos.findOne({name:name},function(err,result){
        if (result==null) {
		var infos=new Infos(
        {
		 name:name,
         SortID:SortID,
		 Famile:Famile,
		 role:role
        }
    )

	infos.save(function(err,result){
	console.log("start");
    if(result==null){
        res.sendfile(__dirname + "/" + "view/no.html" );
    }else {
        res.sendfile(__dirname + "/" + "view/infos_OK.html" );}
})
        }
	else {
		var whereStr = {"name":name}; 
		var updateStr1 = {$set: {SortID:SortID }};
		var updateStr2 = {$set: {Famile:Famile }};
		var updateStr3 = {$set: {role:role}};
 
	Infos.updateOne(whereStr,updateStr1,function(err, res) {
        if (err) throw err;
    })
	Infos.updateOne(whereStr,updateStr2,function(err, res) {
        if (err) throw err;
    })
	Infos.updateOne(whereStr,updateStr3,function(err, res) {
        if (err) throw err;
    })
		
	}
    
	
});
});

app.get('/amis_liste',function(req,res){
	console.log("start");
	var name=req.query.name;
	amis.find({name:name},function(err,result){
        if (result!=null) {	
          console.log("Voici des amis" );
		  amis.find({"name":name},function(err,result){
			if (err) throw err;
			console.log(result);
			res.sendfile(__dirname + "/" +"view/amis_affiche.html")
			})
		} else {
			console.log("Vous n'avez pas encore des liste d'amis." );
			res.sendfile(__dirname + "/" + "view/amis_affiche.html" );
		}
	});
})	


app.get('/amis_affiche',function(req,res){
	console.log("start");
	}
)	

app.get('/amis',function(req,res){
	console.log("start");
    var name=req.query.name;
    var nameamis=req.query.nameamis;
    var amis=new Amis(
        {
        name: name,
        nameamis:nameamis
        }
    )
	amis.save(function(err,result){
    if(result==null){
        res.sendfile(__dirname + "/" + "view/no.html" );
    }else {
        res.sendfile(__dirname + "/" + "view/amis_ajoute.html" );}
})

})


app.get('/amis_ajoute',function(req,res){
		res.sendfile(__dirname + "/" + "view/welcome.html" );
})

app.get('/amis_OK',function(req,res){
	console.log("start");
    var name=req.query.name;
    var nameamis=req.query.nameamis;
    var whereStr={
        name: name,
        nameamis:nameamis
        };
	amis.deleteOne(whereStr, function(err, obj) {
	console.log("start");
        if (err) throw err;
		res.sendfile(__dirname + "/" + "view/amis_Sup.html" );
    });

})

app.get('/amis_Sup',function(req,res){
		res.sendfile(__dirname + "/" + "view/welcome.html" );
})