const axios = require('axios');


function validate_0x(a) {
    return a.length == 42 && a[0] == '0'
}

function validate_evmos(a) {
    return a.length == 'evmos1xudvxzyszxmf6rh4kcv7htup25az84yln0e2dd'.length && a[0] == 'e'
}

const headers = {
    'Content-Type': 'application/json'
}

module.exports = async (req, res) => {
    // handle CORS preflight
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    const {body} = req;
    if (!body || !body.address || (!validate_0x(body.address) && !validate_evmos(body.address))) {
        res.status(500).send("invalid address");
        return;
    }

    axios.post(process.env.FAUCET_API, JSON.stringify({address: body.address, token: process.env.TOKEN}), {
        headers: headers
    }).then(r => {
        console.log(`posting ${address}`)
        res.status(200).send('success');
        return;
    }).catch(e => {
        console.error(`error ${e}`)
        res.status(500).send(e.message);
        return;
    })

}