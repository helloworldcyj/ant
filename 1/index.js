// 题⽬1 • 请实现find函数，使下列的代码调⽤正确。
// 约定：
// title数据类型为String
// userId为主键，数据类型为Number
var data = [
    { userId: 8, title: 'title1' },
    { userId: 11, title: 'other' },
    { userId: 15, title: null },
    { userId: 19, title: 'title2' }
];

function Finder(data) {
    if (!Array.isArray(data)) {
        throw new Error('不合法参数，仅支持数组类型');
    }
    this.data = data;
}

Finder.prototype.where = function (option) {
    this.setData(this.data.filter(item => {
        let result = true;
        for (let key in option) {
            if (result) {
                const target = item[key];
                const handler = option[key];
                switch (Object.prototype.toString.call(handler)) {
                    case '[object RegExp]':
                        result = handler.test(target);
                        break;
                }
            }
        }
        return result;
    }));
    return this;
}

Finder.prototype.orderBy = function (key, order) {
    if (order === 'desc' || order === 'asce') {
        this.setData(this.data.sort((itemA, itemB) => {
            return order === 'desc' ? itemB[key] - itemA[key] : itemA[key] - itemB[key];
        }));
    }
    return this.getData();
}

Finder.prototype.setData = function (data) {
    this.data = data;
}

Finder.prototype.getData = function () {
    return this.data;
}

var find = function (origin) {
    return new Finder(origin);
}
// 查找 data 中，符合条件的数据，并进⾏排序
var result = find(data).where({
    'title': /\d$/
}).orderBy('userId', 'desc');
console.log(result);// [{ userId: 19, title: 'title2'}, { userId: 8, title: 'title1' }];