var LastDown;
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
    path = new Path({
        selected: false,
        segments: [event.point],
        strokeWidth: window.penStroke || 5,
        strokeCap: 'round',
        StrokeJoin: 'round',
        strokeColor: window.penColor || '#ffdd57',
    });
    LastDown = event.point;
}

function onMouseDrag(event) {
    if (LastDown) {
        LastDown = false;
    }
    path.add(event.point);
}

function onMouseUp(event) {
    var circle = false;
    if (LastDown) {
        circle = true;
        new Path.Circle({
            center: LastDown,
            radius: (window.penStroke || 5)/2,
            fillColor: window.penColor || '#ffdd57'
        });
    }
    if (!circle) {
        if (window.switchers.AIsimplification) {
            path.simplify(40);
        } else {
            if (window.switchers.simplification) {
                path.simplify(10);
            }
        }
    }
}