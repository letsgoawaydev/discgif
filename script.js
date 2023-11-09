document.getElementById("download").setAttribute("class", "hide");
var file;
var plz = "";
window.addEventListener('scroll', function() {
	const element = document.querySelector('#header');
	const position = element.getBoundingClientRect();

	// if fully visible
	if(position.top >= 0 && position.bottom <= window.innerHeight) {document.getElementsByName("theme-color")[0].setAttribute("content", "#2F3136");}
  else if(position.top < window.innerHeight && position.bottom >= 0) { // if partially visible
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
function previewFile() {
  const preview = document.getElementById('preview');
  file = document.querySelector('input[type=file]').files[0];
  const reader = new FileReader();
  const img = new Image();
  reader.addEventListener("load", () => {
    // convert image file to base64 string
    plz = reader.result;
    img.src = plz;        document.getElementById('choose').remove();
    img.onload = function(){
  const imgWidth = img.naturalWidth;
  const imgHeight = img.naturalHeight;
    preview.src = reader.result;
      document.getElementById("info").innerText = "Rendering... This may take a bit."
gifshot.createGIF({ 
  'images': [plz],
  'gifHeight': imgHeight,
  'gifWidth': imgWidth,
  'sampleInterval': 1   
},function(obj) {
  if(!obj.error) {
    var image = obj.image,
    animatedImage = document.getElementById('gifPreview');
    animatedImage.src = image;
document.getElementById("download").setAttribute("class", "show");
document.getElementById('info').remove();
  }
  });
    
    }}, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}
