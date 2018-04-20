function convertImgToBase64URL(url, callback, outputFormat) {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = function () {
    let canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.height = img.height;
    canvas.width = img.width;
    ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL(outputFormat);
    callback(dataURL);
    canvas = null;
  };
  img.src = url;
}

export { convertImgToBase64URL }