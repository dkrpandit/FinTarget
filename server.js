const cluster = require('cluster');
const app = require("./src/app")

const PORT = process.env.PORT || 3000;
if (cluster.isPrimary) {
    for (let i = 0; i < 2; i++) {
        cluster.fork();
    }
} else {
    app.listen(PORT, () => {
        console.log(`[INFO] Server (PID: ${process.pid}) is listening on port ${PORT}`);
    });
}