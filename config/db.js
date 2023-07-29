const mongoose = require('mongoose');

module.exports = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true});
        console.log(`Database Connected ${conn.connection.host}`);
    } catch(err){
        console.log(err);
        res.send('Something went wrong! Database not connected.')
    }
}