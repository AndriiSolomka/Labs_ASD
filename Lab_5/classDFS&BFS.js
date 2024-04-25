class Algorithms{
    constructor() {
        this.element = []
        this.all = []
    }

    queueAdd(element){
        this.element.push(element)
        //console.log('add',this.element.map(el => el +1));
    }

    queueUrEl(){
        //console.log('curEl',this.element.map(el => el +1))
    }

    queueDel() {
        //console.log('del', this.element.map(el => el +1));
        return this.element.shift();
    }

    stackAd(element){
        this.element.push(element)
       // console.log('add',this.element.map(el => el +1));
    }

    stackDel() {
        this.element.pop();
       // console.log('del',this.element.map(el => el +1));
    }

    peekStack() {
        return this.element[this.element.length - 1];
    }
    empty(){
        //console.log('empty', this.element.map(el => el +1));
        return this.element.length === 0;
    }

    alls(){
        this.all
    }
}

class Click {
    constructor() {
        this.element = []
    }

     addAction (action){
        this.element.push()
    }

    next () {
        if(this.element.length > 0){
            const action = this.element.shift();
            action(); 
        }
    }
}

export {Algorithms, Click}