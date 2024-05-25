document.querySelectorAll(".super-quiz-radio").forEach((item) => {
    quiz_radio_bindClick(item)
});

document.querySelectorAll(".super-quiz-radio__icon")
    .forEach((item) => {
        item.addEventListener("click", function (ev) {
            const label = item.parentElement.querySelector(".super-quiz-radio__label");
            if (label) {
                if (label !== ev.target) {
                    label.click();
                    item.querySelector("input").dispatchEvent(new Event("change"))
                }
            }
        });
    })

function quiz_radio_bindClick(item) {
    item.addEventListener("click", function (ev) {
        const label = ev.target.querySelector(".super-quiz-radio__label")
        if (label) {
            if (label !== ev.target) {
                label.click();
                item.querySelector("input").dispatchEvent(new Event("change"))
            }
        }
    })
}
