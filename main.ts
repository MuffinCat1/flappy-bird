let emptyObstacleY = 0
let index = 0
let bird = game.createSprite(0, 2)
let ticks = 0
let score = 0
let scoreUp: boolean
let obstacles: game.LedSprite[] = []

bird.set(LedSpriteProperty.Blink, 300)

input.onButtonPressed(Button.A, function () {
  bird.change(LedSpriteProperty.Y, 1)  
})

input.onButtonPressed(Button.B, function () {
  bird.change(LedSpriteProperty.Y, -1)  
})


basic.forever(function () {
    while (obstacles.length > 0 && obstacles[0].get(LedSpriteProperty.X) == 0) {
        obstacles.removeAt(0).delete()
        
        if(!scoreUp){
            score += 1
            scoreUp = true;
        }
    }

    for (let obstacle2 of obstacles) {
        obstacle2.change(LedSpriteProperty.X, -1)
    }

    if (ticks % 3 == 0) {
        emptyObstacleY = randint(0, 4)
        for (let index2 = 0; index2 <= 4; index2++) {
            if (index2 != emptyObstacleY) {
                obstacles.push(game.createSprite(4, index2))
                scoreUp = false
            }
        }
    }

    for (let obstacle3 of obstacles){
        if(obstacle3.x() == bird.x() && obstacle3.y() == bird.y()){
            game.gameOver()
        }
    }

    game.setScore(score)

    ticks += 1
    basic.pause(1000)
})
