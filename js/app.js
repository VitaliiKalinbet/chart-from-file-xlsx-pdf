const demo = "fetch",
  book = "xlsx",
  url = "./datafiles/example2.xlsx";

if (!window.fetch)
  throw new Error("This demo is not supported in your browser");
function process_wb(wb) {
  // console.log(wb);
  htmlout.innerHTML = XLSX.utils
    .sheet_to_html(wb.Sheets[wb.SheetNames[0]], { editable: true })
    .replace("<table", '<table id="table" border="1"');
}

document.getElementById("fileurl").innerHTML =
  '<a class="btn" href="' + url + '">Download original file</a>';

document.getElementById("outfile").innerHTML =
  '<a class="btn" href="' + demo + "." + book + '">Download new file</a>';

fetch(url)
  .then(function (res) {
    if (!res.ok) throw new Error("fetch failed");
    return res.blob();
  })
  .then(function (blob) {
    const reader = new FileReader();
    reader.addEventListener("loadend", function () {
      const data = new Uint8Array(this.result);
      const wb = XLSX.read(data, { type: "array" });
      process_wb(wb);
    });
    reader.readAsArrayBuffer(blob);
  });

document.getElementById("ulbutton").onclick = function () {
  const wb = XLSX.utils.table_to_book(document.getElementById("htmlout"));
  // console.log(wb);
  const fd = new FormData();
  const data = XLSX.write(wb, { bookType: book, type: "array" });
  // console.log(data);
  fd.append("data", new File([data], demo + "." + book));
  fetch("/upload", { method: "POST", body: fd })
    .then(function (r) {
      return r.text();
    })
    .then(function (t) {
      console.log(t);
    });
};
