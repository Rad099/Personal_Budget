const e = require('express');

const { addEnvelope, retrieveAll, retrieve, updateAmount, totalBudget, transferAmount } = require('./util');
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'personal_budget',
    password: 'Tech2Code!?',
    port: 5432,
});

// Get all users
const getUsers = (request, response) => {
    pool.query('SELECT * FROM user ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }

        response.status(200).json(results.rows);
    });

};

// get single user
const getUserById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM user WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }

        response.status(200).json(results.rows);
    });
};

//post user
const createUser = (request, response) => {
    const {name, email, budget} = request.body;

    pool.query('INSERT INTO user (name, email, budget) VALUES ($1, $2, $3) RETURNING *', [name, email, budget], (error, results) => {
        if (error) {
            throw error;
        }

        response.status(201).send(`user ${name, email} added with id ${results.rows[0].id} `);
    });
};

// Creates envelope for user. constraint: amount must be lower than user budget.
const createEnv = (request, response) => {
    const id = request.query.id;
    const name = request.query.name;
    const amount = request.query.amount;

    pool.query('INSERT INTO envelope (name, amount, user_id) VALUES ($1, $2, $3) RETURNING *', [name, amount, id], (error, results) => {
        if (error) {
            throw error;
        }

        response.status(201).send(`Envelope created: name: ${results.rows[0].name} amount: ${results.rows[0].amount}`);
    })
}

// retrieve envelope by name
const getEnv = (request, response) => {
    const name = request.params.name;
    const id = request.params.id;
    const amount = 0;

    pool.query('SELECT * FROM envelope WHERE name = $1 AND user_id = $2', [name, id], (error, results) => {
        if (error) {
            throw error;
        }

        
        response.status(200).json(results.rows);
    })

}

const getEnvByUser = (request, response) => {
    const user_id = parseInt(request.params.id);

    pool.query('SELECT * FROM envelope WHERE user_id = $1', [user_id], (error, results) => {
        if (error) {
            throw error;
        }
        
        response.status(200).json(results.rows);
    })



}

const updateEnvAmount = (request, response) => {
    const user_id = request.params.id;
    const name = request.params.name;
    const newAmount = request.params.amount;

    getEnv();

    const updatedAmount = 

    pool.query('UPDATE envelope SET amount = $1 WHERE user_id = $2 AND name = $3', [newAmount, user_id, name], (error, results) => {
        if (error) {
            throw error;
        }

        response.status(200).send(`modified envelope ${name} with new amount`);
    })
}


module.exports = {
    getUsers, createEnv, getEnv, getEnvByUser,
};