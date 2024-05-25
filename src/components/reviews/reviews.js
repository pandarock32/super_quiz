if (!(window.ui instanceof Object)) {
    window.ui = {};
}

window.ui.reviews = {
    next: function (target) {
        const items = target.parentElement.querySelector(".reviews__items");
        if (!items) {
            return;
        }

        const firstChild = items.children[0];
        if (!firstChild) {
            return;
        }

        items.scrollBy(firstChild.getBoundingClientRect().width, 0)
    },

    prev: function (target) {
        const items = target.parentElement.querySelector(".reviews__items");
        if (!items) {
            return;
        }

        const firstChild = items.children[0];
        if (!firstChild) {
            return;
        }

        items.scrollBy(-1 * firstChild.getBoundingClientRect().width, 0)
    },
}