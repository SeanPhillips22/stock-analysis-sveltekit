export function formatCell(formatFunction, cellContent) {
    switch (formatFunction) {
        case 'symbol':
            return `<a sveltekit:prefetch href="/stocks/${cellContent.toLowerCase()}/">${cellContent}</a>`

        case 'abbreviate':
            return abbreviate(cellContent)

        default:
            break;
    }
}

export const dec0 = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
})

export const dec1 = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
})

export const dec2 = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
})

export const dec3 = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
})

export function abbreviate(value, noDec) {
    if (!value) return '-'

    let formatter = noDec ? dec0 : dec2

    let num = '-'
    if (value >= 1000000000) num = formatter.format(value / 1000000000) + 'B'
    else if (value >= 1000000) num = formatter.format(value / 1000000) + 'M'
    else if (value > 1000) num = formatter.format(value / 1000) + 'K'
    else if (value <= -1000000000) num = formatter.format(value / 1000000000) + 'B'
    else if (value <= -1000000) num = formatter.format(value / 1000000) + 'M'
    else if (value <= -1000) num = formatter.format(value / 1000) + 'K'
    else num = formatter.format(value)

    return num
}