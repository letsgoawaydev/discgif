document.getElementById("download").setAttribute("class", "hide");
var file;
var plz = "";
window.addEventListener('scroll', function() {
  const element = document.querySelector('#header');
  const position = element.getBoundingClientRect();

  // if fully visible
  if (position.top >= 0 && position.bottom <= window.innerHeight) { document.getElementsByName("theme-color")[0].setAttribute("content", "#2F3136"); }
  else if (position.top < window.innerHeight && position.bottom >= 0) { // if partially visible
    document.getElementsByName("theme-color")[0].setAttribute("content", "#2F3136");
  }
  else { // if not visible
    document.getElementsByName("theme-color")[0].setAttribute("content", "#37393E");
  }
});
const download = (dataUrl, filename) => {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  link.click();
};
let frames = extractFramesFromVideo("/cry.mov", 60).then(function(frames) {
  gifshot.createGIF({
    gifWidth: 200,
    gifHeight: 200,
    images: frames,
    interval: 1 / 60,
  }, function(obj) {
    if (!obj.error) {
      var image = obj.image, animatedImage = document.createElement('img');
      animatedImage.src = image;
      document.body.appendChild(animatedImage);
    }
  });
});


async function extractFramesFromVideo(videoUrl, fps = 25) {
  return new Promise(async (resolve) => {
    // fully download it first (no buffering):
    let videoBlob = await fetch(videoUrl).then((r) => r.blob());
    let videoObjectUrl = URL.createObjectURL(videoBlob);
    let video = document.createElement("video");

    let seekResolve;
    video.addEventListener("seeked", async function() {
      if (seekResolve) seekResolve();
    });

    video.src = videoObjectUrl;

    // workaround chromium metadata bug (https://stackoverflow.com/q/38062864/993683)
    while (
      (video.duration === Infinity || isNaN(video.duration)) &&
      video.readyState < 2
    ) {
      await new Promise((r) => setTimeout(r, 1000));
      video.currentTime = 10000000 * Math.random();
    }
    let duration = video.duration;

    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    let [w, h] = [video.videoWidth, video.videoHeight];
    canvas.width = w;
    canvas.height = h;

    let frames = [];
    let interval = 1 / fps;
    let currentTime = 0;

    while (currentTime < duration) {
      video.currentTime = currentTime;
      await new Promise((r) => (seekResolve = r));

      context.drawImage(video, 0, 0, w, h);
      let base64ImageData = canvas.toDataURL();
      frames.push(base64ImageData);

      currentTime += interval;
    }
    resolve(frames);
  });
}