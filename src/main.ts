import { Router } from "./router";


export type Path = string;

export interface Click {
    type: "router"|"submit"|"custom",
    goTo?: string,
    js?: string,
}

export interface PageElement {
    type: "h1"|"p"|"button",
    text?: string,
    className?: string,
    click?: Click
}

export interface Page {
    title: string,
    content: Array<PageElement>
}

export interface StartConfig {
    startPage: Path,
    anonymStatistics: boolean,
    pages: {
        [name: string]: Page
    }
}

const default404: Page = {
    title: "404 Not Found",
    content: [
        {
            type: "h1",
            text: "404 - Not Found"
        },
        {
            type: "p",
            text: "This page was not found"
        }
    ]
}

export default class LowEffortFrontEnd {
    startConfig: StartConfig;

    constructor(startConfig: StartConfig) {
        console.log("Start Low Effort Front End - https://github.com/i5heu/low-effort-front-end-js");
        
        if(!startConfig.pages[404]){
            startConfig.pages[404] = default404;
        }
        
        this.startConfig = startConfig;

        new Router(startConfig);
    }
}