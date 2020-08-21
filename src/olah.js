
import filesize from 'filesize'


import {password_pin} from './data'


export function get_all_files(filter=""){
   var r=[];
   
   if(window.localStorage.getItem("list_file") !== null){
     for(var x of JSON.parse(window.localStorage.getItem("list_file"))){
       if(x.includes(filter)){
         try{
          r.push(JSON.parse(atob(window.localStorage.getItem(x).replace('____'+password_pin,''))));
         }catch(e){
          window.localStorage.removeItem(x);
          window.localStorage.setItem("list_file", JSON.stringify(JSON.parse(window.localStorage.getItem("list_file")).slice(x)));
        }
       }
     }
   }
   return r;
 }
export function save_file(file, des){
   return new Promise(resv=>{ 
     var fr = new FileReader();
     fr.onload = function(e){
        var ext       = file.name.match((new RegExp('(?<=\.)(\w+)'))),
            ext       = (ext === null ? "" : ext[0]);
            
        var list_file = JSON.parse(window.localStorage.getItem("list_file") || "[]");
        if(!list_file.includes(file.name))
            list_file.push(file.name);
  
        window.localStorage.setItem("list_file", JSON.stringify(list_file));
        window.localStorage.setItem(file.name, btoa(JSON.stringify({
          nam: file.name,
          uku: filesize(file.size),
          ext: ext,
          con: e.target.result,
          mod: (new Date()).toDateString(),
          des: des
        }))+'____'+password_pin);
        
        resv(true);
     };
     fr.readAsDataURL(file);
   });
 }
