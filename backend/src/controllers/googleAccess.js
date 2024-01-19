module.exports ={
    getAccessToken: function(code, callback){
        var data = {
            code: code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            grant_type: 'authorization_code'
        }
        request.post({
            url: 'https://www.googleapis.com/oauth2/v4/token',
            form: data
        }, function(err, response, body){
            if(err){
                callback(err, null);
            }else{
                callback(null, JSON.parse(body));
            }
        });
    }

}