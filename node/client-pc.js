var canvas, ctx;
var pos_x, pos_y;
var x,y;
function init() {
    pos_x = 0;
    pos_y = 0;
    canvas = document.getElementById("main");
    ctx = canvas.getContext("2d");

    display();
 }
function display() {
    ctx.clearRect(0, 0, 300, 300);
    ctx.fillRect(150+pos_x, 150-pos_y, 40, 20);

    setTimeout(display, 50); // タイマーで定期的に display() を実行
}
$(function() {
// var socket = new io.Socket(null, {port: 8080});

socket.connect();
// 受信ハンドラ
socket.on('message', function(obj) {
    //ｘ軸の傾きとy軸の傾きを取得
    x = obj.x;
    y = obj.y;
iosHandleOrientation();
});
function iosHandleOrientation() {
    var accel_scale = 30.0;
    var filter_val = 0.1;

    // ローパスフィルタ
    pos_x = (x*accel_scale * filter_val) + (pos_x * (1.0 - filter_val));
    pos_y = (y*accel_scale * filter_val) + (pos_y * (1.0 - filter_val));

    $("#x").text(x);
    $("#y").text(y);
}
});
