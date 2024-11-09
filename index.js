const next = require('next');
const { spawn } = require('child_process');
const express = require('express');
const morgan = require('morgan');
const winston = require('winston');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();
server.use(express.json());
server.use('/pictures', express.static('pictures'));

// Morgan for HTTP request logging with a custom format
server.use(morgan(':method :url :status :response-time ms - :res[content-length]'));

// Winston pretty logger setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),  // Enable colors
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      let log = `[${timestamp}] ${level}: ${message}`;
      if (Object.keys(meta).length) {
        log += ` ${JSON.stringify(meta)}`;
      }
      return log;
    })
  ),
  transports: [
    new winston.transports.Console(),  // Pretty logging to console
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

console.log('NODE ENV:', dev);
console.log('NODE ENV:', process.env.NODE_ENV);

app.prepare().then(() => {
  server.post('/api/predict', (req, res) => {
    const features = req.body.features;
    logger.info('Received features', { features });

    const featuresString = JSON.stringify(features);
    const pythonProcess = spawn('python', ['vibe3.py']);
    let dataString = '';

    pythonProcess.stdin.write(featuresString);
    pythonProcess.stdin.end();

    pythonProcess.stdout.on('data', (data) => {
      dataString += data.toString();
    });

    pythonProcess.stdout.on('end', () => {
      try {
        const prediction = JSON.parse(dataString);
        logger.info('Prediction response', { prediction });
        res.status(200).json({ prediction });
      } catch (error) {
        logger.error('Error parsing JSON from Python script', { error });
        res.status(500).send('Error during prediction');
      }
    });

    pythonProcess.stderr.on('data', (data) => {
      logger.error(`Python error: ${data.toString()}`);
    });

    pythonProcess.on('error', (error) => {
      logger.error('Failed to start Python script', { error });
      res.status(500).send('Error during prediction');
    });
  });

  server.all('*', (req, res) => handle(req, res));

  server.listen(3000, (err) => {
    if (err) {
      logger.error('Server startup error', { error: err });
      throw err;
    }
    logger.info('> Ready on http://localhost:3000');
  });
});
