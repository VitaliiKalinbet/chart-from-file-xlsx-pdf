const img = document.getElementById("img-from-canvas");

// const ctxElem = document.getElementById("myChart");
// const ctx = ctxElem.getContext('2d');

function getPDF() {
  // ctx.fillStyle = "rgb(200, 200, 200)";
  const imgData = ctxElem.toDataURL("image/png", 1.0);
  img.setAttribute("src", imgData);
  const pdf = new jsPDF("l", "mm", "a4");

  pdf.addImage(imgData, "PNG", 10, 10, 180, 180);
  pdf.save("my-chart.pdf");
}

download.addEventListener("click", getPDF, false);
