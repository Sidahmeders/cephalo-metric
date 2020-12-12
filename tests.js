// write your leetcode tests here
/*
[1,2] 
[1,3] 
[1,4] 
[2,3] 
[2,4] 
[3,4]
*/

var combine = function(n, k) {
    let ans = []
    backtracking(ans,[],1,n,k)
    return ans
}

var backtracking = function(ans,tmp,start,n,k) {
    if(tmp.length == k){
      ans.push(Array.from(tmp))
      return
    }
    for(let i=start;i<=n;++i){
      tmp.push(i)
      backtracking(ans,tmp,i+1,n,k)
      tmp.pop()
    }
}

console.log(combine(4, 2))