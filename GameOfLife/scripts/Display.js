var ChessBoard = []
var canvas = document.getElementById("Chess")
var playerFinished = 0
var AgentFinished = 0
var BLACK = 0
var WHITE = 1
var FREE = 0
var PLAYERFIRST = 1
var AGENTFIRST = 2

var dd = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]]

class Display{

    ShowBackground(){
        var imgObj = new Image()
        imgObj.src = "./img/board2.jpg"
        imgObj.onload = function(){
            var pic = canvas.getContext("2d")
            pic.drawImage(imgObj, 0, 0)
            for(let i = 0; i < 15; ++ i)
                for(let j = 0; j < 15; ++ j)
                    put([i,j], ChessBoard[i][j])
        }
    }

    registerObserver(x){
        this.observers[this.num++] = x
    }

    removeObserver(x){
        for(let i in this.observers) if(this.observers[i] == x){
            for(let j = i+1; j < this.num; ++ j)
                this.observers[j-1] = this.observers[j]
            -- this.num
            break
        }
    }
    
    notifyObservers(){
        var data = JSON.stringify(ChessBoard)
        var last = JSON.parse(data)
        for(let i in this.observers){
            let cnt = 0
            for(let k in dd){
                let ii = this.observers[i].a + dd[k][0]
                let jj = this.observers[i].b + dd[k][1]
                if(ii >= 0 && jj >= 0 && ii < 15 && jj < 15)
                    cnt += last[ii][jj]
            }
            if(cnt == 3){
                ChessBoard[this.observers[i].a][this.observers[i].b] = 1
                this.observers[i].updata(1)
            }
            else if(cnt == 2){
                ChessBoard[this.observers[i].a][this.observers[i].b] = last[this.observers[i].a][this.observers[i].b]
                this.observers[i].updata(ChessBoard[this.observers[i].a][this.observers[i].b])
            }
            else{
                ChessBoard[this.observers[i].a][this.observers[i].b] = 0
                this.observers[i].updata(0)
            }
        }
    }

    //构建页面显示
    constructor(){
        function initBoard(){
            for(var i = 0; i < 15; ++ i){
                ChessBoard[i] = []
                for(var j = 0; j < 15; ++ j)
                    ChessBoard[i][j] = 0
            }
        }

        this.btmBegin = document.getElementById("Begin")
        this.btmNext = document.getElementById("Next")
        initBoard()
        this.ShowBackground()
        this.observers = []
        this.num = 0

        for(let i = 0; i < 15; ++ i)
            for(let j = 0; j < 15; ++ j)
                this.registerObserver(new Observer(i, j, 0))
        
        document.querySelector("#Begin").addEventListener("click",
        () => {
            this.notifyObservers()
            this.ShowBackground()
        })
    }
}

//在canvas画布对应pos位置绘制颜色为color的棋子
function put(pos, color){
    var x = pos[0] * 35 + 25
    var y = pos[1] * 35 + 25
    var context = canvas.getContext("2d")
    context.beginPath()
    if(color == BLACK){
        context.arc(y, x, 10, 0, 2*Math.PI)
        context.fillStyle = "black"
        context.fill()
    }
    else if(color == WHITE){
        context.arc(y, x, 10, 0, 2*Math.PI)
        context.fillStyle = "white"
        context.fill()
    }
    context.closePath()
}

//点击画布相应位置绘制棋子
canvas.addEventListener("click", (event) => {
    var x = event.offsetX;
    var y = event.offsetY;
    var i = Math.floor(y/35)
    var j = Math.floor(x/35)

    ChessBoard[i][j] = !ChessBoard[i][j]
    displayer.observers[i*15+j].updata(ChessBoard[i][j])
    var pos = [i, j]
    put(pos, ChessBoard[i][j])
})