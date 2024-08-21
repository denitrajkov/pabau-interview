var directionsMap = {
    up: [-1, 0],
    down: [1, 0],
    left: [0, -1],
    right: [0, 1],
};
function findPath(matrix) {
    var _a, _b, _c, _d, _e;
    var startRow = 0, startCol = 0;
    var direction = 'right';

    for (var i = 0; i < matrix.length; i++) {
        var startIdx = matrix[i].indexOf('>');
        if (startIdx !== -1) {
            startRow = i;
            startCol = startIdx;
            break;
        }
    }
    var path = '>';
    var letters = '';
    var row = startRow, col = startCol;
    while (true) {
        var _f = directionsMap[direction], dRow = _f[0], dCol = _f[1];
        row += dRow;
        col += dCol;
        var currentChar = (_a = matrix[row]) === null || _a === void 0 ? void 0 : _a[col];
        if (currentChar === undefined)
            break; 
        if (currentChar === 's') {
            path += 's';
            break;
        }
        else if (currentChar >= 'A' && currentChar <= 'Z') {
            letters += currentChar;
            path += currentChar; 
        }
        else if (currentChar === '+') {
            path += '+'; 
            
            var upCell = (_b = matrix[row - 1]) === null || _b === void 0 ? void 0 : _b[col];
            var downCell = (_c = matrix[row + 1]) === null || _c === void 0 ? void 0 : _c[col];
            var leftCell = (_d = matrix[row]) === null || _d === void 0 ? void 0 : _d[col - 1];
            var rightCell = (_e = matrix[row]) === null || _e === void 0 ? void 0 : _e[col + 1];
            if (direction === 'up' || direction === 'down') {
                direction = leftCell !== undefined && leftCell !== ' ' ? 'left' : 'right';
            }
            else {
                direction = upCell !== undefined && upCell !== ' ' ? 'up' : 'down';
            }
        }
        else {
            path += currentChar; 
        }
    }
    return { path: path, letters: letters };
}

var matrix = [
    ['>', '-', '-', '-', 'A', '-', '-', '-', '+'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
    ['s', '-', 'B', '-', '+', ' ', 'C', ' ', ' '],
    [' ', ' ', ' ', ' ', '|', ' ', '|', ' ', ' '],
    ['+', '-', '-', '-', '+', ' ', ' ', ' ', ' '],
];
var result = findPath(matrix);
console.log("Path:", result.path); 
console.log("Letters:", result.letters); 
