<template>
  <div class="container">
      <!--UPLOAD-->
      <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
        <h1>Upload csv</h1>
        <div class="dropbox">
          <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" class="input-file">
            <p v-if="isInitial">
              Drag your file here to begin<br> or click to browse
            </p>
            <p v-if="isSaving">
              Uploading {{ fileCount }} files...
            </p>
        </div>
      </form>
      <!--SUCCESS-->
      <div v-if="isSuccess">
        <h2>Uploaded {{ uploadedFiles.length }} file successfully.</h2>
        <p>
          <a href="javascript:void(0)" @click="reset()">Upload again</a>
        </p>
      </div>
      <!--FAILED-->
      <div v-if="isFailed">
        <h2>Uploaded failed.</h2>
        <p>
          <a href="javascript:void(0)" @click="reset()">Try again</a>
        </p>
        <p>{{ uploadError }}</p>
      </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    props: ['locationid'],
    data() {
      return {
        STATUS_INITIAL: 0, 
        STATUS_SAVING: 1, 
        STATUS_SUCCESS: 2, 
        STATUS_FAILED: 3,
        uploadedFiles: [],
        uploadError: null,
        currentStatus: null,
        uploadFieldName: 'file',
        fileCount: '',
        formdata: null
      }
    },
    computed: {
      isInitial() {
        return this.currentStatus === this.STATUS_INITIAL;
      },
      isSaving() {
        return this.currentStatus === this.STATUS_SAVING;
      },
      isSuccess() {
        return this.currentStatus === this.STATUS_SUCCESS;
      },
      isFailed() {
        return this.currentStatus === this.STATUS_FAILED;
      },
      ...mapGetters([
      'locations'
    ])
    },
    methods: {
      reset() {
        // reset form to initial state
        this.currentStatus = this.STATUS_INITIAL;
        this.uploadedFiles = [];
        this.uploadError = null;
      },
      save(formData) {
        // upload data to the server
        this.currentStatus = this.STATUS_SAVING
        
        this.$store.dispatch('uploadCustomers', formData )
          .then(x => {
            this.uploadedFiles = [].concat(x)
            this.currentStatus = this.STATUS_SUCCESS
          })
          .catch(err => {
            this.uploadError = err.response
            this.currentStatus = this.STATUS_FAILED
          });
      },
      filesChange(fieldName, fileList) {
        // handle file changes
        const formData = new FormData()
        let locationid = this.locationid
        if (!fileList.length) return;
        // append the files to FormData
        Array
          .from(Array(fileList.length).keys())
          .map(x => {
            formData.append(fieldName, fileList[x], fileList[x].name)
          });
        formData.append('public_id', locationid)
        // save it

        this.save(formData)
      }
    },
    mounted() {
      this.reset()
    }
  }
</script>

<style lang="stylus" scoped>
  .dropbox {
    outline: 2px dashed grey; 
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; 
    position: relative;
    cursor: pointer;
  }
  
  .input-file {
    opacity: 0;  
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }
  
  .dropbox:hover {
    background: lightblue; 
  }
  
  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
</style>