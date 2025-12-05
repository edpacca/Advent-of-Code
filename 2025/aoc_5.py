from inputs.input5 import inputs
from inputs.test_input5 import test_inputs
from timeit import timeit

data = inputs
# data = test_inputs

def parse_range(input_str: str) -> tuple[ int, int ]:
    split_str = input_str.split("-")
    return (int(split_str[0]), int(split_str[1]))

split_index = data.index("")
fresh_ingredient_ranges = [parse_range(range) for range in data[:split_index]]
available_ingredients = [int(v) for v in data[split_index + 1:]]

def process_data():
    split_index = data.index("")
    fresh_ingredient_ranges = data[:split_index]
    available_ingredients = data[split_index + 1:]

def get_ranges(ranges: list[str]) -> list[tuple[int, int]]:
    return [parse_range(r) for r in ranges]

def is_in_range(value: int, value_range: tuple[int, int]) -> bool:
    return value >= value_range[0] and value <= value_range[1]

@timeit
def part1():
    fresh_available = 0
    for ingredient in available_ingredients:
        for value_range in fresh_ingredient_ranges:
            if is_in_range(ingredient, value_range):
                fresh_available += 1
                break
    print(fresh_available)

def remove_overlaps(range_list: list[tuple[int, int]]) -> list[tuple[int, int]]:
    sorted_ranges = sorted(range_list, key=lambda x: (x[0], x[1]))
    no_overlaps = [sorted_ranges[0]]

    for vrange in sorted_ranges[1:]:
        last_range = no_overlaps[-1]

        # ignore
        if vrange[1] <= last_range[1]:
            continue

        # no overlap
        if vrange[0] > last_range[1]:
            no_overlaps.append(vrange)
            continue

        # normal extend
        if vrange[0] <= last_range[1] and vrange[1] > last_range[1]:
            no_overlaps[-1] = (last_range[0], vrange[1])

    return no_overlaps

def tuple_str(tup: tuple[int, int]) -> str:
    return f"{tup[0]:<17} {tup[1]:<17}"

def part2():
    no_overlaps = remove_overlaps(fresh_ingredient_ranges)
    total = 0

    for vrange in no_overlaps:
        total += vrange[1] + 1 - vrange[0]

    print(total)

def main():
    part1() #563
    part2() #338693411431456

if __name__ == "__main__":
    main()

