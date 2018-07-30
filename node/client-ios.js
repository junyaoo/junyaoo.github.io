var canvas, ctx;
var pos_x, pos_y;
function load() {
    pos_x = 0;
    pos_y = 0;
    canvas = document.getElementById("main");
     ctx = canvas.getContext("2d");

    display();
 }

function display() {
    ctx.clearRect(0, 0, 300, 300);
    //150は黄色の背景の半分つまり中心でそこからのズレを指定している
    ctx.fillRect(150+pos_x, 150-pos_y, 40, 20);

    setTimeout(display, 50); // タイマーで定期的に display() を実行
}
function iosHandleOrientation(event) {
    var orientData = event.accelerationIncludingGravity;
    var accel_scale = 30.0;
    var filter_val = 0.1;

    // ローパスフィルタ
    pos_x = (orientData.x*accel_scale * filter_val) + (pos_x * (1.0 - filter_val));
    pos_y = (orientData.y*accel_scale * filter_val) + (pos_y * (1.0 - filter_val));

    $("#x").text(orientData.x);
    $("#y").text(orientData.y);
}
window.addEventListener("devicemotion", iosHandleOrientation, true);
$(function() {
var socket = new io.Socket(null, {port: 8080});

socket.connect();
window.addEventListener('devicemotion', function(evt) {
    var acc = evt.accelerationIncludingGravity;
    socket.send(acc);
},true);
});
