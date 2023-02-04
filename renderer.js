const btn = document.getElementById("file-btn");
const filePathElement = document.getElementById("filePath");

const plotList = {
  x: [],
  y: [],
};

function plotGraph() {
  console.log(plotList.x);
  TESTER = document.getElementById("tester");
  Plotly.newPlot(
    TESTER,
    [
      {
        x: plotList.x,
        y: plotList.y,
      },
    ],
    {
      margin: { t: 0 },
    }
  );
}
btn.addEventListener("click", async () => {
  const fileData = await window.electronAPI.openFile();
  filePathElement.value = fileData[0];
  plottingData = fileData[1];
  plotList.x = [];
  plotList.y = [];
  var tempDate = new Date(0);
  var startTime = plottingData[0][0];
  for (i = 0; i < plottingData.length; i++) {
    var tempDate = new Date(0);
    // tempDate.setUTCMilliseconds(plottingData[i][0]);
    plotList.x.push(plottingData[i][0]);
    plotList.y.push(plottingData[i][1]);
  }
  if (plotList.x.length != 0 && plotList.y.length != 0) {
    plotGraph();
  }
});

const gbtn = document.getElementById("submit-btn");

gbtn.addEventListener("click", async () => {
  const data = await window.electronAPI.sendGraph();
  console.log(data);
});
