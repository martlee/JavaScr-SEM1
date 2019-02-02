//obsluga api

const {readFile, writeFile } = require('./appIO');

const axios = require('axios');
const axiosOptions = { headers: {'Content-Type': 'application/json'    }   };

async function sendAllItemsToApi() {
    try {
         let dataFromFile = await readFile()
         let toDoItem = JSON.parse(dataFromFile);
         console.log("Base include items=", toDoItem.length);
         const result = await sendToApi(toDoItem);
         } 
      catch (error) {
           console.error("To blad w zaliServ:",error);
        }
  }
     
     
async function getAllItemsFromApi() {
    try {
   
         const result = await getFromApi();
         console.log("I read from api, items=", result.length);
         let dataToSave=JSON.stringify(result);
         writeFile(dataToSave)
         console.log( result);
         } 
      catch (error) {
           console.error("To blad w zaliServ:",error.message);
        }
  }

async function getFromApi() {
    const response = await axios.get('http://api.quuu.linuxpl.eu/todo/gsupkvnv');
    return response.data;
  }  
async function sendToApi(toDoList) {
    const response = await axios.post('http://api.quuu.linuxpl.eu/todo/gsupkvnv', toDoList, axiosOptions);
    return response.data;
  }

module.exports = {
    sendAllItemsToApi,
    getAllItemsFromApi,
    
};