var paths = [];
var path;

window.fPaperGetSVG = function (fileName) {
    if(!fileName) {
        fileName = "mistery_drawing.svg"
    }
    var url = "data:image/svg+xml;utf8," + encodeURIComponent(paper.project.exportSVG({asString:true}));
    var link = document.createElement("a");
    link.download = fileName;
    link.href = url;
    link.click();
}
window.fPaperClear = function () {
    paper.project.clear();
}
window.fPaperLoad = function () {
    paper.project.clear();
    var data = localStorage.getItem("paperData");
    if (data) {
        paper.project.importJSON(data);
    }
}
window.fPaperSave = function () {
    localStorage.setItem("paperData", paper.project.exportJSON());
}
window.fPaperLoad()

function onMouseDown(event) {
    if (path) {
        path.selected = false;
    }
    path = new Path({
        segments: [event.point],
        strokeWidth: 10,
        strokeCap: window.switchers.round ? 'round' : 'miter',
        StrokeJoin: window.switchers.round ? 'round' : 'bevel',
        strokeColor: '#ffdd57',
    });
    paths.push(path);
}

function onMouseDrag(event) {
    path.add(event.point);
}

function onMouseUp(event) {
    if (window.switchers.AIsimplification) {
        path.simplify(40);
    } else {
        if (window.switchers.simplification) {
            path.simplify(10);
        }
    }
}