

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var keyUp = document.getElementById('keyUp');
var keyLeft = document.getElementById('keyLeft');
var keyRight = document.getElementById('keyRight');
var keyDown = document.getElementById('keyDown');

var snake = [{x:10, y:10}];
var fruit = {};
var score = 0;
var dir = '';
var accessKeyboard=true;
var timer = 300;


createFruit();
game();


function game() {
	accessKeyboard=true;
	ctx.clearRect(0, 0, 632, 632);
	testCollision();
	drawFruit();
	drawSnake();
	aboutCollision();
	drawScore();
	setTimeout('game()', timer);
}
function aboutCollision() {
	if(snake.length>4) {
		var x=snake[0].x;
		var y=snake[0].y;
		for(var i=4; i<snake.length; i++) {
			if(x==snake[i].x && y==snake[i].y) {
				dir='';
				snake = [{x:10, y:10}];
				createFruit();
				score=0;
			}
		}
	}
}
function addSnake() {
	var x=snake[0].x;
	var y=snake[0].y;
	if(dir=='left') x-=1;
	if(dir=='right') x+=1;
	if(dir=='up') y-=1;
	if(dir=='down') y+=1;
	var obj={};
	obj.x = x;
	obj.y = y;
	snake.unshift(obj);
	createFruit();
	score++;
}
function testCollision() {
	var x=snake[0].x;
	var y=snake[0].y;
	if(dir=='left') x-=1;
	if(dir=='right') x+=1;
	if(dir=='up') y-=1;
	if(dir=='down') y+=1;
	if(fruit.x==x && fruit.y==y) {
		var obj={};
		obj.x = x;
		obj.y = y;
		snake.unshift(obj);
		createFruit();
		score++;
		return;
	}
	stepSnake();
}
function drawScore() {
	var board = document.getElementById('score');
	board.innerHTML = 'Очки: '+score;
}
function stepSnake() {
	var x=0;
	var y=0;
	var obj={};
	obj.x=snake[0].x;
	obj.y=snake[0].y;
	if(dir=='left') x-=1;
	if(dir=='right') x+=1;
	if(dir=='up') y-=1;
	if(dir=='down') y+=1;
	obj.x = wallCollision(obj.x+x);
	obj.y = wallCollision(obj.y+y);
	if(dir) {
		snake.pop();
		snake.unshift(obj);
	}
}
function wallCollision(val) {
	if(val<0) val=20;
	if(val>20) val=0;
	return val;
}
document.onkeydown = function(event) {
	if(accessKeyboard) {
		if(event.keyCode==37 && dir!='right') dir='left';
		if(event.keyCode==38 && dir!='down') dir='up';
		if(event.keyCode==39 && dir!='left') dir='right';
		if(event.keyCode==40 && dir!='up') dir='down';
		accessKeyboard=false;
	}
}
function drawFruit() {
	var x = fruit.x*30 + 2;
	var y = fruit.y*30 + 2;
	ctx.fillStyle = 'green';
	ctx.fillRect(x, y, 28, 28);
}
function createFruit() {
	var x = Math.floor(Math.random()*21);
	var y = Math.floor(Math.random()*21);
	for(var i=0; i<snake.length; i++) {
		if(x==snake[i].x && y==snake[i].y) {
			createFruit();
			return;
		}
	}
	fruit.x = x;
	fruit.y = y;
}

function drawSnake() {
	ctx.fillStyle = 'maroon';
	for(var i=0; i<snake.length; i++) {
		var x = snake[i].x*30 + 2;
		var y = snake[i].y*30 + 2;
		ctx.fillRect(x, y, 28, 28);
	}
}
keyUp.ontouchend = function() {
	if(accessKeyboard && dir!='down') {
		dir='up';
		accessKeyboard=false;
	}
}
keyDown.ontouchend = function() {
	if(accessKeyboard && dir!='up') {
		dir='down';
		accessKeyboard=false;
	}
}
keyLeft.ontouchend = function() {
	if(accessKeyboard && dir!='right') {
		dir='left';
		accessKeyboard=false;
	}
}
keyRight.ontouchend = function() {
	if(accessKeyboard && dir!='left') {
		dir='right';
		accessKeyboard=false;
	}
}