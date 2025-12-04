from inputs.input4 import inputs
from inputs.test_input4 import test_inputs
import re

from timeit import timeit

data = inputs
# data = test_inputs

def parse_to_grid(input_data: list[str]) -> list[list[str]]:
    return [[char for char in row] for row in input_data]


def point_in_grid(grid: list[list[str]], x: int, y: int) -> bool:
    if x < 0 or y < 0:
        return False
    if y >= len(grid):
        return False
    if x >= len(grid[y]):
        return False
    return True


def surrounding_vals(grid: list[list[str]], point_x: int, point_y: int) -> str:
    surroundings = ""
    for x in range(-1, 2):
        for y in range(-1, 2):
            if x == 0 and y == 0:
                continue
            coord_x = point_x + x
            coord_y = point_y + y
            if point_in_grid(grid, coord_x, coord_y):
                surroundings += grid[coord_y][coord_x]
    return surroundings


def check_and_remove(grid: list[list[str]]) -> tuple[int, list[list[str]]]:
    valid_spaces = 0
    min_surrounding_rolls = 4

    row_len = len(grid[0])
    col_len = len(grid)

    for x in range(row_len):
        for y in range(col_len):
            if grid[y][x] == "@":
                surroundings = surrounding_vals(grid, x, y)
                matches = len(re.findall("@", surroundings))
                if matches < min_surrounding_rolls:
                    valid_spaces += 1
                    grid[y][x] = "."

    return (valid_spaces, grid)


@timeit
def part1(data: list[str]) -> int:
    grid = parse_to_grid(data)
    valid_spaces = 0
    min_surrounding_rolls = 4

    row_len = len(grid[0])
    col_len = len(grid)

    for x in range(row_len):
        for y in range(col_len):
            if grid[y][x] == "@":
                surroundings = surrounding_vals(grid, x, y)
                matches = len(re.findall("@", surroundings))
                # matches = surroundings.count("@")
                if matches < min_surrounding_rolls:
                    valid_spaces += 1

    return valid_spaces


@timeit
def part2(data: list[str]) -> int:
    grid = parse_to_grid(data)

    def recurse(input_grid: list[list[str]]) -> int:
        spaces, new_grid = check_and_remove(input_grid)
        if spaces > 0:
            spaces += recurse(new_grid)
        return spaces

    valid_spaces = recurse(grid)
    return valid_spaces


def main():
    ans1 = part1(data)
    print(ans1)
    ans2 = part2(data)
    print(ans2)

if __name__ == "__main__":
    main()
