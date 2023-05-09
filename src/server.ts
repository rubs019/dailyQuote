import { createServer, Server } from 'http';
import { app } from './app';

export default class AppServer {
	private server: Server | null;
	constructor() {
		this.server = null;
	}

	startServer(config?: { env: string }): Server {
		if (!this.server) {
			if (config?.env) process.env.NODE_ENV = config.env;
			this.server = createServer(app);
		}
		return this.server;
	}

	stopServer(): void {
		if (this.server !== null) {
			this.server.close();
			this.server = null;
		}
	}

	getServer(): Server | null {
		return this.server;
	}
}