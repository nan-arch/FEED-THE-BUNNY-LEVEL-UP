const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var rope,rope2;
var bg_img;
var food;
var rabbit;
var button,button2;
var bunny;
var blink,eat,sad;

function preload(){
  bg_img = loadImage('background(1).png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  blink = loadAnimation('blink_1.png','blink_2.png','blink_3.png');
  eat = loadAnimation('eat_0.png','eat_1.png','eat_2.png','eat_3.png','eat_4.png');
  sad = loadAnimation('sad_1.png','sad_2.png','sad_3.png');
}
function setup() {
  createCanvas(800,400);
  engine = Engine.create();
  world = engine.world;
  createSprite(400, 200, 50, 50);
  
  button = createImg('cut_btn.png');
  button.position(200,30);
  button.size(50,50);
  button.mouseClicked(drop);
  
  button2 = createImg('cut_btn.png');
  button2.position(200,40);
  button2.size(60,60);
  button2.mouseClicked(drop2);

  rope = new Rope(7,{x:240,y:25});
  rope2 = new Rope(8,{x:370,y:30});

  ground = new ground(200,690,600,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  bunny = createSprite(230,800,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  rectMode(CENTER);
  ellipseMode(RADIUS);
}

function draw() {
  background(255,255,255);
  Engine.update(engine);

  rope.show();
  rope2.show();
  ground.show();
  
  drawSprites();

  if(collide(fruit,bunny,80)==true){
    remove_rope();
    bubble.visible = false;
    World.remove(engine.World,fruit);
    fruit = null;
    bunny.changeAnimation('eating');
  }

}
function drop(){
  rope.break();
}

function drop2(){
  rope2.break();
}