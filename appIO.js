
//operacje na pliku, i tablicy
const fs = require('fs');


function readFile() {
    return new Promise(function (resolve, reject) {
        fs.readFile('./todo.json', 'utf8', function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
}
function writeFile(data1) {
    return new Promise(function(resolve, reject) {
      fs.writeFile('./todo.json', data1, 'utf8', function(err) {
        if (err)
          reject(err);
        else
          resolve("Promise Success!");
      });
    });
  }

async function getAllItems(showParameter) {//odczytaj wszyskie rekordy z pliku do tablicy i na ekran
 try {
      let dataFromFile = await readFile()
     //console.log(showParameter);
      let toDoItem = JSON.parse(dataFromFile);  
      
    if (showParameter.status==undefined && showParameter.group==undefined) {//jesli nie bylo parametru to wszystkie wyswietl
        console.log("Id, content,   status,   group");
        for (const element of toDoItem) {
             console.log(element.id, element.content, element.status, element.group);
         }
      }
      else{
         for (const element of toDoItem) {
        if (element.status===showParameter.status)
            {console.log(element.id, element.content, element.status, element.group);}
       
        if (element.group===showParameter.group)
            {console.log(element.id, element.content, element.status, element.group);}
       }
    }
  
      console.log("Full base include items=", toDoItem.length);
      } 
    catch (error) {
     
    console.error("To blad w appIO:",error.message);
   }
  }
  
  async function getItem(oneItem) {//odczyt po id --id 3 
    try {
        let dataFromFile = await readFile()
        let toDoItem = JSON.parse(dataFromFile);
        console.log("Your choice:", oneItem);
        let trafienie=false;
        for (let index = 0; index < toDoItem.length; index++) {
             if(toDoItem[index].id==oneItem)  { 
                    console.log(toDoItem[index].id,toDoItem[index].content,toDoItem[index].status,toDoItem[index].group);
                    trafienie=true;
              }
          
            }
        if (!trafienie) console.log("Brak wpisu o takim id.");
        
      } 
        catch (error) { console.error(error); }
    
      }  

async function createItem(item) {//odczytuje plik,do tablicy,push wiersz z pobranych parametro i zapis do pliku
    try {
        let dataFromFile = await readFile()
        let toDoItem = JSON.parse(dataFromFile);
        item.id=""+(toDoItem.length+1);//automatycznie nadamy id 
        toDoItem.push(item);
     //   console.log(toDoItem);
        let dataToSave=JSON.stringify(toDoItem);
        await writeFile(dataToSave);
      } 
        catch (error) { console.error(error); }
    
      }  


async function updateItem(item) {
    try { 
         let dataFromFile = await readFile();
         let toDoItem = JSON.parse(dataFromFile);
         if (item.id==0) throw "Index is out of range." ;
         if (item.id>toDoItem.length) throw "Index is out of range" ;
         console.log("Row", item.id, "updated!");
       //  console.log("ide", item.id, item.content, item.status, item.group);
         for (let index = 0; index < toDoItem.length; index++) {
             if (toDoItem[index].id==item.id) { //jak znajdziesz to toDoItem.splice(numer, 1);
              if(item.content!=undefined)  {    toDoItem[index].content=item.content;}
              else {toDoItem[index].content;}
                    toDoItem[index].status=item.status;
              if(item.group!=undefined) {     toDoItem[index].group=item.group;}
               }
            }
         
     //   console.log(toDoItem);
        //dopis        
        let dataToSave=JSON.stringify(toDoItem);
        await writeFile(dataToSave);
      } 
    catch (error) { console.error(error); }

///dziala wczytac usunac dopisac zapisac
}

async function deleteItem(itemId) {//usuwam po id i sortuje id, i zapis do pliku
   try {
       let dataFromFile = await readFile();
       let toDoItem = JSON.parse(dataFromFile);
       let trafienie=false;
      
       if (itemId>toDoItem.length) throw "Index is out of range" ;
       if (itemId==toDoItem.length){ //jesli ostatni id z tabeli to uswaj tylko
          const deleted= toDoItem.pop();
          console.log("Row",itemId,"deleted!");
        }
        else{ //jesli nie ostatni to dodatkowo prze indexuj id
         for (let index = 0; index < toDoItem.length; index++) {
             if (toDoItem[index].id==itemId) { //jak znajdziesz to toDoItem.splice(numer, 1);
                 toDoItem.splice(index,1);
                 trafienie = true;
                }
             if (trafienie ){//&& (index<(toDoItem.length-1))) {
              //  console.log(toDoItem[index]);
                 toDoItem[index].id=""+[index+1];
                }
          }    //do for
          console.log("Row",itemId,"deleted!");
        }//do else
   //     console.log(toDoItem)
        let dataToSave=JSON.stringify(toDoItem);
        await writeFile(dataToSave);
       } 
       catch (error) {
          console.error(error); 
       }
 }  
   


module.exports = {
    createItem,
    getItem,
    getAllItems,
    deleteItem,
    updateItem,
    writeFile,
    readFile
};