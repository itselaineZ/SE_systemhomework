class Observer{
    constructor(i, j, st){
        this.a = i
        this.b = j
        this.state = st
    }
    updata(x){
        this.state = x
    }
}