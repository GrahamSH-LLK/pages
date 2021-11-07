import { readFile } from "fs/promises";
import { createServer } from "http";
class Server {
  constructor({ staticDir, port = 8000 }) {
    this.server = createServer(async function (req, res) {
      let url = staticDir + req.url;
      if (req.url == "/") url = staticDir + "index.html";
      try {
        let data = await readFile(url);
        res.writeHead(200);
        res.end(data);
      } catch {
        res.writeHead(404);
        try {
            let data = await readFile(staticDir + '404.html');
            res.end(data)
        } catch {
        res.end(`404`);
        }
      }
    });
    this.server.listen(port);
  }
}
new Server({ staticDir: "./static/", port: 2000 });
