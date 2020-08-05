class autoRefreshComponent {
    refreshElement = []

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
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.status >= 200 && this.status < 300) {
                element.innerHTML = xhttp.responseText;
            }
        }
        xhttp.open("GET", url, true);
        xhttp.send();
    }
}