class Product {
    /**
     * @param {string} name
     * @param {number} price
     * @param {number} quantity
     * @param {String} type
     * @param {boolean} is_available 
     * @param {image} image 
     */
    constructor (name, price, quantity, image, type, is_available) {

        if(typeof name === "object" && name != null) {
            const {name: copy_name, price: copy_price, quantity: copy_quantity, image: copy_image, type: copy_type, is_available: copy_is_available} = name;
            this.name = copy_name;
            this.price = copy_price
            this.quantity = copy_quantity;
            this.image = copy_image;
            this.type = copy_type
            this.is_available = copy_is_available
        } else {
            this.name = name;
            this.price = price;
            this.quantity = quantity;
            this.image = image;
            this.type = type;
            this.is_available = is_available
        }
    }
}

let ListProducts = [
    new Product({name: "Arduino Uno", quantity: 5, price: 25, image:"./src/assets/arduino.jpg", type: "Microcontroleur", is_available: true}),
    new Product("Rasperry pi M355 hs yhhdh", 80, 20, "./src/assets/raspberry.jpg", "Microcontroleur" , true),
    new Product("Arduino Uno", 25, 20, "./src/assets/arduino.jpg", "Microcontroleur", true),
    new Product("Rasperry pi", 80, 20, "./src/assets/raspberry.jpg", "Microcontroleur", true),
    new Product("Arduino Uno", 25, 20, "./src/assets/arduino.jpg", "Microcontroleur", false),
    new Product("Rasperry pi", 80, 20, "./src/assets/raspberry.jpg", "Microcontroleur", true),
    new Product("Arduino Uno", 25, 20, "./src/assets/arduino.jpg", "Microcontroleur", true),
    new Product("Rasperry pi", 80, 20, "./src/assets/raspberry.jpg", "Microcontroleur", true),
    new Product("Arduino Uno", 25, 20, "./src/assets/arduino.jpg", "Microcontroleur", false),
    new Product("Rasperry pi", 80, 20, "./src/assets/raspberry.jpg", "Microcontroleur", true),
    new Product("Arduino Uno", 25, 20, "./src/assets/arduino.jpg", "Microcontroleur", false),
    new Product("Rasperry pi", 80, 20, "./src/assets/raspberry.jpg", "Microcontroleur", true),
    new Product("Arduino Uno", 25, 20, "./src/assets/arduino.jpg", "Microcontroleur", true),
    new Product("Rasperry pi", 80, 20, "./src/assets/raspberry.jpg", "Microcontroleur", true),
]

export { Product, ListProducts }