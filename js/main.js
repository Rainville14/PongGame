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
		paddle.y = getMousePos().y;
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
	drawRect(0, 0, 20, 100, 'red');
	drawCircle(ball.x, ball.y, ball.radius, 'white');
}
function moveEverything() {
	ball.x = ball.x + ball.speedX;
	ball.y = ball.y + ball.speedY;

	if(ball.x < ball.radius || ball.x > tennisCourt.width - ball.radius) {
		ball.speedX = -ball.speedX;
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
