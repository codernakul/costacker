import random as rnd

blocks = []
board = []

def print_board():
    for i in range(cols):
        for j in range(rows):
            print(board[j][i], end=" ")
        print()

def get_pos(row):
    itr = len(board[0]) - 1
    while(itr > -1):
        if(board[row][itr] == '-'):
            return itr
        itr = itr - 1
    return -1

def check(rows):
    sum = 0
    rows -= 1
    while(rows >= 0):
        row_set = set(board[rows])
        sum += len(row_set)
        rows -= 1
    if(sum == (colors * 2 + 1)):
        return True
    else:
        return False

def move():
    while(True):
        pick = int(input("Pick? "))
        fdash = get_pos(pick)
        if(fdash != cols-1):
            cnt = 1
            first_char = board[pick][fdash + 1]
            next_char_pos = fdash + 2
            while(next_char_pos < cols):
                if(first_char == board[pick][next_char_pos]):
                    cnt += 1
                else:
                    break
                next_char_pos += 1
            break
        else:
            continue
    
    while(True):
        drop = int(input("Drop? "))
        fdash = get_pos(drop)
        if(pick != drop and fdash >= cnt - 1 and (get_pos(drop)+1 == cols or board[drop][get_pos(drop)+1] == board[pick][get_pos(pick)+1])):
            swap(pick, drop, get_pos(pick)+1, get_pos(drop), cnt)
            print_board()
            break
        else:
            continue

def swap(pick, drop, pick_pos, drop_pos, cnt):
    while(cnt != 0):
        board[pick][pick_pos], board[drop][drop_pos] = board[drop][drop_pos], board[pick][pick_pos]
        cnt -= 1
        pick_pos += 1
        drop_pos -= 1

def generate():
    i = 65
    for _ in range(colors):
        blocks.extend(['-','-'] + [chr(i)] * colors)
        i = i + 1
    blocks.extend(['-'] * (colors + 2) )

def segregate():
    i = 0
    for _ in range(colors + 1):
        tmp = []
        cnt = 0
        for _ in range(colors + 2):
            if blocks[i] != '-':
                tmp.append(blocks[i])
                i = i + 1
            else:
                cnt = cnt + 1
                i = i + 1 
        tmp.extend(['-'] * cnt)
        board.append(tmp[::-1])

colors = int(input("Colors? "))
rows = colors + 1
cols = colors + 2
generate()
rnd.shuffle(blocks)
segregate()

print_board()
move()

turns = 1
while(True):
    turns += 1
    move()
    if(check(rows)):
        break

print("You solved in turn", turns)