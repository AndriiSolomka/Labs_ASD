class Algorithms{
    constructor() {
        this.element = []
    }

    queueAdd(element){
        this.element.push(element)
    }

    queueDel() {
        return this.element.shift();
    }

    stackAd(element){
        this.element.push(element)
    }

    stackDel() {
        this.element.pop();
    }

    peekStack() {
        return this.element[this.element.length - 1];
    }
    empty(){
        return this.element.length === 0;
    }

}

export {Algorithms}