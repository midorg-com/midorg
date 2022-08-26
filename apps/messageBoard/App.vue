<script>
export default {
  onLaunch: function () {
    let updateManager = uni.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {});
    updateManager.onUpdateReady(function () {
      updateManager.applyUpdate();
    });
  },
  globalData: {},
};
</script>

<style>
/*每个页面公共css */
</style>
