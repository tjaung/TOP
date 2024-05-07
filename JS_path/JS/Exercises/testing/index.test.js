const mod = require('./index.js');
const capitalize = mod.capitalize

test('Capitalize should capitalize first char of a string', () => 
    expect(capitalize('two')).toMatch('Two')
)

test('Capitalize should capitalize first char of a string of words', () => 
    expect(capitalize('two to the power of three is 8')).toMatch('Two to the power of three is 8')
)

test('Capitalize should return error if not str', () => {
    expect(() => {
        capitalize(0);
    }).toThrow(/^Enter a string$/)
})


const reverseString = mod.reverseString

test("Reverse string should reverse 'ab' to 'ba'", () => 
    expect(reverseString('ab')).toMatch('ba')
)

test("Reverse string should reverse 'palindrome' to 'emordnilap'", () => 
    expect(reverseString('palindrome')).toMatch('emordnilap')
)
test("Reverse string should reverse 'racecar' to 'racecar'", () => 
    expect(reverseString('racecar')).toMatch('racecar')
)

test("Reverse string should reverse 'Racecar' to 'racecaR'", () => 
    expect(reverseString('Racecar')).toMatch('racecaR')
)
test('should throw if not a string', () => {
    expect(() => {
        reverseString(0);
    }).toThrow(/^Enter a string$/)
})


import Calculator from './Calculator.js'
const Calc = new Calculator()
it('should throw an Error if arguments are not nums', () => {
    expect(() => Calc.add('1', 2)).toThrowError('Values should be Numbers.')
    expect(() => Calc.subtract('1', 2)).toThrowError('Values should be Numbers.')
    expect(() => Calc.divide('1', 2)).toThrowError('Values should be Numbers.')
    expect(() => Calc.multiply('1', 2)).toThrowError('Values should be Numbers.')
})

test("should add to 2", () => 
    expect(Calc.add(1, 1)).toBe(2)
)
test("should subtract to 2", () => 
    expect(Calc.subtract(3, 1)).toBe(2)
)
test("should divide to 2", () => 
    expect(Calc.divide(4, 2)).toBe(2)
)
test("should multiply to 2", () => 
    expect(Calc.multiply(2, 1)).toBe(2)
)

const caesarCipher = mod.caesarCipher

it('text should be a str', () => {
    expect(() => caesarCipher(2, 2)).toThrowError('Value should be a string.')
})
it('shift should be a number', () => {
    expect(() => caesarCipher('2', '2')).toThrowError('Value should be a number.')
})

test("should be alphabet shifted 2", () => 
    expect(caesarCipher('abcdefghijklmnopqrstuvwxyz', 2)).toBe('CDEFGHIJKLMNOPQRSTUVWXYZAB')
)
test("should be alphabet shifted 12", () => 
    expect(caesarCipher('abcdefghijklmnopqrstuvwxyz', 12)).toBe('MNOPQRSTUVWXYZABCDEFGHIJKL')
)


test("should be 'This is a code' to 'FTUE UE M OAPQ'", () => 
    expect(caesarCipher('This is a code', 12)).toBe('FTUE UE M OAPQ')
)


const analyzeArray = mod.analyzeArray

it('all array elements should be numbers', () => {
    expect(() => analyzeArray(['2', '2'])).toThrowError('Should be array of all numbers.')
})

test(`should be obj of {average: 4,min: 1,max: 8,length: 6} `, () => 
    expect(analyzeArray([1,8,3,4,2,6]))
    .toMatchObject(
        {
            average: 4,
            min: 1,
            max: 8,
            length: 6
        }
))