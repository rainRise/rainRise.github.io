---
title: 位运算解题代码
published: 2026-03-27
description: '掌握题目中的位运算思想'
image: '/assets/desktop-banner/4.jpg'
tags: [题目]
category: '位运算'
draft: false 
lang: 'zh-CN'
---

### 1. 返回 大于等于 n 且二进制表示仅包含 置位 位的 最小 整数 x 。（置位 位指的是二进制表示中值为 1 的位）

```c
//x全为1，x+1全为0，按位与则全为0.

int smallestNumber(int n) {
    int x=n;
    while(1)
    {
        if(x & (x+1) == 0)
        {
            return x;
        }
        x++;
    }
}
```

### 2. 给你两个正整数 n 和 k。你可以选择 n 的 二进制表示 中任意一个值为 1 的位，并将其改为 0。返回使得 n 等于 k 所需要的更改次数。如果无法实现，返回-1。

```c
//据题意，k中为1的位，n中必须为1，那么n一定大于等于k，因此第一步判断为n&k==k。
//满足初步条件后，n与k进行按位异或运算，同为0不同为1，此时为1的个数即为需要修改的次数。
//然后定义函数计数1的个数，n与1进行按位与计算，累加结果，然后n右移1位。

int Count1(int n)
{
    int count=0;
    while(n>0)
    {
        count += (n&1);
        n >>= 1;
    }
    return count;
}

int minChanges(int n, int k){
    int count=0;
    if((n & k) != k)
    {
        return -1;
    }
    return Count(n^k);
}
```

### 3. 给你一个整数数组 arr 。请你将数组中的元素按照其二进制表示中数字 1 的数目升序排序。如果存在多个数字二进制中 1 的数目相同，则必须将它们按照数值大小升序排列。请你返回排序后的数组。

```c
//用哈希数组存储arr数组中1的个数，然后升序排序原数组，不是排序哈希数组，需要根据哈希数组排序arr数组，只需要改动compar函数中返回值。如果哈希值相等则返回值为arr下标之差，否则返回哈希值之差。

int* hash;

int Count(int n)
{
    int count=0;
    while(n>0)
    {
        count += (n&1);
        n >>= 1;
    }
    return count;
}

int compar(const void* a, const void* b)
{
    int x=*(int*)a;
    int y=*(int*)b;
    return hash[x] == hash[y] ? x - y : hash[x] - hash[y];

}

int* sortByBits(int* arr, int arrSize, int* returnSize) {
    hash=calloc(10001, sizeof(int));
    *returnSize=arrSize;
    for(int i=0; i<arrSize; i++)
    {
        hash[arr[i]] = Count(arr[i]);
    }
    qsort(arr, arrSize, sizeof(int), compar);
    free(hash);
    return arr;
}
```

### 4. 给你一个非负整数 num ，请你返回将它变成 0 所需要的步数。 如果当前数字是偶数，你需要把它除以 2 ；否则，减去 1 。

```c
//如果num是偶数，则需要除以2，在位运算中右移一位，计数中关注二进制位数-1（因为num=1时，不需要移位）；如果num是奇数，则需要减去1，在位运算中也是减去1，计数只需要关注num中有多少个1。
//num=0，返回0.总步数=二进制位数-1 + 二进制中1的个数。因此while循环内，判断条件为num&1（计算1的数目），bits++，num右移。

int numberOfSteps(int num){
    if(num == 0)
    {
        return 0;
    }
    int steps=0;
    int count1=0, bits=0;
    /*
    while(num>0)
    {
        if(num&1)
        {
            count1++;
        }
        bits++;
        num >>= 1;
    }
    */
    count_1=__builtin_popcount(num);
    bits=32-__builtin_clz(num);
    steps = count1 + bits-1;
    return steps;
}
```

### 5. 对整数的二进制表示取反（0 变 1 ，1 变 0）后，再转换为十进制表示，可以得到这个整数的补数。

例如，整数 5 的二进制表示是 "101" ，取反后得到 "010" ，再转回十进制表示得到补数 2 。
给你一个整数 num ，输出它的补数。

```c
//c语言中计算无符号整数前置零的个数，再用32-前置零即为num二进制位数，最后1左移len位再-1即为len-1位1，该结果与num按位异或（相当于取反）。

int findComplement(int num) {
    int len=32-__builtin_clz(num);
    return ((1u<<len)-1) ^ num;
}
```

### 6. 给定一个正整数 n，找到并返回 n 的二进制表示中两个 相邻 1 之间的 最长距离 。如果不存在两个相邻的 1，返回 0 。

如果只有 0 将两个 1 分隔开（可能不存在 0 ），则认为这两个 1 彼此 相邻 。两个 1 之间的距离是它们的二进制表示中位置的绝对差。例如，"1001" 中的两个 1 的距离为 3 。

```c
//-n：n按位取反再+1，相当于n的补码。
//n & -n可以得到n的二进制最右边的1所代表的数值（比如n=1010010，lowbit=2即10），*2是为了把‘1’这一位移走。
//__builtin_ctz(n)：统计n的二进制末尾连续0的个数，加1得到两个1中间的gap，ans更新答案，n右移gap位。

#define MAX(a, b) a>b?a:b

int binaryGap(int n) {
    int ans=0;
    n /= ((n & -n)*2);
    while(n>0)
    {
        int gap=__builtin_ctz(n)+1;
        ans=MAX(ans, gap);
        n >>= gap;
    }
    return ans;
}
```