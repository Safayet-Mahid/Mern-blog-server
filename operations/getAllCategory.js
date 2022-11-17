// need to pass an array of all category of all blogs
const getAllCategory = (arr) => {
    let newArr = []
    for (let el of arr) {

        el.category.length > 0 && el.category.map(o => !newArr.includes(o) && o !== undefined && newArr.push(o))
    }
    return newArr
}

module.exports = getAllCategory