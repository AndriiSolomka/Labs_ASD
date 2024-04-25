class AlgorithmsDFS {
    constructor() {
        this.element = []
        this.roads = []
    }

    stackAd(element) {
        this.element.push(element)
        this.roads.push([element, 'active'])
    }

    stackDel() {
        this.roads.push([this.element.at(-1), 'closed'])
        this.element.pop();
    }

    peekStack() {
        return this.element[this.element.length - 1];
    }

    empty() {
        if(this.element.length !== 0){
            this.roads.push([this.element.at(-1), 'visited'])
        }

        return this.element.length === 0;
    }

    doRoads(){
        return console.log(this.roads)
    }
}


class AlgorithmsBFS {
    constructor() {
        this.element = []
        this.roads = []
        this.close = []
    }

    queueAdd(element) {
        this.element.push(element)
        this.roads.push([this.element.at(-1), `visited`])
    }


    queueDel() {
        this.roads.push([this.element.at(0), 'active'])
        this.close.push(this.element.at(0))
        return this.element.shift();
    }

    empty() {
        if(!this.roads.includes(this.close) && this.close.length !== 0){
            this.roads.push([...this.close, 'closed'])
            this.close = [];
        }

        return this.element.length === 0;
    }

    doRoad(){
        console.log(this.roads)
    }

}

export {AlgorithmsDFS, AlgorithmsBFS}