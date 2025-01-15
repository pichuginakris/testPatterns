interface Transport {
    deliver: () => {};
    baggageList: Baggage[];
    insertBaggage: (baggage: Baggage) => void;
    getBaggage: () => void;
}

interface BaggageItem {
    name: string;
    weight: number;
}


class Baggage implements BaggageItem {
    name: string;
    weight: number;

    constructor(name: string, weight: number) {
        this.name = name;
        this.weight = weight;
    }

}

class Car implements Transport {
    baggageList: Baggage[] = [];


    deliver= () => {
        console.log('Cars deliver');
        return 'Car';
    }

    insertBaggage(baggage: Baggage){
        this.baggageList.push(baggage);
        console.log(`Pushed ${baggage.name} to car`);
    }

    getBaggage(){
        for (let item of this.baggageList) {
            console.log(`This is ${item.name} with weight ${item.weight}`);
        }
    }
}

class Ship implements Transport {
    baggageList: Baggage[] = [];

    deliver = ()=> {
        console.log('This is a ship');
        return 'Ship';
    }

    insertBaggage(baggage: Baggage){
        this.baggageList.push(baggage);
        console.log(`Pushed ${baggage.name} to ship`);
    }

    getBaggage() {
        if (this.baggageList.length > 0){
            for (let item of this.baggageList) {
                console.log(`This is ${item.name} with weight ${item.weight} in ship`);
            }
        } else {
            console.log('Ship is empty');
        }

    }
}

enum TransportType {
    Car = "car",
    Ship = "ship",
}


// Фабрика для создания объектов транспорта
class TransportFactory {
    static createTransport(type: string): Transport {
        if (type === TransportType.Car) {
            return new Car();
        } else if (type === TransportType.Ship) {
            return new Ship();
        } else {
            throw new Error("Invalid transport type");
        }
    }
}

const car: Transport = TransportFactory.createTransport(TransportType.Car);
const ship : Transport = TransportFactory.createTransport(TransportType.Ship);
const bagOne = new Baggage('apple', 35);
const bagTwo = new Baggage('banana', 25);

car.getBaggage();
car.insertBaggage(bagOne);
car.insertBaggage(bagTwo);
car.getBaggage();
car.deliver();


ship.getBaggage();
ship.insertBaggage(bagOne);
ship.insertBaggage(bagTwo);
ship.getBaggage();
ship.deliver();


