window.onload = function() {
    fetchBanks();

    document.getElementById("verificationForm").addEventListener("submit", function(event) {
        event.preventDefault(); 

        let accountNumber = document.getElementById("accountNumberInput").value;
        let bankCode = document.getElementById("bankSelect").value;

        verifyAccount(accountNumber, bankCode);
    });
};

function fetchBanks() {
    let url = "https://api.paystack.co/bank";

    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.setRequestHeader("Authorization", "Bearer sk_test_c20244ee0c718aef3527dbe7c73bab0f024e56e6");
    xhr.send();

    xhr.onload = function() {
        if (xhr.status === 200) {
            let banks = JSON.parse(xhr.responseText).data;
            populateBankOptions(banks);
        } else {
            console.error("Error fetching banks:", xhr.status, xhr.statusText);
        }

    };
}

function populateBankOptions(banks) {
    let bankSelect = document.getElementById("bankSelect");
    banks.forEach(function(bank) {
        let option = document.createElement("option");
        option.value = bank.code;
        option.textContent = bank.name;
        bankSelect.appendChild(option);
    });
}

function verifyAccount(accountNumber, bankCode) {
    let url = `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`;

    let xhr = new XMLHttpRequest();
    
    xhr.open("GET", url);
    xhr.setRequestHeader("Authorization", "Bearer sk_test_c20244ee0c718aef3527dbe7c73bab0f024e56e6");
    xhr.send();

    xhr.onload = function() {
        if (xhr.status === 200) {
            let result = JSON.parse(xhr.responseText);
            displayAccountDetails(result);
        } else {
            console.error("Error verifying account:", xhr.status, xhr.statusText);
        }
    };
}

function displayAccountDetails(accountDetails) {
    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
        <h2>Your Account Name is:</h2>
        <p>${accountDetails.data.account_name}</p>
       
    `;
}
