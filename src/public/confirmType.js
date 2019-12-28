App = {

    loading:false,

    render: async() => {
        if(App.loading) {
            return;
        }
        $('#account').html(App.account);
        await App.listUploaders();
        await App.listBidders();
        await App.listMyTenders();
    },

    listUploaders: async() => {
        const uploaderCount = await App.TenderAuction.uploaderCount();
        for(i=1; i <= uploaderCount; i++) {
            const uploaderAddress = await App.TenderAuction.whoIsUploader(i);
            const uploader = await App.TenderAuction.uploaders(uploaderAddress);
            const uploaderId = uploader[0].toNumber();
            const uploaderUsername = uploader[1];

            var uploaderCandidate = `<tr style="text-align:center">
                                        <td>${uploaderId}</td>
                                        <td>${uploaderUsername}</td>
                                        <td>${uploaderAddress}</td>
                                    </tr>`;

            $("#uploader").append(uploaderCandidate);

        }
    },

    listBidders: async() => {
        const bidderCount = await App.TenderAuction.bidderCount();
        for(i=1; i <= bidderCount; i++) {
            const bidderAddress = await App.TenderAuction.whoIsBidder(i);
            const bidder = await App.TenderAuction.bidders(bidderAddress);
            const bidderId = bidder[0].toNumber();
            const bidderUsername = bidder[1];

            var bidderCandidate = `<tr style="text-align:center">
                                        <td>${bidderId}</td>
                                        <td>${bidderUsername}</td>
                                        <td>${bidderAddress}</td>
                                    </tr>`;

            $("#bidder").append(bidderCandidate);

        }
    },

    createUploader: async () => {
        App.setLoading(true);
        const username = $("#username").text();
        try{
            await App.TenderAuction.createUploader(username, {from: App.account});
            location.href = '/createUploader?username='+username;
        }catch{
            window.location.reload();
        }
    },

    createBidder: async () => {
        App.setLoading(true);
        const username = $("#username").text();
        try{
            await App.TenderAuction.createBidder(username, {from: App.account});
            location.href = '/createBidder?username='+username;
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

function disableF5(e) { 
    if ((e.which || e.keyCode) == 116 || (e.which || e.keyCode) == 82) {
        if(App.loading == true) {
            e.preventDefault(); 
        }
    }
}


$(document).ready(function(){
    
    $(document).on("keydown", disableF5);
   
    window.onbeforeunload = function() {
        alert('hi there')
    }
    
});