import mongoose, { Schema } from 'mongoose'

const habitSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    influence:{
        type:String,
        required:true,
        enum:["good", "bad"]
    },
    difficulty:{
        type:String,
        required:true,
        enum:["easy", "normal", "hard"]
    },
    score:{
        type:Number
    },
    owner:{
        type:String,
        required:true
    }
}, {
    timestamps:true
})


const getScore = (value) => {
    switch(value){
        case "easy":
            return 2
        case "normal":
            return 4
        case "hard":
            return 6
    }
}


habitSchema.methods = {
    view(full) {
        let view = {}
        let fields = ['id', 'name', 'influence', 'difficulty']
        if(full){
            fields = [...fields, 'score', 'owner']
        }
        fields.forEach((field) => { view[field] = this[field] })
        return view
    },
    addScore(){
        if(this.influence == "good"){
            if(this.score > 50){
                this.score++
            }else if(this.score > 40){
                this.score += (getScore(this.difficulty)) / 2
            }else{
                this.score += getScore(this.difficulty)
            }
        }else{
            if(this.score < 0){
                this.score -= (getScore(this.difficulty)) * 2
            }else if(this.score <= 10){
                this.score -= (getScore(this.difficulty)) * 1.5
            }else{
                this.score -= getScore(this.difficulty)
            }
        }
        this.save()
        return this
    },
    substractScore(){
        if(this.influence == "good"){
            this.score = this.score  - getScore(this.difficulty)
        }else{
            this.score = this.score + getScore(this.difficulty)
        }
        this.save()
        return this
    }
}

const model = mongoose.model('Habit', habitSchema)

export const schema = model.schema
export default model