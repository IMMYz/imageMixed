<template>
  <div class="main-wrap">
    <div class="button-wrap"
         @click="jumpToMake">
      <img src="../assets/images/button.png">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    jumpToMake () {
      this.$router.push({
        name: 'make'
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.main-wrap {
  position: relative;
  width: 100%;
  height: 812px;
  background-image: url("../assets/images/avatar-bk.png");
  background-size: cover;
  background-repeat: no-repeat;
  .button-wrap {
    position: absolute;
    top: 534px;
    left: 50px;
    img {
      width: 150px;
    }
  }
}
</style>