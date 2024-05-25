document.querySelectorAll(".header__nav-menu-option")
    .forEach(item => {

        item.addEventListener("click", () => {
            document.querySelector(".header__menu-content").dataset.opened ="false";

            /*
            setTimeout(()=>{
                document.querySelector(`#${item.href.split("#")[1]}`).scrollIntoView();
            }, 500)*/
        })

        const links = item.querySelectorAll("a");
        for (const link of links) {
            if (link.href === window.location.href) {
                item.classList.add("header__nav-menu-option_selected");
                break;
            }
        }
    });

window.addEventListener("hashchange", (ev)=> {
    if (!ev.newURL.includes("#")) {
        return
    }

    const newURL = ev.newURL.split("#").reduceRight((prev) => prev)

    document.querySelectorAll(`.header__nav-menu-option_selected`)
        .forEach(item => {
            item.classList.remove("header__nav-menu-option_selected");
        })

    document.querySelector(`.header__nav-menu-option:has([href='#${newURL}'])`)
        .classList.add("header__nav-menu-option_selected");
})


document.querySelectorAll(".header__nav-menu-option-list-dropdown")
    .forEach(item => {
        item.style.setProperty("--content-max-height", `${item.scrollHeight}px`)
    });

document.querySelectorAll(".menu-button")
    .forEach(item => {
        item.addEventListener("click", ()=>{
            const menu = document.querySelector(".header__menu-content");
            if (menu) {
                if (menu.dataset.opened === "true") {
                    menu.dataset.opened = menu.dataset.opened = "false";
                    item.classList.remove("header__menu-button_close");
                } else {
                    item.classList.add("header__menu-button_close");
                    menu.dataset.opened = menu.dataset.opened = "true";
                }
            }
        })
    })