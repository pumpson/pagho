# pagho
# sql
## JOINのとき
error
```
from
  a,
  b,
  c
LEFT FOIN d on b.aaa = d.aaa
```
動いた
```
from
  a,
  b,
  c
LEFT FOIN d on c.aaa = d.aaa
```
Joinする場合JoinするテーブルをJoin分直前にもってくるひつようがある？？
