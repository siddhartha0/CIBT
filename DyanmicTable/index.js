let columnNumber = [];

document.getElementById("btn").onclick = function getColumnNumber() {
  columns = document.getElementById("columnInput").value;
  for (let i = 0; i < columns; i++) {
    columnNumber.push(i + 1);
  }
  console.log(columnNumber);
  columnNumber.map((i) => {
    const newSpan = document.createElement("span");
    const content = document.createTextNode(i);

    newSpan.appendChild(content);

    document
      .getElementById("div")
      .insertBefore(newSpan, document.getElementById("colNumber"));
  });

  columnNumber = [];
};

document.getElementById("clear").onclick = function clear() {
  document.getElementById("colNumber").remove("colNumber");
};
