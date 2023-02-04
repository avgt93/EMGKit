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
function rand() {
  return Math.random();
}
function recordingGraph() {
  Plotly.newPlot("tester", [
    {
      y: [1, 2, 3].map(rand),
      mode: "lines",
      line: { color: "#80CAF6" },
    },
  ]);
}
const animate = document.getElementById("animate");
animate.addEventListener("click", () => {});

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
  if (animate.checked) {
    recordingGraph();
    var cnt = 0;

    var interval = setInterval(function () {
      Plotly.extendTraces(
        "tester",
        {
          y: [[plotList.y[cnt]]],
        },
        [0]
      );

      if (++cnt === plotList.x.length) clearInterval(interval);
    }, 100);
  }
  if (plotList.x.length != 0 && plotList.y.length != 0 && !animate.checked) {
    plotGraph();
  }
});

const recordBtn = document.getElementById("record-btn");

recordBtn.addEventListener("click", () => {
  recordingGraph();
  var cnt = 0;
  var interval = setInterval(function () {
    Plotly.extendTraces(
      "tester",
      {
        y: [[rand()], [rand()]],
      },
      [0, 1]
    );

    if (++cnt === 100) clearInterval(interval);
  }, 300);
});
