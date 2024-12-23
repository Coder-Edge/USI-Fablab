class Product {
    /**
     * @param {string} name
     * @param {number} price
     * @param {number} quantity
     * @param {image} image 
     */
    constructor (name, price, quantity, image) {

        if(typeof name === "object" && name !== null) {
            const {name: copy_name, price: copy_price, quantity: copy_quantity, image: copy_image} = name;
            this.name = copy_name;
            this.price = copy_price
            this.quantity = copy_quantity;
            this.image = copy_image;
        } else {
            this.name = name;
            this.price = price;
            this.quantity = quantity;
            this.image = image;
        }
    }
}

const ListProducts = [
    new Product({name: "Arduino Uno", price: 25, image:"./src/assets/arduino.jpg"}),
    new Product("Rasperry pi M355 hs yhhdh", 80, 20, "./src/assets/raspberry.jpg"),
    new Product("Arduino Uno", 25, 20, "./src/assets/arduino.jpg"),
    new Product("Rasperry pi", 80, 20, "./src/assets/raspberry.jpg"),
    new Product("Arduino Uno", 25, 20, "./src/assets/arduino.jpg"),
    new Product("Rasperry pi", 80, 20, "./src/assets/raspberry.jpg"),
    new Product("Arduino Uno", 25, 20, "./src/assets/arduino.jpg"),
    new Product("Rasperry pi", 80, 20, "./src/assets/raspberry.jpg"),
    new Product("Arduino Uno", 25, 20, "./src/assets/arduino.jpg"),
    new Product("Rasperry pi", 80, 20, "./src/assets/raspberry.jpg"),
]

export { Product, ListProducts }