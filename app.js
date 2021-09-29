console.log("Hello from Back 2 School");

let viz;

const exportToPDF = document.getElementById("exportToPDF");

// 1. Create a variable to store the dashboard URL
const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard?:language=en-US&:display_count=n&:origin=viz_share_link";
// 2. Create a list of options to send to the JavaScript API (device, width and height of the dashboard)
const options = {
  device: "desktop",
  Category: ["Office Supplies", "Technology"],
  //   ^setting the view to filter to only show the Office Supplies category
};

// 3. Grab the container from the body of the page (vizContainer from the index.html file)
const vizContainer = document.getElementById("vizContainer");

// 4. Create a function that will create the viz on the page
function initViz() {
  viz = new tableau.Viz(vizContainer, url, options);
}

// Create Export to PDF
function exportPDF() {
  console.log("Going to export a PDF");
  viz.showExportPDFDialog();
}
exportToPDF.addEventListener("click", exportPDF);

// Create Export to Powerpoint button
function exportPowerPoint() {
  console.log("Going to export a Powerpoint");
  viz.showExportPowerPointDialog();
}

exportToPowerPoint.addEventListener("click", exportPowerPoint);

// Listens for a an event called Content Loaded. When that is ready, it will execute the initViz funtion
document.addEventListener("DOMContentLoaded", initViz);

function getRangeValues() {
  // get the values from the input boxes
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  // log out the values
  console.log({ minValue, maxValue });
  // get workbook object
  const workbook = viz.getWorkbook();
  // get the active sheet (dashboard, sheet or story)
  const activeSheet = workbook.getActiveSheet();
  // from the dashboard, get the worksheets
  const sheets = activeSheet.getWorksheets();
  // get access to the worksheet we want to filter
  const sheetToFilter = sheets[1];
  sheetToFilter.applyRangeFilterAsync("SUM(Sales)", {
    min: minValue,
    max: maxValue,
  });
}

document.getElementById("filterbutton").addEventListener("click", function () {
  getRangeValues();
});

document.addEventListener("DOMContentLoaded", initViz);
