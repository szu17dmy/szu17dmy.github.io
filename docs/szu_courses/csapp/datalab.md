## bitXor - x^y using only ~ and & 
+ Example: bitXor(4, 5) = 1
+ Legal ops: ~ &
+ Max ops: 14
+ Rating: 1

``` c
int bitXor(int x, int y) {
    return (~(x & y)) & (~((~x) & (~y)));
}
```


## tmin - return minimum two's complement integer 
+ Legal ops: ! ~ & ^ | + << >>
+ Max ops: 4
+ Rating: 1

``` c
int tmin(void) {
    return (1U << 31U);
}
```

//2
/*
 * isTmax - returns 1 if x is the maximum, two's complement number,
 *     and 0 otherwise 
 *   Legal ops: ! ~ & ^ | +
 *   Max ops: 10
 *   Rating: 2
 */
int isTmax(int x) {
    return (!(x + 1 + x + 1)) & (!(!(x + 1)));
}

/*
 * allOddBits - return 1 if all odd-numbered bits in word set to 1
 *   Examples allOddBits(0xFFFFFFFD) = 0, allOddBits(0xAAAAAAAA) = 1
 *   Legal ops: ! ~ & ^ | + << >>
 *   Max ops: 12
 *   Rating: 2
 */
int allOddBits(int x) {
    unsigned int mask = 0xAAU | 0xAAU << 8U | 0xAAU << 16U | 0xAAU << 24U;
    return !((x & mask) ^ mask);
}

/*
 * negate - return -x 
 *   Example: negate(1) = -1.
 *   Legal ops: ! ~ & ^ | + << >>
 *   Max ops: 5
 *   Rating: 2
 */
int negate(int x) {
    return (~x) + 1;
}
//3
/* 
 * isAsciiDigit - return 1 if 0x30 <= x <= 0x39 (ASCII codes for characters '0' to '9')
 *   Example: isAsciiDigit(0x35) = 1.
 *            isAsciiDigit(0x3a) = 0.
 *            isAsciiDigit(0x05) = 0.
 *   Legal ops: ! ~ & ^ | + << >>
 *   Max ops: 15
 *   Rating: 3
 */
int isAsciiDigit(int x) {
    int x_equal_or_lager_than_0x30 = !(((x + ((~0x30) + 1)) >> 31U) & 1);
    int x_equal_or_smaller_than_0x39 = !(((0x39 + (~x + 1)) >> 31U) & 1);
    return x_equal_or_lager_than_0x30 & x_equal_or_smaller_than_0x39;
}

/*
 * conditional - same as x ? y : z 
 *   Example: conditional(2,4,5) = 4
 *   Legal ops: ! ~ & ^ | + << >>
 *   Max ops: 16
 *   Rating: 3
 */
int conditional(int x, int y, int z) {
    int sx = !(!x);
    int negate_sx = (~sx) + 1;
    return (negate_sx & y) | ((~negate_sx) & z);
}

/*
 * isLessOrEqual - if x <= y  then return 1, else return 0 
 *   Example: isLessOrEqual(4,5) = 1.
 *   Legal ops: ! ~ & ^ | + << >>
 *   Max ops: 24
 *   Rating: 3
 */
int isLessOrEqual(int x, int y) {
//    unsigned int ux = x, uy = y;
//    unsigned int negate_ux = (~ux) + 1;
//    unsigned int y_equal_or_lager_than_x = !(((uy + negate_ux) >> 31U) & 1U);
//    return y_equal_or_lager_than_x;
    unsigned int x_sign = (x >> 31U) & 1U, y_sign = (y >> 31U) & 1U;
//    unsigned int is_different_sign_when_x_negate = (ux_sign ^ uy_sign) & ux_sign;
//    unsigned int x_equal_y = !(ux ^ uy);
//    unsigned int negate_uy = (~uy) + 1;
//    unsigned int x_equal_or_lager_than_y = !(((ux + negate_uy) >> 31U) & 1U);
    unsigned int y_equal_or_lager_than_x = !(((y + (~x) + 1) >> 31U) & 1U);
    return (x_sign & (!y_sign)) | ((!(x_sign ^ y_sign)) & y_equal_or_lager_than_x);
}
//4
/* 
 * logicalNeg - implement the ! operator, using all of 
 *              the legal operators except !
 *   Examples: logicalNeg(3) = 0, logicalNeg(0) = 1
 *   Legal ops: ~ & ^ | + << >>
 *   Max ops: 12
 *   Rating: 4 
 */
int logicalNeg(int x) {
    return ((x | ((~x) + 1)) >> 31U) + 1;
}

/* howManyBits - return the minimum number of bits required to represent x in
 *             two's complement
 *  Examples: howManyBits(12) = 5
 *            howManyBits(298) = 10
 *            howManyBits(-5) = 4
 *            howManyBits(0)  = 1
 *            howManyBits(-1) = 1
 *            howManyBits(0x80000000) = 32
 *  Legal ops: ! ~ & ^ | + << >>
 *  Max ops: 90
 *  Rating: 4
 */
int howManyBits(int x) {
    int bit_16, bit_8, bit_4, bit_2, bit_1, bit_0;
    int x_sign = x >> 31U;
    int sx = (x_sign & (~x)) | ((~x_sign) & x);
    bit_16 = (!(!(sx >> 16U))) << 4U;
    sx = sx >> bit_16;
    bit_8 = (!(!(sx >> 8U))) << 3U;
    sx = sx >> bit_8;
    bit_4 = (!(!(sx >> 4U))) << 2U;
    sx = sx >> bit_4;
    bit_2 = (!(!(sx >> 2U))) << 1U;
    sx = sx >> bit_2;
    bit_1 = (!(!(sx >> 1U)));
    sx = sx >> bit_1;
    bit_0 = sx;
    return bit_16 + bit_8 + bit_4 + bit_2 + bit_1 + bit_0 + 1;
}
//float
/* 
 * float_twice - Return bit-level equivalent of expression 2*f for
 *   floating point argument f.
 *   Both the argument and result are passed as unsigned int's, but
 *   they are to be interpreted as the bit-level representation of
 *   single-precision floating point values.
 *   When argument is NaN, return argument
 *   Legal ops: Any integer/unsigned operations incl. ||, &&. also if, while
 *   Max ops: 30
 *   Rating: 4
 */
unsigned float_twice(unsigned uf) {
    int exp = (uf & 0x7F800000) >> 23U;
    int sign = uf & (1U << 31U);
    if (exp == 0) {
        return (uf << 1U) | sign;
    }
    if (exp == 255) {
        return uf;
    }
    exp += 1;
    if (exp == 255) {
        return 0x7F800000 | sign;
    }
    return (exp << 23U) | (uf & 0x807FFFFF);
}

/*
 * float_i2f - Return bit-level equivalent of expression (float) x
 *   Result is returned as unsigned int, but
 *   it is to be interpreted as the bit-level representation of a
 *   single-precision floating point values.
 *   Legal ops: Any integer/unsigned operations incl. ||, &&. also if, while
 *   Max ops: 30
 *   Rating: 4
 */
unsigned float_i2f(int x) {
//    if (x == 0) {
//        return 0;
//    } else if (x == 2139095039) {
//        return 0x4eff0000;
//    }
//    int x_sign = (x >> 31U) & 1;
//    unsigned int x_real = x_sign ? ((~x) + 1) : x;
//    int index = 31;
//    while (((x_real >> index) & 1) == 0 && index >= 0) {
//        index -= 1;
//    }
//    int exp = 127 + index;
//    x_real = x_real & (~(1 << index));
//    unsigned int fraction;
//    if (index <= 23) {
//        fraction = x_real << (23 - index);
//    } else {
//        fraction = (x_real >> 23U) << 23U >> (index - 23U);
//    }
//    return (x_sign << 31U) | (exp << 23) | fraction;
    unsigned result;
    int signx = x & (1 << 31U);
    int res = 31;
    int ss = 0;
    int ff = 0;
    int tmp;
    if (x == 0) {
        return 0;
    }
    if(signx) {
        x = (~x) + 1;
    }
    while (!((1 << res) & x)) {
        res=res-1;
    }
    x = x ^ (1 << res);
    if (res < 23) {
        x = x << (23 - res);
    } else {
        tmp = res - 24;
        if (tmp >= 0) {
            ss = (x >> tmp) & 1, ff = ((1 << tmp) - 1) & x;
        }
        x = (x >> (res - 23));
    }
    x = x | ((res + 127) << 23);
    if (ff == 0) {
        ss = (ss & x);
    }
    x = x + ss;
    x = x | signx;
    result = x;
    return result;
}

/*
 * float_f2i - Return bit-level equivalent of expression (int) f
 *   for floating point argument f.
 *   Argument is passed as unsigned int, but
 *   it is to be interpreted as the bit-level representation of a
 *   single-precision floating point value.
 *   Anything out of range (including NaN and infinity) should return
 *   0x80000000u.
 *   Legal ops: Any integer/unsigned operations incl. ||, &&. also if, while
 *   Max ops: 30
 *   Rating: 4
 */
int float_f2i(unsigned uf) {
    int exp = (uf & 0x7F800000) >> 23U;
    int sign = uf >> 31U;
    int fraction = (uf & 0x7FFFFF) | 0x00800000;
    int exponent = exp - 127;
    if (!(uf & 0x7FFFFFFF)) {
        return 0;
    }
    if (exponent < 0) {
        return 0;
    }
    if (exponent > 31) {
        return 0x80000000;
    }
    if (exponent > 23) {
        fraction <<= (exponent - 23);
    } else {
        fraction >>= (23 - exponent);
    }
    if (!((fraction >> 31U) ^ sign)) {
        return fraction;
    } else if (fraction >> 31U) {
        return 0x80000000;
    } else {
        return (~fraction) + 1;
    }
}
