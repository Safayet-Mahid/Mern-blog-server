
// need to pass an array of all intrests of all user 
const getAllIntrests = (arr) => {
    let newArr = []
    for (let el of arr) {

        el.intrests.length > 0 && el.intrests.map(o => !newArr.includes(o) && o !== undefined && newArr.push(o))
    }
    return newArr
}

module.exports = getAllIntrests