const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const collisionsMap = []
for (let i = 0; i < collisions.length; i+= 70){
    collisionsMap.push(collisions.slice(i, 70 + i))
}
const BattleZoneMap = []
for (let i = 0; i < collisions.length; i+= 70){
    collisionsMap.push(collisions.slice(i, 70 + i))
}
console.log(collisionsMap)


const boundaries = []
const offset = {
    x: 0,
    y: 0
}
collisionsMap.forEach((row, i)=>{
    row.forEach((symbol, j)=>{
        if(symbol === 1025)
        boundaries.push(new Boundary({position:{
            x: j * Boundary.width + -800,
            y: i * Boundary.height + -800
        }
    }))
    })
})
console.log(boundaries)

const image =  new Image()
image.src='./img/Pokemon-GameMap.png'

const foregroundImage =  new Image()
foregroundImage.src='./img/Pokemon-GameMap-overlap.png'

const playerImage = new Image()
playerImage.src = './img/playerDown.png'

const playerUpImage = new Image()
playerUpImage.src = './img/playerUp.png'

const playerRightImage = new Image()
playerRightImage.src = './img/playerRight.png'

const playerLeftImage = new Image()
playerLeftImage.src = './img/playerLeft.png'


const player = new Sprite({
    position: {
        x:canvas.width/2 - 192 /4/2, 
        y:canvas.height/2 - 68 /2
    },
    image: playerImage,
    frames: {
        max: 4
    },
    sprites: {
        up: playerUpImage, 
        down:playerImage,
        left: playerLeftImage,
        right: playerRightImage
    }
})

const background = new Sprite({
    position: {
        x: -800 + offset.x,
        y: -800 + offset.y
    },
    image: image
})

const foreground = new Sprite({
    position: {
        x: -800 + offset.x,
        y: -800 + offset.y
    },
    image: foregroundImage
})

image.onload = () => {
   
    c.drawImage(
        playerImage, 
        0, 
        0, 
        playerImage.width / 4, 
        playerImage.height,
        
        canvas.width/2 - (playerImage.width /4)/2, 
        canvas.height/2 - playerImage.height/2, 
        playerImage.width /4,
        playerImage.height
        )
}

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },

}

const movables = [background, ...boundaries, foreground]

function rectangularCollision({rectangle1, rectangle2}){
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width && 
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

function animate(){
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach((boundary) =>{
        boundary.draw()   
    })
    player.draw()
    foreground.draw()

    let moving = true
        player.moving = false
        player.image = player.sprites.up
       if (keys.w.pressed && lastKey==='w') {
        player.moving = true
        for(let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if(
                rectangularCollision({
                    rectangle1:player,
                    rectangle2:{
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y+3
                        }
                    }
                })
            ){
            console.log('colliding')
            moving = false
            break
        }
    }

        if(moving)
        movables.forEach((movable) => {
            movable.position.y += 3
            })
        }
       else if (keys.s.pressed && lastKey==='s') {
        player.moving = true
        player.image = player.sprites.down
        for(let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if(
                rectangularCollision({
                    rectangle1:player,
                    rectangle2:{
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y-3
                        }
                    }
                })
            ){
            console.log('colliding')
            moving = false
            break
        }
    }

        if(moving)
        movables.forEach(movable => {
            movable.position.y -= 3
            })
        }
       else if (keys.a.pressed && lastKey==='a') {
        player.moving = true
        player.image = player.sprites.left
        for(let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if(
                rectangularCollision({
                    rectangle1:player,
                    rectangle2:{
                        ...boundary,
                        position: {
                            x: boundary.position.x+3,
                            y: boundary.position.y
                        }
                    }
                })
            ){
            console.log('colliding')
            moving = false
            break
        }
    }

        if(moving)
        movables.forEach(movable => {
            movable.position.x += 3
            })
        }
       else if (keys.d.pressed && lastKey==='d') {
        player.moving = true
        player.image = player.sprites.right
        for(let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if(
                rectangularCollision({
                    rectangle1:player,
                    rectangle2:{
                        ...boundary,
                        position: {
                            x: boundary.position.x-3,
                            y: boundary.position.y
                        }
                    }
                })
            ){
            console.log('colliding')
            moving = false
            break
        }
    }

        if(moving)
        movables.forEach(movable => {
            movable.position.x -= 3
            })
        }
    } 

animate()
let lastKey = ''
window.addEventListener('keydown', (e) => {
    // console.log(e)
    switch(e.key){
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
        break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
        break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
        break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
        break
    }
    console.log("Keys Down", keys)
})
window.addEventListener('keyup', (e) => {
    // console.log(e)
    switch(e.key){
        case 'w':
            keys.w.pressed = false
            
        break
        case 'a':
            keys.a.pressed = false
        break
        case 'd':
            keys.d.pressed = false
        break
        case 's':
            keys.s.pressed = false
        break
    }
    console.log("Keys Up", keys)
})
