import * as clientService from "../services/clientService.js";

export const getClients = async (req, res) => {
    try {
        const clients = await clientService.getClients();
        res.status(200).json(clients);
    } catch (err) { 
        console.error('Error fetching clients:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const createClient = async (req, res) => {
    try {
        const clientData = req.body;
        const newClient = await clientService.createClient(clientData)
        res.status(200).json(newClient);
    } catch (err) { 
        console.error('Error fetching clients:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const updateClient = async (req, res) => {
    try {
        const clientId = req.params.id;
        const clientData = req.body;
        const updateClient = await clientService.updateClient(clientId, clientData);
        if(!updateClient){
            res.status(404).json({message: "client not found"});
        }
        res.status(200).json(updateClient);
        
    } catch (err) { 
        console.error('Error updating clients:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteClient = async (req,res) => {
    try {
        const clientID = req.params.id;
        const deleteClient = await clientService.deleteClient(clientID);
        if(!deleteClient){
            res.status(404).json({message: "client not found"});
        }
        res.status(200).send()
    } catch(err) {
        console.error('Error daleting clients:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const searchClients = async (req,res) => {
    try {
        const searchTerm = req.query.q;
        const client = await clientService.searchClients(searchTerm);
        res.status(200).json(client);
    } catch (err) {
        console.log('Error searching client', err);
        res.status(500).json({message:'Internal server error'})
    }
}