<template>
  <web-view :src="url"></web-view>
</template>

<script>
export default {
  data() {
    return {
      url: "https://www.midorg.com/",
    };
  },
  onLoad: function (e) {
    this.url = "https://www.midorg.com/" + (e.path || "");
  },
  onShareAppMessage() {},
};
</script>
<style></style>
