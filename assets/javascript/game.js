var characterSelected = false;
var defenderSelected = false;
var character = {};
var defender = {};
var enemiesDefeated = 0;
gameOver = false;

var pennywise = {
    name: "Pennywise",
    health: 120,
    baseAttack: 8,
    attack: 8
  };
  var freddyKrueger = {
    name: "Freddy Krueger",
    health: 100,
    baseAttack: 5,
    attack: 5
  };
  var michaelMyers = {
    name: "Michael Myers",
    health: 150,
    baseAttack: 20,
    attack: 20
  }; 
  var jasonVorhees = {
    name: "Jason Vorhees",
    health: 180,
    baseAttack: 25,
    attack: 25
  };

  function initializeCharacter(chosenCharacter) {
    character.name = chosenCharacter.name;
    character.health = chosenCharacter.health;
    character.baseAttack = chosenCharacter.baseAttack;
    character.attack = chosenCharacter.attack;
  }
  
  function initializeDefender(chosenDefender) {
    defender.name = chosenDefender.name;
    defender.health = chosenDefender.health;
    defender.baseAttack = chosenDefender.baseAttack;
    defender.attack = chosenDefender.attack;
  }

function moveToEnemies() {
  $(".available-character").removeClass("available-character").addClass("enemy-character");
  $("#enemies-available").append($(".enemy-character"));
}

function resetGame() {
  $("#pennywise-character").children(".health").html(pennywise.health);
  $("#freddy-character").children(".health").html(freddyKrueger.health);
  $("#michael-character").children(".health").html(michaelMyers.health);
  $("#jason-character").children(".health").html(jasonVorhees.health);

  $(".character-image").removeClass("chosen-character enemy-character defender-character").addClass("available-character");
  var available = $(".available-character").show();
  $("#characters-available").html(available);

  $("#game-message").empty();
  $("#restart").hide();

  characterSelected = false;
  defenderSelected = false;
  enemiesDefeated = 0;
  gameOver = false;
  character = {};
  defender = {};
}

$(document).ready(function() {

  $("#restart").hide();

//Pennywise
  $("#pennywise-character").on("click", function () {

    if(characterSelected == false) {
      $("#game-message").empty();

      initializeCharacter(pennywise);
      characterSelected = true;

      $("#pennywise-character").removeClass("available-character").addClass("chosen-character");
      $("#chosen-character").append(this);

      moveToEnemies();
    } else if ((characterSelected == true) && (defenderSelected == false)) {
      if($("#pennywise-character").hasClass("enemy-character")) {
        $("#game-message").empty();

        initializeDefender(pennywise);
        defenderSelected = true;

        $("#pennywise-character").removeClass("enemy-character").addClass("defender-character");
        $("#defender-section").append(this);
      }
    }
  });
//Freddy Krueger
  $("#freddy-character").on("click", function () {

    if(characterSelected == false) {
      $("#game-message").empty();

      initializeCharacter(freddyKrueger);
      characterSelected = true;

      $("#freddy-character").removeClass("available-character").addClass("chosen-character");
      $("#chosen-character").append(this);

      moveToEnemies();
    } else if ((characterSelected == true) && (defenderSelected == false)) {
      if($("#freddy-character").hasClass("enemy-character")) {
        $("#game-message").empty();

        initializeDefender(freddyKrueger);
        defenderSelected = true;

        $("#freddy-character").removeClass("enemy-character").addClass("defender-character");
        $("#defender-section").append(this);
      }
    }
  });
//Michael Myers
  $("#michael-character").on("click", function () {

    if(characterSelected == false) {
      $("#game-message").empty();

      initializeCharacter(michaelMyers);
      characterSelected = true;

      $("#michael-character").removeClass("available-character").addClass("chosen-character");
      $("#chosen-character").append(this);

      moveToEnemies();
    } else if ((characterSelected == true) && (defenderSelected == false)) {
      if($("#michael-character").hasClass("enemy-character")) {
        $("#game-message").empty();

        initializeDefender(michaelMyers);
        defenderSelected = true;

        $("#michael-character").removeClass("enemy-character").addClass("defender-character");
        $("#defender-section").append(this);
      }
    }
  });
//Jason Vorhees
  $("#jason-character").on("click", function () {

    if(characterSelected == false) {
      $("#game-message").empty();

      initializeCharacter(jasonVorhees);
      characterSelected = true;

      $("#jason-character").removeClass("available-character").addClass("chosen-character");
      $("#chosen-character").append(this);

      moveToEnemies();
    } else if ((characterSelected == true) && (defenderSelected == false)) {
      if($("#jason-character").hasClass("enemy-character")) {
        $("#game-message").empty();

        initializeDefender(jasonVorhees);
        defenderSelected = true;

        $("#jason-character").removeClass("enemy-character").addClass("defender-character");
        $("#defender-section").append(this);
      }
    }
  });

  $("#attack").on("click", function() {
    

    if (characterSelected && defenderSelected && !gameOver) {
      defender.health = defender.health - character.attack;
      $(".defender-character").children(".health").html(defender.health);
      $("#game-message").html("<p>You attacked " + defender.name + " for " + character.attack + " damage.<p>");

      character.attack = character.attack + character.baseAttack;

      if (defender.health > 0) {
        character.health = character.health - defender.baseAttack;
        $(".chosen-character").children(".health").html(character.health);

        if (character.health > 0) {
          $("#game-message").append("<p>" + defender.name + " attacked you back for " + defender.baseAttack + " damage.</p>");
        } else {
          gameOver = true;
          $("#game-message").html("<p>You were slain...uh oh...</p><p>Play again?</p>");
          $("#restart").show();
        }
      } else {
        enemiesDefeated++;
        defenderSelected = false;
        $("#game-message").html("<p>You have defeated " + defender.name + ". Choose another enemy.</p>");
        $(".defender-character").hide();

        if (enemiesDefeated === 3) {
          gameOver = true;
          $("#game-message").html("<p>You got them all!!!</p><p>Play again?</p>");
          $("#restart").show();
        }
      }
    } else if (!characterSelected && !gameOver) {
      $("#game-message").html("<p>You must first select your game character.</p>");
    } else if (!defenderSelected && !gameOver) {
      $("#game-message").html("<p>You must choose an enemy to fight.</p>");
    }

  
  });

  $("#restart").on("click", function() {

    resetGame();
  });

});