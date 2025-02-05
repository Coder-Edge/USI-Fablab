
class User {
    /**
     * @param {string} name
     * @param {string} email
     * @param {string} password
     * @param {string} userType 
     */

    constructor(firstname, name, email) {
        if (typeof name === "object" && name != null) {
            const {name: username, email: useremail, firstname: userfirstname} = name
            this.name = username
            this.firstname = userfirstname
            this.email = useremail
        } else {
            this.name = name
            this.email = email
            this.firstname = firstname
        }
    }
}

const users = [
    new User("Gloire", "Mankununusa", "gloire@mankunwekdnfklnun.com"),
    new User("Remile", "Bianga", "remile@biafwkanflnga.com"),
    new User("Nathan", "Lukamba", "natha@lukafweknmba.com"),
    new User("Claudel", "Mubenzem Mfumu ", "claudelfeknf@mubenzem.com"),
    new User("Gloire", "Mankununusa", "gloire@mankunwekdnfklnun.com"),
    new User("Remile", "Bianga", "remile@biafwkanflnga.com"),
    new User("Nathan", "Lukamba", "natha@lukafweknmba.com"),
    new User("Claudel", "Mubenzem Mfumu ", "claudelfeknf@mubenzem.com"),
    new User("Gloire", "Mankununusa", "gloire@mankunwekdnfklnun.com"),
    new User("Remile", "Bianga", "remile@biafwkanflnga.com"),
    new User("Nathan", "Lukamba", "natha@lukafweknmba.com"),
    new User("Claudel", "Mubenzem Mfumu ", "claudelfeknf@mubenzem.com"),
    new User("Gloire", "Mankununusa", "gloire@mankunwekdnfklnun.com"),
    new User("Remile", "Bianga", "remile@biafwkanflnga.com"),
    new User("Nathan", "Lukamba", "natha@lukafweknmba.com"),
    new User("Claudel", "Mubenzem Mfumu ", "claudelfeknf@mubenzem.com"),
]

export {User, users}