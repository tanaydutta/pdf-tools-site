async function mergePDFs() {
  const input = document.getElementById('pdf-files');
  const files = input.files;

  if (files.length < 2) {
    alert("Please select at least 2 PDFs to merge.");
    return;
  }

  const mergedPdf = await PDFLib.PDFDocument.create();

  for (let file of files) {
    const bytes = await file.arrayBuffer();
    const pdf = await PDFLib.PDFDocument.load(bytes);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  const mergedBytes = await mergedPdf.save();
  const blob = new Blob([mergedBytes], { type: "application/pdf" });
  const link = document.getElementById("download-link");

  link.href = URL.createObjectURL(blob);
  link.style.display = "inline";
  link.innerText = "Download Merged PDF";
}
