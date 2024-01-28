class Car {
    VIN: string;
    brand: string;
    model: string;
    service: string

    constructor(VIN: string, brand: string, model: string, service: string) {
        this.VIN = VIN;
        this.brand = brand;
        this.model = model;
        this.service = service;
    }
}

export default Car;