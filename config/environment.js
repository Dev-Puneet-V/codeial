const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: './blahsomething',
    db: 'codeial_development',
    smtp: {
          // service : 'gmail',
        host : 'smtp.gmail.com',//smtp.gmail.com
        port: '587',
        secure: false,//two factor authentication
        auth: {
            user: 'testcodeial', // generated ethereal user
            pass: 'testcodeial@123', // generated ethereal password
        }
    },
    google_client_id: '1016752488714-06o28abvpi1anfftg71ilkek4fmabtlf.apps.googleusercontent.com',
    google_client_secret: 'jVOGcDgyUF9q59PxiQBIsj6H',
    google_callback_url: 'http://localhost:8000/users/auth/google/callback',
    jwt_secret: 'codeial'
}

const production = {
    name: 'production'
}


module.exports = development;