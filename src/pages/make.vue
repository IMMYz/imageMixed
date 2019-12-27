<template>
  <div class="mark-wrap">
    <div class="upload-area"
         id="uploadArea"
         ref="capture">
      <img @click="clickedUpload"
           src="../assets/images/upload-img.png" />
      <img class="logo-area"
           v-if="imageUrl"
           src="../assets/images/logo-image.png" />
      <img class="loaded-image"
           v-if="imageUrl"
           :src="imageUrl" />
    </div>
    <div class="button-wrap">
      <!-- 立即生成 -->
      <img @click="generatorImage"
           src="../assets/images/make-button.png" />
    </div>
    <a href="javascript:;"
       class="file"
       style="display:none">
      选择文件
      <input type="file"
             name
             id="uploadInput"
             @change="previewImage"
             accept="image/*" />
    </a>
    <el-dialog :visible.sync="isShow"
               :width="dialogWidth"
               :lock-scroll="false"
               title="长按图片即可保存">
      <div ref="addImage">
        <div class="full-width flex flex-justify-center">
          <img class="preview"
               v-bind:style="previewStyle"
               :src="captureImage" />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
export default {
  data () {
    return {
      imageUrl: '',
      isShow: false,
      captureCanvas: '',
      captureImage: '',
      width: '',
      height: '',
      previewStyle: {
        height: (document.documentElement.clientHeight * 0.6) + 'px',
        width: (document.documentElement.clientWidth * 0.6) + "px"
      },
      dialogWidth: (document.documentElement.clientWidth * 0.7) + 'px',
    }
  },
  mounted () {
    this.width = document.getElementById('uploadArea').clientWidth,
      this.height = document.getElementById('uploadArea').clientHeight
  },
  methods: {
    clickedUpload () {
      document.getElementById("uploadInput").click()
    },
    previewImage (event) {
      var input = event.target;
      console.log(event)
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.imageUrl = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
      }
    },
    generatorImage () {
      if (this.isActive) {
        this.buttonTips = "立即制作"
        this.isActive = false
        return
      }
      window.pageYOffset = 0;
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      this.isActive = false
      this.loading = true
      var canvas = document.createElement("canvas")
      var scale = 1
      // let scale = window.devicePixelRatio
      canvas.width = this.width * scale
      canvas.height = this.height * scale
      canvas.getContext("2d").scale(scale, scale)
      var opts = {
        scale: scale,
        canvas: canvas,
        logging: true,
        width: this.width,
        height: this.height,
        useCORS: true
      }
      html2canvas(this.$refs.capture, opts).then(canvas => {
        this.convertCanvasToImage(canvas)
      })
    },
    convertCanvasToImage (canvas) {
      this.loading = false
      this.isShow = true
      this.captureCanvas = canvas
      this.captureImage = canvas.toDataURL('image/png');
    },
  }
}
</script>

<style lang="scss" scoped>
.mark-wrap {
  width: 100%;
  height: 812px;
  background-image: url("../assets/images/make-bk.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  overflow: hidden;
  .upload-area {
    position: relative;
    width: 295px;
    height: 524.67px;
    margin: 0 auto;
    margin-top: 115px;
    img {
      box-sizing: border-box;
      width: 100%;
    }
    .loaded-image {
      position: absolute;
      width: 295px;
      height: 524.67px;
      top: 0px;
      left: 0px;
      z-index: 3;
    }
    .logo-area {
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 4;
    }
  }
  .button-wrap {
    display: flex;
    justify-content: center;
    margin-top: 50px;
    height: 42px;
    img {
      width: 150px;
    }
  }
  .preview {
    object-fit: contain;
  }
}
</style>