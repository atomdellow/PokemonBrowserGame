class Sprite {
    constructor({image, position, velocity, frames = {max: 1}, sprites}){
        this.image = image
        this.position = position
        this.velocity = velocity
        this.frames = {...frames, val: 0, elapsed: 0 }
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.moving = false
        this.sprites = sprites
    }
    draw() {
         c.drawImage(
                this.image, 
                this.frames.val * 48,
                0, 
                this.image.width / this.frames.max, 
                this.image.height,
                this.position.x,
                this.position.y,
                this.image.width / this.frames.max,
                this.image.height
                )
                if(!this.moving)  return
                if(this.frames.max > 1) {
                    this.frames.elapsed++
                }
                if(this.frames.elapsed % 10 === 0){

               
                if(this.frames.val < this.frames.max - 1) this.frames.val++
                else this.frames.val = 0
                }
    
        }
}
class Boundary {
    static width = 48
    static height = 48
 constructor({position}){
    this.position = position
    this.width = 48
    this.height = 48   
 }
 draw(){
    c.fillStyle = 'rgba(255, 0, 0, 0)'
    c.fillRect(
        this.position.x, 
        this.position.y, 
        this.width, 
        this.height)
 }
}