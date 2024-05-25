if (!(window.ui instanceof Object)) {
    window.ui = {};
}

window.ui.dialog = {
    show: function(id) {
        document.querySelector(".header__menu-content").dataset.opened = "false";
        const dialog = document.querySelector(id);
        dialog.classList.add("global_block_scroll");
        dialog.show();
        const pages = dialog.querySelector(".modal__pages");
        pages.firstChild.scrollIntoView()
        dialog.addEventListener("close", this.onDialogClose);
    },

    onDialogClose: function (ev) {
        ev.target.classList.remove("global_block_scroll")
    },

    openPage: function (target, id) {
        const dialog = this.getRoot(target);
        const page = dialog.querySelector(id)
        if (!page) {
            return null;
        }
        page.scrollIntoView();
    },

    getRoot: function (target) {
        let dialog = target;
        while (dialog != null) {
            if (dialog.classList.contains("modal")) {
                break;
            }
            dialog = dialog.parentElement;
        }
        return dialog;
    }
}