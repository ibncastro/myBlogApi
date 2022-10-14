
const sum = require("./sum")

test('add a and b to equal 3', () => {
    expect(sum(1,2)).toBe(3);
})