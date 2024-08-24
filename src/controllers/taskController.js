const fs = require('fs');
const path = require('path');

const processTask = async (req, res) => {
    try {
        const { user_id } = req.body;
        if (!user_id) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const logMessage = `${user_id}-task completed at-${new Date().toISOString()}\n`;
        const logFilePath = path.join(__dirname, "../../logFile", 'task.log');
        fs.appendFile(logFilePath, logMessage, (err) => {
            if (err) {
                console.error('Error writing to log file:', err);
                return res.status(500).json({ error: 'Failed to write to log file' });
            }
            res.status(200).json({ message: 'Task stored in a log file' });
        });

    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = processTask;
