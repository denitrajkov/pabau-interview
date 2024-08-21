type Direction = 'up' | 'down' | 'left' | 'right';
const directionsMap: Record<Direction, [number, number]> = {
    up: [-1, 0],
    down: [1, 0],
    left: [0, -1],
    right: [0, 1],
};

function findPath(matrix: string[][]): { path: string; letters: string } {
    let startRow = 0, startCol = 0;
    let direction: Direction = 'right';
    
    for (let i = 0; i < matrix.length; i++) {
        const startIdx = matrix[i].indexOf('>');
        if (startIdx !== -1) {
            startRow = i;
            startCol = startIdx;
            break;
        }
    }

    let path = '>';
    let letters = '';
    let row = startRow, col = startCol;

    while (true) {
        const [dRow, dCol] = directionsMap[direction];
        row += dRow;
        col += dCol;

        const currentChar = matrix[row]?.[col];
        if (currentChar === undefined) break; 

        if (currentChar === 's') {
            path += 's';
            break;
        } else if (currentChar >= 'A' && currentChar <= 'Z') {
            letters += currentChar;
            path += currentChar; 
        } else if (currentChar === '+') {
            path += '+'; 
            
            const upCell = matrix[row - 1]?.[col];
            const downCell = matrix[row + 1]?.[col];
            const leftCell = matrix[row]?.[col - 1];
            const rightCell = matrix[row]?.[col + 1];
            
            if (direction === 'up' || direction === 'down') {
                direction = leftCell !== undefined && leftCell !== ' ' ? 'left' : 'right';
            } else {
                direction = upCell !== undefined && upCell !== ' ' ? 'up' : 'down';
            }
        } else {
            path += currentChar; 
        }
    }

    return { path, letters };
}


const matrix = [
    ['>', '-', '-', '-', 'A', '-', '-', '-', '+'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
    ['s', '-', 'B', '-', '+', ' ', 'C', ' ', ' '],
    [' ', ' ', ' ', ' ', '|', ' ', '|', ' ', ' '],
    ['+', '-', '-', '-', '+', ' ', ' ', ' ', ' '],
];

const result = findPath(matrix);
console.log("Path:", result.path);     
console.log("Letters:", result.letters); 
