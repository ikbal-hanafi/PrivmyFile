<template>
  <b-row class="my-5 justify-content-enter">
    <b-col md="10" class="align-self-center">
      <b-input-group class="mb-3">
        <b-input-group-prepend>
          <b-input-group-text><b-icon-search></b-icon-search></b-input-group-text>
        </b-input-group-prepend>
        <b-form-input type="text" v-model="filter" placeholder="search .."></b-form-input>
      </b-input-group>
      <b-card class="mb-5">
        <div v-if="dfiles.length" class="mb-5">
          <b-list-group v-for="(item,index) in dfiles" :key="item.nam" class="mb-2">
            <b-list-group-item button v-b-toggle="'des'+index" class="d-flex justify-content-between align-items-center">
              {{item.nam}}
              
              <div class="float-right">
                <b-link v-on:click="hapus_file(item.nam)" class="text-danger"><b-icon icon="trash-fill"></b-icon></b-link>
                <b-link :href="item.con" :download="item.nam"><b-icon icon="file-arrow-down-fill"></b-icon></b-link>
              </div>
            </b-list-group-item>
            <b-collapse :id="'des'+index" class="mt-2">
              <b-card>
                <div class="d-flex align-items-center">
                  size<b-badge class="ml-2 float-right" variant="dark">{{item.uku}}</b-badge>
                </div>
                <div class="d-flex align-items-center">
                  description<b-badge class="ml-2 float-right" variant="dark">{{item.des}}</b-badge>
                </div>
                <div class="d-flex align-items-center">
                  added on<b-badge class="ml-2 float-right" variant="dark">{{item.mod}}</b-badge>
                </div>
              </b-card>
            </b-collapse>
          </b-list-group>
          <small class="float-right mt-1 text-muted">total: {{dfiles.length}}</small>
        </div>
        <div v-else>
          <small class="text-muted">empty files</small>
        </div>
        <input v-on:change="save_filex" type="file" class="d-none"/>
        <b-input-group class="mt-1">
          <b-form-input v-model="deskripsi" type="text" placeholder="deskripsi .."></b-form-input>
          <b-input-group-append>
            <b-button variant="dark" v-b-tooltip.hover title="add file" v-on:click="tambah_file"><b-icon icon="plus"></b-icon></b-button>
          </b-input-group-append>
        </b-input-group>
     </b-card>
     <b-button variant="danger" v-on:click="leaveya">leave</b-button>
    </b-col>
  </b-row>
</template>

<script>

import {get_all_files, save_file} from '../olah.js'

if((parseInt(window.sessionStorage.getItem("islogin")) !== 1) && (window.location.pathname === "/list_file")) window.location = "/"

export default {
  name: 'ListFile',
  data(){
    return {
      filter: "",
      deskripsi: "tidak ada deskripsi",
      dfiles: get_all_files(this.filter || "")
    };
  },
  methods: {
    tambah_file(){
      document.querySelector("input[type=file].d-none").click();
    },
    save_filex(e){
      save_file(e.target.files[0], this.deskripsi).then(x =>{
        this.dfiles = get_all_files(this.filter);
      });
    },
    hapus_file(e){
      window.localStorage.removeItem(e);
      window.localStorage.setItem("list_file", JSON.stringify(JSON.parse(window.localStorage.getItem("list_file")).slice(e)));
      
      this.dfiles = get_all_files(this.filter);
    },
    leaveya(){
      window.sessionStorage.removeItem("islogin");
      window.location = "/";
    }
  },
  watch: {
    filter(val){
      this.dfiles = get_all_files(val);
    }
  }
};
</script>