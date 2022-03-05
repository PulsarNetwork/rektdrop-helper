const axios = require('axios');

const faucetApi = 'https://rektdrop-helper.vercel.app/api/faucet';

var posted = {}

function validate_0x(a) {
    return a.length == 42 && a[0] == '0'
}

function validate_evmos(a) {
    return a.length == 'evmos1xudvxzyszxmf6rh4kcv7htup25az84yln0e2dd'.length && a[0] == 'e'
}

function setError(msg) {
    document.getElementById("errorMsg").innerHTML = "error: " + msg
}

function hideError() {
    document.getElementById("errorMsg").innerHTML = ''
}

function setSuccess(msg) {
    document.getElementById("successMsg").innerHTML =  msg
}

function hideSuccess() {
    document.getElementById("successMsg").innerHTML = ''
}

const headers = {
    'Content-Type': 'application/json'
  }

window.submitAddress = () => {
    var address = document.getElementById("address").value;
    address = address.replace(/\s+/g, '');
    
    hideError();
    hideSuccess();

    if (address.length == 0) {
        setError('empty address');
        return;
    }


    if (!validate_0x(address) && !validate_evmos(address)) {
        setError('invalid address');
        return;
    }

    axios.post('https://claimable.evmos.dev/getclaimable', JSON.stringify({address: address}), {
        headers: headers
    }).then(res => {
        var error = res.data.error;
        if (error.length > 0) {
            setError(error);
            return;
        }
        var claimable = res.data.claimable;
        if (claimable == "0") {
            setError('the address is not eligible');
            return;
        }

        if (posted[address]) {
            setError('already claimed for this address')
            return;
        }

        console.log('post address', address)
        axios.post(faucetApi, JSON.stringify({address: address}), {headers: headers}).then(r => {
            setSuccess(`claim success. visit <a href="https://www.mintscan.io/evmos/account/${res.data.address}">blockchain explorer</a> to see transaction status`)
            posted[address] = true
        }).catch(e => {
            setError(e.message)
        })

    }).catch(e => {
        setError(e.message)
    })
}
