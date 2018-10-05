var tennisCourt;
var tennisCourtSurface;
var fps = 30;

var ball = {
	x: 50,
	y: 50,
	speedX: 10,
	speedY: 5,
	radius: 10
}
var paddle = {
	x: 0,
	y: 0,
	width: 20,
	height: 100
}

function getMousePos(evt) {
	var rect = tennisCourt.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x: mouseX,
		y: mouseY
	}
}

window.onload= function() {
	tennisCourt = document.getElementById('court');
	tennisCourtSurface = tennisCourt.getContext('2d');
	tennisCourt.addEventListener("mousemove", function(evt) {
		paddle.y = getMousePos(evt).y;
	})
	initCourt();
}
function initCourt() {
	setInterval(function() {
		moveEverything();
		drawEverything();
	}, 1000/fps);
}
function drawEverything() {
	drawRect(0, 0, tennisCourt.width, tennisCourt.height, 'green');
	drawRect(paddle.x, paddle.y, paddle.width, paddle.height, 'red');
	drawCircle(ball.x, ball.y, ball.radius, 'white');
}
function moveEverything() {
	ball.x = ball.x + ball.speedX;
	ball.y = ball.y + ball.speedY;

	if((ball.y > paddle.y && ball.y < paddle.y - paddle.height) && (ball.x < (ball.radius + paddle.width) || ball.x > tennisCourt.width - ball.radius)) {
		ball.speedX = -ball.speedX;
	} else {
		ball.x = tennisCourt.width/2;
		ball.y = tennisCourt.height/2;
	}

	if(ball.y < ball.radius || ball.y > tennisCourt.height - ball.radius) {
		ball.speedY = -ball.speedY;
	}
}

function drawRect(x, y, width, height, color) {
	tennisCourtSurface.fillStyle = color;
	tennisCourtSurface.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
	tennisCourtSurface.fillStyle = color;
	tennisCourtSurface.beginPath();
	tennisCourtSurface.arc(x, y, radius, 0, Math.PI*2, true);
	tennisCourtSurface.fill();
}
