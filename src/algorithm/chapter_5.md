# STL的运用
### vector 
动态数组
通过下标访问，可以踩背
### set
集合 
自动排序 自动去重
### multiset
元素不唯一
### unordered_set
元素不排序
### string
字符串
约等于字符数组
### map
映射图
自动排序 
### multimap
不自动去重
### unordered_map
不自动排序
### queue
队列
先进先出
### priority_queue
用堆实现的队列
##### priority_queue优先级的设置
`priority_queue<int, vector<int>, less<int> >q`
数据类型 vector<数据类型> 大/小<数据类型>
```
// 不能重载>
struct fruit{
    string name;
    int price;
    friend bool operator < (fruit f1, frrit f2){
        return f1.price < f2.price; //把大的浮上去
    }
};
struct cmp{
    bool operator () (fruit f1, fruit f2)
    {
        return f1.price > f2.price;
    }
}
priority_queue<fruit, vector<fruit>, cmp>q;
``` 
其他也可以这么搞
注意判断和sort不一样 这里重载的意思，所以是反过来了 <大的优先 >小的优先
### stack
### pair
### algorithm
##### max() min() abs()
##### swap()
##### reverse()
##### next_permutation()
##### fill()
##### sort()
##### lower_bound() upper_bound()
