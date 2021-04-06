import { StartConfig } from "./main";
import { RenderPage } from "./RenderPage";

export class Router {
    startConfig: StartConfig;

    constructor(startConfig: StartConfig) {
        this.startConfig = startConfig;

        if (!this.hash || this.hash == "") {
            this.hash = startConfig.startPage;
        }


        //TODO get 404

        window.addEventListener("hashchange", () => {
            if (this.checkIf404(location.hash)) {
                this.initRenderPage(location.hash);
                return;
            }

            this.hash = "#404";
            this.initRenderPage(location.hash);
        });

        this.initRenderPage(location.hash);
    }

    public changePage(newHash: string) {
        if (this.checkIf404(newHash)) {
            this.initRenderPage(newHash);
            return;
        }

        this.hash = "#404";
        this.initRenderPage(location.hash);
    }

    public checkIf404(hash: string) {
        if (hash == "#404") return true;
        return !!this.startConfig.pages[hash.replace("#", "")];
    }

    private initRenderPage(hash: string) {
        console.log("hash change")
        new RenderPage(this.startConfig, hash, this);
    }

    get hash() {
        return location.hash
    }

    set hash(newHash) {
        if (!this.checkIf404(newHash))
            newHash = "#404";

        if (history.pushState) {
            history.pushState(null, null, newHash);
        }
        else {
            location.hash = newHash;
        }
    }
}