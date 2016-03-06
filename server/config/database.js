var url;
if (process.env.NODE_ENV == 'test')
    url = "mongodb://localhost/no-more-time-clashTest"
else
    url = "mongodb://localhost/no-more-time-clashDev"

module.exports = {
    url: url
};

