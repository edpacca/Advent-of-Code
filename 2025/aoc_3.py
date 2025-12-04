from timeit import timeit
from inputs.input3 import inputs
from inputs.test_input3 import test_inputs

# data = test_inputs
data = inputs

def parse_line(line: str) -> list[int]:
    return [int(x) for x in list(line)]

def determine_voltage_pt1(nums: list[int]) -> int:
    first_digit = max(nums[: -1])
    first_digit_index = nums.index(first_digit)
    next_digit = max(nums[first_digit_index + 1:])
    return int(str(f"{first_digit}{next_digit}"))

def determine_voltage_pt2(nums: list[int], total_digits: int) -> int:
    digit_str = ""
    remaining = nums

    for i in range(total_digits, 0, -1):
        if (len(remaining) == total_digits - len(digit_str)):
            # bail early
            digit_str += "".join([str(x) for x in remaining])
            break
        next_digit, next_remaining_list = get_next_digit(remaining, i - 1)
        digit_str += next_digit
        remaining = next_remaining_list

    return int(digit_str)

def get_next_digit(nums: list[int], remaining_digits: int) -> tuple[str, list[int]]:
    check_length = len(nums) - remaining_digits
    next_digit = max(nums[:check_length])
    index_of = nums.index(next_digit)
    slice = nums[index_of + 1:]
    return (str(next_digit), slice)

@timeit
def part1(data: list[str]) -> int:
    sum = 0
    for line in data:
        nums = (parse_line(line))
        sum += determine_voltage_pt1(nums)
    return sum

@timeit
def part2(data: list[str]) -> int:
    sum = 0
    digits = 12
    for line in data:
        nums = parse_line(line)
        sum += determine_voltage_pt2(nums, digits)
    return sum

def main():
    sum1 = part1(data)
    print(sum1, sum1 == 17332) # 17332
    sum2 = part2(data)
    print(sum2, sum2 == 172516781546707) # 172516781546707

if __name__ == "__main__":
    main()
