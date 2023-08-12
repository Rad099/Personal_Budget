const express = require('express');
const app = express();


const { addEnvelope, retrieveAll, retrieve, updateAmount, totalBudget, transferAmount } = require('./back_end/util');
const db = require('./back_end/query');
//const { envelopes } = require('./back_end/envelopes');
const PORT = 3000;

app.use(express.static('back_end'));

app.get('/api/users', db.getUsers);
app.get('/api/env/:id/:name', db.getEnv);
app.get('/api/env/:id', db.getEnvByUser);
app.post('/api/env', db.createEnv);

// app.get() :name .... retrieve specific envelope
/* app.get('/api/env/:name', (req, res) => {
    const found = retrieve(req.params.name);
    if (!found) {
        res.status(404).send();
    } else {
        res.send(found);
    }
})

app.get('/api/total', (req, res) => {
    res.status(200).send(`${totalBudget.total}`);
})


// app.get() ....... retrieve all envelope info
app.get('/api/env', (req, res) => {
    const allEnv = retrieveAll();
    if (allEnv.length === 0) {
        res.send("No envelopes");
    } else {
        res.send(allEnv);
    }
})


// app.post() ...... create new envelope
app.post('/api/env', (req, res) => {
    const name = req.query.name;
    const amount = Number(req.query.amount);
    
    const verify = addEnvelope(name, amount);

    if (verify === 1) {
        res.send(`envelope created! total budget: ${totalBudget.total}`);
    } else {
        res.status(400).send(`Error creating envelope. Make sure you have unique name for envelope`);
    }
})

// transfer money in between envelopes
app.post('/api/transfer/:from/:to/:amount', (req, res) => {
    const from = req.params.from;
    const to = req.params.to;
    const t_amount = req.params.amount;

    const verify = transferAmount(from, to, t_amount);

    if (verify) {
        res.status(200).send(`Transfer complete`)
    } else {
        res.status(400).send(`could not find envelopes or not enough funds to transfer`);
    }

})



// app.put() ....... update enevelope budget amount
app.put('/api/env', (req, res) => {
    const {name, amount} = req.query;
    if (!name || !amount) {
        res.status(400).json({ error: 'Both "name" and "amount_used" query parameters are required.' });
    } else {
        const verify = updateAmount(name, amount);
        if (verify) {
            res.status(200).send(`envelope ${name} updated successfully`);
        } else {
            res.status(400).json("Could not find envelope to update")
        }

    }

})

// app.delete() .... delete envelope from data
*/


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})
