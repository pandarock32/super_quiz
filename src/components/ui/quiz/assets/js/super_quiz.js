if (window.ui === null) {
    window.ui = {}
}

window.ui.quiz = {

    history_class: ".super-quiz__history",
    history_item_invisible_class: "super-quiz__history-item_invisible",
    slider_class: ".super-quiz__slider",

    next(target) {

        const quiz = this.getRoot(target);
        if (!quiz) {
            return;
        }

        const currentSlide = this.getCurrentSlide(quiz, target);
        let i = 0;
        for (i = 0; i < currentSlide.parentElement.children.length; i++) {
            if (currentSlide.parentElement.children[i] === currentSlide) {
                break;
            }
        }

        currentSlide.parentElement.children[i+1].scrollIntoView(true);
        this.updateHistory(quiz, i+1);
    },

    prev(target) {
        const quiz = this.getRoot(target);
        if (!quiz) {
            return;
        }

        const currentSlide = this.getCurrentSlide(quiz, target);
        let i = 0;
        for (i = 0; i < currentSlide.parentElement.children.length; i++) {
            if (currentSlide.parentElement.children[i] === currentSlide) {
                break;
            }
        }

        currentSlide.parentElement.children[i-1].scrollIntoView(true);
        this.updateHistory(quiz, i-1);
    },

    open: function(target) {
        const quiz = this.getRoot(target);

        const history = quiz.querySelector(this.history_class);
        let index = 0;
        let j = 0;
        for(const item of history.children) {
            item.classList.remove("super-quiz__history-item_current");

            if (item.contains(target)) {
                item.classList.add("super-quiz__history-item_current")
                index = j;
            }
            j++;
        }

        const slider = quiz.querySelector(this.slider_class);
        slider.children[index].scrollIntoView(true);
    },

    updateHistory: function (quiz, slideIndex) {
        const history = quiz.querySelector(this.history_class);
        history.children[slideIndex].classList.remove(this.history_item_invisible_class);

        let i = 0;
        for(const item of history.children) {
            item.classList.remove("super-quiz__history-item_current");
            item.classList.remove("super-quiz__history-item_rounded");
            if (i === slideIndex) {
                item.classList.add("super-quiz__history-item_current")
            }
            i++;
        }
    },

    updateSlideSelected(target) {
        const quiz = this.getRoot(target);

        const slider = quiz.querySelector(this.slider_class);

        let index = 0;
        for(const item of slider.children) {
            if (item.contains(target)) {
               break;
            }
            index++;
        }

        const history = quiz.querySelector(this.history_class);
        const historyItem = history.children[index];
        const historySelected = historyItem.querySelector(".super-quiz__history-item-value");

        const inputs = slider.children[index].querySelectorAll("input");
        let result = "";

        for(const input of inputs) {
            if (input.classList.contains("super-quiz-checkbox__value") || input.classList.contains("super-quiz-radio__value")) {
                if (input.checked || input.selected) {
                    result += ", " + input.parentElement.textContent;
                }
            } else if (input.classList.contains("default-select__value")) {
                result += ", " + window.ui.select.getValueLabel(input);
            } else {
                if (input.value.trim().length > 0) {
                    result += ", " + input.value;
                }
            }
        }

        historySelected.textContent = result.substring(2);
    },

    getRoot(target) {
        let quiz = target;
        while (quiz != null) {
            if (quiz.className === "super-quiz") {
                break;
            }
            quiz = quiz.parentElement;
        }
        return quiz;
    },

    getCurrentSlide(root, target) {
        const slides = root.querySelectorAll(".super-quiz__slider-item");
        for (const slide of slides) {
            if (slide.contains(target)) {
                return slide;
            }
        }
    }
}

window.addEventListener("resize", () => {
    document.querySelectorAll(".super-quiz").forEach(quiz => {
        const questions = quiz.querySelector(".super-quiz__history");
        let i = 0;
        for (i = 0; i < questions.childElementCountt; i++) {
            if (questions.classList.contains("super-quiz__history-item_current")) {
                break;
            }
        }

        const slider = quiz.querySelector(".super-quiz__slider");
        const width = slider.children[i].getBoundingClientRect().width;
        slider.scrollLeft = width * i;
    })
    document.querySelectorAll(".super-quiz__history-item_current");
})
