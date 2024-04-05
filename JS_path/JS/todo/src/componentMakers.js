export const createDomElement = (type, attributes, ...children) => {
    const el = document.createElement(type)

    for (let key in attributes) {
        el.setAttribute(key, attributes[key])
    }

    children.forEach(child => {
        if (!(child instanceof Element)) {
        el.appendChild(document.createTextNode(child))
        } else {
        el.appendChild(child)
        }
    })

    return el
}