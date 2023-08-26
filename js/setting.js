//===================================================================
// All Global Variables
//===================================================================
//Enumeration types
/*
//key code enums
//http://keycode.info
var key = {
	ENTER: 13,
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40
};

var nsew = {
	U: "up",
	D: "down",
	L: "left",
	R: "right"
};
*/

//static settings
var mycanvas = document.getElementById('mycanvas');
var ctx = mycanvas.getContext('2d');
var snakeSize = 10; 
var w = 350;
var h = 350;
var score = 0;
var high = 0;
var click = false;

//dynamically created variables
var snake;
var food;
var colors = ['green'];
//We first test a single enemy snake
var enemy;
var edir;

//AI
var world = [[]];
// start and end of path
var pathStart = [w/snakeSize,h/snakeSize];
var pathEnd = [0,0];
var currentPath = [];

var flag = 0;