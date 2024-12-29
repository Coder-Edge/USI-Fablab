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
    new Product({name: "Arduino Uno", quantity: 5, price: 25, image:"/src/assets/arduino.jpg", type: "Microcontroller", is_available: true}),
    new Product("Rasperry pi M355 hs yhhdh hyedygedeydudueudhedhuehduehd", 80, 20, "/src/assets/raspberry.jpg", "Micro computer" , true),
    new Product("Arduino Uno", 25, 20, "/src/assets/arduino.jpg", "Microcontroller", true),
    new Product("Rasperry pi", 80, 20, "/src/assets/raspberry.jpg", "Micro computer", true),
    new Product("Arduino Uno", 25, 20, "/src/assets/arduino.jpg", "Microcontroller", false),
    new Product("Rasperry pi", 80, 20, "/src/assets/raspberry.jpg", "Micro computer", true),
    new Product("Arduino Uno", 25, 20, "/src/assets/arduino.jpg", "Microcontroller", true),
    new Product("Rasperry pi", 80, 20, "/src/assets/raspberry.jpg", "Micro computer", true),
    new Product("Arduino Uno", 25, 20, "/src/assets/arduino.jpg", "Microcontroller", false),
    new Product("Rasperry pi", 80, 20, "/src/assets/raspberry.jpg", "Micro computer", true),
    new Product("Arduino Uno", 25, 20, "/src/assets/arduino.jpg", "Microcontroller", false),
    new Product("Rasperry pi", 80, 20, "/src/assets/raspberry.jpg", "Micro computer", true),
    new Product("Arduino Uno", 25, 20, "/src/assets/arduino.jpg", "Microcontroller", true),
    new Product("Rasperry pi", 80, 20, "/src/assets/raspberry.jpg", "Micro computer", true),
]

export { Product, ListProducts }