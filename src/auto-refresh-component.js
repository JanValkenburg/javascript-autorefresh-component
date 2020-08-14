class autoRefreshComponent {

    refreshElement = []
    isLoading = {};
    content = {};

    run() {
        setInterval(() => {
            if (document.visibilityState === 'visible') {
                this.startReload();
            } else {
                this.stopRefresh();
            }
        }, 500);
    }

    startReload() {
        if (this.refreshElement.length === 0) {
            this.refreshComponents()
        }
    }

    stopRefresh() {
        if (this.refreshElement.length > 0) {
            for (let i = 0; i < this.refreshElement.length; i++) {
                clearInterval(this.refreshElement[i])
            }
            this.refreshElement = []
        }
    }

    refreshComponents() {
        const components = document.querySelectorAll('[load-component]');
        for (let i = 0; i < components.length; i++) {
            const interval = components[i].getAttribute("refresh-interval");

            this.load(components[i]);

            if (interval) {
                let refreshElement = setInterval(() => {
                    if (false === components[i].matches(':hover')) {
                        this.load(components[i]);
                    }
                }, interval * 1000);
                this.refreshElement.push(refreshElement);
            }

        }
    }

    load(element) {
        let url = element.getAttribute("load-component");
        let scrollableContainer = element.getAttribute("scrollable-container");
        let xhttp = new XMLHttpRequest();
        let thisIsTop = this;
        let scrollTop = 0;
        if (scrollableContainer) {
            if (thisIsTop.content[url] !== undefined) {
                scrollTop = element.querySelector(scrollableContainer).scrollTop
            }
        }

        xhttp.onload = function () {
            if (thisIsTop.content[url] !== xhttp.responseText.length) {
                thisIsTop.content[url] = xhttp.responseText.length;
                element.innerHTML = xhttp.responseText;
                if (scrollTop) {
                    const scrollableElement = element.querySelector(scrollableContainer)
                    if (scrollableElement) {
                        scrollableElement.scrollTop = scrollTop
                    }
                }
            }
        }
        xhttp.onloadend = () => {
            this.isLoading[url] = false;
        }
        if (this.isLoading[url] === undefined || this.isLoading[url] === false) {
            this.isLoading[url] = true;
            xhttp.open("GET", url, true);
            xhttp.send();
        }
    }
}