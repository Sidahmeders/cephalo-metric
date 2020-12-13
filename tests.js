// write your leetcode tests here
/*
[1,2] 
[1,3] 
[1,4] 
[2,3] 
[2,4] 
[3,4]
*/

var angleClock = function(hour, minutes) {
    if(hour == 12){
        hour = 0
    }
    let min = minutes/5
    
    let newHour = Math.abs(hour + minutes/60)
    let angle = Math.abs(newHour-min)*30
    return Math.min((360-angle),angle)
}

var angleClock = function(hour, minutes) {
    let hourAngle = (hour % 12)  * 30 + minutes * 0.5;
    // hour-hand rotates 30 degrees per hour and 0.5 degrees per minute
    let minuteAngle = minutes * 6;
    // minute-hand rotates 6 degrees Per minute
    
    let angle1 = Math.abs(hourAngle - minuteAngle);
    let angle2 = 360 - angle1;
    
    return Math.min(angle1, angle2);
}

console.log(combine(4, 2))