import { Router } from "./router";


export type Path = string;

export type Click = {
    type: "router"|"submit"|"custom",
    goTo?: string,
    js?: string,
}

export type PageElement = {
    type: "h1"|"p"|"button",
    text?: string,
    className?: string,
    click?: Click
}

export type Page = {
    title: string,
    content: Array<PageElement>
}

export type StartConfig = {
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
    constructor(private startConfig: StartConfig, private Router) {
        console.log("Start Low Effort Front End - https://github.com/i5heu/low-effort-front-end-js");
        
        if(!startConfig.pages[404]){
            startConfig.pages[404] = default404;
        }
    }
}
