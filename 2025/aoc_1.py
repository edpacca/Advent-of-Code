from input1 import inputs
from test_input1 import test_input

# commands = test_input
commands = inputs

def parseRotation(inputStr: str) -> int:
    mod = 1 if inputStr[0] == "R" else -1 if inputStr[0] == "L" else 0
    return mod * int(inputStr[1:])

def calcRotation(current: int, rot: int) -> int:
    result = (current + rot) % 100
    return result if result >= 0 else 100 + result

def calcClicks(current: int, rot: int) -> int:
    new_abs_pos = current + rot
    if (new_abs_pos > 99):
        return new_abs_pos // 100
    elif (new_abs_pos <= 0):
        return abs(new_abs_pos // -100) + abs (current // rot)
    return 0

def  sum_all():
    abs_pos = 50
    for command in commands:
        rot = parseRotation(command)
        abs_pos += rot
    print("abs pos: ", abs_pos, "final pos: ", abs(abs_pos % 100))

def part1():
    start = 50
    current = start
    zero_counter = 0

    for command in commands:
        rot = parseRotation(command)
        current = calcRotation(current, rot)
        if current == 0:
            zero_counter += 1

    print(zero_counter)
    return current

def part2():
    start = 50
    current = start
    click_counter = 0

    for command in commands:
        rot = parseRotation(command)
        result = calcRotation(current, rot)
        clicks = calcClicks(current, rot)
        prev = current
        current = result
        click_counter += clicks
        print(f"{prev:<2} + {rot:<5} = ({prev + rot:<5}) {result:<5}  |   {clicks:<5} -> {click_counter}")

    print("current: ", current)
    print ("clicks: ", click_counter)

def main():
    part1()
    part2()
    sum_all()

if __name__ == "__main__":
    main()
