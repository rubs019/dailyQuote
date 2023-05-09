import { createServer } from "http";
import {app} from "./app";

export default class Server {
    private server: any;
    constructor() {
        this.server = null;
    }

    createServer(config?: any) {
        if (!this.server) {
            if (config?.env) process.env.NODE_ENV = config.env
            this.server = createServer(app)
        }
        return this.server;
    }

    stopServer() {
        if (this.server !== null) {
            this.server.close();
            this.server = null;
        }
    }

    getServer() {
        return this.server;
    }
}