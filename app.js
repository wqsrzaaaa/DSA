function sumOfDigits(n) {
  let sum = 0
  let count = 0
  let copyn = n
  while (0 < n) {
    n = Math.floor(n / 10)
    count++
  }
  
  for (var i = 0; i < count; i++) {
    let lastnum = copyn % 10
    sum += lastnum
    copyn = Math.floor(copyn/10)
  }
  console.log(sum);
}

sumOfDigits(1234)

