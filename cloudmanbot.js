'use strict'

const TelegramBot = require('node-telegram-bot-api');
const moment = require('moment');
const request = require('request');

module.exports = function(){

const token = 'xxxxxx';
//cloudman

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/echo (.+)/, (msg, match) => {
  //vai reinviar a informação que vc digitou como resposta
  const chatId = msg.chat.id;
  const resp = match[1]; 
  bot.sendMessage(chatId, resp);
});

bot.onText(/\/clima (.+)/, (msg, match) => {
    //openweathermap
    //api tokken 
    var openweatherapikey = 'xxxxxx';
   
    //vai reinviar a informação que vc digitou como resposta
    const chatId = msg.chat.id;
    const openweatherreq = match[1]; 
    request(`http://api.openweathermap.org/data/2.5/weather?q=${openweatherreq}&appid=${openweatherapikey}`, function(error,response, body){
         if(!error && response.statusCode == 200){
            var res = JSON.parse(body);
            //para verificar estrutura do json
            //console.log(res);

            //main.temp, main.humidity, wind.speed, sys.country, name, dt
            var temperatura = res.main.temp;
            var humidade = res.main.humidity;
            var velocidadevento = res.wind.speed;
            var nomelocal = res.name;
            var paislocal = res.sys.country;
            var data = res.dt;
        
            
            bot.sendMessage(chatId, "\nLocal nome: " + nomelocal  +
                                    "\nPais: " + paislocal +
                                    "\ndata: " + data + 
                                    "\nTemperatura grau:" + temperatura +
                                    "\nVelocidade vento: " + velocidadevento +
                                    "\nHumidade: " + humidade);  
            //bot.sendMessage(chatId, "dados no console.log");                        
         }
    });
});

bot.onText(/\/clima2 (.+)/, (msg, match) => {
    //weatherapi
    //api tokken 
    var weatherapikey = 'xxxxxxx';
    /*
    humidity	int	Humidity as percentage 
    wind_kph	decimal	Wind speed in kilometer per hour
    temp_c	decimal	Temperature in celsius

    exemplo

    So to get current weather for London: JSON: http://api.weatherapi.com/v1/current.json?key=<YOUR_API_KEY>&q=London

    XML: http://api.weatherapi.com/v1/current.xml?key=<YOUR_API_KEY>&q=London
    JSON: http://api.weatherapi.com/v1/forecast.json?key=<YOUR_API_KEY>&q=07112&days=7 

    */
    //vai reinviar a informação que vc digitou como resposta
    const chatId = msg.chat.id;
    const weatherresp = match[1]; 
    request(`http://api.weatherapi.com/v1/current.json?key=${weatherapikey}&q=${weatherresp}`, function(error,response, body){
         if(!error && response.statusCode == 200){
            var res = JSON.parse(body);
            //para verificar estrutura do json
            //console.log(res);
            //location.name, location.region, location.country, location.tz_id, .location.localtime,
            //current.temp_c, current.wind_kph, current.humidity
            
            //var locationname = res.location.name;
            //console.log(locationname);
            var locationname = res.location.name;
            var locationregion = res.location.region;
            var locationcountry = res.location.country;
            var locationtz = res.location.tz_id;
            var locationlocaltime = res.location.localtime;

            var locationtempc = res.current.temp_c;
            var locationwind_v = res.current.wind_kph;
            var locationhumidity = res.current.humidity;
            
            bot.sendMessage(chatId, "\nLocal nome: " + locationname +
                                    "\nRegião: " + locationregion +
                                    "\nPais: " + locationcountry + 
                                    "\nTime zone: " + locationtz +
                                    "\nLocal Time: " + locationlocaltime +
                                    "\nTemperatura grau Celsius:" + locationtempc +
                                    "\nVelocidade vento: " + locationwind_v +
                                    "\nHumidade: " + locationhumidity);
         }
    });
    
});

bot.on('message', async (msg) => {

  //comprimentos basicos
 
var oi = "oi";
if (msg.text.toString().toLowerCase().indexOf(oi) === 0) {
bot.sendMessage(msg.chat.id,"Oi " + msg.from.first_name + ", tudo bem com vc?");
} 
    
var tchau = "tchau";
if (msg.text.toString().toLowerCase().includes(tchau)) {
bot.sendMessage(msg.chat.id, "Gostei de conversar com você " + msg.from.first_name + " tchau :)");

}

var tipo = "chatbot";
if (msg.text.toString().toLowerCase().includes(tipo)) {
bot.sendMessage(msg.chat.id, "Sou um chatbot do tempo, forneço informações climáticas.");

}

var comprimento1 = "bom dia";
if (msg.text.toString().toLowerCase().indexOf(comprimento1) === 0) {
bot.sendMessage(msg.chat.id,"Obrigada! Bom dia  " + msg.from.first_name);
} 
    
var comprimento2 = "boa tarde";
if (msg.text.toString().toLowerCase().includes(comprimento2)) {
bot.sendMessage(msg.chat.id, "Obrigada! Boa tarde  " + msg.from.first_name);

}

var comprimento3 = "boa noite";
if (msg.text.toString().toLowerCase().includes(comprimento3)) {
bot.sendMessage(msg.chat.id, "Obrigada! Boa noite  " + msg.from.first_name);

}


/* data*/
var data = "data";
if (msg.text.toString().toLowerCase().includes(data)) {

var datamoment = moment().format('LLL');  // April 18, 2020 2:19 PM

bot.sendMessage(msg.chat.id, "Data Atual:  " + datamoment.toString());

}


});

}