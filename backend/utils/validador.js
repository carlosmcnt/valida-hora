const crypto = require('crypto-js');
require('dotenv').config();

function criptografarSenha(senha) {
    const cifra = crypto.AES.encrypt(senha, process.env.SECRET);
    return cifra.toString();
}

function descriptografarSenha(senha) {
    const cifra = crypto.AES.decrypt(senha, process.env.SECRET);
    const senhaDescriptografada = cifra.toString(crypto.enc.Utf8);
    return senhaDescriptografada;
}

module.exports = { criptografarSenha, descriptografarSenha };