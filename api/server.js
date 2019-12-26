import express from 'express'
import Hubs from '../data/hubs-model';
  
const server = express();
server.use(express.json());// does the same thing as body-parser

server.get('/', async (req, res) => {
    res.send(`
        <h2>Chingsley Hubs API</h2>
        <p>Welcome to the Chingsley Hubs API</p>
    `);
});

server.get('/api/hubs', async (req, res) => {
    try {
        const hubs = await Hubs.find(req.query);
        res.status(200).json(hubs);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving the hubs',
        });
    }
}); 

server.get('/api/hubs/:id', async (req, res) => {
    try {
        const hub = await Hubs.findById(req.params.id);
        if (hub) {
            res.status(200).json(hub);
        } else {
            res.status(404).json({ message: 'Hub not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving the hub',
        });
    }
});

server.post('/api/hubs', async (req, res) => {
    try {
        const hub = await Hubs.add(req.body);
        res.status(201).json(hub);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error adding the hub',
        });
    }
});

server.delete('/api/hubs/:id', async (req, res) => {
    try {
        const deletedHub = await Hubs.remove(req.params.id);
        if (deletedHub) {
            res.status(200).json({ message: 'The hub has been nuked' });
        } else {
            res.status(404).json({ message: 'The hub could not be found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'An Error occured. Hub could not be deleted.'
        });
    }
});


server.put('/api/hubs/:id', async (req, res) => {
    try {
        const hub = await Hubs.update(req.params.id, req.body);
        if (hub) {
            res.status(200).json(hub);
        } else {
            res.status(404).json({ message: `Hub not found; no hub matches the id of ${req.params.id}` });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating the hub' });
    }
});


export default server;
