colors = 4;
rows = colors + 1;
cols = colors + 2;

turn = 0;

ublocks = ['-', '-', 'A', 'A', 'A', 'A', '-', '-', 'B', 'B', 'B', 'B', '-', '-', 'C', 'C', 'C', 'C', '-', '-', 'D', 'D', 'D', 'D', '-', '-', '-', '-', '-', '-'];

let blocks = ublocks.map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value)
board = []

function getPos(rowNo) {
    itr = cols;
    while (itr > -1) {
        if (board[rowNo][itr] == "-")
            return itr
        --itr;
    }
    return -1;
}

function segregate() {
    k = 0;
    for (let i = 0; i < rows; i++) {
        tmp = []
        cnt = 0
        for (let j = 0; j < cols; j++) {
            if (blocks[k] != "-") {
                tmp.push(blocks[k]);
                ++k;
            }
            else {
                ++cnt;
                ++k;
            }
        }
        while (cnt != 0) {
            tmp.push("-");
            --cnt;
        }
        board.push(tmp.reverse());
    }
}

segregate();
console.log(board);

pickX = 0;
pickY = 0;
dropX = 0;
dropY = 0;

var audio = new Audio('swipe.wav');

block_colors = {
    A: "green",
    B: "red",
    C: "blue",
    D: "yellow",
    "-": "gray"
};

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

function drawBlock(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 50, 50);
}

function pick(event) {
    pickX = event.clientX;
    pickY = event.clientY;
    document.getElementById('para').textContent = "Pick: " + pickX + "," + pickY;
}

function drop(event) {
    ++turn;
    dropX = event.clientX;
    dropY = event.clientY;
    document.getElementById('para').textContent = document.getElementById('para').textContent + "; Drop: " + dropX + "," + dropY + "; Turn: " + turn;

    // for (let i = 0; i < 6; i++) {
    //     temp = board[Math.floor(dropX / 62)][i];
    //     board[Math.floor(dropX / 62)][i] = board[Math.floor(pickX / 62)][i];
    //     board[Math.floor(pickX / 62)][i] = temp;
    // }
    // drawBoard();
    pickX = Math.floor(pickX / 62);
    dropX = Math.floor(dropX / 62);
    fdash = getPos(pickX);
    cnt = 0

    if (fdash != cols - 1) {
        cnt = 1
        first_char = board[pickX][fdash + 1]
        next_char_pos = fdash + 2
        while (next_char_pos < cols) {
            if (first_char == board[pickX][next_char_pos])
                cnt += 1
            else
                break;
            next_char_pos += 1
        }
    }

    fdash = getPos(dropX)
    if (pickX != dropX && fdash >= cnt - 1 && (getPos(dropX) + 1 == cols || board[dropX][getPos(dropX) + 1] == board[pickX][getPos(pickX) + 1]))
        swap(pickX, dropX, getPos(pickX) + 1, getPos(dropX), cnt)
    // audio.play();
    drawBoard();
    if(check(rows))
        alert("7 crore");
}

function swap(pick, drop, pick_pos, drop_pos, cnt) {
    while (cnt != 0) {
        temp = board[drop][drop_pos];
        board[drop][drop_pos] = board[pick][pick_pos];
        board[pick][pick_pos] = temp;
        --cnt;
        ++pick_pos;
        --drop_pos;
    }
}

function check(rows) {
    sum = 0
    rows = rows - 1
    while (rows >= 0) {
        row_set = new Set(board[rows]);
        sum += row_set.size;
        --rows;
    }
    console.log(sum);
    if (sum == (colors * 2 + 1))
        return 1;
    else
        return 0;
}
function drawBoard() {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 6; j++) {
            drawBlock((55 * i + 5), (55 * j + 5), block_colors[board[i][j]])
        }
    }
}

document.addEventListener("mousedown", pick);
// document.addEventListener("touchstart", pick);
document.addEventListener("mouseup", drop);
// document.addEventListener("touchend", drop);
drawBoard();
