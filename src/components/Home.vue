<template>
   <b-row class="my-5 justify-content-center">
      <b-col md="6">
        <b-card class="text-center" bg-variant="light">
          <div v-if="islogin">
            <b-icon :icon="icon_state" font-scale="5" class="mb-4"></b-icon>
            <b-input-group>
              <b-form-input v-model="passwordmu" :type="so_pass" placeholder="Enter Your Password" :state="cek_password" autocomplete="off"></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-dark" @click="show_paswd = !show_paswd"><b-icon :icon="ic_pass"></b-icon></b-button>
              </b-input-group-append>
            </b-input-group>
          </div>
          <div v-else>
            <p class="text-muted">kamu belum login, silahkan masukkan password baru yang terdiri dari 8 karakter</p>
            <b-input-group class="mb-3">
              <b-form-input v-model="passwordmu" :type="so_pass" placeholder="Enter New Password" autocomplete="off"></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-dark" @click="show_paswd = !show_paswd;"><b-icon :icon="ic_pass"></b-icon></b-button>
              </b-input-group-append>
            </b-input-group>
            <b-button variant="dark" @click="save_password">save password</b-button>
          </div>
         </b-card>
      </b-col>
   </b-row>
</template>

<script>


import {md5} from "md5js";
import {password_pin} from "@/data";
/*
Object.keys(window.localStorage).forEach(e => {
  window.localStorage.removeItem(e);
});
*/

export default {
 name: "Home",
 data: function(){
   return {
      passwordmu: "",
      show_paswd: false
   };
 },
 methods: {
   save_password: function(){
     if(!(this.passwordmu.length < 8)){
       window.localStorage.setItem("password_pin", md5(this.passwordmu.trim()));
       window.location = "/list_file"
     }else{
       window.location.reload();
     }
   }
 },
 computed: {
   icon_state: function(){
     if(md5(this.passwordmu) === password_pin){
        window.sessionStorage.setItem("islogin", 1);
        window.location = "/list_file";
     }
     return (md5(this.passwordmu) === password_pin ? "unlock" : "lock");
  
   },
   ic_pass: function(){
     return (this.show_paswd ? "eye-fill" : "eye-slash-fill")
   },
   
   so_pass: function(){
     return (this.show_paswd ? "text" : "password")
   },
   
   cek_password: function(){
     return md5(this.passwordmu) === password_pin;
   },
   islogin: function(){
     return password_pin !== "";
   }
 }
};
</script>