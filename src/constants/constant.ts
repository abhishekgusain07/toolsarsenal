export const Position = [
    '0rem 6rem 6rem 0rem',
    '0rem 3rem 6rem',
    '0rem 0rem 6rem 6rem ',
    '3rem 6rem 3rem 0rem ',
    '3rem',
    '3rem 0rem 3rem 6rem',
    '6rem 6rem 0rem 0rem',
    '6rem 3rem 0rem',
    '6rem 0rem 0rem 6rem'
]



export const Position2 = [
    (value: number) => `0rem ${2*value}rem ${2*value}rem 0rem`,
    (value: number) => `0rem ${value}rem ${2*value}rem`,
    (value: number) => `0rem 0rem ${2*value}rem ${2*value}rem`,
    (value: number) => `${value}rem ${2*value}rem ${value}rem 0rem`,
    (value: number) => `${value}rem`,
    (value: number) => `${value}rem 0rem ${value}rem ${2*value}rem`,
    (value: number) => `${2*value}rem ${2*value}rem 0rem 0rem`,
    (value: number) => `${2*value}rem 0rem 0rem ${2*value}rem`,
    (value: number) => `${2*value}rem 0rem 0rem ${2*value}rem`
]
