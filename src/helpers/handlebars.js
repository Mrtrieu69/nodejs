const Handlebars = require("handlebars")

module.exports = {
    sum: (a, b) => a + b,
    sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : "default"

        const icons = {
            default: "fas fa-sort",
            asc: "fas fa-sort-amount-up-alt",
            desc: "fas fa-sort-amount-up",
        }

        const types = {
            default: "desc",
            asc: "desc",
            desc: "asc",
        }

        const address = Handlebars.escapeExpression(`?_sort&column=${field}&type=${types[sortType]}`)

        const output = `
            <a href="${address}">
                <i class="${icons[sortType]}"></i>
            </a>
        `

        return new Handlebars.SafeString(output)
    }
}