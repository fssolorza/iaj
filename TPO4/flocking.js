
$(document).ready(function() {
	var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

	var numBoids = 40;
	var Flockable = [];
	var Test = [];
	var WormHole;
	var self = this;
	var isDebugging = false;
	var leader;
	var LEADER_BEHIND_DIST = 10;

  function preload () {
  	game.load.image('spaceBG', 'assets/space.jpg');
  	game.load.image('ship1', 'assets/ship1.png');
  	game.load.image('ship2', 'assets/ship2.png');
 	game.load.image('wormhole', 'assets/wormhole2.png');
  }

  function create ()
  {
		var bg = game.add.sprite(game.world.centerX, game.world.centerY, 'spaceBG');
		bg.anchor.setTo(0.5, 0.5);
		createFlockingTest();
		leader = new Ship(game);
		leader.initalize(1,'ship2');
		followLeader(leader);
	}




	function followLeader(boid_leader)
	{
	    var tv = boid_leader.sprite.body.velocity.clone();
	    var force = new Phaser.Point(0,0); //new Vector3D();
	 
	    // Calculate the behind point
	    tv.setMagnitude(-1); //tv.scaleBy(-1);
	    tv.normalize();
	    tv.setMagnitude(LEADER_BEHIND_DIST); //tv.scaleBy(LEADER_BEHIND_DIST);
	    behind = boid_leader.sprite.body.position.clone().add(tv);
	 
	    // Creates a force to arrive at the behind point
	    force = force.add(arrive(behind));
	 
	    return force;
	}














	function createFlockingTest()
	{
	  createFlockOne();
	}

	function createFlockOne(){
    for(var i = 0; i < numBoids; ++i)
    {
    		var boid = new Ship(game);
    		boid.initalize(i,'ship1');
    		var xpos = game.world.centerX-400 + Math.floor(Math.random()*200);
			var ypos = game.world.centerY-300 + Math.floor(Math.random()*200);
    		var pos = new Phaser.Point(xpos,ypos);
    		var vel = new Phaser.Point(30,10)
    		boid.create(pos,vel, 0, isDebugging);
    		boid.category = 1;
    		boid.behavior = new BehaviorFlock(boid);
    		Flockable.push(boid);
    }
  }

   //LOOP
  function update(){
  	for (var i = 0; i < Flockable.length; i++)
  	{
  		Flockable[i].behavior.update(Flockable);

  		if(isDebugging)
  		{
  		  Flockable[i].debugUpdate();
  		}
  	}
  }


  function render(){

		if(isDebugging)
		{
				for (var i = 0; i < Flockable.length; i++)
				{
					Flockable[i].debugRender();
				}
		}
  }


});
