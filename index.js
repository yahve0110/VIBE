const next = require('next');
const { spawn } = require('child_process');
const express = require('express');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();
server.use(express.json());

app.prepare().then(() => {
  server.post('/api/predict', (req, res) => {
    const features = req.body.features;
    console.log('features', features);
  
    // Convert features to JSON string
    const featuresString = JSON.stringify(features);
  
    // Spawn the Python process
    const pythonProcess = spawn('python', ['vibe.py']);
  
    // Handle data from Python script
    let dataString = '';
  
    // Send features to Python script via stdin
    pythonProcess.stdin.write(featuresString);
    pythonProcess.stdin.end();
  
    pythonProcess.stdout.on('data', (data) => {
      dataString += data.toString();
    });
  
    pythonProcess.stdout.on('end', () => {
      try {
        const prediction = JSON.parse(dataString);
        res.status(200).json({ prediction });
      } catch (error) {
        console.error('Error parsing JSON from Python script:', error);
        res.status(500).send('Error during prediction');
      }
    });
  
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python error: ${data.toString()}`);
    });
  
    pythonProcess.on('error', (error) => {
      console.error(`Failed to start Python script: ${error}`);
      res.status(500).send('Error during prediction');
    });
  });

  server.all('*', (req, res) => handle(req, res));
  
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });  
})
