const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: './blahsomething',
    db: 'codeialdevelopment',
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
    google_call_back_url: 'http://localhost:8000/users/auth/google/callback',
    jwt_secret: 'codRhEY6VMxIwgphDtDIzrxrPZSHd3p1lQbeial'
}

const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: 'codeialproductions',
    smtp: {
          // service : 'gmail',
        host : 'smtp.gmail.com',//smtp.gmail.com
        port: '587',
        secure: false,//two factor authentication
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME, // generated ethereal user
            pass: process.env.CODEIAL_GMAIL_PASSWORD, // generated ethereal password
        }
    },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET
}
module.exports = development;
// module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == null ? development : eval(process.env.CODEIAL_ENVIRONMENT);
