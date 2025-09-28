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
var rect = canvas.getBoundingClientRect();

function drawBlock(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 50, 50);
}

function pick(event) {
    pickX = event.offsetX;
    pickY = event.offsetY;
    document.getElementById('para').textContent = "Pick: " + pickX + "," + pickY;
}

function pickTouch(event) {
    pickX = Math.floor(event.touches[0].clientX - rect.left);
    pickY = Math.floor(event.touches[0].clientY - rect.top);
    document.getElementById('para').textContent = "Pick: " + pickX + "," + pickY;
}

function drop(event) {
    ++turn;
    if (event.offsetX > 0) {
        dropX = event.offsetX;
        dropY = event.offsetY;
    }
    else {
        dropX = Math.floor(event.changedTouches[0].clientX - rect.left);
        dropY = Math.floor(event.changedTouches[0].clientY - rect.top);
    }
    document.getElementById('para').textContent = document.getElementById('para').textContent + "; Drop: " + dropX + "," + dropY + "; Turn: " + turn;

    pickX = Math.floor(pickX / 55);
    dropX = Math.floor(dropX / 55);
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
    if (check(rows)) {
        win();
    }
}

function win() {
    end = Math.floor((new Date()).getTime() / 1000);
    time = end - start;
    document.getElementById('para').textContent = "You solved on " + turn + " turn, in " + time + " seconds.";
    // alert("You won on" + turn + "turn, in " + time + "seconds.");
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
    // console.log(sum);
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
document.addEventListener("touchstart", pickTouch);
document.addEventListener("mouseup", drop);
document.addEventListener("touchend", drop);
drawBoard();
start = Math.floor((new Date()).getTime() / 1000)
