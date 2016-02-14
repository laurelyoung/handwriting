/**
 * Created by laurel on 16/2/14.
 */
window.onload = function () {
    var canvasWidth = 400;
    var canvasHeight = 400;

    var canvas = document.getElementById("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    var ctx = canvas.getContext('2d'); //获取画布的2D上下文

    function drawBox() {
        ctx.save(); //保存各自的状态,避免互相之间的干扰
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(canvasWidth, 0);
        ctx.lineTo(canvasWidth, canvasHeight);
        ctx.lineTo(0, canvasHeight);
        ctx.closePath();

        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.restore();
    }

    function drawDiagonal() {
        ctx.save();
        ctx.beginPath();

        ctx.moveTo(0, 0);
        ctx.lineTo(canvasWidth, canvasHeight);

        ctx.moveTo(canvasWidth, 0);
        ctx.lineTo(0, canvasHeight);

        ctx.moveTo(canvasWidth / 2, 0);
        ctx.lineTo(canvasWidth / 2, canvasHeight);

        ctx.moveTo(canvasWidth, canvasHeight / 2);
        ctx.lineTo(0, canvasHeight / 2);
        ctx.closePath();

        ctx.lineWidth = 1;
        ctx.strokeStyle = 'red';
        ctx.stroke();
        ctx.restore();
    }


    drawBox(); //画外边的边框
    drawDiagonal(); //画米字格

    function windowToCanvas(x, y) {
        return {x: x - (document.documentElement.clientWidth - canvasWidth) / 2, y: y};
    }

    var isMouseDown = false;
    var lastPos = {x: 0, y: 0};
    canvas.onmousedown = function (e) {
        e.preventDefault();
        isMouseDown = true;
        lastPos = windowToCanvas(e.clientX, e.clientY);
        //console.log(lastPos);
    };
    canvas.onmouseup = function (e) {
        e.preventDefault();
        isMouseDown = false;
    };

    /**
     * 思路:
     * 鼠标移动时,在最后一次坐标点和当前坐标点之间绘制一条直线,由于速度很快,可以近似地得到一条连续的曲线,从而画出一个字.
     */
    canvas.onmousemove = function (e) {
        e.preventDefault();
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(lastPos.x, lastPos.y);
        if (isMouseDown) {
            var curPos = windowToCanvas(e.clientX, e.clientY);
            //console.log(curPos);
            ctx.lineTo(curPos.x, curPos.y);
            lastPos = curPos;
        }
        ctx.closePath();
        ctx.lineWidth = 10;
        ctx.lineJoin = 'round'; //清除毛刺
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.restore();
    };
    canvas.onmouseout = function (e) {
        e.preventDefault();
        isMouseDown = false;
    };


    /**
     * 清除画布后,绘制好边框和米字格
     */
    var clearBtn = document.getElementById('clearBtn');
    clearBtn.onclick = function () {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        drawBox(); //绘制边框
        drawDiagonal(); //绘制米字格
    }
}