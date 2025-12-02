from inputs.input2 import inputs
from inputs.test_input2 import test_inputs
from timeit import timeit

# data = test_inputs
data = inputs

def parse_range_string(range_str: str) -> tuple[str, str]:
    split_str = range_str.split("-")
    return (split_str[0], split_str[1])

def validate_part1(number: int) -> bool:
    numstr = str(number)
    if len(numstr) % 2 != 0:
        return True
    index = len(numstr) // 2
    return numstr[0:index] != numstr[index:]

def compare_chunks(input_str: str, chunk_size: int, num_splits: int) -> bool:
    chunks = []
    for i in range(0, num_splits):
        start = i * chunk_size
        end = start + chunk_size
        chunk = input_str[start:end]
        if i > 0 and chunk not in chunks:
            return
        chunks.append(chunk)
    return all(i == chunks[0] for i in chunks)

def validate_part2(number: int) -> bool:
    numstr = str(number)
    length = len(numstr)

    for i in range(2, length + 1):
        if length % i != 0:
            continue
        chunk_size = length // i
        if compare_chunks(numstr, chunk_size, i):
            return False
    return True

@timeit
def part1(data: list[str]):
    invalids = []
    for range_str in data:
        (start, end) = parse_range_string(range_str)
        for i in range(int(start), int(end) + 1):
            if not (validate_part1(i)):
                invalids.append(i)

    print(sum(invalids))

@timeit
def part2(data: list[str]):
    invalids = []
    for range_str in data:
        (start, end) = parse_range_string(range_str)
        for i in range(int(start), int(end) + 1):
            if not (validate_part2(i)):
                invalids.append(i)

    print(sum(invalids))

def main():
    part1(data)
    part2(data)

if __name__ == "__main__":
    main()
