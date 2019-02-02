//Zadnie zaliczeniowe z node.js 2019.02.02 Marcin L. - grupa2
// uruchamiamy plik:  appZal --help 
// wyswietla z pliku po id, wszystkie, po statusie i po grupie
// kasuje pojedyncze po id i zmienia indeksy na kolejne
// modyfikacja calego rekordu lub modyfikacja statusu
// wyslanie calego pliku do api
// odebranie calego pliku z api 
// yargs, axios, fs
// Wykorzystując wiedzę z poprzednich zajęć dodajmy możliwość dodawania oraz
// usuwania użytkownika poprzez argumenty uruchamiane naszą aplikację(yargs, itp...).

// node app.js delete --id 2
// node app.js add --name "..." ...
// node app.js getUser ...

const yargs = require('yargs');

const {
    getAllItems,
    getItem,
    createItem,
    updateItem,
    deleteItem
  } = require('./appIO');
 const {
      sendAllItemsToApi,  /// zapisuje moj plik do serwera
      getAllItemsFromApi,  //odczytuje z serwera do pliku 
   } = require('./zaliServ');


const getAllCommand = {
    command: 'getAll',
    describe: 'Get all items data or --status (Active, Completed) or --group ',
    handler: 
    async args => {
        try  { 
            const showParameter = {
                status: args.status,
                group: args.group  
            }//wszystkie albo z podzialem na status lub group
     //      console.log(process.argv[3]);
          if (process.argv[3]!==undefined && process.argv[3]!=='--status'  && process.argv[3]!=='--group') throw "There is no content!" ;
          if (process.argv[3]=='--status' && process.argv[4]!=='Active' && process.argv[4]!=='Completed') throw "Status should be Active or Completed!" ;
         
            const result = await getAllItems(showParameter);
             } 
        catch (error) {
            console.error("Błąd w appZal:", error);
            }
    }
};//getAll

const getCommand = {
    command: 'get',
    describe: 'Get single item data --id 2',
    handler: 
    async args => {
        try  {
           const oneItem = {  id: args.id    }
           if (isNaN(oneItem.id))  throw "Start index like --id 1" ; //id not a number
           if ( (oneItem.id===(!!true)) || (Number(oneItem.id)==0)) //id pusty albo 0
                                   throw "Start index from 1" ;
           const result = await getItem(args.id);
            }
        catch (error) {
            console.error("Błąd w appZal:", error);
            }
       }
  };

const createCommand = {
    command: 'add',
    describe: 'Add item: add --content "zad" --status (Active Completed) --group ccc. Id auto',
    handler: 
    async args => {
        try  {
           const item = {
                id: 0,//args.id,
                content: args.content,
                status: args.status,
                group: args.group
             }
          if (process.argv[3]!=='--content') throw "There is no content!" ;
          if (item.content===(!!true))   throw "There is no content" ;
          if (process.argv[5]!=='--status') throw "There is no status!" ;
          if (item.status===(!!true))   throw "There is no status" ;
          if (process.argv[7]!=='--group') throw "There is no group!" ;
          if (item.group===(!!true))   throw "There is no group" ;
          if ( (item.status!=="Active") && (item.status!=="Completed")  )  // set right status Active Completed
          throw "Wrong status, must be Active or Completed status";
          const result = await createItem(item);
        }
       catch (error) {
            console.error("Błąd w appZal:", error);
            }
    }
};

const deleteCommand = {
    command: 'del',
    describe: 'Delete item --id 3',
    handler: 
    async args => {
       try { 
            const item = { id: args.id}
            if (process.argv[3]!=='--id') throw "There is no id, like --id 1" ;
            if (item.id===(!!true))   throw "There is no right id, like --id 1" ; 
            if (isNaN(item.id))  throw "Id is not a number, like --id 1" ; //id not a number
            if ( item.id==0 )    throw "Start index from 1" ;
            const result = await deleteItem(item.id);
           } 
        catch (error) {
            console.error(error);
          }
     }
};

const modifyCommand = {
    command: 'mod',
    describe: 'Modify item --id 1 --content --status (Active Completed) --group',

    handler: 
    async args => {
        try {  const item = {
                        id: args.id,
                        content: args.content,
                        status: args.status,
                        group: args.group
                       }
                if (process.argv[3]!=='--id') throw "There is no --id" ;
                if (item.content===(!!true))   throw "There is no id" ;
                if (process.argv[5]!=='--content') throw "There is no content!" ;
                if (item.content===(!!true))   throw "There is no content" ;
                if (process.argv[7]!=='--status') throw "There is no status!" ;
                if (item.status===(!!true))   throw "There is no status" ;
                if (process.argv[9]!=='--group') throw "There is no group!" ;
                if (item.group===(!!true))   throw "There is no group" ;
                if ( (item.status!=="Active") && (item.status!=="Completed")  )  // set right status Active Completed
                throw "Wrong status, must be Active or Completed status";
                const result = await updateItem(item);
            
        } 
        catch (error) {
                    console.error(error);
        }
    }
};

const modifyStatusCommand = {
    command: 'modStat',
    describe: 'Change status of item --id --status (Active Completed)',

    handler: 
    async args => {
        try {  const item = {
                        id: args.id,
                        status: args.status,
                        }
                if (process.argv[3]!=='--id') throw "There is no --id" ;
                if (item.content===(!!true))   throw "There is no id" ;
                if (process.argv[5]!=='--status') throw "There is no status!" ;
                if (item.status===(!!true))   throw "There is no status" ;
                if ( (item.status!=="Active") && (item.status!=="Completed")  )  // set right status Active Completed
                throw "Wrong status, must be Active or Completed status";
                const result = await updateItem(item);
            } 
        catch (error) {
                    console.error(error);
           }
    }
};

const sendToApiCommand = {
    command: 'sendToApi',
    describe: 'send data from file to http://api.quuu.linuxpl.eu/todo/gsupkvnv',
    handler: 
    async args => {
        try { 
             if (process.argv[3]!==undefined ) throw "No parameters please." ;
         
             const result = await sendAllItemsToApi();
             console.log('Done !!');
            } 
        catch (error) {
            console.error("Błąd w sendToApiCommand:", error);
            }
    }
};//sendtoApi

const getFromApiToFileCommand = {
    command: 'getFATF',
    describe: 'get all data from http://api.quuu.linuxpl.eu/todo/gsupkvnv and write to file todo.json',
    handler: 
    async args => {
        try { 
             if (process.argv[3]!==undefined ) throw "No parameters please." ;
         
             const result = await getAllItemsFromApi();
             console.log('Done !!');
            } 
        catch (error) {
            console.error("Błąd w getFromApiToFileCommand:", error);
            }
    }
};//sendtoApi



yargs.command(createCommand)
    .command(deleteCommand)
    .command(getCommand)
    .command(getAllCommand)
    .command(modifyCommand)
    .command(modifyStatusCommand)
    .command(sendToApiCommand)
    .command(getFromApiToFileCommand)
    .argv