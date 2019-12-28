App = {
    
    loading:false,

    render: async () => {
        if(App.loading) {
            return;
        }
        $('#account').html(App.account);
        await App.listMyTenders();
    },

    listMyTenders: async () => {
        const tenderCount = await App.TenderAuction.tenderCount();
        for(i = 1; i <= tenderCount; i++) {
            const tender = await App.TenderAuction.tenders(i);
            if(tender[4] == App.account) {
                const tenderTemplate = `<tr style="text-align:center">
                                            <td>${tender[0]}</td>
                                            <td>${tender[1]}</td>
                                            <td>${tender[3]}</td>
                                        </tr>`;
                $("#mytenders").append(tenderTemplate);
            }
        }
    },

    submitTender: async () => {
        App.setLoading(true);
        const itemName = $("#itemName").val();
        const itemDesc = $("#itemDesc").val();
        const itemQuantity = $("#itemQuantity").val();

        try{
            await App.TenderAuction.createTender(itemName, itemDesc, itemQuantity, {from:App.account});
            window.location.reload();
        }catch{
            window.location.reload();
        }
    },

    setLoading: (boolean) => {
        App.loading = boolean;
        const loader = $('#loading');
        const content = $('#content');
        if(boolean) {
            loader.show();
            content.hide();
        }else {
            loader.hide();
            content.show();
        }
    }

}

function uploadTenders() {
    $("#tenderList").hide();
    $("#uploadTender").show();
}

function showTenders() {
    $("#tenderList").show();
    $("#uploadTender").hide();
}