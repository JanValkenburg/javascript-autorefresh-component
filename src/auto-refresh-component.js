class autoRefreshComponent {

    refreshElement = []
    isLoading = {};

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
        // let name = element.getAttribute('name');
        let url = element.getAttribute("load-component");
        let scrollableContainer = element.getAttribute("scrollable-container");
        let xhttp = new XMLHttpRequest();
        let thisIsTop = this;
        // let selector = null;
        let scrollTop = 0;
        if (scrollableContainer) {
            if (thisIsTop.content[url] !== undefined) {
                // selector = '[name="' + name + '"] ' + scrollableContainer;
                scrollTop = element.querySelector(scrollableContainer).scrollTop
            }
        }

        xhttp.onreadystatechange = function () {
            if (this.status >= 200 && this.status < 300) {
                if (thisIsTop.content[url] !== xhttp.responseText) {
                    thisIsTop.content[url] = xhttp.responseText;
                    element.innerHTML = xhttp.responseText;
                    if (scrollTop) {
                        const scrollableElement = element.querySelector(scrollableContainer)
                        if (scrollableElement) {
                            scrollableElement.scrollTop = scrollTop
                        }
                    }
                } else {
                    console.log('no');
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