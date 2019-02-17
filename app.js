let a = [
    "charming",
    "cute",
    "elegant",
    "exquisite",
    "fascinating",
    "fine",
    "gorgeous",
    "graceful",
    "grand",
    "lovely",
    "magnificent",
    "marvelous",
    "pretty",
    "superb",
    "wonderful",
    "classy",
    "excellent",
    "fair",
    "ideal",
    "nice",
    "mystery"
]
let appEl = document.getElementById('app');
let navEl = document.getElementById('nav');
let switchers = JSON.parse(localStorage.getItem("switchers"));
window.switchers = switchers || {
    simplification: true,
    AIsimplification: true,
};
window.penColor = localStorage.getItem("penColor") || "#ffdd57";
window.penStroke = localStorage.getItem("penStroke") || 10;
let app = new Vue({
    el: '#app',
    components: {
        'picker': VueColor.Chrome,
    },
    data: {
        switchers: window.switchers,
        colors: window.penColor,
        stroke: window.penStroke,
        w: appEl.offsetWidth,
        h: appEl.offsetHeight - navEl.offsetHeight
    },
    watch: {
        switchers: function(val) {
            localStorage.setItem("switchers", JSON.stringify(val));
            window.switchers = val;
        },
        colors: function (val) {
            localStorage.setItem("penColor", val.hex8);
            window.penColor = val.hex8;
        },
        stroke: function (val) {
            localStorage.setItem("penStroke", val);
            window.penStroke = val;
        }
    },
    methods: {
        getFileName: function() {
            let filename = [];
            for (let index = 0; index < 2; index++) {
                let randomName = a[Math.floor(Math.random() * a.length)]
                while (filename.includes(randomName)) {
                    randomName = a[Math.floor(Math.random() * a.length)]
                }
                filename.push(randomName)
            }
            return filename
        },
        save: function() {
            filename = this.getFileName();
            this.$toast.open(`We save your ${filename.join(" and ")} art`);
            window.fPaperGetSVG(`${filename.join("_")}_art.svg`);
        },
        clear: function() {
            filename = this.getFileName();
            this.$toast.open(`We burn down your ${filename.join(" and ")} art`);
            window.fPaperClear();
            window.fPaperSave();
        },
    }
})
window.onresize = () => {
    window.fPaperSave();
    window.location.reload();
    window.fPaperLoad();
}
window.onbeforeunload = () => {
    window.fPaperSave();
}