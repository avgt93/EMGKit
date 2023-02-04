const btn = document.getElementById("upload-btn");
const filePathElement = document.getElementById("filePath");

btn.addEventListener("click", async () => {
  const filePath = await window.electronAPI.openFile();
  filePathElement.innerText = filePath;
});

TESTER = document.getElementById("tester");
Plotly.newPlot(
  TESTER,
  [
    {
      x: [1, 2, 3, 4, 5],
      y: [1, 2, 4, 8, 16],
    },
  ],
  {
    margin: { t: 0 },
  }
);
