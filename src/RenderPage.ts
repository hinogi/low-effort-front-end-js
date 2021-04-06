import { Type } from "../node_modules/typescript/lib/typescript";
import { PageElement, Page, StartConfig } from "./main";
import { Router } from "./router";

export class RenderPage {
    startConfig: StartConfig;
    hash: string
    dom: HTMLDivElement
    page: Page
    router: Router

    constructor(startConfig: StartConfig, hash: string, router: Router) {
        this.startConfig = startConfig;
        this.hash = hash;
        this.router = router;
        this.dom = <HTMLDivElement>document.getElementById("LowEffortFrontEnd");
        if (!this.dom) throw new Error("DOM has no element with ID 'LowEffortFrontEnd'")

        if (!this.checkIf404(hash))
            throw new Error("RenderPage cannot render a page that dose not exists");

        this.page = this.startConfig.pages[hash.replace("#", "")];

        this.render();
    }

    checkIf404(hash: string) {
        if (hash == "#404") return true;
        return !!this.startConfig.pages[hash.replace("#", "")];
    }

    render() {
        document.querySelector("title").innerText = this.page.title;

        //const fragment = new DocumentFragment();
        const fragment = document.createElement("div");

        for (const element of this.page.content) {
            fragment.appendChild(elementCreator.element(element, this.router));
        }

        this.dom.innerHTML = "";
        this.dom.appendChild(fragment);
    }
}


class elementCreator {
    static element(element: PageElement, router: Router) {
        const el = document.createElement(element.type);
        if (element.text) el.innerText = element.text;
        if (element.className) el.className = element.className;
        if (element.click) this.createClickListener(element, el, router);

        return el;
    }

    static createClickListener(element: PageElement, el: HTMLElement, router: Router) {

        let func: Function;

        switch (element.click.type) {
            case "custom":
                el.onclick = function (ev: PointerEvent) {
                    try {
                        eval(element.click.js);
                    } catch (error) {
                        console.error(error);
                    }
                }
                break;

            case "router":
                el.onclick = () => {
                    router.changePage(element.click.goTo);
                }
                break;

            default:
                break;
        }
    }
}