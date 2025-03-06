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


    /**
     * 
     * @param {Array<Product>} list_of_product 
     * @returns 
     */
    static getTypes(list_of_product) {
        let types = []

        list_of_product.map((product) => {
            if (!types.includes(product.type)) {
                types.push(product.type)
            } 
        })
        return types
    }
}

let ListProducts = [
    new Product("arduino uno", 20, 43, "/src/assets/products/arduino.jpg", "microcontroleur", true),
    new Product("moteur brushless", 35, 12, "/src/assets/products/brushless_motor.jpeg", "motor", true),
    new Product("Boussole numerique", 8, 10, "/src/assets/products/digital_compass.jpeg", "capteur", true),
    new Product("Esp32", 15, 6, "/src/assets/products/esp32.jpeg", "microcontroleur", true),
    new Product("Ublox Gps neo 7m", 6, 3, "/src/assets/products/gps_ublox.jpeg", "capteur", true),
    new Product("Capteur Infrarouge", 4, 8, "/src/assets/products/infrared_sensor.jpeg", "capteur", true),
    new Product("Cables males", 1, 87, "/src/assets/products/male_wire.jpeg", "cable", true),
    new Product("Capteur ultrasonique", 5, 14, "/src/assets/products/ultrasonic_sensor.jpeg", "capteur", true),
    new Product("Cables femeles", 1, 32, "/src/assets/products/female_wire.jpg", "cable", true),
    new Product("Gps Neo 6m", 10, 6, "/src/assets/products/gps_neo_m-.jpg", "capteur", true),
    new Product("Ecran lcd", 5, 13, "/src/assets/products/lcd_screen.jpg", "ecran", true),
    new Product("Leds", 1, 54, "/src/assets/products/leds.jpg", "led", true),
    new Product("Cables males-Femeles", 1, 63, "/src/assets/products/male_female_wire.jpg", "cable", true),
    new Product("Motor 12V", 13, 6, "/src/assets/products/motor12V.jpg", "motor", true),
    new Product("Raspberry pi", 100, 3, "/src/assets/products/raspberry.jpg", "microcontroleur", true),
    new Product("Gps Neo 8m", 10, 4, "/src/assets/products/gps_neo_8m.webp", "capteur", true),
]

export { Product, ListProducts }