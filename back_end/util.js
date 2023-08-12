const { envelopes } = require('./envelopes');
let totalBudget = {total: 0};
let numEnv = 0;

function addEnvelope(newName, newAmount) {
    const dup = envelopes.some(env => env.name === newName);
    if (dup) {
        return 0;
    }

    const newEnv = {name: newName, amount: newAmount};
   
    envelopes.push(newEnv);
    numEnv += 1;
    totalBudget.total += newAmount;
    return 1;
};

function retrieveAll() {
   return envelopes;
};

function retrieve(name) {
    const foundEnv = envelopes.find(e => e.name === name);
    if (typeof foundEnv === 'undefined') {
        return {};
    }

    return foundEnv;
}

function updateAmount(curr_amount, amount_used) {
    envToUpdate.amount -= amount_used;
    totalBudget.total -= amount_used;
    return 1;
}

function transferAmount(from, to, t_amount) {
    const fromEnv = envelopes.find(e => e.name === from);
    const toEnv = envelopes.find(e => e.name === to);

    if (typeof fromEnv === 'undefined' || typeof toEnv === 'undefined') {
        return 0;
    }

    if (fromEnv.amount < t_amount) {
        return 0;
    }

    fromEnv.amount -= Number(t_amount);
    toEnv.amount += Number(t_amount);
    return 1;

}

module.exports = {
    addEnvelope, retrieveAll, retrieve, updateAmount, totalBudget, transferAmount,
};
