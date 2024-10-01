// console.log('this is injected to all pages (ISOLATED window object)', window, chrome);

window.addEventListener('load', () => {
  setTimeout(async () => {
    const { hl_videoSpeed = 2 } = await hl_utils.getStorage();
    await hl_utils.videoSpeedController(hl_videoSpeed, async () => {
      await hl_utils.setStorage({ hl_videoSpeed: evt.target.value });
    });
  }, 1000);
});
