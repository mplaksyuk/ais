function isPrime(n) {
    if (n <= 1) {
        return false;

    }
    // check from 2 to n-1
    for (var i = 2; i < n; i++) {
        if (n % i == 0) {
            return false;
        }
    }
    return true;
}

module.exports = {
    getPrime: (number) => {
        let i = number + 1
        while (!isPrime(i)) {
            i++
        }
        return i
    },
    getRandomElement: (p) => Math.floor(Math.random() * p),
    hashHelper: (value, a, b, p, hashes) => {
        let index = (Math.round(a * Math.sqrt(Math.pow(value.real, 2) + Math.pow(value.imaginary, 2)) + b) % p) % hashes.length;
        if (hashes[index]) {
            hashes[index].push(value)
        } else {
            hashes[index] = [value]
        }
    }
}


