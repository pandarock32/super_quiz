document.querySelectorAll(".super-quiz-checkbox")
    .forEach(item => {
        item.addEventListener("click", function (ev) {
            const label = item.querySelector("label");
            if (label) {
                if (label !== ev.target) {
                    label.click();
                    item.querySelector("input").dispatchEvent(new Event("change"))
                }
            }
        })
    })