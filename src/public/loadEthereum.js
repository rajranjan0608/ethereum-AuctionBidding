Default = {

    contracts : {},

    load: async () => {
        await Default.loadWeb3();
        await Default.loadAccount(); 
        await Default.loadContract();
        await App.render();
    },

    loadWeb3: async () => {
        if(typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
            App.web3Provider = web3.currentProvider;
        }else {
            window.alert("Please connect to Metamask");
        }

        if(window.ethereum) {
            window.web3 = new Web3(ethereum);
            try {
                await ethereum.enable();
                web3.eth.sendTransaction({ });
            }catch (error) {

            }
        }else if(window.web3) {
            App.web3Provider = web3.currentProvider;
            window.web3 = new Web3(web3.currentProvider);
            web3.eth.sendTransaction({});
        }else{
            console.log('Non-Ethereum Browser detected');
        }
    },

    loadAccount: async() => {
        await web3.eth.getAccounts().then((result)=>{
            App.account = result[0];
        });
    },

    loadContract: async () => {
        const TenderAuction = await $.getJSON('/tenderJSON');
        Default.contracts.TenderAuction = TruffleContract(TenderAuction);
        Default.contracts.TenderAuction.setProvider(App.web3Provider);
        
        App.TenderAuction = await Default.contracts.TenderAuction.deployed();
    }
}

$(() => {
    window.addEventListener('load', ()=>{
        Default.load();
    })
});