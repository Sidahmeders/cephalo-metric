// write your leetcode tests here
/*

*/

var angleClock = function(hour, minutes) {
    // hour-hand rotates 30 degrees per hour and 0.5 degrees per minute
    let hourAngle = ((hour % 12)  * 30) + (minutes * 0.5)
    // minute-hand rotates 6 degrees Per minute
    let minuteAngle = minutes * 6

    let angle1 = Math.abs(hourAngle - minuteAngle);
    let angle2 = 360 - angle1;
    
    return Math.min(angle1, angle2);
}

console.log(angleClock(12, 30))