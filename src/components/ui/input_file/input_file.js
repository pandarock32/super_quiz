if (!(window.ui instanceof Object)) {
    window.ui = {}
}

window.ui.input_file = {
    label_class: ".file-input__placeholder",
    warning_class: ".file-input__warning",
    warning_text_class: ".file-input__warning-text",
    warning_show_class: "file-input__warning_showed",

    onChange: function (target) {
        const root = this.getRoot(target);
        const label = root.querySelector(this.label_class);

        if (target.files.length === 0) {
            label.textContent = "Приложить файлы";
            return
        }

        let labelText = "";
        for (const file of target.files) {
            if (!this.checkMaxFileSize(target, file) || !this.checkAccept(target, file)) {
                return;
            }
            labelText += ", " + file.name;
        }

        label.textContent = labelText.substring(2);
    },

    checkMaxFileSize(target, file) {
        const root = this.getRoot(target);
        const warning = root.querySelector(this.warning_class)
        const warningText = warning.querySelector(this.warning_text_class)

        if (!target.dataset.maxSize) {
            target.dataset.maxSize = 10 * 1024 * 1024;
        }

        if (file.size > Number(target.dataset.maxSize)) {
            warningText.textContent = `Файл превышает максимальный размер (${target.dataset.maxSize} байт)`;
            warning.classList.add(this.warning_show_class);
            return false;
        }
        return true;
    },

    checkAccept(target, file) {
        const root = this.getRoot(target);
        const warning = root.querySelector(this.warning_class)
        const warningText = warning.querySelector(this.warning_text_class)

        if (!target.dataset.accept) {
            target.dataset.accept = ".png.jpeg";
        }

        const accepted = target.dataset.accept.split(".")
        const extension = file.name.split(".").reduceRight((prev, curr) => prev);

        if (!accepted.includes(extension)) {
            warningText.textContent = `Файл имеет не допустимое расширение: (${extension})`;
            warning.classList.add(this.warning_show_class);
            return false;
        }

        return true;
    },

    getRoot(target) {
        let select = target;
        while (select != null) {
            if (select.classList.contains("file-input")) {
                break;
            }
            select = select.parentElement;
        }
        return select;
    }
}