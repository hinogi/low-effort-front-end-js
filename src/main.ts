import { Router } from "./router";


type Path = string;

interface Click {
    type: "router"|"submit"|"custom",
    goTo?: string,
    js?: string,
}

interface Element {
    type: "h1"|"p"|"button",
    text?: string,
    click?: Click
}

interface Page {
    title: string,
    content: Array<Element>
}

interface StartConfig {
    startPage: Path,
    anonymStatistics: boolean,
    pages: {
        [name: string]: Page
    }
}

export default class LowEffortFrontEnd {
    startConfig: StartConfig;

    constructor(startConfig: StartConfig) {
        this.startConfig = startConfig;

        console.log("Hello");

        new Router();
    }
}