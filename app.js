//Instanciando os módulos iniciais
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

//Configurando Mongoose e Conexão com MongoDB
var mongoose = require('mongoose');
mongoose.Promise = global.Promise; //Fazer a conexão se tornar assincrona 
mongoose.connect('mongodb://localhost/gdg-oauth', { useMongoClient: true })
    .then(() => console.log('Conexão Realizada com Sucesso'))
    .catch((err) => console.error(err));

//Configurando Passport para autenticação
var passport = require('passport');
var session = require('express-session');
var passportGoogle = require('./google');

app.use(session({
    secret: 's3cr3t',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//Rotas da Aplicação
app.get('/', function (req, res) {
    res.send('GDG Oauth Google com NodeJS!');
})
app.get('/login/google',
    passportGoogle.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email']
    })
)

app.get('/login/google/callback', 
    passportGoogle.authenticate('google', { failureRedirect: '/login' }),
        function (req, res) {
            //console.log('user2: ' + JSON.stringify(req.user));
            res.send('Seja bem vindo: '+req.user.doc.name);
        }
)

//Iniciando Aplicação
app.listen(3000);
console.log('GDG Oauth Google Iniciado!');

module.exports = app;