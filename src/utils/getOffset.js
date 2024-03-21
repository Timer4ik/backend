module.exports = (page, limit) => {
    return page > 0 ? (page * limit) - limit : 0
}