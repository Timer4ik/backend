const { Enums } = require("../models/models")

const getFullInclude = (_extend, fullExt) => {
    // console.log(_extend);
    if (_extend.length == 1) {
        fullExt.include = {
            model: Enums[_extend[0]],
        }
        return
    }

    fullExt.include = {
        model: Enums[_extend[0]],
        include: {}
    }
    _extend.shift(1)

    return getFullInclude(_extend, fullExt.include)
}

module.exports = (_extend /*= "sub_categories.category,photos"*/) => {
    if (!_extend) {
        return []
    }
    let includeTree = []

    let _extends = _extend.split(",")

    _extends.forEach(item => {
        let fullExt = {}
        getFullInclude(item.split("."), fullExt)
        includeTree.push(fullExt)
    });

    return includeTree.map(item => ({ ...item.include })) 
}