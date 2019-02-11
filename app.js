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
    round: true,
};
let app = new Vue({
    el: '#app',
    data: {
        switchers: window.switchers,
        w: appEl.offsetWidth,
        h: appEl.offsetHeight - navEl.offsetHeight
    },
    watch: {
        switchers: function(val) {
            localStorage.setItem("switchers", JSON.stringify(val));
            window.switchers = val;
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