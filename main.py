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
        # print(len(row_set))
        sum += len(row_set)
        rows -= 1
    if(sum == (colors * 2 + 1)):
        return True
    else:
        return False

def move():
    while(True):
        pick = int(input("Pick? "))
        # pick -= 1
        fdash = get_pos(pick)
        if(fdash != cols-1):
            cnt = 1
            # print("[]Pick dash pos: ", fdash)
            first_char = board[pick][fdash + 1]
            # first_char_pos = fdash + 1
            next_char_pos = fdash + 2
            while(next_char_pos < cols):
                if(first_char == board[pick][next_char_pos]):
                    cnt += 1
                else:
                    break
                next_char_pos += 1
            # print("[]Count: ", cnt)
            break
        else:
            continue
    
    while(True):
        drop = int(input("Drop? "))
        # drop -= 1
        fdash = get_pos(drop)
        # print("[]Drop dash pos: ", fdash)
        if(pick != drop and fdash >= cnt - 1 and (get_pos(drop)+1 == cols or board[drop][get_pos(drop)+1] == board[pick][get_pos(pick)+1])):
        # if(fdash >= cnt - 1):
            # print("Swap")

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
# colors = 4
rows = colors + 1
cols = colors + 2
generate()
print(blocks)
rnd.shuffle(blocks)
# print(blocks)
segregate()
# transpose()

# for empty
# board = [['-', '-', 'C', 'A', 'B', 'B'], ['-', '-', '-', '-', '-', '-'], ['-', 'D', 'B', 'C', 'C', 'D'], ['-', '-', '-', 'D', 'A', 'A'], ['-', '-', 'B', 'A', 'C', 'D']]

# for pick
# board = [['-', '-', 'C', 'B', 'B', 'A'], ['-', '-', '-', '-', '-', 'A'], ['-', '-', '-', 'C', 'C', 'A'], ['-', '-', 'D', 'B', 'A', 'C'], ['-', '-', 'D', 'D', 'D', 'B']]

# for pick
# board = [['-', '-', 'A', 'B', 'A'], ['-', '-', '-', '-', '-'], ['-', '-', '-', 'B', 'B'], ['-', 'C', 'A', 'C', 'C']]

# print(board) 
# print(board[0])
# print(len(board), len(board[0]))
print_board()
move()
# print(rows, cols)

turns = 1
while(True):
    turns += 1
    move()
    if(check(rows)):
        break

print("You solved in", turns)