
if (!window.ui) {
    window.ui = {}
}

window.ui.select = {
    open: function (target) {
        const select = this.getSelectedRoot(target);
        select.dataset.collapsed = "false";

        document.removeEventListener("click", this.onClickHandler)
        document.addEventListener("click", this.onClickHandler)
    },

    close: function (target) {
        const select = this.getSelectedRoot(target);
        select.dataset.collapsed = "true";
    },

    toggle: function (target) {
        const select = this.getSelectedRoot(target);
        if (select.dataset.collapsed === "true") {
            this.open(select);
        } else {
            this.close(select);
        }
    },

    select: function (target) {
        const select = this.getSelectedRoot(target)
        const input = select.querySelector("input[type='hidden']")
        const selected = select.querySelector(".default-select__text")
        if (selected) {
            selected.textContent = target.textContent;
        }
        if (input) {
            input.value = target.dataset.value;
            input.dispatchEvent(new Event("change"));
        }
        this.close(select);
    },

    getValueLabel: function (target) {
        const select = this.getSelectedRoot(target);
        const selected = select.querySelector(".default-select__text")
        return selected.textContent;
    },

    getSelectedRoot: function (target) {
        let select = target;
        while (select != null) {
            if (select.className === "default-select") {
                break;
            }
            select = select.parentElement;
        }
        return select;
    },
}